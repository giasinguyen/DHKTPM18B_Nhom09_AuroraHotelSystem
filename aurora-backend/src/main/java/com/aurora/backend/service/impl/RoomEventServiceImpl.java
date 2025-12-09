package com.aurora.backend.service.impl;

import com.aurora.backend.dto.request.PriceAdjustmentRequest;
import com.aurora.backend.dto.request.RoomEventCreationRequest;
import com.aurora.backend.dto.request.RoomEventUpdateRequest;
import com.aurora.backend.dto.response.RoomEventResponse;
import com.aurora.backend.entity.Branch;
import com.aurora.backend.entity.PriceAdjustment;
import com.aurora.backend.entity.RoomEvent;
import com.aurora.backend.exception.AppException;
import com.aurora.backend.enums.ErrorCode;
import com.aurora.backend.mapper.PriceAdjustmentMapper;
import com.aurora.backend.mapper.RoomEventMapper;
import com.aurora.backend.repository.BranchRepository;
import com.aurora.backend.repository.RoomEventRepository;
import com.aurora.backend.service.RoomEventService;
import com.aurora.backend.service.RoomPricingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@Transactional(readOnly = true)
public class RoomEventServiceImpl implements RoomEventService {

    RoomEventRepository roomEventRepository;
    BranchRepository branchRepository;
    RoomEventMapper roomEventMapper;
    PriceAdjustmentMapper priceAdjustmentMapper;
    RoomPricingService roomPricingService;
    EntityManager entityManager;

    @Override
    @Transactional
    public RoomEventResponse createEvent(RoomEventCreationRequest request) {
        log.info("Creating room event: {} for branch: {}", request.getName(), request.getBranchId());

        // Validate dates
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new AppException(ErrorCode.EVENT_INVALID_DATE_RANGE);
        }

        // Verify branch exists
        Branch branch = branchRepository.findById(request.getBranchId())
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_EXISTED));

        // Create event
        RoomEvent event = roomEventMapper.toRoomEvent(request);
        event.setBranch(branch);
        
        // Kiểm tra xem event có nên được activate ngay không
        LocalDate today = LocalDate.now();
        log.info("Checking event activation: today={}, startDate={}, endDate={}", 
                today, request.getStartDate(), request.getEndDate());
        
        boolean isTodayInRange = !today.isBefore(request.getStartDate()) && !today.isAfter(request.getEndDate());
        log.info("Is today in range? {}", isTodayInRange);
        
        if (isTodayInRange) {
            // Ngày hiện tại nằm trong khoảng startDate - endDate
            // Tự động activate event ngay
            event.setStatus(RoomEvent.EventStatus.ACTIVE);
            log.info("Event date range includes today, setting status to ACTIVE");
        } else {
            event.setStatus(RoomEvent.EventStatus.SCHEDULED);
            log.info("Event date range does not include today, setting status to SCHEDULED");
        }

        // Create price adjustments
        List<PriceAdjustment> adjustments = new ArrayList<>();
        for (PriceAdjustmentRequest adjRequest : request.getPriceAdjustments()) {
            PriceAdjustment adjustment = priceAdjustmentMapper.toPriceAdjustment(adjRequest);
            adjustment.setRoomEvent(event);
            adjustments.add(adjustment);
        }
        event.setPriceAdjustments(adjustments);

        RoomEvent savedEvent = roomEventRepository.save(event);
        log.info("Room event created successfully with ID: {}, status: {}", savedEvent.getId(), savedEvent.getStatus());
        
        // Flush để đảm bảo event và adjustments được persist
        roomEventRepository.flush();
        
        // Reload event với JOIN FETCH để đảm bảo priceAdjustments được load đầy đủ
        String eventId = savedEvent.getId();
        RoomEvent eventWithAdjustments = entityManager.createQuery(
                "SELECT DISTINCT e FROM RoomEvent e " +
                "LEFT JOIN FETCH e.priceAdjustments pa " +
                "WHERE e.id = :eventId AND e.deleted = false " +
                "AND (pa.deleted = false OR pa IS NULL)",
                RoomEvent.class)
                .setParameter("eventId", eventId)
                .getSingleResult();
        
        log.info("Reloaded event with {} price adjustment(s)", eventWithAdjustments.getPriceAdjustments().size());

        // Nếu event đã được activate, apply pricing ngay
        if (eventWithAdjustments.getStatus() == RoomEvent.EventStatus.ACTIVE) {
            log.info("Event is active, applying pricing adjustments immediately");
            try {
                roomPricingService.applyEventPricingForAllAdjustments(eventWithAdjustments);
                log.info("Successfully applied pricing for newly created active event. priceFinal should be updated now.");
            } catch (Exception e) {
                log.error("Failed to apply pricing for newly created active event: {}", eventWithAdjustments.getId(), e);
                log.error("Exception details: ", e);
                // Không throw exception để không ảnh hưởng đến việc tạo event
                // Pricing sẽ được apply lại khi application restart hoặc scheduler chạy
            }
        } else {
            log.info("Event status is {}, pricing will be applied when event becomes active", eventWithAdjustments.getStatus());
        }

        return roomEventMapper.toRoomEventResponse(eventWithAdjustments);
    }

    @Override
    @Transactional
    public RoomEventResponse updateEvent(String id, RoomEventUpdateRequest request) {
        log.info("Updating room event: {}", id);
        log.debug("Update request: name={}, startDate={}, endDate={}, branchId={}, adjustmentsCount={}", 
                request.getName(), request.getStartDate(), request.getEndDate(), 
                request.getBranchId(), 
                request.getPriceAdjustments() != null ? request.getPriceAdjustments().size() : 0);

        RoomEvent event = roomEventRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));

        // Không cho phép update event đã COMPLETED
        if (event.getStatus() == RoomEvent.EventStatus.COMPLETED) {
            throw new AppException(ErrorCode.EVENT_ALREADY_COMPLETED);
        }

        // Nếu event đang ACTIVE, cần revert pricing cũ trước khi update
        boolean wasActive = event.getStatus() == RoomEvent.EventStatus.ACTIVE;
        if (wasActive) {
            log.info("Event is currently ACTIVE, reverting old pricing before update");
            try {
                roomPricingService.revertEventPricingForAllAdjustments(event);
                log.info("Successfully reverted old pricing for active event");
            } catch (Exception e) {
                log.error("Failed to revert old pricing for active event: {}", event.getId(), e);
                // Vẫn tiếp tục update, nhưng log warning
            }
        }

        // Validate dates if provided
        LocalDate startDate = request.getStartDate() != null ? request.getStartDate() : event.getStartDate();
        LocalDate endDate = request.getEndDate() != null ? request.getEndDate() : event.getEndDate();
        if (startDate.isAfter(endDate)) {
            throw new AppException(ErrorCode.EVENT_INVALID_DATE_RANGE);
        }

        // Update basic fields
        if (request.getName() != null) event.setName(request.getName());
        if (request.getDescription() != null) event.setDescription(request.getDescription());
        if (request.getStartDate() != null) event.setStartDate(request.getStartDate());
        if (request.getEndDate() != null) event.setEndDate(request.getEndDate());
        if (request.getStatus() != null) event.setStatus(request.getStatus());

        // Update branch if provided
        if (request.getBranchId() != null) {
            Branch branch = branchRepository.findById(request.getBranchId())
                    .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_EXISTED));
            event.setBranch(branch);
        }

        // Update price adjustments if provided
        if (request.getPriceAdjustments() != null) {
            // Validate adjustments first
            if (request.getPriceAdjustments().isEmpty()) {
                throw new AppException(ErrorCode.PRICE_ADJUSTMENTS_REQUIRED);
            }
            
            // Load adjustments to ensure they're in the persistence context
            event.getPriceAdjustments().size(); // Trigger lazy loading
            
            // Remove old adjustments properly
            List<PriceAdjustment> adjustmentsToRemove = new ArrayList<>(event.getPriceAdjustments());
            for (PriceAdjustment adjustment : adjustmentsToRemove) {
                event.removePriceAdjustment(adjustment);
            }

            // Add new adjustments
            for (PriceAdjustmentRequest adjRequest : request.getPriceAdjustments()) {
                // Validate adjustment request - validation annotations should handle this, but double-check
                if (adjRequest.getAdjustmentType() == null) {
                    throw new AppException(ErrorCode.ADJUSTMENT_TYPE_REQUIRED);
                }
                if (adjRequest.getAdjustmentDirection() == null) {
                    throw new AppException(ErrorCode.ADJUSTMENT_DIRECTION_REQUIRED);
                }
                if (adjRequest.getAdjustmentValue() == null) {
                    throw new AppException(ErrorCode.ADJUSTMENT_VALUE_REQUIRED);
                }
                if (adjRequest.getTargetType() == null) {
                    throw new AppException(ErrorCode.TARGET_TYPE_REQUIRED);
                }
                if (adjRequest.getTargetId() == null || adjRequest.getTargetId().trim().isEmpty()) {
                    throw new AppException(ErrorCode.TARGET_ID_REQUIRED);
                }
                
                PriceAdjustment adjustment = priceAdjustmentMapper.toPriceAdjustment(adjRequest);
                event.addPriceAdjustment(adjustment);
            }
            
            log.info("Updated {} price adjustment(s) for event {}", request.getPriceAdjustments().size(), event.getId());
        }

        // Kiểm tra xem event có nên được activate không
        // Nếu status không được set thủ công trong request
        if (request.getStatus() == null) {
            LocalDate today = LocalDate.now();
            if (!today.isBefore(startDate) && !today.isAfter(endDate)) {
                // Ngày hiện tại nằm trong khoảng startDate - endDate
                // Tự động activate event (hoặc giữ ACTIVE nếu đã active)
                event.setStatus(RoomEvent.EventStatus.ACTIVE);
                log.info("Event date range includes today after update, setting status to ACTIVE");
            } else if (wasActive && (today.isBefore(startDate) || today.isAfter(endDate))) {
                // Nếu event đang ACTIVE nhưng ngày hiện tại không còn trong khoảng
                // Chuyển về SCHEDULED hoặc COMPLETED
                if (today.isAfter(endDate)) {
                    event.setStatus(RoomEvent.EventStatus.COMPLETED);
                    log.info("Event end date has passed, setting status to COMPLETED");
                } else {
                    event.setStatus(RoomEvent.EventStatus.SCHEDULED);
                    log.info("Event start date is in the future, setting status to SCHEDULED");
                }
            }
        }

        // Flush để đảm bảo event và adjustments được persist
        RoomEvent updatedEvent = roomEventRepository.save(event);
        roomEventRepository.flush();
        
        // Load lại event với priceAdjustments để đảm bảo relationships được load đầy đủ
        RoomEvent eventWithAdjustments = roomEventRepository.findById(updatedEvent.getId())
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));
        
        log.info("Room event updated successfully: {}, status: {}, adjustments: {}", 
                id, eventWithAdjustments.getStatus(), eventWithAdjustments.getPriceAdjustments().size());

        // Nếu event đang ACTIVE sau khi update, apply pricing mới
        if (eventWithAdjustments.getStatus() == RoomEvent.EventStatus.ACTIVE) {
            log.info("Event is active after update, applying new pricing adjustments");
            try {
                roomPricingService.applyEventPricingForAllAdjustments(eventWithAdjustments);
                log.info("Successfully applied new pricing for updated active event");
            } catch (Exception e) {
                log.error("Failed to apply new pricing for updated active event: {}", eventWithAdjustments.getId(), e);
                // Không throw exception để không ảnh hưởng đến việc update event
            }
        }

        return roomEventMapper.toRoomEventResponse(updatedEvent);
    }

    @Override
    @Transactional
    public void deleteEvent(String id) {
        log.info("Deleting room event: {}", id);

        RoomEvent event = roomEventRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));

        // Chỉ cho phép xóa event SCHEDULED hoặc CANCELLED
        if (event.getStatus() == RoomEvent.EventStatus.ACTIVE) {
            throw new AppException(ErrorCode.CANNOT_DELETE_ACTIVE_EVENT);
        }
        if (event.getStatus() == RoomEvent.EventStatus.COMPLETED) {
            throw new AppException(ErrorCode.CANNOT_DELETE_COMPLETED_EVENT);
        }

        event.setDeleted(true);
        roomEventRepository.save(event);

        log.info("Room event soft deleted: {}", id);
    }

    @Override
    public RoomEventResponse getEventById(String id) {
        log.debug("Fetching room event by ID: {}", id);

        RoomEvent event = roomEventRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));

        return roomEventMapper.toRoomEventResponse(event);
    }

    @Override
    public Page<RoomEventResponse> getAllEvents(Pageable pageable) {
        log.debug("Fetching all room events with pagination: {}", pageable);

        Page<RoomEvent> events = roomEventRepository.findAll(pageable);
        return events.map(roomEventMapper::toRoomEventResponse);
    }

    @Override
    public Page<RoomEventResponse> getEventsByBranch(String branchId, Pageable pageable) {
        log.debug("Fetching room events for branch: {}", branchId);

        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_EXISTED));

        Page<RoomEvent> events = roomEventRepository.findByBranch(branch, pageable);
        return events.map(roomEventMapper::toRoomEventResponse);
    }

    @Override
    public Page<RoomEventResponse> getEventsByStatus(RoomEvent.EventStatus status, Pageable pageable) {
        log.debug("Fetching room events by status: {}", status);

        Page<RoomEvent> events = roomEventRepository.findByStatus(status, pageable);
        return events.map(roomEventMapper::toRoomEventResponse);
    }

    @Override
    public Page<RoomEventResponse> searchEvents(String branchId, RoomEvent.EventStatus status,
                                                  LocalDate startDate, LocalDate endDate, Pageable pageable) {
        log.debug("Searching room events with filters - branchId: {}, status: {}, startDate: {}, endDate: {}",
                branchId, status, startDate, endDate);

        Page<RoomEvent> events = roomEventRepository.findByFilters(branchId, status, startDate, endDate, pageable);
        return events.map(roomEventMapper::toRoomEventResponse);
    }

    @Override
    @Transactional
    public void activateEvent(String id) {
        log.info("Activating room event: {}", id);

        RoomEvent event = roomEventRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));

        if (event.getStatus() != RoomEvent.EventStatus.SCHEDULED) {
            throw new AppException(ErrorCode.EVENT_NOT_SCHEDULED);
        }

        // Change status to ACTIVE
        event.setStatus(RoomEvent.EventStatus.ACTIVE);
        roomEventRepository.save(event);

        // Apply event pricing
        roomPricingService.applyEventPricingForAllAdjustments(event);

        log.info("Room event activated successfully: {}", id);
    }

    @Override
    @Transactional
    public void completeEvent(String id) {
        log.info("Completing room event: {}", id);

        RoomEvent event = roomEventRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));

        if (event.getStatus() != RoomEvent.EventStatus.ACTIVE) {
            throw new AppException(ErrorCode.EVENT_NOT_ACTIVE);
        }

        // Revert event pricing
        roomPricingService.revertEventPricingForAllAdjustments(event);

        // Change status to COMPLETED
        event.setStatus(RoomEvent.EventStatus.COMPLETED);
        roomEventRepository.save(event);

        log.info("Room event completed successfully: {}", id);
    }

    @Override
    @Transactional
    public void cancelEvent(String id) {
        log.info("Cancelling room event: {}", id);

        RoomEvent event = roomEventRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EVENT_NOT_FOUND));

        // Nếu event đang ACTIVE, cần revert pricing trước
        if (event.getStatus() == RoomEvent.EventStatus.ACTIVE) {
            roomPricingService.revertEventPricingForAllAdjustments(event);
        }

        // Change status to CANCELLED
        event.setStatus(RoomEvent.EventStatus.CANCELLED);
        roomEventRepository.save(event);

        log.info("Room event cancelled successfully: {}", id);
    }

    @Override
    public List<RoomEvent> getEventsToActivate(LocalDate date) {
        log.debug("Finding events to activate on date: {}", date);
        return roomEventRepository.findByStartDateAndStatus(date, RoomEvent.EventStatus.SCHEDULED);
    }

    @Override
    public List<RoomEvent> getEventsToComplete(LocalDate date) {
        log.debug("Finding events to complete before date: {}", date);
        return roomEventRepository.findByEndDateBeforeAndStatus(date, RoomEvent.EventStatus.ACTIVE);
    }
    
    @Override
    public List<RoomEvent> getActiveEventsOnDate(LocalDate date) {
        log.debug("Finding active events on date: {}", date);
        return roomEventRepository.findActiveEventsOnDate(date);
    }
}


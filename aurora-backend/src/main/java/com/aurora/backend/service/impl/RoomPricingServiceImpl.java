package com.aurora.backend.service.impl;

import com.aurora.backend.entity.PriceAdjustment;
import com.aurora.backend.entity.Room;
import com.aurora.backend.entity.RoomEvent;
import com.aurora.backend.exception.AppException;
import com.aurora.backend.enums.ErrorCode;
import com.aurora.backend.repository.PriceAdjustmentRepository;
import com.aurora.backend.repository.RoomCategoryRepository;
import com.aurora.backend.repository.RoomRepository;
import com.aurora.backend.repository.RoomTypeRepository;
import com.aurora.backend.service.RoomPricingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@Transactional
public class RoomPricingServiceImpl implements RoomPricingService {

    RoomRepository roomRepository;
    RoomTypeRepository roomTypeRepository;
    RoomCategoryRepository roomCategoryRepository;
    PriceAdjustmentRepository priceAdjustmentRepository;

    @Override
    public void recalculatePriceFromBase(Room room) {
        if (room.getBasePrice() == null) {
            log.warn("Room {} has null basePrice, skipping price calculation", room.getId());
            return;
        }

        BigDecimal basePrice = room.getBasePrice();
        BigDecimal salePercent = room.getSalePercent() != null ? room.getSalePercent() : BigDecimal.ZERO;

        // priceFinal = basePrice × (100 - salePercent) / 100
        BigDecimal discountMultiplier = BigDecimal.valueOf(100)
                .subtract(salePercent)
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        BigDecimal priceFinal = basePrice.multiply(discountMultiplier)
                .setScale(0, RoundingMode.HALF_UP); // Làm tròn thành số nguyên

        // Cập nhật priceFinal TRỰC TIẾP vào database bằng native query để bypass @PreUpdate callback
        int updatedRows = roomRepository.updatePriceFinalDirectly(room.getId(), priceFinal);
        
        if (updatedRows == 0) {
            log.warn("Failed to update priceFinal for room {} - no rows affected", room.getId());
        }
        
        // Flush để đảm bảo update được persist
        roomRepository.flush();

        log.debug("Recalculated price for room {}: basePrice={}, salePercent={}%, priceFinal={}",
                room.getId(), basePrice, salePercent, priceFinal);
    }

    @Override
    public void recalculateAllRoomPrices() {
        log.info("Starting recalculation of all room prices from base price and sale percent");

        List<Room> allRooms = roomRepository.findAll();
        int updatedCount = 0;

        for (Room room : allRooms) {
            if (!room.getDeleted()) {
                recalculatePriceFromBase(room);
                updatedCount++;
            }
        }

        log.info("Completed recalculation of {} room prices", updatedCount);
    }

    @Override
    public void applyEventPricing(Room room, PriceAdjustment adjustment) {
        if (room.getBasePrice() == null) {
            log.warn("Room {} has null basePrice, skipping event pricing", room.getId());
            return;
        }

        BigDecimal basePrice = room.getBasePrice();
        BigDecimal adjustmentValue = adjustment.getAdjustmentValue();
        BigDecimal newPrice;

        // Tính giá mới dựa trên adjustmentType và adjustmentDirection
        if (adjustment.getAdjustmentType() == PriceAdjustment.AdjustmentType.PERCENTAGE) {
            // Điều chỉnh theo phần trăm
            if (adjustment.getAdjustmentDirection() == PriceAdjustment.AdjustmentDirection.INCREASE) {
                // INCREASE: priceFinal = basePrice × (100 + adjustmentValue) / 100
                newPrice = basePrice.multiply(
                        BigDecimal.valueOf(100).add(adjustmentValue)
                                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP)
                );
            } else {
                // DECREASE: priceFinal = basePrice × (100 - adjustmentValue) / 100
                newPrice = basePrice.multiply(
                        BigDecimal.valueOf(100).subtract(adjustmentValue)
                                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP)
                );
            }
        } else {
            // Điều chỉnh theo số tiền cố định
            if (adjustment.getAdjustmentDirection() == PriceAdjustment.AdjustmentDirection.INCREASE) {
                // INCREASE: priceFinal = basePrice + adjustmentValue
                newPrice = basePrice.add(adjustmentValue);
            } else {
                // DECREASE: priceFinal = basePrice - adjustmentValue
                newPrice = basePrice.subtract(adjustmentValue);
            }
        }

        // Đảm bảo giá không âm
        if (newPrice.compareTo(BigDecimal.ZERO) < 0) {
            log.warn("Calculated price for room {} is negative ({}), setting to 0", room.getId(), newPrice);
            newPrice = BigDecimal.ZERO;
        }

        // Làm tròn thành số nguyên
        newPrice = newPrice.setScale(0, RoundingMode.HALF_UP);

        // Cập nhật priceFinal TRỰC TIẾP vào database bằng native query để bypass @PreUpdate callback
        // @PreUpdate trong Room entity sẽ tự động tính lại priceFinal từ basePrice và salePercent
        // nên phải dùng native query để update trực tiếp
        int updatedRows = roomRepository.updatePriceFinalDirectly(room.getId(), newPrice);
        
        if (updatedRows == 0) {
            log.warn("Failed to update priceFinal for room {} - no rows affected", room.getId());
        } else {
            log.info("Successfully updated priceFinal directly in database for room {}", room.getId());
        }
        
        // Flush để đảm bảo update được persist ngay lập tức
        roomRepository.flush();
        
        // Reload room từ database để verify priceFinal đã được cập nhật
        Room updatedRoom = roomRepository.findById(room.getId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
        
        log.info("Applied event pricing to room {} (roomNumber: {}): basePrice={}, adjustment={}% {}, calculatedPrice={}, priceFinal in DB={}",
                updatedRoom.getId(), updatedRoom.getRoomNumber(), basePrice, adjustmentValue, 
                adjustment.getAdjustmentDirection(), newPrice, updatedRoom.getPriceFinal());
    }

    @Override
    public void revertEventPricing(Room room) {
        log.debug("Reverting event pricing for room {}", room.getId());
        recalculatePriceFromBase(room);
    }

    @Override
    public void applyPricingForTarget(PriceAdjustment adjustment) {
        List<Room> affectedRooms = getAffectedRooms(adjustment);

        log.info("Applying pricing adjustment to {} rooms for target {} ({})",
                affectedRooms.size(), adjustment.getTargetType(), adjustment.getTargetId());

        if (affectedRooms.isEmpty()) {
            log.warn("No rooms found for adjustment target {} ({})", adjustment.getTargetType(), adjustment.getTargetId());
            return;
        }

        for (Room room : affectedRooms) {
            log.info("Applying pricing to room {} (roomNumber: {}, basePrice: {}, currentPriceFinal: {})", 
                    room.getId(), room.getRoomNumber(), room.getBasePrice(), room.getPriceFinal());
            
            // Reload room từ database để đảm bảo có dữ liệu mới nhất
            Room freshRoom = roomRepository.findById(room.getId())
                    .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
            
            applyEventPricing(freshRoom, adjustment);
            
            // Verify sau khi apply
            Room verifiedRoom = roomRepository.findById(freshRoom.getId())
                    .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
            log.info("Verified room {} priceFinal after update: {}", verifiedRoom.getId(), verifiedRoom.getPriceFinal());
        }
    }

    @Override
    public void applyEventPricingForAllAdjustments(RoomEvent event) {
        log.info("Applying event pricing for all adjustments of event: {} (ID: {})", event.getName(), event.getId());
        
        if (event.getPriceAdjustments() == null || event.getPriceAdjustments().isEmpty()) {
            log.warn("Event {} has no price adjustments to apply", event.getId());
            return;
        }
        
        log.info("Event has {} price adjustment(s)", event.getPriceAdjustments().size());

        int adjustmentCount = 0;
        for (PriceAdjustment adjustment : event.getPriceAdjustments()) {
            if (adjustment.getDeleted()) {
                log.debug("Skipping deleted adjustment: {}", adjustment.getId());
                continue;
            }
            
            adjustmentCount++;
            log.info("Processing adjustment #{}: type={}, direction={}, value={}, targetType={}, targetId={}",
                    adjustmentCount, adjustment.getAdjustmentType(), adjustment.getAdjustmentDirection(),
                    adjustment.getAdjustmentValue(), adjustment.getTargetType(), adjustment.getTargetId());
            
            try {
                applyPricingForTarget(adjustment);
            } catch (Exception e) {
                log.error("Failed to apply pricing for adjustment {}: {}", adjustment.getId(), e.getMessage(), e);
                // Tiếp tục với adjustment tiếp theo
            }
        }

        log.info("Completed applying event pricing for event: {} (processed {} adjustments)", 
                event.getName(), adjustmentCount);
    }

    @Override
    public void revertEventPricingForAllAdjustments(RoomEvent event) {
        log.info("Reverting event pricing for all adjustments of event: {}", event.getName());

        for (PriceAdjustment adjustment : event.getPriceAdjustments()) {
            if (!adjustment.getDeleted()) {
                List<Room> affectedRooms = getAffectedRooms(adjustment);
                for (Room room : affectedRooms) {
                    revertEventPricing(room);
                }
            }
        }

        log.info("Completed reverting event pricing for event: {}", event.getName());
    }

    @Override
    public List<Room> getAffectedRooms(PriceAdjustment adjustment) {
        List<Room> rooms = new ArrayList<>();

        switch (adjustment.getTargetType()) {
            case SPECIFIC_ROOM:
                // Áp dụng cho phòng cụ thể
                log.debug("Looking for specific room with ID: {}", adjustment.getTargetId());
                roomRepository.findById(adjustment.getTargetId())
                        .ifPresent(room -> {
                            log.debug("Found room: {} (roomNumber: {})", room.getId(), room.getRoomNumber());
                            rooms.add(room);
                        });
                if (rooms.isEmpty()) {
                    log.warn("Room not found with ID: {}", adjustment.getTargetId());
                }
                break;

            case ROOM_TYPE:
                // Áp dụng cho tất cả phòng thuộc room type
                List<Room> roomTypeRooms = roomRepository.findByRoomTypeId(adjustment.getTargetId());
                rooms.addAll(roomTypeRooms);
                break;

            case CATEGORY:
                // Áp dụng cho tất cả phòng thuộc các room type có category này
                // Verify category exists
                roomCategoryRepository.findById(adjustment.getTargetId())
                        .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));

                var roomTypes = roomTypeRepository.findByCategoryId(adjustment.getTargetId());
                for (var roomType : roomTypes) {
                    rooms.addAll(roomRepository.findByRoomTypeId(roomType.getId()));
                }
                break;
        }

        // Lọc các phòng đã bị xóa
        rooms.removeIf(Room::getDeleted);

        return rooms;
    }

    @Override
    public void applyActiveEventPricingForRoom(Room room) {
        if (room.getBasePrice() == null) {
            log.debug("Room {} has null basePrice, skipping active event pricing check", room.getId());
            return;
        }

        // Lấy category ID từ room type nếu có
        String categoryId = null;
        if (room.getRoomType() != null && room.getRoomType().getCategory() != null) {
            categoryId = room.getRoomType().getCategory().getId();
        }

        // Tìm tất cả active adjustments ảnh hưởng đến room này
        LocalDate today = LocalDate.now();
        List<PriceAdjustment> activeAdjustments = priceAdjustmentRepository.findActiveAdjustmentsForRoom(
                room.getId(),
                room.getRoomType() != null ? room.getRoomType().getId() : null,
                categoryId,
                today
        );

        if (activeAdjustments.isEmpty()) {
            log.debug("No active event adjustments found for room {}", room.getId());
            return;
        }

        log.info("Found {} active adjustment(s) for room {}, applying event pricing", 
                activeAdjustments.size(), room.getId());

        // Apply tất cả adjustments (adjustment cuối cùng sẽ override nếu có nhiều)
        // Trong thực tế, mỗi event chỉ nên có 1 adjustment cho mỗi target
        for (PriceAdjustment adjustment : activeAdjustments) {
            // Kiểm tra xem event có đang active không (double check)
            RoomEvent event = adjustment.getRoomEvent();
            if (event != null && event.getStatus() == RoomEvent.EventStatus.ACTIVE) {
                applyEventPricing(room, adjustment);
                log.debug("Applied active event pricing for room {} from adjustment {}", 
                        room.getId(), adjustment.getId());
            }
        }
    }
}


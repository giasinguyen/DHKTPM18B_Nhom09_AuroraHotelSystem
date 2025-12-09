package com.aurora.backend.service;

import com.aurora.backend.dto.request.RoomEventCreationRequest;
import com.aurora.backend.dto.request.RoomEventUpdateRequest;
import com.aurora.backend.dto.response.RoomEventResponse;
import com.aurora.backend.entity.RoomEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface RoomEventService {
    
    /**
     * Tạo sự kiện mới
     */
    RoomEventResponse createEvent(RoomEventCreationRequest request);
    
    /**
     * Cập nhật sự kiện
     */
    RoomEventResponse updateEvent(String id, RoomEventUpdateRequest request);
    
    /**
     * Xóa sự kiện (chỉ cho phép xóa nếu status = SCHEDULED)
     */
    void deleteEvent(String id);
    
    /**
     * Lấy thông tin sự kiện theo ID
     */
    RoomEventResponse getEventById(String id);
    
    /**
     * Lấy danh sách tất cả sự kiện với phân trang
     */
    Page<RoomEventResponse> getAllEvents(Pageable pageable);
    
    /**
     * Lấy danh sách sự kiện theo branch
     */
    Page<RoomEventResponse> getEventsByBranch(String branchId, Pageable pageable);
    
    /**
     * Lấy danh sách sự kiện theo status
     */
    Page<RoomEventResponse> getEventsByStatus(RoomEvent.EventStatus status, Pageable pageable);
    
    /**
     * Tìm kiếm sự kiện với filter
     */
    Page<RoomEventResponse> searchEvents(String branchId, RoomEvent.EventStatus status,
                                          LocalDate startDate, LocalDate endDate, Pageable pageable);
    
    /**
     * Kích hoạt sự kiện (chuyển từ SCHEDULED sang ACTIVE và áp dụng giá)
     */
    void activateEvent(String id);
    
    /**
     * Hoàn thành sự kiện (chuyển từ ACTIVE sang COMPLETED và khôi phục giá)
     */
    void completeEvent(String id);
    
    /**
     * Hủy sự kiện
     */
    void cancelEvent(String id);
    
    /**
     * Lấy danh sách events cần được kích hoạt (startDate = today, status = SCHEDULED)
     */
    List<RoomEvent> getEventsToActivate(LocalDate date);
    
    /**
     * Lấy danh sách events cần được hoàn thành (endDate < today, status = ACTIVE)
     */
    List<RoomEvent> getEventsToComplete(LocalDate date);
    
    /**
     * Lấy danh sách events đang active (currentDate nằm trong [startDate, endDate] và status = ACTIVE)
     */
    List<RoomEvent> getActiveEventsOnDate(LocalDate date);
}


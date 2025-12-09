package com.aurora.backend.repository;

import com.aurora.backend.entity.PriceAdjustment;
import com.aurora.backend.entity.RoomEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PriceAdjustmentRepository extends JpaRepository<PriceAdjustment, String> {
    
    // Tìm tất cả adjustments của một event
    List<PriceAdjustment> findByRoomEvent(RoomEvent roomEvent);
    
    // Tìm adjustments theo target type
    List<PriceAdjustment> findByTargetType(PriceAdjustment.TargetType targetType);
    
    // Tìm adjustments theo target type và target ID
    List<PriceAdjustment> findByTargetTypeAndTargetId(PriceAdjustment.TargetType targetType, 
                                                        String targetId);
    
    // Tìm adjustments của một event theo target type
    @Query("SELECT pa FROM PriceAdjustment pa WHERE pa.roomEvent = :roomEvent " +
           "AND pa.targetType = :targetType AND pa.deleted = false")
    List<PriceAdjustment> findByRoomEventAndTargetType(@Param("roomEvent") RoomEvent roomEvent,
                                                         @Param("targetType") PriceAdjustment.TargetType targetType);
    
    // Tìm adjustments ảnh hưởng đến một room cụ thể
    // Chỉ trả về adjustments của events đang ACTIVE và ngày hiện tại nằm trong khoảng startDate - endDate
    @Query("SELECT pa FROM PriceAdjustment pa " +
           "WHERE pa.roomEvent.status = 'ACTIVE' " +
           "AND :currentDate BETWEEN pa.roomEvent.startDate AND pa.roomEvent.endDate " +
           "AND pa.roomEvent.deleted = false " +
           "AND pa.deleted = false " +
           "AND (" +
           "  (pa.targetType = 'SPECIFIC_ROOM' AND pa.targetId = :roomId) OR " +
           "  (pa.targetType = 'ROOM_TYPE' AND pa.targetId = :roomTypeId) OR " +
           "  (pa.targetType = 'CATEGORY' AND pa.targetId = :categoryId)" +
           ")")
    List<PriceAdjustment> findActiveAdjustmentsForRoom(@Param("roomId") String roomId,
                                                         @Param("roomTypeId") String roomTypeId,
                                                         @Param("categoryId") String categoryId,
                                                         @Param("currentDate") LocalDate currentDate);
}


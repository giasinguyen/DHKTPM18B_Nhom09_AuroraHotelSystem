package com.aurora.backend.service;

import com.aurora.backend.entity.PriceAdjustment;
import com.aurora.backend.entity.Room;
import com.aurora.backend.entity.RoomEvent;

import java.util.List;

/**
 * Service xử lý logic tính toán và cập nhật giá phòng
 */
public interface RoomPricingService {
    
    /**
     * Tính lại giá final từ basePrice và salePercent (giá thường)
     * priceFinal = basePrice × (100 - salePercent) / 100
     */
    void recalculatePriceFromBase(Room room);
    
    /**
     * Tính lại giá final cho tất cả phòng từ basePrice và salePercent
     */
    void recalculateAllRoomPrices();
    
    /**
     * Áp dụng điều chỉnh giá từ event (thay thế giá thường)
     * Tính toán dựa trên adjustmentType, adjustmentDirection và adjustmentValue
     */
    void applyEventPricing(Room room, PriceAdjustment adjustment);
    
    /**
     * Khôi phục giá thường cho phòng (sau khi event kết thúc)
     * Tính lại từ basePrice và salePercent
     */
    void revertEventPricing(Room room);
    
    /**
     * Áp dụng điều chỉnh giá cho tất cả phòng theo targetType
     * - CATEGORY: Áp dụng cho tất cả phòng thuộc category
     * - ROOM_TYPE: Áp dụng cho tất cả phòng thuộc room type
     * - SPECIFIC_ROOM: Áp dụng cho phòng cụ thể
     */
    void applyPricingForTarget(PriceAdjustment adjustment);
    
    /**
     * Áp dụng tất cả adjustments của một event
     */
    void applyEventPricingForAllAdjustments(RoomEvent event);
    
    /**
     * Khôi phục giá thường cho tất cả phòng bị ảnh hưởng bởi event
     */
    void revertEventPricingForAllAdjustments(RoomEvent event);
    
    /**
     * Lấy danh sách phòng bị ảnh hưởng bởi một adjustment
     */
    List<Room> getAffectedRooms(PriceAdjustment adjustment);
    
    /**
     * Áp dụng lại event pricing cho một room cụ thể nếu có event đang active
     * Được gọi sau khi update room để đảm bảo giá được cập nhật đúng
     */
    void applyActiveEventPricingForRoom(Room room);
}


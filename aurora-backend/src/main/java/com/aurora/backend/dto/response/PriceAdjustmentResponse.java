package com.aurora.backend.dto.response;

import com.aurora.backend.entity.PriceAdjustment;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PriceAdjustmentResponse {
    
    String id;
    
    PriceAdjustment.AdjustmentType adjustmentType; // PERCENTAGE hoặc FIXED_AMOUNT
    
    PriceAdjustment.AdjustmentDirection adjustmentDirection; // INCREASE hoặc DECREASE
    
    BigDecimal adjustmentValue; // Giá trị điều chỉnh
    
    PriceAdjustment.TargetType targetType; // CATEGORY, ROOM_TYPE, SPECIFIC_ROOM
    
    String targetId; // ID của đối tượng áp dụng
    
    String targetName; // Tên để hiển thị
}


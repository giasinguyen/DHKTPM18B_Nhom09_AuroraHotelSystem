package com.aurora.backend.dto.request;

import com.aurora.backend.entity.PriceAdjustment;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PriceAdjustmentRequest {
    
    @NotNull(message = "ADJUSTMENT_TYPE_REQUIRED")
    PriceAdjustment.AdjustmentType adjustmentType; // PERCENTAGE hoặc FIXED_AMOUNT
    
    @NotNull(message = "ADJUSTMENT_DIRECTION_REQUIRED")
    PriceAdjustment.AdjustmentDirection adjustmentDirection; // INCREASE hoặc DECREASE
    
    @NotNull(message = "ADJUSTMENT_VALUE_REQUIRED")
    @DecimalMin(value = "0.0", inclusive = false, message = "ADJUSTMENT_VALUE_POSITIVE")
    BigDecimal adjustmentValue; // Giá trị điều chỉnh (luôn dương)
    
    @NotNull(message = "TARGET_TYPE_REQUIRED")
    PriceAdjustment.TargetType targetType; // CATEGORY, ROOM_TYPE, SPECIFIC_ROOM
    
    @NotBlank(message = "TARGET_ID_REQUIRED")
    String targetId; // ID của đối tượng áp dụng
    
    String targetName; // Tên để hiển thị (optional, có thể được set từ service)
}


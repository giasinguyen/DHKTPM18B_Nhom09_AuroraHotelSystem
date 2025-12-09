package com.aurora.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

/**
 * PriceAdjustment Entity - Điều chỉnh giá cho Room Event
 * Mỗi adjustment xác định cách thay đổi giá cho một target cụ thể
 */
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "price_adjustments",
       indexes = {
           @Index(name = "idx_adjustment_event", columnList = "room_event_id"),
           @Index(name = "idx_adjustment_target", columnList = "target_type, target_id")
       })
public class PriceAdjustment extends BaseEntity {

    @NotNull(message = "Room event is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_event_id", nullable = false)
    RoomEvent roomEvent; // Sự kiện mà adjustment này thuộc về

    @NotNull(message = "Adjustment type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "adjustment_type", nullable = false, length = 20)
    AdjustmentType adjustmentType; // PERCENTAGE hoặc FIXED_AMOUNT

    @NotNull(message = "Adjustment direction is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "adjustment_direction", nullable = false, length = 20)
    AdjustmentDirection adjustmentDirection; // INCREASE hoặc DECREASE

    @NotNull(message = "Adjustment value is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Adjustment value must be greater than 0")
    @Column(name = "adjustment_value", nullable = false, precision = 10, scale = 2)
    BigDecimal adjustmentValue; // Giá trị điều chỉnh (luôn dương)

    @NotNull(message = "Target type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "target_type", nullable = false, length = 20)
    TargetType targetType; // Loại đối tượng áp dụng

    @NotBlank(message = "Target ID is required")
    @Size(max = 100, message = "Target ID cannot exceed 100 characters")
    @Column(name = "target_id", nullable = false, length = 100)
    String targetId; // ID của Category/RoomType/Room

    @Size(max = 200, message = "Target name cannot exceed 200 characters")
    @Column(name = "target_name", length = 200)
    String targetName; // Tên để hiển thị (cached for performance)

    // Enum cho loại điều chỉnh
    public enum AdjustmentType {
        PERCENTAGE,    // Điều chỉnh theo phần trăm
        FIXED_AMOUNT   // Điều chỉnh theo số tiền cố định
    }

    // Enum cho hướng điều chỉnh
    public enum AdjustmentDirection {
        INCREASE,  // Tăng giá
        DECREASE   // Giảm giá
    }

    // Enum cho loại đối tượng áp dụng
    public enum TargetType {
        CATEGORY,       // Áp dụng cho toàn bộ category (hạng phòng)
        ROOM_TYPE,      // Áp dụng cho loại phòng cụ thể
        SPECIFIC_ROOM   // Áp dụng cho phòng cụ thể
    }
}


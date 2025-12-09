package com.aurora.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * RoomEvent Entity - Quản lý sự kiện điều chỉnh giá phòng
 * Sử dụng cho các dịp lễ tết, ngày đặc biệt
 */
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "room_events",
       indexes = {
           @Index(name = "idx_event_status", columnList = "status"),
           @Index(name = "idx_event_branch", columnList = "branch_id"),
           @Index(name = "idx_event_dates", columnList = "start_date, end_date"),
           @Index(name = "idx_event_start_date", columnList = "start_date"),
           @Index(name = "idx_event_end_date", columnList = "end_date")
       })
public class RoomEvent extends BaseEntity {

    @NotBlank(message = "Event name is required")
    @Size(max = 200, message = "Event name cannot exceed 200 characters")
    @Column(nullable = false, length = 200)
    String name; // Tên sự kiện: "Tết Nguyên Đán 2026", "Lễ 30/4 - 1/5"

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    @Column(length = 1000)
    String description; // Mô tả chi tiết về sự kiện

    @NotNull(message = "Start date is required")
    @Column(name = "start_date", nullable = false)
    LocalDate startDate; // Ngày bắt đầu áp dụng giá

    @NotNull(message = "End date is required")
    @Column(name = "end_date", nullable = false)
    LocalDate endDate; // Ngày kết thúc áp dụng giá

    @NotNull(message = "Event status is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    EventStatus status = EventStatus.SCHEDULED; // Trạng thái sự kiện

    @NotNull(message = "Branch is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    Branch branch; // Chi nhánh áp dụng sự kiện

    // Danh sách các điều chỉnh giá
    @OneToMany(mappedBy = "roomEvent", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    List<PriceAdjustment> priceAdjustments = new ArrayList<>();

    // Helper method để thêm price adjustment
    public void addPriceAdjustment(PriceAdjustment adjustment) {
        priceAdjustments.add(adjustment);
        adjustment.setRoomEvent(this);
    }

    // Helper method để xóa price adjustment
    public void removePriceAdjustment(PriceAdjustment adjustment) {
        priceAdjustments.remove(adjustment);
        adjustment.setRoomEvent(null);
    }

    // Enum cho trạng thái sự kiện
    public enum EventStatus {
        SCHEDULED,   // Đã lên lịch (chưa đến ngày startDate)
        ACTIVE,      // Đang diễn ra (trong khoảng startDate - endDate)
        COMPLETED,   // Đã kết thúc (sau endDate)
        CANCELLED    // Đã hủy
    }
}


package com.aurora.backend.dto.request;

import com.aurora.backend.entity.RoomEvent;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomEventUpdateRequest {
    
    @Size(max = 200, message = "EVENT_NAME_TOO_LONG")
    String name; // Tên sự kiện
    
    @Size(max = 1000, message = "EVENT_DESCRIPTION_TOO_LONG")
    String description; // Mô tả sự kiện
    
    LocalDate startDate; // Ngày bắt đầu
    
    LocalDate endDate; // Ngày kết thúc
    
    RoomEvent.EventStatus status; // Trạng thái sự kiện
    
    String branchId; // Chi nhánh áp dụng
    
    @Valid
    List<PriceAdjustmentRequest> priceAdjustments; // Danh sách điều chỉnh giá
}


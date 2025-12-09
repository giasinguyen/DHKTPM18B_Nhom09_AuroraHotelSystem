package com.aurora.backend.dto.response;

import com.aurora.backend.entity.RoomEvent;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomEventResponse {
    
    String id;
    
    String name; // Tên sự kiện
    
    String description; // Mô tả sự kiện
    
    LocalDate startDate; // Ngày bắt đầu
    
    LocalDate endDate; // Ngày kết thúc
    
    RoomEvent.EventStatus status; // Trạng thái sự kiện
    
    String branchId; // ID chi nhánh
    
    String branchName; // Tên chi nhánh (để hiển thị)
    
    List<PriceAdjustmentResponse> priceAdjustments; // Danh sách điều chỉnh giá
    
    LocalDateTime createdAt;
    
    LocalDateTime updatedAt;
    
    String createdBy;
    
    String updatedBy;
}


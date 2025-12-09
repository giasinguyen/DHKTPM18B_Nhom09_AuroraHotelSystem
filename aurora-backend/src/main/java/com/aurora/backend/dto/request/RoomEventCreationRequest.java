package com.aurora.backend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
public class RoomEventCreationRequest {
    
    @NotBlank(message = "EVENT_NAME_REQUIRED")
    @Size(max = 200, message = "EVENT_NAME_TOO_LONG")
    String name; // Tên sự kiện
    
    @Size(max = 1000, message = "EVENT_DESCRIPTION_TOO_LONG")
    String description; // Mô tả sự kiện
    
    @NotNull(message = "START_DATE_REQUIRED")
    LocalDate startDate; // Ngày bắt đầu
    
    @NotNull(message = "END_DATE_REQUIRED")
    LocalDate endDate; // Ngày kết thúc
    
    @NotBlank(message = "BRANCH_ID_REQUIRED")
    String branchId; // Chi nhánh áp dụng
    
    @NotEmpty(message = "PRICE_ADJUSTMENTS_REQUIRED")
    @Valid
    List<PriceAdjustmentRequest> priceAdjustments; // Danh sách điều chỉnh giá
}


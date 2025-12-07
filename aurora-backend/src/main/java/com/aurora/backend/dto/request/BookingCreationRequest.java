package com.aurora.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Future;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingCreationRequest {
    @NotBlank(message = "BOOKING_CODE_REQUIRED")
    String bookingCode;
    
    @NotBlank(message = "BRANCH_ID_REQUIRED")
    String branchId;
    
    // Customer ID is optional - null for walk-in guests
    String customerId;
    
    // Guest information (required if customerId is null)
    String guestFullName;
    String guestEmail;
    String guestPhone;
    
    @NotNull(message = "BOOKING_DATE_REQUIRED")
    @Future(message = "CHECKIN_DATE_FUTURE")
    LocalDate checkin;
    
    @NotNull(message = "BOOKING_DATE_REQUIRED")
    @Future(message = "CHECKOUT_DATE_FUTURE")
    LocalDate checkout;
    
    Double totalPrice;
    String status;
    String paymentStatus;
    String specialRequest;
}

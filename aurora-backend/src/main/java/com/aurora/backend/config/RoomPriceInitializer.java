package com.aurora.backend.config;

import com.aurora.backend.entity.RoomEvent;
import com.aurora.backend.service.RoomEventService;
import com.aurora.backend.service.RoomPricingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

/**
 * Initializer chạy khi application khởi động
 * Đảm bảo tính nhất quán của giá phòng:
 * 1. Tính lại tất cả giá phòng từ basePrice + salePercent
 * 2. Áp dụng lại giá cho các events đang ACTIVE
 */
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomPriceInitializer implements ApplicationRunner {

    RoomPricingService roomPricingService;
    RoomEventService roomEventService;

    @Override
    public void run(ApplicationArguments args) {
        log.info("========== Starting Room Price Initialization ==========");

        try {
            // Bước 1: Tính lại tất cả giá phòng từ basePrice + salePercent
            recalculateAllRoomPrices();

            // Bước 2: Tìm và áp dụng lại các active events
            applyActiveEvents();

            log.info("========== Room Price Initialization Completed Successfully ==========");
        } catch (Exception e) {
            log.error("Error occurred during room price initialization", e);
            // Không throw exception để không ngăn application khởi động
            // Nhưng log rõ ràng để admin biết có vấn đề
        }
    }

    /**
     * Bước 1: Tính lại tất cả giá phòng từ basePrice + salePercent
     * Đảm bảo priceFinal = basePrice × (100 - salePercent) / 100
     * 
     * LƯU Ý: Bước này reset tất cả giá về giá thường (basePrice + salePercent)
     * Sau đó bước 2 sẽ apply lại event pricing nếu có event đang active
     */
    @Transactional
    private void recalculateAllRoomPrices() {
        log.info("Step 1: Recalculating all room prices from base price and sale percent");
        log.info("This will reset all prices to normal pricing (basePrice × (100 - salePercent) / 100)");
        log.info("Event pricing will be reapplied in Step 2 if there are active events");

        try {
            roomPricingService.recalculateAllRoomPrices();
            log.info("Successfully recalculated all room prices to normal pricing");
        } catch (Exception e) {
            log.error("Failed to recalculate room prices", e);
            throw e;
        }
    }

    /**
     * Bước 2: Tìm tất cả events đang ACTIVE và áp dụng lại giá
     * Active event = ngày hiện tại nằm trong khoảng [startDate, endDate] và status = ACTIVE
     * 
     * LƯU Ý: Event pricing được tính dựa trên basePrice (không phải priceFinal hiện tại)
     * - PERCENTAGE INCREASE: priceFinal = basePrice × (100 + adjustmentValue) / 100
     * - PERCENTAGE DECREASE: priceFinal = basePrice × (100 - adjustmentValue) / 100
     * - FIXED_AMOUNT INCREASE: priceFinal = basePrice + adjustmentValue
     * - FIXED_AMOUNT DECREASE: priceFinal = basePrice - adjustmentValue
     */
    @Transactional
    private void applyActiveEvents() {
        log.info("Step 2: Finding and applying active room events");
        log.info("Event pricing will be calculated based on basePrice (not current priceFinal)");

        LocalDate today = LocalDate.now();
        log.info("Current date: {}", today);

        try {
            // Tìm tất cả events đang active (sử dụng repository trực tiếp)
            List<RoomEvent> activeEvents = roomEventService.getActiveEventsOnDate(today);

            if (activeEvents.isEmpty()) {
                log.info("No active events found for today ({}). All rooms will keep normal pricing.", today);
                return;
            }

            log.info("Found {} active event(s) to apply for date: {}", activeEvents.size(), today);

            int successCount = 0;
            int failureCount = 0;

            for (RoomEvent event : activeEvents) {
                try {
                    log.info("Processing active event: {} (ID: {}), startDate: {}, endDate: {}, status: {}",
                            event.getName(), event.getId(), event.getStartDate(), event.getEndDate(), event.getStatus());
                    
                    // Kiểm tra xem event có adjustments không
                    if (event.getPriceAdjustments() == null || event.getPriceAdjustments().isEmpty()) {
                        log.warn("Event {} (ID: {}) has no price adjustments, skipping", event.getName(), event.getId());
                        continue;
                    }
                    
                    log.info("Event {} (ID: {}) has {} price adjustment(s)", event.getName(), event.getId(), event.getPriceAdjustments().size());
                    
                    // Apply pricing - tính dựa trên basePrice
                    roomPricingService.applyEventPricingForAllAdjustments(event);
                    successCount++;
                    log.info("Successfully applied pricing for event: {} (ID: {})", event.getName(), event.getId());
                } catch (Exception e) {
                    failureCount++;
                    log.error("Failed to apply pricing for event: {} (ID: {})", event.getName(), event.getId(), e);
                    log.error("Exception details: ", e);
                }
            }

            log.info("Active event application summary: {} succeeded, {} failed", successCount, failureCount);
        } catch (Exception e) {
            log.error("Failed to apply active events", e);
            throw e;
        }
    }
}


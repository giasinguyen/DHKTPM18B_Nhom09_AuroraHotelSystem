package com.aurora.backend.scheduler;

import com.aurora.backend.entity.RoomEvent;
import com.aurora.backend.service.RoomEventService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/**
 * Scheduler để tự động kích hoạt và hoàn thành các room events
 * Chạy hàng ngày lúc 00:00 (midnight)
 */
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomEventScheduler {

    RoomEventService roomEventService;

    /**
     * Chạy hàng ngày lúc 00:00 để:
     * 1. Kích hoạt các events có startDate = hôm nay
     * 2. Hoàn thành các events có endDate < hôm nay
     */
    @Scheduled(cron = "0 0 0 * * *") // Chạy lúc 00:00:00 mỗi ngày
    public void processRoomEvents() {
        LocalDate today = LocalDate.now();
        log.info("========== Starting Room Event Scheduler at {} ==========", today);

        try {
            // 1. Kích hoạt các events cần được kích hoạt
            activateScheduledEvents(today);

            // 2. Hoàn thành các events đã hết hạn
            completeExpiredEvents(today);

            log.info("========== Room Event Scheduler completed successfully ==========");
        } catch (Exception e) {
            log.error("Error occurred during room event scheduling", e);
        }
    }

    /**
     * Kích hoạt các events có startDate = today và status = SCHEDULED
     */
    private void activateScheduledEvents(LocalDate today) {
        log.info("Checking for events to activate on {}", today);

        List<RoomEvent> eventsToActivate = roomEventService.getEventsToActivate(today);

        if (eventsToActivate.isEmpty()) {
            log.info("No events to activate today");
            return;
        }

        log.info("Found {} event(s) to activate", eventsToActivate.size());

        int successCount = 0;
        int failureCount = 0;

        for (RoomEvent event : eventsToActivate) {
            try {
                log.info("Activating event: {} (ID: {})", event.getName(), event.getId());
                roomEventService.activateEvent(event.getId());
                successCount++;
                log.info("Successfully activated event: {}", event.getName());
            } catch (Exception e) {
                failureCount++;
                log.error("Failed to activate event: {} (ID: {})", event.getName(), event.getId(), e);
            }
        }

        log.info("Event activation summary: {} succeeded, {} failed", successCount, failureCount);
    }

    /**
     * Hoàn thành các events có endDate < today và status = ACTIVE
     */
    private void completeExpiredEvents(LocalDate today) {
        log.info("Checking for events to complete before {}", today);

        List<RoomEvent> eventsToComplete = roomEventService.getEventsToComplete(today);

        if (eventsToComplete.isEmpty()) {
            log.info("No events to complete");
            return;
        }

        log.info("Found {} event(s) to complete", eventsToComplete.size());

        int successCount = 0;
        int failureCount = 0;

        for (RoomEvent event : eventsToComplete) {
            try {
                log.info("Completing event: {} (ID: {})", event.getName(), event.getId());
                roomEventService.completeEvent(event.getId());
                successCount++;
                log.info("Successfully completed event: {}", event.getName());
            } catch (Exception e) {
                failureCount++;
                log.error("Failed to complete event: {} (ID: {})", event.getName(), event.getId(), e);
            }
        }

        log.info("Event completion summary: {} succeeded, {} failed", successCount, failureCount);
    }

    /**
     * Method để test scheduler manually (có thể gọi từ controller hoặc test)
     * Không nên expose ra public API trong production
     */
    public void runManually() {
        log.info("Running room event scheduler manually");
        processRoomEvents();
    }
}


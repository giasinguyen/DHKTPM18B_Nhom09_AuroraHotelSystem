package com.aurora.backend.service;

import com.aurora.backend.dto.request.PriceAdjustmentRequest;
import com.aurora.backend.dto.request.RoomCreationRequest;
import com.aurora.backend.dto.request.RoomEventCreationRequest;
import com.aurora.backend.dto.request.RoomTypeCreationRequest;
import com.aurora.backend.dto.response.RoomEventResponse;
import com.aurora.backend.dto.response.RoomResponse;
import com.aurora.backend.entity.Branch;
import com.aurora.backend.entity.PriceAdjustment;
import com.aurora.backend.entity.Room;
import com.aurora.backend.entity.RoomEvent;
import com.aurora.backend.repository.BranchRepository;
import com.aurora.backend.repository.RoomRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration Test cho Room Event Pricing System
 * Test toàn bộ flow từ tạo event đến áp dụng giá và khôi phục
 */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
@Slf4j
public class RoomEventPricingIntegrationTest {

    @Autowired
    private RoomEventService roomEventService;

    @Autowired
    private RoomPricingService roomPricingService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomTypeService roomTypeService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BranchRepository branchRepository;

    private Branch testBranch;
    private String testRoomTypeId;
    private String testRoomId;

    @BeforeEach
    public void setup() {
        log.info("========== Setting up test data ==========");
        
        // Tạo branch test (hoặc lấy branch có sẵn)
        testBranch = branchRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No branch found in database"));
        
        log.info("Using test branch: {} (ID: {})", testBranch.getName(), testBranch.getId());
    }

    @Test
    public void testCompleteEventPricingFlow() {
        log.info("========== TEST: Complete Event Pricing Flow ==========");

        // 1. Tạo phòng test với giá gốc
        BigDecimal basePrice = new BigDecimal("1000000"); // 1 triệu VND
        BigDecimal salePercent = BigDecimal.ZERO;
        
        Room testRoom = createTestRoom(basePrice, salePercent);
        log.info("Created test room with basePrice={}, salePercent={}, priceFinal={}",
                testRoom.getBasePrice(), testRoom.getSalePercent(), testRoom.getPriceFinal());

        // Verify giá ban đầu
        assertEquals(basePrice, testRoom.getPriceFinal(), "Initial price should equal base price");

        // 2. Tạo event tăng giá 50%
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = LocalDate.now().plusDays(7);
        
        RoomEventCreationRequest eventRequest = RoomEventCreationRequest.builder()
                .name("Tết Nguyên Đán 2026 - Test")
                .description("Test event tăng giá 50%")
                .startDate(startDate)
                .endDate(endDate)
                .branchId(testBranch.getId())
                .priceAdjustments(List.of(
                        PriceAdjustmentRequest.builder()
                                .adjustmentType(PriceAdjustment.AdjustmentType.PERCENTAGE)
                                .adjustmentDirection(PriceAdjustment.AdjustmentDirection.INCREASE)
                                .adjustmentValue(new BigDecimal("50"))
                                .targetType(PriceAdjustment.TargetType.SPECIFIC_ROOM)
                                .targetId(testRoom.getId())
                                .targetName("Test Room")
                                .build()
                ))
                .build();

        RoomEventResponse eventResponse = roomEventService.createEvent(eventRequest);
        log.info("Created event: {} (ID: {})", eventResponse.getName(), eventResponse.getId());

        // Verify event được tạo với status SCHEDULED
        assertEquals(RoomEvent.EventStatus.SCHEDULED, eventResponse.getStatus());

        // 3. Kích hoạt event
        roomEventService.activateEvent(eventResponse.getId());
        log.info("Activated event: {}", eventResponse.getId());

        // 4. Verify giá đã tăng 50%
        Room roomAfterActivate = roomRepository.findById(testRoom.getId()).orElseThrow();
        BigDecimal expectedPrice = basePrice.multiply(new BigDecimal("1.5")).setScale(0, java.math.RoundingMode.HALF_UP);
        
        log.info("Room price after event activation: {} (expected: {})",
                roomAfterActivate.getPriceFinal(), expectedPrice);
        
        assertEquals(expectedPrice, roomAfterActivate.getPriceFinal(),
                "Price should increase by 50%");

        // 5. Hoàn thành event
        roomEventService.completeEvent(eventResponse.getId());
        log.info("Completed event: {}", eventResponse.getId());

        // 6. Verify giá đã được khôi phục về ban đầu
        Room roomAfterComplete = roomRepository.findById(testRoom.getId()).orElseThrow();
        
        log.info("Room price after event completion: {} (expected: {})",
                roomAfterComplete.getPriceFinal(), basePrice);
        
        assertEquals(basePrice, roomAfterComplete.getPriceFinal(),
                "Price should revert to base price after event completion");

        log.info("========== TEST PASSED: Complete Event Pricing Flow ==========");
    }

    @Test
    public void testDecreaseEventPricing() {
        log.info("========== TEST: Decrease Event Pricing ==========");

        // 1. Tạo phòng test
        BigDecimal basePrice = new BigDecimal("1000000");
        Room testRoom = createTestRoom(basePrice, BigDecimal.ZERO);

        // 2. Tạo event giảm giá 10%
        RoomEventCreationRequest eventRequest = RoomEventCreationRequest.builder()
                .name("Flash Sale - Test")
                .description("Test event giảm giá 10%")
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(3))
                .branchId(testBranch.getId())
                .priceAdjustments(List.of(
                        PriceAdjustmentRequest.builder()
                                .adjustmentType(PriceAdjustment.AdjustmentType.PERCENTAGE)
                                .adjustmentDirection(PriceAdjustment.AdjustmentDirection.DECREASE)
                                .adjustmentValue(new BigDecimal("10"))
                                .targetType(PriceAdjustment.TargetType.SPECIFIC_ROOM)
                                .targetId(testRoom.getId())
                                .targetName("Test Room")
                                .build()
                ))
                .build();

        RoomEventResponse eventResponse = roomEventService.createEvent(eventRequest);
        roomEventService.activateEvent(eventResponse.getId());

        // 3. Verify giá giảm 10%
        Room roomAfterActivate = roomRepository.findById(testRoom.getId()).orElseThrow();
        BigDecimal expectedPrice = basePrice.multiply(new BigDecimal("0.9")).setScale(0, java.math.RoundingMode.HALF_UP);
        
        log.info("Room price after decrease event: {} (expected: {})",
                roomAfterActivate.getPriceFinal(), expectedPrice);
        
        assertEquals(expectedPrice, roomAfterActivate.getPriceFinal(),
                "Price should decrease by 10%");

        log.info("========== TEST PASSED: Decrease Event Pricing ==========");
    }

    @Test
    public void testFixedAmountAdjustment() {
        log.info("========== TEST: Fixed Amount Adjustment ==========");

        // 1. Tạo phòng test
        BigDecimal basePrice = new BigDecimal("1000000");
        Room testRoom = createTestRoom(basePrice, BigDecimal.ZERO);

        // 2. Tạo event giảm giá cố định 200,000 VND
        RoomEventCreationRequest eventRequest = RoomEventCreationRequest.builder()
                .name("Weekend Promotion - Test")
                .description("Test event giảm giá cố định 200k")
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(2))
                .branchId(testBranch.getId())
                .priceAdjustments(List.of(
                        PriceAdjustmentRequest.builder()
                                .adjustmentType(PriceAdjustment.AdjustmentType.FIXED_AMOUNT)
                                .adjustmentDirection(PriceAdjustment.AdjustmentDirection.DECREASE)
                                .adjustmentValue(new BigDecimal("200000"))
                                .targetType(PriceAdjustment.TargetType.SPECIFIC_ROOM)
                                .targetId(testRoom.getId())
                                .targetName("Test Room")
                                .build()
                ))
                .build();

        RoomEventResponse eventResponse = roomEventService.createEvent(eventRequest);
        roomEventService.activateEvent(eventResponse.getId());

        // 3. Verify giá giảm 200k
        Room roomAfterActivate = roomRepository.findById(testRoom.getId()).orElseThrow();
        BigDecimal expectedPrice = basePrice.subtract(new BigDecimal("200000"));
        
        log.info("Room price after fixed amount decrease: {} (expected: {})",
                roomAfterActivate.getPriceFinal(), expectedPrice);
        
        assertEquals(expectedPrice, roomAfterActivate.getPriceFinal(),
                "Price should decrease by 200,000 VND");

        log.info("========== TEST PASSED: Fixed Amount Adjustment ==========");
    }

    @Test
    public void testSchedulerActivateAndCompleteEvents() {
        log.info("========== TEST: Scheduler Activate and Complete Events ==========");

        // 1. Tạo phòng test
        BigDecimal basePrice = new BigDecimal("1000000");
        Room testRoom = createTestRoom(basePrice, BigDecimal.ZERO);

        // 2. Tạo event với startDate = hôm nay
        LocalDate today = LocalDate.now();
        RoomEventCreationRequest eventRequest = RoomEventCreationRequest.builder()
                .name("Today Event - Test")
                .description("Event bắt đầu hôm nay")
                .startDate(today)
                .endDate(today.plusDays(1))
                .branchId(testBranch.getId())
                .priceAdjustments(List.of(
                        PriceAdjustmentRequest.builder()
                                .adjustmentType(PriceAdjustment.AdjustmentType.PERCENTAGE)
                                .adjustmentDirection(PriceAdjustment.AdjustmentDirection.INCREASE)
                                .adjustmentValue(new BigDecimal("20"))
                                .targetType(PriceAdjustment.TargetType.SPECIFIC_ROOM)
                                .targetId(testRoom.getId())
                                .targetName("Test Room")
                                .build()
                ))
                .build();

        RoomEventResponse eventResponse = roomEventService.createEvent(eventRequest);

        // 3. Test getEventsToActivate
        List<RoomEvent> eventsToActivate = roomEventService.getEventsToActivate(today);
        assertFalse(eventsToActivate.isEmpty(), "Should find events to activate");
        
        boolean foundOurEvent = eventsToActivate.stream()
                .anyMatch(e -> e.getId().equals(eventResponse.getId()));
        assertTrue(foundOurEvent, "Should find our test event in events to activate");

        log.info("Found {} event(s) to activate", eventsToActivate.size());

        // 4. Tạo event đã hết hạn
        RoomEventCreationRequest expiredEventRequest = RoomEventCreationRequest.builder()
                .name("Expired Event - Test")
                .description("Event đã hết hạn")
                .startDate(today.minusDays(3))
                .endDate(today.minusDays(1))
                .branchId(testBranch.getId())
                .priceAdjustments(List.of(
                        PriceAdjustmentRequest.builder()
                                .adjustmentType(PriceAdjustment.AdjustmentType.PERCENTAGE)
                                .adjustmentDirection(PriceAdjustment.AdjustmentDirection.INCREASE)
                                .adjustmentValue(new BigDecimal("30"))
                                .targetType(PriceAdjustment.TargetType.SPECIFIC_ROOM)
                                .targetId(testRoom.getId())
                                .targetName("Test Room")
                                .build()
                ))
                .build();

        RoomEventResponse expiredEventResponse = roomEventService.createEvent(expiredEventRequest);
        roomEventService.activateEvent(expiredEventResponse.getId()); // Kích hoạt thủ công

        // 5. Test getEventsToComplete
        List<RoomEvent> eventsToComplete = roomEventService.getEventsToComplete(today);
        assertFalse(eventsToComplete.isEmpty(), "Should find events to complete");
        
        boolean foundExpiredEvent = eventsToComplete.stream()
                .anyMatch(e -> e.getId().equals(expiredEventResponse.getId()));
        assertTrue(foundExpiredEvent, "Should find expired event in events to complete");

        log.info("Found {} event(s) to complete", eventsToComplete.size());

        log.info("========== TEST PASSED: Scheduler Activate and Complete Events ==========");
    }

    @Test
    public void testRecalculateAllRoomPrices() {
        log.info("========== TEST: Recalculate All Room Prices ==========");

        // 1. Tạo phòng với sale percent
        BigDecimal basePrice = new BigDecimal("1000000");
        BigDecimal salePercent = new BigDecimal("20"); // 20% discount
        
        Room testRoom = createTestRoom(basePrice, salePercent);

        // 2. Manually set wrong priceFinal
        testRoom.setPriceFinal(new BigDecimal("999999"));
        roomRepository.save(testRoom);

        log.info("Set incorrect priceFinal: {}", testRoom.getPriceFinal());

        // 3. Recalculate all room prices
        roomPricingService.recalculateAllRoomPrices();

        // 4. Verify giá đã được tính lại đúng
        Room roomAfterRecalculate = roomRepository.findById(testRoom.getId()).orElseThrow();
        BigDecimal expectedPrice = basePrice.multiply(new BigDecimal("0.8")).setScale(0, java.math.RoundingMode.HALF_UP);
        
        log.info("Room price after recalculation: {} (expected: {})",
                roomAfterRecalculate.getPriceFinal(), expectedPrice);
        
        assertEquals(expectedPrice, roomAfterRecalculate.getPriceFinal(),
                "Price should be recalculated correctly: basePrice * (100 - salePercent) / 100");

        log.info("========== TEST PASSED: Recalculate All Room Prices ==========");
    }

    /**
     * Helper method để tạo phòng test
     */
    private Room createTestRoom(BigDecimal basePrice, BigDecimal salePercent) {
        // Tạo room type nếu chưa có
        if (testRoomTypeId == null) {
            try {
                RoomTypeCreationRequest roomTypeRequest = RoomTypeCreationRequest.builder()
                        .branchId(testBranch.getId())
                        .name("Test Room Type")
                        .code("TEST")
                        .priceFrom(basePrice)
                        .capacityAdults(2)
                        .capacityChildren(1)
                        .maxOccupancy(3)
                        .sizeM2(25.0)
                        .refundable(true)
                        .build();
                
                var roomTypeResponse = roomTypeService.createRoomType(roomTypeRequest);
                testRoomTypeId = roomTypeResponse.getId();
                log.info("Created test room type: {}", testRoomTypeId);
            } catch (Exception e) {
                // Room type might already exist, find it
                log.warn("Could not create room type, might already exist: {}", e.getMessage());
                testRoomTypeId = testBranch.getId(); // Fallback
            }
        }

        // Tạo room
        RoomCreationRequest roomRequest = RoomCreationRequest.builder()
                .branchId(testBranch.getId())
                .roomTypeId(testRoomTypeId)
                .roomNumber("TEST-" + System.currentTimeMillis())
                .floor(1)
                .status("READY")
                .viewType("CITY")
                .basePrice(basePrice)
                .salePercent(salePercent)
                .build();

        RoomResponse roomResponse = roomService.createRoom(roomRequest);
        testRoomId = roomResponse.getId();
        
        return roomRepository.findById(testRoomId).orElseThrow();
    }
}


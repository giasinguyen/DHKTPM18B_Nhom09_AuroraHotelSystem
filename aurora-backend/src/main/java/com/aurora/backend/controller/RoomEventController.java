package com.aurora.backend.controller;

import com.aurora.backend.config.annotation.RequirePermission;
import com.aurora.backend.constant.PermissionConstants;
import com.aurora.backend.dto.request.RoomEventCreationRequest;
import com.aurora.backend.dto.request.RoomEventUpdateRequest;
import com.aurora.backend.dto.response.ApiResponse;
import com.aurora.backend.dto.response.RoomEventResponse;
import com.aurora.backend.entity.RoomEvent;
import com.aurora.backend.service.RoomEventService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/room-events")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomEventController {

    RoomEventService roomEventService;

    @PostMapping
    @RequirePermission(PermissionConstants.Admin.EVENT_CREATE)
    public ApiResponse<RoomEventResponse> createEvent(@Valid @RequestBody RoomEventCreationRequest request) {
        log.info("Creating new room event: {} for branch: {}", request.getName(), request.getBranchId());

        RoomEventResponse response = roomEventService.createEvent(request);

        return ApiResponse.<RoomEventResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Room event created successfully")
                .result(response)
                .build();
    }

    @PutMapping("/{id}")
    @RequirePermission(PermissionConstants.Admin.EVENT_UPDATE)
    public ApiResponse<RoomEventResponse> updateEvent(
            @PathVariable String id,
            @Valid @RequestBody RoomEventUpdateRequest request) {
        log.info("Updating room event with ID: {}", id);

        RoomEventResponse response = roomEventService.updateEvent(id, request);

        return ApiResponse.<RoomEventResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Room event updated successfully")
                .result(response)
                .build();
    }

    @DeleteMapping("/{id}")
    @RequirePermission(PermissionConstants.Admin.EVENT_DELETE)
    public ApiResponse<Void> deleteEvent(@PathVariable String id) {
        log.info("Deleting room event with ID: {}", id);

        roomEventService.deleteEvent(id);

        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Room event deleted successfully")
                .build();
    }

    @GetMapping("/{id}")
    @RequirePermission(PermissionConstants.Manager.EVENT_VIEW)
    public ApiResponse<RoomEventResponse> getEventById(@PathVariable String id) {
        log.info("Fetching room event with ID: {}", id);

        RoomEventResponse response = roomEventService.getEventById(id);

        return ApiResponse.<RoomEventResponse>builder()
                .code(HttpStatus.OK.value())
                .message("Room event retrieved successfully")
                .result(response)
                .build();
    }

    @GetMapping
    @RequirePermission(PermissionConstants.Manager.EVENT_VIEW)
    public ApiResponse<Page<RoomEventResponse>> getAllEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection) {
        log.info("Fetching all room events - page: {}, size: {}", page, size);

        Sort sort = sortDirection.equalsIgnoreCase("ASC")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<RoomEventResponse> response = roomEventService.getAllEvents(pageable);

        return ApiResponse.<Page<RoomEventResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Room events retrieved successfully")
                .result(response)
                .build();
    }

    @GetMapping("/branch/{branchId}")
    @RequirePermission(PermissionConstants.Manager.EVENT_VIEW)
    public ApiResponse<Page<RoomEventResponse>> getEventsByBranch(
            @PathVariable String branchId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "startDate") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection) {
        log.info("Fetching room events for branch: {}", branchId);

        Sort sort = sortDirection.equalsIgnoreCase("ASC")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<RoomEventResponse> response = roomEventService.getEventsByBranch(branchId, pageable);

        return ApiResponse.<Page<RoomEventResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Room events retrieved successfully")
                .result(response)
                .build();
    }

    @GetMapping("/status/{status}")
    @RequirePermission(PermissionConstants.Manager.EVENT_VIEW)
    public ApiResponse<Page<RoomEventResponse>> getEventsByStatus(
            @PathVariable RoomEvent.EventStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "startDate") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection) {
        log.info("Fetching room events by status: {}", status);

        Sort sort = sortDirection.equalsIgnoreCase("ASC")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<RoomEventResponse> response = roomEventService.getEventsByStatus(status, pageable);

        return ApiResponse.<Page<RoomEventResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Room events retrieved successfully")
                .result(response)
                .build();
    }

    @GetMapping("/search")
    @RequirePermission(PermissionConstants.Manager.EVENT_VIEW)
    public ApiResponse<Page<RoomEventResponse>> searchEvents(
            @RequestParam(required = false) String branchId,
            @RequestParam(required = false) RoomEvent.EventStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "startDate") String sortBy,
            @RequestParam(defaultValue = "ASC") String sortDirection) {
        log.info("Searching room events with filters - branchId: {}, status: {}, startDate: {}, endDate: {}",
                branchId, status, startDate, endDate);

        Sort sort = sortDirection.equalsIgnoreCase("ASC")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<RoomEventResponse> response = roomEventService.searchEvents(branchId, status, startDate, endDate, pageable);

        return ApiResponse.<Page<RoomEventResponse>>builder()
                .code(HttpStatus.OK.value())
                .message("Room events retrieved successfully")
                .result(response)
                .build();
    }

    @PostMapping("/{id}/activate")
    @RequirePermission(PermissionConstants.Admin.EVENT_ACTIVATE)
    public ApiResponse<Void> activateEvent(@PathVariable String id) {
        log.info("Manually activating room event: {}", id);

        roomEventService.activateEvent(id);

        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Room event activated successfully")
                .build();
    }

    @PostMapping("/{id}/complete")
    @RequirePermission(PermissionConstants.Admin.EVENT_COMPLETE)
    public ApiResponse<Void> completeEvent(@PathVariable String id) {
        log.info("Manually completing room event: {}", id);

        roomEventService.completeEvent(id);

        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Room event completed successfully")
                .build();
    }

    @PostMapping("/{id}/cancel")
    @RequirePermission(PermissionConstants.Admin.EVENT_CANCEL)
    public ApiResponse<Void> cancelEvent(@PathVariable String id) {
        log.info("Cancelling room event: {}", id);

        roomEventService.cancelEvent(id);

        return ApiResponse.<Void>builder()
                .code(HttpStatus.OK.value())
                .message("Room event cancelled successfully")
                .build();
    }
}


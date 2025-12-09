package com.aurora.backend.mapper;

import com.aurora.backend.dto.request.RoomEventCreationRequest;
import com.aurora.backend.dto.request.RoomEventUpdateRequest;
import com.aurora.backend.dto.response.RoomEventResponse;
import com.aurora.backend.entity.RoomEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RoomEventMapper {
    
    @Mapping(target = "branch.id", source = "branchId")
    @Mapping(target = "status", constant = "SCHEDULED")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "priceAdjustments", ignore = true) // Xử lý riêng trong service
    RoomEvent toRoomEvent(RoomEventCreationRequest request);
    
    @Mapping(target = "branchId", source = "branch.id")
    @Mapping(target = "branchName", source = "branch.name")
    @Mapping(target = "priceAdjustments", source = "priceAdjustments")
    RoomEventResponse toRoomEventResponse(RoomEvent roomEvent);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "branch", ignore = true) // Xử lý riêng trong service nếu cần
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "priceAdjustments", ignore = true) // Xử lý riêng trong service
    void updateRoomEvent(@MappingTarget RoomEvent roomEvent, RoomEventUpdateRequest request);
}


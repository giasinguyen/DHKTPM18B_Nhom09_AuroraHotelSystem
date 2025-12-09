package com.aurora.backend.mapper;

import com.aurora.backend.dto.request.PriceAdjustmentRequest;
import com.aurora.backend.dto.response.PriceAdjustmentResponse;
import com.aurora.backend.entity.PriceAdjustment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PriceAdjustmentMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "roomEvent", ignore = true) // Sẽ được set trong service
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    PriceAdjustment toPriceAdjustment(PriceAdjustmentRequest request);
    
    PriceAdjustmentResponse toPriceAdjustmentResponse(PriceAdjustment priceAdjustment);
}


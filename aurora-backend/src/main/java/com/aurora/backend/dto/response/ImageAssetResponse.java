package com.aurora.backend.dto.response;

import com.aurora.backend.enums.ImageStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImageAssetResponse {
    Long id;
    String publicId;
    String url;
    Integer width;
    Integer height;
    Long sizeBytes;
    String mimeType;
    String altText;
    String ownerType;
    String usagePath;
    ImageStatus status;
    Long uploadedBy;
    ZonedDateTime createdAt;
    ZonedDateTime updatedAt;
}

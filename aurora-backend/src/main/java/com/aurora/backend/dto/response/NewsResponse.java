package com.aurora.backend.dto.response;

import com.aurora.backend.enums.NewsStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewsResponse {
    Long id;
    String slug;
    String title;
    Boolean isPublic;
    Map<String, Object> contentJson;
    String contentHtml;
    NewsStatus status;
    ZonedDateTime publishedAt;
    ZonedDateTime createdAt;
    ZonedDateTime updatedAt;
    List<ImageAssetResponse> images;
}

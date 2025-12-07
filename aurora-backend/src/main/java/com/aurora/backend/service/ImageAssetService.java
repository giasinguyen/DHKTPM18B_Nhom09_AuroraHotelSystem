package com.aurora.backend.service;

import com.aurora.backend.dto.response.ImageAssetResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageAssetService {
    ImageAssetResponse uploadNewsImage(MultipartFile file, Long newsId, Long uploadedBy);
    
    ImageAssetResponse getNewsImage(Long imageId);
    
    List<ImageAssetResponse> getNewsImagesByOwnerId(Long newsId);
    
    void deleteAllImagesByOwnerId(Long newsId);
    
    void deleteImageByPublicId(String publicId);
}

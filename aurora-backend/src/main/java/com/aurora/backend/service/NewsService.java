package com.aurora.backend.service;

import com.aurora.backend.dto.request.NewsCreationRequest;
import com.aurora.backend.dto.request.NewsUpdateRequest;
import com.aurora.backend.dto.request.NewsVisibilityRequest;
import com.aurora.backend.dto.response.NewsResponse;

import java.util.List;

public interface NewsService {
    List<NewsResponse> getPublicNews();
    
    NewsResponse getPublicNewsBySlug(String slug);
    
    List<NewsResponse> getAllNews();
    
    NewsResponse createNews(NewsCreationRequest request);
    
    NewsResponse updateNews(Long id, NewsUpdateRequest request);
    
    NewsResponse updateNewsVisibility(Long id, NewsVisibilityRequest request);
    
    void deleteNews(Long id);
}

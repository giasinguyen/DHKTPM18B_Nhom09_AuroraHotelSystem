package com.aurora.backend.service;

import com.aurora.backend.dto.request.NewsCreationRequest;
import com.aurora.backend.dto.request.NewsUpdateRequest;
import com.aurora.backend.dto.request.NewsVisibilityRequest;
import com.aurora.backend.dto.response.NewsListResponse;
import com.aurora.backend.dto.response.NewsResponse;

import java.util.List;

public interface NewsService {
    List<NewsListResponse> getPublicNews();
    
    NewsResponse getPublicNewsBySlug(String slug);
    
    List<NewsListResponse> getAllNews();
    
    NewsResponse createNews(NewsCreationRequest request);
    
    NewsResponse updateNews(String id, NewsUpdateRequest request);
    
    NewsResponse updateNewsVisibility(String id, NewsVisibilityRequest request);
    
    void deleteNews(String id);
}

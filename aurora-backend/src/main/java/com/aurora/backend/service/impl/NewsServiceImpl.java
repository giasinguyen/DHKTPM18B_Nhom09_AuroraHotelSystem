package com.aurora.backend.service.impl;

import com.aurora.backend.dto.request.NewsCreationRequest;
import com.aurora.backend.dto.request.NewsUpdateRequest;
import com.aurora.backend.dto.request.NewsVisibilityRequest;
import com.aurora.backend.dto.response.NewsResponse;
import com.aurora.backend.entity.News;
import com.aurora.backend.enums.ErrorCode;
import com.aurora.backend.enums.NewsStatus;
import com.aurora.backend.exception.AppException;
import com.aurora.backend.mapper.NewsMapper;
import com.aurora.backend.repository.NewsRepository;
import com.aurora.backend.service.NewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;
    private final NewsMapper newsMapper;

    @Override
    @Transactional(readOnly = true)
    public List<NewsResponse> getPublicNews() {
        log.info("Getting all public news");

        List<News> newsList = newsRepository.findByIsPublicTrueAndStatus(NewsStatus.PUBLISHED);

        return newsList.stream()
                .map(newsMapper::toNewsResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public NewsResponse getPublicNewsBySlug(String slug) {
        log.info("Getting public news by slug: {}", slug);

        News news = newsRepository.findBySlugAndIsPublicTrueAndStatus(slug, NewsStatus.PUBLISHED)
                .orElseThrow(() -> new AppException(ErrorCode.NEWS_NOT_FOUND));

        return newsMapper.toNewsResponse(news);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NewsResponse> getAllNews() {
        log.info("Getting all news (admin)");

        List<News> newsList = newsRepository.findAll();

        return newsList.stream()
                .map(newsMapper::toNewsResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public NewsResponse createNews(NewsCreationRequest request) {
        log.info("Creating news: title={}, slug={}", request.getTitle(), request.getSlug());

        // Check if slug already exists
        if (newsRepository.existsBySlug(request.getSlug())) {
            throw new AppException(ErrorCode.NEWS_SLUG_EXISTED);
        }

        News news = newsMapper.toNews(request);
        news.setStatus(NewsStatus.DRAFT);
        
        // Set publishedAt if isPublic is true
        if (Boolean.TRUE.equals(request.getIsPublic())) {
            news.setPublishedAt(ZonedDateTime.now());
            news.setStatus(NewsStatus.PUBLISHED);
        }

        news = newsRepository.save(news);
        log.info("News created successfully: id={}, slug={}", news.getId(), news.getSlug());

        return newsMapper.toNewsResponse(news);
    }

    @Override
    @Transactional
    public NewsResponse updateNews(Long id, NewsUpdateRequest request) {
        log.info("Updating news: id={}", id);

        News news = newsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NEWS_NOT_FOUND));

        // Check slug uniqueness if slug is being updated
        if (request.getSlug() != null && !request.getSlug().equals(news.getSlug())) {
            if (newsRepository.existsBySlug(request.getSlug())) {
                throw new AppException(ErrorCode.NEWS_SLUG_EXISTED);
            }
        }

        newsMapper.updateNewsFromRequest(request, news);
        
        // Update publishedAt if isPublic is being set to true and not yet published
        if (request.getIsPublic() != null && Boolean.TRUE.equals(request.getIsPublic()) 
                && news.getPublishedAt() == null) {
            news.setPublishedAt(ZonedDateTime.now());
            news.setStatus(NewsStatus.PUBLISHED);
        }

        news = newsRepository.save(news);
        log.info("News updated successfully: id={}", id);

        return newsMapper.toNewsResponse(news);
    }

    @Override
    @Transactional
    public NewsResponse updateNewsVisibility(Long id, NewsVisibilityRequest request) {
        log.info("Updating news visibility: id={}, isPublic={}", id, request.getIsPublic());

        News news = newsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NEWS_NOT_FOUND));

        news.setIsPublic(request.getIsPublic());

        // Update status and publishedAt based on visibility
        if (Boolean.TRUE.equals(request.getIsPublic())) {
            if (news.getPublishedAt() == null) {
                news.setPublishedAt(ZonedDateTime.now());
            }
            news.setStatus(NewsStatus.PUBLISHED);
        } else {
            news.setStatus(NewsStatus.DRAFT);
        }

        news = newsRepository.save(news);
        log.info("News visibility updated successfully: id={}, isPublic={}", id, request.getIsPublic());

        return newsMapper.toNewsResponse(news);
    }

    @Override
    @Transactional
    public void deleteNews(Long id) {
        log.info("Deleting news: id={}", id);

        News news = newsRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NEWS_NOT_FOUND));

        newsRepository.delete(news);
        log.info("News deleted successfully: id={}", id);
    }
}

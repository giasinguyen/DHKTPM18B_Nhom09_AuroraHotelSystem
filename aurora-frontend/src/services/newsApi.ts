import axiosClient from '@/config/axiosClient';
import type { ApiResponse } from '@/types/apiResponse';
import type {
  NewsListResponse,
  NewsDetailResponse,
  NewsVisibilityRequest,
  NewsResponse
} from '@/types/news.types';

const BASE_URL = '/api/v1/news';

/**
 * Get all news (requires admin permission)
 */
export const getAllNews = async (): Promise<ApiResponse<NewsListResponse[]>> => {
  const response = await axiosClient.get(`${BASE_URL}`);
  return response.data;
};

/**
 * Get public news (no authentication required)
 */
export const getPublicNews = async (): Promise<ApiResponse<NewsListResponse[]>> => {
  const response = await axiosClient.get(`${BASE_URL}/public`);
  return response.data;
};

/**
 * Get public news by slug (no authentication required)
 */
export const getPublicNewsBySlug = async (slug: string): Promise<ApiResponse<NewsDetailResponse>> => {
  const response = await axiosClient.get(`${BASE_URL}/public/${slug}`);
  return response.data;
};

/**
 * Get news by slug for editing (requires admin permission)
 */
export const getNewsBySlug = async (slug: string): Promise<ApiResponse<NewsDetailResponse>> => {
  const response = await axiosClient.get(`${BASE_URL}/${slug}`);
  return response.data;
};

/**
 * Update news visibility (requires admin permission)
 */
export const updateNewsVisibility = async (
  id: string,
  request: NewsVisibilityRequest
): Promise<ApiResponse<NewsResponse>> => {
  const response = await axiosClient.patch(`${BASE_URL}/${id}/visibility`, request);
  return response.data;
};

/**
 * Delete news (requires admin permission)
 */
export const deleteNews = async (id: string): Promise<ApiResponse<void>> => {
  const response = await axiosClient.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export default {
  getAllNews,
  getPublicNews,
  getPublicNewsBySlug,
  getNewsBySlug,
  updateNewsVisibility,
  deleteNews,
};

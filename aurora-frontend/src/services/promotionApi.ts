import type { ApiResponse } from '@/types/apiResponse';
import type { 
  Promotion, 
  PromotionCreationRequest, 
  PromotionUpdateRequest,
  PromotionSearchParams
} from '@/types/promotion.types';
import axiosClient from '@/config/axiosClient';

const PROMOTION_BASE_URL = '/api/v1/promotions';

// Spring Page response type
interface SpringPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const promotionApi = {
  // Get all promotions with pagination
  getAll: async (params: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
  } = {}) => {
    const { page = 0, size = 10, sortBy = 'id', sortDir = 'asc' } = params;
    const response = await axiosClient.get<ApiResponse<SpringPage<Promotion>>>(
      `${PROMOTION_BASE_URL}`,
      { params: { page, size, sortBy, sortDir } }
    );
    return response.data;
  },

  // Get active promotions only
  getActive: async (params: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
  } = {}) => {
    const { page = 0, size = 10, sortBy = 'id', sortDir = 'asc' } = params;
    const response = await axiosClient.get<ApiResponse<SpringPage<Promotion>>>(
      `${PROMOTION_BASE_URL}/active`,
      { params: { page, size, sortBy, sortDir } }
    );
    return response.data;
  },

  // Get promotion by ID
  getById: async (id: string) => {
    const response = await axiosClient.get<ApiResponse<Promotion>>(
      `${PROMOTION_BASE_URL}/${id}`
    );
    return response.data;
  },

  // Get promotion by code
  getByCode: async (code: string) => {
    const response = await axiosClient.get<ApiResponse<Promotion>>(
      `${PROMOTION_BASE_URL}/code/${code}`
    );
    return response.data;
  },

  // Search promotions with filters
  search: async (params: PromotionSearchParams = {}) => {
    const { 
      code, 
      name, 
      active,
      startDate,
      endDate,
      page = 0, 
      size = 10, 
      sortBy = 'createdAt', 
      sortDir = 'desc' 
    } = params;
    
    const response = await axiosClient.get<ApiResponse<SpringPage<Promotion>>>(
      `${PROMOTION_BASE_URL}/search`,
      { 
        params: { 
          code, 
          name, 
          active,
          startDate,
          endDate,
          page, 
          size, 
          sortBy, 
          sortDir 
        } 
      }
    );
    return response.data;
  },

  // Create promotion
  create: async (data: PromotionCreationRequest) => {
    const response = await axiosClient.post<ApiResponse<Promotion>>(
      PROMOTION_BASE_URL,
      data
    );
    return response.data;
  },

  // Update promotion
  update: async (id: string, data: PromotionUpdateRequest) => {
    const response = await axiosClient.put<ApiResponse<Promotion>>(
      `${PROMOTION_BASE_URL}/${id}`,
      data
    );
    return response.data;
  },

  // Delete promotion
  delete: async (id: string) => {
    const response = await axiosClient.delete<ApiResponse<void>>(
      `${PROMOTION_BASE_URL}/${id}`
    );
    return response.data;
  },
};

export default promotionApi;

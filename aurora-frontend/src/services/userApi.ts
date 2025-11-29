import axiosClient from '@/config/axiosClient';
import type { ApiResponse, PageResponseDto } from '@/types/apiResponse';
import type { 
  User, 
  UserCreationRequest, 
  UserUpdateRequest, 
  UserSearchParams 
} from '@/types/user.types';

const BASE_URL = '/api/v1/users';

/**
 * Get all users (no pagination)
 */
export const getUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await axiosClient.get(BASE_URL);
  return response.data;
};

/**
 * Get paginated list of users
 */
export const getUsersPaginated = async (params?: UserSearchParams): Promise<ApiResponse<PageResponseDto<User>>> => {
  const response = await axiosClient.get(`${BASE_URL}/paginated`, { 
    params: {
      page: params?.page ?? 0,
      size: params?.size ?? 10,
      sortBy: params?.sortBy ?? 'username',
      sortDirection: params?.sortDir ?? 'asc',
    }
  });
  return response.data;
};

/**
 * Get user by ID
 */
export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  const response = await axiosClient.get(`${BASE_URL}/${id}`);
  return response.data;
};

/**
 * Get user by username
 */
export const getUserByUsername = async (username: string): Promise<ApiResponse<User>> => {
  const response = await axiosClient.get(`${BASE_URL}/username/${username}`);
  return response.data;
};

/**
 * Get current logged-in user info
 */
export const getMyInfo = async (): Promise<ApiResponse<User>> => {
  const response = await axiosClient.get(`${BASE_URL}/myInfo`);
  return response.data;
};

/**
 * Create new user (Admin only)
 */
export const createUser = async (data: UserCreationRequest): Promise<ApiResponse<User>> => {
  const response = await axiosClient.post(BASE_URL, data);
  return response.data;
};

/**
 * Register new user (Public)
 */
export const registerUser = async (data: UserCreationRequest): Promise<ApiResponse<User>> => {
  const response = await axiosClient.post(`${BASE_URL}/register`, data);
  return response.data;
};

/**
 * Update user
 */
export const updateUser = async (id: string, data: UserUpdateRequest): Promise<ApiResponse<User>> => {
  const response = await axiosClient.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

/**
 * Delete user (Admin only)
 */
export const deleteUser = async (id: string): Promise<ApiResponse<void>> => {
  const response = await axiosClient.delete(`${BASE_URL}/${id}`);
  return response.data;
};

/**
 * Search users by username
 */
export const searchUsers = async (params: UserSearchParams): Promise<ApiResponse<PageResponseDto<User>>> => {
  const response = await axiosClient.get(`${BASE_URL}/search`, { 
    params: {
      username: params.username,
      page: params.page ?? 0,
      size: params.size ?? 10,
    }
  });
  return response.data;
};

export default {
  getUsers,
  getUsersPaginated,
  getUserById,
  getUserByUsername,
  getMyInfo,
  createUser,
  registerUser,
  updateUser,
  deleteUser,
  searchUsers,
};

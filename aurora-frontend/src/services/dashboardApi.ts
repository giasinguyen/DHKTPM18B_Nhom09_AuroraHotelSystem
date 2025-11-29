// ============================================
// Dashboard API Service - Aurora Hotel Management System
// ============================================

import axiosClient from '@/config/axiosClient';
import type {
  DashboardOverview,
  RevenueStatistics,
  OccupancyStatistics,
  TopRoomType,
  CustomerGrowthPoint,
  PaymentMethodRevenue,
  BookingSourceStats,
  DashboardGroupBy,
  DashboardApiResponse,
} from '@/types/dashboard.types';

const DASHBOARD_BASE_URL = '/api/dashboard';

// ============================================
// Admin Dashboard APIs
// ============================================

/**
 * Get admin dashboard overview statistics
 */
export const getAdminOverview = async (
  dateFrom?: string | null,
  dateTo?: string | null
): Promise<DashboardOverview> => {
  const params = new URLSearchParams();
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);

  const queryString = params.toString();
  const url = `${DASHBOARD_BASE_URL}/admin/overview${queryString ? `?${queryString}` : ''}`;
  
  const response = await axiosClient.get<DashboardApiResponse<DashboardOverview>>(url);
  return response.data.result;
};

/**
 * Get revenue statistics with grouping
 */
export const getRevenueStatistics = async (
  dateFrom?: string | null,
  dateTo?: string | null,
  groupBy: DashboardGroupBy = 'DAY',
  branchId?: string | null
): Promise<RevenueStatistics[]> => {
  const params = new URLSearchParams();
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  params.append('groupBy', groupBy);
  if (branchId) params.append('branchId', branchId);

  const url = `${DASHBOARD_BASE_URL}/revenue?${params.toString()}`;
  const response = await axiosClient.get<DashboardApiResponse<RevenueStatistics[]>>(url);
  return response.data.result;
};

/**
 * Get occupancy statistics
 */
export const getOccupancyStatistics = async (
  date?: string | null,
  branchId?: string | null
): Promise<OccupancyStatistics> => {
  const params = new URLSearchParams();
  if (date) params.append('date', date);
  if (branchId) params.append('branchId', branchId);

  const queryString = params.toString();
  const url = `${DASHBOARD_BASE_URL}/occupancy${queryString ? `?${queryString}` : ''}`;
  
  const response = await axiosClient.get<DashboardApiResponse<OccupancyStatistics>>(url);
  return response.data.result;
};

/**
 * Get top selling room types
 */
export const getTopRoomTypes = async (
  limit: number = 5,
  branchId?: string | null
): Promise<TopRoomType[]> => {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  if (branchId) params.append('branchId', branchId);

  const url = `${DASHBOARD_BASE_URL}/top-rooms?${params.toString()}`;
  const response = await axiosClient.get<DashboardApiResponse<TopRoomType[]>>(url);
  return response.data.result;
};

/**
 * Get revenue by payment method
 */
export const getRevenueByPaymentMethod = async (
  dateFrom?: string | null,
  dateTo?: string | null,
  branchId?: string | null
): Promise<PaymentMethodRevenue> => {
  const params = new URLSearchParams();
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  if (branchId) params.append('branchId', branchId);

  const queryString = params.toString();
  const url = `${DASHBOARD_BASE_URL}/revenue/payment-methods${queryString ? `?${queryString}` : ''}`;
  
  const response = await axiosClient.get<DashboardApiResponse<PaymentMethodRevenue>>(url);
  return response.data.result;
};

/**
 * Get bookings by source
 */
export const getBookingsBySource = async (
  dateFrom?: string | null,
  dateTo?: string | null,
  branchId?: string | null
): Promise<BookingSourceStats> => {
  const params = new URLSearchParams();
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  if (branchId) params.append('branchId', branchId);

  const queryString = params.toString();
  const url = `${DASHBOARD_BASE_URL}/bookings/source${queryString ? `?${queryString}` : ''}`;
  
  const response = await axiosClient.get<DashboardApiResponse<BookingSourceStats>>(url);
  return response.data.result;
};

/**
 * Get customer growth statistics
 */
export const getCustomerGrowth = async (
  period: DashboardGroupBy = 'MONTH'
): Promise<CustomerGrowthPoint[]> => {
  const url = `${DASHBOARD_BASE_URL}/customer-growth?period=${period}`;
  const response = await axiosClient.get<DashboardApiResponse<CustomerGrowthPoint[]>>(url);
  return response.data.result;
};

// ============================================
// Manager Dashboard APIs
// ============================================

/**
 * Get manager branch overview
 */
export const getManagerBranchOverview = async (
  branchId: string,
  dateFrom?: string | null,
  dateTo?: string | null
): Promise<DashboardOverview> => {
  const params = new URLSearchParams();
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);

  const queryString = params.toString();
  const url = `${DASHBOARD_BASE_URL}/manager/branch/${branchId}${queryString ? `?${queryString}` : ''}`;
  
  const response = await axiosClient.get<DashboardApiResponse<DashboardOverview>>(url);
  return response.data.result;
};

// ============================================
// Staff Dashboard APIs
// ============================================

/**
 * Get staff dashboard overview
 */
export const getStaffOverview = async (
  dateFrom?: string | null,
  dateTo?: string | null
): Promise<DashboardOverview> => {
  const params = new URLSearchParams();
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);

  const queryString = params.toString();
  const url = `${DASHBOARD_BASE_URL}/staff${queryString ? `?${queryString}` : ''}`;
  
  const response = await axiosClient.get<DashboardApiResponse<DashboardOverview>>(url);
  return response.data.result;
};

// ============================================
// Export all dashboard API functions
// ============================================

const dashboardApi = {
  // Admin
  getAdminOverview,
  getRevenueStatistics,
  getOccupancyStatistics,
  getTopRoomTypes,
  getRevenueByPaymentMethod,
  getBookingsBySource,
  getCustomerGrowth,
  // Manager
  getManagerBranchOverview,
  // Staff
  getStaffOverview,
};

export default dashboardApi;

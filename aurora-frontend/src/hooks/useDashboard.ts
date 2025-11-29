// ============================================
// Custom Hook for Dashboard Data - Aurora Hotel
// ============================================

import { useState, useEffect, useCallback } from 'react';
import dashboardApi from '@/services/dashboardApi';
import type {
  DashboardOverview,
  RevenueStatistics,
  OccupancyStatistics,
  TopRoomType,
  CustomerGrowthPoint,
  PaymentMethodRevenue,
  BookingSourceStats,
  DashboardGroupBy,
} from '@/types/dashboard.types';

interface UseDashboardState {
  overview: DashboardOverview | null;
  revenueStats: RevenueStatistics[];
  occupancyStats: OccupancyStatistics | null;
  topRoomTypes: TopRoomType[];
  paymentMethods: PaymentMethodRevenue | null;
  bookingSources: BookingSourceStats | null;
  customerGrowth: CustomerGrowthPoint[];
  loading: boolean;
  error: string | null;
}

interface UseDashboardOptions {
  dateFrom?: string | null;
  dateTo?: string | null;
  groupBy?: DashboardGroupBy;
  branchId?: string | null;
  autoFetch?: boolean;
}

export const useAdminDashboard = (options: UseDashboardOptions = {}) => {
  const { 
    dateFrom = null, 
    dateTo = null, 
    groupBy = 'DAY',
    branchId = null,
    autoFetch = true 
  } = options;

  const [state, setState] = useState<UseDashboardState>({
    overview: null,
    revenueStats: [],
    occupancyStats: null,
    topRoomTypes: [],
    paymentMethods: null,
    bookingSources: null,
    customerGrowth: [],
    loading: false,
    error: null,
  });

  // Fetch Overview
  const fetchOverview = useCallback(async () => {
    try {
      const data = await dashboardApi.getAdminOverview(dateFrom, dateTo);
      setState(prev => ({ ...prev, overview: data }));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch overview';
      setState(prev => ({ ...prev, error: message }));
      throw err;
    }
  }, [dateFrom, dateTo]);

  // Fetch Revenue Statistics
  const fetchRevenueStats = useCallback(async () => {
    try {
      const data = await dashboardApi.getRevenueStatistics(dateFrom, dateTo, groupBy, branchId);
      setState(prev => ({ ...prev, revenueStats: data }));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch revenue stats';
      setState(prev => ({ ...prev, error: message }));
      throw err;
    }
  }, [dateFrom, dateTo, groupBy, branchId]);

  // Fetch Occupancy Statistics
  const fetchOccupancyStats = useCallback(async () => {
    try {
      const data = await dashboardApi.getOccupancyStatistics(null, branchId);
      setState(prev => ({ ...prev, occupancyStats: data }));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch occupancy stats';
      setState(prev => ({ ...prev, error: message }));
      throw err;
    }
  }, [branchId]);

  // Fetch Top Room Types
  const fetchTopRoomTypes = useCallback(async (limit: number = 5) => {
    try {
      const data = await dashboardApi.getTopRoomTypes(limit, branchId);
      setState(prev => ({ ...prev, topRoomTypes: data }));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch top room types';
      setState(prev => ({ ...prev, error: message }));
      throw err;
    }
  }, [branchId]);

  // Fetch Payment Methods Revenue
  const fetchPaymentMethods = useCallback(async () => {
    try {
      const data = await dashboardApi.getRevenueByPaymentMethod(dateFrom, dateTo, branchId);
      setState(prev => ({ ...prev, paymentMethods: data }));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch payment methods';
      setState(prev => ({ ...prev, error: message }));
      throw err;
    }
  }, [dateFrom, dateTo, branchId]);

  // Fetch Booking Sources
  const fetchBookingSources = useCallback(async () => {
    try {
      const data = await dashboardApi.getBookingsBySource(dateFrom, dateTo, branchId);
      setState(prev => ({ ...prev, bookingSources: data }));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch booking sources';
      setState(prev => ({ ...prev, error: message }));
      throw err;
    }
  }, [dateFrom, dateTo, branchId]);

  // Fetch Customer Growth
  const fetchCustomerGrowth = useCallback(async (period: DashboardGroupBy = 'MONTH') => {
    try {
      const data = await dashboardApi.getCustomerGrowth(period);
      setState(prev => ({ ...prev, customerGrowth: data }));
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch customer growth';
      setState(prev => ({ ...prev, error: message }));
      throw err;
    }
  }, []);

  // Fetch All Dashboard Data
  const fetchAllData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await Promise.all([
        fetchOverview(),
        fetchRevenueStats(),
        fetchOccupancyStats(),
        fetchTopRoomTypes(),
        fetchPaymentMethods(),
        fetchBookingSources(),
        fetchCustomerGrowth(),
      ]);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [
    fetchOverview,
    fetchRevenueStats,
    fetchOccupancyStats,
    fetchTopRoomTypes,
    fetchPaymentMethods,
    fetchBookingSources,
    fetchCustomerGrowth,
  ]);

  // Refresh data
  const refresh = useCallback(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchAllData();
    }
  }, [autoFetch, fetchAllData]);

  return {
    ...state,
    fetchOverview,
    fetchRevenueStats,
    fetchOccupancyStats,
    fetchTopRoomTypes,
    fetchPaymentMethods,
    fetchBookingSources,
    fetchCustomerGrowth,
    fetchAllData,
    refresh,
  };
};

export default useAdminDashboard;

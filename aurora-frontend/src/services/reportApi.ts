import axiosClient from '@/config/axiosClient';
import type { 
  RevenueStatistics, 
  OccupancyStatistics,
  DashboardOverview,
  TopRoomType,
  PaymentMethodRevenue,
  BookingSourceStats,
  CustomerGrowthPoint,
  DashboardGroupBy,
} from '@/types/dashboard.types';
import type {
  BranchComparisonData,
  ShiftReportData,
  ShiftSummary,
} from '@/types/report.types';

const DASHBOARD_BASE_URL = '/api/dashboard';

// =====================
// Revenue Reports
// =====================

/**
 * Get revenue statistics for reports
 */
export const getRevenueReport = async (
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

  const response = await axiosClient.get(`${DASHBOARD_BASE_URL}/revenue?${params.toString()}`);
  return response.data.result;
};

/**
 * Get admin overview for revenue summary
 */
export const getRevenueSummary = async (
  dateFrom?: string | null,
  dateTo?: string | null
): Promise<DashboardOverview> => {
  const params = new URLSearchParams();
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);

  const response = await axiosClient.get(`${DASHBOARD_BASE_URL}/admin/overview?${params.toString()}`);
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

  const response = await axiosClient.get(`${DASHBOARD_BASE_URL}/revenue/payment-methods?${params.toString()}`);
  return response.data.result;
};

// =====================
// Occupancy Reports
// =====================

/**
 * Get occupancy statistics
 */
export const getOccupancyReport = async (
  date?: string | null,
  branchId?: string | null
): Promise<OccupancyStatistics> => {
  const params = new URLSearchParams();
  if (date) params.append('date', date);
  if (branchId) params.append('branchId', branchId);

  const response = await axiosClient.get(`${DASHBOARD_BASE_URL}/occupancy?${params.toString()}`);
  return response.data.result;
};

/**
 * Get top room types by bookings
 */
export const getTopRoomTypes = async (
  limit: number = 10,
  branchId?: string | null
): Promise<TopRoomType[]> => {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  if (branchId) params.append('branchId', branchId);

  const response = await axiosClient.get(`${DASHBOARD_BASE_URL}/top-rooms?${params.toString()}`);
  return response.data.result;
};

// =====================
// Branch Comparison Reports
// =====================

/**
 * Get branch comparison data
 * Note: This uses mock data until backend implements the endpoint
 */
export const getBranchComparison = async (
  _dateFrom?: string | null,
  _dateTo?: string | null
): Promise<BranchComparisonData[]> => {
  // TODO: Replace with actual API call when backend implements
  // const params = new URLSearchParams();
  // if (dateFrom) params.append('dateFrom', dateFrom);
  // if (dateTo) params.append('dateTo', dateTo);
  // const response = await axiosClient.get(`${DASHBOARD_BASE_URL}/branch-comparison?${params.toString()}`);
  // return response.data.result;
  
  // Mock data for now
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      branchId: '1',
      branchCode: 'HCM01',
      branchName: 'Aurora Sài Gòn',
      city: 'Hồ Chí Minh',
      totalRevenue: 1250000000,
      totalBookings: 450,
      occupancyRate: 85.5,
      averageRating: 4.7,
      roomCount: 120,
      staffCount: 45,
      customerSatisfaction: 92,
    },
    {
      branchId: '2',
      branchCode: 'HN01',
      branchName: 'Aurora Hà Nội',
      city: 'Hà Nội',
      totalRevenue: 980000000,
      totalBookings: 380,
      occupancyRate: 78.2,
      averageRating: 4.5,
      roomCount: 100,
      staffCount: 38,
      customerSatisfaction: 88,
    },
    {
      branchId: '3',
      branchCode: 'DN01',
      branchName: 'Aurora Đà Nẵng',
      city: 'Đà Nẵng',
      totalRevenue: 750000000,
      totalBookings: 320,
      occupancyRate: 82.0,
      averageRating: 4.8,
      roomCount: 80,
      staffCount: 32,
      customerSatisfaction: 95,
    },
    {
      branchId: '4',
      branchCode: 'NT01',
      branchName: 'Aurora Nha Trang',
      city: 'Nha Trang',
      totalRevenue: 620000000,
      totalBookings: 280,
      occupancyRate: 75.5,
      averageRating: 4.6,
      roomCount: 70,
      staffCount: 28,
      customerSatisfaction: 90,
    },
  ];
};

// =====================
// Booking Reports
// =====================

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

  const response = await axiosClient.get(`${DASHBOARD_BASE_URL}/bookings/source?${params.toString()}`);
  return response.data.result;
};

// =====================
// Customer Reports
// =====================

/**
 * Get customer growth statistics
 */
export const getCustomerGrowth = async (
  period: DashboardGroupBy = 'MONTH'
): Promise<CustomerGrowthPoint[]> => {
  const response = await axiosClient.get(`${DASHBOARD_BASE_URL}/customer-growth?period=${period}`);
  return response.data.result;
};

// =====================
// Shift Reports
// =====================

/**
 * Get shift report data
 * Note: This uses mock data until backend implements the endpoint
 */
export const getShiftReport = async (
  dateFrom?: string | null,
  dateTo?: string | null,
  _branchId?: string | null,
  _staffId?: string | null
): Promise<ShiftReportData[]> => {
  // TODO: Replace with actual API call when backend implements
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data
  const mockShifts: ShiftReportData[] = [];
  const staffNames = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D'];
  const shiftTypes: ('MORNING' | 'AFTERNOON' | 'NIGHT')[] = ['MORNING', 'AFTERNOON', 'NIGHT'];
  
  const startDate = dateFrom ? new Date(dateFrom) : new Date();
  const endDate = dateTo ? new Date(dateTo) : new Date();
  
  let currentDate = new Date(startDate);
  let id = 1;
  
  while (currentDate <= endDate) {
    for (const shiftType of shiftTypes) {
      const staffIndex = Math.floor(Math.random() * staffNames.length);
      mockShifts.push({
        shiftId: `shift-${id}`,
        staffId: `staff-${staffIndex + 1}`,
        staffName: staffNames[staffIndex],
        shiftDate: currentDate.toISOString().split('T')[0],
        shiftType,
        startTime: shiftType === 'MORNING' ? '06:00' : shiftType === 'AFTERNOON' ? '14:00' : '22:00',
        endTime: shiftType === 'MORNING' ? '14:00' : shiftType === 'AFTERNOON' ? '22:00' : '06:00',
        checkIns: Math.floor(Math.random() * 15) + 5,
        checkOuts: Math.floor(Math.random() * 12) + 3,
        bookingsCreated: Math.floor(Math.random() * 8) + 2,
        revenue: Math.floor(Math.random() * 50000000) + 10000000,
      });
      id++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return mockShifts;
};

/**
 * Get shift summary
 */
export const getShiftSummary = async (
  dateFrom?: string | null,
  dateTo?: string | null,
  branchId?: string | null
): Promise<ShiftSummary> => {
  const shifts = await getShiftReport(dateFrom, dateTo, branchId);
  
  return {
    totalShifts: shifts.length,
    totalCheckIns: shifts.reduce((sum, s) => sum + s.checkIns, 0),
    totalCheckOuts: shifts.reduce((sum, s) => sum + s.checkOuts, 0),
    totalRevenue: shifts.reduce((sum, s) => sum + s.revenue, 0),
    averageShiftRevenue: shifts.length > 0 
      ? shifts.reduce((sum, s) => sum + s.revenue, 0) / shifts.length 
      : 0,
  };
};

export default {
  getRevenueReport,
  getRevenueSummary,
  getRevenueByPaymentMethod,
  getOccupancyReport,
  getTopRoomTypes,
  getBranchComparison,
  getBookingsBySource,
  getCustomerGrowth,
  getShiftReport,
  getShiftSummary,
};

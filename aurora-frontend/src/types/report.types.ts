// Report Types for Aurora Hotel Management System

// =====================
// Revenue Report Types
// =====================

export interface RevenueReportData {
  periodLabel: string;
  revenue: number;
  bookingCount: number;
  averageBookingValue: number;
  roomRevenue?: number;
  serviceRevenue?: number;
  otherRevenue?: number;
}

export interface RevenueSummary {
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
  revenueGrowthPercent: number;
  roomRevenuePercent: number;
  serviceRevenuePercent: number;
}

export interface RevenueByCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

// =====================
// Occupancy Report Types
// =====================

export interface OccupancyReportData {
  date: string;
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  occupancyRate: number;
  checkIns: number;
  checkOuts: number;
}

export interface OccupancySummary {
  averageOccupancyRate: number;
  peakOccupancyRate: number;
  lowestOccupancyRate: number;
  totalRoomNights: number;
  occupiedRoomNights: number;
}

export interface RoomTypeOccupancy {
  roomTypeId: string;
  roomTypeName: string;
  totalRooms: number;
  occupiedRooms: number;
  occupancyRate: number;
  revenue: number;
}

// =====================
// Branch Comparison Types
// =====================

export interface BranchComparisonData {
  branchId: string;
  branchCode: string;
  branchName: string;
  city: string;
  totalRevenue: number;
  totalBookings: number;
  occupancyRate: number;
  averageRating: number;
  roomCount: number;
  staffCount: number;
  customerSatisfaction: number;
}

export interface BranchPerformanceMetric {
  metricName: string;
  branches: {
    branchId: string;
    branchName: string;
    value: number;
    rank: number;
  }[];
}

// =====================
// Shift Report Types
// =====================

export interface ShiftReportData {
  shiftId: string;
  staffId: string;
  staffName: string;
  shiftDate: string;
  shiftType: 'MORNING' | 'AFTERNOON' | 'NIGHT';
  startTime: string;
  endTime: string;
  checkIns: number;
  checkOuts: number;
  bookingsCreated: number;
  revenue: number;
  notes?: string;
}

export interface ShiftSummary {
  totalShifts: number;
  totalCheckIns: number;
  totalCheckOuts: number;
  totalRevenue: number;
  averageShiftRevenue: number;
}

export type ShiftType = 'MORNING' | 'AFTERNOON' | 'NIGHT';

export const SHIFT_CONFIG: Record<ShiftType, { label: string; color: string; hours: string }> = {
  MORNING: { label: 'Ca sáng', color: 'bg-yellow-100 text-yellow-800', hours: '06:00 - 14:00' },
  AFTERNOON: { label: 'Ca chiều', color: 'bg-orange-100 text-orange-800', hours: '14:00 - 22:00' },
  NIGHT: { label: 'Ca đêm', color: 'bg-indigo-100 text-indigo-800', hours: '22:00 - 06:00' },
};

// =====================
// Report Filter Types
// =====================

export interface ReportDateRange {
  dateFrom: string;
  dateTo: string;
}

export interface ReportFilters {
  dateFrom: string | null;
  dateTo: string | null;
  branchId?: string | null;
  groupBy?: 'DAY' | 'WEEK' | 'MONTH';
}

export interface ReportExportOptions {
  format: 'PDF' | 'EXCEL' | 'CSV';
  includeCharts: boolean;
  includeDetails: boolean;
}

// =====================
// Chart Data Types
// =====================

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface MultiSeriesChartData {
  name: string;
  [key: string]: string | number;
}

// =====================
// Report Period Types
// =====================

export type ReportPeriod = 'TODAY' | 'YESTERDAY' | 'THIS_WEEK' | 'LAST_WEEK' | 'THIS_MONTH' | 'LAST_MONTH' | 'THIS_YEAR' | 'CUSTOM';

export const REPORT_PERIOD_CONFIG: Record<ReportPeriod, { label: string }> = {
  TODAY: { label: 'Hôm nay' },
  YESTERDAY: { label: 'Hôm qua' },
  THIS_WEEK: { label: 'Tuần này' },
  LAST_WEEK: { label: 'Tuần trước' },
  THIS_MONTH: { label: 'Tháng này' },
  LAST_MONTH: { label: 'Tháng trước' },
  THIS_YEAR: { label: 'Năm nay' },
  CUSTOM: { label: 'Tùy chọn' },
};

// Helper to get date range from period
export const getDateRangeFromPeriod = (period: ReportPeriod): { dateFrom: string; dateTo: string } => {
  const today = new Date();
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  
  switch (period) {
    case 'TODAY':
      return { dateFrom: formatDate(today), dateTo: formatDate(today) };
    case 'YESTERDAY': {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return { dateFrom: formatDate(yesterday), dateTo: formatDate(yesterday) };
    }
    case 'THIS_WEEK': {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 1);
      return { dateFrom: formatDate(startOfWeek), dateTo: formatDate(today) };
    }
    case 'LAST_WEEK': {
      const endOfLastWeek = new Date(today);
      endOfLastWeek.setDate(today.getDate() - today.getDay());
      const startOfLastWeek = new Date(endOfLastWeek);
      startOfLastWeek.setDate(endOfLastWeek.getDate() - 6);
      return { dateFrom: formatDate(startOfLastWeek), dateTo: formatDate(endOfLastWeek) };
    }
    case 'THIS_MONTH': {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return { dateFrom: formatDate(startOfMonth), dateTo: formatDate(today) };
    }
    case 'LAST_MONTH': {
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      return { dateFrom: formatDate(startOfLastMonth), dateTo: formatDate(endOfLastMonth) };
    }
    case 'THIS_YEAR': {
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      return { dateFrom: formatDate(startOfYear), dateTo: formatDate(today) };
    }
    default:
      return { dateFrom: formatDate(today), dateTo: formatDate(today) };
  }
};

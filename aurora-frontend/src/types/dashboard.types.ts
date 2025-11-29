// ============================================
// Dashboard Types - Aurora Hotel Management System
// ============================================

// Dashboard Overview Response from Backend
export interface DashboardOverview {
  totalRevenue: number;
  totalBookings: number;
  occupancyRate: number;
  averageBookingValue: number;
  newCustomers: number;
  returningCustomers: number;
  revenueGrowthPercent: number;
}

// Revenue Statistics for charts
export interface RevenueStatistics {
  periodLabel: string;
  revenue: number;
  bookingCount: number;
  averageBookingValue: number;
}

// Occupancy Statistics
export interface OccupancyStatistics {
  date: string;
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  occupancyRate: number;
}

// Top Room Type Response
export interface TopRoomType {
  roomTypeId: string;
  roomTypeName: string;
  bookings: number;
}

// Customer Growth Point
export interface CustomerGrowthPoint {
  periodLabel: string;
  customers: number;
}

// Payment Method Revenue
export interface PaymentMethodRevenue {
  [method: string]: number;
}

// Booking Source Statistics
export interface BookingSourceStats {
  [source: string]: number;
}

// Branch Statistics for comparison
export interface BranchStatistics {
  branchId: string;
  branchName: string;
  revenue: number;
  bookings: number;
  occupancyRate: number;
  rating: number;
}

// Date Range for filtering
export interface DateRange {
  dateFrom: string | null;
  dateTo: string | null;
}

// Dashboard Group By options
export type DashboardGroupBy = 'DAY' | 'WEEK' | 'MONTH';

// Stats Card Config
export interface StatsCardConfig {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: string;
  prefix?: string;
  suffix?: string;
}

// Chart common props
export interface ChartProps {
  data: unknown[];
  loading?: boolean;
  error?: string | null;
  height?: number;
}

// API Response wrapper (matching backend ApiResponse)
export interface DashboardApiResponse<T> {
  code?: number;
  message?: string;
  result: T;
}

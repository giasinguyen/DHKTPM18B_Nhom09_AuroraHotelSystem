// ============================================
// Admin Dashboard Page - Aurora Hotel Management
// ============================================

import { useState, useCallback } from 'react';
import { format, subDays } from 'date-fns';
import { useAdminDashboard } from '@/hooks/useDashboard';
import {
  StatsCardsGrid,
  DateRangePicker,
  RevenueChart,
  TopRoomTypesChart,
  PaymentMethodsChart,
  CustomerGrowthChart,
  OccupancyChart,
  BookingSourcesChart,
} from '@/pages/admin/components/dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { DashboardGroupBy } from '@/types/dashboard.types';

const AdminDashboard = () => {
  // Date range state
  const [dateFrom, setDateFrom] = useState<string | null>(
    format(subDays(new Date(), 30), 'yyyy-MM-dd')
  );
  const [dateTo, setDateTo] = useState<string | null>(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [groupBy, setGroupBy] = useState<DashboardGroupBy>('DAY');

  // Fetch dashboard data using custom hook
  const {
    overview,
    revenueStats,
    occupancyStats,
    topRoomTypes,
    paymentMethods,
    bookingSources,
    customerGrowth,
    loading,
    error,
    refresh,
  } = useAdminDashboard({
    dateFrom,
    dateTo,
    groupBy,
    autoFetch: true,
  });

  // Handle date range change
  const handleDateChange = useCallback((from: string | null, to: string | null) => {
    setDateFrom(from);
    setDateTo(to);
  }, []);

  // Handle group by change
  const handleGroupByChange = useCallback((value: string) => {
    setGroupBy(value as DashboardGroupBy);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's what's happening across all branches.
          </p>
        </div>
      </div>

      {/* Date Range Picker */}
      <DateRangePicker
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateChange={handleDateChange}
        onRefresh={refresh}
        loading={loading}
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error loading dashboard data</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards Grid */}
      <StatsCardsGrid data={overview} loading={loading} />

      {/* Charts Section with Tabs */}
      <div className="space-y-6">
        {/* Revenue Chart with Group By Options */}
        <div>
          <Tabs defaultValue="DAY" onValueChange={handleGroupByChange} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Analytics</h2>
              <TabsList>
                <TabsTrigger value="DAY">Daily</TabsTrigger>
                <TabsTrigger value="WEEK">Weekly</TabsTrigger>
                <TabsTrigger value="MONTH">Monthly</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="DAY" className="mt-0">
              <RevenueChart data={revenueStats} loading={loading} />
            </TabsContent>
            <TabsContent value="WEEK" className="mt-0">
              <RevenueChart data={revenueStats} loading={loading} />
            </TabsContent>
            <TabsContent value="MONTH" className="mt-0">
              <RevenueChart data={revenueStats} loading={loading} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Charts Grid - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopRoomTypesChart data={topRoomTypes} loading={loading} />
          <OccupancyChart data={occupancyStats} loading={loading} />
        </div>

        {/* Charts Grid - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PaymentMethodsChart data={paymentMethods} loading={loading} />
          <BookingSourcesChart data={bookingSources} loading={loading} />
        </div>

        {/* Customer Growth Chart */}
        <CustomerGrowthChart data={customerGrowth} loading={loading} />
      </div>

      {/* Footer Info */}
      <div className="text-center text-sm text-gray-500 pt-4 border-t">
        <p>
          Data refreshed at: {format(new Date(), 'PPpp')} | 
          Showing data from {dateFrom ? format(new Date(dateFrom), 'PP') : 'N/A'} to {dateTo ? format(new Date(dateTo), 'PP') : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
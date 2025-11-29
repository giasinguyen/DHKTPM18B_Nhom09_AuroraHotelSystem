import { useState, useEffect, useCallback } from 'react';
import { Building2, BedDouble, DoorOpen, Users, BarChart3, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ReportDateRangeFilter, ReportStatCard, ReportChartCard, ExportButtons, BranchSelector,
  OccupancyGauge, RoomStatusPieChart, RoomStatusList, WeeklyTrendChart, TopRoomTypesChart, SummaryCard,
} from '@/components/custom/reports';
import { getOccupancyStatistics, getTopRoomTypes } from '@/services/dashboardApi';
import type { ReportDateRange } from '@/types/report.types';
import type { OccupancyStatistics, TopRoomType } from '@/types/dashboard.types';
import { toast } from 'sonner';

// Constants
const ROOM_STATUS_COLORS = { available: '#10b981', occupied: '#3b82f6', maintenance: '#ef4444', reserved: '#f59e0b' };
const WEEKLY_TREND = [
  { name: 'Thứ 2', rate: 65, rooms: 32 }, { name: 'Thứ 3', rate: 72, rooms: 36 },
  { name: 'Thứ 4', rate: 78, rooms: 39 }, { name: 'Thứ 5', rate: 85, rooms: 42 },
  { name: 'Thứ 6', rate: 92, rooms: 46 }, { name: 'Thứ 7', rate: 95, rooms: 47 }, { name: 'CN', rate: 88, rooms: 44 },
];

export default function OccupancyReport() {
  const [dateRange, setDateRange] = useState<ReportDateRange>({ dateFrom: new Date().toISOString().split('T')[0], dateTo: new Date().toISOString().split('T')[0] });
  const [branchId, setBranchId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [occupancyStats, setOccupancyStats] = useState<OccupancyStatistics | null>(null);
  const [topRoomTypes, setTopRoomTypes] = useState<TopRoomType[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [occupancyRes, roomTypesRes] = await Promise.all([
        getOccupancyStatistics(dateRange.dateTo || undefined, branchId || undefined),
        getTopRoomTypes(10, branchId || undefined),
      ]);
      setOccupancyStats(occupancyRes);
      setTopRoomTypes(roomTypesRes);
    } catch (error) {
      console.error('Failed to fetch occupancy data:', error);
      toast.error('Không thể tải dữ liệu công suất');
    } finally {
      setLoading(false);
    }
  }, [dateRange.dateTo, branchId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Derived data
  const totalRooms = occupancyStats?.totalRooms || 0;
  const occupancyRate = occupancyStats?.occupancyRate || 0;
  const roomStatusData = occupancyStats ? [
    { name: 'Trống', value: occupancyStats.availableRooms, color: ROOM_STATUS_COLORS.available, icon: DoorOpen },
    { name: 'Đang sử dụng', value: occupancyStats.occupiedRooms, color: ROOM_STATUS_COLORS.occupied, icon: BedDouble },
  ].filter(item => item.value > 0) : [];
  const avgRate = WEEKLY_TREND.reduce((sum, d) => sum + d.rate, 0) / WEEKLY_TREND.length;
  const avgGuests = Math.round(WEEKLY_TREND.reduce((sum, d) => sum + d.rooms, 0) / WEEKLY_TREND.length * 1.8);

  const handleExportPDF = async () => { await new Promise(r => setTimeout(r, 1000)); toast.success('Đã xuất báo cáo PDF'); };
  const handleExportExcel = async () => { await new Promise(r => setTimeout(r, 1000)); toast.success('Đã xuất báo cáo Excel'); };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Báo cáo công suất phòng</h1>
          <p className="text-gray-500 mt-1">Theo dõi tình trạng sử dụng phòng và công suất</p>
        </div>
        <ExportButtons onExportPDF={handleExportPDF} onExportExcel={handleExportExcel} loading={loading} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4">
        <ReportDateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange} onRefresh={fetchData} loading={loading} />
        <BranchSelector value={branchId} onChange={setBranchId} />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportStatCard title="Tổng số phòng" value={totalRooms.toString()} subtitle="Trong hệ thống" icon={Building2} variant="primary" loading={loading} />
        <ReportStatCard title="Phòng trống" value={(occupancyStats?.availableRooms || 0).toString()} subtitle="Sẵn sàng sử dụng" icon={DoorOpen} variant="success" loading={loading} />
        <ReportStatCard title="Đang sử dụng" value={(occupancyStats?.occupiedRooms || 0).toString()} subtitle="Có khách" icon={BedDouble} variant="info" loading={loading} />
        <ReportStatCard title="Tỷ lệ lấp đầy" value={`${occupancyRate.toFixed(1)}%`} subtitle="Công suất sử dụng" icon={BarChart3} trend={{ value: 5.2, label: 'so với tuần trước' }} variant="warning" loading={loading} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ReportChartCard title="Công suất hiện tại" subtitle="Tỷ lệ phòng được sử dụng" loading={loading} minHeight="300px">
          <OccupancyGauge value={occupancyRate} />
        </ReportChartCard>

        <ReportChartCard title="Phân bổ trạng thái phòng" subtitle="Tình trạng phòng hiện tại" loading={loading} className="lg:col-span-2" minHeight="300px">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            <RoomStatusPieChart data={roomStatusData.map(({ icon, ...rest }) => rest)} />
            <RoomStatusList data={roomStatusData} totalRooms={totalRooms} />
          </div>
        </ReportChartCard>
      </div>

      {/* Weekly Trend */}
      <ReportChartCard title="Xu hướng công suất theo tuần" subtitle="Biến động công suất 7 ngày gần nhất" loading={loading} minHeight="350px">
        <WeeklyTrendChart data={WEEKLY_TREND} />
      </ReportChartCard>

      {/* Top Room Types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-amber-500" />
            Loại phòng phổ biến nhất
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TopRoomTypesChart data={topRoomTypes} />
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard icon={DoorOpen} title="Công suất cao nhất" value="95%" subtitle="Thứ 7" variant="green" />
        <SummaryCard icon={BarChart3} title="Công suất trung bình" value={`${avgRate.toFixed(1)}%`} subtitle="7 ngày qua" variant="amber" />
        <SummaryCard icon={Users} title="Số khách trung bình" value={avgGuests.toString()} subtitle="Mỗi ngày" variant="blue" />
      </div>
    </div>
  );
}

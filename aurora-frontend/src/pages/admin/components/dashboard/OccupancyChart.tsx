// ============================================
// Occupancy Gauge Chart - Admin Dashboard
// ============================================

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { OccupancyStatistics } from '@/types/dashboard.types';
import ChartCard from './ChartCard';
import { BedDouble, CheckCircle, XCircle } from 'lucide-react';

interface OccupancyChartProps {
  data: OccupancyStatistics | null;
  loading?: boolean;
  error?: string | null;
}

export default function OccupancyChart({ data, loading, error }: OccupancyChartProps) {
  const occupancyRate = data?.occupancyRate ?? 0;
  const totalRooms = data?.totalRooms ?? 0;
  const occupiedRooms = data?.occupiedRooms ?? 0;
  const availableRooms = data?.availableRooms ?? 0;

  // Data for the gauge chart
  const gaugeData = [
    { name: 'Occupied', value: occupancyRate },
    { name: 'Available', value: 100 - occupancyRate },
  ];

  const getOccupancyColor = (rate: number) => {
    if (rate >= 80) return '#10b981'; // Green - Good
    if (rate >= 50) return '#f59e0b'; // Yellow - Medium
    return '#ef4444'; // Red - Low
  };

  const occupancyColor = getOccupancyColor(occupancyRate);

  return (
    <ChartCard
      title="Room Occupancy"
      subtitle="Current occupancy status"
      loading={loading}
      error={error}
    >
      {!data ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Gauge Chart */}
          <div className="relative w-48 h-32">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill={occupancyColor} />
                  <Cell fill="#e5e7eb" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
              <span className="text-3xl font-bold" style={{ color: occupancyColor }}>
                {occupancyRate.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 w-full mt-6 pt-4 border-t">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-gray-500">
                <BedDouble className="h-4 w-4" />
                <span className="text-xs">Total</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">{totalRooms}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-red-500">
                <XCircle className="h-4 w-4" />
                <span className="text-xs">Occupied</span>
              </div>
              <span className="text-lg font-semibold text-red-600">{occupiedRooms}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-green-500">
                <CheckCircle className="h-4 w-4" />
                <span className="text-xs">Available</span>
              </div>
              <span className="text-lg font-semibold text-green-600">{availableRooms}</span>
            </div>
          </div>
        </div>
      )}
    </ChartCard>
  );
}

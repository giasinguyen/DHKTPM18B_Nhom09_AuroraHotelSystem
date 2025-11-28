// ============================================
// Top Room Types Chart - Admin Dashboard
// ============================================

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { TopRoomType } from '@/types/dashboard.types';
import ChartCard from './ChartCard';

interface TopRoomTypesChartProps {
  data: TopRoomType[];
  loading?: boolean;
  error?: string | null;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

const CustomTooltip = ({ active, payload }: {
  active?: boolean;
  payload?: Array<{ value: number; payload: TopRoomType }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border">
        <p className="font-medium text-gray-900">{data.roomTypeName}</p>
        <p className="text-sm text-gray-600">
          Bookings: <span className="font-medium text-blue-600">{data.bookings}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function TopRoomTypesChart({ data, loading, error }: TopRoomTypesChartProps) {
  const hasData = data && data.length > 0;

  // Truncate room type names for display
  const chartData = data.map(item => ({
    ...item,
    displayName: item.roomTypeName.length > 15 
      ? item.roomTypeName.substring(0, 15) + '...' 
      : item.roomTypeName,
  }));

  return (
    <ChartCard
      title="Top Room Types"
      subtitle="Most booked room types"
      loading={loading}
      error={error}
    >
      {!hasData ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              type="category"
              dataKey="displayName"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="bookings" radius={[0, 4, 4, 0]} barSize={24}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

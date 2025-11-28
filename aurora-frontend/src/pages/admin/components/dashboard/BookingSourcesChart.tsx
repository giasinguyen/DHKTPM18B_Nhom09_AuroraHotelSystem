// ============================================
// Booking Sources Chart - Admin Dashboard
// ============================================

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { BookingSourceStats } from '@/types/dashboard.types';
import ChartCard from './ChartCard';

interface BookingSourcesChartProps {
  data: BookingSourceStats | null;
  loading?: boolean;
  error?: string | null;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

const SOURCE_LABELS: Record<string, string> = {
  DIRECT: 'Direct Booking',
  WEBSITE: 'Website',
  MOBILE_APP: 'Mobile App',
  WALK_IN: 'Walk-in',
  PHONE: 'Phone',
  OTHER: 'Other',
};

const CustomTooltip = ({ active, payload }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; payload: { name: string; value: number; percent: number } }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600">
          Bookings: <span className="font-medium text-blue-600">{data.value}</span>
        </p>
        <p className="text-sm text-gray-600">
          Share: <span className="font-medium">{(data.percent * 100).toFixed(1)}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: { payload?: Array<{ value: string; color: string }> }) => {
  if (!payload) return null;
  
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function BookingSourcesChart({ data, loading, error }: BookingSourcesChartProps) {
  // Transform data for pie chart
  const chartData = data
    ? Object.entries(data).map(([source, value]) => ({
        name: SOURCE_LABELS[source] || source,
        value: Number(value),
      })).filter(item => item.value > 0)
    : [];

  const hasData = chartData.length > 0;
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Add percent to each item
  const chartDataWithPercent = chartData.map(item => ({
    ...item,
    percent: total > 0 ? item.value / total : 0,
  }));

  return (
    <ChartCard
      title="Booking Sources"
      subtitle="Where bookings come from"
      loading={loading}
      error={error}
    >
      {!hasData ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartDataWithPercent}
              cx="50%"
              cy="45%"
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
            >
              {chartDataWithPercent.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

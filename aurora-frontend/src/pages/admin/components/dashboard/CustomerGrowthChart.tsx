// ============================================
// Customer Growth Chart - Admin Dashboard
// ============================================

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { CustomerGrowthPoint } from '@/types/dashboard.types';
import ChartCard from './ChartCard';

interface CustomerGrowthChartProps {
  data: CustomerGrowthPoint[];
  loading?: boolean;
  error?: string | null;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">
          New Customers: <span className="font-medium text-purple-600">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function CustomerGrowthChart({ data, loading, error }: CustomerGrowthChartProps) {
  const hasData = data && data.length > 0;

  return (
    <ChartCard
      title="Customer Growth"
      subtitle="New customer registrations over time"
      loading={loading}
      error={error}
    >
      {!hasData ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="periodLabel"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="customers"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#8b5cf6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

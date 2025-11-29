// ============================================
// Payment Methods Chart - Admin Dashboard
// ============================================

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { PaymentMethodRevenue } from '@/types/dashboard.types';
import ChartCard from './ChartCard';

interface PaymentMethodsChartProps {
  data: PaymentMethodRevenue | null;
  loading?: boolean;
  error?: string | null;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  CASH: 'Cash',
  VNPAY: 'VNPay',
  CREDIT_CARD: 'Credit Card',
  DEBIT_CARD: 'Debit Card',
  BANK_TRANSFER: 'Bank Transfer',
  OTHER: 'Other',
};

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value}`;
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
          Amount: <span className="font-medium text-blue-600">{formatCurrency(data.value)}</span>
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
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function PaymentMethodsChart({ data, loading, error }: PaymentMethodsChartProps) {
  // Transform data for pie chart
  const chartData = data
    ? Object.entries(data).map(([method, value]) => ({
        name: PAYMENT_METHOD_LABELS[method] || method,
        value: Number(value),
      })).filter(item => item.value > 0)
    : [];

  const hasData = chartData.length > 0;
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  // Add percent to each item
  const chartDataWithPercent = chartData.map(item => ({
    ...item,
    percent: item.value / total,
  }));

  return (
    <ChartCard
      title="Payment Methods"
      subtitle="Revenue by payment method"
      loading={loading}
      error={error}
    >
      {!hasData ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartDataWithPercent}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
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

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface BranchRevenueChartProps {
  data: { branchName: string; totalRevenue: number }[];
  height?: number;
}

// Format currency for display
const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} tỷ`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)} triệu`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toLocaleString('vi-VN');
};

export function BranchRevenueChart({ data, height = 300 }: BranchRevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
        <YAxis dataKey="branchName" type="category" width={70} tick={{ fontSize: 11 }} />
        <Tooltip
          formatter={(value: number) => [formatCurrency(value), 'Doanh thu']}
          contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
        />
        <Legend />
        <Bar dataKey="totalRevenue" fill="#f59e0b" radius={[0, 4, 4, 0]} name="Doanh thu" />
      </BarChart>
    </ResponsiveContainer>
  );
}

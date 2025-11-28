import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Legend,
  ComposedChart,
} from 'recharts';

interface WeeklyTrendData {
  name: string;
  rate: number;
  rooms: number;
}

interface WeeklyTrendChartProps {
  data: WeeklyTrendData[];
  height?: number;
}

export function WeeklyTrendChart({ data, height = 350 }: WeeklyTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis 
          yAxisId="left"
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          formatter={(value: number, name: string) => {
            if (name === 'Tỷ lệ công suất') return [`${value}%`, name];
            return [value, name];
          }}
          contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="rate"
          stroke="#f59e0b"
          strokeWidth={3}
          dot={{ r: 6, fill: '#f59e0b' }}
          name="Tỷ lệ công suất"
        />
        <Bar
          yAxisId="right"
          dataKey="rooms"
          fill="#3b82f680"
          radius={[4, 4, 0, 0]}
          name="Số phòng sử dụng"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

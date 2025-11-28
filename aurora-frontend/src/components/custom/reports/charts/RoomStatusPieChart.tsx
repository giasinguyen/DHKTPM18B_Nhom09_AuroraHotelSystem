import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ReportEmptyState } from '../ReportEmptyState';

interface RoomStatusChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  height?: number;
}

export function RoomStatusPieChart({ data, height = 250 }: RoomStatusChartProps) {
  if (data.length === 0) {
    return (
      <ReportEmptyState
        title="Chưa có dữ liệu"
        description="Không có dữ liệu trạng thái phòng"
      />
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPie>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
          label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </RechartsPie>
    </ResponsiveContainer>
  );
}

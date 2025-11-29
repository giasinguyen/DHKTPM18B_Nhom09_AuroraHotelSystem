import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const BRANCH_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

interface BranchData {
  branchName: string;
  occupancyRate: number;
  averageRating: number;
  customerSatisfaction: number;
}

interface BranchRadarChartProps {
  data: BranchData[];
  height?: number;
}

export function BranchRadarChart({ data, height = 350 }: BranchRadarChartProps) {
  // Transform data for radar chart
  const radarData = [
    { metric: 'Công suất', ...Object.fromEntries(data.map((b, i) => [`branch${i}`, b.occupancyRate])) },
    { metric: 'Đánh giá', ...Object.fromEntries(data.map((b, i) => [`branch${i}`, b.averageRating * 20])) },
    { metric: 'Hài lòng', ...Object.fromEntries(data.map((b, i) => [`branch${i}`, b.customerSatisfaction])) },
  ];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
        <Legend />
        {data.slice(0, 5).map((branch, index) => (
          <Radar
            key={index}
            name={branch.branchName}
            dataKey={`branch${index}`}
            stroke={BRANCH_COLORS[index]}
            fill={BRANCH_COLORS[index]}
            fillOpacity={0.2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}

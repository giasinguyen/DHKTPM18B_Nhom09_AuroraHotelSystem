import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from 'recharts';

interface OccupancyGaugeProps {
  value: number;
  size?: number;
}

export function OccupancyGauge({ value, size = 200 }: OccupancyGaugeProps) {
  const data = [
    {
      name: 'Công suất',
      value: value,
      fill: value >= 80 ? '#10b981' : value >= 50 ? '#f59e0b' : '#ef4444',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={size}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            background={{ fill: '#f3f4f6' }}
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="text-center -mt-16">
        <p className="text-4xl font-bold text-gray-900">{value.toFixed(1)}%</p>
        <p className="text-sm text-gray-500">Công suất</p>
      </div>
    </div>
  );
}

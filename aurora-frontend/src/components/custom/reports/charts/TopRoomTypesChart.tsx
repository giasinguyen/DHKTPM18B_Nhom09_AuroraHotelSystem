import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { TopRoomType } from '@/types/dashboard.types';
import { ReportEmptyState } from '../ReportEmptyState';

interface TopRoomTypesChartProps {
  data: TopRoomType[];
  showTable?: boolean;
}

export function TopRoomTypesChart({ data, showTable = true }: TopRoomTypesChartProps) {
  if (data.length === 0) {
    return (
      <ReportEmptyState
        title="Chưa có dữ liệu"
        description="Không có dữ liệu loại phòng"
      />
    );
  }

  const totalBookings = data.reduce((sum, r) => sum + r.bookings, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis 
            dataKey="roomTypeName" 
            type="category" 
            width={120}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          <Bar 
            dataKey="bookings" 
            fill="#f59e0b" 
            radius={[0, 4, 4, 0]} 
            name="Số lượt đặt" 
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Table */}
      {showTable && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Loại phòng</TableHead>
                <TableHead className="text-right">Số lượt đặt</TableHead>
                <TableHead className="text-right">Tỷ lệ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 5).map((roomType, index) => {
                const percentage = totalBookings > 0 
                  ? (roomType.bookings / totalBookings) * 100 
                  : 0;
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        index === 0 ? 'bg-amber-100 text-amber-700' :
                        index === 1 ? 'bg-gray-100 text-gray-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-50 text-gray-500'
                      }`}>
                        {index + 1}
                      </span>
                    </TableCell>
                    <TableCell>{roomType.roomTypeName}</TableCell>
                    <TableCell className="text-right font-medium">
                      {roomType.bookings}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress value={percentage} className="w-16 h-2" />
                        <span className="text-sm text-gray-500 min-w-[40px]">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

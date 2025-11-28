import type { LucideIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface RoomStatusItem {
  name: string;
  value: number;
  color: string;
  icon: LucideIcon;
}

interface RoomStatusListProps {
  data: RoomStatusItem[];
  totalRooms: number;
}

export function RoomStatusList({ data, totalRooms }: RoomStatusListProps) {
  return (
    <div className="space-y-4 p-4">
      {data.map((status, index) => {
        const Icon = status.icon;
        const percentage = totalRooms > 0 ? (status.value / totalRooms) * 100 : 0;
        return (
          <div key={index} className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${status.color}20` }}
            >
              <Icon className="h-5 w-5" style={{ color: status.color }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{status.name}</span>
                <span className="text-sm font-semibold text-gray-900">{status.value} phòng</span>
              </div>
              <Progress 
                value={percentage} 
                className="h-2"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

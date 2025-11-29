import { useState, useEffect } from 'react';
import { Calendar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ReportDateRange } from '@/types/report.types';

interface ReportDateRangeFilterProps {
  dateRange: ReportDateRange;
  onDateRangeChange: (dateRange: ReportDateRange) => void;
  onRefresh?: () => void;
  showPresets?: boolean;
  loading?: boolean;
}

type PresetRange = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'thisMonth' | 'lastMonth' | 'thisQuarter' | 'thisYear' | 'custom';

const getPresetDateRange = (preset: PresetRange): ReportDateRange => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  switch (preset) {
    case 'today':
      return {
        dateFrom: today.toISOString().split('T')[0],
        dateTo: today.toISOString().split('T')[0],
      };
    case 'yesterday': {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        dateFrom: yesterday.toISOString().split('T')[0],
        dateTo: yesterday.toISOString().split('T')[0],
      };
    }
    case 'last7days': {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 6);
      return {
        dateFrom: weekAgo.toISOString().split('T')[0],
        dateTo: today.toISOString().split('T')[0],
      };
    }
    case 'last30days': {
      const monthAgo = new Date(today);
      monthAgo.setDate(monthAgo.getDate() - 29);
      return {
        dateFrom: monthAgo.toISOString().split('T')[0],
        dateTo: today.toISOString().split('T')[0],
      };
    }
    case 'thisMonth': {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      return {
        dateFrom: firstDay.toISOString().split('T')[0],
        dateTo: today.toISOString().split('T')[0],
      };
    }
    case 'lastMonth': {
      const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      return {
        dateFrom: firstDayLastMonth.toISOString().split('T')[0],
        dateTo: lastDayLastMonth.toISOString().split('T')[0],
      };
    }
    case 'thisQuarter': {
      const quarter = Math.floor(today.getMonth() / 3);
      const firstDayQuarter = new Date(today.getFullYear(), quarter * 3, 1);
      return {
        dateFrom: firstDayQuarter.toISOString().split('T')[0],
        dateTo: today.toISOString().split('T')[0],
      };
    }
    case 'thisYear': {
      const firstDayYear = new Date(today.getFullYear(), 0, 1);
      return {
        dateFrom: firstDayYear.toISOString().split('T')[0],
        dateTo: today.toISOString().split('T')[0],
      };
    }
    default: {
      // Default to today
      return {
        dateFrom: today.toISOString().split('T')[0],
        dateTo: today.toISOString().split('T')[0],
      };
    }
  }
};

export function ReportDateRangeFilter({
  dateRange,
  onDateRangeChange,
  onRefresh,
  showPresets = true,
  loading = false,
}: ReportDateRangeFilterProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetRange>('last30days');

  useEffect(() => {
    // Set initial date range to last 30 days
    if (!dateRange.dateFrom && !dateRange.dateTo) {
      const initialRange = getPresetDateRange('last30days');
      onDateRangeChange(initialRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePresetChange = (preset: PresetRange) => {
    setSelectedPreset(preset);
    if (preset !== 'custom') {
      const newRange = getPresetDateRange(preset);
      onDateRangeChange(newRange);
    }
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset('custom');
    onDateRangeChange({
      ...dateRange,
      dateFrom: e.target.value || dateRange.dateFrom,
    });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset('custom');
    onDateRangeChange({
      ...dateRange,
      dateTo: e.target.value || dateRange.dateTo,
    });
  };

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 bg-white rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 text-amber-600">
        <Calendar className="h-5 w-5" />
        <span className="font-medium text-sm">Khoảng thời gian</span>
      </div>

      {showPresets && (
        <div className="min-w-[180px]">
          <Label htmlFor="preset" className="text-xs text-gray-500 mb-1 block">
            Chọn nhanh
          </Label>
          <Select value={selectedPreset} onValueChange={(v) => handlePresetChange(v as PresetRange)}>
            <SelectTrigger id="preset" className="h-9">
              <SelectValue placeholder="Chọn khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="yesterday">Hôm qua</SelectItem>
              <SelectItem value="last7days">7 ngày qua</SelectItem>
              <SelectItem value="last30days">30 ngày qua</SelectItem>
              <SelectItem value="thisMonth">Tháng này</SelectItem>
              <SelectItem value="lastMonth">Tháng trước</SelectItem>
              <SelectItem value="thisQuarter">Quý này</SelectItem>
              <SelectItem value="thisYear">Năm nay</SelectItem>
              <SelectItem value="custom">Tuỳ chỉnh</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="min-w-[150px]">
        <Label htmlFor="dateFrom" className="text-xs text-gray-500 mb-1 block">
          Từ ngày
        </Label>
        <Input
          id="dateFrom"
          type="date"
          value={dateRange.dateFrom || ''}
          onChange={handleDateFromChange}
          className="h-9"
          max={dateRange.dateTo || undefined}
        />
      </div>

      <div className="min-w-[150px]">
        <Label htmlFor="dateTo" className="text-xs text-gray-500 mb-1 block">
          Đến ngày
        </Label>
        <Input
          id="dateTo"
          type="date"
          value={dateRange.dateTo || ''}
          onChange={handleDateToChange}
          className="h-9"
          min={dateRange.dateFrom || undefined}
        />
      </div>

      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="h-9"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      )}
    </div>
  );
}

export default ReportDateRangeFilter;

// ============================================
// Date Range Picker Component - Admin Dashboard
// ============================================

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, RefreshCw } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';

interface DateRangePickerProps {
  dateFrom: string | null;
  dateTo: string | null;
  onDateChange: (dateFrom: string | null, dateTo: string | null) => void;
  onRefresh?: () => void;
  loading?: boolean;
}

type PresetRange = 'today' | 'last7days' | 'last30days' | 'thisMonth' | 'lastMonth' | 'custom';

export default function DateRangePicker({
  dateFrom,
  dateTo,
  onDateChange,
  onRefresh,
  loading = false,
}: DateRangePickerProps) {
  const [activePreset, setActivePreset] = useState<PresetRange>('last30days');

  const presets: { key: PresetRange; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'last7days', label: 'Last 7 Days' },
    { key: 'last30days', label: 'Last 30 Days' },
    { key: 'thisMonth', label: 'This Month' },
    { key: 'lastMonth', label: 'Last Month' },
  ];

  const handlePresetClick = (preset: PresetRange) => {
    const today = new Date();
    let from: Date;
    let to: Date = today;

    switch (preset) {
      case 'today':
        from = today;
        to = today;
        break;
      case 'last7days':
        from = subDays(today, 7);
        break;
      case 'last30days':
        from = subDays(today, 30);
        break;
      case 'thisMonth':
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      case 'lastMonth': {
        const lastMonth = subMonths(today, 1);
        from = startOfMonth(lastMonth);
        to = endOfMonth(lastMonth);
        break;
      }
      default:
        return;
    }

    setActivePreset(preset);
    onDateChange(format(from, 'yyyy-MM-dd'), format(to, 'yyyy-MM-dd'));
  };

  const handleCustomDateChange = (type: 'from' | 'to', value: string) => {
    setActivePreset('custom');
    if (type === 'from') {
      onDateChange(value, dateTo);
    } else {
      onDateChange(dateFrom, value);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg border shadow-sm">
      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.key}
            variant={activePreset === preset.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick(preset.key)}
            className="text-xs"
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Custom Date Inputs */}
      <div className="flex items-center gap-2 border-l pl-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="dateFrom" className="text-xs text-gray-500">From</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom || ''}
                onChange={(e) => handleCustomDateChange('from', e.target.value)}
                className="h-8 text-sm w-36"
              />
            </div>
            <span className="text-gray-400 mt-5">–</span>
            <div className="flex flex-col gap-1">
              <Label htmlFor="dateTo" className="text-xs text-gray-500">To</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo || ''}
                onChange={(e) => handleCustomDateChange('to', e.target.value)}
                className="h-8 text-sm w-36"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="ml-auto"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      )}
    </div>
  );
}

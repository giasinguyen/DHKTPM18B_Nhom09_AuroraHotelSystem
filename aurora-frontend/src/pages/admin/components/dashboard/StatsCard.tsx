// ============================================
// Stats Card Component - Admin Dashboard
// ============================================

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  loading?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  loading = false,
  prefix = '',
  suffix = '',
  className,
}: StatsCardProps) {
  const getChangeIcon = () => {
    if (change === undefined || change === 0) {
      return <Minus className="h-3 w-3" />;
    }
    return change > 0 ? (
      <TrendingUp className="h-3 w-3" />
    ) : (
      <TrendingDown className="h-3 w-3" />
    );
  };

  const getChangeColor = () => {
    if (change === undefined || change === 0) return 'text-gray-500';
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeBgColor = () => {
    if (change === undefined || change === 0) return 'bg-gray-100';
    return change > 0 ? 'bg-green-100' : 'bg-red-100';
  };

  if (loading) {
    return (
      <Card className={cn('relative overflow-hidden', className)}>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-24" />
              <div className="h-10 w-10 bg-gray-200 rounded-lg" />
            </div>
            <div className="mt-4 h-8 bg-gray-200 rounded w-32" />
            <div className="mt-2 h-4 bg-gray-200 rounded w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('relative overflow-hidden hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className={cn('p-2 rounded-lg', iconBgColor)}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold text-gray-900">
            {prefix}
            {typeof value === 'number' ? value.toLocaleString() : value}
            {suffix}
          </h3>

          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                  getChangeBgColor(),
                  getChangeColor()
                )}
              >
                {getChangeIcon()}
                {Math.abs(change).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500">{changeLabel}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

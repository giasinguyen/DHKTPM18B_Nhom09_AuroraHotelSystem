import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label?: string;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}

const variantStyles = {
  default: 'bg-white border-gray-200',
  primary: 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200',
  success: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
  warning: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
  danger: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
  info: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
};

const iconStyles = {
  default: 'bg-gray-100 text-gray-600',
  primary: 'bg-amber-200 text-amber-700',
  success: 'bg-green-200 text-green-700',
  warning: 'bg-yellow-200 text-yellow-700',
  danger: 'bg-red-200 text-red-700',
  info: 'bg-blue-200 text-blue-700',
};

export function ReportStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  loading = false,
  className,
  children,
}: ReportStatCardProps) {
  const renderTrend = () => {
    if (!trend) return null;

    const isPositive = trend.value > 0;
    const isNeutral = trend.value === 0;
    const TrendIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;
    const trendColor = isNeutral
      ? 'text-gray-500'
      : isPositive
      ? 'text-green-600'
      : 'text-red-600';

    return (
      <div className={cn('flex items-center gap-1 text-sm', trendColor)}>
        <TrendIcon className="h-4 w-4" />
        <span className="font-medium">
          {isPositive ? '+' : ''}
          {trend.value.toFixed(1)}%
        </span>
        {trend.label && <span className="text-gray-500 text-xs">{trend.label}</span>}
      </div>
    );
  };

  if (loading) {
    return (
      <div
        className={cn(
          'p-5 rounded-xl border shadow-sm animate-pulse',
          variantStyles[variant],
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-32" />
            <div className="h-3 bg-gray-200 rounded w-20" />
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'p-5 rounded-xl border shadow-sm transition-all hover:shadow-md',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {renderTrend()}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-lg', iconStyles[variant])}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default ReportStatCard;

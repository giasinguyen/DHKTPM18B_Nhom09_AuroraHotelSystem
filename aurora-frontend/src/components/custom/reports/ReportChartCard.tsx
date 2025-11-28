import type { ReactNode } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ReportChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  }[];
  headerRight?: ReactNode;
  loading?: boolean;
  className?: string;
  minHeight?: string;
}

export function ReportChartCard({
  title,
  subtitle,
  children,
  actions,
  headerRight,
  loading = false,
  className,
  minHeight = '300px',
}: ReportChartCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border shadow-sm overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {headerRight}
          {actions && actions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {actions.map((action, index) => (
                  <DropdownMenuItem key={index} onClick={action.onClick}>
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4" style={{ minHeight }}>
        {loading ? (
          <div className="flex items-center justify-center h-full" style={{ minHeight }}>
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
              <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default ReportChartCard;

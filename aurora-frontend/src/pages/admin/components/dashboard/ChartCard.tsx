// ============================================
// Chart Card Wrapper Component
// ============================================

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  action?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function ChartCard({
  title,
  subtitle,
  children,
  loading = false,
  error = null,
  action,
  className,
  contentClassName,
}: ChartCardProps) {
  return (
    <Card className={cn('relative', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className={cn('pt-0', contentClassName)}>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

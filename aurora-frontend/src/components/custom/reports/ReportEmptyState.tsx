import { FileSearch, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ReportEmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function ReportEmptyState({
  title = 'Không có dữ liệu',
  description = 'Không tìm thấy dữ liệu trong khoảng thời gian đã chọn',
  icon,
  action,
  className,
}: ReportEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        {icon || <FileSearch className="h-8 w-8 text-gray-400" />}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          <RefreshCw className="h-4 w-4 mr-2" />
          {action.label}
        </Button>
      )}
    </div>
  );
}

export default ReportEmptyState;

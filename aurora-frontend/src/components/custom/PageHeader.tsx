import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  onAdd?: () => void;
  addButtonText?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  onAdd,
  addButtonText = 'Thêm mới',
  onRefresh,
  isLoading = false,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {children}
        
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
            <RefreshCw className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')} />
            Làm mới
          </Button>
        )}
        
        {onAdd && (
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            {addButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default PageHeader;

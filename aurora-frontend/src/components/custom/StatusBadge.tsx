import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';

interface StatusBadgeProps {
  label: string;
  variant: BadgeVariant;
  className?: string;
}

// Extended Badge with additional variants
export function StatusBadge({ label, variant, className }: StatusBadgeProps) {
  const variantClasses: Record<BadgeVariant, string> = {
    default: '',
    secondary: '',
    destructive: '',
    outline: '',
    success: 'bg-green-500 text-white hover:bg-green-500/90 border-transparent',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-500/90 border-transparent',
  };

  const baseVariant = variant === 'success' || variant === 'warning' ? 'default' : variant;

  return (
    <Badge
      variant={baseVariant}
      className={cn(variantClasses[variant], className)}
    >
      {label}
    </Badge>
  );
}

export default StatusBadge;

import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SummaryCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle: string;
  variant: 'green' | 'amber' | 'blue' | 'red' | 'purple';
}

const variantClasses = {
  green: {
    card: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    iconBg: 'bg-green-200',
    icon: 'text-green-700',
    title: 'text-green-700',
    value: 'text-green-900',
    subtitle: 'text-green-600',
  },
  amber: {
    card: 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200',
    iconBg: 'bg-amber-200',
    icon: 'text-amber-700',
    title: 'text-amber-700',
    value: 'text-amber-900',
    subtitle: 'text-amber-600',
  },
  blue: {
    card: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    iconBg: 'bg-blue-200',
    icon: 'text-blue-700',
    title: 'text-blue-700',
    value: 'text-blue-900',
    subtitle: 'text-blue-600',
  },
  red: {
    card: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
    iconBg: 'bg-red-200',
    icon: 'text-red-700',
    title: 'text-red-700',
    value: 'text-red-900',
    subtitle: 'text-red-600',
  },
  purple: {
    card: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    iconBg: 'bg-purple-200',
    icon: 'text-purple-700',
    title: 'text-purple-700',
    value: 'text-purple-900',
    subtitle: 'text-purple-600',
  },
};

export function SummaryCard({ icon: Icon, title, value, subtitle, variant }: SummaryCardProps) {
  const classes = variantClasses[variant];

  return (
    <Card className={classes.card}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={`${classes.iconBg} p-3 rounded-lg`}>
            <Icon className={`h-6 w-6 ${classes.icon}`} />
          </div>
          <div>
            <p className={`text-sm ${classes.title}`}>{title}</p>
            <p className={`text-2xl font-bold ${classes.value}`}>{value}</p>
            <p className={`text-xs ${classes.subtitle}`}>{subtitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

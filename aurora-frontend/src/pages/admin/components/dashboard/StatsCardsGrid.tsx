// ============================================
// Stats Cards Grid - Admin Dashboard
// ============================================

import {
  DollarSign,
  CalendarCheck,
  BedDouble,
  Users,
  TrendingUp,
} from 'lucide-react';
import StatsCard from './StatsCard';
import type { DashboardOverview } from '@/types/dashboard.types';

interface StatsCardsGridProps {
  data: DashboardOverview | null;
  loading?: boolean;
}

export default function StatsCardsGrid({ data, loading = false }: StatsCardsGridProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const statsCards = [
    {
      title: 'Total Revenue',
      value: data ? formatCurrency(data.totalRevenue) : '0',
      change: data?.revenueGrowthPercent,
      icon: <DollarSign className="h-5 w-5" />,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      prefix: '$',
    },
    {
      title: 'Total Bookings',
      value: data?.totalBookings ?? 0,
      icon: <CalendarCheck className="h-5 w-5" />,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Occupancy Rate',
      value: data ? `${data.occupancyRate.toFixed(1)}` : '0',
      icon: <BedDouble className="h-5 w-5" />,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      suffix: '%',
    },
    {
      title: 'New Customers',
      value: data?.newCustomers ?? 0,
      icon: <Users className="h-5 w-5" />,
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Avg Booking Value',
      value: data ? formatCurrency(data.averageBookingValue) : '0',
      icon: <TrendingUp className="h-5 w-5" />,
      iconBgColor: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      prefix: '$',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {statsCards.map((card, index) => (
        <StatsCard
          key={index}
          title={card.title}
          value={card.value}
          change={card.change}
          icon={card.icon}
          iconBgColor={card.iconBgColor}
          iconColor={card.iconColor}
          loading={loading}
          prefix={card.prefix}
          suffix={card.suffix}
        />
      ))}
    </div>
  );
}

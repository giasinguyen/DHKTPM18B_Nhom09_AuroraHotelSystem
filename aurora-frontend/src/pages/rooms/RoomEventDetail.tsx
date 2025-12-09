import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Edit, Calendar, Building2, TrendingUp, TrendingDown } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

import type { Event } from '@/types/event.types';
import { EVENT_STATUS_CONFIG, PRICE_ADJUSTMENT_TYPE_LABELS, PRICE_ADJUSTMENT_DIRECTION_LABELS, PRICE_ADJUSTMENT_TARGET_LABELS } from '@/types/event.types';
import { roomEventService } from '@/services/roomEventService';

export default function RoomEventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Detect role prefix
  const currentPath = window.location.pathname;
  const rolePrefix = currentPath.startsWith('/admin')
    ? '/admin'
    : currentPath.startsWith('/manager')
    ? '/manager'
    : '';

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      setIsLoading(true);
      const eventData = await roomEventService.getEventById(id!);
      setEvent(eventData);
    } catch (error: unknown) {
      console.error('Failed to load event:', error);
      toast.error('Không thể tải thông tin sự kiện');
      navigate(`${rolePrefix}/room-events`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`${rolePrefix}/room-events`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Sự kiện không tồn tại</h1>
        </div>
      </div>
    );
  }

  const statusConfig = EVENT_STATUS_CONFIG[event.status];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`${rolePrefix}/room-events`)}
            className="rounded-full hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              {event.name}
            </h1>
            <p className="text-muted-foreground">
              Chi tiết sự kiện điều chỉnh giá phòng
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusConfig.variant as any}>
            {statusConfig.label}
          </Badge>
          <Button
            onClick={() => navigate(`${rolePrefix}/room-events/upsert?id=${event.id}`)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Edit className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tên sự kiện</label>
              <p className="text-base font-semibold">{event.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Trạng thái</label>
              <div className="mt-1">
                <Badge variant={statusConfig.variant as any}>
                  {statusConfig.label}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Ngày bắt đầu
              </label>
              <p className="text-base">{formatDate(event.startDate)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Ngày kết thúc
              </label>
              <p className="text-base">{formatDate(event.endDate)}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Chi nhánh
              </label>
              <p className="text-base">{event.branchName || event.branchId}</p>
            </div>
            {event.description && (
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Mô tả</label>
                <p className="text-base whitespace-pre-wrap">{event.description}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Price Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle>Điều chỉnh giá</CardTitle>
        </CardHeader>
        <CardContent>
          {event.priceAdjustments && event.priceAdjustments.length > 0 ? (
            <div className="space-y-4">
              {event.priceAdjustments.map((adjustment, index) => (
                <Card key={adjustment.id || index} className="bg-slate-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Điều chỉnh #{index + 1}</h3>
                      {adjustment.adjustmentDirection === 'INCREASE' ? (
                        <Badge variant="success">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Tăng giá
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <TrendingDown className="h-3 w-3 mr-1" />
                          Giảm giá
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Hướng điều chỉnh</label>
                        <p className="text-base">
                          {PRICE_ADJUSTMENT_DIRECTION_LABELS[adjustment.adjustmentDirection]}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Loại điều chỉnh</label>
                        <p className="text-base">
                          {PRICE_ADJUSTMENT_TYPE_LABELS[adjustment.adjustmentType]}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Giá trị điều chỉnh</label>
                        <p className="text-base font-semibold">
                          {adjustment.adjustmentType === 'PERCENTAGE'
                            ? `${adjustment.adjustmentValue}%`
                            : `${adjustment.adjustmentValue.toLocaleString('vi-VN')} ₫`}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Áp dụng cho</label>
                        <p className="text-base">
                          {PRICE_ADJUSTMENT_TARGET_LABELS[adjustment.targetType]}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Đối tượng</label>
                        <p className="text-base font-semibold">
                          {adjustment.targetName || adjustment.targetId}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Chưa có điều chỉnh giá nào</p>
          )}
        </CardContent>
      </Card>

      {/* Metadata */}
      {(event.createdAt || event.updatedAt) && (
        <Card>
          <CardHeader>
            <CardTitle>Thông tin hệ thống</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              {event.createdAt && (
                <div>
                  <label className="font-medium">Ngày tạo:</label>
                  <p>{formatDate(event.createdAt)}</p>
                </div>
              )}
              {event.updatedAt && (
                <div>
                  <label className="font-medium">Ngày cập nhật:</label>
                  <p>{formatDate(event.updatedAt)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


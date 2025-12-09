import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, MoreHorizontal, Edit, Trash2, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  PageHeader,
  DataTable,
  Pagination,
  SearchFilter,
  StatusBadge,
  ConfirmDialog,
  type Column,
} from '@/components/custom';

import type { Event, EventStatus } from '@/types/event.types';
import { EVENT_STATUS_CONFIG } from '@/types/event.types';
import { roomEventService } from '@/services/roomEventService';

export default function RoomEventList() {
  const navigate = useNavigate();

  // Detect role prefix
  const currentPath = window.location.pathname;
  const rolePrefix = currentPath.startsWith('/admin')
    ? '/admin'
    : currentPath.startsWith('/manager')
    ? '/manager'
    : '';

  // State
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<EventStatus | 'ALL'>('ALL');

  // Delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  // Load events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const params: any = {
          page: currentPage - 1,
          size: pageSize,
          sortBy: 'startDate',
          sortDirection: 'ASC',
        };

        // Apply status filter
        if (statusFilter !== 'ALL') {
          params.status = statusFilter;
        }

        const response = await roomEventService.searchEvents(params);
        setEvents(response.content);
        setTotalElements(response.totalElements);
      } catch (error: unknown) {
        console.error('Failed to fetch events:', error);
        toast.error('Không thể tải danh sách sự kiện');
        setEvents([]);
        setTotalElements(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage, pageSize, statusFilter]);

  // Refresh handler
  const handleRefresh = () => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const params: any = {
          page: currentPage - 1,
          size: pageSize,
          sortBy: 'startDate',
          sortDirection: 'ASC',
        };

        if (statusFilter !== 'ALL') {
          params.status = statusFilter;
        }

        const response = await roomEventService.searchEvents(params);
        setEvents(response.content);
        setTotalElements(response.totalElements);
        toast.success('Đã làm mới danh sách');
      } catch (error: unknown) {
        console.error('Failed to refresh events:', error);
        toast.error('Không thể làm mới danh sách');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getAdjustmentSummary = (event: Event) => {
    const count = event.priceAdjustments.length;
    if (count === 0) return 'Chưa cấu hình';
    
    const increaseCount = event.priceAdjustments.filter(adj => adj.adjustmentDirection === 'INCREASE').length;
    const decreaseCount = event.priceAdjustments.filter(adj => adj.adjustmentDirection === 'DECREASE').length;
    
    if (increaseCount > 0 && decreaseCount > 0) {
      return `${increaseCount} tăng, ${decreaseCount} giảm`;
    } else if (increaseCount > 0) {
      return `${increaseCount} tăng giá`;
    } else {
      return `${decreaseCount} giảm giá`;
    }
  };

  // Table columns
  const columns: Column<Event>[] = [
    {
      key: 'name',
      header: 'Tên sự kiện',
      cell: (event) => (
        <div>
          <p className="font-medium">{event.name}</p>
          {event.description && (
            <p className="text-sm text-gray-500 line-clamp-1">{event.description}</p>
          )}
        </div>
      ),
    },
    {
      key: 'dates',
      header: 'Thời gian',
      cell: (event) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">
            {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </span>
        </div>
      ),
    },
    {
      key: 'branch',
      header: 'Chi nhánh',
      cell: (event) => <span className="text-sm">{event.branchName}</span>,
    },
    {
      key: 'adjustments',
      header: 'Điều chỉnh giá',
      cell: (event) => {
        const hasIncrease = event.priceAdjustments.some(adj => adj.adjustmentDirection === 'INCREASE');
        const hasDecrease = event.priceAdjustments.some(adj => adj.adjustmentDirection === 'DECREASE');
        
        return (
          <div className="flex items-center gap-2">
            {hasIncrease && hasDecrease ? (
              <div className="flex gap-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <TrendingDown className="h-4 w-4 text-red-600" />
              </div>
            ) : hasIncrease ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span className="text-sm">{getAdjustmentSummary(event)}</span>
          </div>
        );
      },
    },
    {
      key: 'status',
      header: 'Trạng thái',
      cell: (event) => {
        const statusConfig = EVENT_STATUS_CONFIG[event.status];
        return (
          <StatusBadge
            label={statusConfig.label}
            variant={statusConfig.variant}
          />
        );
      },
    },
    {
      key: 'actions',
      header: 'Thao tác',
      cell: (event) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate(`${rolePrefix}/room-events/${event.id}`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`${rolePrefix}/room-events/upsert?id=${event.id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </DropdownMenuItem>
            {event.status === 'SCHEDULED' && (
              <DropdownMenuItem
                onClick={() => {
                  setEventToDelete(event);
                  setDeleteDialogOpen(true);
                }}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!eventToDelete) return;

    try {
      await roomEventService.deleteEvent(eventToDelete.id);
      toast.success('Đã xóa sự kiện thành công');
      
      // Refresh list
      const params: any = {
        page: currentPage - 1,
        size: pageSize,
        sortBy: 'startDate',
        sortDirection: 'ASC',
      };
      if (statusFilter !== 'ALL') {
        params.status = statusFilter;
      }
      const response = await roomEventService.searchEvents(params);
      setEvents(response.content);
      setTotalElements(response.totalElements);
      
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    } catch (error: unknown) {
      console.error('Failed to delete event:', error);
      const errorMessage = 
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 
        'Không thể xóa sự kiện';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý sự kiện giá"
        description="Quản lý điều chỉnh giá phòng theo lễ tết và sự kiện đặc biệt"
        onAdd={() => navigate(`${rolePrefix}/room-events/upsert`)}
        addButtonText="Tạo sự kiện mới"
        onRefresh={handleRefresh}
        isLoading={isLoading}
      />

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchFilter
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Tìm kiếm sự kiện..."
              />
            </div>
            <div className="w-full sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as EventStatus | 'ALL')}
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="SCHEDULED">Đã lên lịch</option>
                <option value="ACTIVE">Đang diễn ra</option>
                <option value="COMPLETED">Đã kết thúc</option>
                <option value="CANCELLED">Đã hủy</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <DataTable<Event>
        columns={columns}
        data={events}
        keyExtractor={(event) => event.id}
        isLoading={isLoading}
        emptyMessage="Chưa có sự kiện nào"
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalElements={totalElements}
        totalPages={Math.ceil(totalElements / pageSize)}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Xác nhận xóa sự kiện"
        description={`Bạn có chắc chắn muốn xóa sự kiện "${eventToDelete?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDelete}
        confirmText="Xóa"
        cancelText="Hủy"
        variant="destructive"
      />
    </div>
  );
}

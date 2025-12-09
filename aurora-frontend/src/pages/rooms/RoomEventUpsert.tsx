import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Trash2, Save, X } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type {
  Event,
  PriceAdjustment,
  PriceAdjustmentType,
  PriceAdjustmentDirection,
  PriceAdjustmentTarget,
} from '@/types/event.types';
import { roomEventService, roomEventHelperService } from '@/services/roomEventService';

export default function RoomEventUpsert() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  const isEditMode = !!eventId;

  // Detect role prefix
  const currentPath = window.location.pathname;
  const rolePrefix = currentPath.startsWith('/admin')
    ? '/admin'
    : currentPath.startsWith('/manager')
    ? '/manager'
    : '';

  // Form state
  const [formData, setFormData] = useState<Partial<Event>>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'SCHEDULED',
    branchId: '',
    priceAdjustments: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Dropdown options (loaded from API)
  const [branches, setBranches] = useState<Array<{ id: string; name: string }>>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [roomTypes, setRoomTypes] = useState<Array<{ id: string; name: string }>>([]);
  const [rooms, setRooms] = useState<Array<{ id: string; name: string }>>([]);

  // Load dropdown options
  useEffect(() => {
    const loadDropdownOptions = async () => {
      try {
        const [branchesData, categoriesData, roomTypesData, roomsData] = await Promise.all([
          roomEventHelperService.getBranches(),
          roomEventHelperService.getCategories(),
          roomEventHelperService.getRoomTypes(),
          roomEventHelperService.getRooms(),
        ]);

        setBranches(branchesData);
        setCategories(categoriesData);
        setRoomTypes(roomTypesData);
        setRooms(roomsData);
      } catch (error: unknown) {
        console.error('Failed to load dropdown options:', error);
        toast.error('Không thể tải dữ liệu dropdown');
      }
    };

    loadDropdownOptions();
  }, []);

  // Load categories, room types, rooms when branch changes
  useEffect(() => {
    if (!formData.branchId) return;

    const loadBranchData = async () => {
      try {
        const [categoriesData, roomTypesData, roomsData] = await Promise.all([
          roomEventHelperService.getCategories(formData.branchId),
          roomEventHelperService.getRoomTypes(formData.branchId),
          roomEventHelperService.getRooms(formData.branchId),
        ]);

        setCategories(categoriesData);
        setRoomTypes(roomTypesData);
        setRooms(roomsData);
      } catch (error: unknown) {
        console.error('Failed to load branch data:', error);
        toast.error('Không thể tải dữ liệu chi nhánh');
      }
    };

    loadBranchData();
  }, [formData.branchId]);

  // Load event data in edit mode
  useEffect(() => {
    if (isEditMode && eventId) {
      const loadEventData = async () => {
        try {
          setIsLoading(true);
          const event = await roomEventService.getEventById(eventId);
          
          setFormData({
            id: event.id,
            name: event.name,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            status: event.status,
            branchId: event.branchId,
            priceAdjustments: event.priceAdjustments || [],
          });

          // Load branch-specific data
          if (event.branchId) {
            const [categoriesData, roomTypesData, roomsData] = await Promise.all([
              roomEventHelperService.getCategories(event.branchId),
              roomEventHelperService.getRoomTypes(event.branchId),
              roomEventHelperService.getRooms(event.branchId),
            ]);

            setCategories(categoriesData);
            setRoomTypes(roomTypesData);
            setRooms(roomsData);
          }
        } catch (error: unknown) {
          console.error('Failed to load event:', error);
          toast.error('Không thể tải thông tin sự kiện');
          navigate(-1);
        } finally {
          setIsLoading(false);
        }
      };

      loadEventData();
    }
  }, [eventId, isEditMode, navigate]);

  const handleInputChange = (field: keyof Event, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAdjustment = () => {
    const newAdjustment: Partial<PriceAdjustment> = {
      id: `adj-${Date.now()}`,
      adjustmentType: 'PERCENTAGE',
      adjustmentDirection: 'INCREASE',
      adjustmentValue: 0,
      targetType: 'CATEGORY',
      targetId: '',
      targetName: '',
    };

    setFormData((prev) => ({
      ...prev,
      priceAdjustments: [...(prev.priceAdjustments || []), newAdjustment as PriceAdjustment],
    }));
  };

  const handleRemoveAdjustment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      priceAdjustments: prev.priceAdjustments?.filter((_, i) => i !== index),
    }));
  };

  const handleAdjustmentChange = (
    index: number,
    field: keyof PriceAdjustment,
    value: unknown
  ) => {
    setFormData((prev) => ({
      ...prev,
      priceAdjustments: prev.priceAdjustments?.map((adj, i) =>
        i === index ? { ...adj, [field]: value } : adj
      ),
    }));
  };

  const getTargetOptions = (targetType: PriceAdjustmentTarget) => {
    switch (targetType) {
      case 'CATEGORY':
        return categories;
      case 'ROOM_TYPE':
        return roomTypes;
      case 'SPECIFIC_ROOM':
        return rooms;
      default:
        return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name?.trim()) {
      toast.error('Vui lòng nhập tên sự kiện');
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error('Vui lòng chọn thời gian bắt đầu và kết thúc');
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.error('Ngày kết thúc phải sau ngày bắt đầu');
      return;
    }

    if (!formData.branchId) {
      toast.error('Vui lòng chọn chi nhánh');
      return;
    }

    if (!formData.priceAdjustments || formData.priceAdjustments.length === 0) {
      toast.error('Vui lòng thêm ít nhất 1 điều chỉnh giá');
      return;
    }

    // Validate each adjustment
    for (const adj of formData.priceAdjustments) {
      if (!adj.targetId) {
        toast.error('Vui lòng chọn đối tượng cho tất cả các điều chỉnh giá');
        return;
      }
      if (adj.adjustmentValue <= 0) {
        toast.error('Giá trị điều chỉnh phải lớn hơn 0');
        return;
      }
    }

    setIsSaving(true);

    try {
      // Prepare price adjustments (remove id for new adjustments)
      const priceAdjustments = formData.priceAdjustments!.map((adj) => ({
        adjustmentType: adj.adjustmentType,
        adjustmentDirection: adj.adjustmentDirection,
        adjustmentValue: adj.adjustmentValue,
        targetType: adj.targetType,
        targetId: adj.targetId,
        targetName: adj.targetName,
      }));

      if (isEditMode && eventId) {
        // Update existing event
        await roomEventService.updateEvent(eventId, {
          name: formData.name,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          branchId: formData.branchId,
          priceAdjustments,
        });
        toast.success('Đã cập nhật sự kiện');
      } else {
        // Create new event
        await roomEventService.createEvent({
          name: formData.name!,
          description: formData.description,
          startDate: formData.startDate!,
          endDate: formData.endDate!,
          branchId: formData.branchId!,
          priceAdjustments,
        });
        toast.success('Đã tạo sự kiện mới');
      }

      navigate(`${rolePrefix}/room-events`);
    } catch (error: unknown) {
      console.error('Failed to save event:', error);
      const errorMessage = 
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 
        'Có lỗi xảy ra, vui lòng thử lại';
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {isEditMode ? 'Chỉnh sửa sự kiện' : 'Tạo sự kiện mới'}
          </h1>
          <p className="text-gray-500 mt-1">
            Cấu hình điều chỉnh giá phòng theo lễ tết và sự kiện
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate(`${rolePrefix}/room-events`)}>
          <X className="h-4 w-4 mr-2" />
          Hủy
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">
                Tên sự kiện <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="VD: Tết Nguyên Đán 2026"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Mô tả chi tiết về sự kiện..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">
                  Ngày bắt đầu <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="endDate">
                  Ngày kết thúc <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="branchId">
                Chi nhánh <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.branchId}
                onValueChange={(value) => handleInputChange('branchId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn chi nhánh" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Price Adjustments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Điều chỉnh giá</CardTitle>
              <Button type="button" onClick={handleAddAdjustment} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Thêm điều chỉnh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.priceAdjustments && formData.priceAdjustments.length > 0 ? (
              formData.priceAdjustments.map((adjustment, index) => (
                <div key={adjustment.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Điều chỉnh #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAdjustment(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Hướng điều chỉnh</Label>
                      <Select
                        value={adjustment.adjustmentDirection}
                        onValueChange={(value) =>
                          handleAdjustmentChange(
                            index,
                            'adjustmentDirection',
                            value as PriceAdjustmentDirection
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INCREASE">
                            <span className="flex items-center gap-2">
                              <span className="text-green-600">↑</span> Tăng giá
                            </span>
                          </SelectItem>
                          <SelectItem value="DECREASE">
                            <span className="flex items-center gap-2">
                              <span className="text-red-600">↓</span> Giảm giá
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Loại điều chỉnh</Label>
                      <Select
                        value={adjustment.adjustmentType}
                        onValueChange={(value) =>
                          handleAdjustmentChange(
                            index,
                            'adjustmentType',
                            value as PriceAdjustmentType
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENTAGE">Phần trăm (%)</SelectItem>
                          <SelectItem value="FIXED_AMOUNT">Số tiền cố định (VNĐ)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Giá trị điều chỉnh</Label>
                      <Input
                        type="number"
                        min="0"
                        step={adjustment.adjustmentType === 'PERCENTAGE' ? '1' : '1000'}
                        value={adjustment.adjustmentValue}
                        onChange={(e) =>
                          handleAdjustmentChange(
                            index,
                            'adjustmentValue',
                            Number(e.target.value)
                          )
                        }
                        placeholder={
                          adjustment.adjustmentType === 'PERCENTAGE'
                            ? 'VD: 50'
                            : 'VD: 500000'
                        }
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {adjustment.adjustmentDirection === 'INCREASE' 
                          ? (adjustment.adjustmentType === 'PERCENTAGE'
                              ? 'Tăng giá theo phần trăm'
                              : 'Tăng giá cố định theo VNĐ')
                          : (adjustment.adjustmentType === 'PERCENTAGE'
                              ? 'Giảm giá theo phần trăm'
                              : 'Giảm giá cố định theo VNĐ')}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Áp dụng cho</Label>
                      <Select
                        value={adjustment.targetType}
                        onValueChange={(value) => {
                          handleAdjustmentChange(
                            index,
                            'targetType',
                            value as PriceAdjustmentTarget
                          );
                          // Reset target selection when type changes
                          handleAdjustmentChange(index, 'targetId', '');
                          handleAdjustmentChange(index, 'targetName', '');
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CATEGORY">Danh mục phòng</SelectItem>
                          <SelectItem value="ROOM_TYPE">Loại phòng</SelectItem>
                          <SelectItem value="SPECIFIC_ROOM">Phòng cụ thể</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Chọn đối tượng</Label>
                      <Select
                        value={adjustment.targetId}
                        onValueChange={(value) => {
                          const target = getTargetOptions(adjustment.targetType).find(
                            (t) => t.id === value
                          );
                          handleAdjustmentChange(index, 'targetId', value);
                          handleAdjustmentChange(index, 'targetName', target?.name || '');
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn đối tượng" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTargetOptions(adjustment.targetType).map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Chưa có điều chỉnh giá nào. Nhấn "Thêm điều chỉnh" để bắt đầu.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`${rolePrefix}/room-events`)}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Đang lưu...' : isEditMode ? 'Cập nhật' : 'Tạo sự kiện'}
          </Button>
        </div>
      </form>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Plus, Minus, Clock, Users, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/exportUtils";
import fallbackImage from "@/assets/images/commons/fallback.png";
import { serviceCategoryApi } from "@/services/serviceCategoryApi";
import { serviceApi } from "@/services/serviceApi";
import type { ServiceCategory } from "@/types/serviceCategory.types";
import type { HotelService } from "@/types/service.types";
import type { RoomExtras } from "@/pages/landing/checkout";

const FALLBACK_IMAGE = fallbackImage;

interface ServiceSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomId: string;
  roomExtras: RoomExtras;
  branchId: string;
  onSave: (roomId: string, extras: RoomExtras) => void;
}

export default function ServiceSelectionModal({
  open,
  onOpenChange,
  roomId,
  roomExtras,
  branchId,
  onSave,
}: ServiceSelectionModalProps) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<HotelService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [localExtras, setLocalExtras] = useState<RoomExtras>(roomExtras);

  // Fetch categories and services on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔄 ServiceSelectionModal - Fetching data for branchId:", branchId);
        setLoading(true);
        
        // Fetch categories by branch
        const categoriesRes = await serviceCategoryApi.getByBranch(branchId);
        console.log("📦 Categories response:", categoriesRes);
        if (categoriesRes.result) {
          const activeCategories = categoriesRes.result.filter(cat => cat.active);
          console.log("✅ Active categories:", activeCategories.length);
          setCategories(activeCategories);
        }

        // Fetch all services by branch
        const servicesRes = await serviceApi.search({
          hotelId: branchId,
          page: 0,
          size: 1000,
        });
        console.log("📦 Services response:", servicesRes);
        if (servicesRes.result?.content) {
          const activeServices = servicesRes.result.content.filter((s) => s.active !== false);
          console.log("✅ Active services:", activeServices.length);
          setServices(activeServices);
        }
      } catch (error) {
        console.error("❌ Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open && branchId) {
      console.log("🚀 ServiceSelectionModal - Starting fetch, open:", open, "branchId:", branchId);
      fetchData();
      setLocalExtras(roomExtras);
    } else {
      console.log("⚠️ ServiceSelectionModal - Not fetching, open:", open, "branchId:", branchId);
    }
  }, [open, branchId, roomExtras]);

  // Reset selected category when modal opens
  useEffect(() => {
    if (open) {
      setSelectedCategoryId(null);
    }
  }, [open]);

  const handleServiceToggle = (service: HotelService) => {
    const existingIndex = localExtras.services.findIndex(
      (s) => s.serviceId === service.id
    );

    const updatedServices = [...localExtras.services];

    if (existingIndex >= 0) {
      // Remove service
      updatedServices.splice(existingIndex, 1);
    } else {
      // Add service with quantity 1
      updatedServices.push({
        serviceId: service.id,
        serviceName: service.name,
        price: service.basePrice,
        quantity: 1,
      });
    }

    setLocalExtras({
      ...localExtras,
      services: updatedServices,
    });
  };

  const handleQuantityChange = (serviceId: string, delta: number) => {
    const updatedServices = localExtras.services.map((s) => {
      if (s.serviceId === serviceId) {
        const newQuantity = Math.max(1, s.quantity + delta);
        return { ...s, quantity: newQuantity };
      }
      return s;
    });

    setLocalExtras({
      ...localExtras,
      services: updatedServices,
    });
  };

  const handleSave = () => {
    onSave(roomId, localExtras);
    onOpenChange(false);
  };

  const isServiceSelected = (serviceId: string) => {
    return localExtras.services.some((s) => s.serviceId === serviceId);
  };

  const getServiceQuantity = (serviceId: string) => {
    const service = localExtras.services.find((s) => s.serviceId === serviceId);
    return service?.quantity || 0;
  };

  // Filter services by selected category
  const filteredServices = selectedCategoryId
    ? services.filter((s) => s.categoryId === selectedCategoryId)
    : services;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="sticky top-0 p-6 pb-3 bg-white border-b z-10">
          <DialogTitle className="text-xl lg:text-2xl">
            Chọn dịch vụ cho phòng
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Danh mục dịch vụ</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategoryId === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategoryId(null)}
                >
                  Tất cả
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategoryId === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategoryId(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Services List */}
            <div className="space-y-3">
              {filteredServices.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  Không có dịch vụ nào khả dụng
                </p>
              ) : (
                filteredServices.map((service) => {
                  const isSelected = isServiceSelected(service.id);
                  const quantity = getServiceQuantity(service.id);

                  return (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => handleServiceToggle(service)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {/* Service Image */}
                          <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={service.images?.[0] || FALLBACK_IMAGE}
                              alt={service.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = FALLBACK_IMAGE;
                              }}
                            />
                          </div>

                          {/* Service Info */}
                          <div className="grow">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">{service.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {service.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {service.durationMinutes && (
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {service.durationMinutes} phút
                                    </Badge>
                                  )}
                                  {service.maxCapacityPerSlot && (
                                    <Badge variant="outline" className="text-xs">
                                      <Users className="h-3 w-3 mr-1" />
                                      {service.maxCapacityPerSlot} người
                                    </Badge>
                                  )}
                                  {service.operatingHours && (
                                    <Badge variant="outline" className="text-xs">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      {service.operatingHours}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-primary">
                                  {formatCurrency(service.basePrice)}
                                </p>
                                {service.unit && (
                                  <p className="text-xs text-gray-500">
                                    /{service.unit}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Quantity Selector (only if selected) */}
                            {isSelected && (
                              <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                                <span className="text-sm">Số lượng:</span>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuantityChange(service.id, -1);
                                    }}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-12 text-center font-semibold">
                                    {quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuantityChange(service.id, 1);
                                    }}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="ml-auto">
                                  <p className="text-sm font-semibold">
                                    Tổng:{" "}
                                    {formatCurrency(service.basePrice * quantity)}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Footer with Save button */}
        <div className="sticky bottom-0 p-6 bg-white border-t flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Lưu ({localExtras.services.length} dịch vụ)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


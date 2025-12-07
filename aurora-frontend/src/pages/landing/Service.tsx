import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoHero from "@/components/custom/VideoHero";
import { serviceCategoryApi } from '@/services/serviceCategoryApi';
import { serviceApi } from '@/services/serviceApi';
import type { ServiceCategory } from '@/types/serviceCategory.types';
import type { HotelService } from '@/types/service.types';
import { toast } from 'sonner';
import { Loader2, Sparkles, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import fallbackImage from '@/assets/images/commons/fallback.png';

export default function ServicePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [servicesByCategory, setServicesByCategory] = useState<Record<string, HotelService[]>>({});
  const [loading, setLoading] = useState(true);
  
  // Get branchId from localStorage
  const branchId = localStorage.getItem('branchId') || 'branch-hcm-001';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all active categories
        const categoriesRes = await serviceCategoryApi.getByBranch(branchId);
        const activeCategories = (categoriesRes.result || [])
          .filter(cat => cat.active)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setCategories(activeCategories);
        
        // Fetch services for each category
        const servicesMap: Record<string, HotelService[]> = {};
        
        await Promise.all(
          activeCategories.map(async (category) => {
            try {
              const servicesRes = await serviceApi.search({
                hotelId: branchId,
                categoryId: category.id,
                page: 0,
                size: 100,
              });
              
              const activeServices = (servicesRes.result?.content || []).filter(
                service => service.active !== false
              );
              servicesMap[category.id] = activeServices;
            } catch (error) {
              console.error(`Failed to fetch services for category ${category.id}:`, error);
              servicesMap[category.id] = [];
            }
          })
        );
        
        setServicesByCategory(servicesMap);
      } catch (error) {
        console.error('Failed to fetch service data:', error);
        toast.error('Không thể tải thông tin dịch vụ');
      } finally {
        setLoading(false);
      }
    };
    
    if (branchId) {
      fetchData();
    }
  }, [branchId]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src !== fallbackImage) {
      img.src = fallbackImage;
    }
  };

  const handleBookNow = () => {
    navigate('/booking');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <VideoHero 
        title="Dịch vụ"
        subtitle="Trải nghiệm những dịch vụ đẳng cấp thế giới"
      />

      {/* Services by Category */}
      {categories.length === 0 ? (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500">Chưa có dịch vụ nào để hiển thị.</p>
          </div>
        </section>
      ) : (
        categories.map((category) => {
          const services = servicesByCategory[category.id] || [];
          if (services.length === 0) return null;

          return (
            <section key={category.id} className="py-16 bg-white">
              <div className="container mx-auto px-4">
                {/* Category Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {category.imageUrl && (
                      <img
                        src={category.imageUrl || fallbackImage}
                        alt={category.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={handleImageError}
                      />
                    )}
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {category.name}
                    </h2>
                  </div>
                  {category.description && (
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      {/* Service Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.images?.[0] || fallbackImage}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {service.requiresBooking && (
                          <Badge className="absolute top-3 right-3 bg-amber-600">
                            Cần đặt trước
                          </Badge>
                        )}
                      </div>

                      {/* Service Content */}
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {service.name}
                        </h3>
                        
                        {service.description && (
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {service.description}
                          </p>
                        )}

                        {/* Service Details */}
                        <div className="space-y-2 mb-4">
                          {service.durationMinutes && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4 text-amber-600" />
                              <span>{service.durationMinutes} phút</span>
                            </div>
                          )}
                          
                          {service.maxCapacityPerSlot && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="h-4 w-4 text-amber-600" />
                              <span>Tối đa {service.maxCapacityPerSlot} người</span>
                            </div>
                          )}
                          
                          {service.operatingHours && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Sparkles className="h-4 w-4 text-amber-600" />
                              <span>{service.operatingHours}</span>
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <p className="text-sm text-gray-500">Giá từ</p>
                            <p className="text-2xl font-bold text-amber-600">
                              {formatCurrency(service.basePrice)}
                            </p>
                            {service.unit && (
                              <p className="text-xs text-gray-500">/{service.unit}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          );
        })
      )}

      {/* Experience Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Sparkles className="h-16 w-16 mx-auto text-amber-600 mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Trải nghiệm dịch vụ chúng tôi
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Khám phá và đặt ngay những dịch vụ tuyệt vời để làm phong phú thêm chuyến lưu trú của bạn
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <CheckCircle2 className="h-10 w-10 text-amber-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Dịch vụ đa dạng</h3>
                <p className="text-gray-600 text-sm">
                  Từ spa, gym đến dịch vụ vận chuyển, đáp ứng mọi nhu cầu
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <CheckCircle2 className="h-10 w-10 text-amber-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Chất lượng cao</h3>
                <p className="text-gray-600 text-sm">
                  Đội ngũ chuyên nghiệp và trang thiết bị hiện đại
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <CheckCircle2 className="h-10 w-10 text-amber-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Đặt trước dễ dàng</h3>
                <p className="text-gray-600 text-sm">
                  Đặt dịch vụ ngay trong quá trình đặt phòng
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleBookNow}
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Đặt phòng và dịch vụ ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cần hỗ trợ?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Đội ngũ dịch vụ khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={handleBookNow}
            className="border-amber-600 text-amber-600 hover:bg-amber-50"
          >
            Liên hệ đặt dịch vụ
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

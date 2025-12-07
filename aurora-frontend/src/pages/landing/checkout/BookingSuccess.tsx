import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle2, Calendar, MapPin, Phone, Mail, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoHero from "@/components/custom/VideoHero";

export default function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const bookingId = searchParams.get("bookingId");
  const bookingCode = searchParams.get("bookingCode");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <VideoHero
        title="Đặt phòng thành công!"
        subtitle="Cảm ơn bạn đã chọn Aurora Hotel"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Card */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle2 className="h-16 w-16 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Đặt phòng thành công!
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Chúng tôi đã nhận được yêu cầu đặt phòng của bạn
              </p>

              {bookingCode && (
                <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Mã đặt phòng</p>
                  <p className="text-2xl font-bold text-primary">{bookingCode}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Vui lòng lưu mã này để tra cứu đặt phòng
                  </p>
                </div>
              )}

              <div className="space-y-4 text-left bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Bước tiếp theo</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Chúng tôi sẽ gửi email xác nhận đến địa chỉ email bạn đã cung cấp trong vòng 24 giờ.
                      Vui lòng kiểm tra hộp thư của bạn.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Check-in</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Vui lòng đến khách sạn vào ngày check-in đã đặt. Nhân viên sẽ hỗ trợ bạn làm thủ tục.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Liên hệ</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua hotline hoặc email.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              asChild
              className="flex-1 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Link to="/">Về trang chủ</Link>
            </Button>
            
            {bookingId && (
              <Button
                asChild
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <Link to={`/bookings/${bookingId}`}>Xem chi tiết đặt phòng</Link>
              </Button>
            )}
            
            <Button
              asChild
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <Link to="/booking">Đặt phòng mới</Link>
            </Button>
          </div>

          {/* Contact Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-semibold">Hotline</p>
                  <p className="text-sm text-gray-600">1900 1234</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm text-gray-600">support@aurorahotel.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-semibold">Địa chỉ</p>
                  <p className="text-sm text-gray-600">
                    123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CheckoutData } from "../index";
import type { RootState } from "@/features/store";

interface GuestDetailsStepProps {
  checkoutData: CheckoutData;
  updateCheckoutData: (updates: Partial<CheckoutData>) => void;
}

export default function GuestDetailsStep({
  checkoutData,
  updateCheckoutData,
}: GuestDetailsStepProps) {
  // Get current user from Redux
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const guestInfo = checkoutData.guestInfo || {
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  };

  // Fill form with user data if logged in and form is empty
  useEffect(() => {
    if (isLogin && currentUser && !guestInfo.fullName && !guestInfo.email) {
      const fullName = `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim();
      updateCheckoutData({
        guestInfo: {
          fullName: fullName || currentUser.username || "",
          email: currentUser.email || "",
          phone: currentUser.phone || "",
          specialRequests: guestInfo.specialRequests || "",
        },
      });
    }
  }, [isLogin, currentUser]); // Only run when login status or user changes

  const handleChange = (field: string, value: string) => {
    updateCheckoutData({
      guestInfo: {
        ...guestInfo,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Thông tin khách hàng</h2>
        <p className="text-gray-600">
          {isLogin
            ? "Vui lòng kiểm tra và cập nhật thông tin của bạn"
            : "Vui lòng điền thông tin liên hệ để hoàn tất đặt phòng"}
        </p>
        {isLogin && (
          <p className="text-sm text-primary mt-1">
            ✓ Bạn đang đăng nhập với tài khoản: {currentUser.email || currentUser.username}
          </p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin liên hệ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Họ và tên <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              value={guestInfo.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Nhập họ và tên đầy đủ"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={guestInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Số điện thoại <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={guestInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+84 123 456 789"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Yêu cầu đặc biệt (Tùy chọn)</Label>
            <Textarea
              id="specialRequests"
              value={guestInfo.specialRequests || ""}
              onChange={(e) => handleChange("specialRequests", e.target.value)}
              placeholder="Ví dụ: Phòng tầng cao, view đẹp. Early check-in nếu có thể..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

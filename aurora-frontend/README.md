# Delete the file after successful development

# 🚀 Aurora Hotel System - Routes Testing Guide

Server đang chạy tại: **http://localhost:3000**

---

## 📋 CLIENT ROUTES (Màu xanh lá - Green Theme)

### 🌐 Public Routes (Không cần đăng nhập)

#### Trang chính
- 🏠 **Home**: http://localhost:3000/home
- ℹ️ **About**: http://localhost:3000/about
- 🏨 **Accommodation**: http://localhost:3000/accommodation
- 🛎️ **Service**: http://localhost:3000/service
- ✨ **Experience**: http://localhost:3000/experience
- 🖼️ **Gallery**: http://localhost:3000/gallery
- 📰 **News**: http://localhost:3000/news
- 🎁 **Promotion**: http://localhost:3000/promotion
- 📞 **Contact**: http://localhost:3000/contact

#### Authentication (Xác thực)
- 🔐 **Login**: http://localhost:3000/login
- 📝 **Register**: http://localhost:3000/register
- 🔑 **Forgot Password**: http://localhost:3000/forgot-password
- 🔓 **Reset Password**: http://localhost:3000/reset-password

#### Booking (Đặt phòng - Public)
- 🛏️ **Room List**: http://localhost:3000/rooms
- 🛏️ **Room Detail**: http://localhost:3000/rooms/1 *(thay 1 bằng room ID)*
- 🔍 **Search Room**: http://localhost:3000/search

#### Promotions (Khuyến mãi)
- 🎁 **Promotion List**: http://localhost:3000/promotions
- 🎁 **Promotion Detail**: http://localhost:3000/promotions/1 *(thay 1 bằng ID khác)*

---

### 🔒 Private Routes (Cần đăng nhập)

#### Account (Tài khoản)
- 👤 **Profile**: http://localhost:3000/profile
- ✏️ **Edit Profile**: http://localhost:3000/profile/edit
- 📋 **My Bookings**: http://localhost:3000/my-bookings
- 📄 **Booking Detail**: http://localhost:3000/my-bookings/1 *(thay 1 bằng ID khác)*
- ❌ **Cancel Booking**: http://localhost:3000/my-bookings/1/cancel

#### Booking (Đặt phòng - Private)
- ➕ **Create Booking**: http://localhost:3000/booking/new
- 📝 **Review Booking**: http://localhost:3000/booking/review
- ✅ **Confirm Booking**: http://localhost:3000/booking/confirm

#### Services (Dịch vụ)
- 🛎️ **Service List**: http://localhost:3000/services
- 📄 **Service Detail**: http://localhost:3000/services/1 *(thay 1 bằng ID khác)*
- 📋 **My Services**: http://localhost:3000/my-services
- 📄 **My Service Detail**: http://localhost:3000/my-services/1 *(thay 1 bằng ID khác)*

#### Payment (Thanh toán)
- 💳 **Payment**: http://localhost:3000/payment
- ✅ **Payment Success**: http://localhost:3000/payment/success
- ❌ **Payment Failed**: http://localhost:3000/payment/failed
- 📊 **Payment History**: http://localhost:3000/payment-history

---

## 🔴 ADMIN ROUTES (Màu đỏ - Red Theme)

### Dashboard
- 📊 **Admin Dashboard**: http://localhost:3000/admin

---

### 👥 Users Management (Quản lý người dùng)
- 📋 **User List**: http://localhost:3000/admin/users
- ➕ **Create User**: http://localhost:3000/admin/users/create
- ✏️ **Edit User**: http://localhost:3000/admin/users/1/edit *(thay 1 bằng ID khác)*
- 🎭 **Role Management**: http://localhost:3000/admin/roles
- 🔐 **Permission Management**: http://localhost:3000/admin/permissions

---

### 🏨 Room & Facility Management (Quản lý phòng & tiện nghi)
- 🛏️ **Room Management**: http://localhost:3000/admin/rooms
- 🏷️ **Room Type Management**: http://localhost:3000/admin/room-types
- ⭐ **Facility Management**: http://localhost:3000/admin/facilities
- 🛎️ **Service Management**: http://localhost:3000/admin/services

---

### 📅 Bookings Management (Quản lý đặt phòng)
- 📋 **Booking List**: http://localhost:3000/admin/bookings
- 📄 **Booking Detail**: http://localhost:3000/admin/bookings/1 *(thay 1 bằng ID khác)*
- 💰 **Payment Management**: http://localhost:3000/admin/payments
- 🛎️ **Service Booking Management**: http://localhost:3000/admin/service-bookings

---

### 📢 Marketing Management (Quản lý Marketing)
- 🎁 **Promotion Management**: http://localhost:3000/admin/promotions
- ➕ **Create Promotion**: http://localhost:3000/admin/promotions/create
- ✏️ **Edit Promotion**: http://localhost:3000/admin/promotions/1/edit *(thay 1 bằng ID khác)*
- 📰 **News Management**: http://localhost:3000/admin/news
- 🖼️ **Gallery Management**: http://localhost:3000/admin/gallery

---

### ⭐ Amenities Management (Quản lý tiện nghi)
- ⭐ **Amenity Management**: http://localhost:3000/admin/amenities

---

### 📊 Reports (Báo cáo)
- 💰 **Revenue Report**: http://localhost:3000/admin/reports/revenue
- 📈 **Occupancy Report**: http://localhost:3000/admin/reports/occupancy
- 👥 **Customer Report**: http://localhost:3000/admin/reports/customer
- 🛎️ **Service Report**: http://localhost:3000/admin/reports/service

---

### ⚙️ Settings (Cài đặt)
- ⚙️ **System Settings**: http://localhost:3000/admin/settings

---

## 🔵 STAFF ROUTES (Màu xanh dương - Blue Theme)

### Dashboard
- 📊 **Staff Dashboard**: http://localhost:3000/staff

---

### 📅 Bookings Management (Quản lý đặt phòng)
- 📋 **Booking List**: http://localhost:3000/staff/bookings
- ➕ **Create Booking**: http://localhost:3000/staff/bookings/create
- 📄 **Booking Detail**: http://localhost:3000/staff/bookings/1 *(thay 1 bằng ID khác)*
- ✏️ **Edit Booking**: http://localhost:3000/staff/bookings/1/edit *(thay 1 bằng ID khác)*
- ✅ **Check-in**: http://localhost:3000/staff/checkin
- 🚪 **Check-out**: http://localhost:3000/staff/checkout

---

### 🛏️ Rooms Management (Quản lý phòng)
- 🛏️ **Room Status**: http://localhost:3000/staff/rooms
- 🔄 **Update Room Status**: http://localhost:3000/staff/rooms/1/status *(thay 1 bằng room ID)*
- 📊 **Room Availability**: http://localhost:3000/staff/room-availability

---

### 🛎️ Services Management (Quản lý dịch vụ)
- 📋 **Service Booking List**: http://localhost:3000/staff/service-bookings
- ➕ **Create Service Booking**: http://localhost:3000/staff/service-bookings/create
- 📄 **Service Booking Detail**: http://localhost:3000/staff/service-bookings/1 *(thay 1 bằng ID khác)*

---

### 💳 Payments Management (Quản lý thanh toán)
- 📋 **Payment List**: http://localhost:3000/staff/payments
- ➕ **Create Payment**: http://localhost:3000/staff/payments/create
- 📄 **Payment Detail**: http://localhost:3000/staff/payments/1 *(thay 1 bằng ID khác)*

---

### 👥 Customers Management (Quản lý khách hàng)
- 📋 **Customer List**: http://localhost:3000/staff/customers
- 📄 **Customer Detail**: http://localhost:3000/staff/customers/1 *(thay 1 bằng ID khác)*

---

### 🎁 Promotions Management (Quản lý khuyến mãi)
- 📋 **Promotion List**: http://localhost:3000/staff/promotions
- 🎯 **Apply Promotion**: http://localhost:3000/staff/promotions/apply

---

## 🎯 Tổng kết

### Tổng số routes:
- **CLIENT**: 30 routes (16 public + 14 private)
- **ADMIN**: 25 routes
- **STAFF**: 21 routes
- **TOTAL**: **76 routes**

### ⚠️ Lưu ý nghiệp vụ:
- Hệ thống quản lý **MỘT khách sạn** duy nhất
- Không cần tạo/sửa/xóa khách sạn
- Chỉ quản lý: Phòng, Loại phòng, Tiện nghi, Dịch vụ của khách sạn đó

---

## 🛠️ Hướng dẫn Test

1. **Khởi động server** (nếu chưa chạy):
   ```bash
   npm run dev
   ```

2. **Mở trình duyệt** và truy cập: http://localhost:3000

3. **Test từng route** bằng cách click vào các link ở trên

4. **Lưu ý**:
   - Routes có `/:id` cần thay số ID (ví dụ: `/rooms/1`, `/rooms/2`, etc.)
   - Private routes yêu cầu đăng nhập (có thể chưa có logic redirect)
   - Admin/Staff routes cần có role phù hợp (có thể chưa có logic kiểm tra)
   - Hệ thống quản lý **1 khách sạn duy nhất** với nhiều phòng

---

## 📝 Notes

- ✅ Tất cả các trang đã được tạo với base structure
- ✅ Router đã được cấu hình đầy đủ
- ✅ Function components đã được đổi tên với hậu tố "Page"
- ⏳ Chưa có logic xác thực và phân quyền (sẽ implement sau)
- ⏳ Chưa có kết nối API và database (sẽ implement sau)
- ⏳ Chưa có i18n/translation (sẽ implement sau)

---

**🎨 Color Theme:**
- 🟢 Client: Green Theme
- 🔴 Admin: Red Theme  
- 🔵 Staff: Blue Theme

---

*Generated on: October 12, 2025*
*Project: Aurora Hotel System*
*Version: 1.0.0*

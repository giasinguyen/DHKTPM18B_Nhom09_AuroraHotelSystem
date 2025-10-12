import { createBrowserRouter, Navigate } from "react-router-dom";

// ==================== CLIENT PAGES ====================
import RootPage from "@/pages/client/index";

// ========== PUBLIC ROUTES (Không cần đăng nhập) ==========
// Public pages
import HomePage from "@/pages/client/publicRoutes/Home";
import AboutPage from "@/pages/client/publicRoutes/About";
import AccommodationPage from "@/pages/client/publicRoutes/Accommodation";
import ServicePage from "@/pages/client/publicRoutes/Service";
import ExperiencePage from "@/pages/client/publicRoutes/Experience";
import GalleryPage from "@/pages/client/publicRoutes/Gallery";
import NewsPage from "@/pages/client/publicRoutes/News";
import ContactPage from "@/pages/client/publicRoutes/Contact";

// Authentication
import LoginPage from "@/pages/client/publicRoutes/auth/Login";
import RegisterPage from "@/pages/client/publicRoutes/auth/Register";
import ForgotPasswordPage from "@/pages/client/publicRoutes/auth/ForgotPassword";
import ResetPasswordPage from "@/pages/client/publicRoutes/auth/ResetPassword";

// Public Booking
import RoomListPage from "@/pages/client/publicRoutes/booking/RoomList";
import RoomDetailPage from "@/pages/client/publicRoutes/booking/RoomDetail";
import SearchRoomPage from "@/pages/client/publicRoutes/booking/SearchRoom";

// Promotions
import PromotionPage from "@/pages/client/publicRoutes/promotions/Promotion";
import PromotionListPage from "@/pages/client/publicRoutes/promotions/PromotionList";
import PromotionDetailPage from "@/pages/client/publicRoutes/promotions/PromotionDetail";

// ========== PRIVATE ROUTES (Cần đăng nhập) ==========
// Account
import ProfilePage from "@/pages/client/privateRoutes/account/Profile";
import EditProfilePage from "@/pages/client/privateRoutes/account/EditProfile";
import MyBookingsPage from "@/pages/client/privateRoutes/account/MyBookings";
import MyBookingDetailPage from "@/pages/client/privateRoutes/account/MyBookingDetail";
import CancelBookingPage from "@/pages/client/privateRoutes/account/CancelBooking";

// Private Booking
import CreateBookingPage from "@/pages/client/privateRoutes/booking/CreateBooking";
import ReviewBookingPage from "@/pages/client/privateRoutes/booking/ReviewBooking";
import ConfirmBookingPage from "@/pages/client/privateRoutes/booking/ConfirmBooking";

// Services
import ServiceListPage from "@/pages/client/privateRoutes/services/ServiceList";
import ServiceDetailPage from "@/pages/client/privateRoutes/services/ServiceDetail";
import MyServicesPage from "@/pages/client/privateRoutes/services/MyServices";
import MyServiceDetailPage from "@/pages/client/privateRoutes/services/MyServiceDetail";

// Payment
import PaymentPage from "@/pages/client/privateRoutes/payment/Payment";
import PaymentSuccessPage from "@/pages/client/privateRoutes/payment/PaymentSuccess";
import PaymentFailedPage from "@/pages/client/privateRoutes/payment/PaymentFailed";
import PaymentHistoryPage from "@/pages/client/privateRoutes/payment/PaymentHistory";

// ==================== ADMIN PAGES ====================
import AdminPage from "@/pages/admin/index";

// Dashboard
import AdminDashboardPage from "@/pages/admin/dashboard/AdminDashboard";

// Users
import UserListPage from "@/pages/admin/users/UserList";
import UserCreatePage from "@/pages/admin/users/UserCreate";
import UserEditPage from "@/pages/admin/users/UserEdit";
import RoleManagementPage from "@/pages/admin/users/RoleManagement";
import PermissionManagementPage from "@/pages/admin/users/PermissionManagement";

// Room & Facility Management (Quản lý phòng và tiện nghi của 1 khách sạn)
import RoomManagementPage from "@/pages/admin/hotels/RoomManagement";
import RoomTypeManagementPage from "@/pages/admin/hotels/RoomTypeManagement";
import FacilityManagementPage from "@/pages/admin/hotels/FacilityManagement";
import AdminServiceManagementPage from "@/pages/admin/hotels/ServiceManagement";

// Bookings
import AdminBookingListPage from "@/pages/admin/bookings/AdminBookingList";
import AdminBookingDetailPage from "@/pages/admin/bookings/AdminBookingDetail";
import PaymentManagementPage from "@/pages/admin/bookings/PaymentManagement";
import ServiceBookingManagementPage from "@/pages/admin/bookings/ServiceBookingManagement";

// Marketing
import PromotionManagementPage from "@/pages/admin/marketing/PromotionManagement";
import PromotionCreatePage from "@/pages/admin/marketing/PromotionCreate";
import PromotionEditPage from "@/pages/admin/marketing/PromotionEdit";
import NewsManagementPage from "@/pages/admin/marketing/NewsManagement";
import GalleryManagementPage from "@/pages/admin/marketing/GalleryManagement";

// Amenities
import AmenityManagementPage from "@/pages/admin/amenities/AmenityManagement";

// Reports
import RevenueReportPage from "@/pages/admin/reports/RevenueReport";
import OccupancyReportPage from "@/pages/admin/reports/OccupancyReport";
import CustomerReportPage from "@/pages/admin/reports/CustomerReport";
import ServiceReportPage from "@/pages/admin/reports/ServiceReport";

// Settings
import SystemSettingsPage from "@/pages/admin/settings/SystemSettings";

// ==================== STAFF PAGES ====================
import StaffPage from "@/pages/staff/index";

// Dashboard
import StaffDashboardPage from "@/pages/staff/dashboard/StaffDashboard";

// Bookings
import StaffBookingListPage from "@/pages/staff/bookings/StaffBookingList";
import StaffBookingCreatePage from "@/pages/staff/bookings/StaffBookingCreate";
import StaffBookingDetailPage from "@/pages/staff/bookings/StaffBookingDetail";
import StaffBookingEditPage from "@/pages/staff/bookings/StaffBookingEdit";
import CheckInPage from "@/pages/staff/bookings/CheckIn";
import CheckOutPage from "@/pages/staff/bookings/CheckOut";

// Rooms
import RoomStatusPage from "@/pages/staff/rooms/RoomStatus";
import UpdateRoomStatusPage from "@/pages/staff/rooms/UpdateRoomStatus";
import RoomAvailabilityPage from "@/pages/staff/rooms/RoomAvailability";

// Services
import StaffServiceBookingListPage from "@/pages/staff/services/StaffServiceBookingList";
import StaffServiceBookingCreatePage from "@/pages/staff/services/StaffServiceBookingCreate";
import StaffServiceBookingDetailPage from "@/pages/staff/services/StaffServiceBookingDetail";

// Payments
import StaffPaymentListPage from "@/pages/staff/payments/StaffPaymentList";
import StaffPaymentCreatePage from "@/pages/staff/payments/StaffPaymentCreate";
import StaffPaymentDetailPage from "@/pages/staff/payments/StaffPaymentDetail";

// Customers
import StaffCustomerListPage from "@/pages/staff/customers/StaffCustomerList";
import StaffCustomerDetailPage from "@/pages/staff/customers/StaffCustomerDetail";

// Promotions
import StaffPromotionListPage from "@/pages/staff/promotions/StaffPromotionList";
import ApplyPromotionPage from "@/pages/staff/promotions/ApplyPromotion";

// ==================== COMMONS ====================
// Error Page
import ErrorPage from "@/pages/commons/ErrorPage";

const router = createBrowserRouter([
  // =========================
  // CLIENT ROUTE GROUP
  // =========================
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      // Public Pages (Không cần đăng nhập)
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "accommodation", element: <AccommodationPage /> },
      { path: "service", element: <ServicePage /> },
      { path: "experience", element: <ExperiencePage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "news", element: <NewsPage /> },
      { path: "promotion", element: <PromotionPage /> },
      { path: "contact", element: <ContactPage /> },

      // Authentication
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },

      // Booking
      { path: "rooms", element: <RoomListPage /> },
      { path: "rooms/:id", element: <RoomDetailPage /> },
      { path: "search", element: <SearchRoomPage /> },
      { path: "booking/new", element: <CreateBookingPage /> },
      { path: "booking/review", element: <ReviewBookingPage /> },
      { path: "booking/confirm", element: <ConfirmBookingPage /> },

      // Account (Cần đăng nhập - Protected)
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/edit", element: <EditProfilePage /> },
      { path: "my-bookings", element: <MyBookingsPage /> },
      { path: "my-bookings/:id", element: <MyBookingDetailPage /> },
      { path: "my-bookings/:id/cancel", element: <CancelBookingPage /> },

      // Services (Cần đăng nhập - Protected)
      { path: "services", element: <ServiceListPage /> },
      { path: "services/:id", element: <ServiceDetailPage /> },
      { path: "my-services", element: <MyServicesPage /> },
      { path: "my-services/:id", element: <MyServiceDetailPage /> },

      // Payment (Cần đăng nhập - Protected)
      { path: "payment", element: <PaymentPage /> },
      { path: "payment/success", element: <PaymentSuccessPage /> },
      { path: "payment/failed", element: <PaymentFailedPage /> },
      { path: "payment-history", element: <PaymentHistoryPage /> },

      // Promotions
      { path: "promotions", element: <PromotionListPage /> },
      { path: "promotions/:code", element: <PromotionDetailPage /> },
    ],
  },

  // =========================
  // ADMIN ROUTE GROUP
  // =========================
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <ErrorPage />,
    children: [
      // Dashboard
      { index: true, element: <AdminDashboardPage /> },

      // User Management
      { path: "users", element: <UserListPage /> },
      { path: "users/create", element: <UserCreatePage /> },
      { path: "users/:id/edit", element: <UserEditPage /> },
      { path: "roles", element: <RoleManagementPage /> },
      { path: "permissions", element: <PermissionManagementPage /> },

      // Room & Facility Management (Quản lý phòng và tiện nghi)
      { path: "rooms", element: <RoomManagementPage /> },
      { path: "room-types", element: <RoomTypeManagementPage /> },
      { path: "facilities", element: <FacilityManagementPage /> },
      { path: "services", element: <AdminServiceManagementPage /> },

      // Booking Management
      { path: "bookings", element: <AdminBookingListPage /> },
      { path: "bookings/:id", element: <AdminBookingDetailPage /> },
      { path: "payments", element: <PaymentManagementPage /> },
      { path: "service-bookings", element: <ServiceBookingManagementPage /> },

      // Marketing
      { path: "promotions", element: <PromotionManagementPage /> },
      { path: "promotions/create", element: <PromotionCreatePage /> },
      { path: "promotions/:id/edit", element: <PromotionEditPage /> },
      { path: "news", element: <NewsManagementPage /> },
      { path: "gallery", element: <GalleryManagementPage /> },

      // Amenities
      { path: "amenities", element: <AmenityManagementPage /> },

      // Reports
      { path: "reports/revenue", element: <RevenueReportPage /> },
      { path: "reports/occupancy", element: <OccupancyReportPage /> },
      { path: "reports/customer", element: <CustomerReportPage /> },
      { path: "reports/service", element: <ServiceReportPage /> },

      // Settings
      { path: "settings", element: <SystemSettingsPage /> },
    ],
  },

  // =========================
  // STAFF ROUTE GROUP
  // =========================
  {
    path: "/staff",
    element: <StaffPage />,
    errorElement: <ErrorPage />,
    children: [
      // Dashboard
      { index: true, element: <StaffDashboardPage /> },

      // Booking Management
      { path: "bookings", element: <StaffBookingListPage /> },
      { path: "bookings/create", element: <StaffBookingCreatePage /> },
      { path: "bookings/:id", element: <StaffBookingDetailPage /> },
      { path: "bookings/:id/edit", element: <StaffBookingEditPage /> },
      { path: "checkin", element: <CheckInPage /> },
      { path: "checkout", element: <CheckOutPage /> },

      // Room Management
      { path: "rooms", element: <RoomStatusPage /> },
      { path: "rooms/:id/status", element: <UpdateRoomStatusPage /> },
      { path: "room-availability", element: <RoomAvailabilityPage /> },

      // Service Bookings
      { path: "service-bookings", element: <StaffServiceBookingListPage /> },
      { path: "service-bookings/create", element: <StaffServiceBookingCreatePage /> },
      { path: "service-bookings/:id", element: <StaffServiceBookingDetailPage /> },

      // Payments
      { path: "payments", element: <StaffPaymentListPage /> },
      { path: "payments/create", element: <StaffPaymentCreatePage /> },
      { path: "payments/:id", element: <StaffPaymentDetailPage /> },

      // Customers
      { path: "customers", element: <StaffCustomerListPage /> },
      { path: "customers/:id", element: <StaffCustomerDetailPage /> },

      // Promotions
      { path: "promotions", element: <StaffPromotionListPage /> },
      { path: "promotions/apply", element: <ApplyPromotionPage /> },
    ],
  },

  // =========================
  // CATCH ALL - 404
  // =========================
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
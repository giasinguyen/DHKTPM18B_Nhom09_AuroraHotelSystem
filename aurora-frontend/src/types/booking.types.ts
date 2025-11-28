// Booking Types for Aurora Hotel Management System

export interface BookingRoom {
  roomId: string;
  roomNumber: string;
  roomTypeName: string;
  pricePerNight: number;
}

export interface Booking {
  id: string;
  bookingCode: string;
  branchId: string;
  branchName: string;
  customerId: string;
  customerName: string;
  checkin: string; // LocalDate as ISO string
  checkout: string;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequest?: string;
  rooms: BookingRoom[];
}

export type BookingStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'CHECKED_IN' 
  | 'CHECKED_OUT' 
  | 'CANCELLED' 
  | 'NO_SHOW';

export type PaymentStatus = 
  | 'PENDING' 
  | 'PAID' 
  | 'PARTIALLY_PAID' 
  | 'REFUNDED' 
  | 'FAILED';

export interface BookingCreationRequest {
  branchId: string;
  customerId: string;
  checkin: string;
  checkout: string;
  roomIds: string[];
  specialRequest?: string;
}

export interface BookingUpdateRequest {
  checkin?: string;
  checkout?: string;
  roomIds?: string[];
  specialRequest?: string;
}

export interface BookingConfirmRequest {
  bookingId: string;
  notes?: string;
}

export interface BookingCancellationRequest {
  bookingId: string;
  reason: string;
}

export interface BookingCancellationResponse {
  bookingId: string;
  refundAmount: number;
  cancellationDate: string;
  message: string;
}

export interface BookingSearchParams {
  hotelId?: string;
  customerId?: string;
  status?: BookingStatus;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

// Status badge configurations
export const BOOKING_STATUS_CONFIG: Record<BookingStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' }> = {
  PENDING: { label: 'Chờ xác nhận', variant: 'warning' },
  CONFIRMED: { label: 'Đã xác nhận', variant: 'success' },
  CHECKED_IN: { label: 'Đã nhận phòng', variant: 'default' },
  CHECKED_OUT: { label: 'Đã trả phòng', variant: 'secondary' },
  CANCELLED: { label: 'Đã hủy', variant: 'destructive' },
  NO_SHOW: { label: 'Không đến', variant: 'outline' },
};

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' }> = {
  PENDING: { label: 'Chờ thanh toán', variant: 'warning' },
  PAID: { label: 'Đã thanh toán', variant: 'success' },
  PARTIALLY_PAID: { label: 'Thanh toán một phần', variant: 'secondary' },
  REFUNDED: { label: 'Đã hoàn tiền', variant: 'outline' },
  FAILED: { label: 'Thất bại', variant: 'destructive' },
};

// Service Types for Aurora Hotel Management System

export interface HotelService {
  id: string;
  branchId: string;
  branchName: string;
  name: string;
  type: ServiceType;
  description?: string;
  basePrice: number;
}

export type ServiceType = 
  | 'SPA' 
  | 'RESTAURANT' 
  | 'LAUNDRY' 
  | 'TRANSPORT' 
  | 'TOUR' 
  | 'GYM' 
  | 'POOL' 
  | 'OTHER';

export interface ServiceCreationRequest {
  branchId: string;
  name: string;
  type: ServiceType;
  description?: string;
  basePrice: number;
}

export interface ServiceUpdateRequest {
  name?: string;
  type?: ServiceType;
  description?: string;
  basePrice?: number;
}

export interface ServiceSearchParams {
  hotelId?: string;
  type?: ServiceType;
  name?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

// Service type configurations
export const SERVICE_TYPE_CONFIG: Record<ServiceType, { label: string; icon: string }> = {
  SPA: { label: 'Spa & Massage', icon: '🧖' },
  RESTAURANT: { label: 'Nhà hàng', icon: '🍽️' },
  LAUNDRY: { label: 'Giặt ủi', icon: '🧺' },
  TRANSPORT: { label: 'Vận chuyển', icon: '🚗' },
  TOUR: { label: 'Tour du lịch', icon: '🗺️' },
  GYM: { label: 'Phòng gym', icon: '🏋️' },
  POOL: { label: 'Hồ bơi', icon: '🏊' },
  OTHER: { label: 'Khác', icon: '📦' },
};

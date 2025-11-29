// Promotion Types for Aurora Hotel Management System

export interface Promotion {
  id: string;
  code: string;
  name: string;
  description?: string;
  discount: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface PromotionCreationRequest {
  code: string;
  name: string;
  description?: string;
  discount: number;
  startDate: string;
  endDate: string;
  active?: boolean;
}

export interface PromotionUpdateRequest {
  name?: string;
  description?: string;
  discount?: number;
  startDate?: string;
  endDate?: string;
  active?: boolean;
}

export interface PromotionSearchParams {
  code?: string;
  name?: string;
  active?: boolean;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

// Helper to check if promotion is currently valid
export const isPromotionValid = (promotion: Promotion): boolean => {
  const now = new Date();
  const start = new Date(promotion.startDate);
  const end = new Date(promotion.endDate);
  return promotion.active && now >= start && now <= end;
};

// Get promotion status
export type PromotionStatus = 'active' | 'scheduled' | 'expired' | 'inactive';

export const getPromotionStatus = (promotion: Promotion): PromotionStatus => {
  if (!promotion.active) return 'inactive';
  
  const now = new Date();
  const start = new Date(promotion.startDate);
  const end = new Date(promotion.endDate);
  
  if (now < start) return 'scheduled';
  if (now > end) return 'expired';
  return 'active';
};

export const PROMOTION_STATUS_CONFIG: Record<PromotionStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' }> = {
  active: { label: 'Đang áp dụng', variant: 'success' },
  scheduled: { label: 'Sắp diễn ra', variant: 'warning' },
  expired: { label: 'Đã hết hạn', variant: 'secondary' },
  inactive: { label: 'Tạm ngừng', variant: 'outline' },
};

import axiosClient from '@/config/axiosClient';
import type { Event, EventStatus } from '@/types/event.types';

export interface RoomEventCreationRequest {
  name: string;
  description?: string;
  startDate: string; // Format: YYYY-MM-DD
  endDate: string;
  branchId: string;
  priceAdjustments: Array<{
    adjustmentType: 'PERCENTAGE' | 'FIXED_AMOUNT';
    adjustmentDirection: 'INCREASE' | 'DECREASE';
    adjustmentValue: number;
    targetType: 'CATEGORY' | 'ROOM_TYPE' | 'SPECIFIC_ROOM';
    targetId: string;
    targetName?: string;
  }>;
}

export interface RoomEventUpdateRequest {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  branchId?: string;
  status?: EventStatus;
  priceAdjustments?: Array<{
    adjustmentType: 'PERCENTAGE' | 'FIXED_AMOUNT';
    adjustmentDirection: 'INCREASE' | 'DECREASE';
    adjustmentValue: number;
    targetType: 'CATEGORY' | 'ROOM_TYPE' | 'SPECIFIC_ROOM';
    targetId: string;
    targetName?: string;
  }>;
}

export interface RoomEventListResponse {
  content: Event[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

// Room Event Service
export const roomEventService = {
  // Create new event
  async createEvent(request: RoomEventCreationRequest): Promise<Event> {
    const response = await axiosClient.post<ApiResponse<Event>>('/api/v1/room-events', request);
    return response.data.result;
  },

  // Update event
  async updateEvent(id: string, request: RoomEventUpdateRequest): Promise<Event> {
    const response = await axiosClient.put<ApiResponse<Event>>(`/api/v1/room-events/${id}`, request);
    return response.data.result;
  },

  // Delete event
  async deleteEvent(id: string): Promise<void> {
    await axiosClient.delete(`/api/v1/room-events/${id}`);
  },

  // Get event by ID
  async getEventById(id: string): Promise<Event> {
    const response = await axiosClient.get<ApiResponse<Event>>(`/api/v1/room-events/${id}`);
    return response.data.result;
  },

  // Get all events with pagination
  async getAllEvents(params: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
  } = {}): Promise<RoomEventListResponse> {
    const { page = 0, size = 10, sortBy = 'createdAt', sortDirection = 'DESC' } = params;
    const response = await axiosClient.get<ApiResponse<RoomEventListResponse>>('/api/v1/room-events', {
      params: { page, size, sortBy, sortDirection },
    });
    return response.data.result;
  },

  // Get events by branch
  async getEventsByBranch(
    branchId: string,
    params: {
      page?: number;
      size?: number;
      sortBy?: string;
      sortDirection?: 'ASC' | 'DESC';
    } = {}
  ): Promise<RoomEventListResponse> {
    const { page = 0, size = 10, sortBy = 'startDate', sortDirection = 'ASC' } = params;
    const response = await axiosClient.get<ApiResponse<RoomEventListResponse>>(
      `/api/v1/room-events/branch/${branchId}`,
      {
        params: { page, size, sortBy, sortDirection },
      }
    );
    return response.data.result;
  },

  // Get events by status
  async getEventsByStatus(
    status: EventStatus,
    params: {
      page?: number;
      size?: number;
      sortBy?: string;
      sortDirection?: 'ASC' | 'DESC';
    } = {}
  ): Promise<RoomEventListResponse> {
    const { page = 0, size = 10, sortBy = 'startDate', sortDirection = 'ASC' } = params;
    const response = await axiosClient.get<ApiResponse<RoomEventListResponse>>(
      `/api/v1/room-events/status/${status}`,
      {
        params: { page, size, sortBy, sortDirection },
      }
    );
    return response.data.result;
  },

  // Search events
  async searchEvents(params: {
    branchId?: string;
    status?: EventStatus;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
  } = {}): Promise<RoomEventListResponse> {
    const {
      branchId,
      status,
      startDate,
      endDate,
      page = 0,
      size = 10,
      sortBy = 'startDate',
      sortDirection = 'ASC',
    } = params;

    const response = await axiosClient.get<ApiResponse<RoomEventListResponse>>(
      '/api/v1/room-events/search',
      {
        params: {
          branchId,
          status,
          startDate,
          endDate,
          page,
          size,
          sortBy,
          sortDirection,
        },
      }
    );
    return response.data.result;
  },

  // Activate event
  async activateEvent(id: string): Promise<void> {
    await axiosClient.post(`/api/v1/room-events/${id}/activate`);
  },

  // Complete event
  async completeEvent(id: string): Promise<void> {
    await axiosClient.post(`/api/v1/room-events/${id}/complete`);
  },

  // Cancel event
  async cancelEvent(id: string): Promise<void> {
    await axiosClient.post(`/api/v1/room-events/${id}/cancel`);
  },
};

// Helper service to get dropdown options
export const roomEventHelperService = {
  // Get branches (for dropdown)
  async getBranches(): Promise<Array<{ id: string; name: string }>> {
    const response = await axiosClient.get<ApiResponse<{ content: Array<{ id: string; name: string }> }>>('/api/v1/branches', {
      params: { page: 0, size: 100 },
    });
    return response.data.result.content.map((branch) => ({
      id: branch.id,
      name: branch.name,
    }));
  },

  // Get room categories (for dropdown)
  async getCategories(branchId?: string): Promise<Array<{ id: string; name: string }>> {
    if (!branchId) {
      // Nếu không có branchId, lấy tất cả categories từ tất cả branches
      const branches = await roomEventHelperService.getBranches();
      const categoryMap = new Map<string, { id: string; name: string }>();

      for (const branch of branches) {
        try {
          const response = await axiosClient.get<ApiResponse<Array<{ id: string; name: string }>>>(
            `/api/v1/room-categories/branch/${branch.id}`
          );
          response.data.result.forEach((category) => {
            if (!categoryMap.has(category.id)) {
              categoryMap.set(category.id, category);
            }
          });
        } catch (error) {
          console.warn(`Failed to fetch categories for branch ${branch.id}:`, error);
        }
      }

      return Array.from(categoryMap.values());
    }

    // Có branchId: gọi endpoint theo branch
    const response = await axiosClient.get<ApiResponse<Array<{ id: string; name: string }>>>(
      `/api/v1/room-categories/branch/${branchId}`
    );
    return response.data.result.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  },

  // Get room types (for dropdown)
  async getRoomTypes(branchId?: string): Promise<Array<{ id: string; name: string }>> {
    if (branchId) {
      // Có branchId: gọi endpoint theo branch
      const response = await axiosClient.get<ApiResponse<Array<{ id: string; name: string }>>>(
        `/api/v1/room-types/hotel/${branchId}`
      );
      return response.data.result.map((roomType) => ({
        id: roomType.id,
        name: roomType.name,
      }));
    }

    // Không có branchId: lấy tất cả room types
    const response = await axiosClient.get<ApiResponse<Array<{ id: string; name: string }>>>(
      '/api/v1/room-types'
    );
    return response.data.result.map((roomType) => ({
      id: roomType.id,
      name: roomType.name,
    }));
  },

  // Get rooms (for dropdown)
  async getRooms(branchId?: string): Promise<Array<{ id: string; name: string }>> {
    const params: { page: number; size: number; sortBy?: string; sortDir?: string } = {
      page: 0,
      size: 1000,
      sortBy: 'roomNumber',
      sortDir: 'asc',
    };

    let response;
    if (branchId) {
      // Có branchId: gọi endpoint theo branch
      response = await axiosClient.get<ApiResponse<{ content: Array<{ id: string; roomNumber: string; roomTypeName?: string }> }>>(
        `/api/v1/rooms/hotel/${branchId}`,
        { params }
      );
    } else {
      // Không có branchId: lấy tất cả rooms
      response = await axiosClient.get<ApiResponse<{ content: Array<{ id: string; roomNumber: string; roomTypeName?: string }> }>>(
        '/api/v1/rooms',
        { params }
      );
    }

    return response.data.result.content.map((room) => ({
      id: room.id,
      name: `Phòng ${room.roomNumber}${room.roomTypeName ? ' - ' + room.roomTypeName : ''}`,
    }));
  },
};


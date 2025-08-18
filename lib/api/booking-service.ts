import { apiClient, createBusinessUnitRequest, API_ENDPOINTS } from "./config"
import type {
  ApiResponse,
  PaginatedResponse,
  BusinessUnit,
  RoomType,
  AvailabilityRequest,
  AvailabilityResponse,
  BookingRequest,
  Reservation,
  Guest,
  PaymentDetails,
  RoomSearchFilters,
  BookingSearchFilters,
} from "../types/booking"

export class BookingService {
  // Business unit operations
  static async getBusinessUnits(): Promise<BusinessUnit[]> {
    const response = await apiClient.get<ApiResponse<BusinessUnit[]>>(API_ENDPOINTS.BUSINESS_UNITS)
    return response.data.data
  }

  static async getBusinessUnitById(id: string): Promise<BusinessUnit> {
    const response = await apiClient.get<ApiResponse<BusinessUnit>>(API_ENDPOINTS.BUSINESS_UNIT_BY_ID(id))
    return response.data.data
  }

  // Room and availability operations
  static async getRoomTypes(businessUnitId: string): Promise<RoomType[]> {
    const response = await apiClient.get<ApiResponse<RoomType[]>>(
      API_ENDPOINTS.ROOM_TYPES,
      createBusinessUnitRequest(businessUnitId),
    )
    return response.data.data
  }

  static async checkAvailability(request: AvailabilityRequest): Promise<AvailabilityResponse> {
    const response = await apiClient.post<ApiResponse<AvailabilityResponse>>(
      API_ENDPOINTS.ROOM_AVAILABILITY,
      request,
      createBusinessUnitRequest(request.businessUnitId),
    )
    return response.data.data
  }

  static async searchRooms(filters: RoomSearchFilters): Promise<RoomType[]> {
    const response = await apiClient.post<ApiResponse<RoomType[]>>(
      API_ENDPOINTS.ROOM_SEARCH,
      filters,
      filters.businessUnitId ? createBusinessUnitRequest(filters.businessUnitId) : {},
    )
    return response.data.data
  }

  // Reservation operations
  static async createReservation(bookingRequest: BookingRequest, guest: Guest): Promise<Reservation> {
    const response = await apiClient.post<ApiResponse<Reservation>>(
      API_ENDPOINTS.CREATE_RESERVATION,
      {
        ...bookingRequest,
        guest,
      },
      createBusinessUnitRequest(bookingRequest.businessUnitId),
    )
    return response.data.data
  }

  static async getReservationById(id: string): Promise<Reservation> {
    const response = await apiClient.get<ApiResponse<Reservation>>(API_ENDPOINTS.RESERVATION_BY_ID(id))
    return response.data.data
  }

  static async searchReservations(filters: BookingSearchFilters): Promise<PaginatedResponse<Reservation>> {
    const response = await apiClient.post<PaginatedResponse<Reservation>>(
      API_ENDPOINTS.RESERVATIONS,
      filters,
      filters.businessUnitId ? createBusinessUnitRequest(filters.businessUnitId) : {},
    )
    return response.data
  }

  static async cancelReservation(id: string): Promise<Reservation> {
    const response = await apiClient.post<ApiResponse<Reservation>>(API_ENDPOINTS.CANCEL_RESERVATION(id))
    return response.data.data
  }

  // Payment operations
  static async processPayment(
    reservationId: string,
    paymentDetails: PaymentDetails,
  ): Promise<{ success: boolean; transactionId: string }> {
    const response = await apiClient.post<
      ApiResponse<{
        success: boolean
        transactionId: string
      }>
    >(API_ENDPOINTS.PROCESS_PAYMENT, {
      reservationId,
      paymentDetails,
    })
    return response.data.data
  }

  static async getPaymentStatus(transactionId: string): Promise<{
    status: "pending" | "completed" | "failed"
    transactionId: string
  }> {
    const response = await apiClient.get<
      ApiResponse<{
        status: "pending" | "completed" | "failed"
        transactionId: string
      }>
    >(API_ENDPOINTS.PAYMENT_STATUS(transactionId))
    return response.data.data
  }

  // Guest operations
  static async createGuest(guest: Guest): Promise<Guest> {
    const response = await apiClient.post<ApiResponse<Guest>>(API_ENDPOINTS.GUESTS, guest)
    return response.data.data
  }

  static async getGuestById(id: string): Promise<Guest> {
    const response = await apiClient.get<ApiResponse<Guest>>(API_ENDPOINTS.GUEST_BY_ID(id))
    return response.data.data
  }
}

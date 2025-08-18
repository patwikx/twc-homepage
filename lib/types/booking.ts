// Core business unit types
export interface BusinessUnit {
  id: string
  name: string
  slug: string
  description: string
  address: string
  phone: string
  email: string
  images: string[]
  amenities: string[]
  checkInTime: string
  checkOutTime: string
  policies: {
    cancellation: string
    children: string
    pets: string
  }
  coordinates: {
    lat: number
    lng: number
  }
}

// Room and accommodation types
export interface RoomType {
  id: string
  businessUnitId: string
  name: string
  description: string
  capacity: {
    adults: number
    children: number
  }
  bedConfiguration: string
  size: number // in square meters
  images: string[]
  amenities: string[]
  basePrice: number
  currency: string
}

export interface Room {
  id: string
  roomTypeId: string
  roomNumber: string
  floor: number
  status: "available" | "occupied" | "maintenance" | "out-of-order"
  businessUnitId: string
  name: string
}

// Booking and reservation types
export interface BookingRequest {
  businessUnitId: string
  roomTypeId: string
  checkInDate: string
  checkOutDate: string
  guests: {
    adults: number
    children: number
  }
  specialRequests?: string
}

export interface Reservation {
  id: string
  businessUnitId: string
  roomId: string
  roomType: RoomType
  checkInDate: string
  checkOutDate: string
  guests: {
    adults: number
    children: number
  }
  totalNights: number
  baseAmount: number
  taxes: number
  fees: number
  totalAmount: number
  currency: string
  status: "pending" | "confirmed" | "checked-in" | "checked-out" | "cancelled"
  guest: Guest
  specialRequests?: string
  createdAt: string
  updatedAt: string
}

// Guest information types
export interface Guest {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  dateOfBirth?: string
  nationality?: string
  idType?: "passport" | "drivers-license" | "national-id"
  idNumber?: string
}

// Availability and pricing types
export interface AvailabilityRequest {
  businessUnitId: string
  checkInDate: string
  checkOutDate: string
  guests: {
    adults: number
    children: number
  }
}

export interface RoomAvailability {
  roomTypeId: string
  roomType: RoomType
  availableRooms: number
  pricePerNight: number
  totalPrice: number
  taxes: number
  fees: number
  finalPrice: number
  currency: string
  isAvailable: boolean
  restrictions?: string[]
}

export interface AvailabilityResponse {
  businessUnit: BusinessUnit
  checkInDate: string
  checkOutDate: string
  totalNights: number
  availableRooms: RoomAvailability[]
}

// Payment types
export interface PaymentDetails {
  method: "credit-card" | "debit-card" | "paypal" | "bank-transfer"
  cardNumber?: string
  expiryMonth?: string
  expiryYear?: string
  cvv?: string
  cardHolderName?: string
  billingAddress?: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message?: string
}

// Search and filter types
export interface RoomSearchFilters {
  businessUnitId?: string
  minPrice?: number
  maxPrice?: number
  capacity?: {
    adults: number
    children: number
  }
  amenities?: string[]
  roomType?: string
}

export interface BookingSearchFilters {
  businessUnitId?: string
  status?: Reservation["status"]
  checkInDate?: string
  checkOutDate?: string
  guestEmail?: string
  reservationId?: string
}

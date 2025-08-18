import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig, // Changed from AxiosRequestConfig
  type AxiosResponse,
} from "axios"

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api"

// Create axios instance with default configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth tokens
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    if (token) {
      // ✅ Directly modify the headers object to preserve the correct type
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token")
        // Redirect to login page
        window.location.href = "/login"
      }
    }

    // Log error for debugging
    console.error("[API Error]", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    })

    return Promise.reject(error)
  },
)

// Helper function to create API requests with business unit context
export const createBusinessUnitRequest = (businessUnitId: string) => {
  return {
    headers: {
      "X-Business-Unit-ID": businessUnitId,
    },
  }
}

// API endpoints configuration
export const API_ENDPOINTS = {
  // Business units
  BUSINESS_UNITS: "/business-units",
  BUSINESS_UNIT_BY_ID: (id: string) => `/business-units/${id}`,

  // Rooms and availability
  ROOM_TYPES: "/room-types",
  ROOM_AVAILABILITY: "/availability",
  ROOM_SEARCH: "/rooms/search",

  // Bookings and reservations
  RESERVATIONS: "/reservations",
  RESERVATION_BY_ID: (id: string) => `/reservations/${id}`,
  CREATE_RESERVATION: "/reservations",
  CANCEL_RESERVATION: (id: string) => `/reservations/${id}/cancel`,

  // Payments
  PROCESS_PAYMENT: "/payments/process",
  PAYMENT_STATUS: (id: string) => `/payments/${id}/status`,

  // Guest management
  GUESTS: "/guests",
  GUEST_BY_ID: (id: string) => `/guests/${id}`,
} as const

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS]
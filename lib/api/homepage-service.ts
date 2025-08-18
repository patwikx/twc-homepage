import { apiClient } from "./config"
import type {

  Restaurant,
  Activity,
  CruiseService,
  GalleryImage,
  Event,
  ContactInfo,
  CompanyInfo,
  Milestone,
  Achievement,
} from "../types/homepage"
import { Room } from "../types/booking"

// Properties API
export const propertiesApi = {
  async getAll(): Promise<Property[]> {
    const response = await apiClient.get("/properties")
    return response.data
  },

  async getById(id: string): Promise<Property> {
    const response = await apiClient.get(`/properties/${id}`)
    return response.data
  },

  async getRooms(propertyId: string): Promise<Room[]> {
    const response = await apiClient.get(`/properties/${propertyId}/rooms`)
    return response.data
  },
}

// Dining API
export const diningApi = {
  async getRestaurants(): Promise<Restaurant[]> {
    const response = await apiClient.get("/restaurants")
    return response.data
  },

  async getRestaurantsByProperty(propertyId: string): Promise<Restaurant[]> {
    const response = await apiClient.get(`/restaurants?propertyId=${propertyId}`)
    return response.data
  },

  async getDiningExperiences(): Promise<any[]> {
    const response = await apiClient.get("/dining-experiences")
    return response.data
  },
}

// Activities API
export const activitiesApi = {
  async getActivities(): Promise<Activity[]> {
    const response = await apiClient.get("/activities")
    return response.data
  },

  async getActivitiesByCategory(category: string): Promise<Activity[]> {
    const response = await apiClient.get(`/activities?category=${category}`)
    return response.data
  },

  async getCruiseServices(): Promise<CruiseService[]> {
    const response = await apiClient.get("/cruise-services")
    return response.data
  },

  async getActivityPackages(): Promise<any[]> {
    const response = await apiClient.get("/activity-packages")
    return response.data
  },
}

// Gallery API
export const galleryApi = {
  async getImages(): Promise<GalleryImage[]> {
    const response = await apiClient.get("/gallery")
    return response.data
  },

  async getImagesByProperty(propertyId: string): Promise<GalleryImage[]> {
    const response = await apiClient.get(`/gallery?propertyId=${propertyId}`)
    return response.data
  },

  async getImagesByCategory(category: string): Promise<GalleryImage[]> {
    const response = await apiClient.get(`/gallery?category=${category}`)
    return response.data
  },
}

// Events API
export const eventsApi = {
  async getEventTypes(): Promise<Event[]> {
    const response = await apiClient.get("/event-types")
    return response.data
  },

  async getVenues(): Promise<any[]> {
    const response = await apiClient.get("/venues")
    return response.data
  },

  async getEventPackages(): Promise<any[]> {
    const response = await apiClient.get("/event-packages")
    return response.data
  },
}

// Contact API
export const contactApi = {
  async getContactInfo(): Promise<ContactInfo[]> {
    const response = await apiClient.get("/contact-info")
    return response.data
  },

  async getServices(): Promise<any[]> {
    const response = await apiClient.get("/contact-services")
    return response.data
  },
}

// Company API
export const companyApi = {
  async getCompanyInfo(): Promise<CompanyInfo> {
    const response = await apiClient.get("/company-info")
    return response.data
  },

  async getMilestones(): Promise<Milestone[]> {
    const response = await apiClient.get("/company-milestones")
    return response.data
  },

  async getValues(): Promise<any[]> {
    const response = await apiClient.get("/company-values")
    return response.data
  },

  async getAchievements(): Promise<Achievement[]> {
    const response = await apiClient.get("/company-achievements")
    return response.data
  },
}

// Accommodations API
export const accommodationsApi = {
  async getAccommodations(): Promise<any[]> {
    const response = await apiClient.get("/accommodations")
    return response.data
  },

  async getAccommodationsByProperty(propertyId: string): Promise<any[]> {
    const response = await apiClient.get(`/accommodations?propertyId=${propertyId}`)
    return response.data
  },

  async getSpecialOffers(): Promise<any[]> {
    const response = await apiClient.get("/accommodation-offers")
    return response.data
  },
}

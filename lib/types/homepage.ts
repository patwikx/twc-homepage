// Additional types for homepage data
export interface Restaurant {
  id: string
  name: string
  type: string
  location: string
  cuisine: string
  rating: number
  image: string
  description: string
  specialties: string[]
  hours: string
  priceRange: string
  features: string[]
  propertyId?: string
}

export interface Activity {
  id: string
  name: string
  category: string
  location: string
  price: string
  description?: string
  duration?: string
  capacity?: string
  propertyId?: string
}

export interface CruiseService {
  id: string
  name: string
  location: string
  duration: string
  capacity: string
  price: string
  image: string
  description: string
  highlights: string[]
  schedule: string[]
  rating: number
}

export interface GalleryImage {
  id: string
  src: string
  title: string
  property: string
  category: string
  description: string
  propertyId?: string
}

export interface Event {
  id: string
  name: string
  type: string
  description: string
  image: string
  features: string[]
  capacity?: string
  price?: string
}

export interface ContactInfo {
  id: string
  resort: string
  address: string
  phone: string
  email: string
  hours: string
  propertyId: string
}

export interface CompanyInfo {
  id: string
  name: string
  description: string
  mission: string
  vision: string
  founded: string
  location: string
}

export interface Milestone {
  id: string
  year: string
  event: string
  description?: string
}

export interface Achievement {
  id: string
  number: string
  label: string
  description?: string
}

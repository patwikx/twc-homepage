"use client"

import { useState, useEffect } from "react"

interface UseApiDataOptions<T> {
  initialData?: T
  enabled?: boolean
}

interface UseApiDataReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useApiData<T>(apiCall: () => Promise<T>, options: UseApiDataOptions<T> = {}): UseApiDataReturn<T> {
  const { initialData = null, enabled = true } = options

  const [data, setData] = useState<T | null>(initialData)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    if (!enabled) return

    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("API Error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [enabled])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}

// Specialized hooks for different data types
export function useProperties() {
  return useApiData(() => import("@/lib/api/homepage-service").then((m) => m.propertiesApi.getAll()))
}

export function useRestaurants() {
  return useApiData(() => import("@/lib/api/homepage-service").then((m) => m.diningApi.getRestaurants()))
}

export function useActivities() {
  return useApiData(() => import("@/lib/api/homepage-service").then((m) => m.activitiesApi.getActivities()))
}

export function useCruiseServices() {
  return useApiData(() => import("@/lib/api/homepage-service").then((m) => m.activitiesApi.getCruiseServices()))
}

export function useGalleryImages() {
  return useApiData(() => import("@/lib/api/homepage-service").then((m) => m.galleryApi.getImages()))
}

export function useContactInfo() {
  return useApiData(() => import("@/lib/api/homepage-service").then((m) => m.contactApi.getContactInfo()))
}

export function useCompanyInfo() {
  return useApiData(() => import("@/lib/api/homepage-service").then((m) => m.companyApi.getCompanyInfo()))
}

export function useMilestones() {
  return useApiData(() => import("@/lib/api/homepage-service").then((m) => m.companyApi.getMilestones()))
}

export function useAccommodations() {
  return useApiData(() => import("@/lib/api/homepage-service").then((m) => m.accommodationsApi.getAccommodations()))
}

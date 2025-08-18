"use client"

import { useState, useMemo } from "react"
import type { RoomAvailability } from "@/lib/types/booking"

export interface RoomFilters {
  priceRange: {
    min: number
    max: number
  }
  capacity: {
    adults: number
    children: number
  }
  amenities: string[]
  bedType: string[]
  sortBy: "price-low" | "price-high" | "capacity" | "size" | "name"
}

export interface UseRoomFiltersReturn {
  filters: RoomFilters
  setFilters: (filters: Partial<RoomFilters>) => void
  resetFilters: () => void
  filteredRooms: RoomAvailability[]
  availableAmenities: string[]
  availableBedTypes: string[]
  priceRange: { min: number; max: number }
}

const defaultFilters: RoomFilters = {
  priceRange: { min: 0, max: 10000 },
  capacity: { adults: 1, children: 0 },
  amenities: [],
  bedType: [],
  sortBy: "price-low",
}

export function useRoomFilters(rooms: RoomAvailability[]): UseRoomFiltersReturn {
  const [filters, setFiltersState] = useState<RoomFilters>(defaultFilters)

  // Calculate available options from rooms
  const { availableAmenities, availableBedTypes, priceRange } = useMemo(() => {
    const amenities = new Set<string>()
    const bedTypes = new Set<string>()
    let minPrice = Number.POSITIVE_INFINITY
    let maxPrice = 0

    rooms.forEach((room) => {
      room.roomType.amenities.forEach((amenity) => amenities.add(amenity))
      bedTypes.add(room.roomType.bedConfiguration)
      minPrice = Math.min(minPrice, room.pricePerNight)
      maxPrice = Math.max(maxPrice, room.pricePerNight)
    })

    return {
      availableAmenities: Array.from(amenities).sort(),
      availableBedTypes: Array.from(bedTypes).sort(),
      priceRange: {
        min: minPrice === Number.POSITIVE_INFINITY ? 0 : Math.floor(minPrice),
        max: Math.ceil(maxPrice),
      },
    }
  }, [rooms])

  // Filter and sort rooms
  const filteredRooms = useMemo(() => {
    const filtered = rooms.filter((room) => {
      // Price filter
      if (room.pricePerNight < filters.priceRange.min || room.pricePerNight > filters.priceRange.max) {
        return false
      }

      // Capacity filter
      const totalCapacity = room.roomType.capacity.adults + room.roomType.capacity.children
      const requiredCapacity = filters.capacity.adults + filters.capacity.children
      if (totalCapacity < requiredCapacity) {
        return false
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          room.roomType.amenities.some((roomAmenity) => roomAmenity.toLowerCase().includes(amenity.toLowerCase())),
        )
        if (!hasAllAmenities) {
          return false
        }
      }

      // Bed type filter
      if (filters.bedType.length > 0) {
        const matchesBedType = filters.bedType.some((bedType) =>
          room.roomType.bedConfiguration.toLowerCase().includes(bedType.toLowerCase()),
        )
        if (!matchesBedType) {
          return false
        }
      }

      return true
    })

    // Sort rooms
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.pricePerNight - b.pricePerNight
        case "price-high":
          return b.pricePerNight - a.pricePerNight
        case "capacity":
          return (
            b.roomType.capacity.adults +
            b.roomType.capacity.children -
            (a.roomType.capacity.adults + a.roomType.capacity.children)
          )
        case "size":
          return b.roomType.size - a.roomType.size
        case "name":
          return a.roomType.name.localeCompare(b.roomType.name)
        default:
          return 0
      }
    })

    return filtered
  }, [rooms, filters])

  const setFilters = (newFilters: Partial<RoomFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }))
  }

  const resetFilters = () => {
    setFiltersState({
      ...defaultFilters,
      priceRange: priceRange.min > 0 ? priceRange : defaultFilters.priceRange,
    })
  }

  return {
    filters,
    setFilters,
    resetFilters,
    filteredRooms,
    availableAmenities,
    availableBedTypes,
    priceRange,
  }
}

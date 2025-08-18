"use client"

import { useState, useCallback } from "react"
import { DateUtils } from "@/lib/utils/date-utils"
import type { AvailabilityRequest, AvailabilityResponse } from "@/lib/types/booking"
import { BookingService } from "@/lib/api/booking-service"

export interface BookingState {
  businessUnitId: string
  checkInDate: Date | null
  checkOutDate: Date | null
  guests: {
    adults: number
    children: number
  }
  isLoading: boolean
  availability: AvailabilityResponse | null
  error: string | null
}

export interface UseBookingStateReturn {
  state: BookingState
  bookingData: {
    checkIn: Date | null
    checkOut: Date | null
    adults: number
    children: number
  }
  actions: {
    setBusinessUnit: (id: string) => void
    setCheckInDate: (date: Date | null) => void
    setCheckOutDate: (date: Date | null) => void
    setGuests: (adults: number, children: number) => void
    checkAvailability: () => Promise<void>
    resetAvailability: () => void
    clearError: () => void
  }
  computed: {
    totalNights: number
    isDateRangeValid: boolean
    canCheckAvailability: boolean
    dateValidationError: string | null
  }
}

export function useBookingState(initialBusinessUnitId?: string): UseBookingStateReturn {
  const [state, setState] = useState<BookingState>({
    businessUnitId: initialBusinessUnitId || "",
    checkInDate: DateUtils.getNextAvailableCheckIn(),
    checkOutDate: null,
    guests: {
      adults: 2,
      children: 0,
    },
    isLoading: false,
    availability: null,
    error: null,
  })

  // Actions
  const setBusinessUnit = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      businessUnitId: id,
      availability: null,
      error: null,
    }))
  }, [])

  const setCheckInDate = useCallback((date: Date | null) => {
    setState((prev) => {
      const newState = {
        ...prev,
        checkInDate: date,
        availability: null,
        error: null,
      }

      // Auto-adjust check-out date if needed
      if (date && (!prev.checkOutDate || prev.checkOutDate <= date)) {
        newState.checkOutDate = DateUtils.getSuggestedCheckOut(date)
      }

      return newState
    })
  }, [])

  const setCheckOutDate = useCallback((date: Date | null) => {
    setState((prev) => ({
      ...prev,
      checkOutDate: date,
      availability: null,
      error: null,
    }))
  }, [])

  const setGuests = useCallback((adults: number, children: number) => {
    setState((prev) => ({
      ...prev,
      guests: { adults, children },
      availability: null,
      error: null,
    }))
  }, [])

  const checkAvailability = useCallback(async () => {
    if (!state.businessUnitId || !state.checkInDate || !state.checkOutDate) {
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const request: AvailabilityRequest = {
        businessUnitId: state.businessUnitId,
        checkInDate: DateUtils.toApiFormat(state.checkInDate),
        checkOutDate: DateUtils.toApiFormat(state.checkOutDate),
        guests: state.guests,
      }

      const availability = await BookingService.checkAvailability(request)

      setState((prev) => ({
        ...prev,
        availability,
        isLoading: false,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to check availability",
        isLoading: false,
      }))
    }
  }, [state.businessUnitId, state.checkInDate, state.checkOutDate, state.guests])

  const resetAvailability = useCallback(() => {
    setState((prev) => ({
      ...prev,
      availability: null,
      error: null,
    }))
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  // Computed values
  const totalNights =
    state.checkInDate && state.checkOutDate ? DateUtils.calculateNights(state.checkInDate, state.checkOutDate) : 0

  const dateValidation =
    state.checkInDate && state.checkOutDate
      ? DateUtils.validateDateRange(state.checkInDate, state.checkOutDate)
      : { isValid: false }

  const isDateRangeValid = dateValidation.isValid
  const dateValidationError = dateValidation.error || null

  const canCheckAvailability = Boolean(
    state.businessUnitId && state.checkInDate && state.checkOutDate && isDateRangeValid && state.guests.adults > 0,
  )

  return {
    state,
    bookingData: {
      checkIn: state.checkInDate,
      checkOut: state.checkOutDate,
      adults: state.guests.adults,
      children: state.guests.children,
    },
    actions: {
      setBusinessUnit,
      setCheckInDate,
      setCheckOutDate,
      setGuests,
      checkAvailability,
      resetAvailability,
      clearError,
    },
    computed: {
      totalNights,
      isDateRangeValid,
      canCheckAvailability,
      dateValidationError,
    },
  }
}

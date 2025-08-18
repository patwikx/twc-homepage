"use client"

import { useState, useCallback } from "react"
import type { Guest, BookingRequest, Reservation, RoomAvailability } from "@/lib/types/booking"
import { BookingService } from "@/lib/api/booking-service"

export type BookingStep = "room-selection" | "guest-info" | "preferences" | "review" | "confirmation"

export interface BookingFlowState {
  currentStep: BookingStep
  selectedRoom: RoomAvailability | null
  bookingRequest: BookingRequest | null
  guest: Guest
  specialRequests: string
  agreedToTerms: boolean
  isLoading: boolean
  error: string | null
  reservation: Reservation | null
}

export interface UseBookingFlowReturn {
  state: BookingFlowState
  actions: {
    setStep: (step: BookingStep) => void
    setSelectedRoom: (room: RoomAvailability, bookingRequest: BookingRequest) => void
    updateGuest: (guest: Partial<Guest>) => void
    setSpecialRequests: (requests: string) => void
    setAgreedToTerms: (agreed: boolean) => void
    submitBooking: () => Promise<void>
    resetFlow: () => void
    clearError: () => void
  }
  computed: {
    canProceedToNextStep: boolean
    isGuestInfoValid: boolean
    totalSteps: number
    currentStepIndex: number
  }
}

const initialGuestState: Guest = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: {
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
  dateOfBirth: "",
  nationality: "",
  idType: "passport",
  idNumber: "",
}

const initialState: BookingFlowState = {
  currentStep: "room-selection",
  selectedRoom: null,
  bookingRequest: null,
  guest: initialGuestState,
  specialRequests: "",
  agreedToTerms: false,
  isLoading: false,
  error: null,
  reservation: null,
}

const steps: BookingStep[] = ["room-selection", "guest-info", "preferences", "review", "confirmation"]

export function useBookingFlow(): UseBookingFlowReturn {
  const [state, setState] = useState<BookingFlowState>(initialState)

  // Actions
  const setStep = useCallback((step: BookingStep) => {
    setState((prev) => ({ ...prev, currentStep: step, error: null }))
  }, [])

  const setSelectedRoom = useCallback((room: RoomAvailability, bookingRequest: BookingRequest) => {
    setState((prev) => ({
      ...prev,
      selectedRoom: room,
      bookingRequest,
      currentStep: "guest-info",
      error: null,
    }))
  }, [])

  const updateGuest = useCallback((guestUpdate: Partial<Guest>) => {
    setState((prev) => ({
      ...prev,
      guest: { ...prev.guest, ...guestUpdate },
      error: null,
    }))
  }, [])

  const setSpecialRequests = useCallback((requests: string) => {
    setState((prev) => ({ ...prev, specialRequests: requests, error: null }))
  }, [])

  const setAgreedToTerms = useCallback((agreed: boolean) => {
    setState((prev) => ({ ...prev, agreedToTerms: agreed, error: null }))
  }, [])

  const submitBooking = useCallback(async () => {
    if (!state.bookingRequest || !state.selectedRoom) {
      setState((prev) => ({ ...prev, error: "Missing booking information" }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const bookingWithRequests = {
        ...state.bookingRequest,
        specialRequests: state.specialRequests || undefined,
      }

      const reservation = await BookingService.createReservation(bookingWithRequests, state.guest)

      setState((prev) => ({
        ...prev,
        reservation,
        currentStep: "confirmation",
        isLoading: false,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to create reservation",
        isLoading: false,
      }))
    }
  }, [state.bookingRequest, state.selectedRoom, state.guest, state.specialRequests])

  const resetFlow = useCallback(() => {
    setState(initialState)
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  // Computed values
  const isGuestInfoValid = Boolean(
    state.guest.firstName &&
      state.guest.lastName &&
      state.guest.email &&
      state.guest.phone &&
      state.guest.address.street &&
      state.guest.address.city &&
      state.guest.address.country,
  )

  const canProceedToNextStep = (() => {
    switch (state.currentStep) {
      case "room-selection":
        return Boolean(state.selectedRoom && state.bookingRequest)
      case "guest-info":
        return isGuestInfoValid
      case "preferences":
        return true // Special requests are optional
      case "review":
        return state.agreedToTerms
      case "confirmation":
        return false // Final step
      default:
        return false
    }
  })()

  const totalSteps = steps.length
  const currentStepIndex = steps.indexOf(state.currentStep)

  return {
    state,
    actions: {
      setStep,
      setSelectedRoom,
      updateGuest,
      setSpecialRequests,
      setAgreedToTerms,
      submitBooking,
      resetFlow,
      clearError,
    },
    computed: {
      canProceedToNextStep,
      isGuestInfoValid,
      totalSteps,
      currentStepIndex,
    },
  }
}

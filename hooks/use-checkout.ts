"use client"

import { useState, useCallback } from "react"
import type { PaymentDetails } from "@/lib/types/booking"
import { BookingService } from "@/lib/api/booking-service"

export type PaymentMethod = "credit-card" | "debit-card" | "paypal" | "bank-transfer"

export interface CheckoutState {
  selectedPaymentMethod: PaymentMethod
  paymentDetails: PaymentDetails
  billingAddress: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
    sameAsGuest: boolean
  }
  isProcessing: boolean
  error: string | null
  paymentResult: {
    success: boolean
    transactionId: string
  } | null
}

export interface UseCheckoutReturn {
  state: CheckoutState
  actions: {
    setPaymentMethod: (method: PaymentMethod) => void
    updatePaymentDetails: (details: Partial<PaymentDetails>) => void
    updateBillingAddress: (address: Partial<CheckoutState["billingAddress"]>) => void
    processPayment: (reservationId: string) => Promise<void>
    resetCheckout: () => void
    clearError: () => void
  }
  computed: {
    isPaymentDetailsValid: boolean
    isBillingAddressValid: boolean
    canProcessPayment: boolean
  }
}

const initialPaymentDetails: PaymentDetails = {
  method: "credit-card",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
  cardHolderName: "",
  billingAddress: {
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
}

const initialBillingAddress = {
  street: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  sameAsGuest: true,
}

const initialState: CheckoutState = {
  selectedPaymentMethod: "credit-card",
  paymentDetails: initialPaymentDetails,
  billingAddress: initialBillingAddress,
  isProcessing: false,
  error: null,
  paymentResult: null,
}

export function useCheckout(): UseCheckoutReturn {
  const [state, setState] = useState<CheckoutState>(initialState)

  // Actions
  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setState((prev) => ({
      ...prev,
      selectedPaymentMethod: method,
      paymentDetails: { ...prev.paymentDetails, method },
      error: null,
    }))
  }, [])

  const updatePaymentDetails = useCallback((details: Partial<PaymentDetails>) => {
    setState((prev) => ({
      ...prev,
      paymentDetails: { ...prev.paymentDetails, ...details },
      error: null,
    }))
  }, [])

  const updateBillingAddress = useCallback((address: Partial<CheckoutState["billingAddress"]>) => {
    setState((prev) => ({
      ...prev,
      billingAddress: { ...prev.billingAddress, ...address },
      error: null,
    }))
  }, [])

  const processPayment = useCallback(
    async (reservationId: string) => {
      setState((prev) => ({ ...prev, isProcessing: true, error: null }))

      try {
        // Prepare payment details with billing address
        const paymentDetails: PaymentDetails = {
          ...state.paymentDetails,
          billingAddress: state.billingAddress.sameAsGuest
            ? undefined
            : {
                street: state.billingAddress.street,
                city: state.billingAddress.city,
                state: state.billingAddress.state,
                country: state.billingAddress.country,
                zipCode: state.billingAddress.zipCode,
              },
        }

        const result = await BookingService.processPayment(reservationId, paymentDetails)

        setState((prev) => ({
          ...prev,
          paymentResult: result,
          isProcessing: false,
        }))
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Payment processing failed",
          isProcessing: false,
        }))
      }
    },
    [state.paymentDetails, state.billingAddress],
  )

  const resetCheckout = useCallback(() => {
    setState(initialState)
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  // Computed values
  const isPaymentDetailsValid = (() => {
    switch (state.selectedPaymentMethod) {
      case "credit-card":
      case "debit-card":
        return Boolean(
          state.paymentDetails.cardNumber &&
            state.paymentDetails.expiryMonth &&
            state.paymentDetails.expiryYear &&
            state.paymentDetails.cvv &&
            state.paymentDetails.cardHolderName,
        )
      case "paypal":
        return true // PayPal handles its own validation
      case "bank-transfer":
        return true // Bank transfer doesn't require card details
      default:
        return false
    }
  })()

  const isBillingAddressValid = state.billingAddress.sameAsGuest
    ? true
    : Boolean(
        state.billingAddress.street &&
          state.billingAddress.city &&
          state.billingAddress.country &&
          state.billingAddress.zipCode,
      )

  const canProcessPayment = isPaymentDetailsValid && isBillingAddressValid

  return {
    state,
    actions: {
      setPaymentMethod,
      updatePaymentDetails,
      updateBillingAddress,
      processPayment,
      resetCheckout,
      clearError,
    },
    computed: {
      isPaymentDetailsValid,
      isBillingAddressValid,
      canProcessPayment,
    },
  }
}

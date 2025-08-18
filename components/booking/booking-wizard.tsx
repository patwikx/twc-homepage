"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { BookingProgress } from "./booking-progress"
import { GuestInfoForm } from "./guest-info-form"
import { BookingPreferences } from "./booking-preferences"
import { BookingReview } from "./booking-review"
import { BookingConfirmation } from "./booking-confirmation"
import { useBookingFlow } from "@/hooks/use-booking-flow"
import type { RoomAvailability, BookingRequest } from "@/lib/types/booking"

interface BookingWizardProps {
  room?: RoomAvailability
  businessUnitId?: string
  propertyName?: string
  selectedRoom?: RoomAvailability
  bookingRequest?: BookingRequest
  onComplete?: () => void
  className?: string
}

const BookingWizard = ({
  room,
  businessUnitId,
  propertyName,
  selectedRoom,
  bookingRequest,
  onComplete,
  className,
}: BookingWizardProps) => {
  const booking = useBookingFlow()

  // Initialize with selected room if provided
  if (selectedRoom && bookingRequest && !booking.state.selectedRoom) {
    booking.actions.setSelectedRoom(selectedRoom, bookingRequest)
  }

  const getCompletedSteps = () => {
    const completed = []
    if (booking.state.selectedRoom) completed.push("room-selection")
    if (booking.computed.isGuestInfoValid) completed.push("guest-info")
    if (booking.state.currentStep === "review" || booking.state.currentStep === "confirmation") {
      completed.push("preferences")
    }
    if (booking.state.currentStep === "confirmation") completed.push("review")
    return completed
  }

  const handleNext = () => {
    const steps = ["room-selection", "guest-info", "preferences", "review", "confirmation"]
    const currentIndex = steps.indexOf(booking.state.currentStep)
    if (currentIndex < steps.length - 1) {
      booking.actions.setStep(steps[currentIndex + 1] as any)
    }
  }

  const handleBack = () => {
    const steps = ["room-selection", "guest-info", "preferences", "review", "confirmation"]
    const currentIndex = steps.indexOf(booking.state.currentStep)
    if (currentIndex > 0) {
      booking.actions.setStep(steps[currentIndex - 1] as any)
    }
  }

  const renderCurrentStep = () => {
    switch (booking.state.currentStep) {
      case "room-selection":
        return (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Select a Room</h3>
                <p className="text-muted-foreground">Please select a room from the availability results to continue.</p>
              </div>
            </CardContent>
          </Card>
        )

      case "guest-info":
        return (
          <GuestInfoForm
            guest={booking.state.guest}
            onGuestUpdate={booking.actions.updateGuest}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={booking.state.isLoading}
          />
        )

      case "preferences":
        return (
          <BookingPreferences
            specialRequests={booking.state.specialRequests}
            onSpecialRequestsChange={booking.actions.setSpecialRequests}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={booking.state.isLoading}
          />
        )

      case "review":
        if (!booking.state.selectedRoom || !booking.state.bookingRequest) {
          return (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Missing Information</h3>
                  <p className="text-muted-foreground">Please complete the previous steps to review your booking.</p>
                </div>
              </CardContent>
            </Card>
          )
        }

        return (
          <BookingReview
            selectedRoom={booking.state.selectedRoom}
            bookingRequest={booking.state.bookingRequest}
            guest={booking.state.guest}
            specialRequests={booking.state.specialRequests}
            agreedToTerms={booking.state.agreedToTerms}
            onAgreedToTermsChange={booking.actions.setAgreedToTerms}
            onSubmit={booking.actions.submitBooking}
            onBack={handleBack}
            isLoading={booking.state.isLoading}
            error={booking.state.error}
          />
        )

      case "confirmation":
        if (!booking.state.reservation) {
          return (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">No Reservation Found</h3>
                  <p className="text-muted-foreground">Please complete the booking process to see your confirmation.</p>
                </div>
              </CardContent>
            </Card>
          )
        }

        return (
          <BookingConfirmation
            reservation={booking.state.reservation}
            onNewBooking={() => {
              booking.actions.resetFlow()
              onComplete?.()
            }}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Progress Indicator */}
        {booking.state.currentStep !== "confirmation" && (
          <BookingProgress currentStep={booking.state.currentStep} completedSteps={getCompletedSteps()} />
        )}

        {/* Error Display */}
        {booking.state.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {booking.state.error}
              <button onClick={booking.actions.clearError} className="ml-2 underline hover:no-underline">
                Dismiss
              </button>
            </AlertDescription>
          </Alert>
        )}

        {/* Current Step Content */}
        {renderCurrentStep()}
      </div>
    </div>
  )
}

export default BookingWizard

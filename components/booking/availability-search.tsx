"use client"

import { Search, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DateRangePicker } from "./date-range-picker"
import { GuestSelector } from "./guest-selector"
import { DateUtils } from "@/lib/utils/date-utils"
import { useBookingState } from "@/hooks/use-booking-state"

interface AvailabilitySearchProps {
  businessUnitId?: string
  onSearch?: () => void
  showBusinessUnitSelector?: boolean
  className?: string
}

export function AvailabilitySearch({
  businessUnitId,
  onSearch,
  showBusinessUnitSelector = false,
  className,
}: AvailabilitySearchProps) {
  const booking = useBookingState()
  const { state, actions, computed } = booking

  const handleSearch = () => {
    if (computed.canCheckAvailability) {
      actions.checkAvailability()
      onSearch?.()
    }
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-lg font-semibold">Check Availability</h3>
            <p className="text-sm text-muted-foreground">Select your dates and number of guests</p>
          </div>

          {/* Date Selection */}
          <DateRangePicker
            checkInDate={state.checkInDate}
            checkOutDate={state.checkOutDate}
            onCheckInChange={actions.setCheckInDate}
            onCheckOutChange={actions.setCheckOutDate}
            disabled={state.isLoading}
          />

          {/* Guest Selection */}
          <GuestSelector
            adults={state.guests.adults}
            children={state.guests.children}
            onGuestsChange={actions.setGuests}
            disabled={state.isLoading}
          />

          {/* Stay Summary */}
          {computed.totalNights > 0 && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm">
                <span className="font-medium">
                  {computed.totalNights} night{computed.totalNights > 1 ? "s" : ""}
                </span>
                {state.checkInDate && state.checkOutDate && (
                  <span className="text-muted-foreground ml-2">
                    {DateUtils.toDisplayFormat(state.checkInDate)} - {DateUtils.toDisplayFormat(state.checkOutDate)}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Error Display */}
          {(state.error || computed.dateValidationError) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error || computed.dateValidationError}</AlertDescription>
            </Alert>
          )}

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={!computed.canCheckAvailability || state.isLoading}
            className="w-full h-12"
            size="lg"
          >
            {state.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking Availability...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Check Availability
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AvailabilitySearch

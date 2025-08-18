"use client"

import { useState } from "react"
import { Calendar, Users, MapPin, Phone, Mail, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DateUtils } from "@/lib/utils/date-utils"
import type { Guest, BookingRequest, RoomAvailability } from "@/lib/types/booking"

interface BookingReviewProps {
  selectedRoom: RoomAvailability
  bookingRequest: BookingRequest
  guest: Guest
  specialRequests: string
  agreedToTerms: boolean
  onAgreedToTermsChange: (agreed: boolean) => void
  onSubmit: () => void
  onBack: () => void
  isLoading?: boolean
  error?: string | null
  className?: string
}

export function BookingReview({
  selectedRoom,
  bookingRequest,
  guest,
  specialRequests,
  agreedToTerms,
  onAgreedToTermsChange,
  onSubmit,
  onBack,
  isLoading,
  error,
  className,
}: BookingReviewProps) {
  const [showTerms, setShowTerms] = useState(false)

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const totalNights = DateUtils.calculateNights(bookingRequest.checkInDate, bookingRequest.checkOutDate)

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Room Details */}
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="w-24 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                  <img
                    src={
                      selectedRoom.roomType.images[0] ||
                      `/placeholder.svg?height=80&width=120&query=${encodeURIComponent(selectedRoom.roomType.name + " hotel room") || "/placeholder.svg"}`
                    }
                    alt={selectedRoom.roomType.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedRoom.roomType.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRoom.roomType.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {selectedRoom.roomType.capacity.adults + selectedRoom.roomType.capacity.children} guests
                      </span>
                    </div>
                    <span>{selectedRoom.roomType.bedConfiguration}</span>
                    <span>{selectedRoom.roomType.size}m²</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stay Details */}
          <Card>
            <CardHeader>
              <CardTitle>Stay Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Check-in</div>
                    <div className="text-sm text-muted-foreground">
                      {DateUtils.toDisplayFormat(bookingRequest.checkInDate)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Check-out</div>
                    <div className="text-sm text-muted-foreground">
                      {DateUtils.toDisplayFormat(bookingRequest.checkOutDate)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Guests</div>
                  <div className="text-sm text-muted-foreground">
                    {bookingRequest.guests.adults} adult{bookingRequest.guests.adults > 1 ? "s" : ""}
                    {bookingRequest.guests.children > 0 &&
                      `, ${bookingRequest.guests.children} child${bookingRequest.guests.children > 1 ? "ren" : ""}`}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium">
                  {totalNights} night{totalNights > 1 ? "s" : ""} stay
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guest Information */}
          <Card>
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-medium">
                    {guest.firstName} {guest.lastName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Mail className="h-4 w-4" />
                    {guest.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {guest.phone}
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <div>{guest.address.street}</div>
                      <div>
                        {guest.address.city}
                        {guest.address.state && `, ${guest.address.state}`}
                      </div>
                      <div>{guest.address.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Requests */}
          {specialRequests && (
            <Card>
              <CardHeader>
                <CardTitle>Special Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm whitespace-pre-line">{specialRequests}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Price Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Price Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Room rate ({totalNights} nights)</span>
                  <span>{formatCurrency(selectedRoom.totalPrice, selectedRoom.currency)}</span>
                </div>
                {selectedRoom.taxes > 0 && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Taxes & fees</span>
                    <span>{formatCurrency(selectedRoom.taxes, selectedRoom.currency)}</span>
                  </div>
                )}
                {selectedRoom.fees > 0 && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service fees</span>
                    <span>{formatCurrency(selectedRoom.fees, selectedRoom.currency)}</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(selectedRoom.finalPrice, selectedRoom.currency)}</span>
              </div>

              <div className="text-xs text-muted-foreground">
                Prices are in {selectedRoom.currency} and include all applicable taxes and fees
              </div>

              <Separator />

              {/* Terms and Conditions */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={onAgreedToTermsChange}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <button type="button" className="text-primary underline" onClick={() => setShowTerms(!showTerms)}>
                      Terms and Conditions
                    </button>{" "}
                    and{" "}
                    <button type="button" className="text-primary underline">
                      Privacy Policy
                    </button>
                  </Label>
                </div>

                {showTerms && (
                  <div className="text-xs text-muted-foreground p-3 bg-muted rounded border max-h-32 overflow-y-auto">
                    <p className="mb-2">
                      <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before check-in. Late
                      cancellations may incur charges.
                    </p>
                    <p className="mb-2">
                      <strong>Check-in/Check-out:</strong> Standard check-in is 3:00 PM, check-out is 11:00 AM.
                    </p>
                    <p>
                      <strong>Payment:</strong> Payment will be processed upon confirmation. Additional charges may
                      apply for services used during your stay.
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button onClick={onSubmit} disabled={!agreedToTerms || isLoading} className="w-full" size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Reservation...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
                <Button variant="outline" onClick={onBack} disabled={isLoading} className="w-full bg-transparent">
                  Back to Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Check, Calendar, Users, MapPin, Phone, Mail, Download, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DateUtils } from "@/lib/utils/date-utils"
import type { Reservation } from "@/lib/types/booking"

interface BookingConfirmationProps {
  reservation: Reservation
  onNewBooking: () => void
  className?: string
}

export function BookingConfirmation({ reservation, onNewBooking, className }: BookingConfirmationProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const handleDownloadConfirmation = () => {
    // Implementation for downloading confirmation
    console.log("[v0] Download confirmation for reservation:", reservation.id)
  }

  const handleShareConfirmation = () => {
    // Implementation for sharing confirmation
    console.log("[v0] Share confirmation for reservation:", reservation.id)
  }

  return (
    <div className={className}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success Header */}
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your reservation has been successfully created. You will receive a confirmation email shortly.
            </p>
          </CardContent>
        </Card>

        {/* Reservation Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Reservation Details</CardTitle>
              <Badge variant="secondary">Confirmed</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Confirmation Number</div>
                <div className="font-mono font-bold text-lg">{reservation.id.slice(-8).toUpperCase()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Booking Date</div>
                <div className="font-medium">{DateUtils.toDisplayFormat(reservation.createdAt)}</div>
              </div>
            </div>

            <Separator />

            {/* Room Information */}
            <div className="space-y-3">
              <h3 className="font-semibold">Room Information</h3>
              <div className="flex gap-4">
                <div className="w-20 h-14 bg-muted rounded overflow-hidden flex-shrink-0">
                  <img
                    src={
                      reservation.roomType.images[0] ||
                      `/placeholder.svg?height=70&width=100&query=${encodeURIComponent(reservation.roomType.name + " hotel room") || "/placeholder.svg"}`
                    }
                    alt={reservation.roomType.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{reservation.roomType.name}</div>
                  <div className="text-sm text-muted-foreground">{reservation.roomType.description}</div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{reservation.roomType.capacity.adults + reservation.roomType.capacity.children} guests</span>
                    <span>{reservation.roomType.bedConfiguration}</span>
                    <span>{reservation.roomType.size}m²</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Stay Details */}
            <div className="space-y-3">
              <h3 className="font-semibold">Stay Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Check-in</div>
                    <div className="text-sm text-muted-foreground">
                      {DateUtils.toDisplayFormat(reservation.checkInDate)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Check-out</div>
                    <div className="text-sm text-muted-foreground">
                      {DateUtils.toDisplayFormat(reservation.checkOutDate)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Guests</div>
                  <div className="text-sm text-muted-foreground">
                    {reservation.guests.adults} adult{reservation.guests.adults > 1 ? "s" : ""}
                    {reservation.guests.children > 0 &&
                      `, ${reservation.guests.children} child${reservation.guests.children > 1 ? "ren" : ""}`}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium">
                  {reservation.totalNights} night{reservation.totalNights > 1 ? "s" : ""} stay
                </div>
              </div>
            </div>

            <Separator />

            {/* Guest Information */}
            <div className="space-y-3">
              <h3 className="font-semibold">Guest Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-medium">
                    {reservation.guest.firstName} {reservation.guest.lastName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Mail className="h-4 w-4" />
                    {reservation.guest.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {reservation.guest.phone}
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <div>{reservation.guest.address.street}</div>
                      <div>
                        {reservation.guest.address.city}
                        {reservation.guest.address.state && `, ${reservation.guest.address.state}`}
                      </div>
                      <div>{reservation.guest.address.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {reservation.specialRequests && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold">Special Requests</h3>
                  <div className="text-sm whitespace-pre-line p-3 bg-muted rounded">{reservation.specialRequests}</div>
                </div>
              </>
            )}

            <Separator />

            {/* Price Summary */}
            <div className="space-y-3">
              <h3 className="font-semibold">Price Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Room rate ({reservation.totalNights} nights)</span>
                  <span>{formatCurrency(reservation.baseAmount, reservation.currency)}</span>
                </div>
                {reservation.taxes > 0 && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Taxes & fees</span>
                    <span>{formatCurrency(reservation.taxes, reservation.currency)}</span>
                  </div>
                )}
                {reservation.fees > 0 && (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service fees</span>
                    <span>{formatCurrency(reservation.fees, reservation.currency)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span>{formatCurrency(reservation.totalAmount, reservation.currency)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleDownloadConfirmation} variant="outline" className="flex-1 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Download Confirmation
          </Button>
          <Button onClick={handleShareConfirmation} variant="outline" className="flex-1 bg-transparent">
            <Share className="mr-2 h-4 w-4" />
            Share Confirmation
          </Button>
          <Button onClick={onNewBooking} className="flex-1">
            Make Another Booking
          </Button>
        </div>

        {/* Important Information */}
        <Card>
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Please bring a valid photo ID and the credit card used for booking at check-in</p>
            <p>• Check-in time is 3:00 PM and check-out time is 11:00 AM</p>
            <p>• For any changes or cancellations, please contact us at least 24 hours in advance</p>
            <p>• A confirmation email has been sent to {reservation.guest.email}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

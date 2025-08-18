"use client"

import { Check, Download, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DateUtils } from "@/lib/utils/date-utils"
import type { Reservation } from "@/lib/types/booking"

interface PaymentConfirmationProps {
  reservation: Reservation
  transactionId: string
  onDownloadReceipt: () => void
  onEmailReceipt: () => void
  onNewBooking: () => void
  className?: string
}

export function PaymentConfirmation({
  reservation,
  transactionId,
  onDownloadReceipt,
  onEmailReceipt,
  onNewBooking,
  className,
}: PaymentConfirmationProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
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
            <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground">Your payment has been processed and your reservation is confirmed.</p>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Transaction ID</div>
                <div className="font-mono font-bold">{transactionId}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Payment Date</div>
                <div className="font-medium">{DateUtils.toDisplayFormat(new Date())}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Amount Paid</div>
                <div className="text-xl font-bold text-green-600">
                  {formatCurrency(reservation.totalAmount, reservation.currency)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Payment Status</div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
              </div>
            </div>

            <Separator />

            {/* Reservation Summary */}
            <div className="space-y-3">
              <h3 className="font-semibold">Reservation Summary</h3>
              <div className="flex gap-3">
                <div className="w-16 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                  <img
                    src={
                      reservation.roomType.images[0] ||
                      `/placeholder.svg?height=60&width=80&query=${encodeURIComponent(reservation.roomType.name + " hotel room") || "/placeholder.svg"}`
                    }
                    alt={reservation.roomType.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{reservation.roomType.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {DateUtils.toDisplayFormat(reservation.checkInDate)} -{" "}
                    {DateUtils.toDisplayFormat(reservation.checkOutDate)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {reservation.totalNights} night{reservation.totalNights > 1 ? "s" : ""} •{" "}
                    {reservation.guests.adults} adult{reservation.guests.adults > 1 ? "s" : ""}
                    {reservation.guests.children > 0 &&
                      `, ${reservation.guests.children} child${reservation.guests.children > 1 ? "ren" : ""}`}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confirmation Number</span>
                <Badge variant="outline">{reservation.id.slice(-8).toUpperCase()}</Badge>
              </div>
            </div>

            <Separator />

            {/* Price Breakdown */}
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
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button onClick={onDownloadReceipt} variant="outline" className="bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          <Button onClick={onEmailReceipt} variant="outline" className="bg-transparent">
            <Mail className="mr-2 h-4 w-4" />
            Email Receipt
          </Button>
          <Button onClick={onNewBooking}>
            <Calendar className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </div>

        {/* Important Information */}
        <Card>
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• A confirmation email has been sent to {reservation.guest.email}</p>
            <p>• Please bring a valid photo ID and this confirmation at check-in</p>
            <p>• Check-in time is 3:00 PM and check-out time is 11:00 AM</p>
            <p>• For any questions or changes, please contact us with your confirmation number</p>
            <p>• Keep your transaction ID ({transactionId}) for your records</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

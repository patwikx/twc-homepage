"use client"

import { Shield, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { DateUtils } from "@/lib/utils/date-utils"
import type { Reservation } from "@/lib/types/booking"

interface PaymentSummaryProps {
  reservation: Reservation
  className?: string
}

export function PaymentSummary({ reservation, className }: PaymentSummaryProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Reservation Details */}
        <div className="space-y-3">
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
                {reservation.guests.adults} adult{reservation.guests.adults > 1 ? "s" : ""}
                {reservation.guests.children > 0 &&
                  `, ${reservation.guests.children} child${reservation.guests.children > 1 ? "ren" : ""}`}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Confirmation</span>
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
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-lg font-bold">
          <span>Total to Pay</span>
          <span>{formatCurrency(reservation.totalAmount, reservation.currency)}</span>
        </div>

        <div className="text-xs text-muted-foreground">
          All prices are in {reservation.currency} and include applicable taxes
        </div>

        <Separator />

        {/* Security Features */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-green-600" />
            <span>256-bit SSL encryption</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-green-600" />
            <span>PCI DSS compliant</span>
          </div>
          <div className="text-xs text-muted-foreground">Your payment information is secure and encrypted</div>
        </div>
      </CardContent>
    </Card>
  )
}

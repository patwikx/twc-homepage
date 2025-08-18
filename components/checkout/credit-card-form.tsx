"use client"

import { useState } from "react"
import { CreditCard, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PaymentDetails } from "@/lib/types/booking"

interface CreditCardFormProps {
  paymentDetails: PaymentDetails
  onPaymentDetailsChange: (details: Partial<PaymentDetails>) => void
  className?: string
}

export function CreditCardForm({ paymentDetails, onPaymentDetailsChange, className }: CreditCardFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value)
    if (formatted.replace(/\s/g, "").length <= 16) {
      onPaymentDetailsChange({ cardNumber: formatted })
      if (errors.cardNumber) {
        setErrors((prev) => ({ ...prev, cardNumber: "" }))
      }
    }
  }

  const handleExpiryChange = (field: "expiryMonth" | "expiryYear", value: string) => {
    onPaymentDetailsChange({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleCvvChange = (value: string) => {
    // Only allow digits and limit to 4 characters
    const digits = value.replace(/\D/g, "").slice(0, 4)
    onPaymentDetailsChange({ cvv: digits })
    if (errors.cvv) {
      setErrors((prev) => ({ ...prev, cvv: "" }))
    }
  }

  const handleCardHolderNameChange = (value: string) => {
    onPaymentDetailsChange({ cardHolderName: value })
    if (errors.cardHolderName) {
      setErrors((prev) => ({ ...prev, cardHolderName: "" }))
    }
  }

  // Generate month and year options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0")
    return { value: month, label: month }
  })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => {
    const year = (currentYear + i).toString()
    return { value: year, label: year }
  })

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Card Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Card Number */}
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number *</Label>
          <Input
            id="cardNumber"
            value={paymentDetails.cardNumber || ""}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className={errors.cardNumber ? "border-destructive" : ""}
            maxLength={19} // 16 digits + 3 spaces
          />
          {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
        </div>

        {/* Expiry Date and CVV */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryMonth">Month *</Label>
            <Select
              value={paymentDetails.expiryMonth || ""}
              onValueChange={(value) => handleExpiryChange("expiryMonth", value)}
            >
              <SelectTrigger className={errors.expiryMonth ? "border-destructive" : ""}>
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.expiryMonth && <p className="text-sm text-destructive">{errors.expiryMonth}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryYear">Year *</Label>
            <Select
              value={paymentDetails.expiryYear || ""}
              onValueChange={(value) => handleExpiryChange("expiryYear", value)}
            >
              <SelectTrigger className={errors.expiryYear ? "border-destructive" : ""}>
                <SelectValue placeholder="YYYY" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.expiryYear && <p className="text-sm text-destructive">{errors.expiryYear}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              value={paymentDetails.cvv || ""}
              onChange={(e) => handleCvvChange(e.target.value)}
              placeholder="123"
              className={errors.cvv ? "border-destructive" : ""}
              maxLength={4}
            />
            {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
          </div>
        </div>

        {/* Cardholder Name */}
        <div className="space-y-2">
          <Label htmlFor="cardHolderName">Cardholder Name *</Label>
          <Input
            id="cardHolderName"
            value={paymentDetails.cardHolderName || ""}
            onChange={(e) => handleCardHolderNameChange(e.target.value)}
            placeholder="John Doe"
            className={errors.cardHolderName ? "border-destructive" : ""}
          />
          {errors.cardHolderName && <p className="text-sm text-destructive">{errors.cardHolderName}</p>}
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            Your payment information is encrypted and secure. We never store your card details.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

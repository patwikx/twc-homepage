"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Guest } from "@/lib/types/booking"

interface BillingAddressFormProps {
  billingAddress: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
    sameAsGuest: boolean
  }
  guest?: Guest
  onBillingAddressChange: (address: Partial<BillingAddressFormProps["billingAddress"]>) => void
  className?: string
}

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "Philippines",
  // Add more countries as needed
]

export function BillingAddressForm({
  billingAddress,
  guest,
  onBillingAddressChange,
  className,
}: BillingAddressFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSameAsGuestChange = (checked: boolean) => {
    onBillingAddressChange({ sameAsGuest: checked })
    if (checked && guest) {
      // Copy guest address to billing address
      onBillingAddressChange({
        street: guest.address.street,
        city: guest.address.city,
        state: guest.address.state,
        country: guest.address.country,
        zipCode: guest.address.zipCode,
      })
    }
    // Clear errors when toggling
    setErrors({})
  }

  const handleFieldChange = (field: string, value: string) => {
    onBillingAddressChange({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Billing Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Same as Guest Address Option */}
        {guest && (
          <div className="flex items-center space-x-2">
            <Checkbox id="sameAsGuest" checked={billingAddress.sameAsGuest} onCheckedChange={handleSameAsGuestChange} />
            <Label htmlFor="sameAsGuest" className="cursor-pointer">
              Same as guest address
            </Label>
          </div>
        )}

        {/* Billing Address Fields */}
        {!billingAddress.sameAsGuest && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="billingStreet">Street Address *</Label>
              <Input
                id="billingStreet"
                value={billingAddress.street}
                onChange={(e) => handleFieldChange("street", e.target.value)}
                placeholder="Enter street address"
                className={errors.street ? "border-destructive" : ""}
              />
              {errors.street && <p className="text-sm text-destructive">{errors.street}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billingCity">City *</Label>
                <Input
                  id="billingCity"
                  value={billingAddress.city}
                  onChange={(e) => handleFieldChange("city", e.target.value)}
                  placeholder="Enter city"
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingState">State/Province</Label>
                <Input
                  id="billingState"
                  value={billingAddress.state}
                  onChange={(e) => handleFieldChange("state", e.target.value)}
                  placeholder="Enter state/province"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billingCountry">Country *</Label>
                <Select value={billingAddress.country} onValueChange={(value) => handleFieldChange("country", value)}>
                  <SelectTrigger className={errors.country ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingZipCode">ZIP/Postal Code *</Label>
                <Input
                  id="billingZipCode"
                  value={billingAddress.zipCode}
                  onChange={(e) => handleFieldChange("zipCode", e.target.value)}
                  placeholder="Enter ZIP/postal code"
                  className={errors.zipCode ? "border-destructive" : ""}
                />
                {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Display Guest Address when Same as Guest is checked */}
        {billingAddress.sameAsGuest && guest && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm">
              <div className="font-medium">Billing address (same as guest):</div>
              <div className="text-muted-foreground mt-1">
                <div>{guest.address.street}</div>
                <div>
                  {guest.address.city}
                  {guest.address.state && `, ${guest.address.state}`}
                </div>
                <div>{guest.address.country}</div>
                {guest.address.zipCode && <div>{guest.address.zipCode}</div>}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

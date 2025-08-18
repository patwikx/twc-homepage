"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { Guest } from "@/lib/types/booking"

interface GuestInfoFormProps {
  guest: Guest
  onGuestUpdate: (guest: Partial<Guest>) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
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

const idTypes = [
  { value: "passport", label: "Passport" },
  { value: "drivers-license", label: "Driver's License" },
  { value: "national-id", label: "National ID" },
]

export function GuestInfoForm({ guest, onGuestUpdate, onNext, onBack, isLoading, className }: GuestInfoFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!guest.firstName.trim()) newErrors.firstName = "First name is required"
    if (!guest.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!guest.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(guest.email)) newErrors.email = "Please enter a valid email"
    if (!guest.phone.trim()) newErrors.phone = "Phone number is required"
    if (!guest.address.street.trim()) newErrors.street = "Street address is required"
    if (!guest.address.city.trim()) newErrors.city = "City is required"
    if (!guest.address.country.trim()) newErrors.country = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const updateField = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      onGuestUpdate({
        [parent]: {
          ...(guest as any)[parent],
          [child]: value,
        },
      })
    } else {
      onGuestUpdate({ [field]: value })
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Guest Information</CardTitle>
        <p className="text-sm text-muted-foreground">Please provide your details for the reservation</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={guest.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                placeholder="Enter your first name"
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={guest.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="Enter your last name"
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={guest.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Enter your email"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={guest.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="Enter your phone number"
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={guest.dateOfBirth}
                onChange={(e) => updateField("dateOfBirth", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select value={guest.nationality} onValueChange={(value) => updateField("nationality", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Address</h3>
          <div className="space-y-2">
            <Label htmlFor="street">Street Address *</Label>
            <Input
              id="street"
              value={guest.address.street}
              onChange={(e) => updateField("address.street", e.target.value)}
              placeholder="Enter your street address"
              className={errors.street ? "border-destructive" : ""}
            />
            {errors.street && <p className="text-sm text-destructive">{errors.street}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={guest.address.city}
                onChange={(e) => updateField("address.city", e.target.value)}
                placeholder="Enter your city"
                className={errors.city ? "border-destructive" : ""}
              />
              {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={guest.address.state}
                onChange={(e) => updateField("address.state", e.target.value)}
                placeholder="Enter your state/province"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select value={guest.address.country} onValueChange={(value) => updateField("address.country", value)}>
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
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              <Input
                id="zipCode"
                value={guest.address.zipCode}
                onChange={(e) => updateField("address.zipCode", e.target.value)}
                placeholder="Enter your ZIP/postal code"
              />
            </div>
          </div>
        </div>

        {/* Identification */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Identification (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idType">ID Type</Label>
              <Select value={guest.idType} onValueChange={(value: any) => updateField("idType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  {idTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                value={guest.idNumber}
                onChange={(e) => updateField("idNumber", e.target.value)}
                placeholder="Enter your ID number"
              />
            </div>
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please correct the errors above before proceeding.</AlertDescription>
          </Alert>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack} disabled={isLoading}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={isLoading}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

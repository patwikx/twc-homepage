"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface BookingPreferencesProps {
  specialRequests: string
  onSpecialRequestsChange: (requests: string) => void
  onNext: () => void
  onBack: () => void
  isLoading?: boolean
  className?: string
}

const commonRequests = [
  "Early check-in",
  "Late check-out",
  "High floor room",
  "Quiet room",
  "Room with view",
  "Extra pillows",
  "Extra towels",
  "Airport transfer",
  "Baby crib",
  "Wheelchair accessible",
]

export function BookingPreferences({
  specialRequests,
  onSpecialRequestsChange,
  onNext,
  onBack,
  isLoading,
  className,
}: BookingPreferencesProps) {
  const handleQuickRequest = (request: string) => {
    const currentRequests = specialRequests.split("\n").filter((r) => r.trim())
    if (currentRequests.includes(request)) {
      // Remove request
      const updatedRequests = currentRequests.filter((r) => r !== request)
      onSpecialRequestsChange(updatedRequests.join("\n"))
    } else {
      // Add request
      const updatedRequests = [...currentRequests, request]
      onSpecialRequestsChange(updatedRequests.join("\n"))
    }
  }

  const isRequestSelected = (request: string) => {
    return specialRequests.split("\n").includes(request)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Preferences & Special Requests</CardTitle>
        <p className="text-sm text-muted-foreground">
          Let us know if you have any special requests or preferences for your stay
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Selection */}
        <div className="space-y-3">
          <Label>Common Requests</Label>
          <div className="flex flex-wrap gap-2">
            {commonRequests.map((request) => (
              <Badge
                key={request}
                variant={isRequestSelected(request) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => handleQuickRequest(request)}
              >
                {request}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Click on the badges above to quickly add common requests</p>
        </div>

        {/* Custom Requests */}
        <div className="space-y-2">
          <Label htmlFor="specialRequests">Additional Requests</Label>
          <Textarea
            id="specialRequests"
            value={specialRequests}
            onChange={(e) => onSpecialRequestsChange(e.target.value)}
            placeholder="Please let us know if you have any special requests or requirements for your stay..."
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            We'll do our best to accommodate your requests, though they cannot be guaranteed
          </p>
        </div>

        {/* Important Notes */}
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Please Note:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Special requests are subject to availability and may incur additional charges</li>
            <li>• Early check-in and late check-out requests will be confirmed closer to your arrival date</li>
            <li>• For urgent requests, please contact the hotel directly after booking</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack} disabled={isLoading}>
            Back
          </Button>
          <Button onClick={onNext} disabled={isLoading}>
            Continue to Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

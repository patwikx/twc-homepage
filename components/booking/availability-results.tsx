"use client"

import type React from "react"

import { Check, Users, Bed, Wifi, Car, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DateUtils } from "@/lib/utils/date-utils"
import type { AvailabilityResponse, RoomAvailability } from "@/lib/types/booking"

interface AvailabilityResultsProps {
  availability: AvailabilityResponse
  onSelectRoom: (roomAvailability: RoomAvailability) => void
  className?: string
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
  // Add more as needed
}

export function AvailabilityResults({ availability, onSelectRoom, className }: AvailabilityResultsProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const getRoomAmenityIcons = (amenities: string[]) => {
    return amenities.slice(0, 3).map((amenity) => {
      const IconComponent = amenityIcons[amenity.toLowerCase()] || Bed
      return <IconComponent key={amenity} className="h-4 w-4 text-muted-foreground" />
    })
  }

  if (!availability.availableRooms.length) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No rooms available</h3>
            <p className="text-muted-foreground">
              Sorry, no rooms are available for your selected dates. Please try different dates.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Available Rooms</h3>
            <p className="text-sm text-muted-foreground">
              {availability.totalNights} night{availability.totalNights > 1 ? "s" : ""} •{" "}
              {DateUtils.toDisplayFormat(availability.checkInDate)} -{" "}
              {DateUtils.toDisplayFormat(availability.checkOutDate)}
            </p>
          </div>
          <Badge variant="secondary">
            {availability.availableRooms.length} room{availability.availableRooms.length > 1 ? "s" : ""} available
          </Badge>
        </div>

        {/* Room Results */}
        <div className="space-y-4">
          {availability.availableRooms.map((room) => (
            <Card key={room.roomTypeId} className="overflow-hidden">
              <div className="md:flex">
                {/* Room Image */}
                <div className="md:w-1/3">
                  <div className="aspect-video md:aspect-square bg-muted relative overflow-hidden">
                    <img
                      src={
                        room.roomType.images[0] ||
                        `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(room.roomType.name + " hotel room")}`
                      }
                      alt={room.roomType.name}
                      className="w-full h-full object-cover"
                    />
                    {!room.isAvailable && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Not Available</Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Room Details */}
                <div className="md:w-2/3 p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-semibold">{room.roomType.name}</h4>
                          <p className="text-muted-foreground">{room.roomType.description}</p>
                        </div>
                        {room.availableRooms > 0 && <Badge variant="outline">{room.availableRooms} left</Badge>}
                      </div>

                      {/* Room Features */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>Up to {room.roomType.capacity.adults + room.roomType.capacity.children} guests</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            <span>{room.roomType.bedConfiguration}</span>
                          </div>
                          <div>
                            <span>{room.roomType.size}m²</span>
                          </div>
                        </div>

                        {/* Amenities */}
                        {room.roomType.amenities.length > 0 && (
                          <div className="flex items-center gap-2">
                            {getRoomAmenityIcons(room.roomType.amenities)}
                            <span className="text-sm text-muted-foreground">
                              {room.roomType.amenities.slice(0, 3).join(", ")}
                              {room.roomType.amenities.length > 3 && ` +${room.roomType.amenities.length - 3} more`}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Restrictions */}
                      {room.restrictions && room.restrictions.length > 0 && (
                        <div className="mb-4">
                          <div className="text-sm text-amber-600">{room.restrictions.join(", ")}</div>
                        </div>
                      )}
                    </div>

                    <Separator className="my-4" />

                    {/* Pricing and Booking */}
                    <div className="flex items-end justify-between">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(room.pricePerNight, room.currency)} per night
                        </div>
                        <div className="text-2xl font-bold">{formatCurrency(room.finalPrice, room.currency)}</div>
                        <div className="text-xs text-muted-foreground">
                          Total for {availability.totalNights} night{availability.totalNights > 1 ? "s" : ""}
                          {room.taxes > 0 && ` • Includes ${formatCurrency(room.taxes, room.currency)} taxes`}
                        </div>
                      </div>

                      <Button
                        onClick={() => onSelectRoom(room)}
                        disabled={!room.isAvailable}
                        size="lg"
                        className="min-w-[120px]"
                      >
                        {room.isAvailable ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Select Room
                          </>
                        ) : (
                          "Unavailable"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

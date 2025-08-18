"use client"

import type React from "react"

import { useState } from "react"
import { X, Check, Users, Bed, Maximize, Wifi, Car, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { RoomAvailability } from "@/lib/types/booking"

interface RoomComparisonProps {
  rooms: RoomAvailability[]
  onRemoveRoom: (roomTypeId: string) => void
  onSelectRoom: (room: RoomAvailability) => void
  className?: string
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
}

export function RoomComparison({ rooms, onRemoveRoom, onSelectRoom, className }: RoomComparisonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const getAllAmenities = () => {
    const allAmenities = new Set<string>()
    rooms.forEach((room) => {
      room.roomType.amenities.forEach((amenity) => allAmenities.add(amenity))
    })
    return Array.from(allAmenities).sort()
  }

  const hasAmenity = (room: RoomAvailability, amenity: string) => {
    return room.roomType.amenities.some((a) => a.toLowerCase() === amenity.toLowerCase())
  }

  if (rooms.length === 0) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          Compare Rooms ({rooms.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Room Comparison</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <Card key={room.roomTypeId} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{room.roomType.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 -mt-1 -mr-1"
                    onClick={() => onRemoveRoom(room.roomTypeId)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Room Image */}
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={
                      room.roomType.images[0] ||
                      `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(room.roomType.name + " hotel room") || "/placeholder.svg"}`
                    }
                    alt={room.roomType.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Basic Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{room.roomType.capacity.adults + room.roomType.capacity.children}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{room.roomType.bedConfiguration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      <span>{room.roomType.size}m²</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{room.roomType.description}</p>
                </div>

                <Separator />

                {/* Amenities Comparison */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Amenities</h4>
                  <div className="space-y-1">
                    {getAllAmenities().map((amenity) => {
                      const hasIt = hasAmenity(room, amenity)
                      const IconComponent = amenityIcons[amenity.toLowerCase()] || Check
                      return (
                        <div key={amenity} className="flex items-center gap-2 text-sm">
                          <div
                            className={`w-4 h-4 flex items-center justify-center ${hasIt ? "text-green-600" : "text-muted-foreground"}`}
                          >
                            {hasIt ? <IconComponent className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          </div>
                          <span className={hasIt ? "text-foreground" : "text-muted-foreground line-through"}>
                            {amenity}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(room.pricePerNight, room.currency)} per night
                    </div>
                    <div className="text-lg font-bold">{formatCurrency(room.finalPrice, room.currency)}</div>
                    <div className="text-xs text-muted-foreground">Total price</div>
                  </div>

                  {room.availableRooms > 0 && (
                    <Badge variant="outline" className="w-full justify-center">
                      {room.availableRooms} rooms left
                    </Badge>
                  )}
                </div>

                {/* Select Button */}
                <Button
                  onClick={() => {
                    onSelectRoom(room)
                    setIsOpen(false)
                  }}
                  disabled={!room.isAvailable}
                  className="w-full"
                >
                  {room.isAvailable ? "Select Room" : "Unavailable"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {rooms.length > 1 && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Quick Comparison</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Price Range:</span>
                <div className="font-medium">
                  {formatCurrency(Math.min(...rooms.map((r) => r.pricePerNight)), rooms[0].currency)} -{" "}
                  {formatCurrency(Math.max(...rooms.map((r) => r.pricePerNight)), rooms[0].currency)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Max Capacity:</span>
                <div className="font-medium">
                  {Math.max(...rooms.map((r) => r.roomType.capacity.adults + r.roomType.capacity.children))} guests
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Largest Room:</span>
                <div className="font-medium">{Math.max(...rooms.map((r) => r.roomType.size))}m²</div>
              </div>
              <div>
                <span className="text-muted-foreground">Available:</span>
                <div className="font-medium">{rooms.filter((r) => r.isAvailable).length} rooms</div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

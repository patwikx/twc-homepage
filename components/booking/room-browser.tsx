"use client"

import { useState } from "react"
import { Plus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { RoomGallery } from "./room-gallery"
import { RoomFilters } from "./room-filters"
import { RoomComparison } from "./room-comparison"
import { useRoomFilters } from "@/hooks/use-room-filters"
import type { RoomAvailability } from "@/lib/types/booking"

interface RoomBrowserProps {
  rooms: RoomAvailability[]
  businessUnitId?: string
  onSelectRoom: (room: RoomAvailability) => void
  className?: string
}

function RoomBrowser({ rooms, businessUnitId, onSelectRoom, className }: RoomBrowserProps) {
  const [comparisonRooms, setComparisonRooms] = useState<RoomAvailability[]>([])
  const roomFilters = useRoomFilters(rooms)
  const { toast } = useToast()

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const addToComparison = (room: RoomAvailability) => {
    if (comparisonRooms.length >= 3) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 3 rooms at a time.",
        variant: "destructive",
      })
      return
    }

    if (comparisonRooms.some((r) => r.roomTypeId === room.roomTypeId)) {
      toast({
        title: "Room already added",
        description: "This room is already in your comparison list.",
        variant: "destructive",
      })
      return
    }

    setComparisonRooms((prev) => [...prev, room])
    toast({
      title: "Room added to comparison",
      description: `${room.roomType.name} has been added to your comparison list.`,
    })
  }

  const removeFromComparison = (roomTypeId: string) => {
    setComparisonRooms((prev) => prev.filter((r) => r.roomTypeId !== roomTypeId))
  }

  const isInComparison = (roomTypeId: string) => {
    return comparisonRooms.some((r) => r.roomTypeId === roomTypeId)
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <RoomFilters roomFilters={roomFilters} totalRooms={rooms.length} />
            {comparisonRooms.length > 0 && (
              <div className="mt-4">
                <RoomComparison
                  rooms={comparisonRooms}
                  onRemoveRoom={removeFromComparison}
                  onSelectRoom={onSelectRoom}
                />
              </div>
            )}
          </div>
        </div>

        {/* Room Results */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Available Rooms</h2>
                <p className="text-muted-foreground">
                  {roomFilters.filteredRooms.length} room{roomFilters.filteredRooms.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            {/* Room Cards */}
            {roomFilters.filteredRooms.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">No rooms match your criteria</h3>
                    <p className="text-muted-foreground">Try adjusting your filters to see more options.</p>
                    <Button variant="outline" onClick={roomFilters.resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {roomFilters.filteredRooms.map((room) => (
                  <Card key={room.roomTypeId} className="overflow-hidden">
                    <div className="md:flex">
                      {/* Room Gallery */}
                      <div className="md:w-2/5">
                        <RoomGallery images={room.roomType.images} roomName={room.roomType.name} className="h-full" />
                      </div>

                      {/* Room Details */}
                      <div className="md:w-3/5 p-6">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-semibold">{room.roomType.name}</h3>
                                <p className="text-muted-foreground">{room.roomType.description}</p>
                              </div>
                              <div className="flex gap-2">
                                {room.availableRooms > 0 && <Badge variant="outline">{room.availableRooms} left</Badge>}
                                {!room.isAvailable && <Badge variant="destructive">Unavailable</Badge>}
                              </div>
                            </div>

                            {/* Room Features */}
                            <div className="space-y-3 mb-4">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>
                                  Up to {room.roomType.capacity.adults + room.roomType.capacity.children} guests
                                </span>
                                <span>{room.roomType.bedConfiguration}</span>
                                <span>{room.roomType.size}m²</span>
                              </div>

                              {/* Amenities */}
                              {room.roomType.amenities.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {room.roomType.amenities.slice(0, 4).map((amenity) => (
                                    <Badge key={amenity} variant="secondary" className="text-xs">
                                      {amenity}
                                    </Badge>
                                  ))}
                                  {room.roomType.amenities.length > 4 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{room.roomType.amenities.length - 4} more
                                    </Badge>
                                  )}
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

                          {/* Pricing and Actions */}
                          <div className="flex items-end justify-between pt-4 border-t">
                            <div className="space-y-1">
                              <div className="text-sm text-muted-foreground">
                                {formatCurrency(room.pricePerNight, room.currency)} per night
                              </div>
                              <div className="text-2xl font-bold">{formatCurrency(room.finalPrice, room.currency)}</div>
                              <div className="text-xs text-muted-foreground">
                                Total price
                                {room.taxes > 0 && ` • Includes ${formatCurrency(room.taxes, room.currency)} taxes`}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addToComparison(room)}
                                disabled={isInComparison(room.roomTypeId) || comparisonRooms.length >= 3}
                              >
                                <Plus className="mr-1 h-4 w-4" />
                                {isInComparison(room.roomTypeId) ? "Added" : "Compare"}
                              </Button>
                              <Button
                                onClick={() => onSelectRoom(room)}
                                disabled={!room.isAvailable}
                                size="lg"
                                className="min-w-[120px]"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                {room.isAvailable ? "Select Room" : "Unavailable"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomBrowser

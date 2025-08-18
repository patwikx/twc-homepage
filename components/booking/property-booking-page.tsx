"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Star, Wifi, Car, Coffee, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import AvailabilitySearch from "./availability-search"
import RoomBrowser from "./room-browser"
import BookingWizard from "./booking-wizard"
import { useBookingState } from "@/hooks/use-booking-state"
import type { RoomAvailability } from "@/lib/types/booking"

interface Property {
  id: string
  name: string
  type: string
  description: string
  image: string
  location: string
  theme: string
  amenities: string[]
  highlights: string[]
}

interface PropertyBookingPageProps {
  property: Property
}

const getThemeClasses = (theme: string) => {
  switch (theme) {
    case "urban":
      return {
        gradient: "from-gray-900 to-gray-700",
        accent: "text-blue-400",
        badge: "bg-blue-100 text-blue-800",
        button: "bg-gradient-to-r from-gray-700 to-gray-900",
      }
    case "countryside":
      return {
        gradient: "from-green-900 to-green-700",
        accent: "text-green-400",
        badge: "bg-green-100 text-green-800",
        button: "bg-gradient-to-r from-green-700 to-green-900",
      }
    case "tropical":
      return {
        gradient: "from-orange-800 to-red-600",
        accent: "text-orange-400",
        badge: "bg-orange-100 text-orange-800",
        button: "bg-gradient-to-r from-orange-600 to-red-700",
      }
    case "lakeside":
      return {
        gradient: "from-blue-900 to-teal-700",
        accent: "text-teal-400",
        badge: "bg-teal-100 text-teal-800",
        button: "bg-gradient-to-r from-blue-700 to-teal-800",
      }
    default:
      return {
        gradient: "from-gray-900 to-gray-700",
        accent: "text-blue-400",
        badge: "bg-blue-100 text-blue-800",
        button: "bg-gradient-to-r from-gray-700 to-gray-900",
      }
  }
}

const amenityIcons: Record<string, any> = {
  "Free WiFi": Wifi,
  Wifi: Wifi,
  Parking: Car,
  Coffee: Coffee,
  Restaurant: Utensils,
  Dining: Utensils,
}

export default function PropertyBookingPage({ property }: PropertyBookingPageProps) {
  const [currentStep, setCurrentStep] = useState<"search" | "browse" | "book">("search")
  const [selectedRoom, setSelectedRoom] = useState<RoomAvailability | null>(null)
  const { bookingData, state } = useBookingState()
  const themeClasses = getThemeClasses(property.theme)

  const handleAvailabilitySearch = () => {
    setCurrentStep("browse")
  }

  const handleRoomSelect = (room: RoomAvailability) => {
    setSelectedRoom(room)
    setCurrentStep("book")
  }

  const handleBackToSearch = () => {
    setCurrentStep("search")
    setSelectedRoom(null)
  }

  const handleBackToBrowse = () => {
    setCurrentStep("browse")
    setSelectedRoom(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      

      {/* Property Hero */}
      <div className="relative h-96 overflow-hidden">
        <img src={property.image || "/placeholder.svg"} alt={property.name} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${themeClasses.gradient} opacity-60`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">{property.name}</h2>
            <p className="text-xl md:text-2xl mb-6 opacity-90">{property.description}</p>
            <div className="flex items-center justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
              ))}
              <span className="ml-2 text-lg">5-Star Luxury</span>
            </div>
          </div>
        </div>
      </div>

       {/* Booking Steps */}
        <div className="max-w-6xl mx-auto">
          {currentStep === "search" && (
            <Card className="mt-8">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Find Your Perfect Stay</h3>
                  <p className="text-gray-600">Search for available rooms and start your booking</p>
                </div>
                <AvailabilitySearch businessUnitId={property.id} onSearch={handleAvailabilitySearch} />
              </CardContent>
            </Card>
          )}

          {currentStep === "browse" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold">Available Rooms</h3>
                  <p className="text-gray-600">
                    {bookingData.checkIn && bookingData.checkOut
                      ? `${bookingData.checkIn.toLocaleDateString()} - ${bookingData.checkOut.toLocaleDateString()}`
                      : "Select your dates"}{" "}
                    • {bookingData.adults + bookingData.children} guests
                  </p>
                </div>
                <Button variant="outline" onClick={handleBackToSearch}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Change Dates
                </Button>
              </div>
              <RoomBrowser
                businessUnitId={property.id}
                rooms={state.availability?.availableRooms || []}
                onSelectRoom={handleRoomSelect}
              />
            </div>
          )}

          {currentStep === "book" && selectedRoom && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold">Complete Your Booking</h3>
                  <p className="text-gray-600">
                    {selectedRoom.roomType.name} at {property.name}
                  </p>
                </div>
                <Button variant="outline" onClick={handleBackToBrowse}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Change Room
                </Button>
              </div>
              <BookingWizard room={selectedRoom} businessUnitId={property.id} propertyName={property.name} />
            </div>
          )}
        </div>

      {/* Property Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Highlights */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Property Highlights</h3>
              <div className="space-y-3">
                {property.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center text-sm">
                    <div className={`w-2 h-2 rounded-full ${themeClasses.badge.split(" ")[0]} mr-3`} />
                    {highlight}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Key Amenities</h3>
              <div className="space-y-3">
                {property.amenities.map((amenity, i) => {
                  const IconComponent = amenityIcons[amenity] || Coffee
                  return (
                    <div key={i} className="flex items-center text-sm">
                      <IconComponent className="w-4 h-4 mr-3 text-gray-600" />
                      {amenity}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{property.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium">3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium">12:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

       
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users } from "lucide-react"
import Link from "next/link"
import { useProperties } from "@/hooks/use-api-data"
import { LoadingSection, ErrorSection } from "@/components/ui/loading-spinner"

const getThemeClasses = (theme: string) => {
  switch (theme) {
    case "urban":
      return {
        gradient: "from-gray-900 to-gray-700",
        accent: "text-blue-400",
        badge: "bg-blue-100 text-blue-800",
      }
    case "countryside":
      return {
        gradient: "from-green-900 to-green-700",
        accent: "text-green-400",
        badge: "bg-green-100 text-green-800",
      }
    case "tropical":
      return {
        gradient: "from-orange-800 to-red-600",
        accent: "text-orange-400",
        badge: "bg-orange-100 text-orange-800",
      }
    case "lakeside":
      return {
        gradient: "from-blue-900 to-teal-700",
        accent: "text-teal-400",
        badge: "bg-teal-100 text-teal-800",
      }
    default:
      return {
        gradient: "from-gray-900 to-gray-700",
        accent: "text-blue-400",
        badge: "bg-blue-100 text-blue-800",
      }
  }
}

export default function Properties() {
  const { data: properties, loading, error, refetch } = useProperties()

  if (loading) {
    return <LoadingSection title="Our Distinctive Properties" description="Loading our beautiful properties..." />
  }

  if (error) {
    return <ErrorSection title="Unable to load properties" message={error} onRetry={refetch} />
  }

  if (!properties || properties.length === 0) {
    return (
      <ErrorSection
        title="No properties found"
        message="We're currently updating our property listings. Please check back soon."
      />
    )
  }

  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Our Distinctive Properties</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Four unique experiences, one commitment to excellence. Discover the perfect setting for your stay in General
            Santos City and beyond.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {properties.map((property, index) => {
            const themeClasses = getThemeClasses(property.theme || "urban")

            return (
              <Card
                key={property.id}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${themeClasses.gradient} opacity-60`} />

                  {/* Property Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${themeClasses.badge} border-transparent`}>{property.type}</Badge>
                  </div>

                  {/* Rating & Location */}
                  <div className="absolute top-4 right-4 text-right">
                    <div className="flex items-center text-white mb-1">
                      {[...Array(property.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.location}
                    </div>
                  </div>

                  {/* Property Name & Description */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">{property.name}</h3>
                    <p className="text-white/90 mb-3">{property.description}</p>

                    {/* Quick Stats */}
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {property.rooms || "Multiple rooms"}
                      </span>
                      <span className={`font-semibold ${themeClasses.accent}`}>{property.price}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Property Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(property.highlights || []).map((highlight: string, i: number) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <div className={`w-2 h-2 rounded-full ${themeClasses.badge.split(" ")[0]} mr-2`} />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {(property.amenities || []).map((amenity: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex space-x-3">
                    <Link href={`/booking/${property.id}`} className="flex-1">
                      <Button
                        className={`w-full bg-gradient-to-r ${themeClasses.gradient} text-white hover:scale-105 transition-transform`}
                      >
                        Book Now
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Can&apos;t Decide? We&apos;ll Help You Choose
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our hospitality experts can recommend the perfect property based on your preferences, occasion, and
                travel needs. Get personalized recommendations today.
              </p>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 text-lg hover:scale-105 transition-transform">
                Get Property Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

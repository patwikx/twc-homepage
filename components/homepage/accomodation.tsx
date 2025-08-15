'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bed,
  Users,
  Waves,
  Mountain,
  TreePine,
  Building,
  Eye,
  Briefcase,
  Coffee,
  Wifi,
  Utensils,
  Flame,
  Leaf,
  MapPin,
  Car,
  WavesIcon,
  Shield,
  Dumbbell,
} from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const accommodations = [
  {
    resort: "Anchor Hotel",
    icon: Building,
    rooms: [
      {
        name: "Executive Suite",
        size: "45 sqm",
        guests: 2,
        price: "PHP 8,999",
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
        amenities: [
          { name: "City View", icon: Eye },
          { name: "Work Desk", icon: Briefcase },
          { name: "Mini Bar", icon: Coffee },
          { name: "Free WiFi", icon: Wifi },
        ],
        description:
          "Sophisticated urban retreat with panoramic city views and premium business amenities in the heart of General Santos.",
      },
      {
        name: "Business Deluxe",
        size: "35 sqm",
        guests: 2,
        price: "PHP 5,999",
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        amenities: [
          { name: "Work Station", icon: Briefcase },
          { name: "High-Speed WiFi", icon: Wifi },
          { name: "Coffee Machine", icon: Coffee },
          { name: "City View", icon: Eye },
        ],
        description:
          "Perfect for business travelers with dedicated workspace and modern conveniences in GenSan's business district.",
      },
    ],
  },
  {
    resort: "Dolores Farm Resort",
    icon: TreePine,
    rooms: [
      {
        name: "Farm Villa",
        size: "60 sqm",
        guests: 4,
        price: "PHP 11,999",
        image: "https://images.pexels.com/photos/6580218/pexels-photo-6580218.jpeg",
        amenities: [
          { name: "Garden View", icon: Leaf },
          { name: "Fireplace", icon: Flame },
          { name: "Organic Breakfast", icon: Utensils },
          { name: "Nature Trails", icon: MapPin },
        ],
        description: "Rustic luxury villa surrounded by organic gardens and peaceful South Cotabato countryside.",
      },
      {
        name: "Countryside Cottage",
        size: "40 sqm",
        guests: 2,
        price: "PHP 7,499",
        image: "https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg",
        amenities: [
          { name: "Private Patio", icon: Eye },
          { name: "Farm Views", icon: Leaf },
          { name: "Organic Amenities", icon: Leaf },
          { name: "Hiking Access", icon: Mountain },
        ],
        description: "Charming cottage with authentic Filipino farm experience and organic lifestyle in Dolores.",
      },
    ],
  },
  {
    resort: "Dolores Tropicana Resort",
    icon: Waves,
    rooms: [
      {
        name: "Beachfront Villa",
        size: "80 sqm",
        guests: 6,
        price: "PHP 17,999",
        image: "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg",
        amenities: [
          { name: "Private Beach", icon: WavesIcon },
          { name: "Infinity Pool", icon: WavesIcon },
          { name: "Ocean View", icon: Eye },
          { name: "Butler Service", icon: Shield },
        ],
        description:
          "Ultimate tropical luxury with direct Sarangani Bay beach access and personalized Filipino hospitality.",
      },
      {
        name: "Ocean View Suite",
        size: "50 sqm",
        guests: 3,
        price: "PHP 10,499",
        image: "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg",
        amenities: [
          { name: "Ocean Balcony", icon: Eye },
          { name: "Tropical Decor", icon: Leaf },
          { name: "Beach Access", icon: WavesIcon },
          { name: "Water Sports", icon: Dumbbell },
        ],
        description: "Elegant suite with stunning Sarangani Bay views and easy access to beach activities.",
      },
    ],
  },
  {
    resort: "Dolores Lake Resort",
    icon: Mountain,
    rooms: [
      {
        name: "Lakeside Cabin",
        size: "55 sqm",
        guests: 4,
        price: "PHP 11,399",
        image: "https://images.pexels.com/photos/7061059/pexels-photo-7061059.jpeg",
        amenities: [
          { name: "Lake View", icon: Eye },
          { name: "Private Dock", icon: Car },
          { name: "Fishing Gear", icon: Utensils },
          { name: "Mountain Views", icon: Mountain },
        ],
        description:
          "Serene lakeside retreat with private dock and premium fishing experiences in South Cotabato's mountains.",
      },
      {
        name: "Mountain Lodge",
        size: "45 sqm",
        guests: 3,
        price: "PHP 8,699",
        image: "https://images.pexels.com/photos/7546643/pexels-photo-7546643.jpeg",
        amenities: [
          { name: "Mountain View", icon: Mountain },
          { name: "Hiking Trails", icon: MapPin },
          { name: "Lake Access", icon: WavesIcon },
          { name: "Cozy Fireplace", icon: Flame },
        ],
        description: "Comfortable lodge with breathtaking mountain vistas and outdoor adventures in the Philippines.",
      },
    ],
  },
]

export default function AccommodationsShowcase() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: resort1Ref, isVisible: resort1Visible } = useScrollAnimation({ threshold: 0.1 })
  const { ref: resort2Ref, isVisible: resort2Visible } = useScrollAnimation({ threshold: 0.1 })
  const { ref: resort3Ref, isVisible: resort3Visible } = useScrollAnimation({ threshold: 0.1 })
  const { ref: resort4Ref, isVisible: resort4Visible } = useScrollAnimation({ threshold: 0.1 })
  const { ref: offersRef, isVisible: offersVisible } = useScrollAnimation({ threshold: 0.1 })

  const resortRefs = [resort1Ref, resort2Ref, resort3Ref, resort4Ref]
  const resortVisibilities = [resort1Visible, resort2Visible, resort3Visible, resort4Visible]

  return (
    <section id="accommodations" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Luxury Accommodations</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From urban sophistication in General Santos City to tropical paradise in South Cotabato, discover our
            carefully curated rooms and suites designed for every type of Filipino traveler.
          </p>
        </div>

        {accommodations.map((resort, resortIndex) => (
          <div key={resortIndex} className="mb-16">
            <div
              ref={resortRefs[resortIndex]}
              className={`flex items-center justify-center mb-8 transition-all duration-800 ease-out ${
                resortVisibilities[resortIndex] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <resort.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">{resort.resort}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {resort.rooms.map((room, roomIndex) => (
                <Card
                  key={roomIndex}
                  className={`overflow-hidden hover:shadow-xl transition-all duration-500 bg-card group hover:scale-105 ${
                    resortVisibilities[resortIndex] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: resortVisibilities[resortIndex] ? `${roomIndex * 200}ms` : "0ms",
                  }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={room.image || "/placeholder.svg"}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">{room.price}/night</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-2xl font-bold text-card-foreground">{room.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          {room.size}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {room.guests} guests
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{room.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.map((amenity, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                        >
                          <amenity.icon className="h-3 w-3" />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform duration-200">
                        Book Now
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent transform hover:scale-105 transition-transform duration-200"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Special Offers Section */}
        <div
          ref={offersRef}
          className={`mt-20 bg-card rounded-2xl p-8 text-center transition-all duration-1000 ease-out ${
            offersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-3xl font-bold text-card-foreground mb-4">Special Accommodation Packages</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book multiple nights or visit multiple resorts in General Santos City to unlock exclusive discounts and
            premium amenities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-primary/5 rounded-xl hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-lg text-card-foreground mb-2">Resort Hopping</h4>
              <p className="text-sm text-muted-foreground mb-3">Visit 2+ resorts and save 15%</p>
              <Button
                variant="outline"
                size="sm"
                className="transform hover:scale-105 transition-transform duration-200 bg-transparent"
              >
                Learn More
              </Button>
            </div>
            <div className="p-6 bg-accent/5 rounded-xl hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-lg text-card-foreground mb-2">Extended Stay</h4>
              <p className="text-sm text-muted-foreground mb-3">7+ nights with complimentary upgrades</p>
              <Button
                variant="outline"
                size="sm"
                className="transform hover:scale-105 transition-transform duration-200 bg-transparent"
              >
                Learn More
              </Button>
            </div>
            <div className="p-6 bg-secondary/5 rounded-xl hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-lg text-card-foreground mb-2">Family Package</h4>
              <p className="text-sm text-muted-foreground mb-3">Kids stay free + family activities</p>
              <Button
                variant="outline"
                size="sm"
                className="transform hover:scale-105 transition-transform duration-200 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Waves, Mountain, TreePine, Anchor, Camera, Users, Clock, MapPin, Star } from "lucide-react"

const cruiseServices = [
  {
    name: "Sunset Beach Cruise",
    location: "Dolores Tropicana Resort",
    duration: "3 hours",
    capacity: "Up to 20 guests",
    price: "PHP 4,499",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Experience breathtaking sunsets aboard our luxury catamaran with complimentary cocktails and tropical appetizers.",
    highlights: ["Sunset Views", "Open Bar", "Snorkeling Gear", "Professional Crew"],
    schedule: ["4:00 PM - 7:00 PM", "Daily departures"],
    rating: 4.9,
  },
  {
    name: "Lake Adventure Cruise",
    location: "Dolores Lake Resort",
    duration: "4 hours",
    capacity: "Up to 15 guests",
    price: "PHP 6,299",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Explore pristine mountain lakes with fishing opportunities, wildlife spotting, and gourmet lunch onboard.",
    highlights: ["Fishing Equipment", "Wildlife Spotting", "Gourmet Lunch", "Mountain Views"],
    schedule: ["9:00 AM - 1:00 PM", "Tuesday, Thursday, Saturday"],
    rating: 4.8,
  },
  {
    name: "Private Charter Experience",
    location: "Both Locations",
    duration: "Full Day",
    capacity: "Up to 12 guests",
    price: "PHP 45,399",
    image: "/placeholder.svg?height=400&width=600",
    description: "Exclusive private charter with customized itinerary, personal crew, and premium dining experience.",
    highlights: ["Private Crew", "Custom Itinerary", "Premium Dining", "Water Sports"],
    schedule: ["Flexible timing", "Advance booking required"],
    rating: 5.0,
  },
]

const activities = [
  {
    category: "Water Sports",
    icon: Waves,
    color: "bg-blue-500/10 text-blue-600",
    activities: [
      { name: "Kayaking", location: "Lake & Beach", price: "PHP 1,799/hour" },
      { name: "Paddleboarding", location: "All Locations", price: "PHP 1,499/hour" },
      { name: "Snorkeling Tours", location: "Tropicana Resort", price: "PHP 2,299/person" },
      { name: "Jet Ski Rental", location: "Beach Resort", price: "PHP 4,299/hour" },
    ],
  },
  {
    category: "Adventure & Nature",
    icon: Mountain,
    color: "bg-green-500/10 text-green-600",
    activities: [
      { name: "Hiking Trails", location: "Farm & Lake Resort", price: "Free" },
      { name: "Rock Climbing", location: "Lake Resort", price: "PHP 3,299/person" },
      { name: "Bird Watching", location: "Farm Resort", price: "PHP 1,299/person" },
      { name: "Photography Tours", location: "All Locations", price: "PHP 2,799/person" },
    ],
  },
  {
    category: "Wellness & Relaxation",
    icon: TreePine,
    color: "bg-purple-500/10 text-purple-600",
    activities: [
      { name: "Spa Treatments", location: "All Locations", price: "From PHP 6,099" },
      { name: "Yoga Classes", location: "Beach & Farm", price: "PHP 1,799/class" },
      { name: "Meditation Sessions", location: "Lake Resort", price: "PHP 1,299/session" },
      { name: "Massage Therapy", location: "All Locations", price: "From PHP 4,799" },
    ],
  },
  {
    category: "Cultural & Entertainment",
    icon: Camera,
    color: "bg-orange-500/10 text-orange-600",
    activities: [
      { name: "Local Culture Tours", location: "All Locations", price: "PHP 2,099/person" },
      { name: "Live Music Nights", location: "Anchor Hotel", price: "Free" },
      { name: "Art Workshops", location: "Farm Resort", price: "PHP 2,499/person" },
      { name: "Dance Classes", location: "Tropicana Resort", price: "PHP 1,499/class" },
    ],
  },
]

export default function ActivitiesSection() {
  return (
    <section id="activities" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Adventures & Experiences</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From luxury cruise experiences to thrilling water sports and peaceful wellness activities, discover endless
            ways to create unforgettable memories at Tropicana Resorts.
          </p>
        </div>

        {/* Featured Cruise Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Anchor className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">Beach & Lake Cruise Services</h3>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Embark on luxury cruise experiences that showcase the natural beauty of our tropical and mountain
              destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cruiseServices.map((cruise, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-card">
                <div className="relative h-64">
                  <img
                    src={cruise.image || "/placeholder.svg"}
                    alt={cruise.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">{cruise.price}/person</Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-400" />
                    <span className="text-sm">{cruise.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-card-foreground mb-2">{cruise.name}</h4>
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {cruise.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {cruise.duration}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {cruise.capacity}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{cruise.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cruise.highlights.map((highlight, idx) => (
                      <span key={idx} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="mb-4">
                    {cruise.schedule.map((time, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground">
                        {time}
                      </p>
                    ))}
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">Book Cruise</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Activities by Category */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Resort Activities</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from a wide variety of activities designed to suit every interest and adventure level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((category, index) => (
              <Card key={index} className="bg-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-full ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-2xl font-bold text-card-foreground">{category.category}</h4>
                </div>
                <div className="space-y-4">
                  {category.activities.map((activity, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <div>
                        <h5 className="font-medium text-foreground">{activity.name}</h5>
                        <p className="text-sm text-muted-foreground">{activity.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">{activity.price}</p>
                        <Button variant="outline" size="sm" className="mt-1 bg-transparent">
                          Book
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Activity Packages */}
        <div className="bg-card rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-card-foreground mb-4">Activity Packages</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Save more with our curated activity packages designed for different types of adventurers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-primary/5 rounded-xl text-center">
              <Waves className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-bold text-lg text-card-foreground mb-2">Water Adventure Package</h4>
              <p className="text-sm text-muted-foreground mb-3">Cruise + Water Sports + Snorkeling</p>
              <p className="text-2xl font-bold text-primary mb-4">PHP 9,999</p>
              <p className="text-xs text-muted-foreground mb-4">Save PHP 2,500 vs individual booking</p>
              <Button className="w-full bg-primary hover:bg-primary/90">Book Package</Button>
            </div>
            <div className="p-6 bg-accent/5 rounded-xl text-center">
              <Mountain className="h-12 w-12 text-accent mx-auto mb-4" />
              <h4 className="font-bold text-lg text-card-foreground mb-2">Adventure Explorer Package</h4>
              <p className="text-sm text-muted-foreground mb-3">Hiking + Rock Climbing + Photography Tour</p>
              <p className="text-2xl font-bold text-accent mb-4">PHP 7,499</p>
              <p className="text-xs text-muted-foreground mb-4">Save PHP 1,799 vs individual booking</p>
              <Button variant="outline" className="w-full bg-transparent">
                Book Package
              </Button>
            </div>
            <div className="p-6 bg-secondary/5 rounded-xl text-center">
              <TreePine className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h4 className="font-bold text-lg text-card-foreground mb-2">Wellness Retreat Package</h4>
              <p className="text-sm text-muted-foreground mb-3">Spa + Yoga + Meditation + Massage</p>
              <p className="text-2xl font-bold text-secondary mb-4">PHP 14,999</p>
              <p className="text-xs text-muted-foreground mb-4">Save PHP 3,799 vs individual booking</p>
              <Button variant="outline" className="w-full bg-transparent">
                Book Package
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

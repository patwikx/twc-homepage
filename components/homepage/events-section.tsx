"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Heart, Briefcase, PartyPopper, Camera, Music, Utensils } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const eventTypes = [
  {
    name: "Weddings & Celebrations",
    icon: Heart,
    description: "Create magical moments with our comprehensive wedding and celebration packages.",
    image: "https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg",
    capacity: "Up to 300 guests",
    venues: ["Beachfront Pavilion", "Garden Terrace", "Lakeside Chapel", "Ballroom"],
    services: ["Wedding Planning", "Floral Design", "Photography", "Catering", "Entertainment"],
    startingPrice: "$5,999",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    name: "Corporate Events",
    icon: Briefcase,
    description: "Professional venues and services for meetings, conferences, and corporate retreats.",
    image: "https://images.pexels.com/photos/7648476/pexels-photo-7648476.jpeg",
    capacity: "Up to 500 guests",
    venues: ["Conference Center", "Executive Boardroom", "Outdoor Pavilion", "Private Dining"],
    services: ["AV Equipment", "Catering", "Team Building", "Transportation", "Accommodation"],
    startingPrice: "$2,499",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "Private Parties",
    icon: PartyPopper,
    description: "Celebrate life's special moments with customized private party experiences.",
    image: "https://images.pexels.com/photos/12919483/pexels-photo-12919483.jpeg",
    capacity: "Up to 150 guests",
    venues: ["Private Beach", "Rooftop Terrace", "Garden Pavilion", "Lakeside Deck"],
    services: ["Event Planning", "Custom Catering", "Entertainment", "Decorations", "Photography"],
    startingPrice: "$1,999",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    name: "Cultural Events",
    icon: Music,
    description: "Host cultural celebrations, festivals, and community gatherings in stunning settings.",
    image: "https://images.pexels.com/photos/27561549/pexels-photo-27561549.jpeg",
    capacity: "Up to 400 guests",
    venues: ["Amphitheater", "Cultural Center", "Open Gardens", "Waterfront Stage"],
    services: ["Stage Setup", "Sound System", "Cultural Coordination", "Catering", "Security"],
    startingPrice: "$3,499",
    color: "bg-green-500/10 text-green-600",
  },
]

const venues = [
  {
    name: "Grand Ballroom",
    location: "Anchor Hotel",
    capacity: "500 guests",
    size: "2,500 sq ft",
    features: ["Crystal Chandeliers", "Dance Floor", "Stage", "AV Equipment"],
    image: "https://images.pexels.com/photos/15451259/pexels-photo-15451259.jpeg",
  },
  {
    name: "Beachfront Pavilion",
    location: "Dolores Tropicana Resort",
    capacity: "300 guests",
    size: "Open Air",
    features: ["Ocean Views", "Natural Lighting", "Beach Access", "Sunset Views"],
    image: "https://images.pexels.com/photos/2099021/pexels-photo-2099021.jpeg",
  },
  {
    name: "Garden Terrace",
    location: "Dolores Farm Resort",
    capacity: "200 guests",
    size: "1,800 sq ft",
    features: ["Garden Views", "Organic Catering", "Natural Setting", "Farm Tours"],
    image: "https://images.pexels.com/photos/12876404/pexels-photo-12876404.jpeg",
  },
  {
    name: "Lakeside Chapel",
    location: "Dolores Lake Resort",
    capacity: "150 guests",
    size: "1,200 sq ft",
    features: ["Mountain Views", "Lake Access", "Intimate Setting", "Natural Acoustics"],
    image: "https://images.pexels.com/photos/12876410/pexels-photo-12876410.jpeg",
  },
]

const services = [
  {
    name: "Event Planning",
    icon: Calendar,
    description: "Full-service event coordination from concept to execution",
  },
  {
    name: "Catering Services",
    icon: Utensils,
    description: "Custom menus featuring local and international cuisine",
  },
  {
    name: "Photography & Video",
    icon: Camera,
    description: "Professional documentation of your special moments",
  },
  {
    name: "Entertainment",
    icon: Music,
    description: "Live music, DJs, and cultural performances",
  },
]

export default function EventsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const { ref: eventTypesRef, isVisible: eventTypesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { ref: venuesRef, isVisible: venuesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Events & Celebrations</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From intimate gatherings to grand celebrations, we handle events of any type with exceptional service and
            stunning venues across our four resort locations.
          </p>
        </div>

        {/* Event Types */}
        <div ref={eventTypesRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {eventTypes.map((eventType, index) => (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-xl transition-all duration-500 bg-card hover:scale-105 ${
                eventTypesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: eventTypesVisible ? `${index * 200}ms` : "0ms",
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={eventType.image || "/placeholder.svg"}
                  alt={eventType.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">From {eventType.startingPrice}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`p-2 rounded-full ${eventType.color}`}>
                    <eventType.icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-card-foreground mb-3">{eventType.name}</h3>
                <p className="text-muted-foreground mb-4">{eventType.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{eventType.capacity}</span>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-card-foreground mb-2">Available Venues:</h4>
                  <div className="flex flex-wrap gap-1">
                    {eventType.venues.map((venue, idx) => (
                      <span key={idx} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs">
                        {venue}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-card-foreground mb-2">Included Services:</h4>
                  <div className="flex flex-wrap gap-1">
                    {eventType.services.map((service, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform duration-200">
                    Get Quote
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent transform hover:scale-105 transition-transform duration-200"
                  >
                    View Gallery
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Event Venues */}
        <div className="mb-20">
          <div
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              venuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-3xl font-bold text-foreground mb-4">Premium Event Venues</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of stunning venues, each offering unique ambiance and world-class facilities.
            </p>
          </div>
          <div ref={venuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {venues.map((venue, index) => (
              <Card
                key={index}
                className={`overflow-hidden hover:shadow-lg transition-all duration-500 bg-card hover:scale-105 ${
                  venuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: venuesVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-lg text-card-foreground mb-1">{venue.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{venue.location}</p>
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium">{venue.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{venue.size}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    {venue.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-accent/10 text-accent px-2 py-1 rounded text-xs mr-1 mb-1"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform duration-200"
                  >
                    Book Venue
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services Overview */}
        <div className="mb-16">
          <div
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-3xl font-bold text-foreground mb-4">Comprehensive Event Services</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced team provides end-to-end event management to ensure your celebration is flawless.
            </p>
          </div>
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-card rounded-xl hover:scale-105 transition-all duration-500 ${
                  servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: servicesVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-lg text-card-foreground mb-2">{service.name}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          ref={ctaRef}
          className={`bg-card rounded-2xl p-8 text-center transition-all duration-1000 ease-out ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-3xl font-bold text-card-foreground mb-4">Ready to Plan Your Event?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our event specialists are ready to help you create an unforgettable experience. Contact us today for a
            personalized consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform duration-200"
            >
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent transform hover:scale-105 transition-transform duration-200"
            >
              Download Event Guide
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-bold text-2xl text-primary mb-1">500+</h4>
              <p className="text-sm text-muted-foreground">Events Hosted</p>
            </div>
            <div>
              <h4 className="font-bold text-2xl text-primary mb-1">4.9/5</h4>
              <p className="text-sm text-muted-foreground">Client Satisfaction</p>
            </div>
            <div>
              <h4 className="font-bold text-2xl text-primary mb-1">24/7</h4>
              <p className="text-sm text-muted-foreground">Event Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

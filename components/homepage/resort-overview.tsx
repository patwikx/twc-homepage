'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Users } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const resorts = [
  {
    name: "Anchor Hotel",
    location: "Downtown District",
    description:
      "Urban luxury meets tropical comfort in our flagship hotel, perfect for business and leisure travelers.",
    image: "https://images.pexels.com/photos/14024957/pexels-photo-14024957.jpeg",
    features: ["Business Center", "Rooftop Pool", "City Views"],
  },
  {
    name: "Dolores Farm Resort",
    location: "Countryside Retreat",
    description: "Experience authentic farm-to-table dining and peaceful countryside views in our eco-friendly resort.",
    image: "https://images.pexels.com/photos/14024023/pexels-photo-14024023.jpeg",
    features: ["Organic Farm", "Spa Treatments", "Nature Trails"],
  },
  {
    name: "Dolores Tropicana Resort",
    location: "Tropical Paradise",
    description: "Our signature tropical resort offering pristine beaches, water sports, and endless relaxation.",
    image:
      "https://media.istockphoto.com/id/1709282826/photo/a-tree-stands-tall-amidst-the-nature-of-the-vast-sea.jpg?s=2048x2048&w=is&k=20&c=qPxOeAmF5B1PmEubq1P0_4ERaVMJLa9EgBXf9bbeV7g=",
    features: ["Private Beach", "Water Sports", "Infinity Pool"],
  },
  {
    name: "Dolores Lake Resort",
    location: "Lakeside Serenity",
    description: "Tranquil lakeside accommodation with stunning mountain views and premium fishing experiences.",
    image: "https://images.pexels.com/photos/1488291/pexels-photo-1488291.png",
    features: ["Lake Activities", "Mountain Views", "Fishing Charters"],
  },
]

export default function ResortOverview() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="resorts" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Resort Collection</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four unique destinations, each offering its own distinct charm and unforgettable experiences. Choose your
            perfect escape or visit them all.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resorts.map((resort, index) => (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-xl transition-all duration-500 bg-card hover:scale-105 ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: cardsVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={resort.image || "/placeholder.svg"}
                  alt={resort.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  <Star className="inline h-4 w-4 mr-1" />
                  Premium
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">{resort.location}</span>
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-3">{resort.name}</h3>
                <p className="text-muted-foreground mb-4">{resort.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {resort.features.map((feature, idx) => (
                    <span key={idx} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform duration-200">
                  <Users className="mr-2 h-4 w-4" />
                  View Details & Book
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

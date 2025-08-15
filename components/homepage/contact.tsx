"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const contactInfo = [
  {
    resort: "Anchor Hotel",
    address: "123 Pioneer Avenue, General Santos City, South Cotabato, Philippines",
    phone: "+63 83 552-1234",
    email: "anchor@tropicana.com.ph",
    hours: "24/7 Front Desk",
  },
  {
    resort: "Dolores Farm Resort",
    address: "456 Barangay Dolores, General Santos City, South Cotabato, Philippines",
    phone: "+63 83 552-2345",
    email: "farm@tropicana.com.ph",
    hours: "6:00 AM - 10:00 PM",
  },
  {
    resort: "Dolores Tropicana Resort",
    address: "789 Sarangani Bay Drive, General Santos City, South Cotabato, Philippines",
    phone: "+63 83 552-3456",
    email: "tropicana@tropicana.com.ph",
    hours: "24/7 Front Desk",
  },
  {
    resort: "Dolores Lake Resort",
    address: "321 Lake Sebu Road, General Santos City, South Cotabato, Philippines",
    phone: "+63 83 552-4567",
    email: "lake@tropicana.com.ph",
    hours: "7:00 AM - 11:00 PM",
  },
]

export default function ContactSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { ref: resortsRef, isVisible: resortsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact & Reservations</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to experience paradise in General Santos City? Get in touch with our reservation specialists or book
            directly online for the best rates and exclusive offers.
          </p>
        </div>

        <div
          ref={contactRef}
          className={`mb-16 transition-all duration-1000 ease-out ${
            contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Card className="bg-card p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Get in Touch</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <Phone className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-card-foreground">Central Reservations</p>
                  <p className="text-muted-foreground">+63 83 552-TROP (8767)</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Mail className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-card-foreground">Email</p>
                  <p className="text-muted-foreground">reservations@tropicana.com.ph</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-card-foreground">Reservations Hours</p>
                  <p className="text-muted-foreground">24/7 Online | 8 AM - 10 PM Phone (PHT)</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div
          ref={resortsRef}
          className={`mb-16 transition-all duration-1000 ease-out ${
            resortsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Our Resort Locations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((resort, index) => (
              <Card
                key={index}
                className={`bg-card p-6 hover:shadow-lg transition-all duration-500 hover:scale-105 ${
                  resortsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: resortsVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <h4 className="font-bold text-lg text-card-foreground mb-4 text-center">{resort.resort}</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground leading-tight">{resort.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <p className="text-muted-foreground">{resort.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <p className="text-muted-foreground">{resort.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <p className="text-muted-foreground">{resort.hours}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div
          ref={servicesRef}
          className={`bg-card rounded-2xl p-8 transition-all duration-1000 ease-out ${
            servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-card-foreground mb-4">Additional Services</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Need help with special arrangements? Our concierge team is here to assist with all your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-background rounded-xl hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-lg text-foreground mb-2">Concierge Services</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Personal assistance with tours, transportation, and local recommendations
              </p>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent transform hover:scale-105 transition-transform duration-200"
              >
                Contact Concierge
              </Button>
            </div>
            <div className="text-center p-6 bg-background rounded-xl hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-lg text-foreground mb-2">Group Bookings</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Special rates and coordination for groups of 10 or more guests
              </p>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent transform hover:scale-105 transition-transform duration-200"
              >
                Group Inquiry
              </Button>
            </div>
            <div className="text-center p-6 bg-background rounded-xl hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-lg text-foreground mb-2">Travel Planning</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Complete vacation planning including flights, transfers, and activities
              </p>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent transform hover:scale-105 transition-transform duration-200"
              >
                Plan My Trip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

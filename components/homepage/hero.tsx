"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Calendar } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.3 })
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 })

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
          alt="Tropicana Resort Paradise in General Santos City"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full py-20">
        {/* Hero Content - Left Side */}
        <div
          className={`text-center lg:text-left text-white transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-1200 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            Paradise Awaits in
            <span className="block text-accent">General Santos City</span>
          </h1>
          <p
            className={`text-lg md:text-xl mb-8 text-white/90 transition-all duration-1000 ease-out delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Discover luxury and tranquility across our four stunning resort destinations in the heart of South Cotabato.
            From lakeside serenity to tropical beaches, your perfect Filipino escape is here.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 ease-out delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200"
            >
              Explore Our Resorts
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-foreground bg-transparent transform hover:scale-105 transition-transform duration-200"
            >
              View Gallery
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Card
            ref={formRef}
            className={`bg-card/95 backdrop-blur-sm p-6 lg:p-8 w-full max-w-md transition-all duration-1000 ease-out ${
              formVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Quick Booking</h3>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Check-in</label>
                  <Input type="date" className="bg-background" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Check-out</label>
                  <Input type="date" className="bg-background" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Resort</label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select resort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anchor">Anchor Hotel</SelectItem>
                      <SelectItem value="farm">Dolores Farm Resort</SelectItem>
                      <SelectItem value="tropicana">Dolores Tropicana Resort</SelectItem>
                      <SelectItem value="lake">Dolores Lake Resort</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Guests</label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5+">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Full Name</label>
                <Input placeholder="Enter your full name" className="bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Email Address</label>
                <Input type="email" placeholder="Enter your email" className="bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Phone Number</label>
                <Input type="tel" placeholder="Enter your phone number" className="bg-background" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-3 transform hover:scale-105 transition-transform duration-200">
                Check Availability & Book
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

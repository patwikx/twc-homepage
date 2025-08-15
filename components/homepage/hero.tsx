'use client'

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

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

      {/* Hero Content */}
      <div
        className={`relative z-10 text-center text-white max-w-4xl mx-auto px-4 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1
          className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-all duration-1200 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          Paradise Awaits in
          <span className="block text-accent">General Santos City</span>
        </h1>
        <p
          className={`text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto transition-all duration-1000 ease-out delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Discover luxury and tranquility across our four stunning resort destinations in the heart of South Cotabato.
          From lakeside serenity to tropical beaches, your perfect Filipino escape is here.
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 ease-out delay-600 ${
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
            Book Your Stay
          </Button>
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

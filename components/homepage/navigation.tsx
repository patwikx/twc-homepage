"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Tropicana</h1>
            <p className="text-xs text-muted-foreground -mt-1">Worldwide Corporation</p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#resorts" className="text-foreground hover:text-primary transition-colors">
                Resorts
              </a>
              <a href="#dining" className="text-foreground hover:text-primary transition-colors">
                Dining
              </a>
              <a href="#activities" className="text-foreground hover:text-primary transition-colors">
                Activities
              </a>
              <a href="#events" className="text-foreground hover:text-primary transition-colors">
                Events
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90">Book Now</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2">
              <a href="#resorts" className="block px-3 py-2 text-foreground hover:text-primary">
                Resorts
              </a>
              <a href="#dining" className="block px-3 py-2 text-foreground hover:text-primary">
                Dining
              </a>
              <a href="#activities" className="block px-3 py-2 text-foreground hover:text-primary">
                Activities
              </a>
              <a href="#events" className="block px-3 py-2 text-foreground hover:text-primary">
                Events
              </a>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:text-primary">
                Contact
              </a>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90">Book Now</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

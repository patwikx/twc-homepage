"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function Footer() {
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          ref={footerRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ease-out ${
            footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Company Info */}
          <div
            className={`transition-all duration-800 ease-out ${
              footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: footerVisible ? "0ms" : "0ms" }}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Tropicana</h3>
            <p className="text-xs text-muted-foreground -mt-2 mb-4">Worldwide Corporation</p>
            <p className="text-muted-foreground mb-6">
              Creating unforgettable experiences across four stunning resort destinations. Your paradise awaits.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:scale-110 transition-transform duration-200">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:scale-110 transition-transform duration-200">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:scale-110 transition-transform duration-200">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:scale-110 transition-transform duration-200">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-800 ease-out ${
              footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: footerVisible ? "150ms" : "0ms" }}
          >
            <h4 className="font-bold text-card-foreground mb-4">Our Resorts</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Anchor Hotel
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Dolores Farm Resort
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Dolores Tropicana Resort
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Dolores Lake Resort
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div
            className={`transition-all duration-800 ease-out ${
              footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: footerVisible ? "300ms" : "0ms" }}
          >
            <h4 className="font-bold text-card-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Accommodations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Cafe Rodrigo Restaurant
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Beach & Lake Cruises
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Event Planning
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Activities & Tours
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div
            className={`transition-all duration-800 ease-out ${
              footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: footerVisible ? "450ms" : "0ms" }}
          >
            <h4 className="font-bold text-card-foreground mb-4">Stay Connected</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive exclusive offers and updates from Tropicana Resorts.
            </p>
            <div className="space-y-3">
              <Input placeholder="Enter your email" className="bg-background" />
              <Button className="w-full bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform duration-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-card-foreground">Central Reservations</p>
                <p className="text-sm text-muted-foreground">+1 (555) 000-TROP (8767)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-card-foreground">Email</p>
                <p className="text-sm text-muted-foreground">reservations@tropicana.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-card-foreground">Headquarters</p>
                <p className="text-sm text-muted-foreground">Tropical Paradise Islands</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 Tropicana Worldwide Corporation. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}

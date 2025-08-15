"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Properties', href: '#properties' },
  { name: 'Dining', href: '#dining' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-3 h-3" />
              <span>+63 83 552 1234</span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Mail className="w-3 h-3" />
              <span>info@tropicana-worldwide.com</span>
            </div>
            <div className="hidden lg:flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>General Santos City, Philippines</span>
            </div>
          </div>
          <div className="text-xs">
            Follow us on social media for exclusive offers
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={cn(
        "fixed top-8 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-lg" 
          : "bg-transparent"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              href="#home" 
              className="flex items-center space-x-3"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
            >
              <div className="tropical-gradient w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">T</span>
              </div>
              <div>
                <h1 className={cn(
                  "font-display font-bold text-lg lg:text-xl",
                  isScrolled ? "text-gray-900" : "text-white"
                )}>
                  Tropicana Worldwide
                </h1>
                <p className={cn(
                  "text-xs lg:text-sm",
                  isScrolled ? "text-gray-600" : "text-white/80"
                )}>
                  Luxury Hospitality
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "text-sm font-medium hover:text-primary transition-colors",
                    isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-amber-300"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button 
                className="hidden md:flex tropical-gradient text-white hover:scale-105 transition-transform"
                onClick={() => scrollToSection('#contact')}
              >
                Book Now
              </Button>
              
              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={cn(
                      "lg:hidden",
                      isScrolled ? "text-gray-900" : "text-white"
                    )}
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-6 mt-6">
                    <Link href="#home" className="flex items-center space-x-3">
                      <div className="tropical-gradient w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">T</span>
                      </div>
                      <div>
                        <h2 className="font-display font-bold">Tropicana Worldwide</h2>
                        <p className="text-sm text-muted-foreground">Luxury Hospitality</p>
                      </div>
                    </Link>
                    
                    <nav className="flex flex-col space-y-4">
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => scrollToSection(item.href)}
                          className="text-left text-lg font-medium hover:text-primary transition-colors"
                        >
                          {item.name}
                        </button>
                      ))}
                    </nav>
                    
                    <Button 
                      className="tropical-gradient text-white w-full"
                      onClick={() => scrollToSection('#contact')}
                    >
                      Book Now
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

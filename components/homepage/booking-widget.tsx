"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Search } from 'lucide-react';

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [property, setProperty] = useState('');

  const handleBooking = () => {
    // In a real app, this would integrate with a booking system
    alert('Booking functionality would be implemented here with your reservation system!');
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
          {/* Property Selection */}
          <div className="space-y-2">
            <Label htmlFor="property" className="text-sm font-medium">Property</Label>
            <Select value={property} onValueChange={setProperty}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anchor">Anchor Hotel</SelectItem>
                <SelectItem value="farm">Dolores Farm Resort</SelectItem>
                <SelectItem value="tropicana">Dolores Tropicana Resort</SelectItem>
                <SelectItem value="lake">Dolores Lake Resort</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Check-in */}
          <div className="space-y-2">
            <Label htmlFor="checkin" className="text-sm font-medium">Check-in</Label>
            <div className="relative">
              <Input
                id="checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
              <CalendarIcon className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Check-out */}
          <div className="space-y-2">
            <Label htmlFor="checkout" className="text-sm font-medium">Check-out</Label>
            <div className="relative">
              <Input
                id="checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full"
              />
              <CalendarIcon className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests" className="text-sm font-medium">Guests</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button 
            onClick={handleBooking}
            className="tropical-gradient text-white hover:scale-105 transition-transform h-10"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          <span className="text-sm text-gray-600 mr-2">Quick access:</span>
          {[
            "Gift Certificates",
            "Group Bookings", 
            "Wedding Packages",
            "Special Offers"
          ].map((link) => (
            <button 
              key={link}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

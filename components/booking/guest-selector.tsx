"use client"

import { useState } from "react"
import { Minus, Plus, Users, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface GuestSelectorProps {
  adults: number
  children: number
  onGuestsChange: (adults: number, children: number) => void
  maxAdults?: number
  maxChildren?: number
  disabled?: boolean
  className?: string
}

export function GuestSelector({
  adults,
  children,
  onGuestsChange,
  maxAdults = 8,
  maxChildren = 6,
  disabled = false,
  className,
}: GuestSelectorProps) {
  const [open, setOpen] = useState(false)

  const totalGuests = adults + children

  const handleAdultsChange = (newAdults: number) => {
    if (newAdults >= 1 && newAdults <= maxAdults) {
      onGuestsChange(newAdults, children)
    }
  }

  const handleChildrenChange = (newChildren: number) => {
    if (newChildren >= 0 && newChildren <= maxChildren) {
      onGuestsChange(adults, newChildren)
    }
  }

  const getGuestText = () => {
    if (totalGuests === 1) {
      return "1 Guest"
    }
    if (children === 0) {
      return `${adults} Adults`
    }
    return `${adults} Adults, ${children} Children`
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground">Guests</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal h-12",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            disabled={disabled}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{getGuestText()}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Adults</div>
                <div className="text-sm text-muted-foreground">Ages 13+</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => handleAdultsChange(adults - 1)}
                  disabled={adults <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => handleAdultsChange(adults + 1)}
                  disabled={adults >= maxAdults}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Children</div>
                <div className="text-sm text-muted-foreground">Ages 0-12</div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => handleChildrenChange(children - 1)}
                  disabled={children <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => handleChildrenChange(children + 1)}
                  disabled={children >= maxChildren}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="pt-2 border-t">
              <Button onClick={() => setOpen(false)} className="w-full">
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

"use client"

import { useState } from "react"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DateUtils } from "@/lib/utils/date-utils"

interface DateRangePickerProps {
  checkInDate: Date | null
  checkOutDate: Date | null
  onCheckInChange: (date: Date | null) => void
  onCheckOutChange: (date: Date | null) => void
  disabled?: boolean
  className?: string
}

export function DateRangePicker({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
  disabled = false,
  className,
}: DateRangePickerProps) {
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutOpen, setCheckOutOpen] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const handleCheckInSelect = (date: Date | undefined) => {
    if (date) {
      onCheckInChange(date)
      setCheckInOpen(false)

      // Auto-open check-out picker if no check-out date
      if (!checkOutDate) {
        setTimeout(() => setCheckOutOpen(true), 100)
      }
    }
  }

  const handleCheckOutSelect = (date: Date | undefined) => {
    if (date) {
      onCheckOutChange(date)
      setCheckOutOpen(false)
    }
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {/* Check-in Date Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Check-in</label>
        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between text-left font-normal h-12",
                !checkInDate && "text-muted-foreground",
                disabled && "opacity-50 cursor-not-allowed",
              )}
              disabled={disabled}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {checkInDate ? <span>{DateUtils.toDisplayFormat(checkInDate)}</span> : <span>Select date</span>}
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkInDate || undefined}
              onSelect={handleCheckInSelect}
              disabled={(date) => date < today}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Check-out Date Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Check-out</label>
        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between text-left font-normal h-12",
                !checkOutDate && "text-muted-foreground",
                disabled && "opacity-50 cursor-not-allowed",
              )}
              disabled={disabled || !checkInDate}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {checkOutDate ? <span>{DateUtils.toDisplayFormat(checkOutDate)}</span> : <span>Select date</span>}
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkOutDate || undefined}
              onSelect={handleCheckOutSelect}
              disabled={(date) => !checkInDate || date <= checkInDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

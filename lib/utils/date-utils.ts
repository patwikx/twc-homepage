import { format, parseISO, differenceInDays, addDays, isAfter, isBefore, isEqual } from "date-fns"

export class DateUtils {
  // Format date for API calls (ISO string)
  static toApiFormat(date: Date): string {
    return format(date, "yyyy-MM-dd")
  }

  // Format date for display
  static toDisplayFormat(date: Date | string): string {
    const dateObj = typeof date === "string" ? parseISO(date) : date
    return format(dateObj, "MMM dd, yyyy")
  }

  // Format date for form inputs
  static toInputFormat(date: Date | string): string {
    const dateObj = typeof date === "string" ? parseISO(date) : date
    return format(dateObj, "yyyy-MM-dd")
  }

  // Calculate number of nights between dates
  static calculateNights(checkIn: Date | string, checkOut: Date | string): number {
    const checkInDate = typeof checkIn === "string" ? parseISO(checkIn) : checkIn
    const checkOutDate = typeof checkOut === "string" ? parseISO(checkOut) : checkOut
    return differenceInDays(checkOutDate, checkInDate)
  }

  // Validate date range
  static validateDateRange(
    checkIn: Date | string,
    checkOut: Date | string,
  ): {
    isValid: boolean
    error?: string
  } {
    const checkInDate = typeof checkIn === "string" ? parseISO(checkIn) : checkIn
    const checkOutDate = typeof checkOut === "string" ? parseISO(checkOut) : checkOut
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Check if check-in is in the past
    if (isBefore(checkInDate, today)) {
      return {
        isValid: false,
        error: "Check-in date cannot be in the past",
      }
    }

    // Check if check-out is before or same as check-in
    if (!isAfter(checkOutDate, checkInDate)) {
      return {
        isValid: false,
        error: "Check-out date must be after check-in date",
      }
    }

    // Check minimum stay (1 night)
    if (differenceInDays(checkOutDate, checkInDate) < 1) {
      return {
        isValid: false,
        error: "Minimum stay is 1 night",
      }
    }

    return { isValid: true }
  }

  // Get date range array
  static getDateRange(start: Date | string, end: Date | string): Date[] {
    const startDate = typeof start === "string" ? parseISO(start) : start
    const endDate = typeof end === "string" ? parseISO(end) : end
    const dates: Date[] = []

    let currentDate = startDate
    while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
      dates.push(new Date(currentDate))
      currentDate = addDays(currentDate, 1)
    }

    return dates
  }

  // Check if date is weekend
  static isWeekend(date: Date | string): boolean {
    const dateObj = typeof date === "string" ? parseISO(date) : date
    const dayOfWeek = dateObj.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6 // Sunday = 0, Saturday = 6
  }

  // Get next available check-in date (today or tomorrow)
  static getNextAvailableCheckIn(): Date {
    const today = new Date()
    const currentHour = today.getHours()

    // If it's past 6 PM, suggest tomorrow
    if (currentHour >= 18) {
      return addDays(today, 1)
    }

    return today
  }

  // Get suggested check-out date (check-in + 1 night)
  static getSuggestedCheckOut(checkIn: Date | string): Date {
    const checkInDate = typeof checkIn === "string" ? parseISO(checkIn) : checkIn
    return addDays(checkInDate, 1)
  }
}

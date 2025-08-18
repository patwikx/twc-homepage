"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BookingStep } from "@/hooks/use-booking-flow"

interface BookingProgressProps {
  currentStep: BookingStep
  completedSteps: BookingStep[]
  className?: string
}

const stepConfig = {
  "room-selection": { label: "Room Selection", order: 0 },
  "guest-info": { label: "Guest Information", order: 1 },
  preferences: { label: "Preferences", order: 2 },
  review: { label: "Review & Confirm", order: 3 },
  confirmation: { label: "Confirmation", order: 4 },
}

export function BookingProgress({ currentStep, completedSteps, className }: BookingProgressProps) {
  const steps = Object.entries(stepConfig).sort(([, a], [, b]) => a.order - b.order)
  const currentStepOrder = stepConfig[currentStep].order

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map(([stepKey, config], index) => {
          const isCompleted = completedSteps.includes(stepKey as BookingStep)
          const isCurrent = stepKey === currentStep
          const isAccessible = config.order <= currentStepOrder

          return (
            <div key={stepKey} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isAccessible
                          ? "bg-muted text-muted-foreground border-2 border-primary"
                          : "bg-muted text-muted-foreground",
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : config.order + 1}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {config.label}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={cn("flex-1 h-0.5 mx-4 transition-colors", isCompleted ? "bg-primary" : "bg-muted")} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

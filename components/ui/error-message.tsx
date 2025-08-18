"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "./button"
import { Card, CardContent } from "./card"

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({ title = "Something went wrong", message, onRetry, className }: ErrorMessageProps) {
  return (
    <Card className={className}>
      <CardContent className="p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function ErrorSection({
  title,
  message,
  onRetry,
}: {
  title?: string
  message: string
  onRetry?: () => void
}) {
  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ErrorMessage title={title} message={message} onRetry={onRetry} className="max-w-md mx-auto" />
      </div>
    </div>
  )
}

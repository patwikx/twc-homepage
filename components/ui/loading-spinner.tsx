import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
        sizeClasses[size],
        className,
      )}
    />
  )
}

export function LoadingCard({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-gray-200 rounded-lg", className)} />
}

export function LoadingSection({ title, description }: { title?: string; description?: string }) {
  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <LoadingSpinner size="lg" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title || "Loading..."}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {description || "Please wait while we fetch the latest information."}
          </p>
        </div>
      </div>
    </div>
  )
}

export { ErrorSection } from "@/components/ui/error-message"

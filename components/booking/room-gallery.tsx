"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface RoomGalleryProps {
  images: string[]
  roomName: string
  className?: string
}

export function RoomGallery({ images, roomName, className }: RoomGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images.length) {
    return (
      <div className={cn("aspect-video bg-muted rounded-lg flex items-center justify-center", className)}>
        <div className="text-muted-foreground">No images available</div>
      </div>
    )
  }

  return (
    <>
      <div className={cn("relative group", className)}>
        {/* Main Image */}
        <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
          <img
            src={
              images[currentIndex] ||
              `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(roomName + " hotel room")}`
            }
            alt={`${roomName} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Expand Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => openLightbox(currentIndex)}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all",
                  index === currentIndex ? "border-primary" : "border-transparent opacity-70 hover:opacity-100",
                )}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={
                    image ||
                    `/placeholder.svg?height=60&width=80&query=${encodeURIComponent(roomName + " hotel room thumbnail")}`
                  }
                  alt={`${roomName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
          <div className="relative w-full h-full bg-black">
            <img
              src={
                images[lightboxIndex] ||
                `/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(roomName + " hotel room")}`
              }
              alt={`${roomName} - Image ${lightboxIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Close Button */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={prevLightboxImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={nextLightboxImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import PropertyBookingPage from "@/components/booking/property-booking-page"

const properties = [
  {
    id: "anchor",
    name: "Anchor Hotel",
    type: "Boutique Urban Luxury",
    description:
      "Sophisticated urban elegance in the heart of General Santos City. Modern amenities meet timeless luxury.",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    location: "Downtown General Santos",
    theme: "urban",
    amenities: ["Free WiFi", "City Views", "Business Center", "Rooftop Lounge"],
    highlights: [
      "Prime downtown location",
      "Modern business facilities",
      "Panoramic city views",
      "Executive lounge access",
    ],
  },
  {
    id: "farm",
    name: "Dolores Farm Resort",
    type: "Countryside Retreat",
    description:
      "Escape to tranquil countryside where organic farming meets luxury accommodation. Fresh air, fresh food.",
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    location: "Dolores, General Santos",
    theme: "countryside",
    amenities: ["Organic Farm", "Nature Trails", "Farm-to-Table", "Horse Riding"],
    highlights: [
      "Organic farm experience",
      "Farm-to-table dining",
      "Nature immersion programs",
      "Sustainable luxury practices",
    ],
  },
  {
    id: "tropicana",
    name: "Dolores Tropicana Resort",
    type: "Tropical Paradise",
    description: "Immerse yourself in tropical luxury with pristine beaches, azure waters, and endless sunshine.",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    location: "Coastal Dolores",
    theme: "tropical",
    amenities: ["Private Beach", "Water Sports", "Spa Services", "Infinity Pool"],
    highlights: [
      "Private beachfront access",
      "World-class spa treatments",
      "Water sports activities",
      "Tropical garden settings",
    ],
  },
  {
    id: "lake",
    name: "Dolores Lake Resort",
    type: "Lakeside Serenity",
    description:
      "Peaceful lakeside retreat surrounded by mountains. Perfect for reflection, relaxation, and rejuvenation.",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    location: "Lake Dolores",
    theme: "lakeside",
    amenities: ["Lake Activities", "Mountain Views", "Fishing", "Wellness Center"],
    highlights: [
      "Serene lakefront location",
      "Mountain backdrop views",
      "Wellness and meditation",
      "Fresh water activities",
    ],
  },
]

interface PageProps {
  params: {
    propertyId: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const property = properties.find((p) => p.id === params.propertyId)

  if (!property) {
    return {
      title: "Property Not Found",
    }
  }

  return {
    title: `Book ${property.name} - ${property.type}`,
    description: property.description,
  }
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    propertyId: property.id,
  }))
}

export default function BookingPage({ params }: PageProps) {
  const property = properties.find((p) => p.id === params.propertyId)

  if (!property) {
    notFound()
  }

  return <PropertyBookingPage property={property} />
}

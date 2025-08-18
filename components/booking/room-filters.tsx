"use client"

import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { UseRoomFiltersReturn } from "@/hooks/use-room-filters"

interface RoomFiltersProps {
  roomFilters: UseRoomFiltersReturn
  totalRooms: number
  className?: string
}

export function RoomFilters({ roomFilters, totalRooms, className }: RoomFiltersProps) {
  const { filters, setFilters, resetFilters, filteredRooms, availableAmenities, availableBedTypes, priceRange } =
    roomFilters

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked ? [...filters.amenities, amenity] : filters.amenities.filter((a) => a !== amenity)
    setFilters({ amenities: newAmenities })
  }

  const handleBedTypeChange = (bedType: string, checked: boolean) => {
    const newBedTypes = checked ? [...filters.bedType, bedType] : filters.bedType.filter((b) => b !== bedType)
    setFilters({ bedType: newBedTypes })
  }

  const activeFiltersCount =
    (filters.amenities.length > 0 ? 1 : 0) +
    (filters.bedType.length > 0 ? 1 : 0) +
    (filters.priceRange.min > priceRange.min || filters.priceRange.max < priceRange.max ? 1 : 0)

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredRooms.length} of {totalRooms} rooms
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Sort By */}
        <div className="space-y-2">
          <Label>Sort by</Label>
          <Select value={filters.sortBy} onValueChange={(value: any) => setFilters({ sortBy: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="capacity">Guest Capacity</SelectItem>
              <SelectItem value="size">Room Size</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price per night</Label>
          <div className="px-2">
            <Slider
              value={[filters.priceRange.min, filters.priceRange.max]}
              onValueChange={([min, max]) => setFilters({ priceRange: { min, max } })}
              min={priceRange.min}
              max={priceRange.max}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatCurrency(filters.priceRange.min)}</span>
            <span>{formatCurrency(filters.priceRange.max)}</span>
          </div>
        </div>

        {/* Amenities */}
        {availableAmenities.length > 0 && (
          <Collapsible defaultOpen>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <Label className="cursor-pointer">Amenities</Label>
                {filters.amenities.length > 0 && <Badge variant="secondary">{filters.amenities.length}</Badge>}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              {availableAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                  />
                  <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal capitalize cursor-pointer">
                    {amenity}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Bed Types */}
        {availableBedTypes.length > 0 && (
          <Collapsible defaultOpen>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <Label className="cursor-pointer">Bed Type</Label>
                {filters.bedType.length > 0 && <Badge variant="secondary">{filters.bedType.length}</Badge>}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              {availableBedTypes.map((bedType) => (
                <div key={bedType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`bed-${bedType}`}
                    checked={filters.bedType.includes(bedType)}
                    onCheckedChange={(checked) => handleBedTypeChange(bedType, checked as boolean)}
                  />
                  <Label htmlFor={`bed-${bedType}`} className="text-sm font-normal cursor-pointer">
                    {bedType}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  )
}

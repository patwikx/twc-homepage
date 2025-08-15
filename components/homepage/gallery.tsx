"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, Camera, Eye } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    title: 'Anchor Hotel - Lobby',
    property: 'Anchor Hotel',
    category: 'Interior',
    description: 'Elegant lobby design with modern furnishings and city views'
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    title: 'Dolores Farm Resort - Gardens',
    property: 'Dolores Farm Resort',
    category: 'Exterior',
    description: 'Lush organic gardens and sustainable farming landscapes'
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    title: 'Dolores Tropicana Resort - Beach',
    property: 'Dolores Tropicana Resort',
    category: 'Beach',
    description: 'Pristine beachfront with crystal clear waters and tropical ambiance'
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
    title: 'Dolores Lake Resort - Lake View',
    property: 'Dolores Lake Resort',
    category: 'Nature',
    description: 'Serene lake views surrounded by mountains and natural beauty'
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
    title: 'Cafe Rodrigo - Fine Dining',
    property: 'All Properties',
    category: 'Dining',
    description: 'Exquisite culinary presentations and elegant dining atmosphere'
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
    title: 'Farm-to-Table Experience',
    property: 'Dolores Farm Resort',
    category: 'Dining',
    description: 'Fresh organic ingredients prepared with passion and expertise'
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
    title: 'Beachside Dining',
    property: 'Dolores Tropicana Resort',
    category: 'Dining',
    description: 'Oceanfront dining with tropical flavors and sunset views'
  },
  {
    id: 8,
    src: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
    title: 'Lakeside Restaurant',
    property: 'Dolores Lake Resort',
    category: 'Dining',
    description: 'Peaceful lakeside dining with mountain backdrop views'
  },
  {
    id: 9,
    src: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    title: 'Luxury Suite',
    property: 'Anchor Hotel',
    category: 'Rooms',
    description: 'Sophisticated accommodations with premium amenities and city views'
  },
  {
    id: 10,
    src: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    title: 'Resort Villa',
    property: 'Dolores Tropicana Resort',
    category: 'Rooms',
    description: 'Tropical villa with private terrace and ocean access'
  },
  {
    id: 11,
    src: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg',
    title: 'Spa & Wellness',
    property: 'All Properties',
    category: 'Amenities',
    description: 'Relaxing spa treatments and wellness facilities'
  },
  {
    id: 12,
    src: 'https://images.pexels.com/photos/261187/pexels-photo-261187.jpeg',
    title: 'Infinity Pool',
    property: 'Dolores Tropicana Resort',
    category: 'Amenities',
    description: 'Stunning infinity pool overlooking the tropical coastline'
  }
];

const categories = ['All', 'Interior', 'Exterior', 'Beach', 'Nature', 'Dining', 'Rooms', 'Amenities'];
const properties = ['All Properties', 'Anchor Hotel', 'Dolores Farm Resort', 'Dolores Tropicana Resort', 'Dolores Lake Resort'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProperty, setSelectedProperty] = useState('All Properties');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = galleryImages.filter(image => {
    const categoryMatch = selectedCategory === 'All' || image.category === selectedCategory;
    const propertyMatch = selectedProperty === 'All Properties' || image.property === selectedProperty;
    return categoryMatch && propertyMatch;
  });

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage ? galleryImages.find(img => img.id === selectedImage) : null;

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Visual Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the beauty and luxury of our properties through our curated gallery. 
            From stunning architecture to breathtaking natural settings.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Category Filter */}
          <div className="flex-1">
            <h3 className="font-semibold mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "tropical-gradient text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Property Filter */}
          <div className="flex-1">
            <h3 className="font-semibold mb-3">Filter by Property</h3>
            <div className="flex flex-wrap gap-2">
              {properties.map((property) => (
                <Button
                  key={property}
                  variant={selectedProperty === property ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedProperty(property)}
                  className={selectedProperty === property ? "tropical-gradient text-white" : ""}
                >
                  {property === 'All Properties' ? 'All' : property.split(' ')[0]}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            Showing {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Camera className="w-4 h-4" />
            <span>Click any image to view full size</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="group cursor-pointer card-hover"
              onClick={() => openLightbox(image.id)}
            >
              <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 p-3 rounded-full">
                      <Eye className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                </div>
                
                {/* Image Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm leading-tight">{image.title}</h4>
                    <Badge variant="secondary" className="text-xs ml-2 shrink-0">
                      {image.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{image.property}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters to see more images.</p>
            <Button 
              onClick={() => {
                setSelectedCategory('All');
                setSelectedProperty('All Properties');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && selectedImageData && (
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-7xl max-h-[90vh] p-0 bg-black/95">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                  onClick={() => navigateImage('prev')}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
                  onClick={() => navigateImage('next')}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>

                {/* Image */}
                <div className="relative max-w-full max-h-full">
                  <img
                    src={selectedImageData.src}
                    alt={selectedImageData.title}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                  
                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{selectedImageData.title}</h3>
                        <Badge className="bg-white/20 text-white">
                          {selectedImageData.category}
                        </Badge>
                      </div>
                      <p className="text-white/80 mb-1">{selectedImageData.property}</p>
                      <p className="text-white/60 text-sm">{selectedImageData.description}</p>
                    </div>
                  </div>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full">
                  {filteredImages.findIndex(img => img.id === selectedImage) + 1} of {filteredImages.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button className="tropical-gradient text-white px-8 py-3 text-lg hover:scale-105 transition-transform">
            View Virtual Tours
          </Button>
        </div>
      </div>
    </section>
  );
}

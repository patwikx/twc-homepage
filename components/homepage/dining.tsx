"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star, Utensils, Coffee, Wine, ChefHat } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const restaurants = [
  {
    name: "Cafe Rodrigo",
    type: "Signature Restaurant",
    location: "All Locations",
    cuisine: "Filipino-International Fusion",
    rating: 4.9,
    image: "https://images.pexels.com/photos/239975/pexels-photo-239975.jpeg",
    description:
      "Our flagship restaurant offering exquisite Filipino-international cuisine with local South Cotabato influences. Experience culinary artistry celebrating Filipino flavors in an elegant atmosphere.",
    specialties: ["Filipino Fusion", "Fresh Tuna", "Organic Ingredients", "Local Wine Pairing"],
    hours: "6:00 AM - 11:00 PM",
    priceRange: "PHP PHP PHP",
    features: ["Chef's Table", "Private Dining", "Wine Cellar", "Outdoor Terrace"],
  },
  {
    name: "Sarangani Grill",
    type: "Casual Dining",
    location: "Dolores Tropicana Resort",
    cuisine: "Grilled Specialties",
    rating: 4.7,
    image: "https://images.pexels.com/photos/14389434/pexels-photo-14389434.jpeg",
    description:
      "Casual beachfront dining with fresh grilled seafood from Sarangani Bay and tropical cocktails. Perfect for sunset dinners by the ocean in General Santos.",
    specialties: ["Grilled Tuna", "BBQ Platters", "Tropical Cocktails", "Bay Views"],
    hours: "11:00 AM - 10:00 PM",
    priceRange: "PHP PHP",
    features: ["Ocean View", "Live Music", "Cocktail Bar", "Beach Access"],
  },
  {
    name: "Farm Table",
    type: "Farm-to-Table",
    location: "Dolores Farm Resort",
    cuisine: "Organic Filipino",
    rating: 4.8,
    image: "https://images.pexels.com/photos/29913267/pexels-photo-29913267.jpeg",
    description:
      "Authentic farm-to-table experience featuring organic produce grown on-site in South Cotabato. Taste the freshness of Filipino countryside dining.",
    specialties: ["Organic Vegetables", "Farm-Fresh Eggs", "Artisan Bread", "Local Dairy"],
    hours: "7:00 AM - 9:00 PM",
    priceRange: "PHP PHP",
    features: ["Garden Views", "Cooking Classes", "Farm Tours", "Organic Menu"],
  },
  {
    name: "Lakeside Bistro",
    type: "Fine Dining",
    location: "Dolores Lake Resort",
    cuisine: "Contemporary Filipino",
    rating: 4.6,
    image: "https://images.pexels.com/photos/31029412/pexels-photo-31029412.jpeg",
    description:
      "Sophisticated lakeside dining with contemporary Filipino cuisine and stunning mountain views. Perfect for romantic evenings in South Cotabato.",
    specialties: ["Fresh Lake Fish", "Mountain Game", "Seasonal Menu", "Filipino Wine Selection"],
    hours: "5:00 PM - 10:00 PM",
    priceRange: "PHP PHP PHP",
    features: ["Lake Views", "Romantic Setting", "Seasonal Menu", "Wine Pairing"],
  },
]

const diningExperiences = [
  {
    title: "Chef's Table Experience",
    description: "Intimate dining with our executive chef",
    icon: ChefHat,
    price: "From PHP 4,500/person",
  },
  {
    title: "Filipino Wine Tasting",
    description: "Curated local and international wine selections",
    icon: Wine,
    price: "From PHP 2,250/person",
  },
  {
    title: "Filipino Cooking Classes",
    description: "Learn to cook authentic Filipino cuisine",
    icon: Utensils,
    price: "From PHP 2,850/person",
  },
  {
    title: "Private Beach Dining",
    description: "Exclusive Sarangani Bay dinner setup",
    icon: Coffee,
    price: "From PHP 6,000/couple",
  },
]

export default function DiningSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 })
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { ref: restaurantsRef, isVisible: restaurantsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })
  const { ref: experiencesRef, isVisible: experiencesVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="dining" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Culinary Excellence</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Savor exceptional dining experiences across our General Santos City resorts, from our signature Cafe Rodrigo
            to specialized Filipino cuisine that celebrates local South Cotabato flavors and international
            sophistication.
          </p>
        </div>

        {/* Featured Restaurant - Cafe Rodrigo */}
        <div className="mb-16">
          <Card
            ref={featuredRef}
            className={`overflow-hidden bg-card transition-all duration-1000 ease-out hover:shadow-xl ${
              featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-96 lg:h-auto overflow-hidden">
                <img
                  src={restaurants[0].image || "/placeholder.svg"}
                  alt={restaurants[0].name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground text-sm">Signature Restaurant</Badge>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-3xl font-bold text-card-foreground">{restaurants[0].name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{restaurants[0].rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {restaurants[0].location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {restaurants[0].hours}
                  </div>
                  <span className="font-medium">{restaurants[0].priceRange}</span>
                </div>
                <p className="text-muted-foreground mb-6">{restaurants[0].description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {restaurants[0].specialties.map((specialty, idx) => (
                    <span key={idx} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform duration-200">
                    Make Reservation
                  </Button>
                  <Button
                    variant="outline"
                    className="transform hover:scale-105 transition-transform duration-200 bg-transparent"
                  >
                    View Menu
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Other Restaurants */}
        <div ref={restaurantsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {restaurants.slice(1).map((restaurant, index) => (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-xl transition-all duration-500 bg-card hover:scale-105 ${
                restaurantsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: restaurantsVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="text-xs">
                    {restaurant.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {restaurant.priceRange}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-bold text-card-foreground">{restaurant.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {restaurant.location}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{restaurant.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {restaurant.specialties.slice(0, 2).map((specialty, idx) => (
                    <span key={idx} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 transform hover:scale-105 transition-transform duration-200"
                  size="sm"
                >
                  Reserve Table
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Dining Experiences */}
        <div
          ref={experiencesRef}
          className={`bg-card rounded-2xl p-8 transition-all duration-1000 ease-out ${
            experiencesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-card-foreground mb-4">Special Dining Experiences</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Elevate your culinary journey with our exclusive Filipino dining experiences designed to create
              unforgettable memories in General Santos City.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diningExperiences.map((experience, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-background rounded-xl hover:shadow-lg transition-all duration-500 hover:scale-105 ${
                  experiencesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: experiencesVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <experience.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-lg text-foreground mb-2">{experience.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{experience.description}</p>
                <p className="font-medium text-primary mb-4">{experience.price}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent transform hover:scale-105 transition-transform duration-200"
                >
                  Book Experience
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

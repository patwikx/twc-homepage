"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Globe, Heart, Leaf, Star, Building, MapPin } from 'lucide-react';

const milestones = [
  { year: '2008', event: 'Founded Tropicana Worldwide Corporation in General Santos City' },
  { year: '2010', event: 'Opened our flagship Anchor Hotel in downtown GenSan' },
  { year: '2013', event: 'Launched Dolores Farm Resort with sustainable farming practices' },
  { year: '2016', event: 'Introduced Cafe Rodrigo across all properties' },
  { year: '2019', event: 'Opened Dolores Tropicana Resort, our beachfront paradise' },
  { year: '2022', event: 'Completed Dolores Lake Resort, our mountain retreat' },
  { year: '2024', event: 'Achieved carbon-neutral operations across all properties' }
];

const values = [
  {
    icon: Heart,
    title: 'Filipino Hospitality',
    description: 'Warm, genuine service rooted in traditional Filipino values of respect and care.'
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Committed to environmental stewardship and supporting local communities.'
  },
  {
    icon: Star,
    title: 'Excellence',
    description: 'Uncompromising quality in every aspect of our guest experience.'
  },
  {
    icon: Globe,
    title: 'Cultural Bridge',
    description: 'Connecting global travelers with authentic Filipino culture and traditions.'
  }
];

const achievements = [
  { number: '15+', label: 'Years of Excellence' },
  { number: '10K+', label: 'Happy Guests Annually' },
  { number: '200+', label: 'Dedicated Team Members' },
  { number: '4', label: 'Award-Winning Properties' }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Our Story
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Born from a vision to showcase the beauty of General Santos City and the Philippines, 
            Tropicana Worldwide Corporation has grown from a single hotel to a collection of unique experiences.
          </p>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Story Text */}
          <div className="space-y-6">
            <h3 className="font-display text-3xl font-bold">
              From Vision to Reality
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2008 in the vibrant city of General Santos, Tropicana Worldwide Corporation 
              began with a simple yet ambitious dream: to create hospitality experiences that celebrate 
              the natural beauty, rich culture, and warm spirit of the Philippines.
            </p>
            <p className="text-gray-600 leading-relaxed">
              What started as a single boutique hotel has blossomed into a diverse portfolio of four 
              distinctive properties, each offering unique experiences while maintaining our core 
              commitment to exceptional service and authentic Filipino hospitality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we&apos;re proud to be a leader in sustainable luxury tourism in Mindanao, 
              providing thousands of guests annually with unforgettable experiences while 
              supporting our local communities and environment.
            </p>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">General Santos City, Philippines</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-primary" />
                <span className="font-medium">4 Properties</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
              alt="Tropicana Worldwide Corporation"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="font-display text-xl font-bold mb-2">
                Anchored in Excellence
              </h4>
              <p className="text-white/90 text-sm">
                Our flagship Anchor Hotel in downtown General Santos City
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="font-display text-3xl font-bold text-center mb-12">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="tropical-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-3">{value.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="font-display text-3xl font-bold text-center mb-12">
            Our Journey
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary to-transparent"></div>
              
              {/* Timeline Items */}
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-center">
                    {/* Timeline Dot */}
                    <div className="w-16 h-16 tropical-gradient rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                      {milestone.year.slice(-2)}
                    </div>
                    
                    {/* Content */}
                    <div className="ml-8 flex-1">
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{milestone.year}</h4>
                            <Badge className="tropical-gradient text-white">
                              Milestone
                            </Badge>
                          </div>
                          <p className="text-gray-600">{milestone.event}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Stats */}
        <div className="mb-20">
          <h3 className="font-display text-3xl font-bold text-center mb-12">
            By the Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold tropical-gradient bg-clip-text text-transparent mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Message */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-6">
              Message from Leadership
            </h3>
            <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-6 max-w-4xl mx-auto">
              &quot;Our mission extends beyond providing luxury accommodations. We&apos;re cultural ambassadors, 
              showcasing the warmth, beauty, and rich heritage of the Philippines to the world. 
              Every guest who stays with us becomes part of our extended family, and every experience 
              we create is a testament to the Filipino spirit of hospitality.&quot;
            </blockquote>
            <div className="text-center">
              <p className="font-semibold text-lg">The Tropicana Worldwide Family</p>
              <p className="text-gray-600">Founders & Management Team</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

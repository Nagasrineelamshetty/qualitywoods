
import { MapPin, Phone, Mail, Clock, Award, Users, Heart, Hammer, Shield, Truck } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const whyChooseUs = [
    {
      icon: Award,
      title: 'Expert Craftsmanship',
      description: 'Three generations of woodworking expertise with attention to every detail and traditional techniques passed down through our family.'
    },
    {
      icon: Heart,
      title: 'Family Values',
      description: 'Built on trust, integrity, and the belief that every home deserves beautiful, lasting furniture that brings families together.'
    },
    {
      icon: Shield,
      title: 'Quality Materials',
      description: 'We use only premium quality wood sourced sustainably, ensuring your furniture lasts for generations to come.'
    },
    {
      icon: Users,
      title: 'Personal Service',
      description: 'Every customer is treated like family. We provide personalized attention from initial design consultation to final delivery.'
    },
    {
      icon: Hammer,
      title: 'Custom Solutions',
      description: 'Each piece is tailored to your specific needs, space, and style preferences. No two pieces are exactly alike.'
    },
    {
      icon: Truck,
      title: 'Timely Delivery',
      description: 'Professional delivery and installation service with guaranteed timelines and careful handling of your investment.'
    }
  ];

  const locations = [
    {
      name: 'Main Showroom & Workshop',
      address: '123 Furniture Street, Craftsman District, Mumbai 400001',
      phone: '+91 98765 43210',
      email: 'mumbai@furniturecraft.com',
      hours: 'Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    },
    {
      name: 'Design Studio',
      address: '456 Design Avenue, Creative Hub, Delhi 110001',
      phone: '+91 87654 32109',
      email: 'delhi@furniturecraft.com',
      hours: 'Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop'
    },
    {
      name: 'South Branch',
      address: '789 Heritage Road, Artisan Quarter, Bangalore 560001',
      phone: '+91 76543 21098',
      email: 'bangalore@furniturecraft.com',
      hours: 'Mon-Sat: 9:30 AM - 7:30 PM, Sun: 10:30 AM - 6:30 PM',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-amber-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About FurnitureCraft</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Three generations of passion, craftsmanship, and dedication to creating beautiful furniture that transforms houses into homes.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Story</h2>
              <div className="space-y-6">
                <p className="text-lg text-stone-600 leading-relaxed">
                  Founded in 1998 by Rajesh Kumar, FurnitureCraft began as a small workshop in Mumbai with a simple yet powerful vision: to create furniture that doesn't just fill spaces, but enriches lives. What started with a father and son crafting wooden chairs in a modest garage has blossomed into a trusted name across India.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Today, we're proud to be a three-generation family business. Rajesh's son, Amit Kumar, brought modern design sensibilities and business acumen, while his grandson, Arjun Kumar, has introduced sustainable practices and digital innovation. Together, they've built a legacy that honors traditional woodworking while embracing contemporary needs.
                </p>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Our journey has been one of growth, learning, and unwavering commitment to quality. From our humble beginnings to serving over 10,000 families across the country, every piece we create carries the Kumar family's promise of excellence, durability, and beauty.
                </p>
              </div>
              
              {/* Statistics */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">25+</div>
                  <div className="text-stone-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">10,000+</div>
                  <div className="text-stone-600">Happy Families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">50+</div>
                  <div className="text-stone-600">Skilled Artisans</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop"
                alt="Our founder at work"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop"
                  alt="Traditional craftsmanship"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop"
                  alt="Modern workshop"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Why Choose FurnitureCraft?</h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              More than just furniture makers, we're craftsmen who understand that your home is your sanctuary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow bg-white border-amber-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-4">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Locations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Visit Our Showrooms</h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Experience our craftsmanship firsthand. Visit any of our showrooms to see our furniture, meet our team, and discuss your custom requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-4">{location.name}</h3>
                  
                  <div className="space-y-3 text-stone-600">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{location.address}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" />
                      <span className="text-sm">{location.phone}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" />
                      <span className="text-sm">{location.email}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm">{location.hours}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-amber-600 hover:bg-amber-700">
                    Get Directions
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Dream Space?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Let's discuss your vision and bring it to life with our expert craftsmanship and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50 px-8 py-3 text-lg">
                Browse Products
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-900 px-8 py-3 text-lg">
              Schedule Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

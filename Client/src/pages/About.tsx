import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  Users,
  Heart,
  Hammer,
  Shield,
  Truck,
  Star,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { products, testimonials } from '../data/mockData';

const About = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const whyChooseUs = [
    {
      icon: Award,
      title: 'Expert Craftsmanship',
      description: 'Three generations of woodworking expertise with attention to every detail and traditional techniques passed down through our family.',
    },
    {
      icon: Heart,
      title: 'Family Values',
      description: 'Built on trust, integrity, and the belief that every home deserves beautiful, lasting furniture that brings families together.',
    },
    {
      icon: Shield,
      title: 'Quality Materials',
      description: 'We use only premium quality wood sourced sustainably, ensuring your furniture lasts for generations to come.',
    },
    {
      icon: Users,
      title: 'Personal Service',
      description: 'Every customer is treated like family. We provide personalized attention from initial design consultation to final delivery.',
    },
    {
      icon: Hammer,
      title: 'Custom Solutions',
      description: 'Each piece is tailored to your specific needs, space, and style preferences. No two pieces are exactly alike.',
    },
    {
      icon: Truck,
      title: 'Timely Delivery',
      description: 'Professional delivery and installation service with guaranteed timelines and careful handling of your investment.',
    },
  ];

  const showroom = {
    name: 'Main Showroom & Workshop',
    address: '123 Furniture Street, Craftsman District, Mumbai 400001',
    phone: '+91 98765 43210',
    email: 'info@furniturecraft.com',
    hours: 'Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 6:00 PM',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
  };

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
                  Founded in 1998 by Neelamshetty Appa Rao, QualityWoods began as a small workshop in Mumbai with a simple yet powerful vision: to create furniture that doesn't just fill spaces, but enriches lives. What started with a father and son crafting wooden chairs in a modest garage has blossomed into a trusted name across India.
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

      {/* Testimonials */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-16">What Our Customers Say</h2>

          <div className="relative">
            <Card className="p-8 bg-white shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-stone-700 mb-6 italic">
                "{testimonials[currentTestimonial].comment}"
              </blockquote>
              <div className="flex items-center justify-center">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-amber-900">{testimonials[currentTestimonial].name}</p>
                  <p className="text-stone-600 text-sm">Verified Customer</p>
                </div>
              </div>
            </Card>

            {/* Testimonial Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-amber-500' : 'bg-amber-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Showroom Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Visit Our Showroom</h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Experience our craftsmanship firsthand. Visit our showroom to see our furniture, meet our team, and discuss your custom requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Showroom Details */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={showroom.image}
                alt={showroom.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-amber-900 mb-6">{showroom.name}</h3>

                <div className="space-y-4 text-stone-600 mb-8">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-amber-600 mt-0.5 mr-4 flex-shrink-0" />
                    <span className="text-base">{showroom.address}</span>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0" />
                    <span className="text-base">{showroom.phone}</span>
                  </div>

                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0" />
                    <span className="text-base">{showroom.email}</span>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-amber-600 mt-0.5 mr-4 flex-shrink-0" />
                    <span className="text-base">{showroom.hours}</span>
                  </div>
                </div>

                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-3">
                  Get Directions
                </Button>
              </div>
            </Card>

            {/* Map */}
            <div className="h-96 lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8754435872844!2d72.8776849!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ceaeb7c8c2b1%3A0xe8e8e8e8e8e8e8e8!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
                title="FurnitureCraft Showroom Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

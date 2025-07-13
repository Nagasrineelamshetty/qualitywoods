import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Award, Clock, Truck, Users, Heart, Hammer } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { products, testimonials } from '../data/mockData';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=600&fit=crop'
  ];

  const features = [
    {
      icon: Award,
      title: 'Custom Designs',
      description: 'Tailored furniture solutions designed specifically for your space and style preferences.'
    },
    {
      icon: Clock,
      title: 'Premium Wood',
      description: 'Only the finest quality wood materials sourced sustainably for lasting durability.'
    },
    {
      icon: Truck,
      title: 'Timely Delivery',
      description: 'Professional delivery and installation service right to your doorstep on schedule.'
    }
  ];

  const aboutValues = [
    {
      icon: Heart,
      title: 'Family Values',
      description: 'Built on trust, integrity, and the belief that every home deserves beautiful, lasting furniture.'
    },
    {
      icon: Hammer,
      title: 'Expert Craftsmanship',
      description: 'Three generations of woodworking expertise passed down through skilled artisan hands.'
    },
    {
      icon: Users,
      title: 'Personal Service',
      description: 'We treat every customer like family, ensuring personalized attention from design to delivery.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Crafting Comfort,<br />Delivering Elegance
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-stone-200 animate-fade-in">
              Transform your house into a home with our handcrafted, custom furniture solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/products">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg">
                  Shop Now
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-900 px-8 py-3 text-lg">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-10"
        >
          <ChevronLeft size={48} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-300 transition-colors z-10"
        >
          <ChevronRight size={48} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-amber-500' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Story</h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                Founded in 1998 by the Kumar family, FurnitureCraft began as a small workshop with a simple mission: 
                to create beautiful, lasting furniture that transforms houses into homes. What started with a father 
                and son crafting wooden chairs has grown into a trusted name in custom furniture design.
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Today, we're proud to be a three-generation family business, combining traditional woodworking 
                techniques with modern design sensibilities. Every piece we create tells a story of dedication, 
                craftsmanship, and the belief that quality furniture should last for generations.
              </p>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">25+</div>
                  <div className="text-stone-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">1000+</div>
                  <div className="text-stone-600">Happy Families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600">50+</div>
                  <div className="text-stone-600">Skilled Artisans</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <img
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=300&fit=crop"
                alt="Our workshop"
                className="rounded-lg shadow-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop"
                  alt="Craftsmanship detail"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop"
                  alt="Finished furniture"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-amber-900 mb-4">Our Values</h3>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                The principles that guide everything we do, from the first sketch to the final delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aboutValues.map((value, index) => (
                <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow bg-amber-50 border-amber-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                    <value.icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-amber-900 mb-4">{value.title}</h4>
                  <p className="text-stone-600 leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Why Choose FurnitureCraft?</h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              With over 25 years of experience, we bring craftsmanship, quality, and personal touch to every piece we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow bg-white border-amber-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-semibold text-amber-900 mb-4">{feature.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Featured Products</h2>
            <p className="text-xl text-stone-600">Discover our most popular handcrafted furniture pieces</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">{product.name}</h3>
                  <p className="text-stone-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-600">₹{product.price.toLocaleString()}</span>
                    <Link to={`/products/${product.id}`}>
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        Customize
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                View All Products
              </Button>
            </Link>
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

      {/* CTA Section */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Get in touch with our design experts and let's create something beautiful together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50 px-8 py-3 text-lg">
                Start Shopping
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-900 px-8 py-3 text-lg">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { featuredMotors, motorCategories } from '@/lib/data/motors';

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setMessage('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
    } catch {
      setIsSuccess(false);
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl mb-8">Get exclusive deals, service reminders, and boating tips</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-2 sm:gap-4 flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-deep-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {message && (
            <p className={`mt-4 text-sm ${isSuccess ? 'text-green-200' : 'text-red-200'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Outboard Motors Dealership",
  "description": "Your trusted source for new and used outboard motors. Yamaha, Mercury, Honda, Suzuki authorized dealer.",
  "url": "https://outboard-dealership.com",
  "telephone": "+1-931-243-4555",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "615 West Lake Avenue",
    "addressLocality": "Celina",
    "addressRegion": "TN",
    "postalCode": "38551",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.7617",
    "longitude": "-80.1918"
  },
  "openingHours": [
    "Mo-Fr 08:00-17:00",
    "Sa 08:00-12:00"
  ],
  "sameAs": [
    "https://www.facebook.com/outboarddealership",
    "https://www.instagram.com/outboarddealership",
    "https://www.youtube.com/outboarddealership"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Outboard Motors",
        "category": "Marine Equipment"
      }
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Premium Outboard Motors",
      subtitle: "Power Your Adventure",
      description: "Discover our extensive collection of new and certified pre-owned motors from leading brands.",
      image: "/placeholder-hero.svg",
      cta: "Shop Now",
      link: "/inventory"
    },
    {
      title: "Spring Service Special",
      subtitle: "Save 20% on Maintenance",
      description: "Get your motor ready for the season with our comprehensive service package.",
      image: "/placeholder-hero.svg",
      cta: "Book Service",
      link: "/service/schedule"
    },
    {
      title: "0% Financing Available",
      subtitle: "On Select Models",
      description: "Take advantage of our special financing offers on qualifying purchases.",
      image: "/placeholder-hero.svg",
      cta: "Learn More",
      link: "/financing"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const services = [
    {
      icon: "🔧",
      title: "Expert Service",
      description: "Factory-trained technicians for all major brands",
      link: "/service"
    },
    {
      icon: "🛠️",
      title: "Genuine Parts",
      description: "OEM parts and accessories in stock",
      link: "/parts"
    },
    {
      icon: "💰",
      title: "Financing Options",
      description: "Competitive rates and flexible terms",
      link: "/financing"
    },
    {
      icon: "📋",
      title: "Trade-In Program",
      description: "Get top dollar for your current motor",
      link: "/inventory/trade-in"
    }
  ];

  const brands = [
    "Honda", "Yamaha", "Mercury", "Freedom", "Suzuki", "Tohatsu"
  ];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-2 text-blue-300">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg mb-8 text-gray-200">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link}
                    className="inline-block bg-deep-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal transition-colors"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-12 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-deep-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-charcoal opacity-80">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Motors</h2>
            <p className="text-xl text-charcoal opacity-80">Top-rated motors from trusted brands</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMotors.map((motor) => (
              <ProductCard key={motor.id} motor={motor} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/inventory"
              className="inline-block bg-deep-blue text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal transition-colors"
            >
              View All Inventory
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-charcoal opacity-80">Find the perfect motor for your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {motorCategories.map((category) => (
              <Link
                key={category.id}
                href={`/inventory/${category.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white text-6xl">⚓</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-deep-blue transition-colors">
                  {category.name}
                </h3>
                <p className="text-charcoal opacity-80 mb-2">{category.description}</p>
                <p className="text-sm text-deep-blue font-semibold">{category.motorCount} motors available</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Dealership?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-deep-blue text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Authorized Dealer</h3>
                    <p className="text-charcoal opacity-80">Official dealer for all major brands with full warranty support.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-deep-blue text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Service Team</h3>
                    <p className="text-charcoal opacity-80">Factory-trained technicians ensure your motor runs perfectly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-deep-blue text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
                    <p className="text-charcoal opacity-80">We match any competitor&apos;s price on identical products.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/yamaha.jpg"
                alt="Our dealership"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Carry */}
      <section className="py-16 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Brands We Carry</h2>
            <p className="text-xl text-charcoal opacity-80">Authorized dealer for industry-leading manufacturers</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[80px] sm:min-h-[100px]"
              >
                <span className="text-sm sm:text-base lg:text-lg font-semibold text-navy text-center">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Newsletter CTA */}
      <NewsletterSection />
    </div>
  );
}
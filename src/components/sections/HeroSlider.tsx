'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Premium Outboard Motors",
      subtitle: "Power Your Adventure",
      description: "Discover our extensive collection of new and certified pre-owned motors from leading brands.",
      image: "/honda.jpg",
      cta: "Shop Now",
      link: "/inventory"
    },
    {
      title: "Spring Service Special",
      subtitle: "Save 20% on Maintenance",
      description: "Get your motor ready for the season with our comprehensive service package.",
      image: "/mercury.jpeg",
      cta: "Book Service",
      link: "/service/schedule"
    },
    {
      title: "0% Financing Available",
      subtitle: "On Select Models",
      description: "Take advantage of our special financing offers on qualifying purchases.",
      image: "/suzuki.jpg",
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

  return (
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
  );
}
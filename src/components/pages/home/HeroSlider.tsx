'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppReady } from '@/contexts/AppReadyContext';

export default function HeroSlider() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const { isNavigationReady } = useAppReady();

  const slides = [
    {
      title: "Free Shipping on All Outboard Motors",
      subtitle: "We ship from our Tennessee dealership",
      description: "Free freight to the lower 48 states on all outboard motor purchases"
    },
    {
      title: "Authorized Outboard Motor Dealer",
      subtitle: "Yamaha • Honda • Mercury • Suzuki • Tohatsu • Freedom",
      description: "Factory authorized dealer for all major outboard motor brands"
    },
    {
      title: "Located in Celina, Tennessee",
      subtitle: "615 West Lake Avenue, Celina, TN 38551",
      description: "Mon-Fri: 8:00 AM - 5:00 PM | Saturday: 8:00 AM - 12:00 PM | Sunday: Closed"
    },
    {
      title: "New Features Coming Soon",
      subtitle: "Call for Special Dealer Pricing: (931) 243-4555",
      description: "Unlock exclusive dealer discounts and personalized recommendations from our outboard motor experts"
    }
  ];

  // Create extended slides array: [last, 1, 2, 3, 4, first]
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isNavigationReady) return;

    // Only start video loading after navigation is ready
    const loadVideo = () => {
      video.load();
      video.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
        // Additional delay to ensure smooth navigation interaction
        setTimeout(() => {
          video.play().catch(() => {
            // Autoplay failed, that's okay
          });
        }, 200);
      });
    };

    // Use requestIdleCallback if available, otherwise use setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadVideo);
    } else {
      setTimeout(loadVideo, 300);
    }

    return () => {
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [isNavigationReady]);

  // Auto-rotate slides with infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle infinite loop reset
  useEffect(() => {
    if (currentSlide === 0) {
      // Start at slide 1 (index 1 in extendedSlides)
      setCurrentSlide(1);
      setIsTransitioning(false);
      setTimeout(() => setIsTransitioning(true), 50);
    } else if (currentSlide === extendedSlides.length - 1) {
      // We're at the duplicate first slide, jump back to real first slide
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(1);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 700); // Wait for transition to complete
    }
  }, [currentSlide, extendedSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index + 1); // +1 because index 0 is the duplicate last slide
  };

  const getActiveSlideIndex = () => {
    if (currentSlide === 0) return slides.length - 1; // duplicate last slide
    if (currentSlide === extendedSlides.length - 1) return 0; // duplicate first slide
    return currentSlide - 1; // adjust for the duplicate last slide at beginning
  };

  return (
    <section className="relative w-full h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden">
      {/* Poster/Fallback Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900" />

      {/* Video Background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        muted
        loop
        playsInline
        preload="none"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

      {/* Slide Content */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-full flex items-center justify-center px-4"
            >
              <div className="text-center text-white max-w-5xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide drop-shadow-2xl mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide drop-shadow-lg mb-6">
                  {slide.subtitle}
                </p>
                <p className="text-base md:text-lg lg:text-xl drop-shadow-lg max-w-3xl mx-auto">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              getActiveSlideIndex() === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
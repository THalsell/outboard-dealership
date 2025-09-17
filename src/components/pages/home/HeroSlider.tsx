'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppReady } from '@/contexts/AppReadyContext';

export default function HeroSlider() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { isNavigationReady } = useAppReady();

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
      
      {/* Centered Free Shipping Message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-5xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide drop-shadow-2xl">
            Free Shipping on Outboard Motors
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-semibold mt-6 tracking-wide drop-shadow-lg">
            We ship from our dealership in Tennessee and we pay the freight to the lower 48 states!
          </p>
        </div>
      </div>


    </section>
  );
}
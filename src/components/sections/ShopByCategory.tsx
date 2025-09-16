'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/data/products';

const powerCategories = [
  {
    id: 'portable',
    name: 'Portable Outboards',
    category: 'portable',
    description: '',
    detail: 'Perfect for dinghies, small fishing boats, and tenders',
    image: '/portables.png'
  },
  {
    id: 'mid-range',
    name: 'Mid-Range Outboards',
    category: 'mid-range',
    description: '',
    detail: 'Ideal for runabouts, pontoons, and mid-size fishing boats',
    image: '/midRange.jpg'
  },
  {
    id: 'high-performance',
    name: 'High Performance Outboards',
    category: 'high-performance',
    description: '',
    detail: 'Power for larger boats, offshore fishing, and watersports',
    image: '/highPerformance.jpeg'
  }
];

export default function ShopByCategory() {
  const [motorCounts, setMotorCounts] = useState<Record<string, number>>({});

  // Fetch products and calculate counts for each power category
  useEffect(() => {
    const fetchProductCounts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const products: Product[] = await response.json();
          
          // Calculate counts for each category
          const counts: Record<string, number> = {};
          
          powerCategories.forEach(category => {
            const count = products.filter(product => 
              product.powerCategory === category.category
            ).length;
            counts[category.id] = count;
          });
          
          setMotorCounts(counts);
        }
      } catch (error) {
        console.error('Failed to fetch product counts:', error);
        // Set fallback counts if fetch fails
        const fallbackCounts = { 'portable': 0, 'mid-range': 0, 'high-performance': 0 };
        setMotorCounts(fallbackCounts);
      }
    };
    
    fetchProductCounts();
  }, []);

  return (
    <section className="py-16 bg-light-gray overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
            <div className="hidden sm:block flex-1 h-px bg-gray-300"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center px-2 text-deep-blue">Shop by Power Category</h2>
            <div className="hidden sm:block flex-1 h-px bg-gray-300"></div>
          </div>
          <p className="text-xl text-charcoal opacity-80">Find the perfect motor for your boat and needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {powerCategories.map((category) => (
            <Link
              key={category.id}
              href={`/inventory?powerCategory=${category.category}`}
              className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group aspect-[4/5] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] w-full"
            >
              <Image
                src={category.image}
                alt={`${category.name} - ${category.description}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center text-white">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 group-hover:text-blue-300 transition-colors leading-tight">
                  {category.name}
                </h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 mb-6 leading-relaxed">{category.detail}</p>
                <div className="flex flex-col items-center gap-4">
                  <span className="text-lg opacity-80 bg-black/20 px-4 py-2 rounded-full">
                    {motorCounts[category.id] !== undefined ? motorCounts[category.id] : '...'} motors available
                  </span>
                  <div className="flex items-center text-blue-300 font-bold text-xl">
                    <span>Browse Selection</span>
                    <svg className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
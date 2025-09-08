'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/data/products';

const horsepowerCategories = [
  {
    id: '1',
    name: 'Small Outboards',
    hpRange: '2.5-30',
    description: '2.5HP - 30HP',
    detail: 'Perfect for dinghies, small fishing boats, and tenders',
    image: '/small.jpg',
    minHp: 2.5,
    maxHp: 30
  },
  {
    id: '2',
    name: 'Mid-Range Outboards',
    hpRange: '40-90',
    description: '40HP - 90HP',
    detail: 'Ideal for runabouts, pontoons, and mid-size fishing boats',
    image: '/mid.webp',
    minHp: 40,
    maxHp: 90
  },
  {
    id: '3',
    name: 'High Performance',
    hpRange: '100-300',
    description: '100HP - 300HP',
    detail: 'Power for larger boats, offshore fishing, and watersports',
    image: '/high.webp',
    minHp: 100,
    maxHp: 300
  },
  {
    id: '4',
    name: 'Elite Power',
    hpRange: '350+',
    description: '350HP+',
    detail: 'Maximum performance for high-speed and commercial applications',
    image: '/elite.webp',
    minHp: 350,
    maxHp: Infinity
  }
];

export default function ShopByCategory() {
  const [motorCounts, setMotorCounts] = useState<Record<string, number>>({});

  // Fetch products and calculate counts for each horsepower range
  useEffect(() => {
    const fetchProductCounts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const products: Product[] = await response.json();
          
          // Calculate counts for each category
          const counts: Record<string, number> = {};
          
          horsepowerCategories.forEach(category => {
            const count = products.filter(product => 
              product.horsepower >= category.minHp && product.horsepower <= category.maxHp
            ).length;
            counts[category.id] = count;
          });
          
          setMotorCounts(counts);
        }
      } catch (error) {
        console.error('Failed to fetch product counts:', error);
        // Set fallback counts if fetch fails
        const fallbackCounts = { '1': 0, '2': 0, '3': 0, '4': 0 };
        setMotorCounts(fallbackCounts);
      }
    };
    
    fetchProductCounts();
  }, []);

  return (
    <section className="py-16 bg-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Horsepower</h2>
          <p className="text-xl text-charcoal opacity-80">Find the perfect motor for your boat and needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {horsepowerCategories.map((category) => (
            <Link
              key={category.id}
              href={`/inventory?hp=${category.hpRange}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-2 group"
            >
              <div className="aspect-square rounded-lg mb-4 overflow-hidden transform group-hover:scale-105 transition-transform relative">
                <Image
                  src={category.image}
                  alt={`${category.name} - ${category.description}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-deep-blue transition-colors">
                {category.name}
              </h3>
              <p className="text-2xl font-bold text-deep-blue mb-2">{category.description}</p>
              <p className="text-sm text-charcoal opacity-80 mb-3">{category.detail}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {motorCounts[category.id] !== undefined ? motorCounts[category.id] : '...'} motors
                </span>
                <div className="flex items-center text-deep-blue font-semibold">
                  <span className="text-sm">Browse</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
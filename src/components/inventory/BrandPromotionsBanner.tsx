'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Promotion {
  id: string;
  imageUrl: string;
  imageAlt: string;
}

interface BrandPromotionsBannerProps {
  brand: string;
}

export default function BrandPromotionsBanner({ brand }: BrandPromotionsBannerProps) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(`/api/promotions?brand=${encodeURIComponent(brand)}`);
        if (response.ok) {
          const data = await response.json();
          setPromotions(data.filter((promo: Promotion) => promo.imageUrl));
        }
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };

    fetchPromotions();
  }, [brand]);

  if (promotions.length === 0) return null;

  // Dynamically set grid columns based on number of promotions
  const gridClass = promotions.length === 1 
    ? "grid grid-cols-1" 
    : "grid grid-cols-1 md:grid-cols-2";

  return (
    <div className={`mb-6 ${gridClass} gap-4`}>
      {promotions.map((promo) => (
        <div key={promo.id}>
          <Image
            src={promo.imageUrl}
            alt={promo.imageAlt || `${brand} promotion`}
            width={promotions.length === 1 ? 1200 : 600}
            height={300}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      ))}
    </div>
  );
}
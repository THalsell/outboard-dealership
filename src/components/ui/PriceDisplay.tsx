import React from 'react';
import Badge from '@/components/ui/Badge';

interface PriceDisplayProps {
  price: number;
  comparePrice?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  variant?: 'card' | 'detail';
}

export default function PriceDisplay({
  price,
  comparePrice,
  priceRange,
  variant = 'card'
}: PriceDisplayProps) {
  const hasDiscount = comparePrice && comparePrice > price;
  const discountPercent = hasDiscount ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  if (variant === 'detail') {
    // ProductDetailClient.tsx style (lines 223-238)
    return (
      <div className="flex items-center space-x-4">
        <span className="text-4xl font-bold text-text-blue lg:text-5xl">
          ${price.toLocaleString()}
        </span>
        {hasDiscount && (
          <>
            <span className="text-2xl text-gray-500 line-through">
              ${comparePrice.toLocaleString()}
            </span>
            <Badge variant="discount" size="sm">
              Save {discountPercent}%
            </Badge>
          </>
        )}
      </div>
    );
  }

  // ProductCard.tsx style (lines 150-173)
  if (hasDiscount) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-charcoal" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content="USD" />
          <span itemProp="price" content={price.toString()}>${price.toLocaleString()}</span>
        </span>
        <span className="text-sm text-gray-500 line-through">
          ${comparePrice.toLocaleString()}
        </span>
        {Math.round(((comparePrice - price) / comparePrice) * 100) > 0 && (
          <Badge variant="sale" size="xs">
            {Math.round(((comparePrice - price) / comparePrice) * 100)}% OFF
          </Badge>
        )}
      </div>
    );
  } else if (priceRange && priceRange.min !== priceRange.max) {
    return (
      <span className="text-lg font-bold text-charcoal">
        ${priceRange.min.toLocaleString()} - ${priceRange.max.toLocaleString()}
      </span>
    );
  } else {
    return (
      <span className="text-xl font-bold text-charcoal">
        ${price.toLocaleString()}
      </span>
    );
  }
}
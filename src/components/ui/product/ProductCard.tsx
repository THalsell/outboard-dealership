'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useFilter } from '@/contexts/FilterContext';
import { useState, useCallback, memo } from 'react';
import PriceDisplay from '@/components/ui/product/PriceDisplay';
import StockStatus from '@/components/ui/product/StockStatus';
import Badge from '@/components/ui/display/Badge';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { compareList } = useFilter();
  const [imageHover, setImageHover] = useState(false);
  const isInCompare = compareList.includes(product.id as string);

  // Memoize event handlers to prevent infinite re-renders
  const handleMouseEnter = useCallback(() => {
    setImageHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setImageHover(false);
  }, []);

  // Get the default variant (first one)
  const defaultVariant = product.variants[0];
  const price = defaultVariant?.price || 0;
  const comparePrice = defaultVariant?.compareAtPrice || price;
  const hasDiscount = comparePrice > price;
  const mainImage = product.images[0]?.src || '/placeholder-motor.svg';

  // Generate structured data for this product card
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": mainImage,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "price": price.toFixed(2),
      "priceCurrency": "USD",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `https://outboard-dealership.vercel.app/inventory/${product.handle}`
    }
  };

  return (
    <article 
      className={`rounded-xl transition-all duration-200 overflow-hidden group h-full flex flex-col relative ${
        isInCompare 
          ? 'ring-2 ring-deep-blue/20' 
          : ''
      }`}
      itemScope
      itemType="https://schema.org/Product"
      role="article"
      aria-labelledby={`product-title-${product.id}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />


      {/* Sale Badge */}
      {hasDiscount && (
        <div className="absolute top-2 right-2 z-20">
          <Badge variant="sale" size="xs">
            SALE
          </Badge>
        </div>
      )}

      {/* Image Section */}
      <Link 
        href={`/inventory/${product.handle}`}
        className="block relative aspect-square overflow-hidden p-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full">
          <Image
            src={mainImage}
            alt={product.title}
            itemProp="image"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={`object-contain transition-transform duration-200 ${imageHover ? 'scale-[1.02]' : 'scale-100'}`}
          />
          
          {/* Quick View Button */}
          <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${imageHover ? 'opacity-100' : 'opacity-0'}`}>
            <button
              className="relative z-20 bg-white/95 backdrop-blur-sm text-deep-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-all duration-200 shadow-sm"
              aria-label={`Quick view ${product.title}`}
            >
              Quick View
            </button>
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-5 relative z-10">

        {/* Title */}
        <Link href={`/inventory/${product.handle}`}>
          <h3 
            id={`product-title-${product.id}`}
            className="text-lg font-semibold text-charcoal hover:text-gray-600 transition-colors mb-3 line-clamp-2 leading-tight"
            itemProp="name"
          >
            {product.title}
          </h3>
        </Link>

        {/* Specs */}
        <div className="flex items-center gap-3 text-sm text-professional-gray mb-4">
          {product.horsepower > 0 && (
            <span className="font-semibold text-charcoal">{product.horsepower} HP</span>
          )}
          {product.variants.length > 1 && (
            <>
              <span className="text-gray-400">|</span>
              <span className="text-professional-gray">{product.variants.length} options</span>
            </>
          )}
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {product.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i}
                className="text-xs text-blue-600 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price - Push to bottom */}
        <div className="mt-auto">
          <div className="mb-3">
            <PriceDisplay
              price={price}
              comparePrice={comparePrice}
              priceRange={product.priceRange}
              variant="card"
            />
          </div>

          {/* Stock Status */}
          <div className="mb-3">
            <StockStatus
              inStock={product.inStock}
              inventory={defaultVariant?.inventory}
              size="xs"
              variant="card"
            />
          </div>

        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
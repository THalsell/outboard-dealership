'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data/products';
import { useFilter } from '@/contexts/FilterContext';
import { useState, useCallback, memo } from 'react';

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
          <span className="text-red-600 text-xs font-bold">
            SALE
          </span>
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
            className={`object-contain transition-transform duration-200 ${imageHover ? 'scale-[1.02]' : 'scale-100'}`}
            unoptimized={mainImage.startsWith('https://') || mainImage.startsWith('/placeholder')}
          />
          
          {/* Quick View Button */}
          <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${imageHover ? 'opacity-100' : 'opacity-0'}`}>
            <button className="relative z-20 bg-white/95 backdrop-blur-sm text-deep-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-all duration-200 shadow-sm">
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
            {hasDiscount ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-charcoal" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="priceCurrency" content="USD" />
                  <span itemProp="price" content={price.toString()}>${price.toLocaleString()}</span>
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${comparePrice.toLocaleString()}
                </span>
                {Math.round(((comparePrice - price) / comparePrice) * 100) > 0 && (
                  <span className="text-xs text-red-600 font-bold">
                    {Math.round(((comparePrice - price) / comparePrice) * 100)}% OFF
                  </span>
                )}
              </div>
            ) : product.priceRange.min !== product.priceRange.max ? (
              <span className="text-lg font-bold text-charcoal">
                ${product.priceRange.min.toLocaleString()} - ${product.priceRange.max.toLocaleString()}
              </span>
            ) : (
              <span className="text-xl font-bold text-charcoal">
                ${price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-3">
            {product.inStock ? (
              <span className="text-xs text-green-600 font-medium">
                In Stock {defaultVariant?.inventory && `(${defaultVariant.inventory} available)`}
              </span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
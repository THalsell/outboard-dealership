'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data/products';
import { useCart } from '@/contexts/CartContext';
import { useFilter } from '@/contexts/FilterContext';
import { useState, useCallback } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, setIsOpen } = useCart();
  const { compareList, addToCompare, removeFromCompare } = useFilter();
  const [isAdding, setIsAdding] = useState(false);
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
      className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden group h-full flex flex-col relative ${
        isInCompare 
          ? 'border-deep-blue shadow-lg ring-2 ring-deep-blue/20' 
          : 'border-border-gray hover:shadow-hover'
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

      {/* Compare Checkbox - Top Left */}
      <div className="absolute top-2 left-2 z-20">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isInCompare) {
              removeFromCompare(product.id);
            } else {
              if (compareList.length < 4) {
                addToCompare(product.id);
              }
            }
          }}
          className={`w-6 h-6 rounded border-2 transition-all duration-200 flex items-center justify-center ${
            isInCompare
              ? 'bg-deep-blue border-deep-blue text-white'
              : 'bg-white border-gray-300 hover:border-deep-blue'
          }`}
          title={isInCompare ? 'Remove from comparison' : 'Add to comparison'}
        >
          {isInCompare && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </div>

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
        className="block relative aspect-square overflow-hidden bg-gradient-to-b from-gray-50 to-white p-6"
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

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsAdding(true);
                addItem({
                  id: product.id,
                  productId: product.id,
                  variantId: defaultVariant?.id,
                  productType: 'motor',
                  name: product.title,
                  price: price,
                  quantity: 1,
                  image: mainImage,
                });
                setTimeout(() => {
                  setIsAdding(false);
                  setIsOpen(true);
                }, 500);
              }}
              disabled={!product.inStock || isAdding}
              className={`flex-1 py-2.5 px-4 font-medium text-sm transition-all ${
                isAdding 
                  ? 'bg-green-600 text-white' 
                  : product.inStock 
                    ? 'bg-deep-blue hover:bg-[#0a3a6e] text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-describedby={`product-price-${product.id}`}
            >
              {isAdding ? '✓ Added' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
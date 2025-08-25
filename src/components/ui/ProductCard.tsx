'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Motor } from '@/types/models/motor';
import { useCart } from '@/contexts/CartContext';
import { useFilter } from '@/contexts/FilterContext';
import { useState } from 'react';

interface ProductCardProps {
  motor: Motor;
}

export default function ProductCard({ motor }: ProductCardProps) {
  const { addItem, setIsOpen } = useCart();
  const { compareList, addToCompare, removeFromCompare } = useFilter();
  const [isAdding, setIsAdding] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const isInCompare = compareList.includes(motor.id);

  return (
    <article 
      className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden group h-full flex flex-col relative ${
        isInCompare 
          ? 'border-deep-blue shadow-lg ring-2 ring-deep-blue/20' 
          : 'border-border-gray hover:shadow-hover'
      }`}
      role="article"
      aria-labelledby={`motor-title-${motor.id}`}
    >

      {/* Compare Checkbox - Top Left */}
      <div className="absolute top-2 left-2 z-20">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isInCompare) {
              removeFromCompare(motor.id);
            } else {
              if (compareList.length < 4) {
                addToCompare(motor.id);
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
      {/* Image Section */}
      <Link 
        href={`/inventory/${motor.id}`}
        className="block relative aspect-square overflow-hidden bg-gradient-to-b from-gray-50 to-white p-6"
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
      >
        <div className="relative w-full h-full">
          <Image
            src={motor.images[0] || '/placeholder-motor.svg'}
            alt={`${motor.brand} ${motor.model}`}
            fill
            className={`object-contain transition-transform duration-200 ${imageHover ? 'scale-[1.02]' : 'scale-100'}`}
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
        {/* Brand */}
        <div className="text-xs text-professional-gray font-medium tracking-wider uppercase mb-2">
          {motor.brand}
        </div>

        {/* Title */}
        <Link href={`/inventory/${motor.id}`}>
          <h3 
            id={`motor-title-${motor.id}`}
            className="text-base font-semibold text-charcoal hover:text-deep-blue transition-colors mb-3 line-clamp-2 leading-tight"
          >
            {motor.model} - {motor.year}
          </h3>
        </Link>

        {/* Specs */}
        <div className="flex items-center gap-3 text-sm text-professional-gray mb-4">
          <span className="font-semibold text-charcoal">{motor.horsepower} HP</span>
          {motor.shaftLength && (
            <>
              <span className="text-gray-400">|</span>
              <span className="capitalize text-professional-gray">{motor.shaftLength} Shaft</span>
            </>
          )}
        </div>

        {/* Rating */}
        {motor.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(motor.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-professional-gray">({motor.reviewCount})</span>
          </div>
        )}

        {/* Price - Push to bottom */}
        <div className="mt-auto">
          <div className="mb-3">
            {motor.salePrice ? (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-charcoal">
                  ${motor.salePrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${motor.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-charcoal">
                ${motor.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-3">
            {motor.inStock ? (
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                In Stock
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
                  id: motor.id,
                  productId: motor.id,
                  productType: 'motor',
                  name: `${motor.brand} ${motor.model}`,
                  price: motor.salePrice || motor.price,
                  quantity: 1,
                  image: motor.images[0] || '/placeholder-motor.svg',
                  type: 'motor',
                });
                setTimeout(() => {
                  setIsAdding(false);
                  setIsOpen(true);
                }, 500);
              }}
              disabled={!motor.inStock || isAdding}
              className={`flex-1 py-2.5 px-4 rounded font-medium text-sm transition-all ${
                isAdding 
                  ? 'bg-green-600 text-white' 
                  : motor.inStock 
                    ? 'bg-deep-blue hover:bg-deep-blue/80 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-describedby={`motor-price-${motor.id}`}
            >
              {isAdding ? '✓ Added' : motor.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            

            
          </div>
        </div>
      </div>
    </article>
  );
}
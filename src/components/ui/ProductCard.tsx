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
  const discount = motor.salePrice ? Math.round(((motor.price - motor.salePrice) / motor.price) * 100) : 0;
  const isInCompare = compareList.includes(motor.id);

  return (
    <article 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
      role="article"
      aria-labelledby={`motor-title-${motor.id}`}
    >
      <Link href={`/inventory/${motor.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-light-gray">
          <Image
            src={motor.images[0] || '/placeholder-motor.svg'}
            alt={`${motor.brand} ${motor.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {motor.salePrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
              -{discount}%
            </div>
          )}
          {motor.bestSeller && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-bold">
              Best Seller
            </div>
          )}
          {motor.condition === 'new' && (
            <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
              NEW
            </div>
          )}
          {motor.condition === 'used' && (
            <div className="absolute bottom-2 left-2 bg-deep-blue text-white px-2 py-1 rounded-md text-xs font-semibold">
              USED
            </div>
          )}
          {motor.condition === 'certified-preowned' && (
            <div className="absolute bottom-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
              CERTIFIED
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <Link href={`/inventory/${motor.id}`}>
          <h3 
            id={`motor-title-${motor.id}`}
            className="text-base sm:text-lg font-bold text-charcoal hover:text-deep-blue transition-colors line-clamp-2"
          >
            {motor.brand} {motor.model}
          </h3>
        </Link>
        
        <div className="mt-2 flex flex-wrap items-center gap-1 sm:gap-2">
          <span className="text-xs sm:text-sm text-gray-600">{motor.year}</span>
          <span className="text-xs sm:text-sm text-gray-400">•</span>
          <span className="text-xs sm:text-sm font-semibold text-deep-blue">{motor.horsepower} HP</span>
          {motor.shaftLength && (
            <>
              <span className="text-xs sm:text-sm text-gray-400">•</span>
              <span className="text-xs sm:text-sm text-gray-600 capitalize">{motor.shaftLength} shaft</span>
            </>
          )}
        </div>

        {motor.rating && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(motor.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">({motor.reviewCount})</span>
          </div>
        )}

        <div 
          id={`motor-price-${motor.id}`}
          className="mt-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2"
        >
          {motor.salePrice ? (
            <>
              <span className="text-lg sm:text-2xl font-bold text-charcoal">
                ${motor.salePrice.toLocaleString()}
              </span>
              <span className="text-sm sm:text-lg text-gray-500 line-through">
                ${motor.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-lg sm:text-2xl font-bold text-charcoal">
              ${motor.price.toLocaleString()}
            </span>
          )}
        </div>

        <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          {motor.inStock ? (
            <span className="text-xs sm:text-sm text-green-600 font-medium">✓ In Stock</span>
          ) : (
            <span className="text-xs sm:text-sm text-red-600 font-medium">Out of Stock</span>
          )}
          {motor.stockQuantity > 0 && motor.stockQuantity <= 5 && (
            <span className="text-xs sm:text-sm text-orange-600">Only {motor.stockQuantity} left!</span>
          )}
        </div>

        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => {
              setIsAdding(true);
              addItem({
  id: motor.id,
  productId: motor.id,        // Add this line
  productType: 'motor',       // Add this line
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
            className={`flex-1 text-white text-center py-2 sm:py-2 px-2 sm:px-4 rounded-lg transition-all font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isAdding 
                ? 'bg-green-600' 
                : motor.inStock 
                  ? 'bg-deep-blue hover:bg-blue-700' 
                  : 'bg-gray-400 cursor-not-allowed'
            }`}
            aria-describedby={`motor-price-${motor.id}`}
          >
            {isAdding ? '✓ Added!' : motor.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <div className="flex gap-2 sm:gap-2">
            <Link
              href={`/inventory/${motor.id}`}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`View details for ${motor.brand} ${motor.model}`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
            <button
              onClick={() => {
                if (isInCompare) {
                  removeFromCompare(motor.id);
                } else {
                  addToCompare(motor.id);
                }
              }}
              className={`p-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isInCompare 
                  ? 'border-blue-500 bg-blue-50 text-deep-blue' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-600'
              }`}
              aria-label={isInCompare ? `Remove ${motor.brand} ${motor.model} from comparison` : `Add ${motor.brand} ${motor.model} to comparison`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
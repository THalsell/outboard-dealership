'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Part } from '@/types/models/part';
import { useCart } from '@/contexts/CartContext';
import { useParts } from '@/contexts/PartsContext';

interface PartsListProps {
  parts: Part[];
  loading?: boolean;
  showCompatibility?: boolean;
}

function PartListItem({ part, showCompatibility = false }: { part: Part; showCompatibility?: boolean }) {
  const { addItem, setIsOpen } = useCart();
  const { addToBulkOrder, bulkOrder } = useParts();
  const [isAdding, setIsAdding] = useState(false);
  const [bulkQuantity, setBulkQuantity] = useState(part.minOrderQuantity);

  const discount = part.salePrice ? Math.round(((part.price - part.salePrice) / part.price) * 100) : 0;
  const effectivePrice = part.salePrice || part.price;
  const isInBulkOrder = bulkOrder.some(item => item.partId === part.id);

  const getBulkPrice = (quantity: number) => {
    if (!part.bulkPricing) return effectivePrice;
    
    const applicableTier = part.bulkPricing
      .filter(tier => quantity >= tier.quantity)
      .sort((a, b) => b.quantity - a.quantity)[0];
    
    return applicableTier ? applicableTier.price : effectivePrice;
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
  id: part.id,
  productId: part.id,         // Add this line
  productType: 'part',        // Add this line
  name: part.name,
  price: effectivePrice,
  quantity: 1,
  image: part.images[0] || '/placeholder-part.svg',
  type: 'part',
  partNumber: part.partNumber
});
    setTimeout(() => {
      setIsAdding(false);
      setIsOpen(true);
    }, 500);
  };

  const handleAddToBulk = () => {
    const bulkPrice = getBulkPrice(bulkQuantity);
    addToBulkOrder({
      partId: part.id,
      quantity: bulkQuantity,
      unitPrice: bulkPrice,
      totalPrice: bulkPrice * bulkQuantity
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-64 h-48 lg:h-auto flex-shrink-0">
          <Link href={`/parts/${part.id}`}>
            <Image
              src={part.images[0] || '/placeholder-part.svg/400/300'}
              alt={part.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {part.isOEM ? (
                <div className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                  OEM
                </div>
              ) : (
                <div className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                  Aftermarket
                </div>
              )}
              {part.bestseller && (
                <div className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                  Best Seller
                </div>
              )}
            </div>

            {part.salePrice && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                -{discount}%
              </div>
            )}
          </Link>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono text-gray-500">{part.partNumber}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{part.brand}</span>
              </div>
              
              <Link href={`/parts/${part.id}`}>
                <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                  {part.name}
                </h3>
              </Link>
              
              <p className="text-gray-600 mb-3 line-clamp-2">{part.description}</p>
            </div>
            
            <div className="text-right ml-4">
              {part.salePrice ? (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${part.salePrice.toFixed(2)}
                  </span>
                  <br />
                  <span className="text-lg text-gray-500 line-through">
                    ${part.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${part.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {part.rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(part.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">({part.reviewCount})</span>
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
            <div>
              <span className="font-medium text-gray-900">Category:</span>
              <br />
              <span className="capitalize">{part.category.replace('-', ' ')}</span>
            </div>
            {part.weight && (
              <div>
                <span className="font-medium text-gray-900">Weight:</span>
                <br />
                {part.weight} lbs
              </div>
            )}
            <div>
              <span className="font-medium text-gray-900">Min Order:</span>
              <br />
              {part.minOrderQuantity} unit{part.minOrderQuantity > 1 ? 's' : ''}
            </div>
            <div>
              <span className="font-medium text-gray-900">Warranty:</span>
              <br />
              {part.warranty || 'N/A'}
            </div>
          </div>

          {showCompatibility && part.compatibleMotors.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                Compatible with {part.compatibleMotors.length} motor{part.compatibleMotors.length > 1 ? 's' : ''}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 mb-4">
            {part.inStock ? (
              <span className="text-sm text-green-600 font-medium">✓ In Stock</span>
            ) : (
              <span className="text-sm text-red-600 font-medium">Out of Stock</span>
            )}
            {part.stockQuantity > 0 && part.stockQuantity <= 10 && (
              <span className="text-sm text-orange-600">Only {part.stockQuantity} left!</span>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!part.inStock || isAdding}
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                isAdding 
                  ? 'bg-green-600 text-white' 
                  : part.inStock 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              {isAdding ? '✓ Added!' : part.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {part.bulkPricing && part.bulkPricing.length > 0 && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={part.minOrderQuantity}
                  value={bulkQuantity}
                  onChange={(e) => setBulkQuantity(Math.max(part.minOrderQuantity, parseInt(e.target.value) || part.minOrderQuantity))}
                  className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
                />
                <button
                  onClick={handleAddToBulk}
                  disabled={!part.inStock}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    isInBulkOrder
                      ? 'bg-orange-100 text-orange-800 border border-orange-300'
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  } disabled:bg-gray-400 disabled:cursor-not-allowed`}
                >
                  {isInBulkOrder ? '✓ In Bulk Order' : 'Add to Bulk'}
                </button>
              </div>
            )}

            <Link
              href={`/parts/${part.id}`}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PartsList({ parts, loading = false, showCompatibility = false }: PartsListProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-64 h-48 bg-gray-200 animate-pulse" />
              <div className="flex-1 p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (parts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No parts found</h3>
        <p className="text-gray-600 mb-4">
          We couldn&apos;t find any parts matching your current filters.
        </p>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {parts.map((part) => (
        <PartListItem key={part.id} part={part} showCompatibility={showCompatibility} />
      ))}
    </div>
  );
}
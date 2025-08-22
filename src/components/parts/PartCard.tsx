'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Part } from '@/types/models/part';
import { useCart } from '@/contexts/CartContext';
import { useParts } from '@/contexts/PartsContext';

interface PartCardProps {
  part: Part;
  showCompatibility?: boolean;
}

export default function PartCard({ part, showCompatibility = false }: PartCardProps) {
  const { addItem, setIsOpen } = useCart();
  const { addToBulkOrder, bulkOrder } = useParts();
  const [isAdding, setIsAdding] = useState(false);
  const [bulkQuantity, setBulkQuantity] = useState(part.minOrderQuantity);
  const [showBulkPricing, setShowBulkPricing] = useState(false);

  const discount = part.salePrice ? Math.round(((part.price - part.salePrice) / part.price) * 100) : 0;
  const effectivePrice = part.salePrice || part.price;
  const isInBulkOrder = bulkOrder.some(item => item.partId === part.id);

  // Calculate bulk price if available
  const getBulkPrice = (quantity: number) => {
    if (!part.bulkPricing) return effectivePrice;
    
    const applicableTier = part.bulkPricing
      .filter(tier => quantity >= tier.quantity)
      .sort((a, b) => b.quantity - a.quantity)[0];
    
    return applicableTier ? applicableTier.price : effectivePrice;
  };

  const bulkPrice = getBulkPrice(bulkQuantity);
  const bulkSavings = bulkQuantity > 1 ? (effectivePrice - bulkPrice) * bulkQuantity : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
  id: part.id,
  productId: part.id,         
  productType: 'part',        
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
    addToBulkOrder({
      partId: part.id,
      quantity: bulkQuantity,
      unitPrice: bulkPrice,
      totalPrice: bulkPrice * bulkQuantity
    });
    setBulkQuantity(part.minOrderQuantity);
    setShowBulkPricing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <Link href={`/parts/${part.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={part.images[0] || '/placeholder-part.svg'}
            alt={part.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
            {part.featured && (
              <div className="bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                Featured
              </div>
            )}
          </div>

          {part.salePrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              -{discount}%
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 font-mono">{part.partNumber}</span>
          <span className="text-xs text-gray-400 ml-2">• {part.brand}</span>
        </div>

        <Link href={`/parts/${part.id}`}>
          <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
            {part.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{part.description}</p>

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

        <div className="flex items-baseline gap-2 mb-3">
          {part.salePrice ? (
            <>
              <span className="text-xl font-bold text-gray-900">
                ${part.salePrice.toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${part.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              ${part.price.toFixed(2)}
            </span>
          )}
        </div>

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

        {part.minOrderQuantity > 1 && (
          <div className="mb-3 p-2 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-800">
              Minimum order: {part.minOrderQuantity} units
            </p>
          </div>
        )}

        {showCompatibility && part.compatibleMotors.length > 0 && (
          <div className="mb-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800 font-medium">
              Compatible with {part.compatibleMotors.length} motor{part.compatibleMotors.length > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Bulk Pricing Section */}
        {part.bulkPricing && part.bulkPricing.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowBulkPricing(!showBulkPricing)}
              className="text-sm text-blue-600 hover:text-blue-700 underline"
            >
              View bulk pricing
            </button>
            
            {showBulkPricing && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <div className="space-y-2 mb-3">
                  {part.bulkPricing.map((tier, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{tier.quantity}+ units:</span>
                      <span className="font-medium">${tier.price.toFixed(2)} each</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm font-medium">Qty:</label>
                  <input
                    type="number"
                    min={part.minOrderQuantity}
                    value={bulkQuantity}
                    onChange={(e) => setBulkQuantity(Math.max(part.minOrderQuantity, parseInt(e.target.value) || part.minOrderQuantity))}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center"
                  />
                </div>
                
                <div className="text-sm space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span>Unit price:</span>
                    <span className="font-medium">${bulkPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-bold">${(bulkPrice * bulkQuantity).toFixed(2)}</span>
                  </div>
                  {bulkSavings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You save:</span>
                      <span className="font-medium">${bulkSavings.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleAddToBulk}
                  disabled={!part.inStock}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-1 px-3 rounded text-sm font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isInBulkOrder ? '✓ In Bulk Order' : 'Add to Bulk Order'}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!part.inStock || isAdding}
            className={`flex-1 text-white text-center py-2 px-4 rounded-lg transition-all font-medium ${
              isAdding 
                ? 'bg-green-600' 
                : part.inStock 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isAdding ? '✓ Added!' : part.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          
          <Link
            href={`/parts/${part.id}`}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="View details"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
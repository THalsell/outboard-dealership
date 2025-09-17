'use client';

import { ProductVariant } from '@/types/product';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedIndex: number;
  onVariantChange: (index: number) => void;
}

export default function ProductVariantSelector({ 
  variants, 
  selectedIndex, 
  onVariantChange 
}: ProductVariantSelectorProps) {
  if (variants.length <= 1) return null;

  // Get unique option names
  const optionName = variants[0]?.option1Name || 'Options';

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-charcoal">{optionName}</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {variants.map((variant, index) => {
          const isSelected = selectedIndex === index;
          const isAvailable = variant.available && variant.inventory > 0;
          
          return (
            <button
              key={index}
              onClick={() => onVariantChange(index)}
              disabled={!isAvailable}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                isSelected
                  ? 'border-deep-blue bg-deep-blue/5 text-deep-blue'
                  : isAvailable
                    ? 'border-gray-200 hover:border-gray-300 text-gray-700'
                    : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              <div className="font-medium">
                {variant.option1Value || `Variant ${index + 1}`}
              </div>
              
              {/* Price difference */}
              {variant.price !== variants[0].price && (
                <div className="text-sm mt-1">
                  {variant.price > variants[0].price ? '+' : ''}
                  ${(variant.price - variants[0].price).toLocaleString()}
                </div>
              )}
              
              {/* Stock status */}
              <div className="text-xs mt-2">
                {isAvailable ? (
                  <span className="text-green-600">
                    {variant.inventory} in stock
                  </span>
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
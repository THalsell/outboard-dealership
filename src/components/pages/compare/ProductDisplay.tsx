import React, { memo } from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import ProductDropdown from './ProductDropdown';
import { DEFAULT_BLUR_PLACEHOLDER } from '@/lib/blur-placeholder';

interface ProductDisplayProps {
  product: Product | null;
  index: number;
  availableProducts: Product[];
  onUpdate: (index: number, product: Product | null) => void;
}

const PLACEHOLDER_IMAGE = '/placeholder-motor.svg';

const ProductDisplay = memo<ProductDisplayProps>(({
  product,
  index,
  availableProducts,
  onUpdate
}) => {
  if (!product) {
    return (
      <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 border border-gray-500 shadow-md">
        <ProductDropdown
          products={availableProducts}
          selectedProduct={product}
          onSelect={(selectedProduct) => onUpdate(index, selectedProduct)}
          placeholder={`Select Engine ${index + 1}`}
          index={index}
        />
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="relative w-32 sm:w-40 lg:w-64 h-28 sm:h-36 lg:h-48 mx-auto mb-3 lg:mb-4">
        <Image
          src={product.images[0]?.src || PLACEHOLDER_IMAGE}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 256px"
          priority={index === 0}
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_PLACEHOLDER}
        />
      </div>
      <Link
        href={`/inventory/${product.handle}`}
        className="text-deep-blue hover:text-blue-700 text-sm font-medium underline hover:no-underline transition-colors"
      >
        View Details
      </Link>
    </div>
  );
});

ProductDisplay.displayName = 'ProductDisplay';

export default ProductDisplay;
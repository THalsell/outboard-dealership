import React, { useState, useCallback, useMemo, memo } from 'react';
import { Product } from '@/lib/data/products';

interface ProductDropdownProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelect: (product: Product | null) => void;
  placeholder: string;
  index: number;
}

const ProductDropdown = memo<ProductDropdownProps>(({
  products,
  selectedProduct,
  onSelect,
  placeholder,
  index
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback((product: Product | null) => {
    onSelect(product);
    setIsOpen(false);
  }, [onSelect]);

  const displayText = useMemo(() =>
    selectedProduct
      ? `${selectedProduct.brand} ${selectedProduct.title} - ${selectedProduct.horsepower}HP`
      : placeholder,
    [selectedProduct, placeholder]
  );

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 bg-white border-2 border-gray-500 text-left text-gray-900 hover:bg-gray-50 hover:border-blue-400 transition-all flex justify-between items-center shadow-sm"
        aria-label={`Select product for comparison slot ${index + 1}`}
      >
        <span className={selectedProduct ? 'text-gray-900 font-medium' : 'text-gray-500'}>
          {displayText}
        </span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-500 shadow-xl z-50 max-h-72 overflow-y-auto">
          <button
            onClick={() => handleSelect(null)}
            className="w-full p-2 text-left text-gray-500 hover:bg-gray-50 transition-colors border-b border-gray-500"
          >
            {placeholder}
          </button>
          {products.map(product => (
            <button
              key={product.id}
              onClick={() => handleSelect(product)}
              className="w-full p-2 text-left text-gray-900 hover:bg-blue-50 transition-colors border-b border-gray-500 last:border-b-0"
            >
              <div className="font-semibold text-deep-blue">
                {product.brand} {product.title}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {product.horsepower}HP • ${product.variants[0]?.price?.toLocaleString()}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

ProductDropdown.displayName = 'ProductDropdown';

export default ProductDropdown;
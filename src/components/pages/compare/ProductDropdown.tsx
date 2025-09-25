import React, { useState, useCallback, useMemo, memo } from "react";
import { Product } from "@/types/product";

interface ProductDropdownProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelect: (product: Product | null) => void;
  placeholder: string;
  index: number;
}

const ProductDropdown = memo<ProductDropdownProps>(
  ({ products, selectedProduct, onSelect, placeholder, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = useCallback(
      (product: Product | null) => {
        onSelect(product);
        setIsOpen(false);
      },
      [onSelect]
    );

    const displayText = useMemo(
      () =>
        selectedProduct
          ? `${selectedProduct.brand} ${selectedProduct.title} - ${selectedProduct.horsepower}HP`
          : placeholder,
      [selectedProduct, placeholder]
    );

    return (
      <div className="relative w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-left text-sm hover:bg-gray-50 hover:border-blue-400 transition-all flex justify-between items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          aria-label={`Select product for comparison slot ${index + 1}`}
        >
          <span
            className={
              selectedProduct
                ? "text-gray-900 font-medium truncate"
                : "text-gray-400 italic"
            }
          >
            {displayText}
          </span>
          <svg
            className={`w-4 h-4 ml-2 flex-shrink-0 text-gray-400 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
            <button
              onClick={() => handleSelect(null)}
              className="w-full px-3 py-2 text-left text-sm text-gray-400 italic hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              {placeholder}
            </button>
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelect(product)}
                className="w-full px-3 py-2 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 group"
              >
                <div className="font-medium text-sm text-gray-900 group-hover:text-blue-600">
                  {product.brand} {product.title}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {product.horsepower}HP • $
                  {product.variants[0]?.price?.toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ProductDropdown.displayName = "ProductDropdown";

export default ProductDropdown;

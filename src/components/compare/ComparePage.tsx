'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Product } from '@/lib/data/products';
import Link from 'next/link';

// Components
import ProductDropdown from '@/components/compare/ProductDropdown';
import ProductDisplay from '@/components/compare/ProductDisplay';
import ComparisonTable from '@/components/compare/ComparisonTable';

// Hooks & Utils
import { useProducts } from '@/components/compare/useProducts';
import { getSpecValue } from '@/components/compare/compare-utils';
import { MAX_PRODUCTS, SPEC_CATEGORIES } from '@/components/compare/compare-constants';

export function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>(
    Array(MAX_PRODUCTS).fill(null)
  );
  const { allProducts, loading, error } = useProducts();

  const updateProduct = useCallback((index: number, product: Product | null) => {
    setSelectedProducts(prev => {
      const newProducts = [...prev];
      newProducts[index] = product;
      return newProducts;
    });
  }, []);

  const availableProducts = useMemo(() =>
    allProducts.filter(product =>
      !selectedProducts.some(selected => selected?.id === product.id)
    ),
    [allProducts, selectedProducts]
  );

  const hasSelectedProducts = useMemo(() =>
    selectedProducts.some(product => product !== null),
    [selectedProducts]
  );

  const clearAll = useCallback(() => {
    setSelectedProducts(Array(MAX_PRODUCTS).fill(null));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-50 to-blue-400 flex items-center justify-center">
        <div className="text-gray-900 text-center text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-900 text-center">
          <p className="text-lg font-semibold">Error loading products</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-50 to-blue-400">
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-[180px] sm:pt-[120px] pb-8 sm:pb-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-deep-blue mb-4">
            Engine Comparison
          </h1>
          <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg xl:text-xl 2xl:text-2xl">
            Select up to {MAX_PRODUCTS} engines to compare specifications side-by-side
          </p>
        </div>

        {/* Initial Product Selection */}
        {!hasSelectedProducts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {selectedProducts.map((product, index) => (
              <ProductDropdown
                key={index}
                products={availableProducts}
                selectedProduct={product}
                onSelect={(selectedProduct) => updateProduct(index, selectedProduct)}
                placeholder={`Select Engine ${index + 1}`}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Product Images Grid */}
        {hasSelectedProducts && (
          <div className="mb-8 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
            <div className="flex">
              {/* Empty space to align with spec label column */}
              <div className="w-1/4 p-2 xl:p-3"></div>
              {/* Product images aligned with table columns */}
              {selectedProducts.map((product, index) => (
                <div key={index} className="flex-1 p-2 xl:p-3 text-center">
                  <ProductDisplay
                    product={product}
                    index={index}
                    availableProducts={availableProducts}
                    onUpdate={updateProduct}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table - UPDATED */}
        {hasSelectedProducts && (
          <ComparisonTable
            selectedProducts={selectedProducts}
            getSpecValue={getSpecValue}
            specCategories={SPEC_CATEGORIES}
          />
        )}

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-12 gap-8 sm:gap-12">
          <button
            onClick={clearAll}
            className="text-deep-blue hover:text-blue-700 font-semibold transition-colors text-lg"
          >
            Clear All
          </button>
          <Link
            href="/inventory"
            className="text-deep-blue hover:text-blue-700 font-semibold transition-colors text-lg"
          >
            ← Back to Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
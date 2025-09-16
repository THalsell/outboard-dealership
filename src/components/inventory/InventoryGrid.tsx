'use client';

import { Product } from '@/lib/data/products';
import ProductCard from '@/components/ui/ProductCard';

interface InventoryGridProps {
  products: Product[];
  loading?: boolean;
  onClearFilters?: () => void;
}

export default function InventoryGrid({ products, loading = false, onClearFilters }: InventoryGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="aspect-square bg-gray-100 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded animate-pulse mt-4" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg border border-gray-200">
        
        <h3 className="text-lg font-semibold text-deep-blue mb-2">No products found</h3>
        <p className="text-gray-600 mb-4 max-w-md">
          We couldn&apos;t find any outboard motors matching your criteria. Try adjusting your filters.
        </p>
        <button 
          onClick={onClearFilters}
          className="text-deep-blue hover:underline font-medium"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
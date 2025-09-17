'use client';

import { Product } from '@/types/product';
import ProductCard from '@/components/ui/product/ProductCard';
import EmptyState from '@/components/ui/feedback/EmptyState';

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
      <EmptyState
        title="No products found"
        description="We couldn't find any outboard motors matching your criteria. Try adjusting your filters."
        action={onClearFilters ? { label: "Clear all filters", onClick: onClearFilters } : undefined}
        className="bg-white rounded-lg border border-gray-200"
      />
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
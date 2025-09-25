'use client';

import { Product } from '@/types/product';
import ProductCard from '@/components/ui/product/ProductCard';
import ProductCardSkeleton from '@/components/ui/product/ProductCardSkeleton';
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
          <ProductCardSkeleton key={index} />
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
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
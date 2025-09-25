import ProductCardSkeleton from '@/components/ui/product/ProductCardSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-[180px] sm:pt-[120px]">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
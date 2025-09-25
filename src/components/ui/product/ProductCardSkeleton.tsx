export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />

        {/* Price skeleton */}
        <div className="h-6 bg-gray-200 rounded w-2/5 mt-4" />

        {/* Features skeleton */}
        <div className="space-y-2 mt-4">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
          <div className="h-3 bg-gray-200 rounded w-3/5" />
        </div>

        {/* Button skeleton */}
        <div className="h-9 bg-gray-200 rounded w-full mt-4" />
      </div>
    </div>
  );
}
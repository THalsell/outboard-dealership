import { ImageSkeleton, TextSkeleton, ButtonSkeleton } from '@/components/ui/feedback/SkeletonLoader';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white -mt-20 sm:-mt-16 pt-24 sm:pt-20 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 lg:items-start">
          {/* Image gallery skeleton */}
          <div className="flex flex-col">
            <ImageSkeleton className="aspect-square w-full" />
            <div className="mt-6 grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <ImageSkeleton key={index} className="aspect-square" />
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="mt-10 lg:mt-0 lg:pl-24 lg:border-l lg:border-gray-200">
            {/* Title skeleton */}
            <div className="mb-6">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />
              <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>

            {/* Price skeleton */}
            <div className="mb-8 p-6">
              <div className="h-12 bg-gray-200 rounded animate-pulse w-1/3 mb-4" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-3" />
              <div className="h-10 bg-gray-200 rounded animate-pulse w-2/3" />
            </div>

            {/* Variants skeleton */}
            <div className="mb-8">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="h-16 bg-gray-200 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>

            {/* Description skeleton */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mb-3" />
              <TextSkeleton lines={3} />
            </div>

            {/* Info box skeleton */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <div className="h-10 bg-gray-200 rounded animate-pulse w-2/3" />
            </div>

            {/* Action button skeleton */}
            <ButtonSkeleton className="h-12" />
          </div>
        </div>

        {/* Specifications skeleton */}
        <div className="mt-16">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/4 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products skeleton */}
      <div className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8 sm:mb-10 lg:mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gray-200 animate-pulse h-8 w-48 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
                <ImageSkeleton className="aspect-square" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-2/5" />
                  <div className="h-9 bg-gray-200 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
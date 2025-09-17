export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-[180px] sm:pt-[120px]">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4">
                <div className="aspect-square bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
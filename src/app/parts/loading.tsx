import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-[180px] sm:pt-[120px] flex items-center justify-center">
      <LoadingSpinner size="lg" message="Loading parts..." />
    </div>
  );
}
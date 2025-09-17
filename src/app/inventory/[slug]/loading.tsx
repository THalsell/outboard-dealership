import LoadingSpinner from '@/components/ui/feedback/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white -mt-20 sm:-mt-16 pt-24 sm:pt-20 flex items-center justify-center">
      <LoadingSpinner size="lg" message="Loading product details..." />
    </div>
  );
}
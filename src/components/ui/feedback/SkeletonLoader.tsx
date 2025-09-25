interface SkeletonLoaderProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: boolean;
  lines?: number;
  spacing?: string;
}

export default function SkeletonLoader({
  className = '',
  height = 'h-4',
  width = 'w-full',
  rounded = true,
  lines = 1,
  spacing = 'space-y-2'
}: SkeletonLoaderProps) {
  const baseClasses = `bg-gray-200 animate-pulse ${height} ${width} ${rounded ? 'rounded' : ''} ${className}`;

  if (lines === 1) {
    return <div className={baseClasses} />;
  }

  return (
    <div className={spacing}>
      {Array.from({ length: lines }).map((_, index) => {
        // Make last line shorter for more realistic skeleton
        const isLastLine = index === lines - 1;
        const lineWidth = isLastLine && lines > 1 ? 'w-3/4' : width;

        return (
          <div
            key={index}
            className={`bg-gray-200 animate-pulse ${height} ${lineWidth} ${rounded ? 'rounded' : ''} ${className}`}
          />
        );
      })}
    </div>
  );
}

// Preset skeleton components for common use cases
export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return <SkeletonLoader lines={lines} className={className} />;
}

export function ImageSkeleton({ className = '', aspect = 'aspect-square' }: { className?: string; aspect?: string }) {
  return <div className={`bg-gray-200 animate-pulse rounded ${aspect} ${className}`} />;
}

export function ButtonSkeleton({ className = '' }: { className?: string }) {
  return <SkeletonLoader height="h-9" width="w-full" className={className} />;
}

export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 animate-pulse ${className}`}>
      <SkeletonLoader height="h-32" className="mb-4" />
      <TextSkeleton lines={2} />
      <SkeletonLoader height="h-6" width="w-1/2" className="mt-3" />
    </div>
  );
}
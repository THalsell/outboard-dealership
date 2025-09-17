'use client';

import EmptyState from '@/components/ui/EmptyState';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-white -mt-20 sm:-mt-16 pt-24 sm:pt-20 flex items-center justify-center">
      <EmptyState
        title="Failed to load product"
        description="We couldn't load the product details. Please check your connection and try again."
        action={{
          label: "Retry",
          onClick: reset
        }}
        actionHref="/inventory"
        actionOnClick={() => {}}
        showIcon
      />
    </div>
  );
}
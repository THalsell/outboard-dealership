'use client';

import EmptyState from '@/components/ui/EmptyState';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-[180px] sm:pt-[120px]">
      <div className="container mx-auto px-4">
        <EmptyState
          title="Failed to load parts"
          description="We couldn't load the parts catalog. Please check your connection and try again."
          action={{
            label: "Retry",
            onClick: reset
          }}
          showIcon
        />
      </div>
    </div>
  );
}
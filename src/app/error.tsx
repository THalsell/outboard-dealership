'use client';

import EmptyState from '@/components/ui/EmptyState';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <EmptyState
        title="Something went wrong!"
        description={error.message || "We encountered an unexpected error. Please try again."}
        action={{
          label: "Try again",
          onClick: reset
        }}
      />
    </div>
  );
}
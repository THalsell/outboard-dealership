import { Metadata } from 'next';
import { Suspense } from 'react';
import InventoryPageClient from '@/components/pages/inventory/InventoryPageClient';

export const metadata: Metadata = {
  title: 'Outboard Motor Inventory | Shop New & Used Motors',
  description: 'Browse our complete inventory of new and used outboard motors from top brands.',
};

function LoadingFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <InventoryPageClient />
    </Suspense>
  );
}
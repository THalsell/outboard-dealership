import { Metadata } from 'next';
import { Suspense } from 'react';
import InventoryPageClient from '@/components/pages/inventory/InventoryPageClient';
import { siteConfig } from '@/config/site';

export async function generateMetadata({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const baseUrl = siteConfig.url;

  // Build canonical URL with query parameters
  const params = new URLSearchParams();

  if (searchParams.brand && typeof searchParams.brand === 'string') {
    params.append('brand', searchParams.brand);
  }
  if (searchParams.condition && typeof searchParams.condition === 'string') {
    params.append('condition', searchParams.condition);
  }
  if (searchParams.status && typeof searchParams.status === 'string') {
    params.append('status', searchParams.status);
  }
  if (searchParams.hp && typeof searchParams.hp === 'string') {
    params.append('hp', searchParams.hp);
  }
  if (searchParams.search && typeof searchParams.search === 'string') {
    params.append('search', searchParams.search);
  }

  const queryString = params.toString();
  const canonicalUrl = queryString
    ? `${baseUrl}/inventory?${queryString}`
    : `${baseUrl}/inventory`;

  // Dynamic title based on filters
  let title = 'Outboard Motor Inventory | Shop New & Used Motors';
  let description = 'Browse our complete inventory of new and used outboard motors from top brands.';

  if (searchParams.brand) {
    const brand = String(searchParams.brand);
    title = `${brand.charAt(0).toUpperCase() + brand.slice(1)} Outboard Motors | Shop ${brand.charAt(0).toUpperCase() + brand.slice(1)} Motors`;
    description = `Shop our selection of ${brand.charAt(0).toUpperCase() + brand.slice(1)} outboard motors. Authorized dealer with free shipping to lower 48 states.`;
  } else if (searchParams.condition === 'new') {
    title = 'New Outboard Motors | Shop Latest Models';
    description = 'Browse our inventory of brand new outboard motors from top manufacturers. Free shipping and financing available.';
  } else if (searchParams.condition === 'used') {
    title = 'Used Outboard Motors | Pre-Owned Marine Engines';
    description = 'Quality used and pre-owned outboard motors. All motors inspected and serviced. Free shipping available.';
  } else if (searchParams.status === 'sale') {
    title = 'Outboard Motors on Sale | Special Deals & Discounts';
    description = 'Shop outboard motors on sale. Special pricing on select models. Free shipping to lower 48 states.';
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

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
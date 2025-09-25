import { Metadata } from 'next';
import { Suspense } from 'react';
import InventoryPageClient from '@/components/pages/inventory/InventoryPageClient';
import { siteConfig } from '@/config/site';
import { generateBreadcrumbSchema, BREADCRUMB_PATTERNS } from '@/lib/seo/breadcrumb-schema';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams
}: Props): Promise<Metadata> {
  const baseUrl = siteConfig.url;
  const resolvedSearchParams = await searchParams;

  // Build canonical URL with query parameters
  const params = new URLSearchParams();

  if (resolvedSearchParams.brand && typeof resolvedSearchParams.brand === 'string') {
    params.append('brand', resolvedSearchParams.brand);
  }
  if (resolvedSearchParams.condition && typeof resolvedSearchParams.condition === 'string') {
    params.append('condition', resolvedSearchParams.condition);
  }
  if (resolvedSearchParams.status && typeof resolvedSearchParams.status === 'string') {
    params.append('status', resolvedSearchParams.status);
  }
  if (resolvedSearchParams.hp && typeof resolvedSearchParams.hp === 'string') {
    params.append('hp', resolvedSearchParams.hp);
  }
  if (resolvedSearchParams.search && typeof resolvedSearchParams.search === 'string') {
    params.append('search', resolvedSearchParams.search);
  }

  const queryString = params.toString();
  const canonicalUrl = queryString
    ? `${baseUrl}/inventory?${queryString}`
    : `${baseUrl}/inventory`;

  // Dynamic title based on filters
  let title = 'Outboard Motor Inventory | Shop New & Used Motors';
  let description = 'Browse our complete inventory of new and used outboard motors from top brands.';

  if (resolvedSearchParams.brand) {
    const brand = String(resolvedSearchParams.brand);
    title = `${brand.charAt(0).toUpperCase() + brand.slice(1)} Outboard Motors | Shop ${brand.charAt(0).toUpperCase() + brand.slice(1)} Motors`;
    description = `Shop our selection of ${brand.charAt(0).toUpperCase() + brand.slice(1)} outboard motors. Authorized dealer with free shipping to lower 48 states.`;
  } else if (resolvedSearchParams.condition === 'new') {
    title = 'New Outboard Motors | Shop Latest Models';
    description = 'Browse our inventory of brand new outboard motors from top manufacturers. Free shipping and financing available.';
  } else if (resolvedSearchParams.condition === 'used') {
    title = 'Used Outboard Motors | Pre-Owned Marine Engines';
    description = 'Quality used and pre-owned outboard motors. All motors inspected and serviced. Free shipping available.';
  } else if (resolvedSearchParams.status === 'sale') {
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

export default async function InventoryPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  // Generate breadcrumb schema based on filters
  let breadcrumbItems;
  if (resolvedSearchParams.brand && typeof resolvedSearchParams.brand === 'string') {
    const brand = resolvedSearchParams.brand.charAt(0).toUpperCase() + resolvedSearchParams.brand.slice(1);
    breadcrumbItems = BREADCRUMB_PATTERNS.inventoryBrand(brand);
  } else {
    breadcrumbItems = BREADCRUMB_PATTERNS.inventory();
  }

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={<LoadingFallback />}>
        <InventoryPageClient />
      </Suspense>
    </>
  );
}
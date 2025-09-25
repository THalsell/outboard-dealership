import PartsPageClient from '@/components/pages/parts/PartsPageClient';
import { generateBreadcrumbSchema, BREADCRUMB_PATTERNS } from '@/lib/seo/breadcrumb-schema';

export const metadata = {
  title: 'Parts & Accessories | Outboard Motors Dealership',
  description: 'Shop genuine outboard motor parts, propellers, controls, maintenance items and marine accessories. Quality OEM and aftermarket parts for all major brands.',
  keywords: 'outboard motor parts, propellers, marine parts, boat accessories, engine parts, controls, gauges, maintenance',
};

export default function PartsPage() {
  const breadcrumbItems = BREADCRUMB_PATTERNS.parts();
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PartsPageClient />
    </>
  );
}
import { Metadata } from 'next';
import InteractiveBuyingGuidePage from '@/components/pages/guides/InteractiveBuyingGuidePage';
import { generateBreadcrumbSchema, BREADCRUMB_PATTERNS } from '@/lib/seo/breadcrumb-schema';

export const metadata: Metadata = {
  title: 'Outboard Motor Buying Guide | Expert Tips',
  description: 'Interactive guide to buying the perfect outboard motor. Calculate horsepower, compare brands, and get expert advice.',
};

export default function GuidesPage() {
  const breadcrumbItems = BREADCRUMB_PATTERNS.guides();
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <InteractiveBuyingGuidePage />
    </>
  );
}
import { ComparePage } from '@/components/pages/compare/ComparePage';
import { generateBreadcrumbSchema, BREADCRUMB_PATTERNS } from '@/lib/seo/breadcrumb-schema';

export default function Page() {
  const breadcrumbItems = BREADCRUMB_PATTERNS.compare();
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ComparePage />
    </>
  );
}
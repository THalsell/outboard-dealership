import { Metadata } from 'next';
import FAQsPageClient from '@/components/pages/guides/FAQsPageClient';
import { generateBreadcrumbSchema, BREADCRUMB_PATTERNS } from '@/lib/seo/breadcrumb-schema';

export const metadata: Metadata = {
  title: 'Outboard Motor FAQs | Common Questions Answered',
  description: 'Find answers to frequently asked questions about outboard motors, service, parts, and our dealership. Expert advice and solutions.',
};

export default function FAQsPage() {
  const breadcrumbItems = BREADCRUMB_PATTERNS.faqs();
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQsPageClient />
    </>
  );
}
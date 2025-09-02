import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, unknown>;
  noindex?: boolean;
}

export default function SEOHead({
  title = "Outboard Motors Dealership - Premium Marine Motors & Service",
  description = "Your trusted source for new and used outboard motors. Honda, Yamaha, Mercury, Freedom, Suzuki, Tohatsu authorized dealer. Expert service, parts, and financing available.",
  keywords = ["outboard motors", "marine engines", "boat motors", "Honda", "Yamaha", "Mercury", "Freedom", "Suzuki", "Tohatsu"],
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  structuredData,
  noindex = false
}: SEOHeadProps) {
  const fullTitle = title.includes('Outboard Motors Dealership') 
    ? title 
    : `${title} | Outboard Motors Dealership`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Outboard Motors Dealership" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@outboarddealer" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Outboard Motors Dealership" />
      <meta name="publisher" content="Outboard Motors Dealership" />
      <meta name="geo.region" content="US-TN" />
      <meta name="geo.placename" content="Celina" />
      <meta name="geo.position" content="36.55205;-85.51139" />
      <meta name="ICBM" content="36.55205, -85.51139" />
    </Head>
  );
}
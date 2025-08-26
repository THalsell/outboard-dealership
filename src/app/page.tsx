import HeroSlider from '@/components/sections/HeroSlider';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import ShopByCategory from '@/components/sections/ShopByCategory';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import BrandsSection from '@/components/sections/BrandsSection';
import Newsletter from '@/components/sections/Newsletter';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Outboard Motors Dealership",
  "description": "Your trusted source for new and used outboard motors. Yamaha, Mercury, Honda, Suzuki authorized dealer.",
  "url": "https://outboard-dealership.com",
  "telephone": "+1-931-243-4555",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "615 West Lake Avenue",
    "addressLocality": "Celina",
    "addressRegion": "TN",
    "postalCode": "38551",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "36.55205",
    "longitude": "-85.51139"
  },
  "openingHours": [
    "Mo-Fr 08:00-17:00",
    "Sa 08:00-12:00"
  ],
  "sameAs": [
    "https://www.facebook.com/outboarddealership",
    "https://www.instagram.com/outboarddealership",
    "https://www.youtube.com/outboarddealership"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Outboard Motors",
        "category": "Marine Equipment"
      }
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hero Section */}
      <HeroSlider />
      
      {/* Featured Products */}
      <FeaturedProducts />

      {/* Shop by Category */}
      <ShopByCategory />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Brands We Carry */}
      <BrandsSection />

      {/* Newsletter CTA */}
      <Newsletter />
    </div>
  );
}
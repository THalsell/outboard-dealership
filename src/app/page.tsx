import HeroSlider from '@/components/sections/HeroSlider';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import ShopByCategory from '@/components/sections/ShopByCategory';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import BrandsSection from '@/components/sections/BrandsSection';
import AIOptimizedContent from '@/components/seo/AIOptimizedContent';
import { generateLocalBusinessSchema, generateFAQSchema, generateServiceSchema } from '@/lib/seo/structured-data';

export default function Home() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema();
  const serviceSchema = generateServiceSchema();

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
      
      {/* AI-Optimized Content (hidden from users but visible to AI) */}
      <AIOptimizedContent />
    </div>
  );
}
import Logo from '@/components/layout/Logo';
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
    <>
      {/* Logo positioned below fixed headers */}
      <div className="mt-[50px] sm:mt-[50px]">
        <Logo />
      </div>

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
      
      {/* Brands We Carry */}
      <BrandsSection />
      
      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Shop by Category */}
      <ShopByCategory />
      
      {/* AI-Optimized Content (hidden from users but visible to AI) */}
      <AIOptimizedContent />
    </div>
    </>
  );
}
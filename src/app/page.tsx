import Logo from '@/components/layout/header/Logo';
import HeroSlider from '@/components/pages/home/HeroSlider';
import FeaturedProducts from '@/components/pages/home/FeaturedProducts';
import ShopByCategory from '@/components/pages/home/ShopByCategory';
import WhyChooseUs from '@/components/pages/home/WhyChooseUs';
import BrandsSection from '@/components/pages/home/BrandsSection';
import AIOptimizedContent from '@/components/seo/AIOptimizedContent';
import { generateLocalBusinessSchema, generateFAQSchema, generateServiceSchema } from '@/lib/seo/structured-data';

export default function Home() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema();
  const serviceSchema = generateServiceSchema();

  return (
    <>
      {/* Logo positioned below fixed headers */}
      <div>
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
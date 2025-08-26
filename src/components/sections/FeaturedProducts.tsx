import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { featuredMotors } from '@/lib/data/motors';

export default function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Motors</h2>
          <p className="text-xl text-charcoal opacity-80">Top-rated motors from trusted brands</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMotors.map((motor) => (
            <ProductCard key={motor.id} motor={motor} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/inventory"
            className="inline-block bg-deep-blue text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal transition-colors"
          >
            View All Inventory
          </Link>
        </div>
      </div>
    </section>
  );
}
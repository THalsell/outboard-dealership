'use client';

import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/data/products';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const allProducts = await response.json();
        const featured = allProducts.slice(0, 4);
        setProducts(featured);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Motors</h2>
          <p className="text-xl text-charcoal opacity-80">Top-rated motors from trusted brands</p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-border-gray p-6 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
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
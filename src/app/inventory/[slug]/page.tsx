'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { Product } from '@/lib/data/products';

interface ProductImage {
  src: string;
  position?: number;
  alt?: string;
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    }
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const products: Product[] = await response.json();
        const foundProduct = products.find((p) => p.slug === slug);

        if (foundProduct) {
          foundProduct.images = foundProduct.images.map((img: ProductImage, idx: number) => ({
            src: img.src,
            position: typeof img.position === 'number' ? img.position : idx,
            alt: img.alt ?? foundProduct.title ?? 'Product image',
          }));
          // Ensure images have proper structure
          foundProduct.images = foundProduct.images.map((img: { src: string; position?: number; alt?: string }, idx: number) => ({
            src: img.src,
            position: typeof img.position === 'number' ? img.position : idx,
            alt: img.alt ?? foundProduct.title ?? 'Product image',
          }));
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
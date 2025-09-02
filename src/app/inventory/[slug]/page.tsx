import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch product data
async function getProduct(slug: string) {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? (process.env.NEXT_PUBLIC_SITE_URL || 'https://outboard-dealership.com')
      : 'http://localhost:3000';
      
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store' // Always get fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const products = await response.json();
    interface Product {
      id: string;
      handle: string;
      title: string;
      description: string;
      images: { src: string }[];
      vendor: string;
      brand: string;
      type: string;
      price: number;
      compareAtPrice?: number;
      available: boolean;
      sku: string;
      createdAt: string;
      updatedAt: string;
      tags: string[];
      category: string;
      powerCategory: string;
      horsepower: number;
      year: number;
      length: number;
      color: string;
      location: string;
      status: string;
      published: boolean;
      specs: Record<string, unknown>;
      variants: unknown[];
      priceRange: { min: number; max: number };
      inStock: boolean;
      // add other fields as needed
    }
    const product = (products as Product[]).find((p) => p.handle === slug);

    if (product) {
      product.images = product.images.map((img: { src: string; position?: number; alt?: string }, idx: number) => ({
        src: img.src,
        position: typeof img.position === 'number' ? img.position : idx,
        alt: img.alt ?? product.title ?? 'Product image',
      })) as import('@/lib/data/products').ProductImage[];
      return product as unknown as import('@/lib/data/products').Product;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} | Clay Powersports`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0].src] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
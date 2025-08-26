import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Fetch product data
async function getProduct(slug: string) {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_SITE_URL 
      : 'http://localhost:3001';
      
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store' // Always get fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const products = await response.json();
    const product = products.find((p: any) => p.handle === slug);
    
    return product;
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
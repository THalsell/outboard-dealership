// Individual product detail page
import { Metadata } from 'next';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  return {
    title: `Outboard Motor Details | Product ${params.id}`,
    description: 'View detailed specifications, pricing, and availability.',
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4">
      <h1>Product Detail Page - {params.id}</h1>
      {/* Product details will be implemented here */}
    </div>
  );
}
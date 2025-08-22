// Individual product detail page
import { Metadata } from 'next';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params; // Add this line
  return {
    title: `Outboard Motor Details | Product ${id}`, // Change params.id to id
    description: 'View detailed specifications, pricing, and availability.',
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params; // Add this line
  return (
    <div className="container mx-auto px-4">
      <h1>Product Detail Page - {id}</h1> {/* Change params.id to id */}
      {/* Product details will be implemented here */}
    </div>
  );
}
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/pages/product/ProductDetailClient";
import { Product } from "@/types/product";
import { generateProductSchema } from "@/lib/seo/structured-data";
import {
  generateBreadcrumbSchema,
  BREADCRUMB_PATTERNS,
} from "@/lib/seo/breadcrumb-schema";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    // Fetch product server-side using the specific product API
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/products/${slug}`,
      {
        cache: "force-cache", // Cache for better performance
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error("Failed to fetch product");
    }

    const product: Product = await response.json();

    // Generate structured data server-side
    const productSchema = generateProductSchema(
      product,
      `https://outboardmotorsales.com/inventory/${slug}`
    );

    // Generate breadcrumb schema
    const breadcrumbItems = BREADCRUMB_PATTERNS.product(product.title, slug);
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

    return (
      <>
        {productSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <ProductDetailClient product={product} />
      </>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}

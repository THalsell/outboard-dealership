import { Product } from "@/types/product";
import { generateProductSchema } from "@/lib/seo/structured-data";

interface ProductStructuredDataProps {
  product: Product;
  url: string;
}

export default function ProductStructuredData({ product, url }: ProductStructuredDataProps) {
  const schema = generateProductSchema(product, url);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}
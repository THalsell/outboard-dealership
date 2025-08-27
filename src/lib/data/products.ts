// Auto-generated from Shopify product export
// Generated on 2025-08-26T18:22:18.877Z

export interface ProductVariant {
  id: string;
  sku: string;
  option1Name?: string;
  option1Value?: string;
  option2Name?: string;
  option2Value?: string;
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: string;
  inventory: number;
  available: boolean;
  barcode?: string;
  taxable: boolean;
  requiresShipping: boolean;
  costPerItem: number;
}

export interface ProductImage {
  src: string;
  position: number;
  alt: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  brand: string;
  type: string;
  tags: string[];
  category: string;
  powerCategory: string;
  horsepower: number;
  published: boolean;
  images: ProductImage[];
  specs: Record<string, string>;
  variants: ProductVariant[];
  priceRange: {
    min: number;
    max: number;
  };
  inStock: boolean;
  status: string;
}

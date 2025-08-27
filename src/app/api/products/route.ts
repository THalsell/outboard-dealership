import { NextResponse } from 'next/server';
import { Product } from '@/lib/data/products';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string;
  handle: string;
  status: string;
  images: Array<{
    src: string;
    position: number;
    alt?: string;
  }>;
  variants: Array<{
    id: number;
    title: string;
    price: string;
    sku: string;
    compare_at_price?: string;
    inventory_quantity: number;
    weight: number;
    weight_unit: string;
    requires_shipping: boolean;
    taxable: boolean;
    barcode?: string;
    option1?: string;
    option2?: string;
  }>;
}

function transformShopifyProduct(shopifyProduct: ShopifyProduct): Product {
  // Extract horsepower from title
  let horsepower = 0;
  const hpMatch = shopifyProduct.title.match(/(\d+(?:\.\d+)?)\s*HP/i);
  if (hpMatch) {
    horsepower = parseFloat(hpMatch[1]);
  } else {
    // Try to extract from model numbers (F150, VF250, etc.)
    const modelMatch = shopifyProduct.title.match(/[A-Z]*(\d+)/);
    if (modelMatch && parseInt(modelMatch[1]) > 1 && parseInt(modelMatch[1]) < 500) {
      horsepower = parseInt(modelMatch[1]);
    }
  }

  // Determine power category
  let powerCategory = 'portable';
  if (horsepower > 30 && horsepower <= 100) {
    powerCategory = 'mid-range';
  } else if (horsepower > 100 && horsepower <= 200) {
    powerCategory = 'high-performance';
  } else if (horsepower > 200) {
    powerCategory = 'commercial';
  }

  // Transform variants
  const variants = shopifyProduct.variants.map(variant => ({
      id: variant.id.toString(),
      sku: variant.sku,
      option1Name: variant.option1 ? 'Shaft Length' : undefined,
      option1Value: variant.option1 || undefined,
      option2Name: variant.option2 ? 'Color' : undefined,
      option2Value: variant.option2 || undefined,
    price: parseFloat(variant.price),
    compareAtPrice: variant.compare_at_price ? parseFloat(variant.compare_at_price) : parseFloat(variant.price),
    weight: variant.weight,
      weightUnit: variant.weight_unit,
      inventory: variant.inventory_quantity,
      available: variant.inventory_quantity > 0,
      barcode: variant.barcode,
      taxable: variant.taxable,
      requiresShipping: variant.requires_shipping,
      costPerItem: parseFloat(variant.price) * 0.7,
  }));

  // Calculate price range
  const prices = variants.map(v => v.price);
  const priceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };

  return {
    id: shopifyProduct.id.toString(),
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.body_html.replace(/<[^>]*>/g, ''), // Strip HTML tags
    vendor: shopifyProduct.vendor,
    brand: shopifyProduct.vendor.replace(' Marine', '').replace(' Motor Corporation', '').replace(' Corporation', ''),
    type: shopifyProduct.product_type,
    tags: shopifyProduct.tags ? shopifyProduct.tags.split(', ') : [],
    category: 'outboard',
    powerCategory,
    horsepower,
    published: shopifyProduct.status === 'active',
    images: shopifyProduct.images.map(img => ({
      src: img.src,
      position: img.position,
      alt: img.alt || shopifyProduct.title,
    })),
    specs: {},
    variants,
    priceRange,
    inStock: variants.some(v => v.inventory > 0),
    status: shopifyProduct.status,
  };
}

export async function GET() {
  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/products.json?limit=250`,
      {
        method: 'GET',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();
    const products = data.products.map((product: ShopifyProduct) => transformShopifyProduct(product));
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
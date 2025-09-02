import { NextResponse } from 'next/server';
import { fetchProduct } from '@/lib/shopify';
import { Product } from '@/lib/data/products';

// Transform detailed GraphQL product to our Product type
interface GraphQLProduct {
  id: string;
  handle: string;
  title: string;
  description?: string;
  vendor?: string;
  images?: {
    edges: { node: { url: string; altText?: string } }[];
  };
  variants?: {
    edges: {
      node: {
        id: string;
        sku?: string;
        title: string;
        price?: { amount: string };
        compareAtPrice?: { amount: string };
        quantityAvailable?: number;
        availableForSale?: boolean;
      };
    }[];
  };
  options?: { name: string }[];
  metafields?: {
    edges: {
      node: {
        namespace: string;
        key: string;
        value: string;
      };
    }[];
  };
}

function transformDetailedGraphQLProduct(graphqlProduct: GraphQLProduct): Product {
  if (!graphqlProduct) {
    throw new Error('Product not found');
  }

  // Extract horsepower from title
  let horsepower = 0;
  const title = graphqlProduct.title as string;
  const hpMatch = title.match(/(\d+(?:\.\d+)?)\s*HP/i);
  if (hpMatch) {
    horsepower = parseFloat(hpMatch[1]);
  } else {
    // Try to extract from model numbers (F150, VF250, etc.)
    const modelMatch = title.match(/[A-Z]*(\d+)/);
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

  // Extract brand from title or use a fallback
  const brand = (graphqlProduct.title as string).split(' ')[0] || 'Unknown';

  // Get all images
  const images =
    (graphqlProduct.images &&
      typeof graphqlProduct.images === 'object' &&
      Array.isArray((graphqlProduct.images as { edges: { node: { url: string; altText?: string } }[] }).edges)
      ? (graphqlProduct.images as { edges: { node: { url: string; altText?: string } }[] }).edges.map(
          (edge: { node: { url: string; altText?: string } }, index: number) => ({
            src: edge.node.url,
            position: index + 1,
            alt: edge.node.altText || graphqlProduct.title,
          })
        )
      : []
    );

  // Get all variants with detailed info
  const variants =
    graphqlProduct.variants &&
    Array.isArray(graphqlProduct.variants.edges)
      ? graphqlProduct.variants.edges.map((edge: { node: {
          id: string;
          sku?: string;
          title: string;
          price?: { amount: string };
          compareAtPrice?: { amount: string };
          quantityAvailable?: number;
          availableForSale?: boolean;
        } }) => {
          const variant = edge.node;
          return {
            id: variant.id,
            sku: variant.sku || '',
            option1Name: graphqlProduct.options?.[0]?.name || 'Shaft Length',
            option1Value: variant.title !== 'Default Title' ? variant.title : undefined,
            option2Name: graphqlProduct.options?.[1]?.name,
            option2Value: undefined, // Would need to parse from variant title
            price: parseFloat(variant.price?.amount || '0'),
            compareAtPrice: variant.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : parseFloat(variant.price?.amount || '0'),
            weight: 0, // Could be populated from metafields
            weightUnit: 'kg',
            inventory: variant.quantityAvailable || 0,
            available: !!variant.availableForSale && (variant.quantityAvailable ?? 0) > 0,
            taxable: true,
            requiresShipping: true,
            costPerItem: parseFloat(variant.price?.amount || '0') * 0.7,
          };
        })
      : [];

  // Calculate price range
  const prices = variants.map(v => v.price);
  const priceRange = {
    min: prices.length > 0 ? Math.min(...prices) : 0,
    max: prices.length > 0 ? Math.max(...prices) : 0,
  };

  // Extract specs from metafields
  const specs: Record<string, string> = {};
  if (graphqlProduct.metafields?.edges) {
    graphqlProduct.metafields.edges.forEach((edge: { node: { namespace: string; key: string; value: string } }) => {
      const metafield = edge.node;
      if (metafield.namespace === 'specs' || metafield.namespace === 'custom') {
        specs[metafield.key] = metafield.value;
      }
    });
  }

  return {
    id: graphqlProduct.id,
    handle: graphqlProduct.handle,
    title: graphqlProduct.title,
    description: graphqlProduct.description || '',
    vendor: brand,
    brand: brand,
    type: 'Outboard Motor',
    tags: [], // Could be added to GraphQL query if needed
    category: 'outboard',
    powerCategory,
    horsepower,
    published: true,
    images,
    specs,
    variants,
    priceRange,
    inStock: variants.some(v => v.inventory > 0),
    status: 'active',
  };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;

    if (!handle) {
      return NextResponse.json(
        { error: 'Product handle is required' },
        { status: 400 }
      );
    }

    // Fetch product using GraphQL Storefront API
    const graphqlProduct = await fetchProduct(handle);

    // Check for valid product shape
    if (
      !graphqlProduct ||
      typeof graphqlProduct !== 'object' ||
      !(graphqlProduct as GraphQLProduct).id ||
      !(graphqlProduct as GraphQLProduct).handle ||
      !(graphqlProduct as GraphQLProduct).title
    ) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Transform to our Product type
    const product = transformDetailedGraphQLProduct(graphqlProduct as GraphQLProduct);

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
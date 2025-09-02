import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/shopify';
import { Product } from '@/lib/data/products';

// Transform GraphQL product to our Product type
interface GraphQLProduct {
  id: string;
  handle: string;
  title: string;
  description?: string;
  images?: {
    edges: Array<{
      node: {
        url: string;
        altText?: string;
      };
    }>;
  };
  metafields?: Array<{
    namespace?: string;
    key: string;
    value: string;
  }>;
  variants?: {
    edges: Array<{
      node: {
        id: string;
        sku?: string;
        title: string;
        price?: { amount: string };
        compareAtPrice?: { amount: string };
        quantityAvailable?: number;
        availableForSale?: boolean;
        selectedOptions?: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
}

function transformGraphQLProduct(graphqlProduct: GraphQLProduct): Product {
  // Extract horsepower from title
  let horsepower = 0;
  const hpMatch = graphqlProduct.title.match(/(\d+(?:\.\d+)?)\s*HP/i);
  if (hpMatch) {
    horsepower = parseFloat(hpMatch[1]);
  } else {
    // Try to extract from model numbers (F150, VF250, etc.)
    const modelMatch = graphqlProduct.title.match(/[A-Z]*(\d+)/);
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
  const brand = graphqlProduct.title.split(' ')[0] || 'Unknown';

  // Get main image
  const images = graphqlProduct.images?.edges?.map((edge: { node: { url: string; altText?: string } }, index: number) => ({
    src: edge.node.url,
    position: index + 1,
    alt: edge.node.altText || graphqlProduct.title,
  })) || [];

  // Extract specifications from metafields
  const specs: Record<string, string> = {};
  if (graphqlProduct.metafields && Array.isArray(graphqlProduct.metafields)) {
    graphqlProduct.metafields.forEach((metafield: { namespace?: string; key: string; value: string }) => {
      if (metafield && metafield.value && metafield.key) {
        // Create a key with namespace.key format for better organization
        const fullKey = metafield.namespace ? `${metafield.namespace}.${metafield.key}` : metafield.key;
        specs[fullKey] = metafield.value;
      }
    });
  } else {
  }

  // Get variant info
  type VariantEdge = {
    node: {
      id: string;
      sku?: string;
      title: string;
      price?: { amount: string };
      compareAtPrice?: { amount: string };
      quantityAvailable?: number;
      availableForSale?: boolean;
      selectedOptions?: Array<{
        name: string;
        value: string;
      }>;
    };
  };

  const variants = graphqlProduct.variants?.edges?.map((edge: VariantEdge) => {
    const variant = edge.node;
    
    // Extract shaft length from selectedOptions
    let option1Name = 'Shaft Length';
    let option1Value = undefined;
    
    if (variant.selectedOptions && variant.selectedOptions.length > 0) {
      // Look for shaft length option
      const shaftOption = variant.selectedOptions.find((opt) => 
        opt.name.toLowerCase().includes('shaft') || 
        opt.name.toLowerCase().includes('length')
      );
      
      if (shaftOption) {
        option1Name = shaftOption.name;
        option1Value = shaftOption.value;
      } else if (variant.selectedOptions[0]) {
        // Use first option if no shaft length found
        option1Name = variant.selectedOptions[0].name;
        option1Value = variant.selectedOptions[0].value;
      }
    } else if (variant.title !== 'Default Title') {
      // Fallback to variant title
      option1Value = variant.title;
    }
    
    return {
      id: variant.id,
      sku: variant.sku || '',
      option1Name,
      option1Value,
      price: parseFloat(variant.price?.amount || '0'),
      compareAtPrice: variant.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : parseFloat(variant.price?.amount || '0'),
      weight: 0, // GraphQL doesn't return weight in basic query
      weightUnit: 'kg',
      inventory: variant.quantityAvailable || 0,
      available: !!(variant.availableForSale && (variant.quantityAvailable ?? 0) > 0),
      taxable: true,
      requiresShipping: true,
      costPerItem: parseFloat(variant.price?.amount || '0') * 0.7,
    };
  }) || [];

  // Calculate price range
  const prices = variants.map(v => v.price);
  const priceRange = {
    min: prices.length > 0 ? Math.min(...prices) : 0,
    max: prices.length > 0 ? Math.max(...prices) : 0,
  };

  return {
    id: graphqlProduct.id,
    handle: graphqlProduct.handle,
    title: graphqlProduct.title,
    description: graphqlProduct.description || '',
    vendor: brand,
    brand: brand,
    type: 'Outboard Motor',
    tags: [], // GraphQL basic query doesn't include tags
    category: 'outboard',
    powerCategory,
    horsepower,
    published: true, // Products returned by Storefront API are published
    images,
    specs, // Now populated from metafields
    variants,
    priceRange,
    inStock: variants.some(v => v.inventory > 0),
    status: 'active',
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const limit = parseInt(searchParams.get('limit') || '50');

    // Fetch products using GraphQL Storefront API
    const graphqlProducts = await fetchProducts(query, limit) as GraphQLProduct[];

    if (!graphqlProducts) {
      throw new Error('Failed to fetch products from Shopify');
    }

    // Transform to our Product type
    const products = graphqlProducts.map(transformGraphQLProduct);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
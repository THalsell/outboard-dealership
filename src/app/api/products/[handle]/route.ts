import { NextResponse } from 'next/server';
import { fetchProduct } from '@/lib/shopify/client';
import { Product } from '@/types/product';

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

  // Extract specs from metafields - convert key to display name
  const specs: Record<string, string> = {};
  
  // Handle both array format (new) and edges format (old)
  const metafieldsArray = Array.isArray(graphqlProduct.metafields) 
    ? graphqlProduct.metafields 
    : graphqlProduct.metafields?.edges?.map((edge: { node: { namespace: string; key: string; value: string; type?: string } }) => edge.node) || [];
  
  // Debug logging
  console.log('Metafields array length:', metafieldsArray.length);
  console.log('Raw metafields structure:', JSON.stringify(metafieldsArray, null, 2));
  
  metafieldsArray.forEach((metafield: { namespace: string; key: string; value: string; type?: string }, index: number) => {
    // Skip null metafields
    if (!metafield) {
      console.log(`Skipping null metafield at index ${index}`);
      return;
    }
    
    console.log(`Processing metafield ${index}: ${metafield.namespace}.${metafield.key} = "${metafield.value}" (type: ${metafield.type})`);
    
    if (metafield.value && metafield.value.trim() !== '') {
      // Convert key to display name format that the website expects
      const displayName = keyToDisplayName(metafield.key);
      specs[displayName] = metafield.value;
      
      // Also keep the original key format for backward compatibility
      specs[metafield.key] = metafield.value;
      
      // Add namespace+key combination for backward compatibility
      specs[`${metafield.namespace}.${metafield.key}`] = metafield.value;
      
      console.log(`✓ Added spec: "${displayName}" = "${metafield.value}"`);
    } else {
      console.log(`✗ Skipped metafield (empty value): ${metafield.namespace}.${metafield.key}`);
    }
  });
  
  console.log('Final specs object keys:', Object.keys(specs));
  console.log('Final specs object:', JSON.stringify(specs, null, 2));

  // Helper function to convert key to display name
  function keyToDisplayName(key: string): string {
    const keyMap: Record<string, string> = {
      'horsepower': 'Horsepower',
      'brand': 'Brand',
      'model': 'Model',
      'sku': 'SKU',
      'type': 'Type',
      'power_category': 'Power Category',
      'condition': 'Condition',
      'stock_status': 'Stock Status',
      'displacement': 'Displacement',
      'cylinders': 'Cylinders',
      'stroke_type': 'Stroke Type',
      'engine_type': 'Engine Type',
      'cooling_system': 'Cooling System',
      'ignition': 'Ignition',
      'starting_system': 'Starting System',
      'fuel_induction_system': 'Fuel Induction System',
      'compression_ratio': 'Compression Ratio',
      'bore_x_stroke': 'Bore x Stroke',
      'weight': 'Weight',
      'shaft_length': 'Shaft Length',
      'width_w': 'Width (W)',
      'gear_ratio': 'Gear Ratio',
      'propeller': 'Propeller',
      'tilt_positions': 'Tilt Positions',
      'power_trim_tilt': 'Power Trim & Tilt',
      'fuel_tank_type': 'Fuel Tank Type',
      'fuel_type': 'Fuel Type',
      'recommended_oil': 'Recommended Oil',
      'lubrication_system': 'Lubrication System',
      'throttle_control': 'Throttle Control',
      'steering': 'Steering',
      'shift_system': 'Shift System',
      'control_type': 'Control Type',
      'steering_type': 'Steering Type',
      'warranty_period': 'Warranty Period',
      'extended_warranty_available': 'Extended Warranty Available',
      'service_intervals': 'Service Intervals'
    };
    
    return keyMap[key] || key.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  return {
    id: graphqlProduct.id,
    handle: graphqlProduct.handle,
    slug: graphqlProduct.handle, // Added slug property
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
    console.log('Fetching product with handle:', handle);
    const graphqlProduct = await fetchProduct(handle);

    console.log('Raw GraphQL product response:', JSON.stringify(graphqlProduct, null, 2));

    // Check for valid product shape
    if (
      !graphqlProduct ||
      typeof graphqlProduct !== 'object' ||
      !(graphqlProduct as GraphQLProduct).id ||
      !(graphqlProduct as GraphQLProduct).handle ||
      !(graphqlProduct as GraphQLProduct).title
    ) {
      console.log('Product validation failed:', {
        exists: !!graphqlProduct,
        isObject: typeof graphqlProduct === 'object',
        hasId: !!(graphqlProduct as GraphQLProduct)?.id,
        hasHandle: !!(graphqlProduct as GraphQLProduct)?.handle,
        hasTitle: !!(graphqlProduct as GraphQLProduct)?.title
      });
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
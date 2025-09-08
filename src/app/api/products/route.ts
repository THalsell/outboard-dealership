import { NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/shopify';
import { Product } from '@/lib/data/products';

// Transform GraphQL product to our Product type
interface GraphQLProduct {
  id: string;
  handle: string;
  title: string;
  description?: string;
  tags?: string[];
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

  // Extract specifications and condition from metafields
  const specs: Record<string, string> = {};
  let condition: 'new' | 'used' | 'refurbished' = 'new';
  
  if (graphqlProduct.metafields && Array.isArray(graphqlProduct.metafields)) {
    graphqlProduct.metafields.forEach((metafield: { namespace?: string; key: string; value: string }) => {
      if (metafield && metafield.value && metafield.key) {
        // Handle condition separately
        if (metafield.namespace === 'motor' && metafield.key === 'condition') {
          const conditionValue = metafield.value.toLowerCase();
          if (conditionValue === 'used' || conditionValue === 'refurbished') {
            condition = conditionValue as 'used' | 'refurbished';
          } else {
            condition = 'new';
          }
        } else {
          // Map metafields to our specification keys
          const specKey = getSpecificationKey(metafield.namespace, metafield.key);
          if (specKey) {
            specs[specKey] = metafield.value;
          }
        }
      }
    });
  }

  // Helper function to map Shopify metafields to our specification keys
  function getSpecificationKey(namespace?: string, key?: string): string | null {
    if (!namespace || !key) return null;
    
    const mapping: Record<string, Record<string, string>> = {
      'engine': {
        'displacement': 'Displacement',
        'cylinders': 'Cylinders',
        'stroke_type': 'Stroke Type',
        'engine_type': 'Engine Type',
        'cooling_system': 'Cooling System',
        'ignition': 'Ignition',
        'starting_system': 'Starting System',
        'fuel_induction_system': 'Fuel Induction System',
        'compression_ratio': 'Compression Ratio',
        'bore_x_stroke': 'Bore x Stroke'
      },
      'physical': {
        'weight': 'Weight',
        'shaft_length': 'Shaft Length',
        'width': 'Width (W)'
      },
      'mechanical': {
        'gear_ratio': 'Gear Ratio',
        'propeller': 'Propeller',
        'tilt_positions': 'Tilt Positions',
        'power_trim_tilt': 'Power Trim & Tilt'
      },
      'fuel': {
        'fuel_tank_type': 'Fuel Tank Type',
        'fuel_type': 'Fuel Type',
        'recommended_oil': 'Recommended Oil',
        'lubrication_system': 'Lubrication System'
      },
      'controls': {
        'throttle_control': 'Throttle Control',
        'steering': 'Steering',
        'shift_system': 'Shift System',
        'control_type': 'Control Type',
        'steering_type': 'Steering Type'
      },
      'warranty': {
        'warranty_period': 'Warranty Period',
        'extended_warranty_available': 'Extended Warranty Available',
        'service_intervals': 'Service Intervals'
      },
      'custom': {
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
        'service_intervals': 'Service Intervals',
        'horsepower': 'Horsepower',
        'brand': 'Brand',
        'model': 'Model',
        'sku': 'SKU',
        'type': 'Type',
        'power_category': 'Power Category',
        'condition': 'Condition',
        'stock_status': 'Stock Status',
        'controls': 'Controls'
      }
    };

    return mapping[namespace]?.[key] || null;
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
    slug: graphqlProduct.handle, // Added slug property
    title: graphqlProduct.title,
    description: graphqlProduct.description || '',
    vendor: brand,
    brand: brand,
    type: 'Outboard Motor',
    tags: graphqlProduct.tags || [], // Now includes tags from GraphQL
    category: 'outboard',
    powerCategory,
    horsepower,
    published: true, // Products returned by Storefront API are published
    images,
    specs, // Now populated from metafields with proper mapping
    variants,
    priceRange,
    inStock: variants.some(v => v.inventory > 0),
    status: 'active',
    condition, // Now extracted from metafields
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status'); // Get status filter
    const condition = searchParams.get('condition'); // Get condition filter

    // Fetch products using GraphQL Storefront API
    const graphqlProducts = await fetchProducts(query, limit) as GraphQLProduct[];

    if (!graphqlProducts) {
      throw new Error('Failed to fetch products from Shopify');
    }

    // Transform to our Product type
    let products = graphqlProducts.map(transformGraphQLProduct);
    
    // Apply filters
    if (status === 'overstock') {
      products = products.filter(product => 
        product.tags.some(tag => tag.toLowerCase() === 'overstock')
      );
    }
    
    if (status === 'sale') {
      products = products.filter(product => 
        product.tags.some(tag => tag.toLowerCase().includes('sale'))
      );
    }
    
    if (condition) {
      products = products.filter(product => 
        product.condition?.toLowerCase() === condition.toLowerCase()
      );
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
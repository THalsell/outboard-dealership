import { Motor } from '@/types/models/motor';

// Type definitions for Shopify API response
interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  tags: string;
  status: string;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  options: ShopifyOption[];
}

interface ShopifyVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  compare_at_price?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  inventory_quantity: number;
  sku: string;
  weight: number;
  weight_unit: string;
  inventory_management: string;
  barcode?: string;
}

interface ShopifyImage {
  id: number;
  product_id: number;
  src: string;
  alt?: string;
  width: number;
  height: number;
}

interface ShopifyOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

// Transform Shopify product to Motor interface
export function transformShopifyProductToMotor(product: ShopifyProduct): Motor[] {
  const baseMotor = {
    brand: product.vendor.replace(' Marine', ''), // Convert "Honda Marine" to "Honda"
    model: product.title.split(' ').slice(1).join(' '), // Remove brand from title
    year: new Date().getFullYear(), // Default to current year
    type: 'outboard' as const,
    fuelType: 'gasoline' as const,
    images: product.images.map(img => img.src),
    features: extractFeaturesFromDescription(product.body_html),
    specifications: {},
    warranty: extractWarrantyFromTags(product.tags),
    condition: 'new' as const,
    featured: product.tags.toLowerCase().includes('featured'),
    bestSeller: product.tags.toLowerCase().includes('bestseller'),
  };

  // Create a motor for each variant
  return product.variants.map((variant, index) => {
    const horsepower = extractHorsepowerFromTitle(product.title);
    const shaftLength = extractShaftLength(variant.title || variant.option1);
    
    return {
      ...baseMotor,
      id: `${product.id}-${variant.id}`,
      horsepower,
      cylinders: extractCylindersFromDescription(product.body_html),
      displacement: extractDisplacementFromDescription(product.body_html),
      weight: variant.weight || 0,
      shaftLength,
      price: parseFloat(variant.price),
      salePrice: variant.compare_at_price ? parseFloat(variant.compare_at_price) : undefined,
      inStock: variant.inventory_quantity > 0,
      stockQuantity: variant.inventory_quantity,
      rating: generateRatingFromTags(product.tags),
      reviewCount: Math.floor(Math.random() * 100) + 20, // Mock review count
    } as Motor;
  });
}

// Helper functions to extract data from Shopify fields
function extractHorsepowerFromTitle(title: string): number {
  const match = title.match(/(\d+(?:\.\d+)?)\s*HP|BF(\d+(?:\.\d+)?)|F(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)$/);
  if (match) {
    return parseFloat(match[1] || match[2] || match[3] || match[4] || '0');
  }
  return 0;
}

function extractShaftLength(option: string | undefined): 'short' | 'long' | 'extra-long' | undefined {
  if (!option) return undefined;
  
  const optionLower = option.toLowerCase();
  if (optionLower.includes('15') || optionLower.includes('short')) return 'short';
  if (optionLower.includes('20') || optionLower.includes('long')) return 'long';
  if (optionLower.includes('25') || optionLower.includes('30') || optionLower.includes('extra')) return 'extra-long';
  return 'long'; // Default
}

function extractFeaturesFromDescription(bodyHtml: string): string[] {
  const features: string[] = [];
  
  // Remove HTML tags and extract list items
  const text = bodyHtml.replace(/<[^>]*>/g, '');
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  lines.forEach(line => {
    if (line.includes(':') && !line.includes('Type') && !line.includes('Displacement')) {
      const feature = line.split(':')[0].trim();
      if (feature.length > 3 && feature.length < 30) {
        features.push(feature);
      }
    }
  });

  // Add common features based on tags and content
  if (text.includes('VTEC')) features.push('VTEC Technology');
  if (text.includes('EFI') || text.includes('PGM-FI')) features.push('Electronic Fuel Injection');
  if (text.includes('Electric Start')) features.push('Electric Start');
  if (text.includes('iST')) features.push('Intelligent Shift & Throttle');
  
  return features.slice(0, 6); // Limit to 6 features
}

function extractCylindersFromDescription(bodyHtml: string): number | undefined {
  const match = bodyHtml.match(/(\d+)[\s-]*cylinder/i);
  return match ? parseInt(match[1]) : undefined;
}

function extractDisplacementFromDescription(bodyHtml: string): number | undefined {
  const match = bodyHtml.match(/(\d+(?:\.\d+)?)\s*cc|(\d+)\s*L/i);
  if (match) {
    if (match[1]) return parseFloat(match[1]);
    if (match[2]) return parseFloat(match[2]) * 1000; // Convert liters to cc
  }
  return undefined;
}

function extractWarrantyFromTags(tags: string): string | undefined {
  const warrantyMatch = tags.match(/(\d+)\s*year/i);
  return warrantyMatch ? `${warrantyMatch[1]} Year Limited Warranty` : undefined;
}

function generateRatingFromTags(tags: string): number | undefined {
  // Generate rating based on product features/tags
  let rating = 4.0;
  
  if (tags.includes('VTEC')) rating += 0.3;
  if (tags.includes('bestseller')) rating += 0.2;
  if (tags.includes('featured')) rating += 0.1;
  if (tags.includes('Honda') || tags.includes('Yamaha')) rating += 0.2;
  
  return Math.min(Math.round(rating * 10) / 10, 5.0);
}

// Fetch and transform products from Shopify API
export async function fetchMotorsFromShopify(): Promise<Motor[]> {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    const motors: Motor[] = [];
    
    data.products.forEach((product: ShopifyProduct) => {
      const transformedMotors = transformShopifyProductToMotor(product);
      motors.push(...transformedMotors);
    });
    
    return motors;
  } catch (error) {
    console.error('Error fetching motors from Shopify:', error);
    return [];
  }
}

// Get featured motors (first 4 with featured tag)
export async function getFeaturedMotors(): Promise<Motor[]> {
  const motors = await fetchMotorsFromShopify();
  return motors.filter(motor => motor.featured).slice(0, 4);
}
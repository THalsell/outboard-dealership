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
  slug: string;
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
  
  // AI-critical properties for search visibility
  engineType?: '2-Stroke' | '4-Stroke' | 'Electric' | 'Diesel';
  fuelType?: 'Gasoline' | 'Electric' | 'Diesel' | 'Propane';
  shaftLength?: 'Short (15")' | 'Long (20")' | 'Extra Long (25")' | 'Ultra Long (30")';
  coolingSystem?: 'Water Cooled' | 'Air Cooled' | 'Liquid Cooled';
  startingSystem?: 'Electric Start' | 'Manual Start' | 'Electric & Manual';
  controlType?: 'Tiller' | 'Remote Control' | 'Tiller or Remote' | 'Digital Throttle';
  propellerIncluded?: boolean;
  weight?: number; // in lbs
  displacement?: number; // in cc
  cylinders?: number;
  gearRatio?: string;
  alternator?: string; // e.g., "12V 16A"
  trimTilt?: 'Manual' | 'Power' | 'Power Trim & Tilt';
  warranty?: string; // e.g., "5 Year Limited"
  fuelCapacity?: number; // in gallons
  oilCapacity?: number; // in quarts
  
  // Additional searchable attributes
  isPortable?: boolean;
  isCommercial?: boolean;
  isSaltwater?: boolean;
  isHighPerformance?: boolean;
  isFourStroke?: boolean;
  isTwoStroke?: boolean;
  isElectric?: boolean;
  hasElectricStart?: boolean;
  hasPowerTrimTilt?: boolean;
  hasRemoteControl?: boolean;
  
  // SEO-optimized fields
  seoKeywords?: string[]; // Additional keywords for AI matching
  applicationTypes?: string[]; // e.g., ["fishing", "pontoon", "bass boat", "sailboat"]
  boatSizeRange?: string; // e.g., "14-16 ft boats"
  
  // Ratings and reviews (important for AI)
  rating?: number;
  reviewCount?: number;
  
  // Condition and year
  condition?: 'new' | 'used' | 'refurbished';
  year?: number;
  modelYear?: number;
}

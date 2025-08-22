export interface Part {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  salePrice?: number;
  isOEM: boolean;
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  specifications: Record<string, string>;
  compatibleMotors: string[]; // Motor model IDs
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  warranty?: string;
  minOrderQuantity: number;
  bulkPricing?: Array<{
    quantity: number;
    price: number;
  }>;
  relatedParts: string[]; // Part IDs
  tags: string[];
  featured?: boolean;
  bestseller?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface PartCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  parentId?: string;
  subcategories?: PartCategory[];
  partCount: number;
  featured?: boolean;
}

export interface BulkOrderItem {
  partId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PartCompatibility {
  partId: string;
  motorBrand: string;
  motorModel: string;
  motorYear: number;
  horsepower?: number;
  notes?: string;
}

export interface PartsFilter {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  isOEMOnly: boolean;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  compatibleMotorId?: string;
  searchQuery: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
}
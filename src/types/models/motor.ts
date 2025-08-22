export interface Motor {
  id: string;
  brand: string;
  model: string;
  year: number;
  horsepower: number;
  type: 'outboard' | 'inboard' | 'sterndrive';
  fuelType: 'gasoline' | 'diesel' | 'electric';
  cylinders?: number;
  displacement?: number;
  weight: number;
  shaftLength?: 'short' | 'long' | 'extra-long';
  price: number;
  salePrice?: number;
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  warranty?: string;
  condition: 'new' | 'used' | 'certified-preowned';
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface MotorCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  motorCount: number;
}
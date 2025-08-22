
import { Part } from './part';

// Product-related type definitions
export interface OutboardMotor {
  id: string;
  sku: string;
  model: string;
  brand: string;
  year: number;
  horsepower: number;
  type: 'two-stroke' | 'four-stroke' | 'electric';
  shaftLength: 'short' | 'long' | 'extra-long';
  condition: 'new' | 'used' | 'refurbished';
  price: number;
  salePrice?: number;
  inStock: boolean;
  stockQuantity: number;
  images: ProductImage[];
  specifications: MotorSpecification[];
  features: string[];
  warranty?: Warranty;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface MotorSpecification {
  category: string;
  specs: {
    name: string;
    value: string;
  }[];
}

export interface Warranty {
  id: string;
  name: string;
  duration: string;
  coverage: string[];
  price?: number;
}

export interface CompatibilityInfo {
  brand: string;
  models: string[];
  years: number[];
}

export interface BoatPackage {
  id: string;
  name: string;
  description: string;
  motor: OutboardMotor;
  accessories: Part[];
  totalPrice: number;
  discountedPrice?: number;
  savings?: number;
  image: string;
}
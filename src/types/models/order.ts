// Order and transaction type definitions
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export interface OrderItem {
  id: string;
  productId: string;
  productType: 'motor' | 'part' | 'accessory';
  name: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
  warranty?: WarrantyPurchase;
}

export interface WarrantyPurchase {
  warrantyId: string;
  name: string;
  duration: string;
  price: number;
}

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'financing' | 'paypal' | 'bank_transfer';
  last4?: string;
  brand?: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  estimatedTax: number;
  estimatedShipping: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  productType: 'motor' | 'part' | 'accessory';
  quantity: number;
  price: number;
  selectedOptions?: Record<string, any>;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  userId: string;
  items: QuoteItem[];
  subtotal: number;
  discount?: number;
  tax: number;
  total: number;
  validUntil: Date;
  status: 'draft' | 'sent' | 'accepted' | 'expired';
  notes?: string;
  createdAt: Date;
}

export interface QuoteItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
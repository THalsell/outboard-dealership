// Cart and shopping types for outboard motor dealership

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
  variantId?: string;
  productType: 'motor';
  name: string;        
  quantity: number;
  price: number;
  image?: string;      
  selectedOptions?: Record<string, unknown>;
}

// Basic address type for shipping
export interface Address {
  firstName?: string;       
  lastName?: string;        
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
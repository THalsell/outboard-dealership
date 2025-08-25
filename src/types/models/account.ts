// Additional account-related type definitions


export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  searchCriteria: SearchCriteria;
  category: 'motors' | 'parts' | 'accessories';
  alertsEnabled: boolean;
  createdAt: Date;
}

export interface SearchCriteria {
  query?: string;
  brand?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  location?: string;
  condition?: 'new' | 'used';
  specifications?: Record<string, unknown>;
}

export interface AuthenticationData {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  acceptTerms: boolean;
  subscribeNewsletter?: boolean;
}

export interface PasswordReset {
  email: string;
  token?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface AccountSettings {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    avatar?: string;
    bio?: string;
    company?: string;
  };
  addresses: Address[];
  preferences: UserPreferences;
  security: SecuritySettings;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastPasswordChange: Date;
  loginNotifications: boolean;
}

export interface NotificationPreferences {
  email: {
    orderUpdates: boolean;
    serviceReminders: boolean;
    promotions: boolean;
    newsletter: boolean;
    priceAlerts: boolean;
  };
  sms: {
    orderUpdates: boolean;
    serviceReminders: boolean;
    emergencyNotices: boolean;
  };
  push: {
    orderUpdates: boolean;
    serviceReminders: boolean;
    promotions: boolean;
    chat: boolean;
  };
}

export interface OrderTracking {
  orderId: string;
  status: OrderStatus;
  statusHistory: OrderStatusUpdate[];
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Date;
  deliveryAddress: Address;
}

export interface OrderStatusUpdate {
  status: OrderStatus;
  message: string;
  timestamp: Date;
  location?: string;
}

export interface ServiceReminder {
  id: string;
  userId: string;
  motorId: string;
  type: 'maintenance' | 'inspection' | 'seasonal';
  title: string;
  description: string;
  dueDate: Date;
  hoursInterval?: number;
  acknowledged: boolean;
  createdAt: Date;
}

export interface LoyaltyAccount {
  id: string;
  userId: string;
  currentPoints: number;
  totalEarned: number;
  tier: LoyaltyTier;
  tierProgress: {
    current: number;
    required: number;
    nextTier?: LoyaltyTier;
  };
  transactions: LoyaltyTransaction[];
}

export interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  orderId?: string;
  serviceId?: string;
  date: Date;
  expiresAt?: Date;
}

// Re-export necessary types from other files
import type { User, UserRole, UserProfile, Address, UserPreferences, LoyaltyTier, BoatInfo } from './user';
import type { Order, OrderStatus, OrderItem, PaymentMethod, PaymentStatus } from './order';

export type { User, UserRole, UserProfile, Address, UserPreferences, LoyaltyTier, BoatInfo };
export type { Order, OrderStatus, OrderItem, PaymentMethod, PaymentStatus };
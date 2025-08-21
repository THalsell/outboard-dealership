// User and customer type definitions
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
  addresses?: Address[];
  preferences?: UserPreferences;
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  DEALER = 'DEALER',
  ADMIN = 'ADMIN',
  SERVICE_TECH = 'SERVICE_TECH',
  SALES_REP = 'SALES_REP'
}

export interface UserProfile {
  id: string;
  userId: string;
  avatar?: string;
  bio?: string;
  company?: string;
  boatInfo?: BoatInfo[];
  loyaltyPoints: number;
  tier: LoyaltyTier;
}

export interface BoatInfo {
  id: string;
  make: string;
  model: string;
  year: number;
  motorId?: string;
  registrationNumber?: string;
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  isDefault: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  marketingEmails: boolean;
  serviceReminders: boolean;
}

export enum LoyaltyTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM'
}

export interface CommercialAccount extends User {
  businessName: string;
  taxId: string;
  creditLimit?: number;
  paymentTerms?: string;
  accountManager?: string;
  volume: 'small' | 'medium' | 'large';
}
// Extended service department types
import { ServiceType, ServiceMotorInfo, TimeSlot } from './service';

// Appointment Scheduling
export interface AppointmentBooking {
  id?: string;
  userId?: string;
  customerInfo: CustomerInfo;
  motorInfo: ServiceMotorInfo;
  serviceType: ServiceType;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  preferredDate: Date;
  alternateDate?: Date;
  timePreference: 'morning' | 'afternoon' | 'evening' | 'no_preference';
  description: string;
  attachments?: AppointmentAttachment[];
  transportNeeded?: boolean;
  estimatedDuration?: number;
  specialRequests?: string;
  status: 'draft' | 'submitted' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  preferredContact: 'email' | 'phone' | 'text';
}

export interface AppointmentAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  description?: string;
  uploadedAt: Date;
}

// Service Scheduling
export interface ServiceSchedule {
  date: Date;
  timeSlots: ScheduleTimeSlot[];
  capacity: number;
  availableSlots: number;
  specialHours?: boolean;
  notes?: string;
}

export interface ScheduleTimeSlot extends TimeSlot {
  id: string;
  duration: number; // minutes
  serviceTypes: ServiceType[];
  technician?: string;
  appointmentId?: string;
  blocked?: boolean;
  blockReason?: string;
}

// Maintenance Reminders
export interface MaintenanceReminder {
  id: string;
  userId: string;
  motorId: string;
  type: MaintenanceType;
  title: string;
  description: string;
  dueDate: Date;
  dueMileage?: number;
  dueHours?: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'scheduled' | 'completed' | 'dismissed' | 'overdue';
  reminderSent: boolean;
  reminderDates: Date[];
  servicePackageId?: string;
  estimatedCost?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum MaintenanceType {
  OIL_CHANGE = 'OIL_CHANGE',
  SPARK_PLUGS = 'SPARK_PLUGS',
  LOWER_UNIT_OIL = 'LOWER_UNIT_OIL',
  IMPELLER = 'IMPELLER',
  FUEL_FILTER = 'FUEL_FILTER',
  ANNUAL_SERVICE = 'ANNUAL_SERVICE',
  WINTERIZATION = 'WINTERIZATION',
  SPRING_PREP = 'SPRING_PREP',
  INSPECTION = 'INSPECTION',
  MAJOR_SERVICE = 'MAJOR_SERVICE'
}

// Digital Owner Resources
export interface OwnerResource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: ResourceCategory;
  motorCompatibility: string[]; // brand/model patterns
  fileUrl?: string;
  videoUrl?: string;
  content?: string;
  thumbnailUrl?: string;
  downloadCount: number;
  rating: number;
  ratingCount: number;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum ResourceType {
  MANUAL = 'MANUAL',
  VIDEO = 'VIDEO',
  ARTICLE = 'ARTICLE',
  DIAGRAM = 'DIAGRAM',
  TROUBLESHOOTING = 'TROUBLESHOOTING',
  MAINTENANCE_GUIDE = 'MAINTENANCE_GUIDE',
  PARTS_CATALOG = 'PARTS_CATALOG',
  FAQ = 'FAQ'
}

export enum ResourceCategory {
  OPERATION = 'OPERATION',
  MAINTENANCE = 'MAINTENANCE',
  TROUBLESHOOTING = 'TROUBLESHOOTING',
  PARTS = 'PARTS',
  SAFETY = 'SAFETY',
  SEASONAL = 'SEASONAL',
  PERFORMANCE = 'PERFORMANCE'
}

// Warranty Registration
export interface WarrantyRegistration {
  id: string;
  userId?: string;
  motorInfo: WarrantyMotorInfo;
  ownerInfo: WarrantyOwnerInfo;
  dealerInfo: DealerInfo;
  purchaseInfo: PurchaseInfo;
  status: WarrantyStatus;
  registrationDate: Date;
  warrantyStartDate: Date;
  warrantyEndDate: Date;
  coverageDetails: WarrantyCoverage[];
  documents: WarrantyDocument[];
  claims: WarrantyClaim[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WarrantyMotorInfo extends ServiceMotorInfo {
  horsepower: number;
  engineType: string;
  cylinders: number;
  displacement?: number;
  weight?: number;
  shaftLength: string;
  propellerInfo?: string;
}

export interface WarrantyOwnerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessName?: string;
  taxId?: string;
  boatInfo?: {
    make: string;
    model: string;
    year: number;
    length: number;
    hullId?: string;
    registrationNumber?: string;
  };
}

export interface DealerInfo {
  dealerId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  salesPersonName?: string;
  serviceDepartment?: string;
}

export interface PurchaseInfo {
  purchaseDate: Date;
  invoiceNumber: string;
  purchasePrice: number;
  tradeInAllowance?: number;
  financingInfo?: {
    financed: boolean;
    lender?: string;
    accountNumber?: string;
  };
  installation: {
    installedByDealer: boolean;
    installationDate?: Date;
    installerName?: string;
  };
}

export enum WarrantyStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  TRANSFERRED = 'TRANSFERRED'
}

export interface WarrantyCoverage {
  type: 'factory' | 'extended' | 'corrosion' | 'emission';
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  coverageLimits: {
    hours?: number;
    years?: number;
    miles?: number;
  };
  deductible?: number;
  limitations: string[];
  covered: string[];
  excluded: string[];
}

export interface WarrantyDocument {
  id: string;
  type: 'invoice' | 'manual' | 'certificate' | 'photo' | 'other';
  name: string;
  url: string;
  uploadedAt: Date;
  verified: boolean;
}

export interface WarrantyClaim {
  id: string;
  claimNumber: string;
  claimDate: Date;
  description: string;
  status: ClaimStatus;
  coverageType: string;
  claimAmount: number;
  approvedAmount?: number;
  deductible: number;
  resolution?: string;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ClaimStatus {
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  PAID = 'PAID',
  CLOSED = 'CLOSED'
}

// Service Advisor & Technician
export interface ServiceAdvisor {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  specialties: ServiceType[];
  certifications: string[];
  yearsExperience: number;
  customerRating: number;
  activeAppointments: number;
  schedule: AdvisorSchedule[];
}

export interface AdvisorSchedule {
  date: Date;
  startTime: string;
  endTime: string;
  available: boolean;
  appointments: string[]; // appointment IDs
}

// Service Status Tracking
export interface ServiceProgress {
  appointmentId: string;
  currentStage: ServiceStage;
  stages: ServiceStageDetail[];
  estimatedCompletion: Date;
  actualCompletion?: Date;
  delays: ServiceDelay[];
  updates: ServiceUpdate[];
  photosVideos: ServiceMedia[];
  partsStatus: PartsStatus[];
}

export interface ServiceStage {
  id: string;
  name: string;
  description: string;
  order: number;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  estimatedDuration: number;
  actualDuration?: number;
  startTime?: Date;
  endTime?: Date;
  technician?: string;
  notes?: string;
}

export interface ServiceStageDetail extends ServiceStage {
  checklist: ServiceCheckItem[];
  requiredParts: string[];
  tools: string[];
  safetyRequirements: string[];
}

export interface ServiceCheckItem {
  id: string;
  description: string;
  required: boolean;
  completed: boolean;
  notes?: string;
  photos?: string[];
}

export interface ServiceDelay {
  id: string;
  reason: string;
  description: string;
  delayDuration: number; // minutes
  timestamp: Date;
  resolvedAt?: Date;
  impact: 'minor' | 'moderate' | 'significant';
}

export interface ServiceUpdate {
  id: string;
  message: string;
  type: 'info' | 'progress' | 'issue' | 'completion';
  timestamp: Date;
  technician: string;
  customerNotified: boolean;
  attachments?: string[];
}

export interface ServiceMedia {
  id: string;
  type: 'photo' | 'video';
  url: string;
  description: string;
  stage: string;
  timestamp: Date;
  technician: string;
}

export interface PartsStatus {
  partId: string;
  partNumber: string;
  name: string;
  quantity: number;
  status: 'ordered' | 'in_stock' | 'backordered' | 'installed';
  estimatedArrival?: Date;
  actualArrival?: Date;
  vendor: string;
  cost: number;
}

// Service Notifications
export interface ServiceNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  priority: 'low' | 'medium' | 'high';
  scheduledFor?: Date;
  sentAt?: Date;
  createdAt: Date;
}

export enum NotificationType {
  APPOINTMENT_CONFIRMED = 'APPOINTMENT_CONFIRMED',
  APPOINTMENT_REMINDER = 'APPOINTMENT_REMINDER',
  SERVICE_STARTED = 'SERVICE_STARTED',
  SERVICE_UPDATE = 'SERVICE_UPDATE',
  PARTS_DELAY = 'PARTS_DELAY',
  SERVICE_COMPLETED = 'SERVICE_COMPLETED',
  PICKUP_READY = 'PICKUP_READY',
  MAINTENANCE_DUE = 'MAINTENANCE_DUE',
  WARRANTY_EXPIRING = 'WARRANTY_EXPIRING',
  RECALL_NOTICE = 'RECALL_NOTICE'
}
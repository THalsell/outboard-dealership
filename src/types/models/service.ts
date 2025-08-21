// Service-related type definitions
export interface ServiceAppointment {
  id: string;
  appointmentNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: ServiceType;
  motorInfo: ServiceMotorInfo;
  requestedDate: Date;
  confirmedDate?: Date;
  timeSlot?: TimeSlot;
  status: ServiceStatus;
  technician?: string;
  estimatedCost?: number;
  actualCost?: number;
  notes?: string;
  checklist?: ServiceChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ServiceType {
  ROUTINE_MAINTENANCE = 'ROUTINE_MAINTENANCE',
  REPAIR = 'REPAIR',
  WARRANTY = 'WARRANTY',
  INSPECTION = 'INSPECTION',
  WINTERIZATION = 'WINTERIZATION',
  SPRING_PREP = 'SPRING_PREP',
  EMERGENCY = 'EMERGENCY'
}

export interface ServiceMotorInfo {
  brand: string;
  model: string;
  year: number;
  serialNumber: string;
  hoursUsed?: number;
  lastServiceDate?: Date;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export enum ServiceStatus {
  REQUESTED = 'REQUESTED',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export interface ServiceChecklistItem {
  id: string;
  category: string;
  item: string;
  status: 'pending' | 'passed' | 'failed' | 'needs_attention';
  notes?: string;
  cost?: number;
}

export interface ServiceHistory {
  id: string;
  appointmentId: string;
  motorId: string;
  date: Date;
  type: ServiceType;
  technician: string;
  workPerformed: string[];
  partsUsed: ServicePart[];
  laborHours: number;
  totalCost: number;
  warranty?: boolean;
  notes?: string;
  nextServiceDue?: Date;
}

export interface ServicePart {
  partId: string;
  partNumber: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  services: string[];
  price: number;
  discountedPrice?: number;
  validFor: string;
  popular?: boolean;
}
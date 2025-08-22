// Calculator Types and Interfaces

export interface BoatSpecs {
  length: number; // feet
  beam: number; // feet
  weight: number; // pounds (dry weight)
  passengers: number; // typical number
  boatType: 'pontoon' | 'bass' | 'bowrider' | 'center-console' | 'deck-boat' | 'fishing' | 'runabout' | 'ski-boat' | 'wakeboard' | 'yacht';
  hullType: 'displacement' | 'semi-displacement' | 'planing';
  transom: 'standard' | 'notched';
}

export interface UsageProfile {
  primaryUse: 'fishing' | 'recreation' | 'watersports' | 'cruising' | 'commercial';
  waterType: 'freshwater' | 'saltwater' | 'both';
  typicalDistance: number; // miles per trip
  hoursPerWeek: number;
  maxSpeed: 'economy' | 'moderate' | 'high-performance';
  loadCapacity: number; // typical load percentage
}

export interface MotorRecommendation {
  minHorsepower: number;
  maxHorsepower: number;
  recommendedHorsepower: number;
  reasoning: string[];
  motorSuggestions: Array<{
    motorId: string;
    brand: string;
    model: string;
    horsepower: number;
    price: number;
    efficiency: number; // mpg estimate
    suitabilityScore: number; // 1-10
  }>;
}

export interface FinancingTerms {
  loanAmount: number;
  downPayment: number;
  termMonths: number;
  interestRate: number;
  creditScore: 'excellent' | 'good' | 'fair' | 'poor';
  tradeInValue?: number;
}

export interface FinancingResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  paymentSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
  apr: number;
}

export interface TradeInSpecs {
  brand: string;
  model: string;
  year: number;
  horsepower: number;
  hours?: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  maintenance: 'exceptional' | 'good' | 'average' | 'poor';
  modifications: boolean;
  accidents: boolean;
  saltwater: boolean;
  location: string;
}

export interface TradeInEstimate {
  estimatedValue: number;
  confidenceRange: {
    low: number;
    high: number;
  };
  factors: Array<{
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }>;
  marketConditions: {
    demand: 'high' | 'moderate' | 'low';
    inventory: 'low' | 'moderate' | 'high';
    seasonality: 'peak' | 'moderate' | 'low';
  };
  recommendations: string[];
}

export interface FuelConsumptionInputs {
  motorHorsepower: number;
  boatWeight: number;
  boatLength: number;
  cruisingSpeed: number; // mph
  fuelType: 'gasoline' | 'diesel';
  motorAge: number;
  propellerPitch: number;
  loadFactor: number; // percentage
}

export interface FuelConsumptionResult {
  gph: number; // gallons per hour
  mpg: number; // miles per gallon
  costPerHour: number;
  costPerMile: number;
  rangeEstimate: number; // miles on full tank
  annualFuelCost: number;
  efficiency: 'excellent' | 'good' | 'average' | 'poor';
  recommendations: string[];
}

export interface PerformanceInputs {
  motorHorsepower: number;
  boatWeight: number;
  boatLength: number;
  boatBeam: number;
  hullType: 'displacement' | 'semi-displacement' | 'planing';
  propellerDiameter: number;
  propellerPitch: number;
  elevation: number; // feet above sea level
  temperature: number; // Fahrenheit
  loadFactor: number; // percentage of capacity
}

export interface PerformanceResult {
  topSpeed: number; // mph
  cruisingSpeed: number; // mph
  acceleration: {
    to20mph: number; // seconds
    to30mph: number; // seconds
    toPlane: number; // seconds
  };
  powerToWeightRatio: number;
  speedRange: {
    displacement: number;
    semiDisplacement: number;
    planing: number;
  };
  recommendations: string[];
  warnings: string[];
}

// Utility type for calculator results
export interface CalculatorResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
  warnings?: string[];
}
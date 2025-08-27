// Calculator Utility Functions

import { 
  BoatSpecs, 
  UsageProfile, 
  MotorRecommendation, 
  FinancingTerms, 
  FinancingResult,
  TradeInSpecs,
  TradeInEstimate,
  FuelConsumptionInputs,
  FuelConsumptionResult,
  PerformanceInputs,
  PerformanceResult
} from '@/types/models/calculator';
import { Product } from '@/lib/data/products';

// Motor Selection Calculator
export function calculateMotorRecommendation(
  boatSpecs: BoatSpecs, 
  usageProfile: UsageProfile,
  availableProducts: Product[] = []
): MotorRecommendation {
  // Base horsepower calculation using boat weight and length
  const baseHP = Math.round((boatSpecs.weight + (boatSpecs.passengers * 150)) / 20);
  
  // Boat type multipliers
  const boatTypeMultipliers: Record<string, number> = {
    'pontoon': 0.8,
    'bass': 1.2,
    'bowrider': 1.1,
    'center-console': 1.3,
    'deck-boat': 1.0,
    'fishing': 1.1,
    'runabout': 1.0,
    'ski-boat': 1.4,
    'wakeboard': 1.5,
    'yacht': 0.9
  };

  // Usage multipliers
  const usageMultipliers: Record<string, number> = {
    'fishing': 0.9,
    'recreation': 1.0,
    'watersports': 1.4,
    'cruising': 0.9,
    'commercial': 1.2
  };

  // Speed preference multipliers
  const speedMultipliers: Record<string, number> = {
    'economy': 0.8,
    'moderate': 1.0,
    'high-performance': 1.3
  };

  const multiplier = boatTypeMultipliers[boatSpecs.boatType] * 
                   usageMultipliers[usageProfile.primaryUse] * 
                   speedMultipliers[usageProfile.maxSpeed];

  const recommendedHP = Math.round(baseHP * multiplier);
  const minHP = Math.round(recommendedHP * 0.7);
  const maxHP = Math.round(recommendedHP * 1.3);

  // Generate reasoning
  const reasoning: string[] = [];
  reasoning.push(`Base calculation: ${boatSpecs.weight}lbs boat + ${boatSpecs.passengers * 150}lbs passengers = ${baseHP}HP baseline`);
  reasoning.push(`${boatSpecs.boatType} boat adjustment: ${(boatTypeMultipliers[boatSpecs.boatType] - 1) * 100 > 0 ? '+' : ''}${Math.round((boatTypeMultipliers[boatSpecs.boatType] - 1) * 100)}%`);
  reasoning.push(`${usageProfile.primaryUse} usage adjustment: ${(usageMultipliers[usageProfile.primaryUse] - 1) * 100 > 0 ? '+' : ''}${Math.round((usageMultipliers[usageProfile.primaryUse] - 1) * 100)}%`);
  reasoning.push(`${usageProfile.maxSpeed} performance preference: ${(speedMultipliers[usageProfile.maxSpeed] - 1) * 100 > 0 ? '+' : ''}${Math.round((speedMultipliers[usageProfile.maxSpeed] - 1) * 100)}%`);

  // Find suitable motors from Shopify products
  const suitableMotors = availableProducts
    .filter(product => 
      product.published && 
      product.horsepower >= minHP && 
      product.horsepower <= maxHP &&
      product.type === 'Outboard Motor'
    )
    .map(product => {
      // Calculate efficiency estimate (rough approximation)
      const efficiency = Math.max(1, 6 - (product.horsepower / 100));
      
      // Calculate suitability score based on how close to recommended HP
      const hpDiff = Math.abs(product.horsepower - recommendedHP);
      const suitabilityScore = Math.max(1, 10 - (hpDiff / recommendedHP * 10));

      // Get the default variant price
      const price = product.variants[0]?.price || 0;
      const comparePrice = product.variants[0]?.compareAtPrice || price;
      const displayPrice = comparePrice > price ? price : comparePrice;

      return {
        motorId: product.id,
        brand: product.brand,
        model: product.title,
        horsepower: product.horsepower,
        price: displayPrice,
        efficiency,
        suitabilityScore: Math.round(suitabilityScore * 10) / 10
      };
    })
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    .slice(0, 5);

  return {
    minHorsepower: minHP,
    maxHorsepower: maxHP,
    recommendedHorsepower: recommendedHP,
    reasoning,
    motorSuggestions: suitableMotors
  };
}

// Financing Calculator
export function calculateFinancing(terms: FinancingTerms): FinancingResult {
  const { loanAmount, termMonths, interestRate } = terms;
  const monthlyRate = interestRate / 100 / 12;
  
  // Calculate monthly payment using amortization formula
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
                        (Math.pow(1 + monthlyRate, termMonths) - 1);

  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - loanAmount;

  // Generate payment schedule
  const paymentSchedule = [];
  let balance = loanAmount;

  for (let month = 1; month <= termMonths; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;

    paymentSchedule.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      balance: Math.max(0, Math.round(balance * 100) / 100)
    });
  }

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    paymentSchedule,
    apr: interestRate // Simplified - in reality would include fees
  };
}

// Trade-in Value Estimator
export function calculateTradeInValue(specs: TradeInSpecs): TradeInEstimate {
  // Base depreciation curve for outboard motors
  const age = new Date().getFullYear() - specs.year;
  const baseDepreciation = Math.min(0.85, age * 0.08); // 8% per year, max 85%
  
  // Estimate original MSRP based on horsepower (rough approximation)
  let estimatedOriginalPrice = specs.horsepower * 200; // $200 per HP baseline
  if (specs.brand === 'Yamaha' || specs.brand === 'Mercury') estimatedOriginalPrice *= 1.2;
  if (specs.brand === 'Honda') estimatedOriginalPrice *= 1.15;
  
  let currentValue = estimatedOriginalPrice * (1 - baseDepreciation);

  // Condition adjustments
  const conditionMultipliers = {
    'excellent': 1.0,
    'good': 0.85,
    'fair': 0.65,
    'poor': 0.4
  };
  currentValue *= conditionMultipliers[specs.condition];

  // Maintenance adjustments
  const maintenanceMultipliers = {
    'exceptional': 1.1,
    'good': 1.0,
    'average': 0.95,
    'poor': 0.8
  };
  currentValue *= maintenanceMultipliers[specs.maintenance];

  // Hours adjustment (if provided)
  if (specs.hours) {
    const expectedHours = age * 100; // 100 hours per year average
    const hoursFactor = Math.max(0.7, 1 - Math.max(0, specs.hours - expectedHours) / 5000);
    currentValue *= hoursFactor;
  }

  // Other factors
  const factors = [];
  if (specs.modifications) {
    currentValue *= 0.9;
    factors.push({
      factor: 'Modifications',
      impact: 'negative' as const,
      description: 'Aftermarket modifications may reduce resale value'
    });
  }

  if (specs.accidents) {
    currentValue *= 0.8;
    factors.push({
      factor: 'Accident History',
      impact: 'negative' as const,
      description: 'Previous accidents significantly impact value'
    });
  }

  if (specs.saltwater) {
    currentValue *= 0.85;
    factors.push({
      factor: 'Saltwater Use',
      impact: 'negative' as const,
      description: 'Saltwater exposure increases corrosion concerns'
    });
  } else {
    factors.push({
      factor: 'Freshwater Use',
      impact: 'positive' as const,
      description: 'Freshwater use helps preserve motor condition'
    });
  }

  // Age factor
  if (age <= 2) {
    factors.push({
      factor: 'Low Age',
      impact: 'positive' as const,
      description: 'Newer motors retain value better'
    });
  } else if (age >= 10) {
    factors.push({
      factor: 'High Age',
      impact: 'negative' as const,
      description: 'Older motors have reduced market demand'
    });
  }

  const estimatedValue = Math.round(currentValue);
  const confidenceRange = {
    low: Math.round(estimatedValue * 0.85),
    high: Math.round(estimatedValue * 1.15)
  };

  return {
    estimatedValue,
    confidenceRange,
    factors,
    marketConditions: {
      demand: 'moderate',
      inventory: 'moderate',
      seasonality: 'moderate'
    },
    recommendations: [
      'Get a professional appraisal for most accurate value',
      'Consider timing sale during peak boating season (spring/summer)',
      'Complete any pending maintenance before selling',
      'Gather all maintenance records and documentation'
    ]
  };
}

// Fuel Consumption Calculator
export function calculateFuelConsumption(inputs: FuelConsumptionInputs): FuelConsumptionResult {
  const { motorHorsepower, boatWeight, cruisingSpeed, fuelType, motorAge, loadFactor } = inputs;
  
  // Base fuel consumption formula (rough approximation)
  let baseGPH = motorHorsepower * 0.5; // 0.5 GPH per HP at cruise
  
  // Speed adjustment - exponential relationship
  const speedFactor = Math.pow(cruisingSpeed / 25, 2.5); // 25 mph baseline
  baseGPH *= speedFactor;
  
  // Weight adjustment
  const weightFactor = 1 + (boatWeight - 3000) / 10000; // 3000 lbs baseline
  baseGPH *= Math.max(0.7, weightFactor);
  
  // Load factor adjustment
  baseGPH *= (1 + loadFactor * 0.3);
  
  // Motor age adjustment (efficiency decreases over time)
  const ageFactor = 1 + (motorAge * 0.02); // 2% increase per year
  baseGPH *= ageFactor;
  
  // Fuel type adjustment
  if (fuelType === 'diesel') {
    baseGPH *= 0.8; // Diesel more efficient but we measure in gallons
  }
  
  const gph = Math.round(baseGPH * 10) / 10;
  const mpg = Math.round((cruisingSpeed / gph) * 10) / 10;
  
  // Cost calculations (average fuel prices)
  const fuelPrice = fuelType === 'gasoline' ? 4.50 : 4.80;
  const costPerHour = Math.round(gph * fuelPrice * 100) / 100;
  const costPerMile = Math.round((costPerHour / cruisingSpeed) * 100) / 100;
  
  // Estimate range (assuming 100-gallon tank)
  const tankCapacity = Math.min(200, boatWeight / 30); // Rough tank size estimate
  const rangeEstimate = Math.round(tankCapacity * mpg);
  
  // Annual cost estimate (100 hours average)
  const annualFuelCost = Math.round(costPerHour * 100);
  
  // Efficiency rating
  let efficiency: 'excellent' | 'good' | 'average' | 'poor';
  if (mpg >= 4) efficiency = 'excellent';
  else if (mpg >= 3) efficiency = 'good';
  else if (mpg >= 2) efficiency = 'average';
  else efficiency = 'poor';
  
  const recommendations = [];
  if (cruisingSpeed > 30) {
    recommendations.push('Consider reducing cruising speed to improve fuel efficiency');
  }
  if (motorAge > 10) {
    recommendations.push('Older motors are less efficient - consider upgrading');
  }
  if (efficiency === 'poor') {
    recommendations.push('Check propeller condition and motor tune-up status');
  }
  
  return {
    gph,
    mpg,
    costPerHour,
    costPerMile,
    rangeEstimate,
    annualFuelCost,
    efficiency,
    recommendations
  };
}

// Performance Calculator
export function calculatePerformance(inputs: PerformanceInputs): PerformanceResult {
  const { motorHorsepower, boatWeight, boatLength, hullType, loadFactor, elevation, temperature } = inputs;
  
  // Power-to-weight ratio
  const totalWeight = boatWeight * (1 + loadFactor);
  const powerToWeightRatio = motorHorsepower / (totalWeight / 1000);
  
  // Base top speed calculation using industry formulas
  let baseTopSpeed = Math.sqrt(motorHorsepower / boatWeight * 1000) * 2.5;
  
  // Hull type adjustments
  const hullMultipliers = {
    'displacement': 0.4,
    'semi-displacement': 0.7,
    'planing': 1.0
  };
  baseTopSpeed *= hullMultipliers[hullType];
  
  // Length adjustment (longer boats are generally faster)
  const lengthFactor = Math.sqrt(boatLength / 20); // 20ft baseline
  baseTopSpeed *= lengthFactor;
  
  // Environmental adjustments
  const elevationLoss = elevation * 0.03 / 1000; // 3% per 1000ft
  const tempAdjustment = (temperature - 60) * 0.005; // Baseline 60°F
  const environmentalFactor = 1 - elevationLoss + tempAdjustment;
  baseTopSpeed *= Math.max(0.7, environmentalFactor);
  
  // Load adjustment
  baseTopSpeed *= (1 - loadFactor * 0.15);
  
  const topSpeed = Math.round(baseTopSpeed);
  const cruisingSpeed = Math.round(topSpeed * 0.75); // 75% of top speed
  
  // Acceleration estimates (very rough)
  const acceleration = {
    to20mph: Math.max(3, 15 - powerToWeightRatio),
    to30mph: Math.max(5, 25 - powerToWeightRatio * 1.5),
    toPlane: Math.max(2, 10 - powerToWeightRatio)
  };
  
  const speedRange = {
    displacement: Math.round(topSpeed * 0.4),
    semiDisplacement: Math.round(topSpeed * 0.7),
    planing: topSpeed
  };
  
  const recommendations = [];
  const warnings = [];
  
  if (powerToWeightRatio < 0.4) {
    recommendations.push('Consider higher horsepower for better performance');
    warnings.push('Low power-to-weight ratio may result in sluggish acceleration');
  } else if (powerToWeightRatio > 1.2) {
    warnings.push('High power-to-weight ratio - ensure proper weight distribution');
  }
  
  if (hullType === 'displacement' && motorHorsepower > 200) {
    warnings.push('High horsepower on displacement hull - efficiency may be poor');
  }
  
  if (elevation > 3000) {
    recommendations.push('High altitude reduces engine performance - consider larger motor');
  }
  
  return {
    topSpeed,
    cruisingSpeed,
    acceleration: {
      to20mph: Math.round(acceleration.to20mph * 10) / 10,
      to30mph: Math.round(acceleration.to30mph * 10) / 10,
      toPlane: Math.round(acceleration.toPlane * 10) / 10
    },
    powerToWeightRatio: Math.round(powerToWeightRatio * 100) / 100,
    speedRange,
    recommendations,
    warnings
  };
}
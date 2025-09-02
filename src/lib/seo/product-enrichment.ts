import { Product } from '@/lib/data/products';

/**
 * Extracts engine type from product data
 */
export function extractEngineType(product: Product): string | null {
  // Check tags first
  const twoStrokeTerms = ['2-stroke', '2stroke', 'two-stroke', '2-cycle', '2cycle'];
  const fourStrokeTerms = ['4-stroke', '4stroke', 'four-stroke', '4-cycle', '4cycle'];
  const electricTerms = ['electric', 'battery', 'e-drive', 'electric-start'];
  
  const lowerTags = product.tags.map(t => t.toLowerCase());
  const lowerTitle = product.title.toLowerCase();
  const lowerDesc = product.description.toLowerCase();
  const combinedText = `${lowerTitle} ${lowerDesc} ${lowerTags.join(' ')}`;
  
  if (twoStrokeTerms.some(term => combinedText.includes(term))) {
    return '2-Stroke';
  }
  if (fourStrokeTerms.some(term => combinedText.includes(term))) {
    return '4-Stroke';
  }
  if (electricTerms.some(term => combinedText.includes(term))) {
    return 'Electric';
  }
  
  // Check specs object if available
  if (product.specs?.['Engine Type']) {
    return product.specs['Engine Type'];
  }
  
  return null;
}

/**
 * Extracts fuel type from product data
 */
export function extractFuelType(product: Product): string | null {
  const lowerTitle = product.title.toLowerCase();
  const lowerDesc = product.description.toLowerCase();
  const lowerTags = product.tags.map(t => t.toLowerCase());
  const combinedText = `${lowerTitle} ${lowerDesc} ${lowerTags.join(' ')}`;
  
  if (combinedText.includes('diesel')) return 'Diesel';
  if (combinedText.includes('electric') || combinedText.includes('battery')) return 'Electric';
  if (combinedText.includes('propane') || combinedText.includes('lpg')) return 'Propane';
  
  // Check specs
  if (product.specs?.['Fuel Type']) {
    return product.specs['Fuel Type'];
  }
  
  // Default to gasoline for combustion engines
  if (extractEngineType(product) && !extractEngineType(product)?.includes('Electric')) {
    return 'Gasoline';
  }
  
  return null;
}

/**
 * Extracts shaft length from product data
 */
export function extractShaftLength(product: Product): string | null {
  const shaftPatterns = {
    'Short': ['short shaft', '15"', '15 inch', 'S shaft', '381mm'],
    'Long': ['long shaft', '20"', '20 inch', 'L shaft', '508mm'],
    'Extra Long': ['extra long', 'x-long', 'XL shaft', '25"', '25 inch', '635mm'],
    'Ultra Long': ['ultra long', 'XXL shaft', '30"', '30 inch', '762mm']
  };
  
  const combinedText = `${product.title} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
  
  for (const [shaftType, patterns] of Object.entries(shaftPatterns)) {
    if (patterns.some(pattern => combinedText.includes(pattern.toLowerCase()))) {
      return shaftType;
    }
  }
  
  // Check specs
  if (product.specs?.['Shaft Length']) {
    return product.specs['Shaft Length'];
  }
  
  return null;
}

/**
 * Extracts cooling system type
 */
export function extractCoolingSystem(product: Product): string | null {
  const combinedText = `${product.title} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
  
  if (combinedText.includes('water cooled') || combinedText.includes('water-cooled')) {
    return 'Water Cooled';
  }
  if (combinedText.includes('air cooled') || combinedText.includes('air-cooled')) {
    return 'Air Cooled';
  }
  
  if (product.specs?.['Cooling System']) {
    return product.specs['Cooling System'];
  }
  
  // Most outboards are water cooled by default
  return 'Water Cooled';
}

/**
 * Extracts starting system type
 */
export function extractStartingSystem(product: Product): string | null {
  const combinedText = `${product.title} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
  
  const startTypes = {
    'Electric Start': ['electric start', 'e-start', 'electric-start', 'push button'],
    'Manual Start': ['manual start', 'pull start', 'rope start', 'recoil'],
    'Electric & Manual': ['electric and manual', 'electric/manual']
  };
  
  for (const [type, patterns] of Object.entries(startTypes)) {
    if (patterns.some(pattern => combinedText.includes(pattern))) {
      return type;
    }
  }
  
  if (product.specs?.['Starting System']) {
    return product.specs['Starting System'];
  }
  
  // Default based on horsepower
  if (product.horsepower < 10) return 'Manual Start';
  if (product.horsepower > 40) return 'Electric Start';
  
  return null;
}

/**
 * Extracts control type
 */
export function extractControlType(product: Product): string | null {
  const combinedText = `${product.title} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
  
  if (combinedText.includes('tiller')) return 'Tiller';
  if (combinedText.includes('remote control') || combinedText.includes('remote-control')) return 'Remote Control';
  if (combinedText.includes('tiller or remote')) return 'Tiller or Remote';
  
  if (product.specs?.['Control Type']) {
    return product.specs['Control Type'];
  }
  
  // Default based on horsepower
  if (product.horsepower < 30) return 'Tiller';
  
  return null;
}

/**
 * Enriches product data with extracted properties for better AI search visibility
 */
export function enrichProductForSEO(product: Product) {
  return {
    ...product,
    extractedSpecs: {
      engineType: extractEngineType(product),
      fuelType: extractFuelType(product),
      shaftLength: extractShaftLength(product),
      coolingSystem: extractCoolingSystem(product),
      startingSystem: extractStartingSystem(product),
      controlType: extractControlType(product),
      // Additional searchable properties
      isPortable: product.horsepower < 20,
      isHighPerformance: product.horsepower > 150,
      isCommercial: product.tags.some(t => t.toLowerCase().includes('commercial')),
      isSaltwater: product.tags.some(t => t.toLowerCase().includes('saltwater')),
      warranty: extractWarranty(product)
    }
  };
}

/**
 * Extracts warranty information
 */
function extractWarranty(product: Product): string | null {
  const combinedText = `${product.title} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
  
  const warrantyMatch = combinedText.match(/(\d+)\s*(year|yr)\s*warranty/i);
  if (warrantyMatch) {
    return `${warrantyMatch[1]} Year Warranty`;
  }
  
  if (product.specs?.['Warranty']) {
    return product.specs['Warranty'];
  }
  
  // Brand-specific defaults
  if (product.brand.toLowerCase().includes('honda')) return '5 Year Warranty';
  if (product.brand.toLowerCase().includes('yamaha')) return '3 Year Warranty';
  if (product.brand.toLowerCase().includes('mercury')) return '3 Year Warranty';
  
  return null;
}
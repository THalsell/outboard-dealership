import { Motor } from '@/types/models/motor';

export const featuredMotors: Motor[] = [
  {
    id: '1',
    brand: 'Yamaha',
    model: 'F425 XTO Offshore',
    year: 2024,
    horsepower: 425,
    type: 'outboard',
    fuelType: 'gasoline',
    cylinders: 8,
    displacement: 5559,
    weight: 952,
    shaftLength: 'extra-long',
    price: 54999,
    salePrice: 52499,
    inStock: true,
    stockQuantity: 3,
    images: ['/api/placeholder/800/600'],
    features: [
      'Direct Injection',
      'Electric Steering',
      'Integrated Digital Electric Steering',
      'TotalTilt with power trim and tilt',
      'Variable Camshaft Timing'
    ],
    specifications: {
      'Engine Type': 'V8, 32-valve, DOHC with VCT',
      'Displacement': '5,559cc',
      'Bore x Stroke': '96.0mm x 96.0mm',
      'Compression Ratio': '12.2:1',
      'Fuel System': 'Direct Injection',
      'Ignition System': 'TCI Microcomputer',
      'Starting System': 'Electric',
      'Lubrication': 'Wet Sump',
      'Gear Ratio': '1.79:1',
      'Alternator Output': '90A'
    },
    warranty: '5 Year Limited Warranty',
    condition: 'new',
    rating: 4.8,
    reviewCount: 127,
    featured: true,
    bestSeller: true
  },
  {
    id: '2',
    brand: 'Mercury',
    model: 'Verado 400',
    year: 2024,
    horsepower: 400,
    type: 'outboard',
    fuelType: 'gasoline',
    cylinders: 6,
    displacement: 2600,
    weight: 668,
    shaftLength: 'long',
    price: 49999,
    inStock: true,
    stockQuantity: 5,
    images: ['/api/placeholder/800/600'],
    features: [
      'Supercharged',
      'Adaptive Speed Control',
      'Advanced Sound Control',
      'Joystick Piloting Compatible',
      'SmartCraft Digital Technology'
    ],
    specifications: {
      'Engine Type': 'Inline 6-cylinder',
      'Displacement': '2.6L',
      'Fuel System': 'Electronic Fuel Injection',
      'Alternator': '115 Amp (1449 Watt)',
      'Gear Ratio': '1.75:1',
      'Cooling System': 'Water-cooled with thermostat',
      'Steering': 'Electro-hydraulic power steering'
    },
    warranty: '3 Year Limited Warranty',
    condition: 'new',
    rating: 4.7,
    reviewCount: 89,
    featured: true
  },
  {
    id: '3',
    brand: 'Honda',
    model: 'BF250',
    year: 2024,
    horsepower: 250,
    type: 'outboard',
    fuelType: 'gasoline',
    cylinders: 6,
    displacement: 3583,
    weight: 622,
    shaftLength: 'long',
    price: 32999,
    salePrice: 30999,
    inStock: true,
    stockQuantity: 7,
    images: ['/api/placeholder/800/600'],
    features: [
      'VTEC Technology',
      'Lean Burn Control',
      'BLAST Hole Shot Technology',
      'Variable Idle Speed',
      'Freshwater Flush Port'
    ],
    specifications: {
      'Engine Type': 'V6, 24-valve, SOHC VTEC',
      'Displacement': '3,583cc',
      'Bore x Stroke': '89mm x 96mm',
      'Compression Ratio': '9.4:1',
      'Fuel System': 'PGM-FI',
      'Cooling System': 'Water-cooled',
      'Alternator': '90A',
      'Gear Ratio': '1.85:1'
    },
    warranty: '5 Year Limited Warranty',
    condition: 'new',
    rating: 4.9,
    reviewCount: 156,
    featured: true,
    bestSeller: true
  },
  {
    id: '4',
    brand: 'Suzuki',
    model: 'DF350A',
    year: 2024,
    horsepower: 350,
    type: 'outboard',
    fuelType: 'gasoline',
    cylinders: 6,
    displacement: 4390,
    weight: 730,
    shaftLength: 'extra-long',
    price: 43999,
    inStock: true,
    stockQuantity: 2,
    images: ['/api/placeholder/800/600'],
    features: [
      'Dual Propeller System',
      'Suzuki Precision Control',
      'Lean Burn Technology',
      'Suzuki Selective Rotation',
      'Anti-Corrosion System'
    ],
    specifications: {
      'Engine Type': 'V6, 24-valve, DOHC',
      'Displacement': '4,390cc',
      'Bore x Stroke': '98mm x 97mm',
      'Compression Ratio': '10.2:1',
      'Fuel System': 'Multi-Point Sequential EFI',
      'Alternator': '54A',
      'Gear Ratio': '2.29:1',
      'Propeller System': 'Contra-Rotating Dual Prop'
    },
    warranty: '6 Year Limited Warranty',
    condition: 'new',
    rating: 4.6,
    reviewCount: 73,
    featured: true
  }
];

export const motorCategories = [
  {
    id: '1',
    name: 'Small Outboards',
    slug: 'small-outboards',
    description: '2.5HP - 30HP',
    motorCount: 45
  },
  {
    id: '2',
    name: 'Mid-Range Outboards',
    slug: 'mid-range-outboards',
    description: '40HP - 150HP',
    motorCount: 82
  },
  {
    id: '3',
    name: 'High Performance',
    slug: 'high-performance',
    description: '175HP - 425HP',
    motorCount: 64
  },
  {
    id: '4',
    name: 'Electric Motors',
    slug: 'electric-motors',
    description: 'Eco-friendly options',
    motorCount: 18
  }
];
import { Part, PartCategory } from '@/types/models/part';

export const partCategories: PartCategory[] = [
  {
    id: 'engine',
    name: 'Engine Parts',
    slug: 'engine-parts',
    description: 'Internal engine components and accessories',
    image: '/api/placeholder/300/200',
    partCount: 145,
    featured: true,
    subcategories: [
      { id: 'pistons', name: 'Pistons & Rings', slug: 'pistons-rings', description: 'Pistons, rings, and related components', partCount: 28 },
      { id: 'gaskets', name: 'Gaskets & Seals', slug: 'gaskets-seals', description: 'Engine gaskets and sealing components', partCount: 35 },
      { id: 'valves', name: 'Valves & Springs', slug: 'valves-springs', description: 'Intake and exhaust valves', partCount: 22 },
      { id: 'bearings', name: 'Bearings', slug: 'bearings', description: 'Main and connecting rod bearings', partCount: 18 },
      { id: 'timing', name: 'Timing Components', slug: 'timing', description: 'Timing belts, chains, and tensioners', partCount: 16 },
      { id: 'blocks', name: 'Engine Blocks & Heads', slug: 'blocks-heads', description: 'Complete engine blocks and cylinder heads', partCount: 26 }
    ]
  },
  {
    id: 'fuel',
    name: 'Fuel System',
    slug: 'fuel-system',
    description: 'Fuel delivery and injection components',
    image: '/api/placeholder/300/200',
    partCount: 89,
    featured: true,
    subcategories: [
      { id: 'injectors', name: 'Fuel Injectors', slug: 'fuel-injectors', description: 'Electronic fuel injectors', partCount: 24 },
      { id: 'pumps', name: 'Fuel Pumps', slug: 'fuel-pumps', description: 'Electric and mechanical fuel pumps', partCount: 18 },
      { id: 'filters', name: 'Fuel Filters', slug: 'fuel-filters', description: 'Primary and secondary fuel filters', partCount: 22 },
      { id: 'lines', name: 'Fuel Lines & Fittings', slug: 'fuel-lines', description: 'Fuel hoses and connection fittings', partCount: 25 }
    ]
  },
  {
    id: 'cooling',
    name: 'Cooling System',
    slug: 'cooling-system',
    description: 'Water pumps, thermostats, and cooling components',
    image: '/api/placeholder/300/200',
    partCount: 67,
    subcategories: [
      { id: 'water-pumps', name: 'Water Pumps', slug: 'water-pumps', description: 'Complete water pump assemblies', partCount: 25 },
      { id: 'thermostats', name: 'Thermostats', slug: 'thermostats', description: 'Engine temperature control', partCount: 18 },
      { id: 'hoses', name: 'Cooling Hoses', slug: 'cooling-hoses', description: 'Water circulation hoses', partCount: 24 }
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical',
    slug: 'electrical',
    description: 'Ignition, charging, and electrical components',
    image: '/api/placeholder/300/200',
    partCount: 112,
    featured: true,
    subcategories: [
      { id: 'ignition', name: 'Ignition System', slug: 'ignition', description: 'Spark plugs, coils, and ignition modules', partCount: 35 },
      { id: 'charging', name: 'Charging System', slug: 'charging', description: 'Alternators and charging components', partCount: 22 },
      { id: 'wiring', name: 'Wiring & Harnesses', slug: 'wiring', description: 'Electrical wiring and connectors', partCount: 28 },
      { id: 'sensors', name: 'Sensors', slug: 'sensors', description: 'Engine and performance sensors', partCount: 27 }
    ]
  },
  {
    id: 'drive',
    name: 'Drive System',
    slug: 'drive-system',
    description: 'Gearcase, propellers, and drive components',
    image: '/api/placeholder/300/200',
    partCount: 94,
    featured: true,
    subcategories: [
      { id: 'propellers', name: 'Propellers', slug: 'propellers', description: 'Aluminum and stainless steel props', partCount: 42 },
      { id: 'gearcase', name: 'Gearcase Parts', slug: 'gearcase', description: 'Gears, shafts, and gearcase components', partCount: 32 },
      { id: 'trim-tilt', name: 'Trim & Tilt', slug: 'trim-tilt', description: 'Power trim and tilt systems', partCount: 20 }
    ]
  },
  {
    id: 'controls',
    name: 'Controls & Steering',
    slug: 'controls-steering',
    description: 'Remote controls, steering, and cables',
    image: '/api/placeholder/300/200',
    partCount: 76,
    subcategories: [
      { id: 'remote-controls', name: 'Remote Controls', slug: 'remote-controls', description: 'Throttle and shift controls', partCount: 18 },
      { id: 'cables', name: 'Control Cables', slug: 'control-cables', description: 'Throttle, shift, and steering cables', partCount: 25 },
      { id: 'steering', name: 'Steering Components', slug: 'steering', description: 'Steering wheels and components', partCount: 33 }
    ]
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    slug: 'maintenance',
    description: 'Oils, filters, and maintenance supplies',
    image: '/api/placeholder/300/200',
    partCount: 58,
    subcategories: [
      { id: 'oils', name: 'Engine Oils', slug: 'engine-oils', description: 'Marine engine lubricants', partCount: 16 },
      { id: 'gear-oil', name: 'Gear Oil', slug: 'gear-oil', description: 'Lower unit lubricants', partCount: 12 },
      { id: 'maintenance-kits', name: 'Maintenance Kits', slug: 'maintenance-kits', description: 'Complete service kits', partCount: 30 }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Gauges, hardware, and motor accessories',
    image: '/api/placeholder/300/200',
    partCount: 134,
    subcategories: [
      { id: 'gauges', name: 'Gauges & Displays', slug: 'gauges', description: 'Engine monitoring instruments', partCount: 28 },
      { id: 'hardware', name: 'Hardware', slug: 'hardware', description: 'Bolts, nuts, and fasteners', partCount: 45 },
      { id: 'covers', name: 'Motor Covers', slug: 'motor-covers', description: 'Protective motor covers', partCount: 24 },
      { id: 'anodes', name: 'Anodes', slug: 'anodes', description: 'Sacrificial anodes for corrosion protection', partCount: 37 }
    ]
  }
];

export const allParts: Part[] = [
  // Engine Parts - Yamaha OEM
  {
    id: 'part-001',
    partNumber: '6E5-11631-01-00',
    name: 'Piston Kit - Standard',
    description: 'Complete piston assembly with rings and pin for Yamaha F250 engines',
    brand: 'Yamaha',
    category: 'engine',
    subcategory: 'pistons',
    price: 185.99,
    salePrice: 167.39,
    isOEM: true,
    inStock: true,
    stockQuantity: 12,
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    specifications: {
      'Bore Size': '96.0mm',
      'Compression Height': '32.5mm',
      'Pin Diameter': '23mm',
      'Material': 'Cast Aluminum'
    },
    compatibleMotors: ['1', '3'], // F425, BF250
    weight: 0.8,
    dimensions: { length: 96, width: 96, height: 50 },
    warranty: '12 months',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 6, price: 160.00 },
      { quantity: 12, price: 155.00 }
    ],
    relatedParts: ['part-002', 'part-003'],
    tags: ['piston', 'rings', 'yamaha', 'f250'],
    featured: true,
    bestseller: true,
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: 'part-002',
    partNumber: '6E5-11603-00-00',
    name: 'Connecting Rod',
    description: 'Forged steel connecting rod for Yamaha 4-stroke engines',
    brand: 'Yamaha',
    category: 'engine',
    subcategory: 'bearings',
    price: 145.50,
    isOEM: true,
    inStock: true,
    stockQuantity: 8,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Material': 'Forged Steel',
      'Length': '165mm',
      'Big End Diameter': '52mm',
      'Small End Diameter': '23mm'
    },
    compatibleMotors: ['1', '3'],
    weight: 0.6,
    warranty: '12 months',
    minOrderQuantity: 1,
    relatedParts: ['part-001', 'part-004'],
    tags: ['connecting rod', 'yamaha', 'forged steel'],
    rating: 4.9,
    reviewCount: 18
  },
  // Aftermarket Engine Parts
  {
    id: 'part-003',
    partNumber: 'WSM-010-105K',
    name: 'Piston Ring Set - Aftermarket',
    description: 'High-quality aftermarket piston rings compatible with multiple Yamaha models',
    brand: 'WSM',
    category: 'engine',
    subcategory: 'pistons',
    price: 45.99,
    salePrice: 39.99,
    isOEM: false,
    inStock: true,
    stockQuantity: 25,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Ring Gap': '0.35mm',
      'Material': 'Cast Iron with Chrome Coating',
      'Quantity': '3 rings per cylinder'
    },
    compatibleMotors: ['1', '3', '5'],
    weight: 0.2,
    warranty: '6 months',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 10, price: 35.00 },
      { quantity: 20, price: 32.00 }
    ],
    relatedParts: ['part-001', 'part-002'],
    tags: ['rings', 'aftermarket', 'chrome'],
    rating: 4.5,
    reviewCount: 42
  },
  // Fuel System - Mercury OEM
  {
    id: 'part-004',
    partNumber: '8M0047624',
    name: 'Fuel Injector',
    description: 'Electronic fuel injector for Mercury Verado engines',
    brand: 'Mercury',
    category: 'fuel',
    subcategory: 'injectors',
    price: 285.00,
    isOEM: true,
    inStock: true,
    stockQuantity: 6,
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    specifications: {
      'Flow Rate': '42 lb/hr',
      'Resistance': '12 ohms',
      'Connector Type': 'EV1',
      'Spray Pattern': '15 degrees'
    },
    compatibleMotors: ['2', '14'], // Verado 400, Verado 300
    weight: 0.3,
    warranty: '24 months',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 6, price: 270.00 }
    ],
    relatedParts: ['part-005', 'part-006'],
    tags: ['fuel injector', 'mercury', 'verado', 'electronic'],
    featured: true,
    rating: 4.7,
    reviewCount: 31
  },
  {
    id: 'part-005',
    partNumber: '8M0060041',
    name: 'High Pressure Fuel Pump',
    description: 'Electric high-pressure fuel pump for Mercury DFI engines',
    brand: 'Mercury',
    category: 'fuel',
    subcategory: 'pumps',
    price: 425.00,
    salePrice: 389.99,
    isOEM: true,
    inStock: true,
    stockQuantity: 4,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Pressure': '60 PSI',
      'Flow Rate': '120 GPH',
      'Voltage': '12V DC',
      'Current Draw': '8 amps'
    },
    compatibleMotors: ['2', '6', '14'],
    weight: 2.5,
    warranty: '12 months',
    minOrderQuantity: 1,
    relatedParts: ['part-004', 'part-007'],
    tags: ['fuel pump', 'mercury', 'high pressure', 'electric'],
    bestseller: true,
    rating: 4.6,
    reviewCount: 28
  },
  // Aftermarket Fuel System
  {
    id: 'part-006',
    partNumber: 'SEI-18-7981',
    name: 'Fuel Filter - Universal',
    description: 'Universal inline fuel filter suitable for most outboard motors',
    brand: 'SEI Marine',
    category: 'fuel',
    subcategory: 'filters',
    price: 18.99,
    salePrice: 15.99,
    isOEM: false,
    inStock: true,
    stockQuantity: 150,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Filtration': '10 micron',
      'Flow Rate': '120 GPH',
      'Inlet/Outlet': '3/8" NPT',
      'Housing Material': 'Aluminum'
    },
    compatibleMotors: ['1', '2', '3', '4', '5', '6', '7', '8'],
    weight: 0.5,
    warranty: '12 months',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 10, price: 14.00 },
      { quantity: 25, price: 12.50 },
      { quantity: 50, price: 11.00 }
    ],
    relatedParts: ['part-004', 'part-005'],
    tags: ['fuel filter', 'universal', 'aftermarket', 'inline'],
    bestseller: true,
    rating: 4.4,
    reviewCount: 156
  },
  // Cooling System - Honda OEM
  {
    id: 'part-007',
    partNumber: '19200-ZY3-003',
    name: 'Water Pump Kit',
    description: 'Complete water pump repair kit for Honda BF250 engines',
    brand: 'Honda',
    category: 'cooling',
    subcategory: 'water-pumps',
    price: 125.99,
    isOEM: true,
    inStock: true,
    stockQuantity: 15,
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    specifications: {
      'Kit Contents': 'Impeller, housing, wear plate, seals',
      'Impeller Material': 'Rubber',
      'Housing Material': 'Stainless Steel'
    },
    compatibleMotors: ['3', '15'], // BF250, BF200
    weight: 1.2,
    warranty: '12 months',
    minOrderQuantity: 1,
    relatedParts: ['part-008', 'part-009'],
    tags: ['water pump', 'honda', 'impeller', 'cooling'],
    featured: true,
    rating: 4.8,
    reviewCount: 45
  },
  {
    id: 'part-008',
    partNumber: '19300-ZW1-003',
    name: 'Thermostat',
    description: 'Engine thermostat for Honda 4-stroke outboards',
    brand: 'Honda',
    category: 'cooling',
    subcategory: 'thermostats',
    price: 35.50,
    isOEM: true,
    inStock: true,
    stockQuantity: 22,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Opening Temperature': '60°C (140°F)',
      'Material': 'Stainless Steel',
      'Gasket Included': 'Yes'
    },
    compatibleMotors: ['3', '7', '11', '15'],
    weight: 0.1,
    warranty: '12 months',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 12, price: 32.00 }
    ],
    relatedParts: ['part-007'],
    tags: ['thermostat', 'honda', 'temperature control'],
    rating: 4.7,
    reviewCount: 67
  },
  // Electrical - Suzuki OEM
  {
    id: 'part-009',
    partNumber: '32900-87J00',
    name: 'CDI Unit',
    description: 'Electronic ignition control unit for Suzuki DF350A',
    brand: 'Suzuki',
    category: 'electrical',
    subcategory: 'ignition',
    price: 485.00,
    isOEM: true,
    inStock: true,
    stockQuantity: 3,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Voltage': '12V',
      'Cylinders': '6',
      'Rev Limiter': '6000 RPM',
      'Water Resistant': 'IP67'
    },
    compatibleMotors: ['4'], // DF350A
    weight: 0.8,
    warranty: '24 months',
    minOrderQuantity: 1,
    relatedParts: ['part-010', 'part-011'],
    tags: ['cdi', 'ignition', 'suzuki', 'electronic'],
    rating: 4.9,
    reviewCount: 12
  },
  {
    id: 'part-010',
    partNumber: '09482-00004',
    name: 'Spark Plug Set',
    description: 'Iridium spark plugs for Suzuki 4-stroke engines (set of 6)',
    brand: 'Suzuki',
    category: 'electrical',
    subcategory: 'ignition',
    price: 89.99,
    salePrice: 79.99,
    isOEM: true,
    inStock: true,
    stockQuantity: 18,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Type': 'Iridium',
      'Heat Range': '6',
      'Gap': '0.8mm',
      'Thread': '14mm x 1.25'
    },
    compatibleMotors: ['4', '8'], // DF350A, DF90A
    weight: 0.3,
    warranty: '12 months',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 6, price: 72.00 },
      { quantity: 12, price: 68.00 }
    ],
    relatedParts: ['part-009'],
    tags: ['spark plugs', 'iridium', 'suzuki'],
    bestseller: true,
    rating: 4.8,
    reviewCount: 89
  },
  // Drive System - Propellers
  {
    id: 'part-011',
    partNumber: '6E5-45943-01-EL',
    name: '15 x 17 Stainless Steel Propeller',
    description: '3-blade stainless steel propeller for Yamaha 200-300HP engines',
    brand: 'Yamaha',
    category: 'drive',
    subcategory: 'propellers',
    price: 485.00,
    salePrice: 435.00,
    isOEM: true,
    inStock: true,
    stockQuantity: 8,
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    specifications: {
      'Diameter': '15 inches',
      'Pitch': '17 inches',
      'Blades': '3',
      'Material': '316 Stainless Steel',
      'Hub': 'Pressed-in rubber hub'
    },
    compatibleMotors: ['1', '3', '5'], // F425, BF250, F200
    weight: 12.5,
    warranty: '12 months',
    minOrderQuantity: 1,
    relatedParts: ['part-012', 'part-013'],
    tags: ['propeller', 'stainless steel', 'yamaha', '3-blade'],
    featured: true,
    rating: 4.7,
    reviewCount: 34
  },
  {
    id: 'part-012',
    partNumber: '48-832759A45',
    name: '14 x 19 Aluminum Propeller',
    description: '3-blade aluminum propeller for Mercury 150-225HP engines',
    brand: 'Mercury',
    category: 'drive',
    subcategory: 'propellers',
    price: 195.00,
    salePrice: 175.00,
    isOEM: true,
    inStock: true,
    stockQuantity: 12,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Diameter': '14 inches',
      'Pitch': '19 inches',
      'Blades': '3',
      'Material': 'Aluminum',
      'Hub': 'Flo-Torq II hub system'
    },
    compatibleMotors: ['2', '6'], // Verado 400, 150 FourStroke
    weight: 8.2,
    warranty: '12 months',
    minOrderQuantity: 1,
    relatedParts: ['part-011', 'part-013'],
    tags: ['propeller', 'aluminum', 'mercury', 'flo-torq'],
    rating: 4.5,
    reviewCount: 76
  },
  // Aftermarket Propeller
  {
    id: 'part-013',
    partNumber: 'SOS-1319',
    name: '13 x 19 Performance Propeller',
    description: 'High-performance 4-blade stainless steel propeller',
    brand: 'Solas',
    category: 'drive',
    subcategory: 'propellers',
    price: 325.00,
    salePrice: 295.00,
    isOEM: false,
    inStock: true,
    stockQuantity: 6,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Diameter': '13 inches',
      'Pitch': '19 inches',
      'Blades': '4',
      'Material': '316L Stainless Steel',
      'Cup': 'Aggressive rake'
    },
    compatibleMotors: ['6', '7', '8'], // 150 FourStroke, BF115, DF90A
    weight: 9.8,
    warranty: '12 months',
    minOrderQuantity: 1,
    relatedParts: ['part-011', 'part-012'],
    tags: ['propeller', 'performance', '4-blade', 'aftermarket'],
    rating: 4.6,
    reviewCount: 23
  },
  // Controls & Cables
  {
    id: 'part-014',
    partNumber: '703-48205-18-00',
    name: 'Single Engine Control',
    description: 'Single lever engine control for Yamaha outboards',
    brand: 'Yamaha',
    category: 'controls',
    subcategory: 'remote-controls',
    price: 385.00,
    isOEM: true,
    inStock: true,
    stockQuantity: 5,
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    specifications: {
      'Type': 'Single Lever',
      'Trim Switch': 'Included',
      'Key Switch': 'Included',
      'Mounting': 'Side mount'
    },
    compatibleMotors: ['1', '3', '5', '9'], // Most Yamaha engines
    weight: 3.2,
    warranty: '24 months',
    minOrderQuantity: 1,
    relatedParts: ['part-015', 'part-016'],
    tags: ['control', 'single lever', 'yamaha', 'side mount'],
    rating: 4.8,
    reviewCount: 56
  },
  {
    id: 'part-015',
    partNumber: '26-CC20015',
    name: '15ft Control Cable Set',
    description: 'Throttle and shift cable set for remote controls',
    brand: 'Mercury',
    category: 'controls',
    subcategory: 'cables',
    price: 155.00,
    isOEM: true,
    inStock: true,
    stockQuantity: 20,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Length': '15 feet',
      'Type': 'Push-pull',
      'End Fittings': 'Universal',
      'Cable Count': '2 (throttle & shift)'
    },
    compatibleMotors: ['1', '2', '3', '4', '5', '6'],
    weight: 4.8,
    warranty: '12 months',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 5, price: 140.00 }
    ],
    relatedParts: ['part-014'],
    tags: ['cables', 'control', 'mercury', '15ft'],
    bestseller: true,
    rating: 4.6,
    reviewCount: 91
  },
  // Maintenance Items
  {
    id: 'part-016',
    partNumber: 'YAM-LUB-10W30-GL-04',
    name: '10W-30 Marine Engine Oil',
    description: '4-stroke marine engine oil - 1 gallon',
    brand: 'Yamalube',
    category: 'maintenance',
    subcategory: 'oils',
    price: 32.99,
    salePrice: 28.99,
    isOEM: true,
    inStock: true,
    stockQuantity: 48,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Viscosity': '10W-30',
      'Type': '4-Stroke Marine',
      'Volume': '1 Gallon (3.78L)',
      'API Rating': 'SL'
    },
    compatibleMotors: ['1', '3', '5', '9', '18'], // All 4-stroke Yamaha
    weight: 7.5,
    warranty: 'N/A',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 6, price: 26.00 },
      { quantity: 12, price: 24.00 },
      { quantity: 24, price: 22.00 }
    ],
    relatedParts: ['part-017', 'part-018'],
    tags: ['oil', 'yamalube', '4-stroke', 'maintenance'],
    bestseller: true,
    rating: 4.9,
    reviewCount: 234
  },
  {
    id: 'part-017',
    partNumber: '5GH-13440-50-00',
    name: 'Oil Filter',
    description: 'Engine oil filter for Yamaha 4-stroke outboards',
    brand: 'Yamaha',
    category: 'maintenance',
    subcategory: 'oils',
    price: 18.50,
    isOEM: true,
    inStock: true,
    stockQuantity: 35,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Thread': '3/4"-16 UNF',
      'Height': '65mm',
      'Diameter': '76mm',
      'Micron Rating': '25'
    },
    compatibleMotors: ['1', '3', '5'],
    weight: 0.4,
    warranty: '12 months',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 12, price: 16.50 },
      { quantity: 24, price: 15.00 }
    ],
    relatedParts: ['part-016'],
    tags: ['oil filter', 'yamaha', '4-stroke'],
    rating: 4.7,
    reviewCount: 128
  },
  // Accessories - Anodes
  {
    id: 'part-018',
    partNumber: '6E5-45371-01-00',
    name: 'Trim Tab Anode',
    description: 'Sacrificial zinc anode for Yamaha outboard trim tabs',
    brand: 'Yamaha',
    category: 'accessories',
    subcategory: 'anodes',
    price: 12.99,
    isOEM: true,
    inStock: true,
    stockQuantity: 85,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Material': 'Zinc',
      'Weight': '0.25 lbs',
      'Mounting': 'Bolt-on',
      'Thread': '1/4"-20'
    },
    compatibleMotors: ['1', '3', '5'], // Most Yamaha outboards
    weight: 0.25,
    warranty: 'N/A',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 10, price: 11.00 },
      { quantity: 25, price: 10.00 },
      { quantity: 50, price: 9.00 }
    ],
    relatedParts: ['part-019', 'part-020'],
    tags: ['anode', 'zinc', 'yamaha', 'corrosion protection'],
    bestseller: true,
    rating: 4.8,
    reviewCount: 167
  },
  {
    id: 'part-019',
    partNumber: '8M0020279',
    name: 'Engine Anode Kit',
    description: 'Complete anode replacement kit for Mercury Verado engines',
    brand: 'Mercury',
    category: 'accessories',
    subcategory: 'anodes',
    price: 45.99,
    salePrice: 39.99,
    isOEM: true,
    inStock: true,
    stockQuantity: 15,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Kit Contents': 'Block anode, trim tab anode, hardware',
      'Material': 'Zinc',
      'Total Weight': '1.2 lbs'
    },
    compatibleMotors: ['2', '14'], // Verado engines
    weight: 1.2,
    warranty: 'N/A',
    minOrderQuantity: 1,
    relatedParts: ['part-018'],
    tags: ['anode kit', 'mercury', 'verado', 'complete'],
    rating: 4.7,
    reviewCount: 43
  },
  // Universal Aftermarket Parts
  {
    id: 'part-020',
    partNumber: 'SIE-18-2095',
    name: 'Universal Impeller Kit',
    description: 'Universal water pump impeller kit fits most outboards',
    brand: 'Sierra Marine',
    category: 'cooling',
    subcategory: 'water-pumps',
    price: 24.99,
    salePrice: 21.99,
    isOEM: false,
    inStock: true,
    stockQuantity: 42,
    images: ['/api/placeholder/400/300'],
    specifications: {
      'Material': 'Neoprene',
      'Blades': '6',
      'Inside Diameter': '25mm',
      'Outside Diameter': '65mm'
    },
    compatibleMotors: ['6', '7', '8', '10', '11'], // Mid-range outboards
    weight: 0.3,
    warranty: '6 months',
    minOrderQuantity: 1,
    bulkPricing: [
      { quantity: 10, price: 19.00 },
      { quantity: 25, price: 17.50 }
    ],
    relatedParts: ['part-007'],
    tags: ['impeller', 'universal', 'aftermarket', 'water pump'],
    bestseller: true,
    rating: 4.3,
    reviewCount: 98
  }
];
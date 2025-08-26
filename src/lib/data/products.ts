// Auto-generated from Shopify product export
// Generated on 2025-08-26T18:22:18.877Z

export interface ProductVariant {
  sku: string;
  option1Name?: string;
  option1Value?: string;
  option2Name?: string;
  option2Value?: string;
  price: number;
  compareAtPrice: number;
  weight: number;
  weightUnit: string;
  inventory: number;
  available: boolean;
  barcode?: string;
  taxable: boolean;
  requiresShipping: boolean;
  costPerItem: number;
}

export interface ProductImage {
  src: string;
  position: number;
  alt: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  brand: string;
  type: string;
  tags: string[];
  category: string;
  powerCategory: string;
  horsepower: number;
  published: boolean;
  images: ProductImage[];
  specs: Record<string, string>;
  variants: ProductVariant[];
  priceRange: {
    min: number;
    max: number;
  };
  inStock: boolean;
  status: string;
}

export const products: Product[] = [
  {
    "id": "yamaha-vf250",
    "handle": "yamaha-vf250",
    "title": "Yamaha VF250 V MAX SHO",
    "description": "Yamaha's V MAX SHO 250 combines V6 power with four-stroke efficiency. Features Variable Camshaft Timing on all six cylinders for maximum power across the RPM range. Plasma-fused sleeveless cylinders reduce weight.",
    "vendor": "Yamaha Marine",
    "brand": "Yamaha",
    "type": "Outboard Motor",
    "tags": [
      "250HP",
      "4-Stroke",
      "V6",
      "VCT",
      "VMAX SHO",
      "Yamaha"
    ],
    "category": "outboard",
    "powerCategory": "commercial",
    "horsepower": 250,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "V6 DOHC VCT",
      "Displacement": "4169cc (4.2L)",
      "Weight": "551 lbs (250 kg)",
      "Fuel System": "Multi-point EFI",
      "Alternator": "70 amp"
    },
    "variants": [
      {
        "sku": "YAM-VF250-25",
        "option1Name": "Shaft Length",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 21999,
        "compareAtPrice": 23999,
        "weight": 250000,
        "weightUnit": "kg",
        "inventory": 3,
        "available": true,
        "barcode": "190238475819",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 16300
      },
      {
        "sku": "YAM-VF250-30",
        "option1Name": "",
        "option1Value": "30 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 22499,
        "compareAtPrice": 24499,
        "weight": 252000,
        "weightUnit": "kg",
        "inventory": 1,
        "available": true,
        "barcode": "190238475820",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 16550
      }
    ],
    "priceRange": {
      "min": 21999,
      "max": 22499
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "yamaha-f150",
    "handle": "yamaha-f150",
    "title": "Yamaha F150 In-Line Four",
    "description": "Yamaha F150 combines power with efficiency in a lightweight package. Features Variable Camshaft Timing and multi-point fuel injection. Compatible with Yamaha's Helm Master EX system.",
    "vendor": "Yamaha Marine",
    "brand": "Yamaha",
    "type": "Outboard Motor",
    "tags": [
      "150HP",
      "4-Stroke",
      "In-line",
      "VCT",
      "Yamaha"
    ],
    "category": "outboard",
    "powerCategory": "high-performance",
    "horsepower": 150,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "In-line 4 DOHC",
      "Displacement": "2785cc",
      "Weight": "487 lbs (221 kg)",
      "Fuel System": "Multi-point EFI",
      "Alternator": "50 amp"
    },
    "variants": [
      {
        "sku": "YAM-F150-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 14999,
        "compareAtPrice": 16299,
        "weight": 221000,
        "weightUnit": "kg",
        "inventory": 4,
        "available": true,
        "barcode": "190238475817",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 11100
      },
      {
        "sku": "YAM-F150-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 15299,
        "compareAtPrice": 16599,
        "weight": 223000,
        "weightUnit": "kg",
        "inventory": 2,
        "available": true,
        "barcode": "190238475818",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 11250
      }
    ],
    "priceRange": {
      "min": 14999,
      "max": 15299
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "yamaha-f115",
    "handle": "yamaha-f115",
    "title": "Yamaha F115 Variable Camshaft Timing",
    "description": "Yamaha's F115 features Variable Camshaft Timing (VCT) for increased low-end torque. This 1.8L four-stroke delivers excellent hole shot and midrange punch. Multi-point electronic fuel injection ensures reliable starting.",
    "vendor": "Yamaha Marine",
    "brand": "Yamaha",
    "type": "Outboard Motor",
    "tags": [
      "115HP",
      "4-Stroke",
      "VCT",
      "Yamaha"
    ],
    "category": "outboard",
    "powerCategory": "high-performance",
    "horsepower": 115,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "In-line 4-cylinder",
      "Displacement": "1832cc (1.8L)",
      "Weight": "377 lbs (171 kg)",
      "Fuel System": "Multi-Point EFI",
      "Alternator": "35 amp",
      "Warranty": "3 Year Limited"
    },
    "variants": [
      {
        "sku": "YAM-F115XA-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 11499,
        "compareAtPrice": 12499,
        "weight": 171000,
        "weightUnit": "kg",
        "inventory": 8,
        "available": true,
        "barcode": "190238475815",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 8500
      },
      {
        "sku": "YAM-F115XA-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 11799,
        "compareAtPrice": 12799,
        "weight": 173000,
        "weightUnit": "kg",
        "inventory": 5,
        "available": true,
        "barcode": "190238475816",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 8650
      }
    ],
    "priceRange": {
      "min": 11499,
      "max": 11799
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "yamaha-f90",
    "handle": "yamaha-f90",
    "title": "Yamaha F90 In-Line Four",
    "description": "Yamaha F90 features a compact in-line four design with excellent power-to-weight ratio. Multi-point fuel injection and knock sensor for optimal performance. Compatible with mechanical or digital controls.",
    "vendor": "Yamaha Marine",
    "brand": "Yamaha",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "90HP",
      "EFI",
      "In-line",
      "Yamaha"
    ],
    "category": "outboard",
    "powerCategory": "mid-range",
    "horsepower": 90,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "In-line 4 SOHC",
      "Displacement": "1832cc",
      "Weight": "353 lbs (160 kg)",
      "Fuel System": "Multi-point EFI",
      "Alternator": "35 amp"
    },
    "variants": [
      {
        "sku": "YAM-F90-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 9799,
        "compareAtPrice": 10699,
        "weight": 160000,
        "weightUnit": "kg",
        "inventory": 7,
        "available": true,
        "barcode": "190238475813",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 7300
      },
      {
        "sku": "YAM-F90-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 9999,
        "compareAtPrice": 10899,
        "weight": 161000,
        "weightUnit": "kg",
        "inventory": 4,
        "available": true,
        "barcode": "190238475814",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 7400
      }
    ],
    "priceRange": {
      "min": 9799,
      "max": 9999
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "yamaha-f70",
    "handle": "yamaha-f70",
    "title": "Yamaha F70 Mid-Range",
    "description": "Yamaha's F70 delivers excellent mid-range torque with microcomputer ignition for optimal performance. Features include multi-point Electronic Fuel Injection and compatibility with Yamaha digital gauges.",
    "vendor": "Yamaha Marine",
    "brand": "Yamaha",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "70HP",
      "EFI",
      "Yamaha"
    ],
    "category": "outboard",
    "powerCategory": "mid-range",
    "horsepower": 70,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "4-cylinder SOHC",
      "Displacement": "996cc",
      "Weight": "253 lbs (115 kg)",
      "Fuel System": "Multi-point EFI",
      "Alternator": "16 amp"
    },
    "variants": [
      {
        "sku": "YAM-F70-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 7999,
        "compareAtPrice": 8699,
        "weight": 115000,
        "weightUnit": "kg",
        "inventory": 5,
        "available": true,
        "barcode": "190238475811",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 5900
      },
      {
        "sku": "YAM-F70-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 8199,
        "compareAtPrice": 8899,
        "weight": 116000,
        "weightUnit": "kg",
        "inventory": 3,
        "available": true,
        "barcode": "190238475812",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 6000
      }
    ],
    "priceRange": {
      "min": 7999,
      "max": 8199
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "yamaha-f50",
    "handle": "yamaha-f50",
    "title": "Yamaha F50 Four Stroke",
    "description": "Yamaha F50 offers exceptional value with proven four-stroke reliability. Features Electronic Fuel Injection for turn-key starting. Variable trolling RPM switch for precise speed control.",
    "vendor": "Yamaha Marine",
    "brand": "Yamaha",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "50HP",
      "EFI",
      "Yamaha"
    ],
    "category": "outboard",
    "powerCategory": "mid-range",
    "horsepower": 50,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "4-cylinder SOHC",
      "Displacement": "996cc",
      "Weight": "237 lbs (108 kg)",
      "Fuel System": "Electronic Fuel Injection",
      "Alternator": "16 amp"
    },
    "variants": [
      {
        "sku": "YAM-F50-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 6599,
        "compareAtPrice": 7199,
        "weight": 108000,
        "weightUnit": "kg",
        "inventory": 6,
        "available": true,
        "barcode": "190238475809",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 4900
      },
      {
        "sku": "YAM-F50-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 6799,
        "compareAtPrice": 7399,
        "weight": 109000,
        "weightUnit": "kg",
        "inventory": 4,
        "available": true,
        "barcode": "190238475810",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 5000
      }
    ],
    "priceRange": {
      "min": 6599,
      "max": 6799
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "yamaha-f25",
    "handle": "yamaha-f25",
    "title": "Yamaha F25 Portable",
    "description": "Yamaha's F25 is the lightest 25hp four-stroke available. Features battery-less EFI for consistent starts and improved fuel economy. Large comfortable tiller handle with power trim and tilt.",
    "vendor": "Yamaha Marine",
    "brand": "Yamaha",
    "type": "Outboard Motor",
    "tags": [
      "25HP",
      "4-Stroke",
      "EFI",
      "Portable",
      "Yamaha"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 25,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "Twin cylinder SOHC",
      "Displacement": "432cc",
      "Weight": "126 lbs (57 kg)",
      "Fuel System": "Battery-less EFI",
      "Alternator": "10 amp"
    },
    "variants": [
      {
        "sku": "YAM-F25-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 3999,
        "compareAtPrice": 4399,
        "weight": 57000,
        "weightUnit": "kg",
        "inventory": 15,
        "available": true,
        "barcode": "190238475807",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 2950
      },
      {
        "sku": "YAM-F25-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 4199,
        "compareAtPrice": 4599,
        "weight": 58000,
        "weightUnit": "kg",
        "inventory": 11,
        "available": true,
        "barcode": "190238475808",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 3050
      }
    ],
    "priceRange": {
      "min": 3999,
      "max": 4199
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "yamaha-f15",
    "handle": "yamaha-f15",
    "title": "Yamaha F15 Manual Start",
    "description": "Yamaha's F15 delivers excellent fuel economy with proven reliability. Features forward-mounted shift lever, shallow water drive, and optional electric start. Perfect for aluminum fishing boats.",
    "vendor": "Yamaha Marine",
    "brand": "Yamaha",
    "type": "Outboard Motor",
    "tags": [
      "15HP",
      "4-Stroke",
      "Manual Start",
      "Yamaha"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 15,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "Twin cylinder",
      "Displacement": "362cc",
      "Weight": "103 lbs (47 kg)",
      "Fuel System": "Single Carburetor",
      "Alternator": "6 amp"
    },
    "variants": [
      {
        "sku": "YAM-F15-M-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 3199,
        "compareAtPrice": 3499,
        "weight": 47000,
        "weightUnit": "kg",
        "inventory": 10,
        "available": true,
        "barcode": "190238475805",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 2400
      },
      {
        "sku": "YAM-F15-M-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 3299,
        "compareAtPrice": 3599,
        "weight": 48000,
        "weightUnit": "kg",
        "inventory": 7,
        "available": true,
        "barcode": "190238475806",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 2450
      }
    ],
    "priceRange": {
      "min": 3199,
      "max": 3299
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "yamaha-f9-9",
    "handle": "yamaha-f9-9",
    "title": "Yamaha F9.9 High Thrust",
    "description": "Yamaha's F9.9 features a dual thrust propeller for enhanced reverse thrust and control. SOHC design with CDI ignition system for reliable performance. Ideal for sailboats and heavy displacement hulls.",
    "vendor": "Yamaha Marine",
    "brand": "Yamaha",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "9.9HP",
      "High Thrust",
      "Yamaha"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 9,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "Twin cylinder SOHC",
      "Displacement": "212cc",
      "Weight": "87 lbs (39.5 kg)",
      "Fuel System": "Single Carburetor",
      "Alternator": "6 amp"
    },
    "variants": [
      {
        "sku": "YAM-F9.9-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 2599,
        "compareAtPrice": 2899,
        "weight": 39500,
        "weightUnit": "kg",
        "inventory": 12,
        "available": true,
        "barcode": "190238475803",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 1900
      },
      {
        "sku": "YAM-F9.9-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 2699,
        "compareAtPrice": 2999,
        "weight": 40000,
        "weightUnit": "kg",
        "inventory": 8,
        "available": true,
        "barcode": "190238475804",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 1950
      }
    ],
    "priceRange": {
      "min": 2599,
      "max": 2699
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "yamaha-f2-5",
    "handle": "yamaha-f2-5",
    "title": "Yamaha F2.5 Portable",
    "description": "Yamaha's smallest four-stroke is perfect for tenders, dinghies, and small jon boats. Ultra-portable at just 38 lbs with built-in fuel tank. Features 360-degree steering and shallow water drive.",
    "vendor": "Yamaha Marine",
    "brand": "Yamaha",
    "type": "Outboard Motor",
    "tags": [
      "2.5HP",
      "4-Stroke",
      "Portable",
      "Yamaha"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 2,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "Single cylinder",
      "Displacement": "72cc",
      "Weight": "38 lbs (17 kg)",
      "Fuel Tank": "Built-in 0.4 gallon",
      "Gear Ratio": "2.08:1"
    },
    "variants": [
      {
        "sku": "YAM-F2.5-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 899,
        "compareAtPrice": 999,
        "weight": 17000,
        "weightUnit": "kg",
        "inventory": 25,
        "available": true,
        "barcode": "190238475801",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 650
      },
      {
        "sku": "YAM-F2.5-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 949,
        "compareAtPrice": 1049,
        "weight": 17500,
        "weightUnit": "kg",
        "inventory": 18,
        "available": true,
        "barcode": "190238475802",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 675
      }
    ],
    "priceRange": {
      "min": 899,
      "max": 949
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "mercury-verado-300hp",
    "handle": "mercury-verado-300hp",
    "title": "Mercury Verado 300HP V8",
    "description": "The Mercury Verado 300 V8 is the pinnacle of outboard performance. Industry-exclusive Advanced MidSection (AMS) reduces vibration. Adaptive Speed Control maintains RPM regardless of load.",
    "vendor": "Mercury Marine",
    "brand": "Mercury",
    "type": "Outboard Motor",
    "tags": [
      "300HP",
      "4-Stroke",
      "Mercury",
      "Supercharged",
      "V8",
      "Verado"
    ],
    "category": "outboard",
    "powerCategory": "commercial",
    "horsepower": 300,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "V8 4-Stroke Supercharged",
      "Displacement": "4.6L",
      "Weight": "606 lbs (275 kg)",
      "Fuel System": "Electronic Fuel Injection",
      "Alternator": "115 amp"
    },
    "variants": [
      {
        "sku": "MERC-V300-V8-25",
        "option1Name": "Shaft Length",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 26999,
        "compareAtPrice": 28999,
        "weight": 275000,
        "weightUnit": "kg",
        "inventory": 0,
        "available": false,
        "barcode": "190238475768",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 20000
      },
      {
        "sku": "MERC-V300-V8-30",
        "option1Name": "",
        "option1Value": "30 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 27499,
        "compareAtPrice": 29499,
        "weight": 277000,
        "weightUnit": "kg",
        "inventory": 1,
        "available": true,
        "barcode": "190238475775",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 20250
      }
    ],
    "priceRange": {
      "min": 26999,
      "max": 27499
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "mercury-verado-250hp",
    "handle": "mercury-verado-250hp",
    "title": "Mercury Verado 250HP V8",
    "description": "Mercury's Verado 250 V8 outboard delivers power and performance with the quietest operation in its class. Advanced Range Optimization (ARO) provides best-in-class fuel economy. Digital Throttle &amp; Shift for smooth control.",
    "vendor": "Mercury Marine",
    "brand": "Mercury",
    "type": "Outboard Motor",
    "tags": [
      "250HP",
      "4-Stroke",
      "DTS",
      "Mercury",
      "V8",
      "Verado"
    ],
    "category": "outboard",
    "powerCategory": "commercial",
    "horsepower": 250,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "V8 4-Stroke",
      "Displacement": "4.6L",
      "Weight": "606 lbs (275 kg)",
      "Fuel System": "Electronic Fuel Injection",
      "Alternator": "115 amp",
      "Gear Ratio": "1.75:1"
    },
    "variants": [
      {
        "sku": "MERC-V250-V8-25",
        "option1Name": "Shaft Length",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 22999,
        "compareAtPrice": 24999,
        "weight": 275000,
        "weightUnit": "kg",
        "inventory": 2,
        "available": true,
        "barcode": "190238475744",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 17000
      },
      {
        "sku": "MERC-V250-V8-30",
        "option1Name": "",
        "option1Value": "30 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 23499,
        "compareAtPrice": 25499,
        "weight": 277000,
        "weightUnit": "kg",
        "inventory": 1,
        "available": true,
        "barcode": "190238475751",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 17250
      }
    ],
    "priceRange": {
      "min": 22999,
      "max": 23499
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "mercury-150hp-fourstroke",
    "handle": "mercury-150hp-fourstroke",
    "title": "Mercury 150HP FourStroke",
    "description": "Mercury's 150hp FourStroke delivers excellent all-around performance. Features Adaptive Speed Control for consistent RPM regardless of load. Maintenance-free valve train for reliability.",
    "vendor": "Mercury Marine",
    "brand": "Mercury",
    "type": "Outboard Motor",
    "tags": [
      "150HP",
      "3.0L",
      "4-Stroke",
      "DTS",
      "Mercury"
    ],
    "category": "outboard",
    "powerCategory": "high-performance",
    "horsepower": 150,
    "published": true,
    "images": [],
    "specs": {
      "Displacement": "3.0L (4-cylinder)",
      "Weight": "455 lbs (206 kg)",
      "Fuel System": "Electronic Fuel Injection",
      "Alternator": "60 amp"
    },
    "variants": [
      {
        "sku": "MERC-150-L4-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 13999,
        "compareAtPrice": 15199,
        "weight": 206000,
        "weightUnit": "kg",
        "inventory": 3,
        "available": true,
        "barcode": "190238475720",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 10400
      },
      {
        "sku": "MERC-150-L4-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 14299,
        "compareAtPrice": 15499,
        "weight": 207000,
        "weightUnit": "kg",
        "inventory": 5,
        "available": true,
        "barcode": "190238475737",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 10550
      }
    ],
    "priceRange": {
      "min": 13999,
      "max": 14299
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "mercury-115hp-proxs",
    "handle": "mercury-115hp-proxs",
    "title": "Mercury 115HP Pro XS",
    "description": "Mercury Pro XS 115 is engineered for tournament fishing. Features high-output alternator, dual water pickups, and optimized gear ratio for superior hole shot. Ideal for bass boats and flats boats.",
    "vendor": "Mercury Marine",
    "brand": "Mercury",
    "type": "Outboard Motor",
    "tags": [
      "115HP",
      "4-Stroke",
      "Mercury",
      "Pro XS",
      "Tournament"
    ],
    "category": "outboard",
    "powerCategory": "high-performance",
    "horsepower": 115,
    "published": true,
    "images": [],
    "specs": {
      "Displacement": "2064cc (4-cylinder)",
      "Weight": "359 lbs (163 kg)",
      "Fuel System": "Electronic Fuel Injection",
      "Alternator": "35 amp high-output",
      "Gear Ratio": "2.07:1"
    },
    "variants": [
      {
        "sku": "MERC-115XS-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 11999,
        "compareAtPrice": 12999,
        "weight": 163000,
        "weightUnit": "kg",
        "inventory": 6,
        "available": true,
        "barcode": "190238475706",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 8900
      },
      {
        "sku": "MERC-115XS-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 12299,
        "compareAtPrice": 13299,
        "weight": 164000,
        "weightUnit": "kg",
        "inventory": 2,
        "available": true,
        "barcode": "190238475713",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 9050
      }
    ],
    "priceRange": {
      "min": 11999,
      "max": 12299
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "mercury-60hp-fourstroke",
    "handle": "mercury-60hp-fourstroke",
    "title": "Mercury 60HP FourStroke EFI Command Thrust",
    "description": "Mercury 60hp Command Thrust provides exceptional low-end torque for heavy boats. Features a larger 2.33:1 gear ratio and bigger prop for increased thrust. Perfect for pontoons and deck boats.",
    "vendor": "Mercury Marine",
    "brand": "Mercury",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "60HP",
      "Command Thrust",
      "EFI",
      "Mercury"
    ],
    "category": "outboard",
    "powerCategory": "mid-range",
    "horsepower": 60,
    "published": true,
    "images": [],
    "specs": {
      "Displacement": "995cc (4-cylinder)",
      "Weight": "247 lbs (112 kg)",
      "Fuel System": "Electronic Fuel Injection",
      "Command Thrust Gearing": "2.33:1",
      "Alternator": "21 amp"
    },
    "variants": [
      {
        "sku": "MERC-60-CT-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 7999,
        "compareAtPrice": 8699,
        "weight": 112000,
        "weightUnit": "kg",
        "inventory": 4,
        "available": true,
        "barcode": "190238475683",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 5900
      },
      {
        "sku": "MERC-60-CT-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 8199,
        "compareAtPrice": 8899,
        "weight": 113000,
        "weightUnit": "kg",
        "inventory": 3,
        "available": true,
        "barcode": "190238475690",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 6000
      }
    ],
    "priceRange": {
      "min": 7999,
      "max": 8199
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "mercury-40hp-fourstroke",
    "handle": "mercury-40hp-fourstroke",
    "title": "Mercury 40HP FourStroke EFI",
    "description": "Mercury's 40hp FourStroke features Electronic Fuel Injection for turn-key starting and improved fuel economy. Single overhead cam design with 4 valves per cylinder delivers smooth, quiet power.",
    "vendor": "Mercury Marine",
    "brand": "Mercury",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "40HP",
      "EFI",
      "Mercury"
    ],
    "category": "outboard",
    "powerCategory": "mid-range",
    "horsepower": 40,
    "published": true,
    "images": [],
    "specs": {
      "Displacement": "747cc (3-cylinder)",
      "Weight": "209 lbs (95 kg)",
      "Fuel System": "Electronic Fuel Injection",
      "Alternator": "18 amp",
      "Gear Ratio": "1.83:1"
    },
    "variants": [
      {
        "sku": "MERC-40-EFI-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 5899,
        "compareAtPrice": 6399,
        "weight": 95000,
        "weightUnit": "kg",
        "inventory": 7,
        "available": true,
        "barcode": "190238475669",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 4400
      },
      {
        "sku": "MERC-40-EFI-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 6099,
        "compareAtPrice": 6599,
        "weight": 96000,
        "weightUnit": "kg",
        "inventory": 5,
        "available": true,
        "barcode": "190238475676",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 4500
      }
    ],
    "priceRange": {
      "min": 5899,
      "max": 6099
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "mercury-9-9hp-command",
    "handle": "mercury-9-9hp-command",
    "title": "Mercury 9.9HP Command Thrust",
    "description": "Mercury 9.9hp Command Thrust delivers 115 lbs of thrust - nearly 60% more than standard 9.9hp motors. Ideal for heavy loads, trolling, and pontoons. Features battery-free EFI for reliable starting.",
    "vendor": "Mercury Marine",
    "brand": "Mercury",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "9.9HP",
      "Command Thrust",
      "Mercury",
      "Trolling"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 9.9,
    "published": true,
    "images": [],
    "specs": {
      "Displacement": "209cc",
      "Weight": "95 lbs (43 kg)",
      "Fuel System": "Battery-Free EFI",
      "Alternator": "6 amp (75 watt)",
      "Command Thrust": "Higher torque",
      "Warranty": "3 Year Limited"
    },
    "variants": [
      {
        "sku": "MERC-9.9-CT-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 2799,
        "compareAtPrice": 3099,
        "weight": 43000,
        "weightUnit": "kg",
        "inventory": 15,
        "available": true,
        "barcode": "190238475645",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 2100
      },
      {
        "sku": "MERC-9.9-CT-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 2899,
        "compareAtPrice": 3199,
        "weight": 44000,
        "weightUnit": "kg",
        "inventory": 10,
        "available": true,
        "barcode": "190238475652",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 2150
      }
    ],
    "priceRange": {
      "min": 2799,
      "max": 2899
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "mercury-25hp-fourstroke",
    "handle": "mercury-25hp-fourstroke",
    "title": "Mercury 25HP FourStroke EFI",
    "description": "Mercury's 25 hp FourStroke outboard is the lightest 25hp engine in its class. Features electronic fuel injection (EFI) for easy starting, improved fuel efficiency, and instant throttle response. Perfect for fishing boats, pontoons, and inflatables.",
    "vendor": "Mercury Marine",
    "brand": "Mercury",
    "type": "Outboard Motor",
    "tags": [
      "25HP",
      "4-Stroke",
      "EFI",
      "Mercury",
      "Portable"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 25,
    "published": true,
    "images": [],
    "specs": {
      "Displacement": "526cc",
      "Weight": "157 lbs (71 kg)",
      "Fuel System": "Electronic Fuel Injection (EFI)",
      "Alternator": "12 amp (145 watt)",
      "Gear Ratio": "2.17:1",
      "Warranty": "3 Year Limited"
    },
    "variants": [
      {
        "sku": "MERC-25-EFI-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 3899,
        "compareAtPrice": 4299,
        "weight": 71000,
        "weightUnit": "kg",
        "inventory": 12,
        "available": true,
        "barcode": "190238475621",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 2900
      },
      {
        "sku": "MERC-25-EFI-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 4099,
        "compareAtPrice": 4499,
        "weight": 73000,
        "weightUnit": "kg",
        "inventory": 8,
        "available": true,
        "barcode": "190238475638",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 3050
      }
    ],
    "priceRange": {
      "min": 3899,
      "max": 4099
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf250",
    "handle": "honda-bf250",
    "title": "Honda BF250 V6 VTEC",
    "description": "Honda's BF250 features VTEC (Variable Valve Timing &amp; Lift Electronic Control) technology for maximum performance. The 3.6L V6 delivers exceptional power with superior fuel economy. Includes NMEA 2000 compatibility.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "250HP",
      "4-Stroke",
      "Honda",
      "V6",
      "VTEC"
    ],
    "category": "outboard",
    "powerCategory": "commercial",
    "horsepower": 250,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "V6 VTEC",
      "Displacement": "3583cc (3.6L)",
      "Weight": "622 lbs (282 kg)",
      "Fuel System": "PGM-FI",
      "Alternator": "90 amp"
    },
    "variants": [
      {
        "sku": "HON-BF250-V6-25",
        "option1Name": "Shaft Length",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 21999,
        "compareAtPrice": 23999,
        "weight": 282000,
        "weightUnit": "kg",
        "inventory": 0,
        "available": false,
        "barcode": "190238476024",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 16300
      },
      {
        "sku": "HON-BF250-V6-30",
        "option1Name": "",
        "option1Value": "30 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 22499,
        "compareAtPrice": 24499,
        "weight": 284000,
        "weightUnit": "kg",
        "inventory": 1,
        "available": true,
        "barcode": "190238476025",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 16550
      }
    ],
    "priceRange": {
      "min": 21999,
      "max": 22499
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf225",
    "handle": "honda-bf225",
    "title": "Honda BF225 V6",
    "description": "Honda's BF225 V6 delivers exceptional power with advanced VTEC technology. Features Drive-by-Wire throttle control and Variable Valve Timing on all cylinders for maximum performance.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "225HP",
      "DBW",
      "Honda",
      "V6",
      "VTEC"
    ],
    "category": "outboard",
    "powerCategory": "commercial",
    "horsepower": 225,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "V6 SOHC VTEC",
      "Displacement": "3471cc",
      "Weight": "606 lbs (275 kg)",
      "Fuel System": "PGM-FI",
      "Alternator": "90 amp"
    },
    "variants": [
      {
        "sku": "HON-BF225-V6-25",
        "option1Name": "Shaft Length",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 19999,
        "compareAtPrice": 21899,
        "weight": 275000,
        "weightUnit": "kg",
        "inventory": 2,
        "available": true,
        "barcode": "190238476022",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 14800
      },
      {
        "sku": "HON-BF225-V6-30",
        "option1Name": "",
        "option1Value": "30 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 20499,
        "compareAtPrice": 22399,
        "weight": 277000,
        "weightUnit": "kg",
        "inventory": 1,
        "available": true,
        "barcode": "190238476023",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 15050
      }
    ],
    "priceRange": {
      "min": 19999,
      "max": 20499
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf150",
    "handle": "honda-bf150",
    "title": "Honda BF150 VTEC",
    "description": "Honda BF150 delivers V6 power in a 4-cylinder package. Features VTEC technology, lean burn control, and Variable Air Intake. Compatible with Honda's advanced digital controls.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "150HP",
      "4-Stroke",
      "Honda",
      "VTEC"
    ],
    "category": "outboard",
    "powerCategory": "high-performance",
    "horsepower": 150,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "4-cylinder DOHC VTEC",
      "Displacement": "2354cc",
      "Weight": "487 lbs (221 kg)",
      "Fuel System": "PGM-FI",
      "Alternator": "55 amp"
    },
    "variants": [
      {
        "sku": "HON-BF150-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 14999,
        "compareAtPrice": 16399,
        "weight": 221000,
        "weightUnit": "kg",
        "inventory": 3,
        "available": true,
        "barcode": "190238476020",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 11100
      },
      {
        "sku": "HON-BF150-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 15299,
        "compareAtPrice": 16699,
        "weight": 223000,
        "weightUnit": "kg",
        "inventory": 2,
        "available": true,
        "barcode": "190238476021",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 11250
      }
    ],
    "priceRange": {
      "min": 14999,
      "max": 15299
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf115",
    "handle": "honda-bf115",
    "title": "Honda BF115 iST",
    "description": "Honda's BF115 features intelligent Shift &amp; Throttle (iST) for smooth, quiet shifting. VTEC technology provides exceptional performance across the RPM range. Variable intake timing optimizes torque.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "115HP",
      "4-Stroke",
      "Honda",
      "iST",
      "VTEC"
    ],
    "category": "outboard",
    "powerCategory": "high-performance",
    "horsepower": 115,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "4-cylinder DOHC VTEC",
      "Displacement": "2354cc",
      "Weight": "487 lbs (221 kg)",
      "Fuel System": "PGM-FI",
      "Alternator": "55 amp"
    },
    "variants": [
      {
        "sku": "HON-BF115-iST-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 11999,
        "compareAtPrice": 13099,
        "weight": 221000,
        "weightUnit": "kg",
        "inventory": 4,
        "available": true,
        "barcode": "190238476018",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 8900
      },
      {
        "sku": "HON-BF115-iST-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 12299,
        "compareAtPrice": 13399,
        "weight": 223000,
        "weightUnit": "kg",
        "inventory": 2,
        "available": true,
        "barcode": "190238476019",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 9050
      }
    ],
    "priceRange": {
      "min": 11999,
      "max": 12299
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf90",
    "handle": "honda-bf90",
    "title": "Honda BF90 VTEC",
    "description": "Honda BF90 combines VTEC technology with lean burn control for maximum efficiency. Features Variable Valve Timing for improved low-end torque and top-end power.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "90HP",
      "ECOmo",
      "Honda",
      "VTEC"
    ],
    "category": "outboard",
    "powerCategory": "mid-range",
    "horsepower": 90,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "4-cylinder SOHC VTEC",
      "Displacement": "1496cc",
      "Weight": "359 lbs (163 kg)",
      "Fuel System": "PGM-FI",
      "Alternator": "40 amp"
    },
    "variants": [
      {
        "sku": "HON-BF90-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 9999,
        "compareAtPrice": 10999,
        "weight": 163000,
        "weightUnit": "kg",
        "inventory": 6,
        "available": true,
        "barcode": "190238476016",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 7400
      },
      {
        "sku": "HON-BF90-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 10199,
        "compareAtPrice": 11199,
        "weight": 164000,
        "weightUnit": "kg",
        "inventory": 4,
        "available": true,
        "barcode": "190238476017",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 7500
      }
    ],
    "priceRange": {
      "min": 9999,
      "max": 10199
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf75",
    "handle": "honda-bf75",
    "title": "Honda BF75 Mid-Range",
    "description": "Honda's BF75 delivers smooth 4-cylinder performance with excellent fuel economy. Features VTEC technology and lean burn control. Compatible with mechanical or digital controls.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "75HP",
      "Honda",
      "VTEC"
    ],
    "category": "outboard",
    "powerCategory": "mid-range",
    "horsepower": 75,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "4-cylinder SOHC VTEC",
      "Displacement": "1496cc",
      "Weight": "359 lbs (163 kg)",
      "Fuel System": "PGM-FI",
      "Alternator": "40 amp"
    },
    "variants": [
      {
        "sku": "HON-BF75-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 8999,
        "compareAtPrice": 9799,
        "weight": 163000,
        "weightUnit": "kg",
        "inventory": 5,
        "available": true,
        "barcode": "190238476014",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 6700
      },
      {
        "sku": "HON-BF75-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 9199,
        "compareAtPrice": 9999,
        "weight": 164000,
        "weightUnit": "kg",
        "inventory": 3,
        "available": true,
        "barcode": "190238476015",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 6800
      }
    ],
    "priceRange": {
      "min": 8999,
      "max": 9199
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf50",
    "handle": "honda-bf50",
    "title": "Honda BF50 VTEC",
    "description": "Honda BF50 features VTEC technology for optimal power and efficiency. Boosted Low Speed Torque (BLAST) improves acceleration. Multi-port programmed fuel injection ensures smooth operation.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "50HP",
      "Honda",
      "PGM-FI",
      "VTEC"
    ],
    "category": "outboard",
    "powerCategory": "mid-range",
    "horsepower": 50,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "3-cylinder SOHC VTEC",
      "Displacement": "808cc",
      "Weight": "214 lbs (97 kg)",
      "Fuel System": "PGM-FI"
    },
    "variants": [
      {
        "sku": "HON-BF50-V-20",
        "option1Name": "Shaft Length",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 6799,
        "compareAtPrice": 7399,
        "weight": 97000,
        "weightUnit": "kg",
        "inventory": 7,
        "available": true,
        "barcode": "190238476012",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 5050
      },
      {
        "sku": "HON-BF50-V-25",
        "option1Name": "",
        "option1Value": "25 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 6999,
        "compareAtPrice": 7599,
        "weight": 98000,
        "weightUnit": "kg",
        "inventory": 5,
        "available": true,
        "barcode": "190238476013",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 5150
      }
    ],
    "priceRange": {
      "min": 6799,
      "max": 6999
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf40",
    "handle": "honda-bf40",
    "title": "Honda BF40 Jet Drive",
    "description": "Honda's BF40 Jet Drive provides exceptional shallow water performance. Features BLAST technology and lean burn control for fuel efficiency. Perfect for river navigation and rocky conditions.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "40HP",
      "BLAST",
      "Honda",
      "Jet Drive"
    ],
    "category": "outboard",
    "powerCategory": "mid-range",
    "horsepower": 40,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "3-cylinder OHC",
      "Displacement": "808cc",
      "Weight": "214 lbs (97 kg)",
      "Fuel System": "3 Carburetors"
    },
    "variants": [
      {
        "sku": "HON-BF40-JET",
        "option1Name": "Configuration",
        "option1Value": "Jet Drive",
        "option2Name": "",
        "option2Value": "",
        "price": 6999,
        "compareAtPrice": 7699,
        "weight": 97000,
        "weightUnit": "kg",
        "inventory": 4,
        "available": true,
        "barcode": "190238476011",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 5200
      }
    ],
    "priceRange": {
      "min": 6999,
      "max": 6999
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf20",
    "handle": "honda-bf20",
    "title": "Honda BF20 Electric Start",
    "description": "Honda BF20 features electric start convenience and excellent fuel economy. Twin-cylinder reliability with PGM-IG CDI ignition. Compatible with tiller or remote control configurations.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "20HP",
      "4-Stroke",
      "Electric Start",
      "Honda"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 20,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "Twin cylinder OHV",
      "Displacement": "350cc",
      "Weight": "119 lbs (54 kg)",
      "Fuel System": "Single Carburetor",
      "Alternator": "12 amp"
    },
    "variants": [
      {
        "sku": "HON-BF20-E-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 3299,
        "compareAtPrice": 3699,
        "weight": 54000,
        "weightUnit": "kg",
        "inventory": 9,
        "available": true,
        "barcode": "190238476009",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 2450
      },
      {
        "sku": "HON-BF20-E-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 3399,
        "compareAtPrice": 3799,
        "weight": 55000,
        "weightUnit": "kg",
        "inventory": 6,
        "available": true,
        "barcode": "190238476010",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 2500
      }
    ],
    "priceRange": {
      "min": 3299,
      "max": 3399
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf15",
    "handle": "honda-bf15",
    "title": "Honda BF15 Tiller Handle",
    "description": "Honda's BF15 delivers best-in-class performance with BLAST technology for improved hole shot. Features include tiller handle control, forward-mounted shift lever, and 6-amp charging system.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "15HP",
      "4-Stroke",
      "BLAST",
      "Honda",
      "Tiller"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 15,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "Twin Cylinder",
      "Displacement": "222cc",
      "Weight": "104 lbs (47 kg)",
      "Fuel System": "Carburetor",
      "Alternator": "6 amp",
      "Warranty": "5 Year Limited"
    },
    "variants": [
      {
        "sku": "HON-BF15-T-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 2599,
        "compareAtPrice": 2899,
        "weight": 47000,
        "weightUnit": "kg",
        "inventory": 11,
        "available": true,
        "barcode": "190238476007",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 1950
      },
      {
        "sku": "HON-BF15-T-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 2699,
        "compareAtPrice": 2999,
        "weight": 48000,
        "weightUnit": "kg",
        "inventory": 8,
        "available": true,
        "barcode": "190238476008",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 2000
      }
    ],
    "priceRange": {
      "min": 2599,
      "max": 2699
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf10",
    "handle": "honda-bf10",
    "title": "Honda BF10 Tiller",
    "description": "Honda's BF10 delivers twin-cylinder smoothness in a portable package. Features 5-amp charging system and gas-assist tilt for easy handling. Forward/Neutral/Reverse shift with 360° steering.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "10HP",
      "4-Stroke",
      "Honda",
      "Tiller"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 10,
    "published": true,
    "images": [
      {
        "src": "https://cdn.shopify.com/s/files/1/0775/1932/3393/files/bf10.webp?v=1756230658",
        "position": 1,
        "alt": "Honda BF10 Tiller"
      }
    ],
    "specs": {
      "Engine Type": "Twin cylinder OHV",
      "Displacement": "222cc",
      "Weight": "93 lbs (42 kg)",
      "Fuel System": "Single Carburetor",
      "Alternator": "5 amp"
    },
    "variants": [
      {
        "sku": "HON-BF10-T-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 2399,
        "compareAtPrice": 2699,
        "weight": 42000,
        "weightUnit": "kg",
        "inventory": 14,
        "available": true,
        "barcode": "190238476005",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 1800
      },
      {
        "sku": "HON-BF10-T-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 2499,
        "compareAtPrice": 2799,
        "weight": 43000,
        "weightUnit": "kg",
        "inventory": 10,
        "available": true,
        "barcode": "190238476006",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 1850
      }
    ],
    "priceRange": {
      "min": 2399,
      "max": 2499
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf5",
    "handle": "honda-bf5",
    "title": "Honda BF5 Portable",
    "description": "Honda BF5 features a larger fuel tank and enhanced performance. One-handed carrying design with integrated storage. Decompression system for easy starting and shallow water drive capability.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "4-Stroke",
      "5HP",
      "Honda",
      "Portable"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 5,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "Single cylinder OHV",
      "Displacement": "127cc",
      "Weight": "60 lbs (27 kg)",
      "Fuel Tank": "External 1.0 gallon",
      "Alternator": "Optional 6 amp"
    },
    "variants": [
      {
        "sku": "HON-BF5-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 1599,
        "compareAtPrice": 1799,
        "weight": 27000,
        "weightUnit": "kg",
        "inventory": 18,
        "available": true,
        "barcode": "190238476003",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 1200
      },
      {
        "sku": "HON-BF5-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 1699,
        "compareAtPrice": 1899,
        "weight": 27500,
        "weightUnit": "kg",
        "inventory": 12,
        "available": true,
        "barcode": "190238476004",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 1250
      }
    ],
    "priceRange": {
      "min": 1599,
      "max": 1699
    },
    "inStock": true,
    "status": "active"
  },
  {
    "id": "honda-bf2-3",
    "handle": "honda-bf2-3",
    "title": "Honda BF2.3 Portable",
    "description": "Honda's BF2.3 is the world's lightest 4-stroke outboard. Features centrifugal clutch for neutral at idle and air-cooled design for shallow water operation. Internal fuel tank for portability.",
    "vendor": "Honda Marine",
    "brand": "Honda",
    "type": "Outboard Motor",
    "tags": [
      "2.3HP",
      "4-Stroke",
      "Air-cooled",
      "Honda",
      "Portable"
    ],
    "category": "outboard",
    "powerCategory": "portable",
    "horsepower": 2,
    "published": true,
    "images": [],
    "specs": {
      "Engine Type": "Single cylinder OHV",
      "Displacement": "57cc",
      "Weight": "27 lbs (12.5 kg)",
      "Cooling": "Air-cooled",
      "Fuel Tank": "Internal 0.3 gallon"
    },
    "variants": [
      {
        "sku": "HON-BF2.3-15",
        "option1Name": "Shaft Length",
        "option1Value": "15 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 799,
        "compareAtPrice": 899,
        "weight": 12500,
        "weightUnit": "kg",
        "inventory": 20,
        "available": true,
        "barcode": "190238476001",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 600
      },
      {
        "sku": "HON-BF2.3-20",
        "option1Name": "",
        "option1Value": "20 inch",
        "option2Name": "",
        "option2Value": "",
        "price": 849,
        "compareAtPrice": 949,
        "weight": 13000,
        "weightUnit": "kg",
        "inventory": 15,
        "available": true,
        "barcode": "190238476002",
        "taxable": true,
        "requiresShipping": true,
        "costPerItem": 625
      }
    ],
    "priceRange": {
      "min": 799,
      "max": 849
    },
    "inStock": true,
    "status": "active"
  }
];

// Helper functions
export function getProductByHandle(handle: string): Product | undefined {
  return products.find(p => p.handle === handle);
}

export function getProductsByVendor(vendor: string): Product[] {
  return products.filter(p => p.vendor === vendor);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter(p => p.brand === brand);
}

export function getProductsByPowerCategory(category: string): Product[] {
  return products.filter(p => p.powerCategory === category);
}

export function getProductsByHorsepowerRange(min: number, max: number): Product[] {
  return products.filter(p => p.horsepower >= min && p.horsepower <= max);
}

export function getProductsByPriceRange(min: number, max: number): Product[] {
  return products.filter(p => 
    p.priceRange.min <= max && p.priceRange.max >= min
  );
}

export function getFeaturedProducts(limit: number = 8): Product[] {
  return products
    .filter(p => p.published && p.inStock)
    .sort((a, b) => {
      // Sort by inventory count (highest first)
      const aInventory = a.variants.reduce((sum, v) => sum + v.inventory, 0);
      const bInventory = b.variants.reduce((sum, v) => sum + v.inventory, 0);
      return bInventory - aInventory;
    })
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(p => 
    p.title.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.vendor.toLowerCase().includes(searchTerm) ||
    p.brand.toLowerCase().includes(searchTerm) ||
    p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Get unique brands
export function getBrands(): string[] {
  return [...new Set(products.map(p => p.brand).filter(Boolean))];
}

// Get unique power categories
export function getPowerCategories(): string[] {
  return [...new Set(products.map(p => p.powerCategory).filter(Boolean))];
}

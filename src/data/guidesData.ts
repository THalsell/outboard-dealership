import { Feature, Brand, MaintenanceItem, ShaftLengthInfo, HorsepowerFAQ } from './types';

export const featuresData: Feature[] = [
  {
    title: "Power Steering",
    description: "Essential for larger motors (150+ HP). Makes maneuvering effortless and reduces fatigue during long trips."
  },
  {
    title: "Electric Start",
    description: "Standard on most modern outboards. Much more convenient than pull-start, especially in emergency situations."
  },
  {
    title: "Tilt & Trim",
    description: "Power tilt allows you to adjust motor angle for optimal performance, better fuel economy, and easier trailering."
  },
  {
    title: "Digital Gauges",
    description: "Modern displays provide real-time engine data, fuel consumption, maintenance alerts, and diagnostic information."
  },
  {
    title: "High Output Alternator",
    description: "Higher output alternators (60A+) are essential if you run multiple electronics or need to charge batteries while running."
  },
  {
    title: "Corrosion Protection",
    description: "Look for quality anti-corrosion coatings and sacrificial anodes, especially important for saltwater use."
  }
];

export const brandsData: Brand[] = [
  {
    name: "Honda",
    rating: 4.8,
    maxStars: 4,
    strengths: ["Fuel efficiency", "Quiet operation", "Reliability"]
  },
  {
    name: "Yamaha",
    rating: 4.9,
    maxStars: 5,
    strengths: ["Performance", "Innovation", "Dealer network"]
  },
  {
    name: "Mercury",
    rating: 4.7,
    maxStars: 4,
    strengths: ["Speed", "Power", "Technology"]
  },
  {
    name: "Suzuki",
    rating: 4.5,
    maxStars: 4,
    strengths: ["Lightweight", "Value", "Efficiency"]
  },
  {
    name: "Freedom",
    rating: 4.3,
    maxStars: 4,
    strengths: ["Modern features", "Competitive pricing", "Warranty"]
  },
  {
    name: "Tohatsu",
    rating: 4.4,
    maxStars: 4,
    strengths: ["Reliability", "Simple design", "Commercial grade"]
  }
];

export const maintenanceData: MaintenanceItem[] = [
  {
    title: "First 20 Hours",
    description: "Initial break-in service - oil change, filter replacement"
  },
  {
    title: "100 Hours / Annually",
    description: "Oil change, gear oil, spark plugs, fuel filter"
  },
  {
    title: "200 Hours / 2 Years",
    description: "Impeller, thermostats, fuel pump inspection"
  },
  {
    title: "300 Hours / 3 Years",
    description: "Major service - timing belt, valve adjustment"
  },
  {
    title: "Pro Maintenance Tips",
    items: [
      "Use manufacturer-recommended parts",
      "Keep detailed service records",
      "Flush after saltwater use",
      "Store with full fuel tank"
    ]
  },
  {
    title: "Professional Service",
    items: [
      "Warranty compliance",
      "Expert diagnosis",
      "Genuine parts",
      "Service records"
    ]
  }
];

export const shaftLengthData: ShaftLengthInfo[] = [
  {
    title: "Short (S)",
    length: "15\"",
    transom: "15-16\"",
    description: "Ideal for smaller boats and shallow water operation"
  },
  {
    title: "Long (L)",
    length: "20\"",
    transom: "19-21\"",
    description: "Most common size for recreational boats"
  },
  {
    title: "Extra Long (XL)",
    length: "25\"",
    transom: "24-26\"",
    description: "Perfect for pontoon boats and higher transoms"
  },
  {
    title: "Ultra Long (XXL)",
    length: "30\"",
    transom: "29-31\"",
    description: "Specialized applications and very high transoms"
  },
  {
    title: "Measurement Guide",
    description: "Always measure from the top of the transom to the bottom along the transom face, not diagonally. Ensure your boat is on level ground for accurate measurement."
  },
  {
    title: "Pro Tip",
    description: "If you're between sizes, it's generally better to go with the longer shaft to ensure the propeller stays submerged in choppy water."
  }
];

export const horsepowerFAQs: HorsepowerFAQ[] = [
  {
    id: 'factors',
    question: 'What factors should I consider when choosing horsepower?',
    answer: {
      text: '',
      list: [
        'Boat length and weight',
        'Maximum capacity rating on your boat\'s plate',
        'Typical passenger and cargo load',
        "Water conditions you'll navigate",
        'Desired top speed and acceleration',
        'Fuel efficiency priorities'
      ]
    }
  },
  {
    id: 'guidelines',
    question: 'What are the general horsepower guidelines by boat size?',
    answer: {
      text: '',
      list: [
        '14-16 ft boats: 25-60 HP',
        '17-19 ft boats: 75-150 HP',
        '20-24 ft boats: 150-300 HP',
        '25+ ft boats: 300+ HP',
        "*Always check your boat's maximum HP rating on the capacity plate"
      ]
    }
  },
  {
    id: 'underpowered',
    question: 'What happens if my boat is underpowered?',
    answer: {
      text: 'An underpowered boat can experience:',
      list: [
        'Poor hole shot and slow planing',
        'Difficulty in rough water conditions',
        'Excessive fuel consumption trying to reach plane',
        'Safety concerns in emergency situations',
        'Increased engine wear from constant high RPM operation'
      ]
    }
  },
  {
    id: 'overpowered',
    question: 'Is it okay to have more horsepower than recommended?',
    answer: {
      text: "Never exceed your boat's maximum HP rating - this is dangerous and may void insurance. However, having power at the upper end of the recommended range offers:",
      list: [
        'Better performance in rough conditions',
        'Improved hole shot with heavy loads',
        'Safety margin for emergencies',
        'Ability to cruise at lower RPMs'
      ]
    }
  },
  {
    id: 'fuel',
    question: 'How does horsepower affect fuel consumption?',
    answer: {
      text: 'Fuel consumption depends more on how you use the motor than its size. A properly sized motor running at optimal RPM is often more efficient than an undersized motor working at full throttle. Consider:',
      list: [
        'Larger motors at cruising speed can be very efficient',
        '4-stroke engines typically use 40% less fuel than 2-strokes',
        'Proper propping is crucial for fuel efficiency',
        'Weight distribution affects fuel consumption'
      ]
    }
  },
  {
    id: 'protip',
    question: "What's your pro tip for choosing horsepower?",
    answer: {
      text: "It's often better to have slightly more power than you think you need. This gives you better hole shot, allows you to maintain speed in rough conditions, and provides a safety margin for emergencies. You don't have to use all the power all the time, but it's there when you need it. Always check your boat's maximum HP rating on the capacity plate."
    }
  }
];
import { Product } from "@/types/product";
import { enrichProductForSEO } from "./product-enrichment";

export function generateProductSchema(product: Product, url: string) {
  // Find the first available variant with a valid price, or fallback to first variant
  const availableVariant = product.variants.find(v => v.available && v.price > 0);
  const variant = availableVariant || product.variants[0];

  // Use the same price logic as PriceDisplay component
  // If there's a compare price and it's higher, show the sale price (variant.price)
  // Otherwise show the regular price
  const displayPrice = variant?.price || 0;

  // Use enrichment to fill in any missing properties
  const enriched = enrichProductForSEO(product);

  // Build comprehensive additional properties for AI visibility
  const additionalProperties: Array<{
    "@type": "PropertyValue";
    name: string;
    value: string;
  }> = [];

  // Core specifications
  if (product.horsepower > 0) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Horsepower",
      value: `${product.horsepower} HP`,
    });
  }

  // Engine specifications - CRITICAL for AI search
  const engineType = product.engineType || enriched.extractedSpecs.engineType;
  if (engineType) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Engine Type",
      value: engineType,
    });
  }

  const fuelType = product.fuelType || enriched.extractedSpecs.fuelType;
  if (fuelType) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Fuel Type",
      value: fuelType,
    });
  }

  const shaftLength =
    product.shaftLength || enriched.extractedSpecs.shaftLength;
  if (shaftLength) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Shaft Length",
      value: shaftLength,
    });
  }

  // Physical specifications
  const weight = product.weight || variant?.weight;
  if (weight) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Weight",
      value: `${weight} ${variant?.weightUnit || "lbs"}`,
    });
  }

  if (product.displacement) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Displacement",
      value: `${product.displacement} cc`,
    });
  }

  if (product.cylinders) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Cylinders",
      value: product.cylinders.toString(),
    });
  }

  // Operating features
  const startingSystem =
    product.startingSystem || enriched.extractedSpecs.startingSystem;
  if (startingSystem) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Starting System",
      value: startingSystem,
    });
  }

  const controlType =
    product.controlType || enriched.extractedSpecs.controlType;
  if (controlType) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Control Type",
      value: controlType,
    });
  }

  const coolingSystem =
    product.coolingSystem || enriched.extractedSpecs.coolingSystem;
  if (coolingSystem) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Cooling System",
      value: coolingSystem,
    });
  }

  if (product.trimTilt) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Trim & Tilt",
      value: product.trimTilt,
    });
  }

  if (product.gearRatio) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Gear Ratio",
      value: product.gearRatio,
    });
  }

  if (product.alternator) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Alternator",
      value: product.alternator,
    });
  }

  // Warranty - Important for trust signals
  const warranty = product.warranty || enriched.extractedSpecs.warranty;
  if (warranty) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Warranty",
      value: warranty,
    });
  }

  // Capacities
  if (product.fuelCapacity) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Fuel Capacity",
      value: `${product.fuelCapacity} gallons`,
    });
  }

  if (product.oilCapacity) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Oil Capacity",
      value: `${product.oilCapacity} quarts`,
    });
  }

  // Categories and classifications
  if (product.powerCategory) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Power Category",
      value: product.powerCategory,
    });
  }

  if (product.boatSizeRange) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Recommended Boat Size",
      value: product.boatSizeRange,
    });
  }

  // Boolean features as properties
  if (product.propellerIncluded) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Propeller Included",
      value: "Yes",
    });
  }

  if (product.isPortable) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Portable",
      value: "Yes",
    });
  }

  if (product.isSaltwater) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Saltwater Compatible",
      value: "Yes",
    });
  }

  if (product.isCommercial) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Commercial Grade",
      value: "Yes",
    });
  }

  // Year/Model Year
  if (product.modelYear) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Model Year",
      value: product.modelYear.toString(),
    });
  }

  // Add any additional specs not already covered
  if (product.specs) {
    Object.entries(product.specs).forEach(([key, value]) => {
      if (value && !additionalProperties.some((p) => p.name === key)) {
        additionalProperties.push({
          "@type": "PropertyValue",
          name: key,
          value: value,
        });
      }
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    sku: variant?.sku || product.id,
    mpn: variant?.sku || product.id,
    gtin: variant?.barcode,
    image: product.images.map((img) => img.src),
    url: url,
    category: product.category || "Outboard Motors",
    keywords: product.seoKeywords?.join(", ") || product.tags.join(", "),
    applicationArea: product.applicationTypes?.join(", "),
    manufacturer: {
      "@type": "Organization",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: url,
      priceCurrency: "USD",
      price: displayPrice > 0 ? displayPrice.toFixed(2) : "0.00",
      availability: (variant?.available && variant?.inventory > 0)
        ? "https://schema.org/InStock"
        : variant?.available && variant?.inventory === 0
        ? "https://schema.org/PreOrder"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Outboard Motor Sales",
        url: "https://outboardmotorsales.com",
        telephone: "(931) 243-4555",
        address: {
          "@type": "PostalAddress",
          streetAddress: "615 West Lake Avenue",
          addressLocality: "Celina",
          addressRegion: "TN",
          postalCode: "38551",
          addressCountry: "US",
        },
      },
      itemCondition:
        (product.condition || product.status) === "new"
          ? "https://schema.org/NewCondition"
          : product.condition === "refurbished"
          ? "https://schema.org/RefurbishedCondition"
          : "https://schema.org/UsedCondition",
    },
    additionalProperty:
      additionalProperties.length > 0 ? additionalProperties : undefined,
    isRelatedTo: product.applicationTypes?.map((appType) => ({
      "@type": "Product",
      name: `${appType} boats`,
    })),
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["BoatDealer", "Store", "LocalBusiness"],
    "@id": "https://outboardmotorsales.com/#organization",
    name: "Outboard Motor Sales - Authorized Dealer",
    alternateName: "Outboard Motor Sales",
    description:
      "Authorized dealer for Yamaha, Honda, Mercury, Suzuki, Tohatsu, and Freedom outboard motors. Free shipping to all 48 contiguous states. Located in Celina, TN with parts, service, and repairs available.",
    url: "https://outboardmotorsales.com",
    logo: {
      "@type": "ImageObject",
      url: "https://outboardmotorsales.com/logo.png",
      width: 600,
      height: 200,
    },
    image: [
      "https://outboardmotorsales.com/storefront.jpg",
      "https://outboardmotorsales.com/showroom.jpg",
    ],
    telephone: "+1-931-243-4555",
    email: "eli@claypowersports.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "615 West Lake Avenue",
      addressLocality: "Celina",
      addressRegion: "TN",
      postalCode: "38551",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "36.55205",
      longitude: "-85.51139",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/outboarddealership",
      "https://www.instagram.com/outboarddealership",
      "https://www.youtube.com/outboarddealership",
      "https://twitter.com/outboarddealer",
    ],
    department: [
      {
        "@type": "AutoPartsStore",
        name: "Parts Department",
        telephone: "+1-931-243-4555",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
      },
      {
        "@type": "AutoRepair",
        name: "Service Department",
        telephone: "+1-931-243-4555",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
      },
    ],
    paymentAccepted: [
      "Cash",
      "Credit Card",
      "Debit Card",
      "Check",
      "Financing",
    ],
    currenciesAccepted: "USD",
    priceRange: "$$",
    areaServed: [
      {
        "@type": "Country",
        name: "United States",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Authorized Outboard Motors Inventory",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Yamaha Outboards - Authorized Dealer",
          itemListElement: {
            "@type": "Product",
            name: "Yamaha Marine Engines",
          },
        },
        {
          "@type": "OfferCatalog",
          name: "Honda Outboards - Authorized Dealer",
          itemListElement: {
            "@type": "Product",
            name: "Honda Marine Engines",
          },
        },
        {
          "@type": "OfferCatalog",
          name: "Mercury Outboards - Authorized Dealer",
          itemListElement: {
            "@type": "Product",
            name: "Mercury Marine Engines",
          },
        },
        {
          "@type": "OfferCatalog",
          name: "Suzuki Outboards - Authorized Dealer",
          itemListElement: {
            "@type": "Product",
            name: "Suzuki Marine Engines",
          },
        },
        {
          "@type": "OfferCatalog",
          name: "Tohatsu Outboards - Authorized Dealer",
          itemListElement: {
            "@type": "Product",
            name: "Tohatsu Marine Engines",
          },
        },
        {
          "@type": "OfferCatalog",
          name: "Freedom Outboards - Authorized Dealer",
          itemListElement: {
            "@type": "Product",
            name: "Freedom Marine Engines",
          },
        },
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://outboardmotorsales.com/inventory?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What brands of outboard motors do you sell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are an authorized dealer for Honda, Yamaha, Mercury, Freedom, Suzuki, and Tohatsu outboard motors. We carry a full range of models from 2.5HP to 350HP.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer financing for outboard motors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer competitive financing options through multiple lenders. We can help you get approved quickly with flexible terms to fit your budget.",
        },
      },
      {
        "@type": "Question",
        name: "Do you service outboard motors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we have a full-service department with certified technicians who can perform maintenance and repairs on all major outboard motor brands.",
        },
      },
      {
        "@type": "Question",
        name: "Do you ship outboard motors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we can arrange shipping for outboard motors throughout the United States. Shipping costs vary based on size and destination. Contact us for a shipping quote.",
        },
      },
    ],
  };
}

export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Outboard Motor Service and Repair",
    provider: {
      "@type": "LocalBusiness",
      name: "Outboard Motors Dealership",
      address: {
        "@type": "PostalAddress",
        streetAddress: "615 West Lake Avenue",
        addressLocality: "Celina",
        addressRegion: "TN",
        postalCode: "38551",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "State",
      name: "Tennessee",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Outboard Motor Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Annual Service",
            description:
              "Complete annual maintenance service for your outboard motor",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Winterization",
            description: "Prepare your outboard motor for winter storage",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Engine Repair",
            description: "Expert diagnosis and repair of outboard motor issues",
          },
        },
      ],
    },
  };
}

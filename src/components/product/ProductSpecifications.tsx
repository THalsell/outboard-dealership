"use client";

import { Product, ProductVariant } from "@/lib/data/products";

interface ProductSpecificationsProps {
  product: Product;
  selectedVariant?: ProductVariant;
}

interface SpecificationSection {
  title: string;
  specs: Record<string, string>;
}

export default function ProductSpecifications({
  product,
  selectedVariant,
}: ProductSpecificationsProps) {
  // Helper function to get spec value with fallbacks
  const getSpec = (keys: string[]): string => {
    for (const key of keys) {
      const value = product.specs?.[key];
      if (value) return value;
    }
    return "";
  };

  // Organize specifications into logical sections
  const sections: SpecificationSection[] = [
    {
      title: "Engine Specifications",
      specs: {
        "Horsepower": product.horsepower > 0 ? `${product.horsepower} HP` : "",
        "Displacement": getSpec(["displacement", "engine.displacement", "engine_displacement"]),
        "Cylinders": getSpec(["cylinders", "engine.cylinders", "engine_cylinders"]),
        "Stroke Type": getSpec(["stroke_type", "engine.stroke_type", "engine_stroke_type", "stroke"]),
        "Engine Type": getSpec(["engine_type", "engine.engine_type", "engine.type"]),
        "Cooling System": getSpec(["cooling", "cooling_system", "engine.cooling", "engine_cooling"]),
        "Ignition": getSpec(["ignition", "ignition_system", "engine.ignition", "engine_ignition"]),
      },
    },
    {
      title: "Physical & Mechanical",
      specs: {
        "Weight": selectedVariant?.weight && selectedVariant.weight > 0 
          ? `${selectedVariant.weight} ${selectedVariant.weightUnit || 'lbs'}` 
          : getSpec(["weight", "weight_lbs", "physical.weight_lbs"]),
        "Shaft Length": selectedVariant?.option1Name?.toLowerCase().includes('shaft') 
          ? selectedVariant.option1Value || ""
          : getSpec(["shaft_length", "physical.shaft_length", "Physical.shaft_length", "shaft"]),
        "Gear Ratio": getSpec(["gear_ratio", "mechanical.gear_ratio", "gear"]),
        "Propeller": getSpec(["propeller", "prop", "mechanical.propeller"]),
        "Tilt Positions": getSpec(["tilt_positions", "tilt", "mechanical.tilt_positions"]),
      },
    },
    {
      title: "Fuel System",
      specs: {
        "Fuel Tank Type": getSpec(["tank_type", "fuel_tank_type", "fuel.tank_type"]),
        "Tank Capacity": getSpec(["tank_capacity", "fuel_capacity", "fuel.tank_capacity"]),
        "Runtime": getSpec(["runtime", "fuel_runtime", "fuel.runtime"]),
        "Fuel Type": getSpec(["fuel_type", "fuel.type", "fuel"]),
      },
    },
    {
      title: "Features & Controls",
      specs: {
        "Throttle Control": getSpec(["throttle_control", "throttle", "features.throttle_control"]),
        "Steering": getSpec(["steering", "steering_type", "features.steering"]),
        "Shift System": getSpec(["shift", "shift_system", "features.shift"]),
        "Starting System": getSpec(["starting", "starting_system", "features.starting"]),
      },
    },
    {
      title: "Compliance & Certifications",
      specs: {
        "EPA Compliance": getSpec(["epa", "epa_compliance", "compliance.epa"]),
        "CARB Rating": getSpec(["carb", "carb_rating", "compliance.carb"]),
        "Emissions": getSpec(["emissions", "emission_standard", "compliance.emissions"]),
      },
    },
    {
      title: "Product Information",
      specs: {
        "Brand": product.brand,
        "Model": product.title,
        "SKU": selectedVariant?.sku || "",
        "Type": product.type,
        "Category": product.powerCategory?.replace("-", " ")?.toUpperCase() || "",
        "Ideal Applications": getSpec(["applications", "ideal_for", "applications.ideal_for", "use_case"]),
      },
    },
  ];

  // Filter out empty sections and specs
  const filteredSections = sections
    .map(section => ({
      ...section,
      specs: Object.entries(section.specs).reduce((acc, [key, value]) => {
        if (value && value.trim() !== "" && value !== "N/A") {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, string>)
    }))
    .filter(section => Object.keys(section.specs).length > 0);

  if (filteredSections.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-6">
          Specifications
        </h2>
        <p className="text-gray-600">Specifications will be available soon.</p>
      </div>
    );
  }

  // Combine all specs into one flat list
  const allSpecs: Record<string, string> = {};
  
  // Add all specs from all sections
  filteredSections.forEach(section => {
    Object.entries(section.specs).forEach(([key, value]) => {
      if (value && value.trim() !== "" && value !== "N/A") {
        allSpecs[key] = value;
      }
    });
  });

  // Add tags as features if they exist
  if (product.tags && product.tags.length > 0) {
    product.tags.forEach((tag, index) => {
      allSpecs[`Feature ${index + 1}`] = tag;
    });
  }

  if (Object.keys(allSpecs).length === 0) {
    return (
      <div className="text-gray-600">
        Specifications will be available soon.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-200">
        {Object.entries(allSpecs).map(([key, value], index) => (
          <div key={index} className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <dt className="font-medium text-gray-900">{key}</dt>
            <dd className="text-gray-700">{value}</dd>
          </div>
        ))}
      </div>
    </div>
  );
}

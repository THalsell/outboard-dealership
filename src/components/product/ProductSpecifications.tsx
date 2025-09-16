"use client";

import { Product, ProductVariant } from "@/lib/data/products";

interface ProductSpecificationsProps {
  product: Product;
  selectedVariant?: ProductVariant;
}


export default function ProductSpecifications({
  product,
  selectedVariant,
}: ProductSpecificationsProps) {
  // Helper function to get spec value with fallbacks

  const getSpecValue = (key: string): string => {
    if (key === 'Horsepower') return product.horsepower > 0 ? `${product.horsepower} HP` : '';
    if (key === 'Brand') return product.brand || '';
    if (key === 'Model') return product.specs?.[key] || product.specs?.[key.toLowerCase()] || product.specs?.[key.replace(/ /g, '_')] || product.specs?.[key.replace(/ /g, '_').toLowerCase()] || '';
    if (key === 'SKU') return selectedVariant?.sku || '';
    if (key === 'Type') return product.type || '';
    if (key === 'Power Category') return product.powerCategory ? product.powerCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') : '';
    if (key === 'Condition') return (product.condition || 'new').charAt(0).toUpperCase() + (product.condition || 'new').slice(1);
    if (key === 'Stock Status') return product.inStock ? 'In Stock' : 'Out of Stock';
    if (key === 'Weight') return selectedVariant?.weight && selectedVariant.weight > 0 ? `${selectedVariant.weight} ${selectedVariant.weightUnit || 'lbs'}` : product.weight && product.weight > 0 ? `${product.weight} lbs` : product.specs?.['Weight'] || product.specs?.['weight'] || product.specs?.['weight_lbs'] || '';
    if (key === 'Shaft Length') {
      if (product.shaftLength) return product.shaftLength;
      if (selectedVariant && selectedVariant.option1Name && selectedVariant.option1Name.toLowerCase().includes('shaft')) {
        return selectedVariant.option1Value || '';
      }
      return product.specs?.['Shaft Length'] || product.specs?.['custom.shaft_length'] || product.specs?.['shaft_length'] || product.specs?.['Physical.shaft_length'] || '';
    }
    if (key === 'Recommended Cooling') return product.specs?.['Cooling System'] || product.specs?.['cooling_system'] || '';
    if (key === 'Starting Method') return product.specs?.['Starting System'] || product.specs?.['starting_system'] || '';
    if (key === 'Fuel Induction') return product.specs?.['Fuel Induction System'] || product.specs?.['fuel_induction_system'] || '';
    if (key === 'Lubrication') return product.specs?.['Lubrication System'] || product.specs?.['lubrication_system'] || '';
    if (key === 'Full Throttle RPM Range') return product.specs?.['Throttle Control'] || product.specs?.['throttle_control'] || '';
    if (key === 'Gear Shift') return product.specs?.['Shift System'] || product.specs?.['shift_system'] || '';
    return product.specs?.[key] || product.specs?.[key.toLowerCase()] || product.specs?.[key.replace(/ /g, '_')] || product.specs?.[key.replace(/ /g, '_').toLowerCase()] || '';
  };

  // Organize specifications to match compare page exactly
  const specCategories = [
    {
      title: 'Basic Information',
      specs: ['Horsepower', 'Brand', 'Model', 'SKU', 'Type', 'Power Category', 'Condition', 'Stock Status']
    },
    {
      title: 'Engine Specifications',
      specs: ['Displacement', 'Engine Type', 'Recommended Cooling', 'Ignition', 'Starting Method', 'Fuel Induction', 'Compression Ratio', 'Bore x Stroke']
    },
    {
      title: 'Physical Dimensions & Weight',
      specs: ['Weight', 'Shaft Length']
    },
    {
      title: 'Performance & Mechanical',
      specs: ['Gear Ratio', 'Propeller', 'Tilt Positions', 'Power Trim & Tilt']
    },
    {
      title: 'Fuel & Lubrication',
      specs: ['Fuel Type', 'Recommended Oil', 'Lubrication']
    },
    {
      title: 'Controls & Features',
      specs: ['Controls', 'Full Throttle RPM Range', 'Steering', 'Gear Shift']
    },
    {
      title: 'Warranty & Service',
      specs: ['Warranty Period', 'Extended Warranty Available']
    }
  ];

  // Combine all specs into one flat list using the same logic as compare page
  const allSpecs: Record<string, string> = {};
  
  // Add all specs from all categories
  specCategories.forEach(category => {
    category.specs.forEach(spec => {
      const value = getSpecValue(spec);
      if (value && value.trim() !== "" && value !== "N/A") {
        allSpecs[spec] = value;
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

  // Flatten all specs from all categories into one list, excluding Stock Status
  const availableSpecs = specCategories.flatMap(category => category.specs).filter(spec => {
    const value = getSpecValue(spec);
    return spec !== 'Stock Status' && value && value.trim() !== "" && value !== "N/A";
  });

  return (
    <div className="p-6">
      {/* Single Specifications Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-deep-blue">Specifications</h2>
      </div>

      {/* Single Specifications Table */}
      <div className="space-y-0">
        {availableSpecs.map((spec, index) => (
          <div key={spec} className={`p-2 flex items-center border-b border-gray-300 last:border-b-0 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
            <span className="text-base font-semibold text-gray-900 flex-1 text-left border-r border-gray-300 pr-2 uppercase">
              {spec}
            </span>
            <span className="text-sm text-gray-900 flex-1 text-left pl-2 font-medium">
              {getSpecValue(spec)}
            </span>
          </div>
        ))}

        {/* Add tags as features */}
        {product.tags && product.tags.length > 0 && product.tags.map((tag, index) => {
          const specIndex = availableSpecs.length + index;
          return (
            <div key={`feature-${index}`} className={`p-2 flex items-center border-b border-gray-300 last:border-b-0 ${specIndex % 2 === 0 ? 'bg-white' : 'bg-gray-200'}`}>
              <span className="text-base font-semibold text-gray-900 flex-1 text-left border-r border-gray-300 pr-2 uppercase">
                Feature {index + 1}
              </span>
              <span className="text-sm text-gray-900 flex-1 text-left pl-2 font-medium">
                {tag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

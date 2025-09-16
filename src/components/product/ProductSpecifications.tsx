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
    if (key === 'Model') return product.title || '';
    if (key === 'SKU') return selectedVariant?.sku || '';
    if (key === 'Type') return product.type || '';
    if (key === 'Power Category') return product.powerCategory ? product.powerCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') : '';
    if (key === 'Condition') return (product.condition || 'new').charAt(0).toUpperCase() + (product.condition || 'new').slice(1);
    if (key === 'Stock Status') return product.inStock ? 'In Stock' : 'Out of Stock';
    if (key === 'Weight') return selectedVariant?.weight && selectedVariant.weight > 0 ? `${selectedVariant.weight} ${selectedVariant.weightUnit || 'lbs'}` : product.specs?.['weight'] || product.specs?.['weight_lbs'] || '';
    if (key === 'Shaft Length') return selectedVariant?.option1Name?.toLowerCase().includes('shaft') ? selectedVariant.option1Value || '' : product.specs?.['shaft_length'] || product.specs?.['Physical.shaft_length'] || '';
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
      specs: ['Displacement', 'Engine Type', 'Cooling System', 'Ignition', 'Starting System', 'Fuel Induction System', 'Compression Ratio', 'Bore x Stroke']
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
      specs: ['Fuel Type', 'Recommended Oil', 'Lubrication System']
    },
    {
      title: 'Controls & Features',
      specs: ['Controls', 'Throttle Control', 'Steering', 'Shift System']
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

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Display specs organized by category like compare page */}
        {specCategories.map((category) => {
          const categorySpecs = category.specs.filter(spec => {
            const value = getSpecValue(spec);
            return value && value.trim() !== "" && value !== "N/A";
          });
          
          if (categorySpecs.length === 0) return null;
          
          return (
            <div key={category.title}>
              <h3 className="text-lg font-bold text-deep-blue mb-3 text-center bg-gray-100 py-2 rounded">
                {category.title}
              </h3>
              <div className="space-y-0">
                {categorySpecs.map((spec, index) => (
                  <div key={spec} className={`py-3 flex items-center border-b border-gray-200 last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <span className="text-base font-medium text-deep-blue flex-1 text-center border-r border-gray-200 pr-4">
                      {spec}
                    </span>
                    <span className="text-base text-gray-700 flex-1 text-center pl-4">
                      {getSpecValue(spec)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        {/* Add tags as features if they exist */}
        {product.tags && product.tags.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-deep-blue mb-3 text-center bg-gray-100 py-2 rounded">
              Additional Features
            </h3>
            <div className="space-y-0">
              {product.tags.map((tag, index) => (
                <div key={index} className={`py-3 flex items-center border-b border-gray-200 last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <span className="text-base font-medium text-deep-blue flex-1 text-center border-r border-gray-200 pr-4">
                    Feature {index + 1}
                  </span>
                  <span className="text-base text-gray-700 flex-1 text-center pl-4">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

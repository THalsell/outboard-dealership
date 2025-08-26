'use client';

import { Product, ProductVariant } from '@/lib/data/products';

interface ProductSpecificationsProps {
  product: Product;
  selectedVariant?: ProductVariant;
}

export default function ProductSpecifications({ product, selectedVariant }: ProductSpecificationsProps) {
  // Combine product specs with variant-specific info
  const specifications = {
    ...product.specs,
    'Horsepower': product.horsepower > 0 ? `${product.horsepower} HP` : 'N/A',
    'Brand': product.brand,
    'Type': product.type,
    'Power Category': product.powerCategory.replace('-', ' ').toUpperCase(),
  };

  // Add variant-specific specs if available
  if (selectedVariant) {
    if (selectedVariant.option1Name && selectedVariant.option1Value) {
      specifications[selectedVariant.option1Name] = selectedVariant.option1Value;
    }
    if (selectedVariant.option2Name && selectedVariant.option2Value) {
      specifications[selectedVariant.option2Name] = selectedVariant.option2Value;
    }
    if (selectedVariant.weight && selectedVariant.weight > 0) {
      specifications['Weight'] = `${selectedVariant.weight} ${selectedVariant.weightUnit}`;
    }
    if (selectedVariant.sku) {
      specifications['SKU'] = selectedVariant.sku;
    }
  }

  const specEntries = Object.entries(specifications).filter(([_, value]) => value && value !== 'N/A');

  if (specEntries.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-6">Specifications</h2>
        <p className="text-gray-600">Specifications will be available soon.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-charcoal mb-6">Specifications</h2>
      
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {specEntries.map(([key, value], index) => (
            <div key={index} className="px-6 py-4 grid grid-cols-2 gap-4">
              <dt className="font-medium text-gray-900">{key}</dt>
              <dd className="text-gray-700">{value}</dd>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 space-y-4">
        {/* Warranty Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Warranty</h4>
          <p className="text-sm text-blue-800">
            All {product.brand} outboard motors come with manufacturer warranty. 
            Contact us for specific warranty details and terms.
          </p>
        </div>

        {/* Shipping Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Shipping</h4>
          <p className="text-sm text-green-800">
            Free shipping on orders over $5,000. Contact us for shipping quotes on smaller orders.
          </p>
        </div>

        {/* Support Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
          <p className="text-sm text-gray-700">
            Our certified technicians provide installation support and ongoing maintenance services.
          </p>
        </div>
      </div>
    </div>
  );
}
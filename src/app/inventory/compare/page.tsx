'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/data/products';
import Image from 'next/image';
import Link from 'next/link';

// Product selection dropdown component
type ProductDropdownProps = {
  products: Product[];
  selectedProduct: Product | null;
  onSelect: (product: Product | null) => void;
  placeholder: string;
};

const ProductDropdown: React.FC<ProductDropdownProps> = ({ products, selectedProduct, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 bg-white border-2 border-gray-500 text-left text-gray-900 hover:bg-gray-50 hover:border-blue-400 transition-all flex justify-between items-center shadow-sm"
      >
        <span className={selectedProduct ? 'text-gray-900 font-medium' : 'text-gray-500'}>
          {selectedProduct ? `${selectedProduct.brand} ${selectedProduct.title} - ${selectedProduct.horsepower}HP` : placeholder}
        </span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-500 shadow-xl z-50 max-h-72 overflow-y-auto">
          <button
            onClick={() => {
              onSelect(null);
              setIsOpen(false);
            }}
            className="w-full p-2 text-left text-gray-500 hover:bg-gray-50 transition-colors border-b border-gray-500"
          >
            {placeholder}
          </button>
          {products.map(product => (
            <button
              key={product.id}
              onClick={() => {
                onSelect(product);
                setIsOpen(false);
              }}
              className="w-full p-2 text-left text-gray-900 hover:bg-blue-50 transition-colors border-b border-gray-500 last:border-b-0"
            >
              <div className="font-semibold text-deep-blue">{product.brand} {product.title}</div>
              <div className="text-sm text-gray-600 mt-1">{product.horsepower}HP • ${product.variants[0]?.price?.toLocaleString()}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>([null, null, null]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const fetchedProducts = await response.json();
          setAllProducts(fetchedProducts.filter((p: Product) => p.published && p.type === 'Outboard Motor'));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const updateProduct = (index: number, product: Product | null) => {
    const newProducts = [...selectedProducts];
    newProducts[index] = product;
    setSelectedProducts(newProducts);
  };

  const getSpecValue = (product: Product, key: string): string => {
    if (key === 'Price') return product.variants[0]?.price ? `$${product.variants[0].price.toLocaleString()}` : '';
    if (key === 'Horsepower') return product.horsepower > 0 ? `${product.horsepower} HP` : '';
    if (key === 'Brand') return product.brand || '';
    if (key === 'Model') return product.title || '';
    if (key === 'SKU') return product.variants[0]?.sku || '';
    if (key === 'Type') return product.type || '';
    if (key === 'Power Category') return product.powerCategory ? product.powerCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') : '';
    if (key === 'Condition') return (product.condition || 'new').charAt(0).toUpperCase() + (product.condition || 'new').slice(1);
    if (key === 'Weight') return product.variants[0]?.weight && product.variants[0].weight > 0 ? `${product.variants[0].weight} ${product.variants[0].weightUnit || 'lbs'}` : product.weight && product.weight > 0 ? `${product.weight} lbs` : product.specs?.['Weight'] || product.specs?.['weight'] || product.specs?.['weight_lbs'] || '';
    if (key === 'Shaft Length') {
      if (product.shaftLength) return product.shaftLength;
      if (product.variants[0]?.option1Name?.toLowerCase().includes('shaft')) {
        return product.variants[0].option1Value || '';
      }
      return product.specs?.['Shaft Length'] || product.specs?.['custom.shaft_length'] || product.specs?.['shaft_length'] || product.specs?.['Physical.shaft_length'] || '';
    }
    if (key === 'Recommended Cooling') return product.specs?.['Cooling System'] || product.specs?.['cooling_system'] || '';
    if (key === 'Starting Method') return product.specs?.['Starting System'] || product.specs?.['starting_system'] || '';
    if (key === 'Fuel Induction') return product.specs?.['Fuel Induction System'] || product.specs?.['fuel_induction_system'] || '';
    if (key === 'Lubrication') return product.specs?.['Lubrication System'] || product.specs?.['lubrication_system'] || '';
    if (key === 'Full Throttle RPM Range') return product.specs?.['Throttle Control'] || product.specs?.['throttle_control'] || '';
    if (key === 'Gear Shift') return product.specs?.['Shift System'] || product.specs?.['shift_system'] || '';
    
    // Try multiple key variations for specs lookup
    return product.specs?.[key] || 
           product.specs?.[key.toLowerCase()] || 
           product.specs?.[key.replace(/ /g, '_')] || 
           product.specs?.[key.replace(/ /g, '_').toLowerCase()] ||
           product.specs?.[key.replace(/\s+/g, '')] ||
           product.specs?.[key.replace(/\s+/g, '').toLowerCase()] ||
           '';
  };

  const specCategories = [
    {
      title: 'Basic Information',
      specs: ['Price', 'Horsepower', 'Brand', 'Model', 'SKU', 'Type', 'Power Category', 'Condition']
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

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6"><div className="text-gray-900 text-center py-16 text-lg">Loading...</div></div>;
  }

  const availableProducts = allProducts.filter(product => 
    !selectedProducts.some(selected => selected?.id === product.id)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Content wrapper */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-[180px] sm:pt-[120px] pb-8 sm:pb-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-deep-blue mb-4">Engine Comparison</h1>
          <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg xl:text-xl 2xl:text-2xl">Select up to 3 engines to compare specifications side-by-side</p>
        </div>

        {/* Product Selection Section - simplified */}
        {selectedProducts.every(product => product === null) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {selectedProducts.map((product, index) => (
              <ProductDropdown
                key={index}
                products={availableProducts}
                selectedProduct={product}
                onSelect={(selectedProduct) => updateProduct(index, selectedProduct)}
                placeholder={`Select Engine ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Floating Motor Images - Mobile */}
        {selectedProducts.some(product => product !== null) && (
          <div className="block lg:hidden mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-md mx-auto">
              {selectedProducts.slice(0, 2).map((product, index) => (
                <div key={index} className="text-center">
                  {product ? (
                    <div>
                      <div className="relative w-40 h-36 mx-auto mb-3">
                        <Image
                          src={product.images[0]?.src || '/placeholder-motor.svg'}
                          alt={product.title}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <Link
                        href={`/inventory/${product.handle}`}
                        className="text-deep-blue hover:text-blue-700 text-sm font-medium underline hover:no-underline transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-4 border border-gray-500 shadow-md">
                      <div className="text-center">
                        <ProductDropdown
                          products={availableProducts}
                          selectedProduct={product}
                          onSelect={(selectedProduct) => updateProduct(index, selectedProduct)}
                          placeholder={`Engine ${index + 1}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Card-Based Comparison - visible only on small screens */}
        {selectedProducts.some(product => product !== null) && (
          <div className="block lg:hidden mb-8">
            <div className="bg-white p-6 shadow-lg border border-gray-500">
              <h2 className="text-2xl font-bold text-deep-blue text-center mb-6">Compare Engines</h2>

              {/* Key Specifications Comparison */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {[
                      'Price',
                      'Horsepower',
                      'Brand',
                      'Model',
                      'Type',
                      'Power Category',
                      'Condition',
                      'Displacement',
                      'Engine Type',
                      'Recommended Cooling',
                      'Starting Method',
                      'Weight',
                      'Shaft Length',
                      'Fuel Induction',
                      'Full Throttle RPM Range',
                      'Gear Shift'
                    ].map((spec, specIndex) => {
                      const hasValues = selectedProducts.slice(0, 2).some(product => product && getSpecValue(product, spec) !== '' && getSpecValue(product, spec) !== '-');
                      if (!hasValues) return null;
                      
                      return (
                        <tr key={spec} className={`${specIndex % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                          <td className="p-3 font-semibold text-gray-900 text-lg border-r border-gray-500 uppercase">
                            {spec}
                          </td>
                          {selectedProducts.slice(0, 2).map((product, index) => (
                            <td key={index} className="p-3 text-left text-gray-900 text-base font-medium border-l border-gray-500">
                              {product ? (getSpecValue(product, spec) || '-') : '-'}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Floating Motor Images - Desktop */}
        {selectedProducts.some(product => product !== null) && (
          <div className="hidden lg:block mb-8">
            <div className="grid grid-cols-3 gap-8 max-w-6xl xl:max-w-7xl 2xl:max-w-full mx-auto">
              {selectedProducts.map((product, index) => (
                <div key={index} className="text-center">
                  {product ? (
                    <div>
                      <div className="relative w-64 h-48 mx-auto mb-4">
                        <Image
                          src={product.images[0]?.src || '/placeholder-motor.svg'}
                          alt={product.title}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                      <Link
                        href={`/inventory/${product.handle}`}
                        className="inline-block text-deep-blue hover:text-blue-700 text-sm font-medium underline hover:no-underline transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-6 border border-gray-500 shadow-md">
                      <div className="text-center">
                        <ProductDropdown
                          products={availableProducts}
                          selectedProduct={product}
                          onSelect={(selectedProduct) => updateProduct(index, selectedProduct)}
                          placeholder={`Select Engine ${index + 1}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Comparison Table - hidden on mobile */}
        {selectedProducts.some(product => product !== null) && (
          <div className="hidden lg:block bg-white border-4 border-slate-600 rounded-lg shadow-2xl overflow-hidden max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
            <div className="bg-deep-blue px-4 py-4 xl:py-5 border-b border-gray-500">
              <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white text-center">Specifications</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-500">
                    <th className="text-left p-2 xl:p-3 font-semibold text-gray-900 text-sm xl:text-base min-w-[160px] xl:min-w-[200px] sticky left-0 bg-gray-100 z-10 border-r border-gray-500">
                      
                    </th>
                    {selectedProducts.map((product, index) => (
                      <th key={index} className={`p-2 xl:p-3 text-center min-w-[200px] xl:min-w-[300px] 2xl:min-w-[400px] border-l border-gray-500 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}`}>
                        {product ? (
                          <span className="text-gray-900 font-semibold text-sm xl:text-base">
                            Engine {index + 1}
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    // Flatten all specs from all categories into one list, excluding Stock Status
                    const allSpecs = specCategories.flatMap(category => category.specs).filter(spec => spec !== 'Stock Status');
                    return allSpecs.map((spec) => (
                      <tr key={spec} className="bg-white border-b border-gray-500">
                        <td className="p-2 xl:p-3 font-semibold text-gray-900 text-base xl:text-lg sticky left-0 bg-gray-100 z-10 border-b border-r border-gray-400 uppercase">
                          {spec}
                        </td>
                        {selectedProducts.map((product, index) => (
                          <td key={index} className={`p-2 xl:p-3 text-left text-gray-900 text-sm xl:text-base font-medium border-l border-gray-500 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}`}>
                            {product ? (getSpecValue(product, spec) || '-') : '-'}
                          </td>
                        ))}
                      </tr>
                    ));
                  })()}
                  
                  {/* Features from tags */}
                  {selectedProducts.some(p => p?.tags && p.tags.length > 0) && (
                    <>
                      {(() => {
                        const maxTags = Math.max(...selectedProducts.map(p => p?.tags?.length || 0));
                        return Array.from({ length: maxTags }, (_, i) => (
                          <tr key={`feature-${i}`} className="bg-white border-b border-gray-500">
                            <td className="p-2 xl:p-3 font-semibold text-gray-900 text-base xl:text-lg sticky left-0 bg-white z-10 border-r border-gray-500 uppercase">
                              Feature {i + 1}
                            </td>
                            {selectedProducts.map((product, index) => (
                              <td key={index} className={`p-2 xl:p-3 text-left text-gray-900 text-sm xl:text-base font-medium border-l border-gray-500 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}`}>
                                {product?.tags?.[i] || '-'}
                              </td>
                            ))}
                          </tr>
                        ));
                      })()}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-12 gap-8 sm:gap-12">
          <button
            onClick={() => window.print()}
            className="text-deep-blue hover:text-blue-700 font-semibold transition-colors text-lg"
          >
            Print Comparison
          </button>
          <button
            onClick={() => setSelectedProducts([null, null, null])}
            className="text-deep-blue hover:text-blue-700 font-semibold transition-colors text-lg"
          >
            Clear All
          </button>
          <Link
            href="/inventory"
            className="text-deep-blue hover:text-blue-700 font-semibold transition-colors text-lg"
          >
            ← Back to Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
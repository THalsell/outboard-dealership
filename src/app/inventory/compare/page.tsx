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
        className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg text-left text-gray-800 hover:bg-gray-50 hover:border-blue-400 transition-all flex justify-between items-center shadow-sm"
      >
        <span className={selectedProduct ? 'text-gray-800 font-medium' : 'text-gray-500'}>
          {selectedProduct ? `${selectedProduct.brand} ${selectedProduct.title} - ${selectedProduct.horsepower}HP` : placeholder}
        </span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl z-50 max-h-72 overflow-y-auto">
          <button
            onClick={() => {
              onSelect(null);
              setIsOpen(false);
            }}
            className="w-full p-4 text-left text-gray-500 hover:bg-gray-50 transition-colors border-b border-gray-200"
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
              className="w-full p-4 text-left text-gray-800 hover:bg-blue-50 transition-colors border-b border-gray-200 last:border-b-0"
            >
              <div className="font-semibold text-gray-900">{product.brand} {product.title}</div>
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
    if (key === 'Horsepower') return product.horsepower > 0 ? `${product.horsepower} HP` : '';
    if (key === 'Brand') return product.brand || '';
    if (key === 'Model') return product.title || '';
    if (key === 'SKU') return product.variants[0]?.sku || '';
    if (key === 'Type') return product.type || '';
    if (key === 'Power Category') return product.powerCategory ? product.powerCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') : '';
    if (key === 'Condition') return (product.condition || 'new').charAt(0).toUpperCase() + (product.condition || 'new').slice(1);
    if (key === 'Stock Status') return product.inStock ? 'In Stock' : 'Out of Stock';
    if (key === 'Weight') return product.variants[0]?.weight && product.variants[0].weight > 0 ? `${product.variants[0].weight} ${product.variants[0].weightUnit || 'lbs'}` : product.specs?.['Weight'] || product.specs?.['weight'] || product.specs?.['weight_lbs'] || '';
    if (key === 'Shaft Length') return product.variants[0]?.option1Name?.toLowerCase().includes('shaft') ? product.variants[0].option1Value || '' : product.specs?.['Shaft Length'] || product.specs?.['shaft_length'] || product.specs?.['Physical.shaft_length'] || '';
    
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

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6"><div className="text-gray-800 text-center py-16 text-lg">Loading...</div></div>;
  }

  const availableProducts = allProducts.filter(product => 
    !selectedProducts.some(selected => selected?.id === product.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Engine Comparison</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">Select up to 3 engines to compare specifications side-by-side</p>
        </div>

        {/* Product Selection Section - responsive */}
        {selectedProducts.every(product => product === null) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {selectedProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg p-6 sm:p-8 shadow-lg border border-gray-200">
                <div className="text-center py-8 sm:py-12">
                  <ProductDropdown
                    products={availableProducts}
                    selectedProduct={product}
                    onSelect={(selectedProduct) => updateProduct(index, selectedProduct)}
                    placeholder={`Select Engine ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Card-Based Comparison - visible only on small screens */}
        {selectedProducts.some(product => product !== null) && (
          <div className="block lg:hidden mb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Compare Engines</h2>
              
              {/* Mobile Product Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {selectedProducts.slice(0, 2).map((product, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    {product ? (
                      <div className="text-center">
                        <div className="relative w-24 h-20 mx-auto mb-3">
                          <Image
                            src={product.images[0]?.src || '/placeholder-motor.svg'}
                            alt={product.title}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 text-base mb-1">{product.brand}</h3>
                        <p className="text-gray-700 text-sm mb-1">{product.title}</p>
                        <p className="text-gray-600 text-sm mb-1">{product.horsepower}HP</p>
                        <p className="text-blue-600 font-bold text-lg mb-2">
                          ${product.variants[0]?.price?.toLocaleString() || 'N/A'}
                        </p>
                        <Link
                          href={`/inventory/${product.handle}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium underline hover:no-underline transition-colors"
                        >
                          View Details →
                        </Link>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ProductDropdown
                          products={availableProducts}
                          selectedProduct={product}
                          onSelect={(selectedProduct) => updateProduct(index, selectedProduct)}
                          placeholder={`Engine ${index + 1}`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Specifications Comparison */}
              <div className="space-y-4">
                {/* Key specs only for mobile */}
                {[
                  'Horsepower',
                  'Brand', 
                  'Model',
                  'Type',
                  'Power Category',
                  'Condition',
                  'Stock Status',
                  'Displacement',
                  'Engine Type',
                  'Weight',
                  'Shaft Length'
                ].map(spec => {
                  const hasValues = selectedProducts.slice(0, 2).some(product => product && getSpecValue(product, spec) !== '' && getSpecValue(product, spec) !== '-');
                  if (!hasValues) return null;
                  
                  return (
                    <div key={spec} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="text-blue-700 font-bold text-base mb-3 text-center">{spec}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProducts.slice(0, 2).map((product, index) => (
                          <div key={index} className="text-center">
                            <span className="text-gray-800 text-base font-medium">
                              {product ? (getSpecValue(product, spec) || '-') : '-'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Comparison Table - hidden on mobile */}
        {selectedProducts.some(product => product !== null) && (
          <div className="hidden lg:block bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
              <h2 className="text-2xl font-bold text-white text-center">Detailed Specifications</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold text-gray-800 text-base min-w-[200px] sticky left-0 bg-gray-100 z-10 border-b-2 border-gray-300">
                      
                    </th>
                    {selectedProducts.map((product, index) => (
                      <th key={index} className="p-4 text-center min-w-[250px]">
                        {product ? (
                          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                            <div className="relative w-32 h-24 mx-auto mb-3">
                              <Image
                                src={product.images[0]?.src || '/placeholder-motor.svg'}
                                alt={product.title}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">{product.brand} {product.title}</h3>
                            <p className="text-gray-600 text-lg mb-2">{product.horsepower}HP</p>
                            <p className="text-blue-600 font-bold text-xl">
                              ${product.variants[0]?.price?.toLocaleString() || 'N/A'}
                            </p>
                            <Link
                              href={`/inventory/${product.handle}`}
                              className="inline-block mt-3 text-blue-600 hover:text-blue-700 text-base font-medium underline hover:no-underline transition-colors"
                            >
                              View Details →
                            </Link>
                          </div>
                        ) : (
                          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
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
                      </th>
                    ))}
                  </tr>
                  <tr className="bg-gray-100">
                    <th className="text-left p-4 font-semibold text-gray-800 text-base min-w-[200px] sticky left-0 bg-gray-100 z-10 border-b-2 border-gray-300">
                      
                    </th>
                    {selectedProducts.map((product, index) => (
                      <th key={index} className="p-4 text-center font-semibold text-gray-800 text-base min-w-[200px]">
                        
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specCategories.map((category) => (
                    <React.Fragment key={category.title}>
                      <tr className="bg-blue-50">
                        <td colSpan={4} className="p-5 font-bold text-gray-900 text-xl text-center border-y-2 border-blue-200">
                          {category.title}
                        </td>
                      </tr>
                      {category.specs.map((spec, specIndex) => (
                        <tr key={spec} className={`${specIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                          <td className="p-4 font-semibold text-gray-700 text-base sticky left-0 bg-inherit z-10 border-r border-gray-200">
                            {spec}
                          </td>
                          {selectedProducts.map((product, index) => (
                            <td key={index} className="p-4 text-center text-gray-800 text-base font-medium">
                              {product ? (getSpecValue(product, spec) || '-') : '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  
                  {/* Features from tags */}
                  {selectedProducts.some(p => p?.tags && p.tags.length > 0) && (
                    <React.Fragment>
                      <tr className="bg-blue-50">
                        <td colSpan={4} className="p-5 font-bold text-gray-900 text-xl text-center border-y-2 border-blue-200">
                          Additional Features
                        </td>
                      </tr>
                      {(() => {
                        const maxTags = Math.max(...selectedProducts.map(p => p?.tags?.length || 0));
                        return Array.from({ length: maxTags }, (_, i) => (
                          <tr key={`feature-${i}`} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                            <td className="p-4 font-semibold text-gray-700 text-base sticky left-0 bg-inherit z-10 border-r border-gray-200">
                              Feature {i + 1}
                            </td>
                            {selectedProducts.map((product, index) => (
                              <td key={index} className="p-4 text-center text-gray-800 text-base font-medium">
                                {product?.tags?.[i] || '-'}
                              </td>
                            ))}
                          </tr>
                        ));
                      })()}
                    </React.Fragment>
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
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors text-lg"
          >
            Print Comparison
          </button>
          <button
            onClick={() => setSelectedProducts([null, null, null])}
            className="text-red-600 hover:text-red-700 font-semibold transition-colors text-lg"
          >
            Clear All
          </button>
          <Link 
            href="/inventory"
            className="text-gray-700 hover:text-gray-900 font-semibold transition-colors text-lg"
          >
            ← Back to Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
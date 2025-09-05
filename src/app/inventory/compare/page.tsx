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
        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-left text-white hover:bg-slate-600 transition-colors flex justify-between items-center"
      >
        <span className={selectedProduct ? 'text-white' : 'text-gray-400'}>
          {selectedProduct ? `${selectedProduct.brand} ${selectedProduct.title} - ${selectedProduct.horsepower}HP` : placeholder}
        </span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-700 border border-slate-600 rounded-lg shadow-2xl z-50 max-h-60 overflow-y-auto">
          <button
            onClick={() => {
              onSelect(null);
              setIsOpen(false);
            }}
            className="w-full p-3 text-left text-gray-400 hover:bg-slate-600 transition-colors border-b border-slate-600"
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
              className="w-full p-3 text-left text-white hover:bg-slate-600 transition-colors border-b border-slate-600 last:border-b-0"
            >
              <div className="font-medium">{product.brand} {product.title}</div>
              <div className="text-sm text-gray-300">{product.horsepower}HP • ${product.variants[0]?.price?.toLocaleString()}</div>
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
    if (key === 'Horsepower') return product.horsepower > 0 ? `${product.horsepower} HP` : '-';
    if (key === 'Brand') return product.brand || '-';
    if (key === 'Model') return product.title || '-';
    if (key === 'SKU') return product.variants[0]?.sku || '-';
    if (key === 'Type') return product.type || '-';
    if (key === 'Power Category') return product.powerCategory ? product.powerCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') : '-';
    if (key === 'Condition') return (product.condition || 'new').charAt(0).toUpperCase() + (product.condition || 'new').slice(1);
    if (key === 'Stock Status') return product.inStock ? 'In Stock' : 'Out of Stock';
    if (key === 'Weight') return product.variants[0]?.weight && product.variants[0].weight > 0 ? `${product.variants[0].weight} ${product.variants[0].weightUnit || 'lbs'}` : product.specs?.['weight'] || product.specs?.['weight_lbs'] || '-';
    if (key === 'Shaft Length') return product.variants[0]?.option1Name?.toLowerCase().includes('shaft') ? product.variants[0].option1Value || '-' : product.specs?.['shaft_length'] || product.specs?.['Physical.shaft_length'] || '-';
    return product.specs?.[key] || product.specs?.[key.toLowerCase()] || product.specs?.[key.replace(/ /g, '_')] || product.specs?.[key.replace(/ /g, '_').toLowerCase()] || '-';
  };

  const specCategories = [
    {
      title: 'Basic Information',
      specs: ['Horsepower', 'Brand', 'Model', 'SKU', 'Type', 'Power Category', 'Condition', 'Stock Status']
    },
    {
      title: 'Engine Specifications',
      specs: ['Displacement', 'Cylinders', 'Stroke Type', 'Engine Type', 'Cooling System', 'Ignition', 'Starting System', 'Fuel Induction System', 'Compression Ratio', 'Bore x Stroke']
    },
    {
      title: 'Physical Dimensions & Weight',
      specs: ['Weight', 'Shaft Length', 'Width (W)']
    },
    {
      title: 'Performance & Mechanical',
      specs: ['Gear Ratio', 'Propeller', 'Tilt Positions', 'Power Trim & Tilt']
    },
    {
      title: 'Fuel & Lubrication',
      specs: ['Fuel Tank Type', 'Fuel Type', 'Recommended Oil', 'Lubrication System']
    },
    {
      title: 'Controls & Features',
      specs: ['Throttle Control', 'Steering', 'Shift System', 'Control Type', 'Steering Type']
    },
    {
      title: 'Warranty & Service',
      specs: ['Warranty Period', 'Extended Warranty Available', 'Service Intervals']
    }
  ];

  if (loading) {
    return <div className="min-h-screen bg-slate-800 p-6"><div className="text-white text-center py-16">Loading...</div></div>;
  }

  const availableProducts = allProducts.filter(product => 
    !selectedProducts.some(selected => selected?.id === product.id)
  );

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Engine Comparison</h1>
          <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">Select up to 3 engines to compare specifications side-by-side</p>
        </div>

        {/* Product Selection Section - responsive */}
        {selectedProducts.every(product => product === null) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {selectedProducts.map((product, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-4 sm:p-6">
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
            <div className="bg-slate-700 rounded-lg p-4">
              <h2 className="text-xl font-bold text-white text-center mb-6">Compare Engines</h2>
              
              {/* Mobile Product Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {selectedProducts.slice(0, 2).map((product, index) => (
                  <div key={index} className="bg-slate-600 rounded-lg p-4">
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
                        <h3 className="font-bold text-white text-sm mb-1">{product.brand}</h3>
                        <p className="text-white text-xs mb-1">{product.title}</p>
                        <p className="text-gray-300 text-xs mb-1">{product.horsepower}HP</p>
                        <p className="text-blue-400 font-bold text-sm mb-2">
                          ${product.variants[0]?.price?.toLocaleString() || 'N/A'}
                        </p>
                        <Link
                          href={`/inventory/${product.handle}`}
                          className="text-blue-400 hover:text-blue-300 text-xs underline hover:no-underline transition-colors"
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
                  const hasValues = selectedProducts.slice(0, 2).some(product => product && getSpecValue(product, spec) !== '-');
                  if (!hasValues) return null;
                  
                  return (
                    <div key={spec} className="bg-slate-600 rounded p-3">
                      <h4 className="text-blue-400 font-semibold text-sm mb-2 text-center">{spec}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProducts.slice(0, 2).map((product, index) => (
                          <div key={index} className="text-center">
                            <span className="text-white text-sm">
                              {product ? getSpecValue(product, spec) : '-'}
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
          <div className="hidden lg:block bg-slate-700 rounded-lg overflow-hidden">
            <div className="bg-slate-800 px-6 py-4">
              <h2 className="text-xl font-bold text-white text-center">Detailed Specifications</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="text-left p-4 font-semibold text-white min-w-[200px] sticky left-0 bg-slate-800 z-10">
                      
                    </th>
                    {selectedProducts.map((product, index) => (
                      <th key={index} className="p-4 text-center min-w-[250px]">
                        {product ? (
                          <div className="bg-slate-700 rounded-lg p-4">
                            <div className="relative w-32 h-24 mx-auto mb-3">
                              <Image
                                src={product.images[0]?.src || '/placeholder-motor.svg'}
                                alt={product.title}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                            <h3 className="font-bold text-white text-lg mb-2">{product.brand} {product.title}</h3>
                            <p className="text-gray-300 mb-2">{product.horsepower}HP</p>
                            <p className="text-blue-400 font-bold text-lg">
                              ${product.variants[0]?.price?.toLocaleString() || 'N/A'}
                            </p>
                            <Link
                              href={`/inventory/${product.handle}`}
                              className="inline-block mt-2 text-blue-400 hover:text-blue-300 text-sm underline hover:no-underline transition-colors"
                            >
                              View Details →
                            </Link>
                          </div>
                        ) : (
                          <div className="bg-slate-700 rounded-lg p-6">
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
                  <tr className="bg-slate-800">
                    <th className="text-left p-4 font-semibold text-white min-w-[200px] sticky left-0 bg-slate-800 z-10">
                      
                    </th>
                    {selectedProducts.map((product, index) => (
                      <th key={index} className="p-4 text-center font-semibold text-white min-w-[200px]">
                        
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specCategories.map((category) => (
                    <React.Fragment key={category.title}>
                      <tr className="bg-slate-800">
                        <td colSpan={4} className="p-4 font-bold text-blue-400 text-lg text-center">
                          {category.title}
                        </td>
                      </tr>
                      {category.specs.map((spec, specIndex) => (
                        <tr key={spec} className={`${specIndex % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600'}`}>
                          <td className="p-4 font-medium text-gray-300 sticky left-0 bg-inherit z-10">
                            {spec}
                          </td>
                          {selectedProducts.map((product, index) => (
                            <td key={index} className="p-4 text-center text-white">
                              {product ? getSpecValue(product, spec) : '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  
                  {/* Features from tags */}
                  {selectedProducts.some(p => p?.tags && p.tags.length > 0) && (
                    <React.Fragment>
                      <tr className="bg-slate-800">
                        <td colSpan={4} className="p-4 font-bold text-blue-400 text-lg text-center">
                          Additional Features
                        </td>
                      </tr>
                      {(() => {
                        const maxTags = Math.max(...selectedProducts.map(p => p?.tags?.length || 0));
                        return Array.from({ length: maxTags }, (_, i) => (
                          <tr key={`feature-${i}`} className={`${i % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600'}`}>
                            <td className="p-4 font-medium text-gray-300 sticky left-0 bg-inherit z-10">
                              Feature {i + 1}
                            </td>
                            {selectedProducts.map((product, index) => (
                              <td key={index} className="p-4 text-center text-white">
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
            className="text-white hover:text-gray-300 font-semibold transition-colors"
          >
            Print Comparison
          </button>
          <button
            onClick={() => setSelectedProducts([null, null, null])}
            className="text-white hover:text-gray-300 font-semibold transition-colors"
          >
            Clear All
          </button>
          <Link 
            href="/inventory"
            className="text-white hover:text-gray-300 font-semibold transition-colors"
          >
            ← Back to Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
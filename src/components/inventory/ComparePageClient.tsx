'use client';

import { useState, useEffect } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { Product } from '@/lib/data/products';
import Image from 'next/image';
import Link from 'next/link';

export default function ComparePageClient() {
  const { compareList, removeFromCompare, clearCompare } = useFilter();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showAddMotor, setShowAddMotor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const fetchedProducts = await response.json();
          setAllProducts(fetchedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const motors = compareList.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as Product[];
    setSelectedProducts(motors);
  }, [compareList, allProducts]);

  const availableProducts = allProducts.filter(product => 
    !compareList.includes(product.id) &&
    product.published &&
    product.type === 'Outboard Motor' &&
    (searchQuery === '' || 
     `${product.brand} ${product.title}`.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addMotorToCompare = (product: Product) => {
    if (compareList.length < 4) {
      const event = new CustomEvent('addToCompare', { detail: product.id });
      window.dispatchEvent(event);
      setShowAddMotor(false);
      setSearchQuery('');
    }
  };

  const getSpecificationRows = () => {
    if (selectedProducts.length === 0) return [];

    const specKeys = new Set<string>();
    selectedProducts.forEach(product => {
      Object.keys(product.specs || {}).forEach(key => specKeys.add(key));
    });

    return Array.from(specKeys).sort();
  };

  if (selectedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-light-gray py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-2">Compare Motors</h1>
            <p className="text-gray-600">Select up to 4 motors to compare side-by-side</p>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-xl font-semibold text-charcoal mb-2">No Motors Selected</h2>
            <p className="text-gray-600 mb-6">
              Start by browsing our inventory and adding motors to compare, or search for specific models below.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Link
                href="/inventory"
                className="bg-deep-blue text-white px-6 py-3 rounded-lg hover:bg-teal transition-colors"
              >
                Browse Inventory
              </Link>
              <button
                onClick={() => setShowAddMotor(true)}
                className="border border-deep-blue text-deep-blue px-6 py-3 rounded-lg hover:bg-deep-blue hover:text-white transition-colors"
              >
                Search Motors
              </button>
            </div>
          </div>

          {/* Add Motor Modal */}
          {showAddMotor && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Add Motor to Compare</h3>
                  <button
                    onClick={() => setShowAddMotor(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-4">
                  <input
                    type="text"
                    placeholder="Search motors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-blue mb-4"
                  />
                  
                  <div className="max-h-64 overflow-y-auto">
                    {availableProducts.slice(0, 20).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => addMotorToCompare(product)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
                      >
                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="font-medium">{product.brand} {product.title}</h4>
                          <p className="text-sm text-gray-600">{product.horsepower}HP</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(product.variants[0]?.price || 0).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const specRows = getSpecificationRows();

  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-charcoal mb-2">Compare Motors</h1>
            <p className="text-gray-600">Comparing {selectedProducts.length} motor{selectedProducts.length !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="flex gap-3">
            {selectedProducts.length < 4 && (
              <button
                onClick={() => setShowAddMotor(true)}
                className="border border-deep-blue text-deep-blue px-4 py-2 rounded-lg hover:bg-deep-blue hover:text-white transition-colors text-sm"
              >
                Add Motor
              </button>
            )}
            <button
              onClick={clearCompare}
              className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Motor Headers */}
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 bg-gray-50 font-medium text-gray-700 w-48">Specifications</th>
                  {selectedProducts.map((product) => (
                    <th key={product.id} className="p-4 bg-gray-50 min-w-64">
                      <div className="text-center">
                        <div className="relative w-32 h-24 mx-auto mb-3 bg-gray-200 rounded">
                          <Image
                            src={product.images[0]?.src || '/placeholder-motor.svg'}
                            alt={product.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <h3 className="font-semibold text-charcoal text-lg">{product.brand} {product.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{product.horsepower}HP</p>
                        <div className="text-lg font-bold text-deep-blue">
                          {product.variants[0]?.compareAtPrice && product.variants[0].compareAtPrice > product.variants[0].price && (
                            <span className="line-through text-sm text-gray-500 mr-2">
                              ${product.variants[0].compareAtPrice.toLocaleString()}
                            </span>
                          )}
                          <span>${(product.variants[0]?.price || 0).toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="mt-2 text-red-600 hover:bg-red-50 px-2 py-1 rounded text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Key Specs */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Condition</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {product.status || 'New'}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Fuel Type</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-center capitalize">Gasoline</td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Weight</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-center">{product.specs?.Weight || 'N/A'}</td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Cylinders</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-center">{product.specs?.Cylinders || 'N/A'}</td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Shaft Length</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-center capitalize">
                      {product.variants.find(v => v.option1Name === 'Shaft Length')?.option1Value || 'N/A'}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Warranty</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-center text-sm">Contact for details</td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Stock</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'Available' : 'Out of Stock'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Detailed Specifications */}
                {specRows.map((specKey) => (
                  <tr key={specKey} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">{specKey}</td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="p-4 text-center text-sm">
                        {product.specs?.[specKey] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Features */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50 align-top">Key Features</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-4 align-top">
                      <ul className="text-sm space-y-1 text-left">
                        {product.tags.slice(0, 5).map((tag, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{tag}</span>
                          </li>
                        ))}
                        {product.tags.length > 5 && (
                          <li className="text-gray-500 italic">+{product.tags.length - 5} more</li>
                        )}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Action Buttons */}
                <tr>
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Actions</td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-4">
                      <div className="space-y-2">
                        <Link
                          href={`/inventory/${product.handle}`}
                          className="block bg-deep-blue text-white px-4 py-2 rounded-lg hover:bg-teal transition-colors text-center text-sm"
                        >
                          View Details
                        </Link>
                        <button className="block w-full border border-deep-blue text-deep-blue px-4 py-2 rounded-lg hover:bg-deep-blue hover:text-white transition-colors text-sm">
                          Get Quote
                        </button>
                        {product.inStock && (
                          <button className="block w-full bg-teal text-white px-4 py-2 rounded-lg hover:bg-teal/90 transition-colors text-sm">
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Print/Share Actions */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 text-deep-blue hover:bg-deep-blue hover:text-white px-4 py-2 rounded-lg border border-deep-blue transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Comparison
          </button>
          <Link
            href="/inventory"
            className="text-gray-600 hover:text-deep-blue px-4 py-2 transition-colors"
          >
            ← Back to Inventory
          </Link>
        </div>

        {/* Add Motor Modal */}
        {showAddMotor && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Add Motor to Compare</h3>
                <button
                  onClick={() => setShowAddMotor(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search motors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-blue mb-4"
                />
                
                <div className="max-h-64 overflow-y-auto">
                  {availableProducts.slice(0, 20).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => addMotorToCompare(product)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{product.brand} {product.title}</h4>
                        <p className="text-sm text-gray-600">{product.horsepower}HP</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(product.variants[0]?.price || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
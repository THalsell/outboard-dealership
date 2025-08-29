'use client';

import { useState, useEffect } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { Product } from '@/lib/data/products';
import Image from 'next/image';
import Link from 'next/link';

// Reusable modal component
const AddMotorModal = ({ show, onClose, onAdd, products, searchQuery, setSearchQuery }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Add Motor to Compare</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
        
        <div className="p-4">
          <input
            type="text"
            placeholder="Search motors..."
            className="w-full p-3 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {products.slice(0, 10).map(product => {
              const price = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
              }).format(product.variants[0]?.price || 0);

              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => { onAdd(product); onClose(); }}
                >
                  <div>
                    <div className="font-medium text-charcoal">{product.brand} {product.title}</div>
                    <div className="text-sm text-gray-600">{product.horsepower} HP • {price}</div>
                  </div>
                  <button className="text-deep-blue hover:bg-deep-blue hover:text-white px-4 py-2 rounded-lg border border-deep-blue transition-colors">
                    Add
                  </button>
                </div>
              );
            })}
            {products.length === 0 && (
              <p className="text-gray-600 text-center py-4">No motors found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Status badge component
const StatusBadge = ({ condition, type = 'condition' }) => {
  const getStyle = () => {
    if (type === 'condition') {
      return condition === 'new' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    }
    return condition ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };
  
  const getText = () => {
    if (type === 'condition') return condition || 'New';
    return condition ? 'In Stock' : 'Out of Stock';
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStyle()}`}>
      {getText()}
    </span>
  );
};

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useFilter();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showAddMotor, setShowAddMotor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products and set selected products
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
    (searchQuery === '' || `${product.brand} ${product.title}`.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addMotorToCompare = (product: Product) => {
    if (compareList.length < 4) {
      window.location.href = `/inventory/compare?add=${product.id}`;
    }
  };

  const specCategories = {
    'Engine Specifications': [
      'Engine Type', 'Cylinders', 'Displacement', 'Bore x Stroke', 'Compression Ratio',
      'Fuel Induction System', 'Ignition System', 'Starting System', 'Cooling System',
      'Lubrication System', 'Engine Protection System'
    ],
    'Performance': [
      'Full Throttle RPM Range', 'Max Output', 'Recommended Oil', 'Oil Pan Capacity',
      'Fuel Tank Capacity', 'Fuel Consumption', 'Gear Ratio', 'Propeller'
    ],
    'Electrical': [
      'Alternator Output', 'Battery Charging', 'Engine Management System',
      'Diagnostic System', 'Tachometer Compatible'
    ],
    'Controls & Features': [
      'Control Type', 'Steering Type', 'Trim Method', 'Tilt Method', 'Power Trim & Tilt',
      'Variable Trolling RPM', 'Shallow Water Drive', 'Multi-Function Tiller Handle'
    ],
    'Construction': [
      'Engine Block Material', 'Cylinder Head Material', 'Piston Material',
      'Connecting Rod Material', 'Crankshaft Material', 'Exhaust System'
    ],
    'Dimensions & Weight': [
      'Dry Weight', 'Length (L)', 'Width (W)', 'Height (H)', 'Shaft Length',
      'Transom Height', 'Engine Mount', 'Center of Gravity'
    ],
    'Environmental': [
      'Emission Rating', 'Sound Level', 'Vibration Level', 'Corrosion Protection',
      'Paint System', 'Anodes'
    ],
    'Warranty & Service': [
      'Warranty Period', 'Extended Warranty Available', 'Service Intervals',
      'Recommended Service', 'Parts Availability'
    ]
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>;
  }

  // Empty state
  if (selectedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-charcoal mb-2">Compare Motors</h1>
            <p className="text-gray-600">Select up to 4 motors to compare side-by-side</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h2 className="text-xl font-semibold text-charcoal mb-2">No Motors Selected</h2>
            <p className="text-gray-600 mb-6">
              Start by browsing our inventory and adding motors to compare, or search for specific models below.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Link href="/inventory" className="bg-deep-blue text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                Browse Motors
              </Link>
              <button onClick={() => setShowAddMotor(true)} className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50">
                Search Motors
              </button>
            </div>
          </div>

          <AddMotorModal 
            show={showAddMotor}
            onClose={() => setShowAddMotor(false)}
            onAdd={addMotorToCompare}
            products={availableProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
    );
  }

  // Get all unique specifications
  const allSpecs = new Set<string>();
  selectedProducts.forEach(product => {
    if (product.specs) {
      Object.keys(product.specs).forEach(spec => allSpecs.add(spec));
    }
  });

  // Debug: log what specs are available
  console.log('Available specs:', Array.from(allSpecs));
  console.log('Sample product specs:', selectedProducts[0]?.specs);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-charcoal mb-2">Compare Motors</h1>
            <p className="text-gray-600">Comparing {selectedProducts.length} of 4 motors</p>
          </div>
          <button onClick={clearCompare} className="text-red-600 hover:text-red-700">Clear All</button>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 font-semibold text-charcoal min-w-[200px]">Specification</th>
                  {selectedProducts.map(product => (
                    <th key={product.id} className="p-4 min-w-[250px]">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                        >×</button>
                        <div className="relative w-32 h-24 mx-auto mb-3 bg-gray-200 rounded">
                          <Image
                            src={product.images[0]?.src || '/placeholder-motor.svg'}
                            alt={product.title}
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-charcoal">{product.brand}</div>
                          <div className="text-sm text-gray-600">{product.title}</div>
                          <div className="text-lg font-bold text-deep-blue mt-2">
                            ${product.variants[0]?.price?.toLocaleString() || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                  {selectedProducts.length < 4 && (
                    <th className="p-4 min-w-[250px]">
                      <button
                        onClick={() => setShowAddMotor(true)}
                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                      >
                        <div className="text-gray-400">
                          <div className="text-3xl mb-2">+</div>
                          <div className="text-sm">Add Motor</div>
                        </div>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Basic Info Section */}
                <tr className="border-b bg-gray-50">
                  <td colSpan={selectedProducts.length + 1} className="p-3 font-semibold text-charcoal">Basic Information</td>
                </tr>
                {[
                  { key: 'horsepower', label: 'Horsepower', render: (p) => `${p.horsepower} HP` },
                  { key: 'brand', label: 'Brand', render: (p) => p.brand },
                  { key: 'condition', label: 'Condition', render: (p) => <StatusBadge condition={p.condition} /> },
                  { key: 'inStock', label: 'Stock Status', render: (p) => <StatusBadge condition={p.inStock} type="stock" /> },
                  { key: 'powerCategory', label: 'Power Category', render: (p) => p.powerCategory }
                ].map(({ key, label, render }) => (
                  <tr key={key} className="border-b">
                    <td className="p-4 font-medium text-gray-600">{label}</td>
                    {selectedProducts.map(product => (
                      <td key={`${product.id}-${key}`} className="p-4 text-center">
                        {render(product)}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Specifications by Category */}
                {Object.entries(specCategories).map(([category, specs]) => {
                  const categorySpecs = specs.filter(spec => allSpecs.has(spec));
                  if (categorySpecs.length === 0) return null;
                  
                  return (
                    <React.Fragment key={category}>
                      <tr className="border-b bg-gray-50">
                        <td colSpan={selectedProducts.length + 1} className="p-3 font-semibold text-charcoal">{category}</td>
                      </tr>
                      {categorySpecs.map(spec => (
                        <tr key={spec} className="border-b">
                          <td className="p-4 font-medium text-gray-600">{spec}</td>
                          {selectedProducts.map(product => (
                            <td key={`${product.id}-${spec}`} className="p-4 text-center">
                              {product.specs?.[spec] || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}

                {/* Actions Row */}
                <tr>
                  <td className="p-4 font-medium text-gray-600">Actions</td>
                  {selectedProducts.map(product => (
                    <td key={`${product.id}-action`} className="p-4 text-center">
                      <Link
                        href={`/inventory/${product.handle}`}
                        className="inline-block bg-deep-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
                      >
                        View Details
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 text-deep-blue hover:bg-deep-blue hover:text-white px-4 py-2 rounded-lg border border-deep-blue transition-colors"
          >
            Print Comparison
          </button>
          <Link href="/inventory" className="text-gray-600 hover:text-deep-blue px-4 py-2 transition-colors">
            ← Back to Inventory
          </Link>
        </div>

        <AddMotorModal 
          show={showAddMotor}
          onClose={() => setShowAddMotor(false)}
          onAdd={addMotorToCompare}
          products={availableProducts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </div>
  );
}
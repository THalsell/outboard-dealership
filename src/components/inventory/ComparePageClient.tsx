'use client';

import { useState, useEffect } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { allMotors } from '@/lib/data/motors';
import { Motor } from '@/types/models/motor';
import Image from 'next/image';
import Link from 'next/link';

export default function ComparePageClient() {
  const { compareList, removeFromCompare, clearCompare } = useFilter();
  const [selectedMotors, setSelectedMotors] = useState<Motor[]>([]);
  const [showAddMotor, setShowAddMotor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const motors = compareList.map(id => allMotors.find(m => m.id === id)).filter(Boolean) as Motor[];
    setSelectedMotors(motors);
  }, [compareList]);

  const availableMotors = allMotors.filter(motor => 
    !compareList.includes(motor.id) &&
    (searchQuery === '' || 
     `${motor.brand} ${motor.model}`.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addMotorToCompare = (motor: Motor) => {
    if (compareList.length < 4) {
      const event = new CustomEvent('addToCompare', { detail: motor.id });
      window.dispatchEvent(event);
      setShowAddMotor(false);
      setSearchQuery('');
    }
  };

  const getSpecificationRows = () => {
    if (selectedMotors.length === 0) return [];

    const specKeys = new Set<string>();
    selectedMotors.forEach(motor => {
      Object.keys(motor.specifications || {}).forEach(key => specKeys.add(key));
    });

    return Array.from(specKeys).sort();
  };

  if (selectedMotors.length === 0) {
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
                    {availableMotors.slice(0, 20).map((motor) => (
                      <div
                        key={motor.id}
                        onClick={() => addMotorToCompare(motor)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
                      >
                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="font-medium">{motor.brand} {motor.model}</h4>
                          <p className="text-sm text-gray-600">{motor.year} • {motor.horsepower}HP</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(motor.salePrice || motor.price).toLocaleString()}</p>
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
            <p className="text-gray-600">Comparing {selectedMotors.length} motor{selectedMotors.length !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="flex gap-3">
            {selectedMotors.length < 4 && (
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
                  {selectedMotors.map((motor) => (
                    <th key={motor.id} className="p-4 bg-gray-50 min-w-64">
                      <div className="text-center">
                        <div className="relative w-32 h-24 mx-auto mb-3 bg-gray-200 rounded">
                          <Image
                            src={motor.images[0] || '/api/placeholder/200/150'}
                            alt={`${motor.brand} ${motor.model}`}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <h3 className="font-semibold text-charcoal text-lg">{motor.brand} {motor.model}</h3>
                        <p className="text-sm text-gray-600 mb-2">{motor.year} • {motor.horsepower}HP</p>
                        <div className="text-lg font-bold text-deep-blue">
                          {motor.salePrice && (
                            <span className="line-through text-sm text-gray-500 mr-2">
                              ${motor.price.toLocaleString()}
                            </span>
                          )}
                          <span>${(motor.salePrice || motor.price).toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => removeFromCompare(motor.id)}
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
                  {selectedMotors.map((motor) => (
                    <td key={motor.id} className="p-4 text-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        motor.condition === 'new' ? 'bg-green-100 text-green-800' :
                        motor.condition === 'used' ? 'bg-blue-100 text-blue-800' :
                        motor.condition === 'overstock' ? 'bg-orange-100 text-orange-800' :
                        motor.condition === 'scratch-dent' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {motor.condition === 'scratch-dent' ? 'Scratch & Dent' :
                         motor.condition.charAt(0).toUpperCase() + motor.condition.slice(1)}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Fuel Type</td>
                  {selectedMotors.map((motor) => (
                    <td key={motor.id} className="p-4 text-center capitalize">{motor.fuelType}</td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Weight</td>
                  {selectedMotors.map((motor) => (
                    <td key={motor.id} className="p-4 text-center">{motor.weight} lbs</td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Cylinders</td>
                  {selectedMotors.map((motor) => (
                    <td key={motor.id} className="p-4 text-center">{motor.cylinders || 'N/A'}</td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Shaft Length</td>
                  {selectedMotors.map((motor) => (
                    <td key={motor.id} className="p-4 text-center capitalize">{motor.shaftLength || 'N/A'}</td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Warranty</td>
                  {selectedMotors.map((motor) => (
                    <td key={motor.id} className="p-4 text-center text-sm">{motor.warranty || 'Contact for details'}</td>
                  ))}
                </tr>

                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Stock</td>
                  {selectedMotors.map((motor) => (
                    <td key={motor.id} className="p-4 text-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        motor.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {motor.inStock ? `${motor.stockQuantity} Available` : 'Out of Stock'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Detailed Specifications */}
                {specRows.map((specKey) => (
                  <tr key={specKey} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700 bg-gray-50">{specKey}</td>
                    {selectedMotors.map((motor) => (
                      <td key={motor.id} className="p-4 text-center text-sm">
                        {motor.specifications?.[specKey] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Features */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-700 bg-gray-50 align-top">Key Features</td>
                  {selectedMotors.map((motor) => (
                    <td key={motor.id} className="p-4 align-top">
                      <ul className="text-sm space-y-1 text-left">
                        {motor.features.slice(0, 5).map((feature, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                        {motor.features.length > 5 && (
                          <li className="text-gray-500 italic">+{motor.features.length - 5} more</li>
                        )}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Action Buttons */}
                <tr>
                  <td className="p-4 font-medium text-gray-700 bg-gray-50">Actions</td>
                  {selectedMotors.map((motor) => (
                    <td key={motor.id} className="p-4">
                      <div className="space-y-2">
                        <Link
                          href={`/inventory/${motor.id}`}
                          className="block bg-deep-blue text-white px-4 py-2 rounded-lg hover:bg-teal transition-colors text-center text-sm"
                        >
                          View Details
                        </Link>
                        <button className="block w-full border border-deep-blue text-deep-blue px-4 py-2 rounded-lg hover:bg-deep-blue hover:text-white transition-colors text-sm">
                          Get Quote
                        </button>
                        {motor.inStock && (
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
                  {availableMotors.slice(0, 20).map((motor) => (
                    <div
                      key={motor.id}
                      onClick={() => addMotorToCompare(motor)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{motor.brand} {motor.model}</h4>
                        <p className="text-sm text-gray-600">{motor.year} • {motor.horsepower}HP</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(motor.salePrice || motor.price).toLocaleString()}</p>
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
'use client';

import { useFilter } from '@/contexts/FilterContext';
import { useState } from 'react';

interface FilterSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({ isMobile = false, onClose }: FilterSidebarProps) {
  const { filters, updateFilter, resetFilters } = useFilter();
  const [expandedSections, setExpandedSections] = useState<string[]>(['brand', 'price', 'horsepower']);

  const brands = ['Yamaha', 'Mercury', 'Honda', 'Suzuki', 'Evinrude', 'Johnson', 'Tohatsu'];
  const shaftLengths = ['short', 'long', 'extra-long'];
  const conditions = ['new', 'used', 'certified-preowned'];

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    updateFilter('brands', newBrands);
  };

  const handleShaftLengthToggle = (length: string) => {
    const newLengths = filters.shaftLengths.includes(length)
      ? filters.shaftLengths.filter(l => l !== length)
      : [...filters.shaftLengths, length];
    updateFilter('shaftLengths', newLengths);
  };

  const handleConditionToggle = (condition: string) => {
    const newConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter(c => c !== condition)
      : [...filters.conditions, condition];
    updateFilter('conditions', newConditions);
  };

  return (
    <div className={`${isMobile ? 'h-full overflow-y-auto' : ''} bg-white`}>
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex gap-2">
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear All
          </button>
          {isMobile && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 space-y-6">
        {/* Quick Filters */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm">In Stock Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(e) => updateFilter('onSaleOnly', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm">On Sale</span>
          </label>
        </div>

        {/* Brand Filter */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('brand')}
            className="flex justify-between items-center w-full text-left"
          >
            <h3 className="font-medium">Brand</h3>
            <svg
              className={`w-5 h-5 transition-transform ${expandedSections.includes('brand') ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('brand') && (
            <div className="mt-3 space-y-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex justify-between items-center w-full text-left"
          >
            <h3 className="font-medium">Price Range</h3>
            <svg
              className={`w-5 h-5 transition-transform ${expandedSections.includes('price') ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('price') && (
            <div className="mt-3 space-y-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <span className="self-center">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice === 100000 ? '' : filters.maxPrice}
                  onChange={(e) => updateFilter('maxPrice', Number(e.target.value) || 100000)}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    updateFilter('minPrice', 0);
                    updateFilter('maxPrice', 10000);
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Under $10,000
                </button>
                <button
                  onClick={() => {
                    updateFilter('minPrice', 10000);
                    updateFilter('maxPrice', 25000);
                  }}
                  className="text-sm text-blue-600 hover:underline block"
                >
                  $10,000 - $25,000
                </button>
                <button
                  onClick={() => {
                    updateFilter('minPrice', 25000);
                    updateFilter('maxPrice', 50000);
                  }}
                  className="text-sm text-blue-600 hover:underline block"
                >
                  $25,000 - $50,000
                </button>
                <button
                  onClick={() => {
                    updateFilter('minPrice', 50000);
                    updateFilter('maxPrice', 100000);
                  }}
                  className="text-sm text-blue-600 hover:underline block"
                >
                  Over $50,000
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Horsepower Range */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('horsepower')}
            className="flex justify-between items-center w-full text-left"
          >
            <h3 className="font-medium">Horsepower</h3>
            <svg
              className={`w-5 h-5 transition-transform ${expandedSections.includes('horsepower') ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('horsepower') && (
            <div className="mt-3 space-y-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min HP"
                  value={filters.minHorsepower || ''}
                  onChange={(e) => updateFilter('minHorsepower', Number(e.target.value))}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <span className="self-center">-</span>
                <input
                  type="number"
                  placeholder="Max HP"
                  value={filters.maxHorsepower === 500 ? '' : filters.maxHorsepower}
                  onChange={(e) => updateFilter('maxHorsepower', Number(e.target.value) || 500)}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    updateFilter('minHorsepower', 0);
                    updateFilter('maxHorsepower', 30);
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  2.5 - 30 HP
                </button>
                <button
                  onClick={() => {
                    updateFilter('minHorsepower', 40);
                    updateFilter('maxHorsepower', 100);
                  }}
                  className="text-sm text-blue-600 hover:underline block"
                >
                  40 - 100 HP
                </button>
                <button
                  onClick={() => {
                    updateFilter('minHorsepower', 115);
                    updateFilter('maxHorsepower', 200);
                  }}
                  className="text-sm text-blue-600 hover:underline block"
                >
                  115 - 200 HP
                </button>
                <button
                  onClick={() => {
                    updateFilter('minHorsepower', 225);
                    updateFilter('maxHorsepower', 500);
                  }}
                  className="text-sm text-blue-600 hover:underline block"
                >
                  225+ HP
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Shaft Length */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('shaft')}
            className="flex justify-between items-center w-full text-left"
          >
            <h3 className="font-medium">Shaft Length</h3>
            <svg
              className={`w-5 h-5 transition-transform ${expandedSections.includes('shaft') ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('shaft') && (
            <div className="mt-3 space-y-2">
              {shaftLengths.map((length) => (
                <label key={length} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.shaftLengths.includes(length)}
                    onChange={() => handleShaftLengthToggle(length)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm capitalize">{length.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Condition */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('condition')}
            className="flex justify-between items-center w-full text-left"
          >
            <h3 className="font-medium">Condition</h3>
            <svg
              className={`w-5 h-5 transition-transform ${expandedSections.includes('condition') ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('condition') && (
            <div className="mt-3 space-y-2">
              {conditions.map((condition) => (
                <label key={condition} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.conditions.includes(condition)}
                    onChange={() => handleConditionToggle(condition)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm capitalize">{condition.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
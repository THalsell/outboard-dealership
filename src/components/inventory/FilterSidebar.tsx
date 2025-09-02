'use client';

import { useFilter } from '@/contexts/FilterContext';
import { useState } from 'react';

interface FilterSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
  availableBrands?: string[];
  priceRange?: { min: number; max: number };
  horsepowerRange?: { min: number; max: number };
  availableShaftLengths?: string[];
}

export default function FilterSidebar({ 
  isMobile = false, 
  onClose,
  availableBrands = ['Honda', 'Yamaha', 'Mercury', 'Freedom', 'Suzuki', 'Tohatsu'],
  priceRange = { min: 0, max: 100000 },
  horsepowerRange = { min: 0, max: 500 },
  availableShaftLengths = ['15"', '20"', '25"']
}: FilterSidebarProps) {
  const { filters, updateFilter, resetFilters } = useFilter();
  const [expandedSections, setExpandedSections] = useState<string[]>(['availability', 'brand', 'condition', 'shaft', 'drive', 'fuel', 'tank', 'starting', 'steering', 'trimtilt']);

  const brands = availableBrands;
  const shaftLengths = availableShaftLengths;
  const conditions = ['new', 'used', 'overstock', 'scratch-dent'];
  const driveTypes = ['jet', 'prop'];
  const fuelDeliveryTypes = ['carburetor', 'efi', 'propane'];
  const fuelTankTypes = ['internal', 'external'];
  const startingTypes = ['manual', 'electric'];
  const steeringTypes = ['remote', 'tiller'];
  const trimTiltTypes = ['manual', 'power-tilt', 'power-trim-tilt'];


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


  const handleDriveTypeToggle = (driveType: string) => {
    const newDriveTypes = filters.driveTypes.includes(driveType)
      ? filters.driveTypes.filter(d => d !== driveType)
      : [...filters.driveTypes, driveType];
    updateFilter('driveTypes', newDriveTypes);
  };

  const handleFuelDeliveryToggle = (fuelType: string) => {
    const newFuelDelivery = filters.fuelDelivery.includes(fuelType)
      ? filters.fuelDelivery.filter(f => f !== fuelType)
      : [...filters.fuelDelivery, fuelType];
    updateFilter('fuelDelivery', newFuelDelivery);
  };

  const handleFuelTankToggle = (tankType: string) => {
    const newFuelTank = filters.fuelTank.includes(tankType)
      ? filters.fuelTank.filter(t => t !== tankType)
      : [...filters.fuelTank, tankType];
    updateFilter('fuelTank', newFuelTank);
  };

  const handleStartingToggle = (startType: string) => {
    const newStarting = filters.starting.includes(startType)
      ? filters.starting.filter(s => s !== startType)
      : [...filters.starting, startType];
    updateFilter('starting', newStarting);
  };

  const handleSteeringToggle = (steeringType: string) => {
    const newSteering = filters.steering.includes(steeringType)
      ? filters.steering.filter(s => s !== steeringType)
      : [...filters.steering, steeringType];
    updateFilter('steering', newSteering);
  };

  const handleTrimTiltToggle = (trimTiltType: string) => {
    const newTrimTilt = filters.trimTilt.includes(trimTiltType)
      ? filters.trimTilt.filter(t => t !== trimTiltType)
      : [...filters.trimTilt, trimTiltType];
    updateFilter('trimTilt', newTrimTilt);
  };

  return (
    <div className={`${isMobile ? 'h-full overflow-y-auto bg-white' : ''}`}>
      {/* Header */}
      <div className="pb-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-charcoal uppercase tracking-wide">Filter By</h2>
        <div className="flex gap-2">
          <button
            onClick={resetFilters}
            className="text-sm text-deep-blue hover:text-deep-blue/80 font-medium"
          >
            Clear All
          </button>
          {isMobile && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        </div>
      </div>

      <div className="space-y-0">
        {/* Availability */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('availability')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Availability</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('availability') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('availability') && (
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                  className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                />
                <span className="text-sm text-gray-700">In Stock Only</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.onSaleOnly}
                  onChange={(e) => updateFilter('onSaleOnly', e.target.checked)}
                  className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                />
                <span className="text-sm text-gray-700">On Sale</span>
              </label>
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('brand')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Brand</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('brand') ? 'rotate-180' : ''}`} 
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
                <label key={brand} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Price</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('price') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('price') && (
            <div className="mt-3 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:border-deep-blue focus:ring-1 focus:ring-deep-blue"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice === priceRange.max ? '' : filters.maxPrice}
                    onChange={(e) => updateFilter('maxPrice', Number(e.target.value) || priceRange.max)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:border-deep-blue focus:ring-1 focus:ring-deep-blue"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    updateFilter('minPrice', 0);
                    updateFilter('maxPrice', 10000);
                  }}
                  className="block w-full text-left text-sm text-gray-600 hover:text-deep-blue py-1"
                >
                  Under $10,000
                </button>
                <button
                  onClick={() => {
                    updateFilter('minPrice', 10000);
                    updateFilter('maxPrice', 25000);
                  }}
                  className="block w-full text-left text-sm text-gray-600 hover:text-deep-blue py-1"
                >
                  $10,000 - $25,000
                </button>
                <button
                  onClick={() => {
                    updateFilter('minPrice', 25000);
                    updateFilter('maxPrice', 50000);
                  }}
                  className="block w-full text-left text-sm text-gray-600 hover:text-deep-blue py-1"
                >
                  $25,000 - $50,000
                </button>
                <button
                  onClick={() => {
                    updateFilter('minPrice', 50000);
                    updateFilter('maxPrice', 100000);
                  }}
                  className="block w-full text-left text-sm text-gray-600 hover:text-deep-blue py-1"
                >
                  Over $50,000
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Horsepower */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('horsepower')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Horsepower</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('horsepower') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('horsepower') && (
            <div className="mt-3 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min HP"
                  value={filters.minHorsepower || ''}
                  onChange={(e) => updateFilter('minHorsepower', Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded text-sm focus:border-deep-blue focus:ring-1 focus:ring-deep-blue"
                />
                <input
                  type="number"
                  placeholder="Max HP"
                  value={filters.maxHorsepower === horsepowerRange.max ? '' : filters.maxHorsepower}
                  onChange={(e) => updateFilter('maxHorsepower', Number(e.target.value) || horsepowerRange.max)}
                  className="px-3 py-2 border border-gray-300 rounded text-sm focus:border-deep-blue focus:ring-1 focus:ring-deep-blue"
                />
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    updateFilter('minHorsepower', 0);
                    updateFilter('maxHorsepower', 30);
                  }}
                  className="block w-full text-left text-sm text-gray-600 hover:text-deep-blue py-1"
                >
                  2.5 - 30 HP
                </button>
                <button
                  onClick={() => {
                    updateFilter('minHorsepower', 40);
                    updateFilter('maxHorsepower', 100);
                  }}
                  className="block w-full text-left text-sm text-gray-600 hover:text-deep-blue py-1"
                >
                  40 - 100 HP
                </button>
                <button
                  onClick={() => {
                    updateFilter('minHorsepower', 115);
                    updateFilter('maxHorsepower', 200);
                  }}
                  className="block w-full text-left text-sm text-gray-600 hover:text-deep-blue py-1"
                >
                  115 - 200 HP
                </button>
                <button
                  onClick={() => {
                    updateFilter('minHorsepower', 225);
                    updateFilter('maxHorsepower', 500);
                  }}
                  className="block w-full text-left text-sm text-gray-600 hover:text-deep-blue py-1"
                >
                  225+ HP
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Condition */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('condition')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Condition</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('condition') ? 'rotate-180' : ''}`} 
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
                <label key={condition} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.conditions.includes(condition)}
                    onChange={() => handleConditionToggle(condition)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {condition === 'scratch-dent' ? 'Scratch & Dent' :
                     condition === 'overstock' ? 'Overstock' :
                     condition.charAt(0).toUpperCase() + condition.slice(1)}
                  </span>
                  {condition === 'new' && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">New</span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Shaft Length */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('shaft')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Shaft Length</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('shaft') ? 'rotate-180' : ''}`} 
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
                <label key={length} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.shaftLengths.includes(length)}
                    onChange={() => handleShaftLengthToggle(length)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                  />
                  <span className="text-sm text-gray-700">
                    {length === '15"' ? '15" (Short)' :
                     length === '20"' ? '20" (Long)' :
                     length === '25"' ? '25" (Extra Long)' : length}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Drive Type */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('drive')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Drive Type</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('drive') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('drive') && (
            <div className="mt-3 space-y-2">
              {driveTypes.map((driveType) => (
                <label key={driveType} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.driveTypes.includes(driveType)}
                    onChange={() => handleDriveTypeToggle(driveType)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {driveType === 'jet' ? 'Jet Drive' : 'Propeller'}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Fuel Delivery */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('fuel')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Fuel Delivery</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('fuel') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('fuel') && (
            <div className="mt-3 space-y-2">
              {fuelDeliveryTypes.map((fuelType) => (
                <label key={fuelType} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.fuelDelivery.includes(fuelType)}
                    onChange={() => handleFuelDeliveryToggle(fuelType)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {fuelType === 'carburetor' ? 'Carburetor' :
                     fuelType === 'efi' ? 'EFI (Electronic Fuel Injection)' :
                     'Propane'}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Fuel Tank */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('tank')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Fuel Tank</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('tank') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('tank') && (
            <div className="mt-3 space-y-2">
              {fuelTankTypes.map((tankType) => (
                <label key={tankType} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.fuelTank.includes(tankType)}
                    onChange={() => handleFuelTankToggle(tankType)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {tankType === 'internal' ? 'Internal Tank' : 'External Tank'}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Starting Method */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('starting')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Starting Method</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('starting') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('starting') && (
            <div className="mt-3 space-y-2">
              {startingTypes.map((startType) => (
                <label key={startType} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.starting.includes(startType)}
                    onChange={() => handleStartingToggle(startType)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {startType === 'manual' ? 'Manual (Pull Start)' : 'Electric Start'}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Steering */}
        <div className="py-4 border-b border-gray-200">
          <button
            onClick={() => toggleSection('steering')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Steering</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('steering') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('steering') && (
            <div className="mt-3 space-y-2">
              {steeringTypes.map((steeringType) => (
                <label key={steeringType} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.steering.includes(steeringType)}
                    onChange={() => handleSteeringToggle(steeringType)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {steeringType === 'remote' ? 'Remote Steering' : 'Tiller Handle'}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Trim & Tilt */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('trimtilt')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-base font-semibold text-charcoal">Trim & Tilt</h3>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('trimtilt') ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('trimtilt') && (
            <div className="mt-3 space-y-2">
              {trimTiltTypes.map((trimTiltType) => (
                <label key={trimTiltType} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.trimTilt.includes(trimTiltType)}
                    onChange={() => handleTrimTiltToggle(trimTiltType)}
                    className="w-4 h-4 text-deep-blue rounded border-gray-300 focus:ring-deep-blue"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {trimTiltType === 'manual' ? 'Manual Tilt' :
                     trimTiltType === 'power-tilt' ? 'Power Tilt' :
                     'Power Trim & Tilt'}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Footer Buttons */}
      {isMobile && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-deep-blue text-white rounded-lg font-medium hover:bg-deep-blue/90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
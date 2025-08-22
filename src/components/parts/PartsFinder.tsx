'use client';

import { useState } from 'react';
import { allMotors } from '@/lib/data/allMotors';
import { useParts } from '@/contexts/PartsContext';

interface PartsFinderProps {
  onMotorSelect?: (motorId: string) => void;
  compact?: boolean;
}

export default function PartsFinder({ onMotorSelect, compact = false }: PartsFinderProps) {
  const { setSelectedMotorForParts, updateFilter } = useParts();
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const brands = Array.from(new Set(allMotors.map(motor => motor.brand))).sort();
  
  const availableModels = selectedBrand
    ? Array.from(new Set(
        allMotors
          .filter(motor => motor.brand === selectedBrand)
          .map(motor => motor.model)
      )).sort()
    : [];

  const availableYears = selectedBrand && selectedModel
    ? Array.from(new Set(
        allMotors
          .filter(motor => motor.brand === selectedBrand && motor.model === selectedModel)
          .map(motor => motor.year)
      )).sort((a, b) => b - a)
    : [];

  const selectedMotor = allMotors.find(motor => 
    motor.brand === selectedBrand && 
    motor.model === selectedModel && 
    motor.year === parseInt(selectedYear)
  );

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel('');
    setSelectedYear('');
    setSelectedMotorForParts(null);
    updateFilter('compatibleMotorId', undefined);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedYear('');
    setSelectedMotorForParts(null);
    updateFilter('compatibleMotorId', undefined);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    const motor = allMotors.find(m => 
      m.brand === selectedBrand && 
      m.model === selectedModel && 
      m.year === parseInt(year)
    );
    
    if (motor) {
      setSelectedMotorForParts(motor.id);
      updateFilter('compatibleMotorId', motor.id);
      onMotorSelect?.(motor.id);
    }
  };

  const clearSelection = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setSelectedMotorForParts(null);
    updateFilter('compatibleMotorId', undefined);
  };

  if (compact) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="font-medium text-gray-900">Find Parts by Motor</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <select
            value={selectedBrand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Brand</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          {selectedBrand && (
            <select
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Model</option>
              {availableModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          )}

          {selectedBrand && selectedModel && (
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Year</option>
              {availableYears.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          )}

          {selectedMotor && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-blue-900">
                    {selectedMotor.brand} {selectedMotor.model}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {selectedMotor.year} • {selectedMotor.horsepower} HP
                  </p>
                </div>
                <button
                  onClick={clearSelection}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Find Parts by Motor</h2>
          <p className="text-gray-600">Select your motor to see compatible parts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <select
            value={selectedBrand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Brand</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            disabled={!selectedBrand}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="">Select Model</option>
            {availableModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            disabled={!selectedBrand || !selectedModel}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="">Select Year</option>
            {availableYears.map(year => (
              <option key={year} value={year.toString()}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedMotor && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">
                {selectedMotor.brand} {selectedMotor.model}
              </h3>
              <p className="text-blue-700">
                {selectedMotor.year} • {selectedMotor.horsepower} HP • {selectedMotor.fuelType}
              </p>
            </div>
            <button
              onClick={clearSelection}
              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-900">Type:</span>
              <p className="text-blue-700 capitalize">{selectedMotor.type}</p>
            </div>
            <div>
              <span className="font-medium text-blue-900">Cylinders:</span>
              <p className="text-blue-700">{selectedMotor.cylinders || 'N/A'}</p>
            </div>
            <div>
              <span className="font-medium text-blue-900">Displacement:</span>
              <p className="text-blue-700">{selectedMotor.displacement || 'N/A'}cc</p>
            </div>
            <div>
              <span className="font-medium text-blue-900">Weight:</span>
              <p className="text-blue-700">{selectedMotor.weight} lbs</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-200">
            <p className="text-sm text-blue-700">
              ✓ Parts catalog is now filtered to show compatible parts for this motor
            </p>
          </div>
        </div>
      )}

      {!selectedMotor && (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p>Select your motor to find compatible parts</p>
        </div>
      )}
    </div>
  );
}
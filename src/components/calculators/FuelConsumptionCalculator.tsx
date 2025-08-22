'use client';

import { useState } from 'react';
import { FuelConsumptionInputs, FuelConsumptionResult } from '@/types/models/calculator';
import { calculateFuelConsumption } from '@/lib/calculators/utils';

export default function FuelConsumptionCalculator() {
  const [inputs, setInputs] = useState<FuelConsumptionInputs>({
    motorHorsepower: 250,
    boatWeight: 4500,
    boatLength: 24,
    cruisingSpeed: 25,
    fuelType: 'gasoline',
    motorAge: 2,
    propellerPitch: 21,
    loadFactor: 0.75
  });

  const [results, setResults] = useState<FuelConsumptionResult | null>(null);

  const handleCalculate = () => {
    const consumption = calculateFuelConsumption(inputs);
    setResults(consumption);
  };

  const updateInput = (field: keyof FuelConsumptionInputs, value: number | string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResults(null);
  };

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'average': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Fuel Consumption Calculator</h2>
          <p className="text-gray-600">Estimate fuel efficiency and operating costs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Boat & Motor Setup</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motor Horsepower
                </label>
                <input
                  type="number"
                  value={inputs.motorHorsepower}
                  onChange={(e) => updateInput('motorHorsepower', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="5" max="600" step="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motor Age (years)
                </label>
                <input
                  type="number"
                  value={inputs.motorAge}
                  onChange={(e) => updateInput('motorAge', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="0" max="30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boat Weight (lbs)
                </label>
                <input
                  type="number"
                  value={inputs.boatWeight}
                  onChange={(e) => updateInput('boatWeight', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="1000" max="50000" step="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boat Length (ft)
                </label>
                <input
                  type="number"
                  value={inputs.boatLength}
                  onChange={(e) => updateInput('boatLength', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="12" max="60"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cruising Speed (mph)
              </label>
              <input
                type="number"
                value={inputs.cruisingSpeed}
                onChange={(e) => updateInput('cruisingSpeed', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                min="5" max="80" step="1"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Economy (15-20 mph)</span>
                <span>Cruise (25-35 mph)</span>
                <span>Fast (40+ mph)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Propeller Pitch
              </label>
              <input
                type="number"
                value={inputs.propellerPitch}
                onChange={(e) => updateInput('propellerPitch', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                min="8" max="30" step="1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Lower pitch = better acceleration, Higher pitch = better top speed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typical Load ({Math.round(inputs.loadFactor * 100)}% of capacity)
              </label>
              <input
                type="range"
                value={inputs.loadFactor}
                onChange={(e) => updateInput('loadFactor', Number(e.target.value))}
                className="w-full"
                min="0.25" max="1" step="0.05"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Light (25%)</span>
                <span>Typical (75%)</span>
                <span>Full (100%)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'gasoline', label: 'Gasoline' },
                  { value: 'diesel', label: 'Diesel' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateInput('fuelType', value)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      inputs.fuelType === value
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Calculate Fuel Consumption
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Fuel Efficiency Results</h3>

          {results && (
            <>
              {/* Main Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                  <h4 className="text-sm text-orange-600 mb-1">Miles Per Gallon</h4>
                  <div className="text-2xl font-bold text-orange-800">
                    {results.mpg} MPG
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                  <h4 className="text-sm text-blue-600 mb-1">Gallons Per Hour</h4>
                  <div className="text-2xl font-bold text-blue-800">
                    {results.gph} GPH
                  </div>
                </div>
              </div>

              {/* Efficiency Rating */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="text-sm text-gray-600 mb-2">Efficiency Rating</h4>
                <div className={`text-xl font-bold capitalize ${getEfficiencyColor(results.efficiency)}`}>
                  {results.efficiency}
                </div>
                <div className="flex justify-center mt-2">
                  {['poor', 'average', 'good', 'excellent'].map((level, index) => (
                    <div
                      key={level}
                      className={`w-6 h-2 mx-0.5 rounded ${
                        ['poor', 'average', 'good', 'excellent'].indexOf(results.efficiency) >= index
                          ? getEfficiencyColor(results.efficiency).replace('text-', 'bg-')
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Cost Analysis */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Operating Costs</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Cost per hour:</span>
                    <span className="font-medium">${results.costPerHour.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per mile:</span>
                    <span className="font-medium">${results.costPerMile.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated range (100 gal tank):</span>
                    <span className="font-medium">{results.rangeEstimate} miles</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Annual fuel cost (100 hrs):</span>
                    <span>${results.annualFuelCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {results.recommendations.length > 0 && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Efficiency Tips</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Comparison Chart */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Speed vs Efficiency</h4>
                <div className="space-y-2">
                  {[
                    { speed: 15, efficiency: 'High', mpg: results.mpg * 1.4 },
                    { speed: 25, efficiency: 'Good', mpg: results.mpg },
                    { speed: 35, efficiency: 'Fair', mpg: results.mpg * 0.7 },
                    { speed: 45, efficiency: 'Poor', mpg: results.mpg * 0.4 }
                  ].map(({ speed, efficiency, mpg }) => (
                    <div key={speed} className="flex items-center justify-between text-sm">
                      <span>{speed} mph:</span>
                      <div className="flex items-center gap-2">
                        <span>~{Math.round(mpg * 10) / 10} MPG</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          efficiency === 'High' ? 'bg-green-100 text-green-800' :
                          efficiency === 'Good' ? 'bg-blue-100 text-blue-800' :
                          efficiency === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {efficiency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">About This Calculator</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Estimates based on industry averages and formulas</li>
              <li>• Actual consumption varies with conditions</li>
              <li>• Weather, waves, and load affect efficiency</li>
              <li>• Regular maintenance improves fuel economy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
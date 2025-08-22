'use client';

import { useState } from 'react';
import { PerformanceInputs, PerformanceResult } from '@/types/models/calculator';
import { calculatePerformance } from '@/lib/calculators/utils';

export default function PerformanceCalculator() {
  const [inputs, setInputs] = useState<PerformanceInputs>({
    motorHorsepower: 250,
    boatWeight: 4500,
    boatLength: 24,
    boatBeam: 8.5,
    hullType: 'planing',
    propellerDiameter: 15,
    propellerPitch: 21,
    elevation: 0,
    temperature: 75,
    loadFactor: 0.75
  });

  const [results, setResults] = useState<PerformanceResult | null>(null);

  const handleCalculate = () => {
    const performance = calculatePerformance(inputs);
    setResults(performance);
  };

  const updateInput = <K extends keyof PerformanceInputs>(field: K, value: PerformanceInputs[K]) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResults(null);
  };

  const getPowerToWeightColor = (ratio: number) => {
    if (ratio >= 1.0) return 'text-green-600';
    if (ratio >= 0.6) return 'text-blue-600';
    if (ratio >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPowerToWeightRating = (ratio: number) => {
    if (ratio >= 1.0) return 'Excellent';
    if (ratio >= 0.6) return 'Good';
    if (ratio >= 0.4) return 'Adequate';
    return 'Underpowered';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Performance Calculator</h2>
          <p className="text-gray-600">Estimate speed and acceleration performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Boat & Motor Configuration</h3>
          
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min="5" max="600" step="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Boat Weight (lbs)
                </label>
                <input
                  type="number"
                  value={inputs.boatWeight}
                  onChange={(e) => updateInput('boatWeight', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min="1000" max="50000" step="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length (ft)
                </label>
                <input
                  type="number"
                  value={inputs.boatLength}
                  onChange={(e) => updateInput('boatLength', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min="12" max="60" step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beam Width (ft)
                </label>
                <input
                  type="number"
                  value={inputs.boatBeam}
                  onChange={(e) => updateInput('boatBeam', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min="6" max="15" step="0.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hull Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'planing', label: 'Planing' },
                  { value: 'semi-displacement', label: 'Semi-Disp.' },
                  { value: 'displacement', label: 'Displacement' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateInput('hullType', value as PerformanceInputs['hullType'])}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      inputs.hullType === value
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prop Diameter (in)
                </label>
                <input
                  type="number"
                  value={inputs.propellerDiameter}
                  onChange={(e) => updateInput('propellerDiameter', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min="10" max="20" step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prop Pitch (in)
                </label>
                <input
                  type="number"
                  value={inputs.propellerPitch}
                  onChange={(e) => updateInput('propellerPitch', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min="8" max="30" step="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Load Factor ({Math.round(inputs.loadFactor * 100)}% of capacity)
              </label>
              <input
                type="range"
                value={inputs.loadFactor}
                onChange={(e) => updateInput('loadFactor', Number(e.target.value))}
                className="w-full"
                min="0.25" max="1" step="0.05"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Light</span>
                <span>Normal</span>
                <span>Full</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Elevation (ft)
                </label>
                <input
                  type="number"
                  value={inputs.elevation}
                  onChange={(e) => updateInput('elevation', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min="0" max="10000" step="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature (°F)
                </label>
                <input
                  type="number"
                  value={inputs.temperature}
                  onChange={(e) => updateInput('temperature', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min="0" max="120"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Calculate Performance
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Performance Results</h3>

          {results && (
            <>
              {/* Speed Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
                  <h4 className="text-sm text-red-600 mb-1">Top Speed</h4>
                  <div className="text-2xl font-bold text-red-800">
                    {results.topSpeed} mph
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                  <h4 className="text-sm text-blue-600 mb-1">Cruise Speed</h4>
                  <div className="text-2xl font-bold text-blue-800">
                    {results.cruisingSpeed} mph
                  </div>
                </div>
              </div>

              {/* Power to Weight Ratio */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="text-sm text-gray-600 mb-2">Power-to-Weight Ratio</h4>
                <div className={`text-xl font-bold ${getPowerToWeightColor(results.powerToWeightRatio)}`}>
                  {results.powerToWeightRatio} HP/1000lbs
                </div>
                <div className={`text-sm ${getPowerToWeightColor(results.powerToWeightRatio)}`}>
                  {getPowerToWeightRating(results.powerToWeightRatio)}
                </div>
              </div>

              {/* Acceleration */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Acceleration Estimates</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>0-20 mph:</span>
                    <span className="font-medium">{results.acceleration.to20mph}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>0-30 mph:</span>
                    <span className="font-medium">{results.acceleration.to30mph}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time to plane:</span>
                    <span className="font-medium">{results.acceleration.toPlane}s</span>
                  </div>
                </div>
              </div>

              {/* Speed by Hull Type */}
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Speed by Hull Mode</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Displacement:</span>
                    <span className="font-medium">{results.speedRange.displacement} mph</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Semi-displacement:</span>
                    <span className="font-medium">{results.speedRange.semiDisplacement} mph</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Planing:</span>
                    <span className="font-medium">{results.speedRange.planing} mph</span>
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Performance Profile</h4>
                <div className="space-y-2">
                  {[
                    { speed: Math.round(results.cruisingSpeed * 0.5), label: 'Trolling', efficiency: '90%' },
                    { speed: Math.round(results.cruisingSpeed * 0.75), label: 'Economy', efficiency: '85%' },
                    { speed: results.cruisingSpeed, label: 'Cruise', efficiency: '75%' },
                    { speed: Math.round(results.topSpeed * 0.9), label: 'Fast', efficiency: '60%' },
                    { speed: results.topSpeed, label: 'Wide Open', efficiency: '45%' }
                  ].map(({ speed, label, efficiency }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-16">{label}:</span>
                        <span className="font-medium">{speed} mph</span>
                      </div>
                      <span className="text-gray-600">~{efficiency} efficiency</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warnings */}
              {results.warnings.length > 0 && (
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">⚠️ Warnings</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    {results.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {results.recommendations.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">💡 Recommendations</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">About Performance</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Estimates based on theoretical calculations</li>
              <li>• Actual performance varies with conditions</li>
              <li>• Propeller selection greatly affects results</li>
              <li>• Sea state and wind impact real-world speed</li>
              <li>• Weight distribution affects acceleration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
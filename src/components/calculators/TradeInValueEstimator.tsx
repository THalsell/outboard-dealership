'use client';

import { useState } from 'react';
import { TradeInSpecs, TradeInEstimate } from '@/types/models/calculator';
import { calculateTradeInValue } from '@/lib/calculators/utils';

export default function TradeInValueEstimator() {
  const [specs, setSpecs] = useState<TradeInSpecs>({
    brand: 'Yamaha',
    model: 'F200',
    year: 2020,
    horsepower: 200,
    hours: 250,
    condition: 'good',
    maintenance: 'good',
    modifications: false,
    accidents: false,
    saltwater: false,
    location: 'Florida'
  });

  const [results, setResults] = useState<TradeInEstimate | null>(null);

  const handleCalculate = () => {
    const estimate = calculateTradeInValue(specs);
    setResults(estimate);
  };

  const updateSpec = (
    field: keyof TradeInSpecs,
    value: string | number | boolean | undefined
  ) => {
    setSpecs(prev => ({ ...prev, [field]: value }));
    setResults(null);
  };

  const currentYear = new Date().getFullYear();
  const motorAge = currentYear - specs.year;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Trade-In Value Estimator</h2>
          <p className="text-gray-600">Get an estimated value for your current motor</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Motor Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  value={specs.brand}
                  onChange={(e) => updateSpec('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Yamaha">Yamaha</option>
                  <option value="Mercury">Mercury</option>
                  <option value="Honda">Honda</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Evinrude">Evinrude</option>
                  <option value="Johnson">Johnson</option>
                  <option value="Tohatsu">Tohatsu</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  value={specs.model}
                  onChange={(e) => updateSpec('model', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="F200, Verado 250, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="number"
                  value={specs.year}
                  onChange={(e) => updateSpec('year', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="1990" max={currentYear}
                />
                <p className="text-xs text-gray-500 mt-1">{motorAge} years old</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horsepower</label>
                <input
                  type="number"
                  value={specs.horsepower}
                  onChange={(e) => updateSpec('horsepower', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="5" max="600" step="5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hours (if known)</label>
              <input
                type="number"
                value={specs.hours || ''}
                onChange={(e) => updateSpec('hours', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="0" max="5000"
                placeholder="Leave blank if unknown"
              />
              <p className="text-xs text-gray-500 mt-1">
                Average: ~{motorAge * 100} hours for {motorAge} year old motor
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overall Condition</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'excellent', label: 'Excellent', desc: 'Like new' },
                  { value: 'good', label: 'Good', desc: 'Well maintained' },
                  { value: 'fair', label: 'Fair', desc: 'Some wear' },
                  { value: 'poor', label: 'Poor', desc: 'Needs work' }
                ].map(({ value, label, desc }) => (
                  <button
                    key={value}
                    onClick={() => updateSpec('condition', value)}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      specs.condition === value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-medium">{label}</div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance History</label>
              <select
                value={specs.maintenance}
                onChange={(e) => updateSpec('maintenance', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="exceptional">Exceptional - All records, dealer maintained</option>
                <option value="good">Good - Regular maintenance, some records</option>
                <option value="average">Average - Basic maintenance</option>
                <option value="poor">Poor - Minimal maintenance</option>
              </select>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Additional Factors</h4>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={specs.modifications}
                  onChange={(e) => updateSpec('modifications', e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span className="text-sm">Has modifications/aftermarket parts</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={specs.accidents}
                  onChange={(e) => updateSpec('accidents', e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span className="text-sm">Has accident/damage history</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={specs.saltwater}
                  onChange={(e) => updateSpec('saltwater', e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span className="text-sm">Primarily used in saltwater</span>
              </label>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Estimate Trade-In Value
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Value Estimate</h3>

          {results && (
            <>
              {/* Estimated Value */}
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 text-center">
                <h4 className="text-sm text-purple-600 mb-1">Estimated Trade-In Value</h4>
                <div className="text-3xl font-bold text-purple-800 mb-2">
                  ${results.estimatedValue.toLocaleString()}
                </div>
                <p className="text-sm text-purple-600">
                  Range: ${results.confidenceRange.low.toLocaleString()} - ${results.confidenceRange.high.toLocaleString()}
                </p>
              </div>

              {/* Value Factors */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Factors Affecting Value</h4>
                {results.factors.map((factor, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      factor.impact === 'positive' ? 'bg-green-100' :
                      factor.impact === 'negative' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      {factor.impact === 'positive' ? (
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : factor.impact === 'negative' ? (
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{factor.factor}</div>
                      <div className="text-sm text-gray-600">{factor.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Market Conditions */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Current Market Conditions</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-blue-900">Demand</div>
                    <div className="text-blue-700 capitalize">{results.marketConditions.demand}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-900">Inventory</div>
                    <div className="text-blue-700 capitalize">{results.marketConditions.inventory}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-900">Season</div>
                    <div className="text-blue-700 capitalize">{results.marketConditions.seasonality}</div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Recommendations</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Important Notes</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• This is an estimate based on general market data</li>
              <li>• Actual trade-in values may vary significantly</li>
              <li>• Get professional appraisal for precise valuation</li>
              <li>• Market conditions affect real-world prices</li>
              <li>• Consider private sale for potentially higher value</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BoatSpecs, UsageProfile, MotorRecommendation } from '@/types/models/calculator';
import { calculateMotorRecommendation } from '@/lib/calculators/utils';
import { Product } from '@/lib/data/products';

export default function MotorSelectionCalculator() {
  const [step, setStep] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [boatSpecs, setBoatSpecs] = useState<BoatSpecs>({
    length: 20,
    beam: 8,
    weight: 3000,
    passengers: 6,
    boatType: 'bowrider',
    hullType: 'planing',
    transom: 'standard'
  });

  const [usageProfile, setUsageProfile] = useState<UsageProfile>({
    primaryUse: 'recreation',
    waterType: 'freshwater',
    typicalDistance: 10,
    hoursPerWeek: 8,
    maxSpeed: 'moderate',
    loadCapacity: 75
  });

  const [results, setResults] = useState<MotorRecommendation | null>(null);

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

  const handleCalculate = () => {
    const recommendation = calculateMotorRecommendation(boatSpecs, usageProfile, allProducts);
    setResults(recommendation);
    setStep(4);
  };

  const resetCalculator = () => {
    setStep(1);
    setResults(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Motor Selection Calculator</h2>
            <p className="text-gray-600">Find the perfect motor horsepower for your boat</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center mb-6">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                stepNum <= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {stepNum < step ? '✓' : stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-12 h-0.5 transition-colors ${
                  stepNum < step ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Boat Specifications */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Step 1: Boat Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Boat Length (feet)
              </label>
              <input
                type="number"
                value={boatSpecs.length}
                onChange={(e) => setBoatSpecs(prev => ({ ...prev, length: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="10" max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beam Width (feet)
              </label>
              <input
                type="number"
                value={boatSpecs.beam}
                onChange={(e) => setBoatSpecs(prev => ({ ...prev, beam: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="5" max="15" step="0.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dry Weight (lbs)
              </label>
              <input
                type="number"
                value={boatSpecs.weight}
                onChange={(e) => setBoatSpecs(prev => ({ ...prev, weight: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1000" max="20000" step="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typical Passengers
              </label>
              <input
                type="number"
                value={boatSpecs.passengers}
                onChange={(e) => setBoatSpecs(prev => ({ ...prev, passengers: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1" max="20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Boat Type
              </label>
              <select
                value={boatSpecs.boatType}
                onChange={(e) => setBoatSpecs(prev => ({ ...prev, boatType: e.target.value as BoatSpecs['boatType'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pontoon">Pontoon</option>
                <option value="bass">Bass Boat</option>
                <option value="bowrider">Bowrider</option>
                <option value="center-console">Center Console</option>
                <option value="deck-boat">Deck Boat</option>
                <option value="fishing">Fishing Boat</option>
                <option value="runabout">Runabout</option>
                <option value="ski-boat">Ski Boat</option>
                <option value="wakeboard">Wakeboard Boat</option>
                <option value="yacht">Yacht</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hull Type
              </label>
              <select
                value={boatSpecs.hullType}
                onChange={(e) => setBoatSpecs(prev => ({ ...prev, hullType: e.target.value as BoatSpecs['hullType'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="planing">Planing Hull</option>
                <option value="semi-displacement">Semi-Displacement</option>
                <option value="displacement">Displacement Hull</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Usage Profile */}
      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Step 2: How You&apos;ll Use Your Boat</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Use
              </label>
              <select
                value={usageProfile.primaryUse}
                onChange={(e) => setUsageProfile(prev => ({ ...prev, primaryUse: e.target.value as UsageProfile['primaryUse'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fishing">Fishing</option>
                <option value="recreation">Recreation/Family</option>
                <option value="watersports">Water Sports</option>
                <option value="cruising">Cruising</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water Type
              </label>
              <select
                value={usageProfile.waterType}
                onChange={(e) => setUsageProfile(prev => ({ ...prev, waterType: e.target.value as UsageProfile['waterType'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="freshwater">Freshwater</option>
                <option value="saltwater">Saltwater</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typical Trip Distance (miles)
              </label>
              <input
                type="number"
                value={usageProfile.typicalDistance}
                onChange={(e) => setUsageProfile(prev => ({ ...prev, typicalDistance: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1" max="200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Per Week
              </label>
              <input
                type="number"
                value={usageProfile.hoursPerWeek}
                onChange={(e) => setUsageProfile(prev => ({ ...prev, hoursPerWeek: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1" max="40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speed Preference
              </label>
              <select
                value={usageProfile.maxSpeed}
                onChange={(e) => setUsageProfile(prev => ({ ...prev, maxSpeed: e.target.value as UsageProfile['maxSpeed'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="economy">Economy (Fuel Efficient)</option>
                <option value="moderate">Moderate Performance</option>
                <option value="high-performance">High Performance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typical Load Capacity (%)
              </label>
              <input
                type="number"
                value={usageProfile.loadCapacity}
                onChange={(e) => setUsageProfile(prev => ({ ...prev, loadCapacity: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="25" max="100" step="5"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Step 3: Review Your Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Boat Specifications</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Length:</span>
                  <span>{boatSpecs.length} ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight:</span>
                  <span>{boatSpecs.weight.toLocaleString()} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers:</span>
                  <span>{boatSpecs.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="capitalize">{boatSpecs.boatType.replace('-', ' ')}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Usage Profile</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Primary Use:</span>
                  <span className="capitalize">{usageProfile.primaryUse}</span>
                </div>
                <div className="flex justify-between">
                  <span>Water Type:</span>
                  <span className="capitalize">{usageProfile.waterType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trip Distance:</span>
                  <span>{usageProfile.typicalDistance} miles</span>
                </div>
                <div className="flex justify-between">
                  <span>Speed Preference:</span>
                  <span className="capitalize">{usageProfile.maxSpeed.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleCalculate}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Calculate Recommendation
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 4 && results && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Motor Recommendation Results</h3>
          
          {/* Horsepower Recommendation */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="text-center mb-4">
              <h4 className="text-2xl font-bold text-blue-900 mb-2">
                Recommended: {results.recommendedHorsepower} HP
              </h4>
              <p className="text-blue-700">
                Range: {results.minHorsepower} HP - {results.maxHorsepower} HP
              </p>
            </div>
          </div>

          {/* Reasoning */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">How We Calculated This</h4>
            <ul className="space-y-2">
              {results.reasoning.map((reason, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Motor Suggestions */}
          {results.motorSuggestions.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recommended Motors</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.motorSuggestions.map((motor) => (
                  <div key={motor.motorId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-gray-900">
                          {motor.brand} {motor.model}
                        </h5>
                        <p className="text-sm text-gray-600">{motor.horsepower} HP</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${motor.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-gray-500">Match:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 ${i < motor.suitabilityScore / 2 ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <span>Efficiency: ~{motor.efficiency} MPG</span>
                      <span>Score: {motor.suitabilityScore}/10</span>
                    </div>
                    <Link
                      href={`/inventory/${motor.motorId}`}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={resetCalculator}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Start New Calculation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
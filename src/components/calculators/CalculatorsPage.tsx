'use client';

import { useState } from 'react';
import MotorSelectionCalculator from './MotorSelectionCalculator';
import FinancingCalculator from './FinancingCalculator';
import TradeInValueEstimator from './TradeInValueEstimator';
import FuelConsumptionCalculator from './FuelConsumptionCalculator';
import PerformanceCalculator from './PerformanceCalculator';

type CalculatorType = 'motor-selection' | 'financing' | 'trade-in' | 'fuel-consumption' | 'performance';

const calculators = [
  {
    id: 'motor-selection' as CalculatorType,
    name: 'Motor Selection',
    description: 'Find the perfect motor for your boat',
    icon: '🎯',
    category: 'Selection',
    color: 'blue'
  },
  {
    id: 'financing' as CalculatorType,
    name: 'Financing',
    description: 'Calculate monthly payments and loan terms',
    icon: '💳',
    category: 'Financial',
    color: 'green'
  },
  {
    id: 'trade-in' as CalculatorType,
    name: 'Trade-In Value',
    description: 'Estimate your current motor\'s value',
    icon: '🔄',
    category: 'Financial',
    color: 'purple'
  },
  {
    id: 'fuel-consumption' as CalculatorType,
    name: 'Fuel Consumption',
    description: 'Calculate efficiency and operating costs',
    icon: '⛽',
    category: 'Technical',
    color: 'orange'
  },
  {
    id: 'performance' as CalculatorType,
    name: 'Performance',
    description: 'Estimate speed and acceleration',
    icon: '🚀',
    category: 'Technical',
    color: 'red'
  }
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-100',
    button: 'bg-blue-600 hover:bg-blue-700'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    hover: 'hover:bg-green-100',
    button: 'bg-green-600 hover:bg-green-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-100',
    button: 'bg-purple-600 hover:bg-purple-700'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-600',
    hover: 'hover:bg-orange-100',
    button: 'bg-orange-600 hover:bg-orange-700'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    hover: 'hover:bg-red-100',
    button: 'bg-red-600 hover:bg-red-700'
  }
};

export default function CalculatorsPage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType | null>(null);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'motor-selection':
        return <MotorSelectionCalculator />;
      case 'financing':
        return <FinancingCalculator />;
      case 'trade-in':
        return <TradeInValueEstimator />;
      case 'fuel-consumption':
        return <FuelConsumptionCalculator />;
      case 'performance':
        return <PerformanceCalculator />;
      default:
        return null;
    }
  };

  const categories = ['Selection', 'Financial', 'Technical'];

  if (activeCalculator) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <button
                onClick={() => setActiveCalculator(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Calculators
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {calculators.find(c => c.id === activeCalculator)?.name} Calculator
              </h1>
              <div className="w-24" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderCalculator()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Marine Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional tools to help you make informed decisions about your outboard motor purchase, 
            financing, and performance optimization.
          </p>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{category} Tools</h2>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators
                .filter(calc => calc.category === category)
                .map(calculator => {
                  const colors = colorClasses[calculator.color as keyof typeof colorClasses];
                  return (
                    <div
                      key={calculator.id}
                      className={`${colors.bg} ${colors.border} border rounded-xl p-6 ${colors.hover} transition-colors cursor-pointer group`}
                      onClick={() => setActiveCalculator(calculator.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{calculator.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                            {calculator.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {calculator.description}
                          </p>
                          <div className={`inline-flex items-center gap-2 ${colors.text} text-sm font-medium`}>
                            Get Started
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        <div className="bg-white rounded-xl shadow-lg p-8 mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Calculators</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our professional-grade calculators use industry-standard formulas and real market data 
              to provide accurate estimates for your marine needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate</h3>
              <p className="text-gray-600">Based on industry formulas and real market data</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast</h3>
              <p className="text-gray-600">Get instant results with our optimized calculations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-600">Trusted by marine professionals and enthusiasts</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 mt-8 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800 mb-4">
                Our marine experts are here to help you interpret results and make the best decision for your needs.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
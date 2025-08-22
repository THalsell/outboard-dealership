'use client';

import { useState } from 'react';
import { FinancingTerms, FinancingResult } from '@/types/models/calculator';
import { calculateFinancing } from '@/lib/calculators/utils';

export default function FinancingCalculator() {
  const [terms, setTerms] = useState<FinancingTerms>({
    loanAmount: 25000,
    downPayment: 5000,
    termMonths: 60,
    interestRate: 7.5,
    creditScore: 'good',
    tradeInValue: 0
  });

  const [results, setResults] = useState<FinancingResult | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleCalculate = () => {
    const netLoanAmount = terms.loanAmount - terms.downPayment - (terms.tradeInValue || 0);
    const financingResult = calculateFinancing({
      ...terms,
      loanAmount: netLoanAmount
    });
    setResults(financingResult);
  };

  const updateTerm = (field: keyof FinancingTerms, value: number | string) => {
    setTerms(prev => ({ ...prev, [field]: value }));
    setResults(null);
  };

  const creditScoreRates = {
    'excellent': { rate: 5.5, description: '740+' },
    'good': { rate: 7.5, description: '670-739' },
    'fair': { rate: 10.5, description: '580-669' },
    'poor': { rate: 15.0, description: 'Below 580' }
  };

  const netLoanAmount = terms.loanAmount - terms.downPayment - (terms.tradeInValue || 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Financing Calculator</h2>
          <p className="text-gray-600">Calculate monthly payments and loan terms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={terms.loanAmount}
                  onChange={(e) => updateTerm('loanAmount', Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1000" max="200000" step="500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Down Payment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={terms.downPayment}
                  onChange={(e) => updateTerm('downPayment', Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0" max={terms.loanAmount * 0.5} step="500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((terms.downPayment / terms.loanAmount) * 100)}% of purchase price
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trade-In Value (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={terms.tradeInValue || 0}
                  onChange={(e) => updateTerm('tradeInValue', Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0" max="100000" step="500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[36, 60, 84].map((months) => (
                  <button
                    key={months}
                    onClick={() => updateTerm('termMonths', months)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      terms.termMonths === months
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {months} mo
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credit Score
              </label>
              <select
                value={terms.creditScore}
                onChange={(e) => {
                  const score = e.target.value as keyof typeof creditScoreRates;
                  updateTerm('creditScore', score);
                  updateTerm('interestRate', creditScoreRates[score].rate);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {Object.entries(creditScoreRates).map(([key, data]) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)} ({data.description})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (APR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={terms.interestRate}
                  onChange={(e) => updateTerm('interestRate', Number(e.target.value))}
                  className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="0" max="30" step="0.1"
                />
                <span className="absolute right-3 top-2 text-gray-500">%</span>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Calculate Payment
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Loan Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Loan Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Purchase Price:</span>
                <span>${terms.loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Down Payment:</span>
                <span>-${terms.downPayment.toLocaleString()}</span>
              </div>
              {terms.tradeInValue && terms.tradeInValue > 0 && (
                <div className="flex justify-between">
                  <span>Trade-In:</span>
                  <span>-${terms.tradeInValue.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-2 font-medium flex justify-between">
                <span>Amount Financed:</span>
                <span>${netLoanAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {results && (
            <>
              {/* Monthly Payment */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200 text-center">
                <h4 className="text-sm text-green-600 mb-1">Monthly Payment</h4>
                <div className="text-3xl font-bold text-green-800">
                  ${results.monthlyPayment.toLocaleString()}
                </div>
                <p className="text-sm text-green-600 mt-1">
                  for {terms.termMonths} months
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border rounded-lg p-4 text-center">
                  <h4 className="text-sm text-gray-600 mb-1">Total Interest</h4>
                  <div className="text-xl font-bold text-gray-900">
                    ${results.totalInterest.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4 text-center">
                  <h4 className="text-sm text-gray-600 mb-1">Total Cost</h4>
                  <div className="text-xl font-bold text-gray-900">
                    ${(results.totalPayment + terms.downPayment + (terms.tradeInValue || 0)).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Payment Schedule Toggle */}
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {showSchedule ? 'Hide' : 'Show'} Payment Schedule
              </button>

              {showSchedule && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2">
                    <h4 className="font-medium text-gray-900">Payment Schedule</h4>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-2 py-1 text-left">Month</th>
                          <th className="px-2 py-1 text-right">Payment</th>
                          <th className="px-2 py-1 text-right">Interest</th>
                          <th className="px-2 py-1 text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.paymentSchedule.slice(0, 12).map((payment) => (
                          <tr key={payment.month} className="border-t">
                            <td className="px-2 py-1">{payment.month}</td>
                            <td className="px-2 py-1 text-right">${payment.payment}</td>
                            <td className="px-2 py-1 text-right text-red-600">${payment.interest}</td>
                            <td className="px-2 py-1 text-right">${payment.balance}</td>
                          </tr>
                        ))}
                        {results.paymentSchedule.length > 12 && (
                          <tr>
                            <td colSpan={4} className="px-2 py-2 text-center text-gray-500 text-xs">
                              ... and {results.paymentSchedule.length - 12} more payments
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Tips */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Financing Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Higher down payment = lower monthly payment</li>
              <li>• Shorter terms = less total interest</li>
              <li>• Better credit = better rates</li>
              <li>• Factor in insurance and maintenance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
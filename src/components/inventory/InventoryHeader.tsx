'use client';

import { useFilter } from '@/contexts/FilterContext';

import { FilterParams } from '@/lib/utils/filters';

interface InventoryHeaderProps {
  totalResults: number;
  onShowMobileFilters: () => void;
  loading?: boolean;
  urlFilters?: FilterParams;
}

export default function InventoryHeader({ 
  totalResults, 
  onShowMobileFilters, 
  loading = false,
  urlFilters 
}: InventoryHeaderProps) {
  const { filters, updateFilter, resetFilters } = useFilter();

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'horsepower-low', label: 'Horsepower: Low to High' },
    { value: 'horsepower-high', label: 'Horsepower: High to Low' },
    { value: 'year-new', label: 'Year: Newest First' },
    { value: 'year-old', label: 'Year: Oldest First' },
    { value: 'brand', label: 'Brand A-Z' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const displayOptions = [36, 72, 108];

  const activeFiltersCount = [
    ...filters.brands,
    ...filters.shaftLengths, 
    ...filters.conditions,
    ...(filters.inStockOnly ? ['inStock'] : []),
    ...(filters.onSaleOnly ? ['onSale'] : []),
    ...(filters.minPrice > 0 ? ['minPrice'] : []),
    ...(filters.maxPrice < 100000 ? ['maxPrice'] : []),
    ...(filters.minHorsepower > 0 ? ['minHorsepower'] : []),
    ...(filters.maxHorsepower < 500 ? ['maxHorsepower'] : []),
  ].length;

  const getMainHeading = () => {
    // Priority: URL filters first, then context filters
    if (urlFilters?.condition === 'new') {
      return 'SHOP NEW OUTBOARD MOTORS';
    } else if (urlFilters?.condition === 'used') {
      return 'SHOP USED OUTBOARD MOTORS';
    } else if (urlFilters?.status === 'sale') {
      return 'SHOP OUTBOARD MOTORS ON SALE';
    } else if (urlFilters?.status === 'overstock') {
      return 'SHOP OVERSTOCK OUTBOARD MOTORS';
    } else if (urlFilters?.hp) {
      const hpDisplay = urlFilters.hp.includes('+') 
        ? `${urlFilters.hp.replace('+', '')}+ HP` 
        : `${urlFilters.hp.replace('-', '-')} HP`;
      return `SHOP ${hpDisplay} OUTBOARD MOTORS`;
    } else if (urlFilters?.brand) {
      return `SHOP ${urlFilters.brand.toUpperCase()} OUTBOARD MOTORS`;
    } else if (filters.brands.length === 1) {
      return `SHOP ALL ${filters.brands[0].toUpperCase()} OUTBOARD MOTORS`;
    } else if (filters.brands.length > 1) {
      return 'SHOP MULTIPLE BRANDS';
    } else {
      return 'SHOP ALL OUTBOARD MOTORS';
    }
  };

  return (
    <div className="mb-8">
      {/* Main Heading */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-charcoal uppercase tracking-wide">
          {getMainHeading()}
        </h1>
      </div>
      {/* Filter & Sort Header - Only on mobile */}
      <div className="lg:hidden bg-professional-gray text-white text-center py-1 mb-6">
        <button
          onClick={onShowMobileFilters}
          className="text-lg font-semibold uppercase tracking-wide"
        >
          FILTER & SORT
        </button>
      </div>

      {/* Results and Display Options */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {!loading && (
            <div className="text-charcoal text-lg font-semibold">
              {totalResults} Results
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-charcoal font-medium">Display:</span>
          <div className="flex items-center gap-2">
            {displayOptions.map((option) => (
              <button
                key={option}
                onClick={() => updateFilter('resultsPerPage', option)}
                className={`px-3 py-1.5 text-sm font-medium rounded ${
                  (filters.resultsPerPage || 36) === option
                    ? 'bg-gray-300 text-charcoal'
                    : 'bg-gray-100 text-professional-gray hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden search and sort - keep for mobile filter functionality */}
      <div className="hidden">
        <input
          type="text"
          placeholder="Search outboard motors..."
          value={filters.searchQuery}
          onChange={(e) => updateFilter('searchQuery', e.target.value)}
        />
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className="text-sm text-professional-gray">Active filters:</span>
          
          {/* Brand filters */}
          {filters.brands.map((brand) => (
            <span key={brand} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-charcoal text-sm rounded-full">
              {brand}
              <button
                onClick={() => updateFilter('brands', filters.brands.filter(b => b !== brand))}
                className="text-professional-gray hover:text-charcoal ml-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}

          {/* Condition filters */}
          {filters.conditions.map((condition) => (
            <span key={condition} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-charcoal text-sm rounded-full">
              {condition === 'scratch-dent' ? 'Scratch & Dent' :
               condition === 'overstock' ? 'Overstock' :
               condition.charAt(0).toUpperCase() + condition.slice(1)}
              <button
                onClick={() => updateFilter('conditions', filters.conditions.filter(c => c !== condition))}
                className="text-professional-gray hover:text-charcoal ml-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}

          {/* Other filters */}
          {filters.inStockOnly && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-charcoal text-sm rounded-full">
              In Stock
              <button
                onClick={() => updateFilter('inStockOnly', false)}
                className="text-professional-gray hover:text-charcoal ml-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}

          {filters.onSaleOnly && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
              On Sale
              <button
                onClick={() => updateFilter('onSaleOnly', false)}
                className="text-red-500 hover:text-red-700 ml-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          )}

          {/* Clear all button */}
          <button
            onClick={resetFilters}
            className="text-sm text-deep-blue hover:text-deep-blue/80 font-medium underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
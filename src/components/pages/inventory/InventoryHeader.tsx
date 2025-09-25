'use client';

import { useFilter } from '@/contexts/FilterContext';
import { usePathname, useSearchParams } from 'next/navigation';
import Icon from '@/components/ui/display/Icon';
import Badge from '@/components/ui/display/Badge';
import Button from '@/components/ui/forms/Button';

interface URLFilters {
  hp?: string;
  brand?: string;
  condition?: string;
  status?: string;
}

interface InventoryHeaderProps {
  totalResults: number;
  onShowMobileFilters: () => void;
  loading?: boolean;
  urlFilters?: URLFilters;
  onClearAllFilters?: () => void;
}

export default function InventoryHeader({ 
  totalResults, 
  onShowMobileFilters, 
  loading = false,
  urlFilters,
  onClearAllFilters
}: InventoryHeaderProps) {
  const { filters, updateFilter, resetFilters } = useFilter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    ...filters.driveTypes,
    ...filters.fuelDelivery,
    ...filters.fuelTank,
    ...filters.starting,
    ...filters.steering,
    ...filters.trimTilt,
    ...(filters.inStockOnly ? ['inStock'] : []),
    ...(filters.onSaleOnly ? ['onSale'] : []),
    ...(filters.minPrice > 0 ? ['minPrice'] : []),
    ...(filters.maxPrice < 100000 ? ['maxPrice'] : []),
    ...(filters.minHorsepower > 0 ? ['minHorsepower'] : []),
    ...(filters.maxHorsepower < 500 ? ['maxHorsepower'] : []),
    ...(filters.searchQuery ? ['search'] : []),
  ].length;

  const getMainHeading = () => {
    // Check if we're on the base inventory page without any parameters
    const isBaseInventoryPage = pathname === '/inventory' && searchParams.toString() === '';
    
    // If we're on the base page OR have no filters, show default
    const hasAnyFilters = activeFiltersCount > 0 || Object.values(urlFilters || {}).some(v => v);
    
    if (isBaseInventoryPage || !hasAnyFilters) {
      return 'SHOP ALL OUTBOARD MOTORS';
    }
    
    // Test brand filter first (prioritize both filter context and URL)
    if (filters.brands.length === 1) {
      return `SHOP ${filters.brands[0].toUpperCase()} OUTBOARD MOTORS`;
    } else if (filters.brands.length > 1) {
      return 'SHOP MULTIPLE BRANDS';
    } else if (urlFilters?.brand) {
      // Prioritize URL brand filter when no filter context brand is set
      return `SHOP ${urlFilters.brand.toUpperCase()} OUTBOARD MOTORS`;
    }

    // Check context filters first (sidebar), then URL filters as fallback
    if (filters.conditions.includes('new') || urlFilters?.condition === 'new') {
      return 'SHOP NEW OUTBOARD MOTORS';
    } else if (filters.conditions.includes('used') || urlFilters?.condition === 'used') {
      return 'SHOP USED OUTBOARD MOTORS';
    } else if (filters.conditions.includes('overstock') || urlFilters?.status === 'overstock') {
      return 'SHOP OVERSTOCK OUTBOARD MOTORS';
    } else if (filters.conditions.includes('scratch-dent')) {
      return 'SHOP SCRATCH & DENT OUTBOARD MOTORS';
    } else if (filters.onSaleOnly || urlFilters?.status === 'sale') {
      return 'SHOP OUTBOARD MOTORS ON SALE';
    } else if (filters.inStockOnly) {
      return 'SHOP IN STOCK OUTBOARD MOTORS';
    } else if (urlFilters?.hp) {
      const hpDisplay = urlFilters.hp.includes('+')
        ? `${urlFilters.hp.replace('+', '')}+ HP`
        : `${urlFilters.hp.replace('-', '-')} HP`;
      return `SHOP ${hpDisplay} OUTBOARD MOTORS`;
    } else if (filters.minHorsepower > 0 || filters.maxHorsepower < 500) {
      if (filters.minHorsepower <= 30 && filters.maxHorsepower <= 30) {
        return 'SHOP PORTABLE OUTBOARD MOTORS';
      } else if (filters.minHorsepower >= 31 && filters.maxHorsepower <= 100) {
        return 'SHOP MID-RANGE OUTBOARD MOTORS';
      } else if (filters.minHorsepower >= 101 && filters.maxHorsepower <= 200) {
        return 'SHOP HIGH PERFORMANCE OUTBOARD MOTORS';
      } else if (filters.minHorsepower >= 201) {
        return 'SHOP COMMERCIAL OUTBOARD MOTORS';
      } else {
        return `SHOP ${filters.minHorsepower}-${filters.maxHorsepower} HP OUTBOARD MOTORS`;
      }
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
        <Button
          variant="ghost"
          size="lg"
          onClick={onShowMobileFilters}
          className="text-lg font-semibold uppercase tracking-wide text-white"
        >
          FILTER & SORT
        </Button>
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
              <Button
                key={option}
                variant="toggle"
                size="sm"
                active={(filters.resultsPerPage || 36) === option}
                onClick={() => updateFilter('resultsPerPage', option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden sort - keep for mobile filter functionality */}
      <div className="hidden">
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
            <Badge
              key={brand}
              variant="filter"
              size="sm"
              removable
              onRemove={() => updateFilter('brands', filters.brands.filter(b => b !== brand))}
            >
              {brand}
            </Badge>
          ))}

          {/* Condition filters */}
          {filters.conditions.map((condition) => (
            <Badge
              key={condition}
              variant="filter"
              size="sm"
              removable
              onRemove={() => updateFilter('conditions', filters.conditions.filter(c => c !== condition))}
            >
              {condition === 'scratch-dent' ? 'Scratch & Dent' :
               condition === 'overstock' ? 'Overstock' :
               condition.charAt(0).toUpperCase() + condition.slice(1)}
            </Badge>
          ))}

          {/* Other filters */}
          {filters.inStockOnly && (
            <Badge
              variant="filter"
              size="sm"
              removable
              onRemove={() => updateFilter('inStockOnly', false)}
            >
              In Stock
            </Badge>
          )}

          {filters.onSaleOnly && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
              On Sale
              <button
                onClick={() => updateFilter('onSaleOnly', false)}
                className="text-red-500 hover:text-red-700 ml-1"
              >
                <Icon name="close" size="xs" />
              </button>
            </span>
          )}

          {/* Clear all button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAllFilters || resetFilters}
            className="text-sm text-deep-blue hover:text-deep-blue/80 font-medium underline"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
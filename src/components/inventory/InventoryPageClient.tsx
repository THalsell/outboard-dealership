'use client';

import { useState, useEffect, useMemo } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { allMotors } from '@/lib/data/allMotors';
import FilterSidebar from './FilterSidebar';
import InventoryGrid from './InventoryGrid';
import InventoryList from './InventoryList';
import InventoryHeader from './InventoryHeader';

export default function InventoryPageClient() {
  const { filters, compareList } = useFilter();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort motors
  const filteredMotors = useMemo(() => {
    const filtered = allMotors.filter((motor) => {
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(motor.brand)) {
        return false;
      }

      // Price filter
      const price = motor.salePrice || motor.price;
      if (price < filters.minPrice || price > filters.maxPrice) {
        return false;
      }

      // Horsepower filter
      if (motor.horsepower < filters.minHorsepower || motor.horsepower > filters.maxHorsepower) {
        return false;
      }

      // Shaft length filter
      if (filters.shaftLengths.length > 0 && motor.shaftLength && !filters.shaftLengths.includes(motor.shaftLength)) {
        return false;
      }

      // Condition filter
      if (filters.conditions.length > 0 && !filters.conditions.includes(motor.condition)) {
        return false;
      }

      // In stock filter
      if (filters.inStockOnly && !motor.inStock) {
        return false;
      }

      // On sale filter
      if (filters.onSaleOnly && !motor.salePrice) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableText = `${motor.brand} ${motor.model} ${motor.year}`.toLowerCase();
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });

    // Sort motors
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'horsepower-low':
        filtered.sort((a, b) => a.horsepower - b.horsepower);
        break;
      case 'horsepower-high':
        filtered.sort((a, b) => b.horsepower - a.horsepower);
        break;
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        filtered.sort((a, b) => a.year - b.year);
        break;
      case 'brand':
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // 'featured'
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.bestSeller && !b.bestSeller) return -1;
          if (!a.bestSeller && b.bestSeller) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
    }

    return filtered;
  }, [filters]);

  const compareMotors = useMemo(() => {
    return allMotors.filter(motor => compareList.includes(motor.id));
  }, [compareList]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="relative w-80 max-w-sm h-full bg-white shadow-xl">
            <FilterSidebar 
              isMobile={true} 
              onClose={() => setShowMobileFilters(false)} 
            />
          </div>
        </div>
      )}

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="bg-blue-600 text-white py-3 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <span className="font-medium">
                {compareList.length} motor{compareList.length > 1 ? 's' : ''} selected for comparison
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="text-blue-100 hover:text-white underline"
                onClick={() => {
                  // Navigate to compare page (implement when needed)
                  console.log('Navigate to compare page with:', compareMotors);
                }}
                disabled={compareList.length < 2}
              >
                Compare ({compareList.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header with controls */}
            <InventoryHeader
              totalResults={filteredMotors.length}
              onShowMobileFilters={() => setShowMobileFilters(true)}
              loading={loading}
            />

            {/* Results */}
            <div className="mt-6">
              {filters.viewMode === 'grid' ? (
                <InventoryGrid motors={filteredMotors} loading={loading} />
              ) : (
                <InventoryList motors={filteredMotors} loading={loading} />
              )}
            </div>

            {/* Load More / Pagination */}
            {!loading && filteredMotors.length > 0 && (
              <div className="mt-12 text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Load More Motors
                </button>
                <p className="text-gray-500 text-sm mt-2">
                  Showing {filteredMotors.length} of {allMotors.length} motors
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
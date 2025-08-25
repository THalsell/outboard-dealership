'use client';

import { useState, useEffect, useMemo } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { allMotors } from '@/lib/data/allMotors';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FilterSidebar from './FilterSidebar';
import InventoryGrid from './InventoryGrid';
import InventoryHeader from './InventoryHeader';

export default function InventoryPageClient() {
  const { filters, compareList, removeFromCompare } = useFilter();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Prevent background scroll when mobile filters are open
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileFilters]);

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

  // Pagination logic
  const totalResults = filteredMotors.length;
  const resultsPerPage = filters.resultsPerPage;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedMotors = filteredMotors.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.brands, filters.minPrice, filters.maxPrice, filters.minHorsepower, filters.maxHorsepower, filters.shaftLengths, filters.conditions, filters.inStockOnly, filters.onSaleOnly, filters.searchQuery, filters.sortBy]);

  // Reset to page 1 when results per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.resultsPerPage]);

  const compareMotors = useMemo(() => {
    return allMotors.filter(motor => compareList.includes(motor.id));
  }, [compareList]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Page */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden bg-white">
          <FilterSidebar 
            isMobile={true} 
            onClose={() => setShowMobileFilters(false)} 
          />
        </div>
      )}

      {/* Floating Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-deep-blue text-white shadow-xl border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold">
                  {compareList.length} motor{compareList.length > 1 ? 's' : ''} selected for comparison
                </div>
                <div className="text-sm opacity-80">
                  {compareList.length < 4 ? `Select up to ${4 - compareList.length} more` : 'Maximum reached'}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    compareList.forEach(id => removeFromCompare(id));
                  }}
                  className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Clear All
                </button>
                <button
                  className="bg-white text-deep-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    router.push('/inventory/compare');
                  }}
                  disabled={compareList.length < 2}
                >
                  Compare Motors {compareList.length > 1 ? `(${compareList.length})` : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-600 hover:text-deep-blue">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Outboard Motors</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Vertical Line Separator */}
          <div className="hidden lg:block w-px bg-gray-200"></div>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header with controls */}
            <InventoryHeader
              totalResults={totalResults}
              onShowMobileFilters={() => setShowMobileFilters(true)}
              loading={loading}
            />

            {/* Grid Content */}
            <InventoryGrid
              motors={paginatedMotors}
              loading={loading}
            />

            {/* Pagination */}
            {!loading && totalResults > 0 && totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{startIndex + 1}-{Math.min(endIndex, totalResults)}</span> of <span className="font-medium">{totalResults}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage > totalPages - 3) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 rounded ${
                            currentPage === pageNum
                              ? 'bg-deep-blue text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {totalPages > 5 && currentPage <= totalPages - 3 && (
                      <>
                        <span className="px-3 py-2">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParts } from '@/contexts/PartsContext';
import { allParts } from '@/lib/data/parts';
import PartsFinder from './PartsFinder';
import PartsCategoryBrowser from './PartsCategoryBrowser';
import PartsGrid from './PartsGrid';
import PartsList from './PartsList';
import BulkOrderPanel from './BulkOrderPanel';
import RelatedProducts from './RelatedProducts';

interface PartsPageClientProps {
  showCategories?: boolean;
  showPartsFinder?: boolean;
}

export default function PartsPageClient({ 
  showCategories = true, 
  showPartsFinder = true 
}: PartsPageClientProps) {
  const { filters, updateFilter, resetFilters, bulkOrder, selectedMotorForParts } = useParts();
  // Removed unused showMobileFilters state
  const [showBulkOrder, setShowBulkOrder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'categories' | 'finder' | 'parts'>('categories');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort parts
  const filteredParts = useMemo(() => {
    const filtered = allParts.filter((part) => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(part.category) && 
          !filters.categories.some(cat => part.subcategory === cat)) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(part.brand)) {
        return false;
      }

      // Price filter
      const price = part.salePrice || part.price;
      if (price < filters.minPrice || price > filters.maxPrice) {
        return false;
      }

      // OEM filter
      if (filters.isOEMOnly && !part.isOEM) {
        return false;
      }

      // In stock filter
      if (filters.inStockOnly && !part.inStock) {
        return false;
      }

      // On sale filter
      if (filters.onSaleOnly && !part.salePrice) {
        return false;
      }

      // Compatible motor filter
      if (filters.compatibleMotorId && !part.compatibleMotors.includes(filters.compatibleMotorId)) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableText = `${part.name} ${part.description} ${part.partNumber} ${part.brand} ${part.tags.join(' ')}`.toLowerCase();
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });

    // Sort parts
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'brand':
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => b.partNumber.localeCompare(a.partNumber));
        break;
      default: // 'featured'
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.bestseller && !b.bestseller) return -1;
          if (!a.bestseller && b.bestseller) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
    }

    return filtered;
  }, [filters]);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'brand', label: 'Brand A-Z' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ];

  const brands = Array.from(new Set(allParts.map(part => part.brand))).sort();

  const activeFiltersCount = [
    ...filters.categories,
    ...filters.brands,
    ...(filters.isOEMOnly ? ['oem'] : []),
    ...(filters.inStockOnly ? ['inStock'] : []),
    ...(filters.onSaleOnly ? ['onSale'] : []),
    ...(filters.minPrice > 0 ? ['minPrice'] : []),
    ...(filters.maxPrice < 1000 ? ['maxPrice'] : []),
    ...(filters.compatibleMotorId ? ['motor'] : []),
  ].length;

  // Show parts list if we have filtered results or active search
  const showPartsList = filteredParts.length > 0 || filters.searchQuery || activeFiltersCount > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bulk Order Button */}
      {bulkOrder.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowBulkOrder(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Bulk Order ({bulkOrder.length})
          </button>
        </div>
      )}

      {/* Bulk Order Panel */}
      <BulkOrderPanel 
        isOpen={showBulkOrder} 
        onClose={() => setShowBulkOrder(false)} 
      />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Parts Catalog</h1>
              <p className="text-gray-600">
                {selectedMotorForParts ? 'Parts compatible with your selected motor' : 'Find the right parts for your outboard motor'}
              </p>
            </div>

            {/* Search Bar */}
            <div className="lg:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search parts, part numbers..."
                  value={filters.searchQuery}
                  onChange={(e) => updateFilter('searchQuery', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {filters.searchQuery && (
                  <button
                    onClick={() => updateFilter('searchQuery', '')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {showCategories && (
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'categories'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Browse Categories
                </button>
              )}
              {showPartsFinder && (
                <button
                  onClick={() => setActiveTab('finder')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'finder'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Find by Motor
                </button>
              )}
              <button
                onClick={() => setActiveTab('parts')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'parts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Parts ({filteredParts.length.toLocaleString()})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'categories' && showCategories && (
              <PartsCategoryBrowser viewMode="grid" />
            )}
            
            {activeTab === 'finder' && showPartsFinder && (
              <PartsFinder onMotorSelect={() => setActiveTab('parts')} />
            )}
            
            {activeTab === 'parts' && (
              <div className="space-y-6">
                {/* Filters Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button (removed functionality for unused state) */}
                    <button
                      className="sm:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      disabled
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                      </svg>
                      Filters
                      {activeFiltersCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {activeFiltersCount}
                        </span>
                      )}
                    </button>

                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={resetFilters}
                        className="text-sm text-blue-600 hover:text-blue-700 underline"
                      >
                        Clear all filters
                      </button>
                    )}

                    {!loading && (
                      <span className="text-gray-600 text-sm">
                        {filteredParts.length.toLocaleString()} parts found
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => updateFilter('sortBy', e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateFilter('viewMode', 'grid')}
                        className={`p-2 transition-colors ${
                          filters.viewMode === 'grid'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => updateFilter('viewMode', 'list')}
                        className={`p-2 transition-colors ${
                          filters.viewMode === 'list'
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop Filters */}
                <div className="hidden sm:block">
                  <div className="bg-white rounded-lg border p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {/* Brand Filter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                        <select
                          value={filters.brands[0] || ''}
                          onChange={(e) => updateFilter('brands', e.target.value ? [e.target.value] : [])}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        >
                          <option value="">All Brands</option>
                          {brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>

                      {/* OEM Filter */}
                      <div className="flex items-center">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.isOEMOnly}
                            onChange={(e) => updateFilter('isOEMOnly', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm">OEM Only</span>
                        </label>
                      </div>

                      {/* Stock Filter */}
                      <div className="flex items-center">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.inStockOnly}
                            onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm">In Stock</span>
                        </label>
                      </div>

                      {/* Sale Filter */}
                      <div className="flex items-center">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.onSaleOnly}
                            onChange={(e) => updateFilter('onSaleOnly', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm">On Sale</span>
                        </label>
                      </div>

                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                        <select
                          value={filters.maxPrice === 1000 ? '' : filters.maxPrice.toString()}
                          onChange={(e) => updateFilter('maxPrice', e.target.value ? parseInt(e.target.value) : 1000)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                        >
                          <option value="">Any Price</option>
                          <option value="50">Under $50</option>
                          <option value="100">Under $100</option>
                          <option value="250">Under $250</option>
                          <option value="500">Under $500</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parts Display */}
                {filters.viewMode === 'grid' ? (
                  <PartsGrid 
                    parts={filteredParts} 
                    loading={loading} 
                    showCompatibility={!!selectedMotorForParts}
                  />
                ) : (
                  <PartsList 
                    parts={filteredParts} 
                    loading={loading} 
                    showCompatibility={!!selectedMotorForParts}
                  />
                )}

                {/* Load More */}
                {!loading && filteredParts.length > 0 && (
                  <div className="text-center py-8">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
                      Load More Parts
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {showPartsList && filteredParts.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <RelatedProducts 
              category={filters.categories[0]}
              compatibleMotorId={selectedMotorForParts || undefined}
              title="You might also need"
              maxItems={4}
            />
          </div>
        )}
      </div>
    </div>
  );
}
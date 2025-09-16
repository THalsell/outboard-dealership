'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/lib/data/products';
import ProductCard from '@/components/ui/ProductCard';

interface SortOption {
  label: string;
  value: string;
  compare: (a: Product, b: Product) => number;
}

const sortOptions: SortOption[] = [
  {
    label: 'Featured',
    value: 'featured',
    compare: () => 0
  },
  {
    label: 'Price: Low to High',
    value: 'price-asc',
    compare: (a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0)
  },
  {
    label: 'Price: High to Low',
    value: 'price-desc',
    compare: (a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0)
  },
  {
    label: 'Name: A to Z',
    value: 'name-asc',
    compare: (a, b) => a.title.localeCompare(b.title)
  },
  {
    label: 'Name: Z to A',
    value: 'name-desc',
    compare: (a, b) => b.title.localeCompare(a.title)
  }
];

export default function PartsPageClient() {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  // Removed unused viewMode state

  // Load products from Shopify API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const fetchedProducts = await response.json();
        // Filter to only show parts and accessories (not outboard motors)
        const partsProducts = fetchedProducts.filter((product: Product) => 
          product.type !== 'Outboard Motor' && product.published
        );
        setAllProducts(partsProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = [...allProducts];

    // Apply sorting
    const sortOption = sortOptions.find(option => option.value === sortBy);
    if (sortOption && sortOption.value !== 'featured') {
      filtered.sort(sortOption.compare);
    }

    return filtered;
  }, [allProducts, sortBy]);

  const totalResults = filteredProducts.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading parts and accessories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 pt-[180px] sm:pt-[120px] pb-6">
        {/* Main Content */}
        <main className="w-full">
          {/* Header with controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-deep-blue mb-2">Parts & Accessories</h1>
              <p className="text-gray-600">
                Showing <span className="font-medium text-deep-blue">{totalResults}</span> results
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
                <label className="text-sm text-gray-700 whitespace-nowrap">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-none bg-transparent focus:ring-0 focus:outline-none cursor-pointer"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {totalResults === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6-8V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-deep-blue mb-2">No parts found</h3>
              <p className="text-gray-600">We&apos;re currently updating our parts inventory. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
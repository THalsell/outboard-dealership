'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/lib/data/products';
import ProductCard from '@/components/ui/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';

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
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner message="Loading parts and accessories..." />
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
              <Card padding="sm" border className="flex items-center gap-2">
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
              </Card>
            </div>
          </div>

          {/* Products Grid */}
          {totalResults === 0 ? (
            <EmptyState
              title="No parts found"
              description="We're currently updating our parts inventory. Please check back soon."
              showIcon={true}
              icon={<Icon name="package" size="xl" className="text-gray-400" />}
            />
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
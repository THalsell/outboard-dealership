'use client';

import { useState, useEffect, useMemo } from 'react';
import { useFilter } from '@/contexts/FilterContext';
import { Product } from '@/lib/data/products';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterSidebar from './FilterSidebar';
import InventoryGrid from './InventoryGrid';
import InventoryHeader from './InventoryHeader';

interface URLFilters {
  hp?: string;
  brand?: string;
  condition?: string;
  status?: string;
}

export default function InventoryPageClient() {
  const { filters, compareList, removeFromCompare } = useFilter();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Get URL parameters for filtering
  const urlFilters: URLFilters = {
    hp: searchParams.get('hp') || undefined,
    brand: searchParams.get('brand') || undefined,
    condition: searchParams.get('condition') || undefined,
    status: searchParams.get('status') || undefined,
  };

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
        setAllProducts(fetchedProducts);
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
    // Start with all published products (including out of stock)
    let filtered = allProducts.filter(product => product.published);
    
    // Apply filters
    filtered = filtered.filter((product) => {
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Condition filter
      if (filters.conditions.length > 0) {
        // Check product status field first, then tags, then default to 'new'
        let productCondition = 'new'; // Default condition
        
        // Check status field
        if (product.status) {
          const status = product.status.toLowerCase();
          if (['used', 'refurbished', 'open-box'].includes(status)) {
            productCondition = 'used';
          } else if (status === 'overstock') {
            productCondition = 'overstock';
          } else if (status === 'scratch-dent' || status === 'damaged') {
            productCondition = 'scratch-dent';
          }
        }
        
        // Also check tags as fallback
        const conditionTag = product.tags.find(tag => 
          ['new', 'used', 'overstock', 'scratch-dent', 'refurbished', 'open-box'].includes(tag.toLowerCase())
        );
        
        if (conditionTag) {
          const normalizedTag = conditionTag.toLowerCase();
          if (['refurbished', 'open-box'].includes(normalizedTag)) {
            productCondition = 'used';
          } else {
            productCondition = normalizedTag;
          }
        }
        
        if (!filters.conditions.includes(productCondition)) {
          return false;
        }
      }

      // Shaft length filter
      if (filters.shaftLengths.length > 0) {
        // Check if product has shaft length variants
        const productShaftLengths = product.variants
          .filter(v => v.option1Name === 'Shaft Length' && v.option1Value)
          .map(v => {
            // Normalize shaft length values for filtering
            const value = v.option1Value.toLowerCase();
            if (value.includes('15') || value.includes('short')) return '15"';
            if (value.includes('20') || value.includes('long')) return '20"';
            if (value.includes('25') || value.includes('extra')) return '25"';
            return value;
          });
        
        const hasMatchingShaft = productShaftLengths.some(length => 
          filters.shaftLengths.includes(length)
        );
        
        if (!hasMatchingShaft) {
          return false;
        }
      }

      // Cylinders filter
      if (filters.cylinders.length > 0) {
        // Check if product has cylinder count in specs or tags
        let productCylinders: string | null = null;
        
        // First check specs for cylinder count
        if (product.specs?.cylinders) {
          productCylinders = product.specs.cylinders.toString();
        } else if (product.specs?.Cylinders) {
          productCylinders = product.specs.Cylinders.toString();
        }
        
        // If not in specs, check tags for cylinder information
        if (!productCylinders) {
          const cylinderTag = product.tags.find(tag => 
            tag.toLowerCase().includes('cylinder') || 
            /^\d+\s*cyl/i.test(tag)
          );
          
          if (cylinderTag) {
            const match = cylinderTag.match(/(\d+)/);
            if (match) {
              productCylinders = match[1];
            }
          }
        }
        
        // Default assumption based on horsepower ranges if no explicit data
        if (!productCylinders) {
          if (product.horsepower <= 30) {
            productCylinders = '1';
          } else if (product.horsepower <= 60) {
            productCylinders = '2';
          } else {
            productCylinders = '3';
          }
        }
        
        if (!filters.cylinders.includes(productCylinders)) {
          return false;
        }
      }

      // In stock only filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // On sale only filter (check if compare price is higher than regular price)
      if (filters.onSaleOnly) {
        const variant = product.variants[0];
        const hasDiscount = variant?.compareAtPrice && variant.compareAtPrice > variant.price;
        if (!hasDiscount) {
          return false;
        }
      }

      // Price filter
      const price = product.variants[0]?.price || 0;
      if (price < filters.minPrice || price > filters.maxPrice) {
        return false;
      }

      // Horsepower filter
      if (product.horsepower < filters.minHorsepower || product.horsepower > filters.maxHorsepower) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableText = `${product.brand} ${product.title} ${product.description}`.toLowerCase();
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
        break;
      case 'horsepower-low':
        filtered.sort((a, b) => a.horsepower - b.horsepower);
        break;
      case 'horsepower-high':
        filtered.sort((a, b) => b.horsepower - a.horsepower);
        break;
      case 'brand':
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      default: // 'featured'
        filtered.sort((a, b) => {
          // Sort by inventory (in stock items first)
          const aInventory = a.variants.reduce((sum, v) => sum + v.inventory, 0);
          const bInventory = b.variants.reduce((sum, v) => sum + v.inventory, 0);
          return bInventory - aInventory;
        });
    }

    return filtered;
  }, [allProducts, filters]);

  // Pagination logic
  const totalResults = filteredProducts.length;
  const resultsPerPage = filters.resultsPerPage;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.brands, filters.minPrice, filters.maxPrice, filters.minHorsepower, filters.maxHorsepower, filters.shaftLengths, filters.conditions, filters.inStockOnly, filters.onSaleOnly, filters.searchQuery, filters.sortBy]);

  // Reset to page 1 when results per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.resultsPerPage]);

  const compareProducts = useMemo(() => {
    return allProducts.filter(product => compareList.includes(product.id));
  }, [allProducts, compareList]);

  // Calculate dynamic filter ranges from actual inventory
  const dynamicRanges = useMemo(() => {
    if (allProducts.length === 0) {
      return {
        priceRange: { min: 0, max: 100000 },
        horsepowerRange: { min: 0, max: 500 },
        availableBrands: [],
        availableShaftLengths: []
      };
    }

    // Get unique brands
    const brandsSet = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = 0;
    let minHP = Infinity;
    let maxHP = 0;
    const shaftLengthsSet = new Set<string>();

    allProducts.forEach(product => {
      // Brands
      if (product.brand) {
        brandsSet.add(product.brand);
      }

      // Price range
      product.variants.forEach(variant => {
        if (variant.price) {
          minPrice = Math.min(minPrice, variant.price);
          maxPrice = Math.max(maxPrice, variant.price);
        }

        // Shaft lengths
        if (variant.option1Name === 'Shaft Length' && variant.option1Value) {
          const value = variant.option1Value.toLowerCase();
          if (value.includes('20') || value.includes('short')) {
            shaftLengthsSet.add('short');
          } else if (value.includes('25') || value.includes('long')) {
            shaftLengthsSet.add('long');
          } else if (value.includes('30') || value.includes('extra')) {
            shaftLengthsSet.add('extra-long');
          }
        }
      });

      // Horsepower range
      if (product.horsepower) {
        minHP = Math.min(minHP, product.horsepower);
        maxHP = Math.max(maxHP, product.horsepower);
      }
    });

    return {
      priceRange: { 
        min: minPrice === Infinity ? 0 : Math.floor(minPrice), 
        max: maxPrice === 0 ? 100000 : Math.ceil(maxPrice) 
      },
      horsepowerRange: { 
        min: minHP === Infinity ? 0 : Math.floor(minHP), 
        max: maxHP === 0 ? 500 : Math.ceil(maxHP) 
      },
      availableBrands: Array.from(brandsSet).sort(),
      availableShaftLengths: Array.from(shaftLengthsSet).sort()
    };
  }, [allProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Page */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden bg-white">
          <FilterSidebar 
            isMobile={true} 
            onClose={() => setShowMobileFilters(false)}
            availableBrands={dynamicRanges.availableBrands}
            priceRange={dynamicRanges.priceRange}
            horsepowerRange={dynamicRanges.horsepowerRange}
            availableShaftLengths={dynamicRanges.availableShaftLengths}
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
            <FilterSidebar 
              availableBrands={dynamicRanges.availableBrands}
              priceRange={dynamicRanges.priceRange}
              horsepowerRange={dynamicRanges.horsepowerRange}
              availableShaftLengths={dynamicRanges.availableShaftLengths}
            />
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
              urlFilters={urlFilters}
            />

            {/* Grid Content */}
            <InventoryGrid
              products={paginatedProducts}
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
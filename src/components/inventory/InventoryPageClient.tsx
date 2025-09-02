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
        console.log('Fetched products count:', fetchedProducts.length);
        console.log('Sample product:', fetchedProducts[0]);
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
    // Start with all products (remove published filter for debugging)
    console.log('All products before filtering:', allProducts.length);
    let filtered = [...allProducts]; // Show ALL products for now
    console.log('Products after removing published filter:', filtered.length);
    
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

      // Trim & Tilt filter
      if (filters.trimTilt.length > 0) {
        // Check if product has trim & tilt information
        let productTrimTiltType: string | null = null;
        
        // Check product tags for trim & tilt type
        const manualTiltTags = ['manual-tilt', 'manual tilt', 'manual-trim', 'manual trim', 'no-power-tilt'];
        const powerTiltTags = ['power-tilt', 'power tilt', 'electric-tilt', 'electric tilt', 'hydraulic-tilt'];
        const powerTrimTiltTags = ['power-trim-tilt', 'power trim tilt', 'power-trim-and-tilt', 'trim-and-tilt', 'ptt'];
        
        const hasManualTiltTag = product.tags.some(tag => 
          manualTiltTags.includes(tag.toLowerCase())
        );
        const hasPowerTiltTag = product.tags.some(tag => 
          powerTiltTags.includes(tag.toLowerCase())
        );
        const hasPowerTrimTiltTag = product.tags.some(tag => 
          powerTrimTiltTags.includes(tag.toLowerCase())
        );
        
        if (hasPowerTrimTiltTag) {
          productTrimTiltType = 'power-trim-tilt';
        } else if (hasPowerTiltTag) {
          productTrimTiltType = 'power-tilt';
        } else if (hasManualTiltTag) {
          productTrimTiltType = 'manual';
        } else {
          // Default based on horsepower
          if (product.horsepower >= 75) {
            productTrimTiltType = 'power-trim-tilt';
          } else if (product.horsepower >= 40) {
            productTrimTiltType = 'power-tilt';
          } else {
            productTrimTiltType = 'manual';
          }
        }
        
        if (!filters.trimTilt.includes(productTrimTiltType)) {
          return false;
        }
      }

      // Steering filter
      if (filters.steering.length > 0) {
        // Check if product has steering information
        let productSteeringType: string | null = null;
        
        // Check product tags for steering type
        const remoteTags = ['remote-steering', 'remote steering', 'remote-control', 'remote control', 'console-steering'];
        const tillerTags = ['tiller', 'tiller-handle', 'tiller handle', 'tiller-steering', 'tiller steering', 'hand-control'];
        
        const hasRemoteTag = product.tags.some(tag => 
          remoteTags.includes(tag.toLowerCase())
        );
        const hasTillerTag = product.tags.some(tag => 
          tillerTags.includes(tag.toLowerCase())
        );
        
        if (hasRemoteTag) {
          productSteeringType = 'remote';
        } else if (hasTillerTag) {
          productSteeringType = 'tiller';
        } else {
          // Default based on horsepower - smaller motors usually tiller, larger remote
          productSteeringType = product.horsepower <= 40 ? 'tiller' : 'remote';
        }
        
        if (!filters.steering.includes(productSteeringType)) {
          return false;
        }
      }

      // Starting method filter
      if (filters.starting.length > 0) {
        // Check if product has starting method information
        let productStartType: string | null = null;
        
        // Check product tags for starting method
        const manualTags = ['manual-start', 'manual start', 'pull-start', 'pull start', 'recoil-start', 'recoil start'];
        const electricTags = ['electric-start', 'electric start', 'e-start', 'power-start', 'push-button-start', 'key-start'];
        
        const hasManualTag = product.tags.some(tag => 
          manualTags.includes(tag.toLowerCase())
        );
        const hasElectricTag = product.tags.some(tag => 
          electricTags.includes(tag.toLowerCase())
        );
        
        if (hasManualTag) {
          productStartType = 'manual';
        } else if (hasElectricTag) {
          productStartType = 'electric';
        } else {
          // Default based on horsepower - smaller motors usually manual, larger electric
          productStartType = product.horsepower <= 25 ? 'manual' : 'electric';
        }
        
        if (!filters.starting.includes(productStartType)) {
          return false;
        }
      }

      // Fuel tank filter
      if (filters.fuelTank.length > 0) {
        // Check if product has fuel tank information
        let productTankType: string | null = null;
        
        // Check product tags for tank type
        const internalTags = ['internal-tank', 'internal tank', 'built-in tank', 'integrated tank'];
        const externalTags = ['external-tank', 'external tank', 'portable tank', 'remote tank'];
        
        const hasInternalTag = product.tags.some(tag => 
          internalTags.includes(tag.toLowerCase())
        );
        const hasExternalTag = product.tags.some(tag => 
          externalTags.includes(tag.toLowerCase())
        );
        
        if (hasInternalTag) {
          productTankType = 'internal';
        } else if (hasExternalTag) {
          productTankType = 'external';
        } else {
          // Default to external for smaller motors, internal for larger
          productTankType = product.horsepower <= 30 ? 'external' : 'internal';
        }
        
        if (!filters.fuelTank.includes(productTankType)) {
          return false;
        }
      }

      // Fuel delivery filter
      if (filters.fuelDelivery.length > 0) {
        // Check if product has fuel delivery information
        let productFuelType: string | null = null;
        
        // Check product tags for fuel type
        const carbTags = ['carburetor', 'carb', 'carbureted'];
        const efiTags = ['efi', 'fuel-injection', 'electronic-fuel-injection', 'fuel injection'];
        const propaneTags = ['propane', 'lpg', 'liquefied-petroleum-gas'];
        
        const hasCarbTag = product.tags.some(tag => 
          carbTags.includes(tag.toLowerCase())
        );
        const hasEfiTag = product.tags.some(tag => 
          efiTags.includes(tag.toLowerCase())
        );
        const hasPropaneTag = product.tags.some(tag => 
          propaneTags.includes(tag.toLowerCase())
        );
        
        if (hasCarbTag) {
          productFuelType = 'carburetor';
        } else if (hasEfiTag) {
          productFuelType = 'efi';
        } else if (hasPropaneTag) {
          productFuelType = 'propane';
        } else {
          // Default to carburetor if not specified
          productFuelType = 'carburetor';
        }
        
        if (!filters.fuelDelivery.includes(productFuelType)) {
          return false;
        }
      }

      // Drive type filter
      if (filters.driveTypes.length > 0) {
        // Check if product has drive type information
        let productDriveType: string | null = null;
        
        // Check product tags for drive type
        const jetTags = ['jet', 'jet-drive', 'jetdrive'];
        const propTags = ['prop', 'propeller', 'prop-drive'];
        
        const hasJetTag = product.tags.some(tag => 
          jetTags.includes(tag.toLowerCase())
        );
        const hasPropTag = product.tags.some(tag => 
          propTags.includes(tag.toLowerCase())
        );
        
        if (hasJetTag) {
          productDriveType = 'jet';
        } else if (hasPropTag) {
          productDriveType = 'prop';
        } else {
          // Default to prop if not specified
          productDriveType = 'prop';
        }
        
        if (!filters.driveTypes.includes(productDriveType)) {
          return false;
        }
      }

      // Shaft length filter
      if (filters.shaftLengths.length > 0) {
        // Check if product has shaft length variants
        const productShaftLengths = product.variants
          .filter(v => {
            // Look for shaft length in option name
            const optionName = v.option1Name?.toLowerCase() || '';
            return (optionName.includes('shaft') || optionName.includes('length')) && v.option1Value;
          })
          .map(v => {
            // Normalize shaft length values for filtering
            if (!v.option1Value) return null;
            const value = v.option1Value.toLowerCase();
            if (value.includes('15') || value.includes('short')) return '15"';
            if (value.includes('20') || value.includes('long')) return '20"';
            if (value.includes('25') || value.includes('extra')) return '25"';
            // Handle exact matches
            if (value === '15"' || value === '15') return '15"';
            if (value === '20"' || value === '20') return '20"';
            if (value === '25"' || value === '25') return '25"';
            return null;
          })
          .filter(length => length !== null);
        
        // If no shaft lengths found on product, skip filtering
        if (productShaftLengths.length === 0) {
          return true; // Don't filter out products without shaft length options
        }
        
        const hasMatchingShaft = productShaftLengths.some(length => 
          filters.shaftLengths.includes(length)
        );
        
        if (!hasMatchingShaft) {
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
  }, [filters.brands, filters.minPrice, filters.maxPrice, filters.minHorsepower, filters.maxHorsepower, filters.shaftLengths, filters.driveTypes, filters.fuelDelivery, filters.fuelTank, filters.starting, filters.steering, filters.trimTilt, filters.conditions, filters.inStockOnly, filters.onSaleOnly, filters.searchQuery, filters.sortBy]);

  // Reset to page 1 when results per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.resultsPerPage]);


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
        const optionName = variant.option1Name?.toLowerCase() || '';
        if ((optionName.includes('shaft') || optionName.includes('length')) && variant.option1Value) {
          const value = variant.option1Value.toLowerCase();
          if (value.includes('15') || value.includes('short')) {
            shaftLengthsSet.add('15"');
          } else if (value.includes('20') || value.includes('long')) {
            shaftLengthsSet.add('20"');
          } else if (value.includes('25') || value.includes('extra')) {
            shaftLengthsSet.add('25"');
          }
          // Handle exact matches
          else if (value === '15"' || value === '15') {
            shaftLengthsSet.add('15"');
          } else if (value === '20"' || value === '20') {
            shaftLengthsSet.add('20"');
          } else if (value === '25"' || value === '25') {
            shaftLengthsSet.add('25"');
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
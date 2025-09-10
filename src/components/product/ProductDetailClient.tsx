'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data/products';
import { useCart } from '@/contexts/CartContext';
import { StarIcon } from '@heroicons/react/20/solid';
import LiftGateModal from '@/components/ui/LiftGateModal';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface ProductDetailClientProps {
  product: Product;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem, setIsOpen } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [showLiftGateModal, setShowLiftGateModal] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex];
  const price = selectedVariant?.price || 0;
  const comparePrice = selectedVariant?.compareAtPrice || price;
  const hasDiscount = comparePrice > price;
  const discountPercent = hasDiscount ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  // Debug: Log available specs
  if (typeof window !== 'undefined') {
    console.log('Product specs available:', Object.keys(product.specs || {}));
    console.log('Full specs object:', product.specs);
  }

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Fetch products from the same brand or similar horsepower
        const response = await fetch('/api/products?limit=8');
        if (response.ok) {
          const allProducts: Product[] = await response.json();
          
          // Filter out current product and get related ones
          const filtered = allProducts
            .filter(p => p.id !== product.id)
            .sort((a, b) => {
              // Priority: same brand, then similar horsepower
              const aBrandMatch = a.brand === product.brand ? 1 : 0;
              const bBrandMatch = b.brand === product.brand ? 1 : 0;
              
              if (aBrandMatch !== bBrandMatch) return bBrandMatch - aBrandMatch;
              
              // Then by horsepower similarity
              const aHpDiff = Math.abs(a.horsepower - product.horsepower);
              const bHpDiff = Math.abs(b.horsepower - product.horsepower);
              return aHpDiff - bHpDiff;
            })
            .slice(0, 4); // Take first 4 results
            
          setRelatedProducts(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      }
    };
    
    fetchRelatedProducts();
  }, [product.id, product.brand, product.horsepower]);


  const handleAddToCart = () => {
    if (!selectedVariant || !product.inStock) return;

    setIsAdding(true);
    
    // Add the main product
    addItem({
      id: `${product.id}-${selectedVariantIndex}`,
      productId: product.id,
      variantId: selectedVariant.id,
      productType: 'motor',
      name: `${product.title} - ${selectedVariant.option1Value || 'Standard'}`,
      price: price,
      quantity: 1,
      image: product.images[0]?.src || '/placeholder-motor.svg',
    });


    setTimeout(() => {
      setIsAdding(false);
      setIsOpen(true);
    }, 500);
  };

  // 3-tab structure combining specification categories
  const tabCategories = [
    {
      id: 'overview',
      title: 'Overview & Engine',
      categories: [
        {
          title: 'Basic Information',
          specs: ['Horsepower', 'Brand', 'Model', 'SKU', 'Type', 'Power Category', 'Condition', 'Stock Status']
        },
        {
          title: 'Engine Specifications', 
          specs: ['Displacement', 'Engine Type', 'Cooling System', 'Ignition', 'Starting System', 'Fuel Induction System', 'Compression Ratio', 'Bore x Stroke']
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical & Performance',
      categories: [
        {
          title: 'Physical Dimensions & Weight',
          specs: ['Weight', 'Shaft Length']
        },
        {
          title: 'Performance & Mechanical',
          specs: ['Gear Ratio', 'Propeller', 'Tilt Positions', 'Power Trim & Tilt']
        },
        {
          title: 'Fuel & Lubrication',
          specs: ['Fuel Type', 'Recommended Oil', 'Lubrication System']
        }
      ]
    },
    {
      id: 'features',
      title: 'Features & Service',
      categories: [
        {
          title: 'Controls & Features',
          specs: ['Controls', 'Throttle Control', 'Steering', 'Shift System']
        },
        {
          title: 'Warranty & Service',
          specs: ['Warranty Period', 'Extended Warranty Available']
        }
      ]
    }
  ];

  // Get specification value function from compare page
  const getSpecValue = (product: Product, key: string): string => {
    if (key === 'Horsepower') return product.horsepower > 0 ? `${product.horsepower} HP` : '';
    if (key === 'Brand') return product.brand || '';
    if (key === 'Model') return product.title || '';
    if (key === 'SKU') return product.variants[0]?.sku || '';
    if (key === 'Type') return product.type || '';
    if (key === 'Power Category') return product.powerCategory ? product.powerCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') : '';
    if (key === 'Condition') return (product.condition || 'new').charAt(0).toUpperCase() + (product.condition || 'new').slice(1);
    if (key === 'Stock Status') return product.inStock ? 'In Stock' : 'Out of Stock';
    if (key === 'Weight') return product.variants[0]?.weight && product.variants[0].weight > 0 ? `${product.variants[0].weight} ${product.variants[0].weightUnit || 'lbs'}` : product.specs?.['Weight'] || product.specs?.['weight'] || product.specs?.['weight_lbs'] || '';
    if (key === 'Shaft Length') return product.variants[0]?.option1Name?.toLowerCase().includes('shaft') ? product.variants[0].option1Value || '' : product.specs?.['Shaft Length'] || product.specs?.['shaft_length'] || product.specs?.['Physical.shaft_length'] || '';
    
    // Try multiple key variations for specs lookup
    return product.specs?.[key] || 
           product.specs?.[key.toLowerCase()] || 
           product.specs?.[key.replace(/ /g, '_')] || 
           product.specs?.[key.replace(/ /g, '_').toLowerCase()] ||
           product.specs?.[key.replace(/\s+/g, '')] ||
           product.specs?.[key.replace(/\s+/g, '').toLowerCase()] ||
           '';
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Inventory', href: '/inventory' },
    { label: product.title }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-32 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            {product.images.length > 0 ? (
              <>
                {/* Main large image with navigation arrows */}
                <div className="relative aspect-square w-full overflow-hidden bg-white">
                  <Image
                    src={product.images[selectedImageIndex]?.src || '/placeholder-motor.svg'}
                    alt={product.images[selectedImageIndex]?.alt || product.title}
                    width={800}
                    height={800}
                    className="h-full w-full object-contain object-center p-8"
                    unoptimized
                  />
                  
                  {/* Left Arrow */}
                  {product.images.length > 1 && (
                    <button
                      onClick={() => setSelectedImageIndex((prev) => 
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-all duration-200 hover:scale-105"
                      aria-label="Previous image"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Right Arrow */}
                  {product.images.length > 1 && (
                    <button
                      onClick={() => setSelectedImageIndex((prev) => 
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-all duration-200 hover:scale-105"
                      aria-label="Next image"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  
                  {/* Image counter */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImageIndex + 1} / {product.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail images */}
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {product.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={classNames(
                        index === selectedImageIndex
                          ? 'ring-2 ring-gray-900'
                          : 'ring-1 ring-gray-300 hover:ring-gray-400',
                        'relative aspect-square overflow-hidden rounded-lg bg-gray-50 transition-all duration-200'
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt || `${product.title} view ${index + 1}`}
                        width={200}
                        height={200}
                        className="h-full w-full object-contain object-center p-2"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-200">
                <Image
                  src="/placeholder-motor.svg"
                  alt={product.title}
                  width={800}
                  height={800}
                  className="h-full w-full object-contain object-center p-8"
                />
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="mt-10 lg:mt-0 lg:pl-24 lg:border-l lg:border-gray-200">
            {/* Product title and brand */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight text-deep-blue sm:text-4xl lg:text-5xl">{product.title}</h1>
              
              {/* Reviews */}
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className="h-6 w-6 text-gray-300"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-lg text-gray-500">No reviews yet</span>
                <span className="text-gray-300">|</span>
                <button className="text-lg text-blue-600 hover:text-blue-700 font-medium">
                  Write a review
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8 p-6">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-deep-blue lg:text-5xl">
                  ${price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      ${comparePrice.toLocaleString()}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="mt-4">
                {product.inStock && selectedVariant?.inventory > 0 ? (
                  <p className="text-sm font-medium text-green-700">
                    In Stock ({selectedVariant?.inventory} available)
                  </p>
                ) : (
                  <p className="text-sm font-medium text-red-700">Out of Stock</p>
                )}
              </div>
              
              {/* Free Shipping Badge */}
              <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold text-green-700">FREE SHIPPING to Lower 48 States</span>
              </div>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-deep-blue mb-4">
                  {product.variants[0]?.option1Name || 'Configuration'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.variants.map((variant, index) => (
                    <label
                      key={variant.id}
                      className={classNames(
                        variant.available
                          ? 'cursor-pointer bg-white hover:bg-gray-50 border-gray-200'
                          : 'cursor-not-allowed bg-gray-50 text-gray-400 border-gray-200',
                        index === selectedVariantIndex ? 'ring-2 ring-deep-blue border-deep-blue bg-blue-50' : '',
                        'relative flex items-center justify-between rounded-xl border p-4 text-sm font-medium transition-all duration-200 focus:outline-none shadow-sm'
                      )}
                    >
                      <input
                        type="radio"
                        name="variant"
                        value={variant.id}
                        checked={index === selectedVariantIndex}
                        onChange={() => setSelectedVariantIndex(index)}
                        disabled={!variant.available}
                        className="sr-only"
                      />
                      <span className="text-deep-blue">
                        {variant.option1Value || `Variant ${index + 1}`}
                      </span>
                      {variant.price && variant.price !== price && (
                        <span className="text-deep-blue font-semibold">
                          ${variant.price.toLocaleString()}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-deep-blue mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Lift Gate Info Link */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <button
                onClick={() => setShowLiftGateModal(true)}
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Need a lift gate for delivery?</span>
                <span className="text-sm text-blue-600 ml-auto">Learn more →</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding || !selectedVariant?.available}
                className={classNames(
                  product.inStock && selectedVariant?.available && !isAdding
                    ? 'bg-deep-blue hover:bg-[#0a3a6e] shadow-lg hover:shadow-xl'
                    : isAdding
                    ? 'bg-green-600 shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed',
                  'w-full flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-deep-blue focus:ring-offset-2'
                )}
              >
                {isAdding ? '✓ Added to Cart' : !product.inStock ? 'Out of Stock' : 'Add to Cart'}
              </button>

              
            </div>

          </div>
        </div>

        {/* Specifications Tabs */}
        <div className="mt-16">
          <div className="space-y-8">
            {/* Tabbed Product Information */}
            <div className="mb-8">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex justify-center space-x-12">
                  {tabCategories.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={classNames(
                        activeTab === tab.id
                          ? 'text-deep-blue border-deep-blue'
                          : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300',
                        'whitespace-nowrap py-4 px-6 border-b-2 font-bold text-xl uppercase transition-colors'
                      )}
                    >
                      {tab.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  {tabCategories.map((tab) => (
                    activeTab === tab.id && (
                      <div key={tab.id} className="w-full">
                        <div className="text-center mb-8">
                          <h2 className="text-2xl font-bold text-deep-blue">{tab.title}</h2>
                        </div>
                            
                            {/* Mobile: Single column layout */}
                            <div className="lg:hidden overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-slate-800">
                                    <th className="text-left p-4 font-semibold text-white min-w-[200px]">
                                      
                                    </th>
                                    <th className="text-left p-4 font-semibold text-white min-w-[250px]">
                                      
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tab.categories.map((category) => (
                                    <React.Fragment key={category.title}>
                                      <tr className="bg-slate-800">
                                        <td colSpan={2} className="p-4 font-bold text-white text-lg text-center">
                                          {category.title}
                                        </td>
                                      </tr>
                                      {category.specs.map((spec, specIndex) => {
                                        const value = getSpecValue(product, spec);
                                        const displayValue = value || '-';
                                        return (
                                          <tr key={spec} className={`${specIndex % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600'}`}>
                                            <td className="p-4 font-medium text-gray-300">
                                              {spec}
                                            </td>
                                            <td className="p-4 text-white font-medium">
                                              {displayValue}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </React.Fragment>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* Desktop: Two separate tables with gap */}
                            <div className="hidden lg:block">
                              <div className="flex justify-between gap-12">
                                {/* Left Table - Basic Information */}
                                <div className="flex-1 bg-slate-700 rounded-lg overflow-hidden">
                                  <div className="bg-slate-800 px-6 py-4">
                                    <h3 className="text-lg font-bold text-white text-center">{tab.categories[0]?.title}</h3>
                                  </div>
                                  <div className="overflow-x-auto">
                                    <table className="w-full">
                                      <thead>
                                        <tr className="bg-slate-800">
                                          <th className="text-left p-4 font-semibold text-white">
                                            
                                          </th>
                                          <th className="text-left p-4 font-semibold text-white">
                                            
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {tab.categories[0]?.specs.map((spec, specIndex) => {
                                          const value = getSpecValue(product, spec);
                                          const displayValue = value || '-';
                                          return (
                                            <tr key={spec} className={`${specIndex % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600'}`}>
                                              <td className="p-4 font-medium text-gray-300">
                                                {spec}
                                              </td>
                                              <td className="p-4 text-white font-medium">
                                                {displayValue}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                {/* Right Table - Engine Specifications */}
                                <div className="flex-1 bg-slate-700 rounded-lg overflow-hidden">
                                  <div className="bg-slate-800 px-6 py-4">
                                    <h3 className="text-lg font-bold text-white text-center">{tab.categories[1]?.title}</h3>
                                  </div>
                                  <div className="overflow-x-auto">
                                    <table className="w-full">
                                      <thead>
                                        <tr className="bg-slate-800">
                                          <th className="text-left p-4 font-semibold text-white">
                                            
                                          </th>
                                          <th className="text-left p-4 font-semibold text-white">
                                            
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {tab.categories[1]?.specs.map((spec, specIndex) => {
                                          const value = getSpecValue(product, spec);
                                          const displayValue = value || '-';
                                          return (
                                            <tr key={spec} className={`${specIndex % 2 === 0 ? 'bg-slate-700' : 'bg-slate-600'}`}>
                                              <td className="p-4 font-medium text-gray-300">
                                                {spec}
                                              </td>
                                              <td className="p-4 text-white font-medium">
                                                {displayValue}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section - Outside main container */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Divider with centered text */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 py-2 text-2xl font-bold text-deep-blue">
                You May Also Like
              </span>
            </div>
          </div>

          {/* Related Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Related products from actual inventory */}
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id} 
                  href={`/inventory/${relatedProduct.slug}`}
                  className="p-6 hover:bg-gray-50 rounded-lg transition-all duration-200 h-full flex flex-col"
                >
                  <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                    <Image
                      src={relatedProduct.images[0]?.src || '/placeholder-motor.svg'}
                      alt={relatedProduct.title}
                      width={200}
                      height={200}
                      className="object-contain p-4"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-deep-blue mb-3 line-clamp-2 leading-tight flex-grow">
                    {relatedProduct.title}
                  </h4>
                  <p className="text-lg font-bold text-deep-blue mb-4">
                    ${relatedProduct.priceRange.min.toLocaleString()}
                    {relatedProduct.priceRange.min !== relatedProduct.priceRange.max && 
                      ` - $${relatedProduct.priceRange.max.toLocaleString()}`}
                  </p>
                  <div className="w-full bg-deep-blue hover:bg-[#0a3a6e] text-white text-sm font-medium py-3 px-4 transition-colors text-center mt-auto">
                    View Details
                  </div>
                </Link>
              ))
            ) : (
              // Fallback content while loading or if no related products
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Loading related products...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-xs font-semibold text-gray-800 mb-2">Important Notice</h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong>Disclaimer:</strong> Images displayed on this site are for illustrative purposes only and may not accurately reflect the exact boat or outboard model available. Specifications, features, and configurations can vary. We strongly recommend reviewing all details with a member of our sales team to ensure clarity before purchase or deposit.
          </p>
        </div>
      </div>
      
      {/* Lift Gate Modal */}
      <LiftGateModal
        isOpen={showLiftGateModal}
        onClose={() => setShowLiftGateModal(false)}
      />
    </div>
  );
}
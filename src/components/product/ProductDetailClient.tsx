'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductSpecifications from './ProductSpecifications';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid';

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
  const [activeTab, setActiveTab] = useState('highlights');

  const selectedVariant = product.variants[selectedVariantIndex];
  const price = selectedVariant?.price || 0;
  const comparePrice = selectedVariant?.compareAtPrice || price;
  const hasDiscount = comparePrice > price;
  const discountPercent = hasDiscount ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;


  const handleAddToCart = () => {
    if (!selectedVariant || !product.inStock) return;

    setIsAdding(true);
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

  // Extract highlights from Shopify metafields and computed values
  const highlights = [
    product.horsepower > 0 ? `${product.horsepower} HP Power Output` : null,
    product.specs['engine.stroke_type'],
    product.specs['physical.weight_lbs'] ? `${product.specs['physical.weight_lbs']} lbs Weight` : null,
    product.specs['Physical.shaft_length'],
    product.specs['features.starting'] ? `${product.specs['features.starting']} Start` : null,
    product.specs['compliance.carb'],
    product.specs['fuel.runtime'],
  ].filter(Boolean);

  // Extract features dynamically from Shopify metafields
  const getFeatures = () => {
    const features = [];
    
    // Engine features
    if (product.specs['engine.stroke_type']) {
      features.push(`${product.specs['engine.stroke_type']} Engine Technology`);
    }
    if (product.specs['engine.ignition']) {
      features.push(product.specs['engine.ignition']);
    }
    if (product.specs['engine.displacement']) {
      features.push(`${product.specs['engine.displacement']} Displacement`);
    }
    if (product.specs['engine.cylinders']) {
      features.push(`${product.specs['engine.cylinders']} Cylinder${product.specs['engine.cylinders'] !== '1' ? 's' : ''}`);
    }
    
    // Physical features
    if (product.specs['physical.weight_lbs']) {
      features.push(`Lightweight - Only ${product.specs['physical.weight_lbs']} lbs`);
    }
    if (product.specs['Physical.shaft_length']) {
      features.push(`${product.specs['Physical.shaft_length']} Shaft Length`);
    }
    
    // Operational features
    if (product.specs['features.starting']) {
      features.push(`${product.specs['features.starting']} Starting System`);
    }
    if (product.specs['features.steering']) {
      features.push(`${product.specs['features.steering']} Steering Control`);
    }
    
    // Fuel system features
    if (product.specs['fuel.tank_type']) {
      features.push(`${product.specs['fuel.tank_type']} Fuel Tank`);
    }
    if (product.specs['fuel.runtime']) {
      features.push(`${product.specs['fuel.runtime']} Runtime Capacity`);
    }
    if (product.specs['fuel.type']) {
      features.push(`Runs on ${product.specs['fuel.type']}`);
    }
    
    // Mechanical features
    if (product.specs['mechanical.propeller']) {
      features.push(product.specs['mechanical.propeller']);
    }
    
    // Compliance features
    if (product.specs['compliance.carb']) {
      features.push(`${product.specs['compliance.carb']} Environmental Rating`);
    }
    if (product.specs['compliance.epa']) {
      features.push(`${product.specs['compliance.epa']} Certified`);
    }
    
    return features;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <ol role="list" className="mx-auto flex max-w-7xl items-center space-x-2 px-4 py-4 sm:px-6 lg:px-8">
          <li>
            <div className="flex items-center">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-deep-blue transition-colors">
                Home
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <Link href="/inventory" className="text-sm font-medium text-gray-600 hover:text-deep-blue transition-colors">
                Inventory
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
            </div>
          </li>
          <li className="text-sm font-medium text-gray-900">{product.title}</li>
        </ol>
      </nav>

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
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">{product.title}</h1>
              
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
                <span className="text-4xl font-bold text-gray-900 lg:text-5xl">
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
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
                      <span className="text-gray-900">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
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

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="space-y-8">
            {/* Tabbed Product Information */}
            <div className="mb-8">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-12 justify-center">
                  {[
                    { id: 'highlights', name: 'Product Highlights' },
                    { id: 'features', name: 'Features' },
                    { id: 'specs', name: 'Specifications' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={classNames(
                        activeTab === tab.id
                          ? 'text-black'
                          : 'text-black hover:text-gray-500',
                        'whitespace-nowrap py-4 px-6 text-xl font-bold uppercase transition-colors'
                      )}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Highlights Tab */}
                {activeTab === 'highlights' && (
                  <div className="flex justify-center">
                    <div className="p-6 w-full max-w-3xl">
                      {highlights.length > 0 ? (
                        <ul className="space-y-3">
                        {highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <span className="h-5 w-5 text-gray-700 mr-3 mt-1 flex-shrink-0 font-bold">•</span>
                            <span className="text-base text-gray-700 leading-relaxed font-medium">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      ) : (
                        <p className="text-gray-600 text-base text-center">Product highlights will be available soon.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                  <div className="flex justify-center">
                    <div className="p-6 w-full max-w-4xl">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getFeatures().map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="h-5 w-5 text-gray-700 mr-3 mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-base text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Specifications Tab */}
                {activeTab === 'specs' && (
                  <div className="flex justify-center">
                    <div className="w-full max-w-4xl">
                      <ProductSpecifications 
                        product={product}
                        selectedVariant={selectedVariant}
                      />
                    </div>
                  </div>
                )}
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
              <span className="bg-white px-6 py-2 text-2xl font-bold text-gray-900">
                You May Also Like
              </span>
            </div>
          </div>

          {/* Related Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Related products based on same brand or similar HP */}
            {[
              {
                title: `${product.brand} ${product.horsepower + 2.5} HP Outboard`,
                price: Math.round(price * 1.3),
                image: '/placeholder-motor.svg'
              },
              {
                title: `${product.brand} ${Math.max(2.5, product.horsepower - 2.5)} HP Outboard`,
                price: Math.round(price * 0.8),
                image: '/placeholder-motor.svg'
              },
              {
                title: `${product.horsepower} HP Propeller Package`,
                price: Math.round(price * 0.2),
                image: '/placeholder-motor.svg'
              },
              {
                title: `${product.brand} Service Kit`,
                price: Math.round(price * 0.15),
                image: '/placeholder-motor.svg'
              }
            ].map((relatedItem, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src={relatedItem.image}
                    alt={relatedItem.title}
                    width={200}
                    height={200}
                    className="object-contain p-4"
                  />
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {relatedItem.title}
                </h4>
                <p className="text-lg font-bold text-gray-900 mb-4">
                  ${relatedItem.price.toLocaleString()}
                </p>
                <button className="w-full bg-deep-blue hover:bg-[#0a3a6e] text-white text-sm font-medium py-3 px-4 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
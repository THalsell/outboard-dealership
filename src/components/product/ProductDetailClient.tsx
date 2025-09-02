'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductSpecifications from './ProductSpecifications';
import { StarIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

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

  const selectedVariant = product.variants[selectedVariantIndex];
  const price = selectedVariant?.price || 0;
  const comparePrice = selectedVariant?.compareAtPrice || price;
  const hasDiscount = comparePrice > price;
  const discountPercent = hasDiscount ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;

  // Mock reviews - you can replace with real data later
  const reviews = { href: '#', average: 4.5, totalCount: 23 };

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

  // Extract key highlights from specs and tags
  const highlights = [
    product.horsepower > 0 ? `${product.horsepower} HP Power Output` : null,
    product.specs['engine.stroke_type'] || null,
    product.specs['physical.weight_lbs'] ? `${product.specs['physical.weight_lbs']} lbs Weight` : null,
    product.specs['compliance.carb'] || null,
    product.specs['fuel.runtime'] || null,
    ...product.tags.slice(0, 3),
  ].filter(Boolean);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
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
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            {product.images.length > 0 ? (
              <>
                {/* Main large image */}
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-200">
                  <Image
                    src={product.images[selectedImageIndex]?.src || '/placeholder-motor.svg'}
                    alt={product.images[selectedImageIndex]?.alt || product.title}
                    width={800}
                    height={800}
                    className="h-full w-full object-contain object-center p-8"
                    unoptimized
                  />
                </div>

                {/* Thumbnail images */}
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {product.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={classNames(
                        index === selectedImageIndex
                          ? 'ring-2 ring-deep-blue shadow-lg'
                          : 'ring-1 ring-gray-200 hover:ring-gray-300',
                        'relative aspect-square overflow-hidden rounded-xl bg-white transition-all duration-200 hover:shadow-md'
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
          <div className="mt-10 lg:mt-0">
            {/* Product title and brand */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-deep-blue uppercase tracking-wide">{product.brand}</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-2">{product.title}</h1>
              
              {/* Reviews */}
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{reviews.average} ({reviews.totalCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-gray-900">
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
                  <div className="flex items-center text-sm">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 font-medium text-green-700">
                      ✓ In Stock ({selectedVariant?.inventory} available)
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center text-sm">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 font-medium text-red-700">Out of Stock</p>
                  </div>
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

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding || !selectedVariant?.available}
                className={classNames(
                  product.inStock && selectedVariant?.available && !isAdding
                    ? 'bg-deep-blue hover:bg-deep-blue/90 shadow-lg hover:shadow-xl'
                    : isAdding
                    ? 'bg-green-600 shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed',
                  'w-full flex items-center justify-center rounded-xl px-8 py-4 text-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-deep-blue focus:ring-offset-2'
                )}
              >
                {isAdding ? '✓ Added to Cart' : !product.inStock ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center rounded-xl border-2 border-deep-blue bg-white px-8 py-4 text-lg font-semibold text-deep-blue hover:bg-deep-blue hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-deep-blue focus:ring-offset-2"
              >
                Contact for Quote
              </button>
            </div>

          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-2 h-2 bg-deep-blue rounded-full"></div>
                      <span className="ml-3 text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
              <ProductSpecifications 
                product={product}
                selectedVariant={selectedVariant}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
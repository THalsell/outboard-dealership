'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data/products';
import { useCart } from '@/contexts/CartContext';
import ProductImageGallery from './ProductImageGallery';
import ProductVariantSelector from './ProductVariantSelector';
import ProductSpecifications from './ProductSpecifications';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem, setIsOpen } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

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
      productType: 'motor',
      name: `${product.title} - ${selectedVariant.option1Value || 'Standard'}`,
      price: price,
      quantity: 1,
      image: product.images[0]?.src || '/placeholder-motor.svg',
      type: 'motor',
    });

    setTimeout(() => {
      setIsAdding(false);
      setIsOpen(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-600 hover:text-deep-blue">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/inventory" className="text-gray-600 hover:text-deep-blue">Inventory</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery 
              images={product.images} 
              title={product.title}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <div className="text-sm text-professional-gray font-medium tracking-wider uppercase mb-2">
                {product.brand}
              </div>
              <h1 className="text-3xl font-bold text-charcoal mb-4">
                {product.title}
              </h1>
              
              {/* Power Category Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.powerCategory === 'portable' ? 'bg-green-100 text-green-700' :
                  product.powerCategory === 'mid-range' ? 'bg-blue-100 text-blue-700' :
                  product.powerCategory === 'high-performance' ? 'bg-purple-100 text-purple-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {product.powerCategory.replace('-', ' ').toUpperCase()}
                </span>
                {product.horsepower > 0 && (
                  <span className="text-lg font-semibold text-charcoal">
                    {product.horsepower} HP
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              {hasDiscount ? (
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-charcoal">
                    ${price.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${comparePrice.toLocaleString()}
                  </span>
                  {discountPercent > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
              ) : product.priceRange.min !== product.priceRange.max ? (
                <span className="text-2xl font-bold text-charcoal">
                  ${product.priceRange.min.toLocaleString()} - ${product.priceRange.max.toLocaleString()}
                </span>
              ) : (
                <span className="text-3xl font-bold text-charcoal">
                  ${price.toLocaleString()}
                </span>
              )}

              {/* Stock Status */}
              <div className="mt-3">
                {product.inStock && selectedVariant?.inventory > 0 ? (
                  <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    In Stock ({selectedVariant?.inventory} available)
                  </span>
                ) : (
                  <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <ProductVariantSelector
                variants={product.variants}
                selectedIndex={selectedVariantIndex}
                onVariantChange={setSelectedVariantIndex}
              />
            )}

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding || !selectedVariant?.available}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                  isAdding 
                    ? 'bg-green-600 text-white' 
                    : (product.inStock && selectedVariant?.available)
                      ? 'bg-deep-blue hover:bg-deep-blue/90 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAdding ? '✓ Added to Cart' : 
                 !product.inStock ? 'Out of Stock' :
                 !selectedVariant?.available ? 'Variant Out of Stock' :
                 'Add to Cart'}
              </button>

              {/* Contact for Quote */}
              <button className="w-full py-3 px-6 border-2 border-deep-blue text-deep-blue rounded-lg font-semibold hover:bg-deep-blue hover:text-white transition-colors">
                Contact for Quote
              </button>
            </div>

            {/* Key Features */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-charcoal mb-3">Key Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {product.tags.slice(0, 5).map((tag, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Description & Specifications */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-6">Description</h2>
            <div className="prose max-w-none text-gray-600">
              <p className="whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <ProductSpecifications 
              product={product}
              selectedVariant={selectedVariant}
            />
          </div>
        </div>

        {/* Back to Inventory */}
        <div className="mt-12 text-center">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 text-deep-blue hover:text-deep-blue/80 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Motors
          </Link>
        </div>
      </div>
    </div>
  );
}
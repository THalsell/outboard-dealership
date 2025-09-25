"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import LiftGateModal from "@/components/ui/feedback/LiftGateModal";
import ProductSpecifications from "@/components/pages/product/ProductSpecifications";
import PriceDisplay from "@/components/ui/product/PriceDisplay";
import ProductCard from "@/components/ui/product/ProductCard";
import ProductCardSkeleton from "@/components/ui/product/ProductCardSkeleton";
import StockStatus from "@/components/ui/product/StockStatus";
import Icon from "@/components/ui/display/Icon";
import Button from "@/components/ui/forms/Button";
import { DEFAULT_BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";

interface ProductDetailClientProps {
  product: Product;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const { addItem, setIsOpen } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [showLiftGateModal, setShowLiftGateModal] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex];
  const price = selectedVariant?.price || 0;
  const comparePrice = selectedVariant?.compareAtPrice || price;


  // Debug: Log available specs
  if (typeof window !== "undefined") {
  }

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Fetch products from the same brand or similar horsepower
        const response = await fetch("/api/products?limit=8");
        if (response.ok) {
          const allProducts: Product[] = await response.json();

          // Filter out current product and get related ones
          const filtered = allProducts
            .filter((p) => p.id !== product.id)
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
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoadingRelated(false);
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
      productType: "motor",
      name: `${product.title} - ${selectedVariant.option1Value || "Standard"}`,
      price: price,
      quantity: 1,
      image: product.images[0]?.src || "/placeholder-motor.svg",
    });

    setTimeout(() => {
      setIsAdding(false);
      setIsOpen(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white -mt-20 sm:-mt-16 pt-24 sm:pt-20 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            {product.images.length > 0 ? (
              <>
                {/* Main large image with navigation arrows */}
                <div className="relative aspect-square w-full overflow-hidden bg-white">
                  <Image
                    src={
                      product.images[selectedImageIndex]?.src ||
                      "/placeholder-motor.svg"
                    }
                    alt={
                      product.images[selectedImageIndex]?.alt || product.title
                    }
                    width={800}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    placeholder="blur"
                    blurDataURL={DEFAULT_BLUR_PLACEHOLDER}
                    className="h-full w-full object-contain object-center p-8"
                  />

                  {/* Left Arrow */}
                  {product.images.length > 1 && (
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() =>
                        setSelectedImageIndex((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-all duration-200 hover:scale-105"
                      aria-label="Previous image"
                    >
                      <Icon name="chevronLeft" size="lg" />
                    </Button>
                  )}

                  {/* Right Arrow */}
                  {product.images.length > 1 && (
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() =>
                        setSelectedImageIndex((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-all duration-200 hover:scale-105"
                      aria-label="Next image"
                    >
                      <Icon name="chevronRight" size="lg" />
                    </Button>
                  )}

                  {/* Image counter */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-deep-blue px-3 py-1 rounded-full text-sm">
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
                          ? "ring-2 ring-gray-900"
                          : "ring-1 ring-gray-300 hover:ring-gray-400",
                        "relative aspect-square overflow-hidden rounded-lg bg-gray-200 transition-all duration-200"
                      )}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt || `${product.title} view ${index + 1}`}
                        width={200}
                        height={200}
                        sizes="200px"
                        placeholder="blur"
                        blurDataURL={DEFAULT_BLUR_PLACEHOLDER}
                        className="h-full w-full object-contain object-center p-2"
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
                  placeholder="blur"
                  blurDataURL={DEFAULT_BLUR_PLACEHOLDER}
                  className="h-full w-full object-contain object-center p-8"
                />
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="mt-10 lg:mt-0 lg:pl-24 lg:border-l lg:border-gray-200">
            {/* Product title and brand */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight text-text-blue sm:text-4xl lg:text-5xl">
                {product.title}
              </h1>

            </div>

            {/* Price */}
            <div className="mb-8 p-6">
              <PriceDisplay
                price={price}
                comparePrice={comparePrice}
                variant="detail"
              />

              {/* Stock Status */}
              <div className="mt-4">
                <StockStatus
                  inStock={product.inStock && selectedVariant?.inventory > 0}
                  inventory={selectedVariant?.inventory}
                  size="sm"
                  variant="detail"
                />
              </div>

              {/* Free Shipping Badge */}
              <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                <Icon name="check" size="md" className="text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  FREE SHIPPING to Lower 48 States
                </span>
              </div>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-deep-blue mb-4">
                  {product.variants[0]?.option1Name || "Configuration"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.variants.map((variant, index) => (
                    <label
                      key={variant.id}
                      className={classNames(
                        variant.available
                          ? "cursor-pointer bg-white hover:bg-gray-50 border-gray-200"
                          : "cursor-not-allowed bg-gray-200 text-gray-400 border-gray-200",
                        index === selectedVariantIndex
                          ? "ring-2 ring-deep-blue border-deep-blue bg-blue-50"
                          : "",
                        "relative flex items-center justify-between rounded-xl border p-4 text-sm font-medium transition-all duration-200 focus:outline-none shadow-sm"
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
              <h3 className="text-xl font-semibold text-text-blue mb-3">
                Description
              </h3>
              <p className="text-text-blue leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Lift Gate Info Link */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLiftGateModal(true)}
                className="flex items-center gap-2 text-blue-700 hover:text-deep-blue font-medium"
              >
                <Icon name="questionMark" size="md" />
                <span>Need a lift gate for delivery?</span>
                <span className="text-sm text-blue-600 ml-auto">
                  Learn more →
                </span>
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={
                  !product.inStock || isAdding || !selectedVariant?.available
                }
                className={isAdding ? "bg-green-600 shadow-lg" : ""}
              >
                {isAdding
                  ? "✓ Added to Cart"
                  : !product.inStock
                  ? "Out of Stock"
                  : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <ProductSpecifications
            product={product}
            selectedVariant={selectedVariant}
          />
        </div>
      </div>

      {/* You May Also Like Section - Outside main container */}
      <div className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Divider with centered text */}
          <div className="relative mb-8 sm:mb-10 lg:mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 sm:px-6 py-2 text-xl sm:text-2xl font-bold text-deep-blue">
                You May Also Like
              </span>
            </div>
          </div>

          {/* Related Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {loadingRelated ? (
              // Show skeleton cards while loading
              Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : relatedProducts.length > 0 ? (
              relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))
            ) : (
              // Fallback content if no related products found
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No related products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-xs font-semibold text-blue-900 mb-2">
            Important Notice
          </h3>
          <p className="text-xs text-blue-900 leading-relaxed">
            <strong>Disclaimer:</strong> Images displayed on this site are for
            illustrative purposes only and may not accurately reflect the exact
            boat or outboard model available. Specifications, features, and
            configurations can vary. We strongly recommend reviewing all details
            with a member of our sales team to ensure clarity before purchase or
            deposit.
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

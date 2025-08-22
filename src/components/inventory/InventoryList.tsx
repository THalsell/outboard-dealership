"use client";

import Link from "next/link";
import Image from "next/image";
import { Motor } from "@/types/models/motor";
import { useCart } from "@/contexts/CartContext";
import { useFilter } from "@/contexts/FilterContext";
import { useState } from "react";

interface InventoryListProps {
  motors: Motor[];
  loading?: boolean;
}

function MotorListItem({ motor }: { motor: Motor }) {
  const { addItem, setIsOpen } = useCart();
  const { compareList, addToCompare, removeFromCompare } = useFilter();
  const [isAdding, setIsAdding] = useState(false);
  const discount = motor.salePrice
    ? Math.round(((motor.price - motor.salePrice) / motor.price) * 100)
    : 0;
  const isInCompare = compareList.includes(motor.id);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
          <Link href={`/inventory/${motor.id}`}>
            <Image
              src={motor.images[0] || "/placeholder-motor.svg/400/300"}
              alt={`${motor.brand} ${motor.model}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            {motor.salePrice && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                -{discount}%
              </div>
            )}
            {motor.bestSeller && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                Best Seller
              </div>
            )}
          </Link>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <Link href={`/inventory/${motor.id}`}>
                <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  {motor.brand} {motor.model}
                </h3>
              </Link>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-gray-600">{motor.year}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm font-semibold text-blue-600">
                  {motor.horsepower} HP
                </span>
                {motor.shaftLength && (
                  <>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600 capitalize">
                      {motor.shaftLength} shaft
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="text-right">
              {motor.salePrice ? (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${motor.salePrice.toLocaleString()}
                  </span>
                  <br />
                  <span className="text-lg text-gray-500 line-through">
                    ${motor.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ${motor.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {motor.rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(motor.rating!)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({motor.reviewCount})
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
            <div>
              <span className="font-medium text-gray-900">Condition:</span>
              <br />
              <span
                className={`capitalize px-2 py-1 rounded text-xs font-medium ${
                  motor.condition === "new"
                    ? "bg-green-100 text-green-800"
                    : motor.condition === "used"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {motor.condition === "certified-preowned"
                  ? "Certified"
                  : motor.condition}
              </span>
            </div>
            {motor.cylinders && (
              <div>
                <span className="font-medium text-gray-900">Cylinders:</span>
                <br />
                {motor.cylinders}
              </div>
            )}
            {motor.displacement && (
              <div>
                <span className="font-medium text-gray-900">Displacement:</span>
                <br />
                {motor.displacement}cc
              </div>
            )}
            <div>
              <span className="font-medium text-gray-900">Weight:</span>
              <br />
              {motor.weight} lbs
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {motor.inStock ? (
              <span className="text-sm text-green-600 font-medium">
                ✓ In Stock
              </span>
            ) : (
              <span className="text-sm text-red-600 font-medium">
                Out of Stock
              </span>
            )}
            {motor.stockQuantity > 0 && motor.stockQuantity <= 5 && (
              <span className="text-sm text-orange-600">
                Only {motor.stockQuantity} left!
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setIsAdding(true);
                addItem({
                  id: motor.id,
                  productId: motor.id, // Add this line
                  productType: "motor", // Add this line
                  name: `${motor.brand} ${motor.model}`,
                  price: motor.salePrice || motor.price,
                  quantity: 1,
                  image: motor.images[0] || "/placeholder-motor.svg",
                  type: "motor",
                });
                setTimeout(() => {
                  setIsAdding(false);
                  setIsOpen(true);
                }, 500);
              }}
              disabled={!motor.inStock || isAdding}
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                isAdding
                  ? "bg-green-600 text-white"
                  : motor.inStock
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              {isAdding
                ? "✓ Added!"
                : motor.inStock
                ? "Add to Cart"
                : "Out of Stock"}
            </button>
            <Link
              href={`/inventory/${motor.id}`}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              View Details
            </Link>
            <button
              onClick={() => {
                if (isInCompare) {
                  removeFromCompare(motor.id);
                } else {
                  addToCompare(motor.id);
                }
              }}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                isInCompare
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:bg-gray-50 text-gray-600"
              }`}
            >
              {isInCompare ? "✓ In Compare" : "Compare"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InventoryList({
  motors,
  loading = false,
}: InventoryListProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-64 h-48 bg-gray-200 animate-pulse" />
              <div className="flex-1 p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (motors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No motors found
        </h3>
        <p className="text-gray-600 mb-4">
          We couldn&apos;t find any motors matching your current filters.
        </p>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {motors.map((motor) => (
        <MotorListItem key={motor.id} motor={motor} />
      ))}
    </div>
  );
}

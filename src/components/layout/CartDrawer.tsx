"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const {
    items,
    total,
    itemCount,
    updateQuantity,
    removeItem,
    isOpen,
    setIsOpen,
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Redirect to Shopify checkout
        window.location.href = data.checkoutUrl;
      } else {
        console.error('Checkout error:', data.error);
        alert('Failed to create checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };


  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[90]"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[95] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Shopping Cart ({itemCount})</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Link
                href="/inventory"
                className="inline-block bg-deep-blue text-white px-6 py-2 rounded-lg hover:bg-[#0a3a6e] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <Image
                    src={item.image || "/placeholder-image.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {item.productType}
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      ${item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-xl">
                ${total.toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Shipping and taxes calculated at checkout
            </div>
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || items.length === 0}
                className="block w-full bg-deep-blue text-white text-center py-3 rounded-lg hover:bg-[#0a3a6e] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? 'Creating Checkout...' : 'Proceed to Checkout'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

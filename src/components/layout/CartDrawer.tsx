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
    addItem,
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
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-gray-200 last:border-0"
                >
                  {item.productType !== 'service' && (
                    <Image
                      src={item.image || "/placeholder-image.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    {item.productType === 'service' && item.name === 'Lift Gate Service' ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-gray-900">Lift Gate Service</h3>
                          <span className="font-semibold">${item.price}</span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              ${item.price.toLocaleString()} each
                            </p>
                            {item.productType === 'motor' && (
                              <p className="text-xs text-green-600 mt-1">✓ Free Shipping (Lower 48)</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
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
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-xl">
                ${total.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-600">--</span>
            </div>
            {items.some(item => item.productType === 'motor') && (
              <>
                {/* Lift Gate Option */}
                {!items.some(item => item.id === 'lift-gate-service') && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            addItem({
                              id: 'lift-gate-service',
                              productId: 'lift-gate',
                              variantId: 'lift-gate',
                              productType: 'service',
                              name: 'Lift Gate Service',
                              price: 99,
                              quantity: 1,
                            });
                          }
                        }}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900">
                          Add Lift Gate Service (+$99)
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          Hydraulic platform lowers motor to ground level. Recommended for residential delivery.
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </>
            )}
            <div className="text-sm text-gray-600 mb-4">
              {items.some(item => item.productType === 'motor') 
                ? 'Taxes calculated at checkout'
                : 'Shipping and taxes calculated at checkout'}
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

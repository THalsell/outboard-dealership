"use client";

import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import EmptyState from "@/components/ui/feedback/EmptyState";
import Icon from "@/components/ui/display/Icon";
import Button from "@/components/ui/forms/Button";
import { DEFAULT_BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";

export default function CartDrawer() {
  const {
    items,
    total,
    itemCount,
    updateQuantity,
    removeItem,
    clearCart,
    cleanServiceItems,
    isOpen,
    setIsOpen,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Clean service items when cart opens
  useEffect(() => {
    if (isOpen) {
      cleanServiceItems();
    }
  }, [isOpen, cleanServiceItems]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.success) {
        // Clear cart and ensure localStorage is updated immediately
        clearCart();
        localStorage.removeItem("cart");
        localStorage.setItem("cart", "[]");

        // Small delay to ensure localStorage changes are persisted
        setTimeout(() => {
          window.location.href = data.checkoutUrl;
        }, 100);
      } else {
        console.error("Checkout error:", data.error);
        alert("Failed to create checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to create checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[160]"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[170] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">
            Shopping Cart (
            <span aria-live="polite" aria-atomic="true">
              {itemCount}
            </span>
            )
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <Icon name="close" size="lg" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              actionHref="/inventory"
              actionOnClick={() => setIsOpen(false)}
            />
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-gray-200 last:border-0"
                >
                  {item.productType !== "service" && (
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder-image.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        sizes="80px"
                        placeholder="blur"
                        blurDataURL={DEFAULT_BLUR_PLACEHOLDER}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-deep-blue">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          ${item.price.toLocaleString()} each
                        </p>
                        {item.productType === "motor" && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ Free Shipping (Lower 48)
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
                        aria-label="Decrease quantity"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
                        aria-label="Increase quantity"
                      >
                        +
                      </Button>
                      <Button
                        variant="danger"
                        size="xs"
                        onClick={() => removeItem(item.id)}
                        className="ml-auto"
                      >
                        Remove
                      </Button>
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
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span
                className="font-bold text-xl"
                aria-live="polite"
                aria-atomic="true"
              >
                ${total.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-600">--</span>
            </div>
            {items.some((item) => item.productType === "motor") && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">📦 Shipping Note:</span> Lift
                  gate service available at checkout for residential deliveries
                </p>
              </div>
            )}
            <div className="text-sm text-gray-600 mb-4">
              {items.some((item) => item.productType === "motor")
                ? "Taxes calculated at checkout"
                : "Shipping and taxes calculated at checkout"}
            </div>
            <div className="space-y-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleCheckout}
                disabled={isCheckingOut || items.length === 0}
              >
                {isCheckingOut ? "Creating Checkout..." : "Proceed to Checkout"}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { CartItem } from "@/types/cart";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cleanServiceItems: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Force clear any existing cart data to remove old lift gate items
    localStorage.removeItem("cart");
    localStorage.setItem("cart", "[]");
    setItems([]);

    // Check if user just returned from Shopify checkout
    const urlParams = new URLSearchParams(window.location.search);
    const isCheckoutReturn =
      urlParams.has("shopify_checkout_action") ||
      window.location.pathname.includes("checkout") ||
      document.referrer.includes("shopify.com");

    if (isCheckoutReturn) {
      // Keep cart cleared if returning from checkout
      return;
    }

    // Only load saved cart if not returning from checkout and filter out service items
    const savedCart = localStorage.getItem("cart");
    if (savedCart && savedCart !== "[]") {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Filter out any service items (like old lift gate services) and lift gate specifically
        const validItems = parsedCart.filter(
          (item: CartItem) =>
            item.productType !== "service" &&
            !item.id.includes("lift-gate") &&
            item.id !== "lift-gate-service"
        );
        setItems(validItems);
      } catch {
        // If parsing fails, clear the cart
        localStorage.removeItem("cart");
        localStorage.setItem("cart", "[]");
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
    localStorage.setItem("cart", "[]");
  };

  // Add a helper function to clean service items
  const cleanServiceItems = useCallback(() => {
    setItems((prevItems) => {
      const validItems = prevItems.filter(
        (item) =>
          item.productType !== "service" &&
          !item.id.includes("lift-gate") &&
          item.id !== "lift-gate-service"
      );
      return validItems;
    });
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cleanServiceItems,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

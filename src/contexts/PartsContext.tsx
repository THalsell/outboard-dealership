'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PartsFilter, BulkOrderItem } from '@/types/models/part';

interface PartsContextType {
  filters: PartsFilter;
  updateFilter: <K extends keyof PartsFilter>(key: K, value: PartsFilter[K]) => void;
  resetFilters: () => void;
  bulkOrder: BulkOrderItem[];
  addToBulkOrder: (item: BulkOrderItem) => void;
  updateBulkOrderQuantity: (partId: string, quantity: number) => void;
  removeFromBulkOrder: (partId: string) => void;
  clearBulkOrder: () => void;
  getBulkOrderTotal: () => number;
  selectedMotorForParts: string | null;
  setSelectedMotorForParts: (motorId: string | null) => void;
}

const defaultFilters: PartsFilter = {
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 1000,
  isOEMOnly: false,
  inStockOnly: false,
  onSaleOnly: false,
  compatibleMotorId: undefined,
  searchQuery: '',
  sortBy: 'featured',
  viewMode: 'grid'
};

const PartsContext = createContext<PartsContextType | undefined>(undefined);

export function PartsProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<PartsFilter>(defaultFilters);
  const [bulkOrder, setBulkOrder] = useState<BulkOrderItem[]>([]);
  const [selectedMotorForParts, setSelectedMotorForParts] = useState<string | null>(null);

  const updateFilter = <K extends keyof PartsFilter>(
    key: K,
    value: PartsFilter[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ ...defaultFilters, compatibleMotorId: selectedMotorForParts || undefined });
  };

  const addToBulkOrder = (item: BulkOrderItem) => {
    setBulkOrder((prev) => {
      const existingIndex = prev.findIndex(i => i.partId === item.partId);
      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
          totalPrice: (updated[existingIndex].quantity + item.quantity) * item.unitPrice
        };
        return updated;
      } else {
        // Add new item
        return [...prev, item];
      }
    });
  };

  const updateBulkOrderQuantity = (partId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromBulkOrder(partId);
      return;
    }
    
    setBulkOrder((prev) =>
      prev.map((item) =>
        item.partId === partId
          ? { ...item, quantity, totalPrice: quantity * item.unitPrice }
          : item
      )
    );
  };

  const removeFromBulkOrder = (partId: string) => {
    setBulkOrder((prev) => prev.filter((item) => item.partId !== partId));
  };

  const clearBulkOrder = () => {
    setBulkOrder([]);
  };

  const getBulkOrderTotal = () => {
    return bulkOrder.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <PartsContext.Provider
      value={{
        filters,
        updateFilter,
        resetFilters,
        bulkOrder,
        addToBulkOrder,
        updateBulkOrderQuantity,
        removeFromBulkOrder,
        clearBulkOrder,
        getBulkOrderTotal,
        selectedMotorForParts,
        setSelectedMotorForParts
      }}
    >
      {children}
    </PartsContext.Provider>
  );
}

export function useParts() {
  const context = useContext(PartsContext);
  if (context === undefined) {
    throw new Error('useParts must be used within a PartsProvider');
  }
  return context;
}
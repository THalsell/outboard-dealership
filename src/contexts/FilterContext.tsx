'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterState {
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minHorsepower: number;
  maxHorsepower: number;
  shaftLengths: string[];
  conditions: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: string;
  viewMode: 'grid' | 'list';
  searchQuery: string;
}

interface FilterContextType {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
}

const defaultFilters: FilterState = {
  brands: [],
  minPrice: 0,
  maxPrice: 100000,
  minHorsepower: 0,
  maxHorsepower: 500,
  shaftLengths: [],
  conditions: [],
  inStockOnly: false,
  onSaleOnly: false,
  sortBy: 'featured',
  viewMode: 'grid',
  searchQuery: ''
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [compareList, setCompareList] = useState<string[]>([]);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const addToCompare = (id: string) => {
    if (compareList.length < 4 && !compareList.includes(id)) {
      setCompareList([...compareList, id]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter((item) => item !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateFilter,
        resetFilters,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterState {
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minHorsepower: number;
  maxHorsepower: number;
  shaftLengths: string[];
  driveTypes: string[];
  fuelDelivery: string[];
  fuelTank: string[];
  starting: string[];
  steering: string[];
  trimTilt: string[];
  conditions: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: string;
  viewMode: 'grid' | 'list';
  searchQuery: string;
  resultsPerPage: number;
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

const getDefaultFilters = (maxPrice = 100000, maxHorsepower = 500): FilterState => ({
  brands: [],
  minPrice: 0,
  maxPrice,
  minHorsepower: 0,
  maxHorsepower,
  shaftLengths: [],
  driveTypes: [],
  fuelDelivery: [],
  fuelTank: [],
  starting: [],
  steering: [],
  trimTilt: [],
  conditions: [],
  inStockOnly: false,
  onSaleOnly: false,
  sortBy: 'featured',
  viewMode: 'grid',
  searchQuery: '',
  resultsPerPage: 36
});

const defaultFilters = getDefaultFilters();

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
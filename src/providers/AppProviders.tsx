'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { FilterProvider } from '@/contexts/FilterContext';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <FilterProvider>
        {children}
      </FilterProvider>
    </CartProvider>
  );
}
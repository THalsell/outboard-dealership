'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { FilterProvider } from '@/contexts/FilterContext';
import { AppReadyProvider } from '@/contexts/AppReadyContext';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppReadyProvider>
      <CartProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </CartProvider>
    </AppReadyProvider>
  );
}
'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { FilterProvider } from '@/contexts/FilterContext';
import { PartsProvider } from '@/contexts/PartsContext';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <FilterProvider>
          <PartsProvider>
            {children}
          </PartsProvider>
        </FilterProvider>
      </CartProvider>
    </AuthProvider>
  );
}
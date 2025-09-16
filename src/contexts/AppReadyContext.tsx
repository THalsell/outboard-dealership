'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface AppReadyContextType {
  isNavigationReady: boolean;
  setNavigationReady: (ready: boolean) => void;
}

const AppReadyContext = createContext<AppReadyContextType | undefined>(undefined);

export function AppReadyProvider({ children }: { children: React.ReactNode }) {
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Mark navigation as ready after a short delay to ensure hydration
    const timer = setTimeout(() => {
      setIsNavigationReady(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const setNavigationReady = (ready: boolean) => {
    setIsNavigationReady(ready);
  };

  return (
    <AppReadyContext.Provider value={{ isNavigationReady, setNavigationReady }}>
      {children}
    </AppReadyContext.Provider>
  );
}

export function useAppReady() {
  const context = useContext(AppReadyContext);
  if (context === undefined) {
    throw new Error('useAppReady must be used within an AppReadyProvider');
  }
  return context;
}
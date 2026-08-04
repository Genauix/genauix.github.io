'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface LoaderContextType {
  registerAsset: () => void;
  resolveAsset: () => void;
  isReady: boolean;
}

export const LoaderContext = createContext<LoaderContextType>({
  registerAsset: () => {},
  resolveAsset: () => {},
  isReady: true,
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [pendingCount, setPendingCount] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);
  const pathname = usePathname();

  // Reset/re-trigger on path change if needed, though for now we just handle global load
  useEffect(() => {
    // When route changes, give child components a tick to register new assets
    setIsInitializing(true);
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 500); // 500ms window to register assets
    
    return () => clearTimeout(timer);
  }, [pathname]);

  const registerAsset = useCallback(() => {
    setPendingCount((prev) => prev + 1);
  }, []);

  const resolveAsset = useCallback(() => {
    setPendingCount((prev) => Math.max(0, prev - 1));
  }, []);

  // Ready when not in the initialization window, and all registered assets have resolved
  const isReady = !isInitializing && pendingCount === 0;

  return (
    <LoaderContext.Provider value={{ registerAsset, resolveAsset, isReady }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}

/**
 * Spline Scene Wrapper — Section 10.3 of the Blueprint
 * 
 * Lazy-loaded Spline viewer with Suspense boundary.
 * Automatically sets scene background to match the container on load.
 */
'use client';

import { Suspense, lazy, useCallback, useEffect } from 'react';
import { useLoader } from './loader-context';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (app: unknown) => void;
  /** Background color to set on the Spline scene. Defaults to --canvas (#0A0B0D).
   *  Pass the hex of the parent container's background so the scene blends. */
  bgColor?: string;
}

export function SplineScene({
  scene,
  className = '',
  onLoad,
  bgColor = '#0A0B0D',
}: SplineSceneProps) {
  const { registerAsset, resolveAsset } = useLoader();

  useEffect(() => {
    registerAsset();
  }, [registerAsset]);

  const handleLoad = useCallback((app: unknown) => {
    // Force the Spline scene background to match the container
    const splineApp = app as Record<string, unknown>;
    if (typeof splineApp.setBackgroundColor === 'function') {
      (splineApp as { setBackgroundColor: (color: string) => void }).setBackgroundColor(bgColor);
    }
    onLoad?.(app);
    resolveAsset();
  }, [onLoad, bgColor, resolveAsset]);

  return (
    <Suspense
      fallback={<div className={`w-full h-full ${className}`} />}
    >
      <Spline
        scene={scene}
        onLoad={handleLoad}
        className={className}
        style={{ width: '100%', height: '100%' }}
      />
    </Suspense>
  );
}

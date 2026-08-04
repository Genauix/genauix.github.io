/**
 * Top Progress Bar — Section 5.3 of the Blueprint
 * 
 * anime.js scaleX tween on route change.
 * --signal colored, 2px tall, fixed top.
 * Mirrors a calibration gauge filling.
 */
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function ProgressBar() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Start loading animation
    setIsNavigating(true);
    progress.set(0.3);

    const timer1 = setTimeout(() => progress.set(0.7), 100);
    const timer2 = setTimeout(() => {
      progress.set(1);
      setTimeout(() => {
        setIsNavigating(false);
        progress.set(0);
      }, 200);
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname, progress]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] origin-left"
      style={{
        height: 2,
        background: 'var(--signal)',
        scaleX,
        opacity: isNavigating ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.2 } }}
    />
  );
}

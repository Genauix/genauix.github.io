/**
 * Custom Magnetic Cursor — Section 5.1 of the Blueprint
 * 
 * Small orange dot (--signal), Motion useMotionValue + useSpring.
 * Scales 2.5× and goes hollow-ring over any link/button.
 * Disabled entirely on touch devices ((pointer: coarse) check).
 * Disabled when prefers-reduced-motion: reduce.
 * Never replaces visible :focus-visible states — additive only.
 */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const CURSOR_SIZE = 12;
const CURSOR_SCALE_HOVER = 2.5;

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Cursor spring — per Section 2.5, spring only for cursor + click micro-feedback
  const springX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.2 });

  useEffect(() => {
    // Section 5.1: disabled on touch devices + reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || reducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Track hover over interactive elements
  const checkHover = useCallback(() => {
    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]')
      ) {
        setIsHovering(true);
      }
    };

    const handleOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]')
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;
    return checkHover();
  }, [isEnabled, checkHover]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Hide default cursor when our custom cursor is active */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: springX,
          y: springY,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? CURSOR_SCALE_HOVER : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 },
          opacity: { duration: 0.15 },
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: isHovering ? 'transparent' : 'var(--signal)',
            border: isHovering ? '1.5px solid var(--signal)' : 'none',
            transition: 'background 150ms, border 150ms',
          }}
        />
      </motion.div>
    </>
  );
}

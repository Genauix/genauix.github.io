/**
 * Motion Variants — Section 2.5 of the Blueprint
 * 
 * Primary easing: cubic-bezier(0.16, 1, 0.3, 1) — decisive expo-out, no overshoot
 * Spring/bounce ONLY for: magnetic cursor pull + click micro-feedback
 * Durations: 120–180ms hover, 400–600ms reveals, 800ms+ hero entrance only
 */

import type { Transition, Variants } from 'motion/react';

// ============================================================
// EASING
// ============================================================

export const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ============================================================
// TRANSITIONS
// ============================================================

/** Default for 90% of motion on the site */
export const transitionDefault: Transition = {
  duration: 0.5,
  ease: EXPO_OUT,
};

/** Hover/press micro-feedback: 120–180ms */
export const transitionHover: Transition = {
  duration: 0.15,
  ease: EXPO_OUT,
};

/** Section reveals: 400–600ms */
export const transitionReveal: Transition = {
  duration: 0.5,
  ease: EXPO_OUT,
};

/** Hero entrance only: 800ms+ */
export const transitionHero: Transition = {
  duration: 0.8,
  ease: EXPO_OUT,
};

/** Route changes: 300ms crossfade + 12px settle */
export const transitionRoute: Transition = {
  duration: 0.3,
  ease: EXPO_OUT,
};

/** Spring — ONLY for cursor + click micro-feedback */
export const transitionSpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

/** Cursor spring — slightly softer for the magnetic pull */
export const transitionCursorSpring: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 15,
  mass: 0.2,
};

// ============================================================
// VARIANTS
// ============================================================

/** Fade + settle 12px from below — standard section reveal */
export const revealUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionReveal,
  },
};

/** Fade only — for route transitions */
export const fadeInOut: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitionRoute,
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: EXPO_OUT },
  },
};

/** Stagger container — for child elements */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Stagger child — each item */
export const staggerChild: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionReveal,
  },
};

/** Card hover — lift 4px + hairline brightens (per blueprint Section 6.1 item 4) */
export const cardHover = {
  rest: {
    y: 0,
    borderColor: 'rgba(255,255,255,0.08)',
    transition: transitionHover,
  },
  hover: {
    y: -4,
    borderColor: 'rgba(255,255,255,0.16)',
    transition: transitionHover,
  },
};

/** Scale on press — micro-feedback */
export const pressScale = {
  tap: { scale: 0.97 },
  hover: { scale: 1.03 },
};

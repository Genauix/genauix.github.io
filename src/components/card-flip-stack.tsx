/**
 * Card Flip Stack — Section 3 (kokonut.ui Card Flip Stack)
 * 
 * Testimonials card stack with auto-cycle and pause on hover/focus.
 * Named component per the blueprint — gives testimonials motion
 * without inventing a custom carousel.
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  org: string;
}

interface CardFlipStackProps {
  items: Testimonial[];
  autoPlayInterval?: number;
}

export function CardFlipStack({ items, autoPlayInterval = 5000 }: CardFlipStackProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, next, autoPlayInterval]);

  return (
    <div
      className="relative w-full max-w-lg mx-auto"
      style={{ minHeight: 280 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Stacked card shadows behind */}
      <div
        className="absolute inset-0 card-surface"
        style={{
          transform: 'translateY(8px) scale(0.95)',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0 card-surface"
        style={{
          transform: 'translateY(4px) scale(0.975)',
          opacity: 0.7,
        }}
      />

      {/* Active card */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          className="relative card-surface p-8 md:p-10"
          initial={{ opacity: 0, y: 20, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: 10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 800 }}
        >
          <blockquote
            className="mb-6"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--ink)',
            }}
          >
            &ldquo;{items[current].quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--surface-raised)',
                fontFamily: 'var(--font-mono-genauix)',
                fontSize: '12px',
                color: 'var(--signal)',
              }}
            >
              {items[current].author.charAt(0)}
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  margin: 0,
                }}
              >
                {items[current].author}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono-genauix)',
                  fontSize: '11px',
                  color: 'var(--ink-muted)',
                  margin: 0,
                }}
              >
                {items[current].role} · {items[current].org}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{
              background: i === current ? 'var(--signal)' : 'var(--ink-muted)',
              opacity: i === current ? 1 : 0.3,
            }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Blueprint Grid Overlay — Section 2.4 / 5.4 of the Blueprint
 * 
 * Hairline vertical guides at 12-col boundaries.
 * Corner coordinate ticks (mono, e.g. N 40.71° / SEC.04).
 * anime.js SVG line-draw via stroke-dashoffset.
 * Toggled on/off per section via onScroll.
 */
'use client';

import { useEffect, useRef, useState } from 'react';

interface BlueprintGridProps {
  sectionLabel?: string;
  showTicks?: boolean;
  className?: string;
}

export function BlueprintGrid({ sectionLabel = 'SEC.01', showTicks = true, className }: BlueprintGridProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !svgRef.current) return;

    // Animate SVG lines drawing in using native Web Animations API
    // (anime.js equivalent for SVG stroke-dashoffset)
    const lines = svgRef.current.querySelectorAll('.grid-line');
    lines.forEach((line, i) => {
      const length = (line as SVGLineElement).getTotalLength?.() || 1000;
      (line as SVGLineElement).style.strokeDasharray = `${length}`;
      (line as SVGLineElement).style.strokeDashoffset = `${length}`;

      line.animate(
        [
          { strokeDashoffset: `${length}` },
          { strokeDashoffset: '0' },
        ],
        {
          duration: 800,
          delay: i * 50,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards',
        }
      );
    });
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      {/* SVG grid lines */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        style={{ opacity: isVisible ? 0.4 : 0, transition: 'opacity 0.5s' }}
      >
        {/* 12-column vertical guides */}
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={i}
            className="grid-line"
            x1={`${(i / 12) * 100}%`}
            y1="0"
            x2={`${(i / 12) * 100}%`}
            y2="100%"
            stroke="var(--hairline)"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Corner coordinate ticks — Section 2.4 */}
      {showTicks && (
        <>
          {/* Top-left */}
          <span
            className="coordinate-tick absolute"
            style={{ top: 16, left: 16 }}
          >
            N 40.71°
          </span>

          {/* Top-right */}
          <span
            className="coordinate-tick absolute"
            style={{ top: 16, right: 16 }}
          >
            {sectionLabel}
          </span>

          {/* Bottom-left */}
          <span
            className="coordinate-tick absolute"
            style={{ bottom: 16, left: 16 }}
          >
            W 74.01°
          </span>

          {/* Bottom-right crosshair */}
          <span
            className="coordinate-tick absolute"
            style={{ bottom: 16, right: 16 }}
          >
            +
          </span>
        </>
      )}
    </div>
  );
}

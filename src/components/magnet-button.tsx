/**
 * Magnet Button — Section 3 (kokonut.ui Magnet Button)
 * 
 * The ONE pill shape on the site. Magnetic pull effect on hover.
 * Pairs with the motif of being the only rounded element.
 */
'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagnetButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function MagnetButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
}: MagnetButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const baseClass =
    variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  const content = (
    <motion.div
      ref={ref}
      className={`${baseClass} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      data-cursor-hover
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{
            background: 'rgba(255, 90, 31, 0.3)',
            filter: 'blur(20px)',
          }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.2 : 0.8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline inline-block relative">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="relative">
      {content}
    </button>
  );
}

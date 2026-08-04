/**
 * Navigation — Section 5.5 of the Blueprint
 * 
 * Transparent over hero → condenses to --surface with hairline bottom border once scrolled.
 * Nav items numbered in Geist Mono: 01 Product, 02 Services, etc.
 * Uses the morphic navbar shrink-on-scroll behavior.
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { num: '01', label: 'Product', href: '/product' },
  { num: '02', label: 'Services', href: '/services' },
  { num: '03', label: 'Pricing', href: '/pricing' },
  { num: '04', label: 'Studio', href: '/studio' },
  { num: '05', label: 'Contact', href: '/contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          background: scrolled ? 'var(--surface)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="container-genauix flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <Image
              src="/genauix-logo.png"
              alt="Genauix logo"
              width={28}
              height={28}
              className="flex-shrink-0"
              priority
            />
            <span
              className="font-display text-xl tracking-tight"
              style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)' }}
            >
              Genauix
            </span>
            <span
              className="hidden sm:inline-block"
              style={{
                fontFamily: 'var(--font-mono-genauix)',
                fontSize: '9px',
                color: 'var(--ink-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              Precision Studio
            </span>
          </Link>

          {/* Desktop nav — numbered items in Geist Mono */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex items-center gap-1.5 px-3 py-2 no-underline rounded-md transition-colors"
                  style={{
                    color: isActive ? 'var(--ink)' : 'var(--ink-muted)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono-genauix)',
                      fontSize: '10px',
                      opacity: 0.5,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-md"
                      style={{
                        background: 'var(--surface-raised)',
                        zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex btn-primary text-sm"
              style={{ padding: '10px 24px', fontSize: '13px' }}
            >
              Start a project
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.span
                className="block w-5 h-px"
                style={{ background: 'var(--ink)' }}
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 3 : 0 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-px"
                style={{ background: 'var(--ink)' }}
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -3 : 0 }}
                transition={{ duration: 0.15 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={false}
        animate={mobileOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, pointerEvents: 'auto' as const },
          closed: { opacity: 0, pointerEvents: 'none' as const },
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10, 11, 13, 0.95)', backdropFilter: 'blur(20px)' }}
          onClick={() => setMobileOpen(false)}
        />
        <motion.nav
          className="relative flex flex-col items-start justify-center h-full px-8 gap-6"
          variants={{
            open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
            closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
          }}
        >
          {NAV_ITEMS.map((item) => (
            <motion.div
              key={item.href}
              variants={{
                open: { x: 0, opacity: 1 },
                closed: { x: -20, opacity: 0 },
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={item.href}
                className="flex items-center gap-3 no-underline"
                style={{
                  color: pathname === item.href ? 'var(--signal)' : 'var(--ink)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono-genauix)',
                    fontSize: '12px',
                    opacity: 0.5,
                  }}
                >
                  {item.num}
                </span>
                <span
                  className="font-display"
                  style={{ fontSize: '32px' }}
                >
                  {item.label}
                </span>
              </Link>
            </motion.div>
          ))}
          <motion.div
            variants={{
              open: { x: 0, opacity: 1 },
              closed: { x: -20, opacity: 0 },
            }}
            className="mt-8"
          >
            <Link
              href="/contact"
              className="btn-primary"
              onClick={() => setMobileOpen(false)}
            >
              Start a project
            </Link>
          </motion.div>
        </motion.nav>
      </motion.div>
    </>
  );
}

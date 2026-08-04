/**
 * Footer — Section 5.6 of the Blueprint
 * 
 * Dense, mono, three columns (Sitemap / Contact / Status).
 * Live "System — 00:00:00 UTC · build vX.X" line (real setInterval, not decorative).
 * Genauix@proton.me in mono, mailto: linked.
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SITEMAP_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Product', href: '/product' },
  { label: 'Services', href: '/services' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Studio', href: '/studio' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${h}:${m}:${s}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="w-full border-t"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--hairline)',
      }}
    >
      <div className="container-genauix py-16">
        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Col 1: Sitemap */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontFamily: 'var(--font-mono-genauix)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
              }}
            >
              Sitemap
            </h4>
            <ul className="flex flex-col gap-3">
              {SITEMAP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="no-underline transition-colors hover:text-ink"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--ink-muted)',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Contact */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontFamily: 'var(--font-mono-genauix)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
              }}
            >
              Contact
            </h4>
            <a
              href="mailto:Genauix@proton.me"
              className="no-underline block mb-4 transition-colors"
              style={{
                fontFamily: 'var(--font-mono-genauix)',
                fontSize: '14px',
                color: 'var(--ink)',
                letterSpacing: '-0.01em',
              }}
            >
              Genauix@proton.me
            </a>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--ink-muted)',
                lineHeight: 1.6,
              }}
            >
              Precision-built websites, SaaS platforms,
              <br />
              and research infrastructure.
            </p>
          </div>

          {/* Col 3: Status */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontFamily: 'var(--font-mono-genauix)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
              }}
            >
              Status
            </h4>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#22c55e' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono-genauix)',
                  fontSize: '12px',
                  color: 'var(--ink-muted)',
                }}
              >
                All systems operational
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono-genauix)',
                fontSize: '11px',
                color: 'var(--ink-muted)',
                opacity: 0.6,
              }}
            >
              System — {utcTime} UTC · build v0.1.0
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--hairline)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
            }}
          >
            Genauix
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono-genauix)',
              fontSize: '11px',
              color: 'var(--ink-muted)',
              opacity: 0.5,
            }}
          >
            © {new Date().getFullYear()} Genauix. Precision engineering.
          </span>
        </div>
      </div>
    </footer>
  );
}

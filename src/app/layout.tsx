/**
 * Root Layout — Section 10.5 of the Blueprint
 * 
 * Fonts: Instrument Serif (display), Geist Sans (body), Geist Mono (data/nav)
 * Global systems: cursor, nav, footer, progress bar, page transitions
 * SEO: Organization JSON-LD on all pages
 */
import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

// Section 2.2: Display — Instrument Serif
const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

// Section 10.8: Organization JSON-LD on Home
export const metadata: Metadata = {
  title: {
    default: 'Genauix — Precision Engineering Studio',
    template: '%s | Genauix',
  },
  description:
    'Precision-built websites, SaaS platforms, and research infrastructure. Research-grade software for institutions that demand accuracy.',
  metadataBase: new URL('https://genauix.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Genauix',
    title: 'Genauix — Precision Engineering Studio',
    description:
      'Precision-built websites, SaaS platforms, and research infrastructure.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genauix — Precision Engineering Studio',
    description:
      'Precision-built websites, SaaS platforms, and research infrastructure.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable} dark`}
    >
      <head>
        {/* Section 10.8: Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Genauix',
              url: 'https://genauix.com',
              email: 'Genauix@proton.me',
              description:
                'Precision engineering studio — websites, SaaS, research infrastructure.',
            }),
          }}
        />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{
          background: 'var(--canvas)',
          color: 'var(--ink)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {children}
      </body>
    </html>
  );
}

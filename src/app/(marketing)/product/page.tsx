/**
 * PRODUCT PAGE — Section 6.2 of the Blueprint
 * Research & Institutions SaaS (flagship page, gets the most craft)
 * 
 * 8 sections:
 * 1. Hero — Spline Dashboard scene, institutional headline
 * 2. Live product demo — 4 real charts in browser chrome
 * 3. Feature grid — Bento Grid (2nd instance)
 * 4. "Built for institutions" — abstract marks stroke-draw
 * 5. AI research-matching micro-demo
 * 6. Security/compliance strip
 * 7. Pricing (product tiers) with monthly/annual toggle
 * 8. Closing CTA — Spline Orb
 */
import type { Metadata } from 'next';
import { ProductPageClient } from './product-client';

export const metadata: Metadata = {
  title: 'Research & Institutions Platform',
  description:
    'Grant tracking, publication analytics, department dashboards, and compliance-ready exports. Built for universities and research institutes that demand accuracy.',
};

export default function ProductPage() {
  return <ProductPageClient />;
}

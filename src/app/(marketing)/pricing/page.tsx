/**
 * PRICING PAGE — Section 6.4 of the Blueprint
 * 
 * Tabbed: "Studio services" vs "Research SaaS"
 * Comparison table with sticky header
 * Monthly/annual toggle reuses layoutId pattern
 */
import type { Metadata } from 'next';
import { PricingPageClient } from './pricing-client';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing for Genauix studio services and Research SaaS platform. No procurement surprises.',
};

export default function PricingPage() {
  return <PricingPageClient />;
}

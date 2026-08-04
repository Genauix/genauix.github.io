/**
 * STUDIO PAGE — Section 6.5 of the Blueprint
 * 
 * Philosophy section: precision-instrument framing
 * Team grid: kokonut Team Selector
 * No 3D hero — calmer page, about people
 */
import type { Metadata } from 'next';
import { StudioPageClient } from './studio-client';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'The team behind Genauix. Precision engineering applied to every project — websites, SaaS, and research infrastructure.',
};

export default function StudioPage() {
  return <StudioPageClient />;
}

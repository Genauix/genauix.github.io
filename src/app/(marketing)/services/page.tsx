/**
 * SERVICES PAGE — Section 6.3 of the Blueprint
 * Websites + custom SaaS builds
 * 
 * - Hero: split headline (Websites / SaaS builds), no 3D scene
 * - Case-study grid: bento layout
 * - Before/after draggable comparison slider (motion.dev drag="x")
 * - Section-break texture: Spline reeded glass cropped thin
 * - Process rail: reuse anime.js path-draw from Home
 */
import type { Metadata } from 'next';
import { ServicesPageClient } from './services-client';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Custom SaaS builds and precision websites. From 0 to production in 6-week sprints. TypeScript, React, PostgreSQL — no template shops.',
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}

/**
 * CONTACT PAGE — Section 6.6 of the Blueprint
 * 
 * Two-column: form left, Spline Glass Orb (orange) right
 * Form: name / email / org type / message + File Upload
 * spline.emitEvent() on field focus for orb reactivity
 * Genauix@proton.me in large mono under form
 */
import type { Metadata } from 'next';
import { ContactPageClient } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with Genauix. Tell us what you need built — we respond within 24 hours with a scope estimate and timeline.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}

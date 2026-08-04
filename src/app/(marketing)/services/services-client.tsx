/**
 * Services Page Client — Section 6.3
 */
'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { MagnetButton } from '@/components/magnet-button';
import { BlueprintGrid } from '@/components/blueprint-grid';

const SERVICE_TYPES = [
  {
    title: 'Research Management Platform',
    category: 'Research SaaS',
    desc: 'Grant pipelines, publication trackers, IRB submission workflows. Full institutional research infrastructure built from scratch.',
    specs: 'REST API · FERPA compliant · SSO ready',
  },
  {
    title: 'Marketing & Brand Platform',
    category: 'Website',
    desc: 'Custom marketing sites with 3D visuals, interactive data, and hand-crafted motion. Lighthouse 95+, no page builders.',
    specs: 'Next.js · 3D · <3s TTI',
  },
  {
    title: 'Analytics Dashboard',
    category: 'Custom SaaS',
    desc: 'Real-time data visualization platforms. Sensor ingestion, anomaly detection, compliance reporting — built for production scale.',
    specs: 'Real-time · TypeScript · PostgreSQL',
  },
  {
    title: 'Collaborative Research Hub',
    category: 'Research SaaS',
    desc: 'Shared compute allocation, paper draft management, peer review workflows. Multi-department access with role-based permissions.',
    specs: 'Multi-tenant · Audit trail · API-first',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discover', desc: 'Requirements mapping, technical audit, constraint identification' },
  { num: '02', title: 'Build', desc: 'Iterative 2-week sprints, real deployments, not staging demos' },
  { num: '03', title: 'Ship', desc: 'Production launch in 6 weeks, not 6 months' },
  { num: '04', title: 'Support', desc: 'Ongoing maintenance, SLA-backed uptime, quarterly reviews' },
];

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const clipRight = useTransform(x, (val) => `inset(0 ${100 - val}% 0 0)`);
  const handleLeft = useTransform(x, (val) => `${val}%`);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    x.set(Math.max(5, Math.min(95, pct)));
  };

  // Visual bar heights for the "before" chaos vs "after" organized
  const beforeBars = [35, 80, 20, 55, 15, 70, 25, 60, 40, 10, 75, 30];
  const afterBars = [45, 55, 65, 72, 78, 82, 86, 88, 90, 92, 94, 96];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: '16/9', touchAction: 'none', borderRadius: '6px', border: '1px solid var(--hairline)' }}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
      onPointerMove={handlePointerMove}
    >
      {/* "Before" layer */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8"
        style={{ background: 'var(--surface-raised)' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono-genauix)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            opacity: 0.5,
          }}
        >
          Before — manual process
        </span>

        {/* Chaotic bar chart — uneven, dim, disorganized */}
        <div className="flex items-end gap-2 h-32 w-full max-w-md">
          {beforeBars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: 'var(--ink-muted)',
                opacity: 0.15 + (i % 3) * 0.08,
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '28px', fontWeight: 700, color: 'var(--ink-muted)', opacity: 0.35 }}>3 wk</span>
            <span className="block" style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '10px', color: 'var(--ink-muted)', opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.06em' }}>review cycle</span>
          </div>
          <div style={{ width: 1, height: 32, background: 'var(--hairline)' }} />
          <div className="text-center">
            <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '28px', fontWeight: 700, color: 'var(--ink-muted)', opacity: 0.35 }}>5+</span>
            <span className="block" style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '10px', color: 'var(--ink-muted)', opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.06em' }}>spreadsheets</span>
          </div>
          <div style={{ width: 1, height: 32, background: 'var(--hairline)' }} />
          <div className="text-center">
            <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '28px', fontWeight: 700, color: 'var(--ink-muted)', opacity: 0.35 }}>∅</span>
            <span className="block" style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '10px', color: 'var(--ink-muted)', opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.06em' }}>audit trail</span>
          </div>
        </div>
      </div>

      {/* "After" layer — clips from left */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8"
        style={{
          background: 'var(--canvas)',
          clipPath: clipRight,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono-genauix)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--signal)',
          }}
        >
          After — automated pipeline
        </span>

        {/* Clean upward trend bar chart — organized, signal-colored */}
        <div className="flex items-end gap-2 h-32 w-full max-w-md">
          {afterBars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: i >= 9 ? 'var(--signal)' : 'var(--data)',
                opacity: 0.5 + (i / afterBars.length) * 0.5,
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '28px', fontWeight: 700, color: 'var(--signal)' }}>4 hr</span>
            <span className="block" style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '10px', color: 'var(--data)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>review cycle</span>
          </div>
          <div style={{ width: 1, height: 32, background: 'var(--hairline)' }} />
          <div className="text-center">
            <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '28px', fontWeight: 700, color: 'var(--signal)' }}>1</span>
            <span className="block" style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '10px', color: 'var(--data)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>dashboard</span>
          </div>
          <div style={{ width: 1, height: 32, background: 'var(--hairline)' }} />
          <div className="text-center">
            <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '28px', fontWeight: 700, color: 'var(--signal)' }}>✓</span>
            <span className="block" style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '10px', color: 'var(--data)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>audit trail</span>
          </div>
        </div>
      </motion.div>

      {/* Drag handle line */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 z-10"
        style={{
          left: handleLeft,
          background: 'var(--signal)',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--signal)', boxShadow: '0 0 20px rgba(255,90,31,0.4)' }}
        >
          <span style={{ fontSize: '14px', color: 'var(--canvas)', fontWeight: 700 }}>⇔</span>
        </div>
      </motion.div>
    </div>
  );
}

export function ServicesPageClient() {
  return (
    <>
      {/* HERO — split headline, no 3D */}
      <section className="relative min-h-[70vh] flex items-center" style={{ paddingTop: 80 }}>
        <BlueprintGrid sectionLabel="SVC.01" />
        <div className="container-genauix relative z-10">
          <motion.span
            className="coordinate-tick block mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            SVC.01 — Services
          </motion.span>

          <motion.h1
            className="font-display mb-8"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Websites & Custom SaaS
          </motion.h1>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <h2 className="mb-3" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--ink)' }}>
                Website Studio
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                Marketing sites and brand platforms. Next.js, hand-crafted motion,
                3D, Lighthouse 95+. Shipped in 4 weeks. No page builders, no templates.
              </p>
            </div>
            <div>
              <h2 className="mb-3" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--ink)' }}>
                Custom SaaS Builds
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                0→1 product development. Architecture, implementation, deployment.
                TypeScript, React, PostgreSQL. 6-week sprint cycles with real
                production deployments.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDY GRID */}
      <section className="py-24 md:py-32">
        <div className="container-genauix">
          <div className="mb-16">
            <span className="coordinate-tick block mb-4">SVC.02 — What we build</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
              Types of work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICE_TYPES.map((service, i) => (
              <motion.div
                key={service.title}
                className="card-surface p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.16)' }}
              >
                <span className="badge-genauix mb-4 inline-block">{service.category}</span>
                <h3 className="mb-3" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--ink)' }}>
                  {service.title}
                </h3>
                <p className="mb-4" style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                  {service.desc}
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-mono-genauix)',
                    fontSize: '11px',
                    color: 'var(--data)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {service.specs}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER SLIDER */}
      <section className="py-24 md:py-32" style={{ background: 'var(--surface)' }}>
        <div className="container-genauix">
          <div className="text-center mb-12">
            <span className="coordinate-tick block mb-4">SVC.03 — Impact</span>
            <h2 className="font-display mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>
              Before & after
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--ink-muted)' }}>
              Drag to compare
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* Simple section divider — clean hairline */}
      <div className="section-divider" />

      {/* PROCESS RAIL — reused from Home */}
      <section className="py-24 md:py-32 relative">
        <BlueprintGrid sectionLabel="SVC.04" />
        <div className="container-genauix relative z-10">
          <div className="mb-16">
            <span className="coordinate-tick block mb-4">SVC.04 — Process</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
              How we work
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px" style={{ background: 'var(--hairline)' }} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10"
                    style={{ background: 'var(--surface)', border: '1px solid var(--hairline)' }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '14px', color: 'var(--signal)' }}>
                      {step.num}
                    </span>
                  </div>
                  <h3 className="mb-2" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 text-center" style={{ background: 'var(--surface)' }}>
        <div className="container-genauix">
          <h2 className="font-display mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Have a project in mind?
          </h2>
          <p className="mb-8 mx-auto" style={{ fontSize: '17px', color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 480 }}>
            Tell us what you need built. We will respond within 24 hours with a
            scope estimate and timeline.
          </p>
          <MagnetButton href="/contact">Start a project</MagnetButton>
        </div>
      </section>
    </>
  );
}

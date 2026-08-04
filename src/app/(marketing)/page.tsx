/**
 * HOME PAGE — Section 6.1 of the Blueprint
 * 
 * 10 sections:
 * 1. Nav (global via layout)
 * 2. Hero — Spline glass scene as FULL BACKGROUND + headline stagger + Magnet Button CTA
 * 3. Trust strip — motion.dev marquee (capabilities, not fake org names)
 * 4. "What we build" — Bento Grid with live RingChart (demo data, clearly labeled)
 * 5. "Precision in numbers" — stat cards with real commitments only
 * 6. Flagship product preview — Spline Dashboard + scroll parallax
 * 7. Process rail — 4-step horizontal
 * 8. Testimonials — REMOVED (no fake testimonials — section reserved for when real ones exist)
 * 9. CTA band — Spline Glass Orb (seamless, no box) + Magnet Button
 * 10. Footer (global via layout)
 */
'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { SplineScene } from '@/components/spline-scene';
import { MagnetButton } from '@/components/magnet-button';
import { BlueprintGrid } from '@/components/blueprint-grid';
import { GenauixRingChart, GenauixRadarChart } from '@/components/charts';

// ============================================================
// DATA — only real commitments, no made-up numbers
// ============================================================

const CAPABILITIES = [
  'Next.js', 'TypeScript', 'React', 'PostgreSQL', 'Spline 3D',
  'Motion Design', 'SaaS Architecture', 'API Design', 'SSO Integration',
  'Compliance Systems', 'Data Visualization', 'Research Infrastructure',
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discover', desc: 'Requirements mapping, technical audit, constraint identification' },
  { num: '02', title: 'Build', desc: 'Iterative 2-week sprints, real deployments, not staging demos' },
  { num: '03', title: 'Ship', desc: 'Production launch in weeks, not months' },
  { num: '04', title: 'Support', desc: 'Ongoing maintenance, SLA-backed uptime, quarterly reviews' },
];

// Demo data for the chart showcase — clearly labeled as demo
const RADAR_DATA = [
  { subject: 'Research', A: 92 },
  { subject: 'Grants', A: 87 },
  { subject: 'Compliance', A: 95 },
  { subject: 'Analytics', A: 78 },
  { subject: 'Reporting', A: 88 },
  { subject: 'Integration', A: 91 },
];

// ============================================================
// HERO TEXT ANIMATION
// ============================================================

function AnimatedHeadline() {
  const words = ['Precision-built', 'software', 'for', 'research', '&', 'institutions'];

  return (
    <h1 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05 }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: 0.2 + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

// ============================================================
// SECTION WRAPPER
// ============================================================

function Section({
  children,
  className = '',
  id,
  sectionLabel,
  showGrid = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  sectionLabel?: string;
  showGrid?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id={id} className={`relative ${className}`}>
      {showGrid && <BlueprintGrid sectionLabel={sectionLabel} />}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

// ============================================================
// PAGE COMPONENT
// ============================================================

export default function HomePage() {
  const productPreviewRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: productScrollProgress } = useScroll({
    target: productPreviewRef,
    offset: ['start end', 'end start'],
  });
  const productY = useTransform(productScrollProgress, [0, 1], [40, -40]);

  return (
    <>
      {/* ====================================================
          HERO — Spline glass as FULL AMBIENT BACKGROUND
          ==================================================== */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: 80 }}
      >
        <BlueprintGrid sectionLabel="SEC.01" />

        {/* Spline glass scene — FULL BACKGROUND, not a box */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <SplineScene
              scene="https://prod.spline.design/UX-xqfjzBBaj9-uU/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
          {/* Dark gradient overlay so text remains readable */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, var(--canvas) 35%, transparent 70%)',
            }}
          />
        </div>

        <div className="container-genauix relative z-10">
          <div className="max-w-xl">
            {/* Blueprint coordinate tick */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              <span className="coordinate-tick">N 40.71° / W 74.01°</span>
            </motion.div>

            <div className="mt-6">
              <AnimatedHeadline />
            </div>

            <motion.p
              className="mt-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '17px',
                lineHeight: 1.6,
                color: 'var(--ink-muted)',
                maxWidth: 480,
              }}
            >
              Websites, SaaS platforms, and research infrastructure —
              built with the accuracy institutions demand.
              Shipped in weeks, not months.
            </motion.p>

            <motion.div
              className="flex items-center gap-4 flex-wrap mt-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagnetButton href="/product">
                See the platform
              </MagnetButton>
              <Link href="/contact" className="btn-secondary">
                Start a project
              </Link>
            </motion.div>

            {/* Stat line — only real commitments */}
            <motion.div
              className="flex items-center gap-8 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              {[
                { value: '6 wk', label: 'target ship time' },
                { value: '99.9%', label: 'uptime target' },
                { value: 'SOC 2', label: 'compliance ready' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono-genauix)',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono-genauix)',
                      fontSize: '10px',
                      color: 'var(--ink-muted)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Gradient fade at bottom of hero */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, var(--canvas), transparent)',
          }}
        />
      </section>

      {/* ====================================================
          TRUST STRIP — capabilities marquee, not fake org names
          ==================================================== */}
      <div
        className="overflow-hidden py-6 border-y"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: { repeat: Infinity, repeatType: 'loop', duration: 25, ease: 'linear' },
          }}
        >
          {[...CAPABILITIES, ...CAPABILITIES].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono-genauix)',
                fontSize: '12px',
                color: 'var(--ink-muted)',
                opacity: 0.6,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ====================================================
          "WHAT WE BUILD" — Bento Grid
          ==================================================== */}
      <Section className="py-24 md:py-32" sectionLabel="SEC.02" showGrid id="what-we-build">
        <div className="container-genauix">
          <div className="mb-16">
            <span className="coordinate-tick block mb-4">SEC.02 — Capabilities</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
              What we build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Flagship: Research SaaS — colSpan:2 with demo RingChart */}
            <motion.div
              className="md:col-span-2 card-surface p-8 relative overflow-hidden group"
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.16)' }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <span className="badge-genauix mb-4 inline-block">Flagship</span>
                  <h3 className="mb-3" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink)' }}>
                    Research & Institutions SaaS
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                    Grant tracking, publication analytics, department dashboards,
                    compliance-ready exports. Built for university administrators
                    and PIs who need real data, not dashboards that look good in demos.
                  </p>
                  <Link
                    href="/product"
                    className="inline-flex items-center gap-2 mt-4 no-underline"
                    style={{
                      fontFamily: 'var(--font-mono-genauix)',
                      fontSize: '12px',
                      color: 'var(--signal)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Explore the platform →
                  </Link>
                </div>
                <div className="flex-shrink-0">
                  <GenauixRingChart value={87} label="Demo: completion" size={140} />
                </div>
              </div>
            </motion.div>

            {/* Custom SaaS */}
            <motion.div
              className="card-surface p-8"
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.16)' }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="badge-genauix mb-4 inline-block">Studio</span>
              <h3 className="mb-3" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink)' }}>
                Custom SaaS
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                0→1 product builds. From architecture to production in sprint cycles.
                TypeScript, React, PostgreSQL — no template shops.
              </p>
            </motion.div>

            {/* Websites */}
            <motion.div
              className="card-surface p-8"
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.16)' }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="badge-genauix mb-4 inline-block">Craft</span>
              <h3 className="mb-3" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink)' }}>
                Websites
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                Marketing sites and brand platforms. Next.js, hand-coded motion,
                Lighthouse 95+. No page builders.
              </p>
            </motion.div>

            {/* Integration */}
            <motion.div
              className="md:col-span-2 card-surface p-8"
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.16)' }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="mb-3" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--ink)' }}>
                System Integration
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                SSO, LMS connectors, grant-system APIs, compliance pipelines. We
                wire your existing infrastructure into a unified operational layer —
                no rip-and-replace, no vendor lock-in.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ====================================================
          "PRECISION IN NUMBERS" — demo chart showcase
          ==================================================== */}
      <Section className="py-24 md:py-32" sectionLabel="SEC.03" showGrid id="precision">
        <div className="container-genauix">
          <div className="mb-16">
            <span className="coordinate-tick block mb-4">SEC.03 — Platform Demo</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
              Built-in analytics
            </h2>
            <p className="mt-4" style={{ fontSize: '15px', color: 'var(--ink-muted)', maxWidth: 480 }}>
              Every dashboard ships with real-time charts. These are live components —
              not screenshots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-surface p-6 flex flex-col items-center justify-center">
              <GenauixRingChart value={99.9} label="Uptime target" size={120} />
            </div>
            <div className="card-surface p-6 flex flex-col items-center justify-center">
              <GenauixRingChart value={95} label="Lighthouse score" size={120} />
            </div>
            <div className="card-surface p-6 flex flex-col items-center justify-center">
              <GenauixRingChart value={6} maxValue={12} label="Weeks to ship" size={120} />
            </div>
            <div className="card-surface p-6">
              <GenauixRadarChart data={RADAR_DATA} dataKey="A" height={180} />
              <p
                className="text-center mt-2"
                style={{
                  fontFamily: 'var(--font-mono-genauix)',
                  fontSize: '11px',
                  color: 'var(--ink-muted)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Coverage areas
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ====================================================
          FLAGSHIP PRODUCT PREVIEW — Spline Dashboard + scroll parallax
          ==================================================== */}
      <Section className="py-24 md:py-32 overflow-hidden" sectionLabel="SEC.04" showGrid id="product-preview">
        <div className="container-genauix">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="coordinate-tick block mb-4">SEC.04 — Platform</span>
              <h2
                className="font-display mb-6"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
              >
                Built for institutional research
              </h2>
              <p
                className="mb-8"
                style={{ fontSize: '16px', color: 'var(--ink-muted)', lineHeight: 1.7 }}
              >
                One dashboard for grants, publications, compliance, and department
                analytics. Exports FERPA-compliant CSV/PDF reports. Integrates with
                your existing LMS and grant systems via API.
              </p>
              <MagnetButton href="/product">
                Explore the platform
              </MagnetButton>
            </div>

            {/* 3D Dashboard — bigger container to fit the full scene */}
            <motion.div
              ref={productPreviewRef}
              className="relative h-[500px] lg:h-[700px] overflow-hidden rounded-lg"
              style={{ y: productY }}
            >
              <SplineScene
                scene="https://prod.spline.design/D6KIk4C7LS9ICxRV/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ====================================================
          PROCESS RAIL
          ==================================================== */}
      <Section className="py-24 md:py-32" sectionLabel="SEC.05" showGrid id="process">
        <div className="container-genauix">
          <div className="mb-16">
            <span className="coordinate-tick block mb-4">SEC.05 — Process</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
              How we work
            </h2>
          </div>

          <div className="relative">
            <div
              className="hidden md:block absolute top-8 left-0 right-0 h-px"
              style={{ background: 'var(--hairline)' }}
            />
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
      </Section>

      {/* ====================================================
          CTA BAND — Spline Glass Orb SEAMLESSLY floating, no box
          ==================================================== */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: 'var(--surface)' }}
      >
        <div className="container-genauix relative z-10 text-center">
          <h2
            className="font-display mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Ready to build with precision?
          </h2>
          <p
            className="mb-8 mx-auto"
            style={{ fontSize: '17px', color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 520 }}
          >
            Whether you need a research platform, custom SaaS, or a website that
            reflects your standards — let&apos;s talk.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <MagnetButton href="/contact">
              Start a project
            </MagnetButton>
            <Link href="/product" className="btn-secondary">
              See the platform
            </Link>
          </div>
        </div>

        {/* Floating liquid orb — bigger, shifted left, matching bg */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[450px] h-[450px] pointer-events-none hidden lg:block">
          <SplineScene
            scene="https://prod.spline.design/ba4R-6OTdJdzSZks/scene.splinecode"
            className="w-full h-full"
            bgColor="#131417"
          />
        </div>
      </section>

      <div className="section-divider" />
    </>
  );
}

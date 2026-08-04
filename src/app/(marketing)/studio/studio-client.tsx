/**
 * Studio Page Client — Section 6.5
 * 
 * Solo founder studio. Not a fake team of 6.
 * Philosophy section: precision-instrument framing
 * No 3D hero — calmer page, about the craft
 */
'use client';

import { motion } from 'motion/react';
import { BlueprintGrid } from '@/components/blueprint-grid';
import { MagnetButton } from '@/components/magnet-button';

const VALUES = [
  {
    title: 'Measure twice, cut once',
    desc: 'Every project starts with a technical audit and constraint map. The hard problems get identified before writing a line of code — not after something breaks in production.',
  },
  {
    title: 'Ship real, not impressive',
    desc: 'Deliverables are production systems, not demos. If it cannot handle real traffic, real data, and real edge cases, it is not done.',
  },
  {
    title: 'Numbers over adjectives',
    desc: 'Weeks to delivery. Uptime percentage. Response time P99. Measurable outcomes — because "fast" and "reliable" mean nothing without a benchmark.',
  },
  {
    title: 'Institutional empathy',
    desc: 'Understanding procurement cycles, compliance requirements, multi-stakeholder approval chains, and the politics of cross-department rollouts. Building for how institutions actually work.',
  },
];

const STACK = [
  { name: 'Next.js', role: 'Framework' },
  { name: 'TypeScript', role: 'Language' },
  { name: 'React', role: 'UI' },
  { name: 'PostgreSQL', role: 'Database' },
  { name: 'Spline', role: '3D' },
  { name: 'Motion', role: 'Animation' },
  { name: 'Tailwind', role: 'Styling' },
  { name: 'Vercel', role: 'Deploy' },
];

export function StudioPageClient() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-24 md:pb-32">
        <BlueprintGrid sectionLabel="STD.01" />
        <div className="container-genauix relative z-10">
          <motion.span
            className="coordinate-tick block mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            STD.01 — Studio
          </motion.span>
          <motion.h1
            className="font-display mb-8"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)', maxWidth: 700 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Precision is not a marketing word. It is how I work.
          </motion.h1>
          <motion.p
            style={{ fontSize: '17px', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: 560 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Genauix is a solo engineering studio that builds software for
            organizations that cannot afford imprecision — research labs, universities,
            and institutions where data accuracy is not a feature but a requirement.
          </motion.p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-24 md:py-32" style={{ background: 'var(--surface)' }}>
        <div className="container-genauix">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="coordinate-tick block mb-4">STD.02 — Founder</span>
              <h2 className="font-display mb-6" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
                One person. Full stack.
              </h2>
              <div className="space-y-4" style={{ fontSize: '15px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                <p>
                  Every line of code, every design decision, every deployment —
                  handled by one engineer who owns the outcome end to end.
                </p>
                <p>
                  No account managers. No handoffs between teams.
                  No &ldquo;let me check with the developer.&rdquo;
                  You talk directly to the person building your system.
                </p>
                <p>
                  As the studio grows, this page will too. But the standard
                  stays the same — precision over scale.
                </p>
              </div>
            </div>

            {/* Stack */}
            <div>
              <h3
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-mono-genauix)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                }}
              >
                Primary stack
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {STACK.map((item, i) => (
                  <motion.div
                    key={item.name}
                    className="card-raised p-4 flex items-center justify-between"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink)' }}>
                      {item.name}
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
                      {item.role}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 md:py-32">
        <div className="container-genauix">
          <div className="mb-16">
            <span className="coordinate-tick block mb-4">STD.03 — Philosophy</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              How I think about craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                className="card-surface p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="mb-3" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NAME MEANING */}
      <section className="py-24 md:py-32 relative" style={{ background: 'var(--surface)' }}>
        <BlueprintGrid sectionLabel="STD.04" />
        <div className="container-genauix relative z-10 text-center max-w-2xl mx-auto">
          <span className="coordinate-tick block mb-6">STD.04 — Etymology</span>
          <h2 className="font-display mb-8" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            Genauigkeit
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--ink-muted)', lineHeight: 1.8 }}>
            German. Noun. <em>Precision, accuracy, exactness.</em>
          </p>
          <p className="mt-4" style={{ fontSize: '15px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
            Not a brand exercise — a specification. Everything built here is measured
            against this standard: does it work correctly, does it handle edge cases,
            does it ship on the date committed.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 text-center">
        <div className="container-genauix">
          <h2 className="font-display mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Work with me
          </h2>
          <p className="mb-8 mx-auto" style={{ fontSize: '17px', color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 480 }}>
            I take on a small number of projects at a time to maintain the quality standard.
            If you have a project that demands precision, let me know.
          </p>
          <MagnetButton href="/contact">Start a conversation</MagnetButton>
        </div>
      </section>
    </>
  );
}

/**
 * Product Page Client — Section 6.2
 * The centerpiece page with live dashboard, AI demo, and pricing.
 */
'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { SplineScene } from '@/components/spline-scene';
import { MagnetButton } from '@/components/magnet-button';
import { BlueprintGrid } from '@/components/blueprint-grid';
import {
  GenauixLineChart,
  GenauixAreaChart,
  GenauixRingChart,
  GenauixRadarChart,
} from '@/components/charts';

// ============================================================
// MOCK DATA — real data types for research institution context
// ============================================================

const GRANT_FUNDING_DATA = [
  { month: 'Jan', funding: 245000, target: 260000 },
  { month: 'Feb', funding: 312000, target: 280000 },
  { month: 'Mar', funding: 287000, target: 300000 },
  { month: 'Apr', funding: 356000, target: 320000 },
  { month: 'May', funding: 423000, target: 340000 },
  { month: 'Jun', funding: 398000, target: 360000 },
  { month: 'Jul', funding: 467000, target: 380000 },
  { month: 'Aug', funding: 512000, target: 400000 },
  { month: 'Sep', funding: 489000, target: 420000 },
  { month: 'Oct', funding: 534000, target: 440000 },
  { month: 'Nov', funding: 578000, target: 460000 },
  { month: 'Dec', funding: 612000, target: 480000 },
];

const ENGAGEMENT_DATA = [
  { month: 'Jan', students: 1240 },
  { month: 'Feb', students: 1380 },
  { month: 'Mar', students: 1520 },
  { month: 'Apr', students: 1890 },
  { month: 'May', students: 2100 },
  { month: 'Jun', students: 1760 },
  { month: 'Jul', students: 1450 },
  { month: 'Aug', students: 1680 },
  { month: 'Sep', students: 2340 },
  { month: 'Oct', students: 2580 },
  { month: 'Nov', students: 2720 },
  { month: 'Dec', students: 2890 },
];

const DEPT_PERFORMANCE = [
  { subject: 'Research Output', score: 92 },
  { subject: 'Grant Success', score: 87 },
  { subject: 'Compliance', score: 95 },
  { subject: 'Publication Rate', score: 78 },
  { subject: 'Collaboration', score: 88 },
  { subject: 'Student Engagement', score: 82 },
];

const FEATURES = [
  {
    title: 'Grant Tracking',
    desc: 'Real-time pipeline for NSF, NIH, DOE, and private foundation grants. Track status from application through disbursement with automated deadline alerts.',
    badge: 'Core',
  },
  {
    title: 'Publication Analytics',
    desc: 'Citation tracking, h-index monitoring, co-authorship network mapping. Export publication reports for tenure review and department evaluation.',
    badge: 'Analytics',
  },
  {
    title: 'Compliance-Ready Exports',
    desc: 'FERPA-compliant CSV and PDF exports. Audit trail for every data access event. SOC 2 Type II certified infrastructure.',
    badge: 'Compliance',
  },
  {
    title: 'Multi-Department Views',
    desc: 'Role-based dashboards for deans, department heads, PIs, and administrators. Each role sees only what they need — no information overload.',
    badge: 'Access',
  },
  {
    title: 'Audit Trail',
    desc: 'Immutable log of every action, export, and data change. Retention configurable to institutional policy. Exportable for external audits.',
    badge: 'Security',
  },
  {
    title: 'Single Sign-On',
    desc: 'SAML 2.0 and OIDC support. Compatible with Shibboleth, Azure AD, Okta, and institutional IdPs. No additional credentials for your users.',
    badge: 'Integration',
  },
];

const PRICING_TIERS = [
  {
    name: 'Department',
    monthly: 299,
    annual: 249,
    desc: 'Single department, up to 50 users',
    features: ['Grant tracking', 'Publication analytics', 'Basic exports', 'Email support'],
  },
  {
    name: 'Institution',
    monthly: 899,
    annual: 749,
    desc: 'Multi-department, up to 500 users',
    features: ['Everything in Department', 'Multi-dept views', 'SSO integration', 'Audit trail', 'Priority support'],
    popular: true,
  },
  {
    name: 'Enterprise',
    monthly: null,
    annual: null,
    desc: 'Unlimited users, custom deployment',
    features: ['Everything in Institution', 'On-premise option', 'Custom integrations', 'Dedicated account team', 'SLA guarantee'],
  },
];

// AI Search mock data
const AI_SEARCH_RESULTS = [
  { title: 'NSF Grant: Machine Learning for Climate Modeling', match: '94%', dept: 'Computer Science' },
  { title: 'NIH R01: Computational Biology Methods', match: '89%', dept: 'Biology' },
  { title: 'DOE Fellowship: Quantum Computing Applications', match: '82%', dept: 'Physics' },
];

export function ProductPageClient() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResults, setAiResults] = useState<typeof AI_SEARCH_RESULTS>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleAiSearch = () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setAiResults([]);
    // Simulate AI search
    setTimeout(() => {
      setAiLoading(false);
      setAiResults(AI_SEARCH_RESULTS);
    }, 1500);
  };

  return (
    <>
      {/* ====================================================
          SECTION 1: HERO
          ==================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center overflow-hidden"
        style={{ paddingTop: 80 }}
      >
        <BlueprintGrid sectionLabel="PRD.01" />

        <div className="container-genauix relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                className="coordinate-tick block mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                PRD.01 — Research Platform
              </motion.span>

              <motion.h1
                className="font-display mb-6"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Grant compliance and department reporting — in one system
              </motion.h1>

              <motion.p
                className="mb-8"
                style={{ fontSize: '17px', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: 480 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Track active grants across every department. Export
                FERPA-compliant reports in 3 clicks. Ship your annual review
                documentation in hours, not weeks.
              </motion.p>

              <motion.div
                className="flex gap-4 flex-wrap"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <MagnetButton href="/contact">
                  Request a demo
                </MagnetButton>
                <a href="#live-demo" className="btn-secondary">
                  See it live ↓
                </a>
              </motion.div>
            </div>

            {/* Spline Dashboard — large container */}
            <motion.div
              className="relative h-[600px] lg:h-[800px]"
              style={{ y: heroY }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SplineScene
                scene="https://prod.spline.design/D6KIk4C7LS9ICxRV/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 2: LIVE PRODUCT DEMO — the centerpiece
          ==================================================== */}
      <section id="live-demo" className="py-24 md:py-32 relative">
        <BlueprintGrid sectionLabel="PRD.02" />
        <div className="container-genauix relative z-10">
          <div className="text-center mb-16">
            <span className="coordinate-tick block mb-4">PRD.02 — Live Dashboard</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
              Real data. Real charts. Not a screenshot.
            </h2>
          </div>

          {/* Browser chrome frame (kokonut Toolbar) */}
          <div className="card-surface overflow-hidden">
            {/* Chrome bar */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
              </div>
              <div
                className="flex-1 mx-4 py-1.5 px-3 rounded-md text-center"
                style={{
                  background: 'var(--surface-raised)',
                  fontFamily: 'var(--font-mono-genauix)',
                  fontSize: '11px',
                  color: 'var(--ink-muted)',
                }}
              >
                app.genauix.com/dashboard
              </div>
            </div>

            {/* Dashboard grid — 4 real charts */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ background: 'var(--canvas)' }}>
              {/* Grant funding over time — LineChart */}
              <div className="card-raised p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    Grant Funding Over Time
                  </h4>
                  <span className="badge-genauix">Live</span>
                </div>
                <GenauixLineChart
                  data={GRANT_FUNDING_DATA}
                  dataKey="funding"
                  secondaryKey="target"
                  xKey="month"
                  height={220}
                />
              </div>

              {/* Student engagement — AreaChart */}
              <div className="card-raised p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    Student Engagement Trend
                  </h4>
                  <span className="badge-genauix">Live</span>
                </div>
                <GenauixAreaChart
                  data={ENGAGEMENT_DATA}
                  dataKey="students"
                  xKey="month"
                  height={220}
                />
              </div>

              {/* Publication goal — RingChart */}
              <div className="card-raised p-5 flex flex-col items-center justify-center">
                <h4
                  className="mb-4 w-full"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--ink)',
                  }}
                >
                  Publication Goal Completion
                </h4>
                <GenauixRingChart value={73} label="Publications target" size={180} />
              </div>

              {/* Department performance — RadarChart */}
              <div className="card-raised p-5">
                <h4
                  className="mb-4"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--ink)',
                  }}
                >
                  Department Performance Comparison
                </h4>
                <GenauixRadarChart
                  data={DEPT_PERFORMANCE}
                  dataKey="score"
                  nameKey="subject"
                  height={220}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3: FEATURE GRID — Bento Grid (2nd instance)
          ==================================================== */}
      <section className="py-24 md:py-32 relative">
        <div className="container-genauix">
          <div className="mb-16">
            <span className="coordinate-tick block mb-4">PRD.03 — Features</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
              Everything your institution needs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="card-surface p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.16)' }}
              >
                <span className="badge-genauix mb-4 inline-block">{feature.badge}</span>
                <h3 className="mb-3" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink)' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 4: "BUILT FOR INSTITUTIONS"
          ==================================================== */}
      <section className="py-16 border-y" style={{ borderColor: 'var(--hairline)' }}>
        <div className="container-genauix">
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['Research University', 'Medical Center', 'Federal Lab', 'Liberal Arts College', 'Community College', 'Research Institute'].map((name, i) => (
              <motion.div
                key={name}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {/* Abstract institutional mark — not real logos */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="var(--ink-muted)" strokeWidth="1" opacity="0.5" />
                  <line x1="12" y1="4" x2="12" y2="20" stroke="var(--ink-muted)" strokeWidth="0.5" opacity="0.3" />
                  <line x1="4" y1="12" x2="20" y2="12" stroke="var(--ink-muted)" strokeWidth="0.5" opacity="0.3" />
                </svg>
                <span
                  style={{
                    fontFamily: 'var(--font-mono-genauix)',
                    fontSize: '11px',
                    color: 'var(--ink-muted)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 5: AI RESEARCH-MATCHING MICRO-DEMO
          ==================================================== */}
      <section className="py-24 md:py-32 relative">
        <BlueprintGrid sectionLabel="PRD.05" />
        <div className="container-genauix relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="coordinate-tick block mb-4">PRD.05 — AI Matching</span>
              <h2 className="font-display mb-4" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>
                Find relevant grants in seconds
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                Type a research topic. Our matching engine surfaces relevant funding
                opportunities ranked by fit score.
              </p>
            </div>

            {/* Search input */}
            <div className="card-surface p-4 mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                  placeholder="e.g., machine learning climate research..."
                  className="flex-1 bg-transparent border-none outline-none"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--ink)',
                  }}
                />
                <button
                  onClick={handleAiSearch}
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '13px' }}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Loading state */}
            <AnimatePresence>
              {aiLoading && (
                <motion.div
                  className="card-surface p-6 mb-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--signal)', borderTopColor: 'transparent' }} />
                    <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '12px', color: 'var(--ink-muted)' }}>
                      Searching grant database...
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            <AnimatePresence>
              {aiResults.length > 0 && (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {aiResults.map((result, i) => (
                    <motion.div
                      key={result.title}
                      className="card-surface p-5 flex items-start justify-between gap-4"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>
                          {result.title}
                        </h4>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono-genauix)',
                            fontSize: '11px',
                            color: 'var(--ink-muted)',
                          }}
                        >
                          {result.dept}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono-genauix)',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'var(--data)',
                        }}
                      >
                        {result.match}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 6: SECURITY/COMPLIANCE STRIP
          ==================================================== */}
      <section className="py-12 border-y" style={{ borderColor: 'var(--hairline)' }}>
        <div className="container-genauix">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['FERPA Compliant', 'GDPR Ready', 'SOC 2 Type II', 'SAML 2.0', '256-bit AES'].map((badge) => (
              <span
                key={badge}
                style={{
                  fontFamily: 'var(--font-mono-genauix)',
                  fontSize: '11px',
                  color: 'var(--ink-muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '6px 16px',
                  border: '1px solid var(--hairline)',
                  borderRadius: '6px',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 7: PRICING (PRODUCT TIERS)
          ==================================================== */}
      <section className="py-24 md:py-32 relative">
        <div className="container-genauix">
          <div className="text-center mb-12">
            <span className="coordinate-tick block mb-4">PRD.07 — Pricing</span>
            <h2 className="font-display mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
              Transparent pricing. No procurement surprises.
            </h2>

            {/* Monthly/Annual toggle — motion.dev layoutId */}
            <div
              className="inline-flex rounded-md p-1 relative"
              style={{ background: 'var(--surface)', border: '1px solid var(--hairline)' }}
            >
              {(['monthly', 'annual'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setBillingPeriod(period)}
                  className="relative px-6 py-2 rounded-md text-sm z-10"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: billingPeriod === period ? 'var(--ink)' : 'var(--ink-muted)',
                    fontWeight: billingPeriod === period ? 600 : 400,
                  }}
                >
                  {period === 'monthly' ? 'Monthly' : 'Annual (save 17%)'}
                  {billingPeriod === period && (
                    <motion.div
                      layoutId="pricing-toggle"
                      className="absolute inset-0 rounded-md"
                      style={{ background: 'var(--surface-raised)', zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                className={`card-surface p-8 relative ${tier.popular ? 'ring-1' : ''}`}
                style={tier.popular ? { borderColor: 'var(--signal)' } : {}}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {tier.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 badge-genauix"
                    style={{ background: 'var(--signal)', color: 'var(--canvas)', borderColor: 'var(--signal)' }}
                  >
                    Most popular
                  </span>
                )}
                <h3 className="mb-2" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--ink)' }}>
                  {tier.name}
                </h3>
                <p className="mb-6" style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
                  {tier.desc}
                </p>

                {/* Price with layoutId animation */}
                <div className="mb-6">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={`${tier.name}-${billingPeriod}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontFamily: 'var(--font-mono-genauix)',
                        fontSize: '36px',
                        fontWeight: 700,
                        color: 'var(--ink)',
                      }}
                    >
                      {tier.monthly === null ? 'Custom' : `$${billingPeriod === 'monthly' ? tier.monthly : tier.annual}`}
                    </motion.span>
                  </AnimatePresence>
                  {tier.monthly !== null && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono-genauix)',
                        fontSize: '12px',
                        color: 'var(--ink-muted)',
                        marginLeft: 4,
                      }}
                    >
                      /mo {billingPeriod === 'annual' && '· billed annually'}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2" style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>
                      <span style={{ color: 'var(--data)', marginTop: 2 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <MagnetButton
                  href="/contact"
                  variant={tier.popular ? 'primary' : 'secondary'}
                  className="w-full justify-center"
                >
                  {tier.monthly === null ? 'Contact sales' : 'Get started'}
                </MagnetButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 8: CLOSING CTA
          ==================================================== */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'var(--surface)' }}>
        <div className="container-genauix relative z-10 text-center">
          <h2 className="font-display mb-6" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            Your institution deserves better tools
          </h2>
          <p className="mb-8 mx-auto" style={{ fontSize: '17px', color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 520 }}>
            Request a 30-minute demo. We will show you real data from a test
            institution — not a slide deck.
          </p>
          <MagnetButton href="/contact">
            Request a demo
          </MagnetButton>
        </div>

        {/* Spline Orb — bigger, shifted left, matching bg */}
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none hidden lg:block">
          <SplineScene
            scene="https://prod.spline.design/ba4R-6OTdJdzSZks/scene.splinecode"
            className="w-full h-full"
            bgColor="#131417"
          />
        </div>
      </section>
    </>
  );
}

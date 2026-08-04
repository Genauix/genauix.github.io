/**
 * Pricing Page Client — Section 6.4
 * 
 * Tabbed: "Studio services" vs "Research SaaS"
 * Comparison table with sticky header
 * Monthly/annual toggle reuses the layoutId pattern from Product page
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MagnetButton } from '@/components/magnet-button';
import { BlueprintGrid } from '@/components/blueprint-grid';

type Tab = 'studio' | 'saas';
type Billing = 'monthly' | 'annual';

const STUDIO_TIERS = [
  {
    name: 'Website',
    monthly: 4900,
    annual: 3900,
    desc: 'Marketing site or brand platform',
    features: ['Up to 6 pages', 'Custom design', 'CMS integration', 'Responsive', 'SEO setup', '4-week delivery'],
  },
  {
    name: 'SaaS Build',
    monthly: 12000,
    annual: 9800,
    desc: '0→1 product, 6-week sprint',
    features: ['Architecture & design', 'Full-stack implementation', 'Auth & payments', 'Admin dashboard', 'CI/CD pipeline', 'Production deployment'],
    popular: true,
  },
  {
    name: 'Enterprise',
    monthly: null,
    annual: null,
    desc: 'Custom scope & timeline',
    features: ['Dedicated team', 'Custom integrations', 'Legacy migration', 'On-premise option', 'SLA guarantee', 'Ongoing support'],
  },
];

const SAAS_TIERS = [
  {
    name: 'Department',
    monthly: 299,
    annual: 249,
    desc: 'Single department, up to 50 users',
    features: ['Grant tracking', 'Publication analytics', 'Basic exports', 'Email support', '99.5% uptime SLA'],
  },
  {
    name: 'Institution',
    monthly: 899,
    annual: 749,
    desc: 'Multi-department, up to 500 users',
    features: ['Everything in Department', 'Multi-dept views', 'SSO integration', 'Audit trail', 'Priority support', '99.9% uptime SLA'],
    popular: true,
  },
  {
    name: 'Enterprise',
    monthly: null,
    annual: null,
    desc: 'Unlimited users, custom deployment',
    features: ['Everything in Institution', 'On-premise option', 'Custom integrations', 'Dedicated account team', 'SLA guarantee', '99.99% uptime SLA'],
  },
];

const COMPARISON_FEATURES = [
  { name: 'Grant tracking', dept: true, inst: true, ent: true },
  { name: 'Publication analytics', dept: true, inst: true, ent: true },
  { name: 'CSV/PDF exports', dept: 'Basic', inst: 'Advanced', ent: 'Custom' },
  { name: 'Multi-department views', dept: false, inst: true, ent: true },
  { name: 'SSO (SAML/OIDC)', dept: false, inst: true, ent: true },
  { name: 'Audit trail', dept: false, inst: true, ent: true },
  { name: 'API access', dept: false, inst: 'Rate-limited', ent: 'Unlimited' },
  { name: 'On-premise deployment', dept: false, inst: false, ent: true },
  { name: 'Custom integrations', dept: false, inst: false, ent: true },
  { name: 'Dedicated account team', dept: false, inst: false, ent: true },
  { name: 'Uptime SLA', dept: '99.5%', inst: '99.9%', ent: '99.99%' },
  { name: 'Support', dept: 'Email', inst: 'Priority', ent: 'Dedicated' },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return (
      <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '12px', color: 'var(--ink)' }}>
        {value}
      </span>
    );
  }
  return value ? (
    <span style={{ color: 'var(--data)', fontSize: '14px' }}>✓</span>
  ) : (
    <span style={{ color: 'var(--ink-muted)', fontSize: '14px', opacity: 0.3 }}>—</span>
  );
}

export function PricingPageClient() {
  const [activeTab, setActiveTab] = useState<Tab>('saas');
  const [billing, setBilling] = useState<Billing>('annual');

  const tiers = activeTab === 'studio' ? STUDIO_TIERS : SAAS_TIERS;

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-16">
        <BlueprintGrid sectionLabel="PRC.01" />
        <div className="container-genauix relative z-10 text-center">
          <motion.span
            className="coordinate-tick block mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            PRC.01 — Pricing
          </motion.span>
          <motion.h1
            className="font-display mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Transparent pricing
          </motion.h1>
          <motion.p
            className="mx-auto mb-12"
            style={{ fontSize: '17px', color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 520 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            No hidden fees, no procurement surprises. Pick your track and billing cycle.
          </motion.p>

          {/* Tab selector — Studio services vs Research SaaS */}
          <div className="flex flex-col items-center gap-6">
            <div
              className="inline-flex rounded-md p-1 relative"
              style={{ background: 'var(--surface)', border: '1px solid var(--hairline)' }}
            >
              {([
                { key: 'saas' as Tab, label: 'Research SaaS' },
                { key: 'studio' as Tab, label: 'Studio Services' },
              ]).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="relative px-6 py-2.5 rounded-md text-sm z-10"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: activeTab === tab.key ? 'var(--ink)' : 'var(--ink-muted)',
                    fontWeight: activeTab === tab.key ? 600 : 400,
                  }}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="pricing-tab"
                      className="absolute inset-0 rounded-md"
                      style={{ background: 'var(--surface-raised)', zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Billing toggle */}
            <div
              className="inline-flex rounded-md p-1 relative"
              style={{ background: 'var(--surface)', border: '1px solid var(--hairline)' }}
            >
              {(['monthly', 'annual'] as Billing[]).map((period) => (
                <button
                  key={period}
                  onClick={() => setBilling(period)}
                  className="relative px-5 py-2 rounded-md text-sm z-10"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: billing === period ? 'var(--ink)' : 'var(--ink-muted)',
                    fontWeight: billing === period ? 600 : 400,
                  }}
                >
                  {period === 'monthly' ? 'Monthly' : 'Annual (save 17%)'}
                  {billing === period && (
                    <motion.div
                      layoutId="billing-toggle"
                      className="absolute inset-0 rounded-md"
                      style={{ background: 'var(--surface-raised)', zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="pb-24 md:pb-32">
        <div className="container-genauix">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  className={`card-surface p-8 relative ${tier.popular ? 'ring-1' : ''}`}
                  style={tier.popular ? { borderColor: 'var(--signal)' } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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

                  <div className="mb-6">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={`${tier.name}-${billing}`}
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
                        {tier.monthly === null
                          ? 'Custom'
                          : `$${(billing === 'monthly' ? tier.monthly : tier.annual)?.toLocaleString()}`}
                      </motion.span>
                    </AnimatePresence>
                    {tier.monthly !== null && (
                      <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '12px', color: 'var(--ink-muted)', marginLeft: 4 }}>
                        {activeTab === 'saas' ? '/mo' : '/project'} {billing === 'annual' && '· billed annually'}
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
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* COMPARISON TABLE (SaaS only) */}
      {activeTab === 'saas' && (
        <section className="py-24 md:py-32" style={{ background: 'var(--surface)' }}>
          <div className="container-genauix">
            <div className="text-center mb-16">
              <span className="coordinate-tick block mb-4">PRC.02 — Comparison</span>
              <h2 className="font-display" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}>
                Feature comparison
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="sticky top-16 z-10" style={{ background: 'var(--surface)' }}>
                    <th className="text-left py-4 pr-4 border-b" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono-genauix)', fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 border-b" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono-genauix)', fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
                      Department
                    </th>
                    <th className="text-center py-4 px-4 border-b" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono-genauix)', fontSize: '11px', color: 'var(--signal)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
                      Institution
                    </th>
                    <th className="text-center py-4 pl-4 border-b" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono-genauix)', fontSize: '11px', color: 'var(--ink-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((row) => (
                    <tr key={row.name}>
                      <td className="py-3 pr-4 border-b" style={{ borderColor: 'var(--hairline)', fontSize: '14px', color: 'var(--ink)' }}>
                        {row.name}
                      </td>
                      <td className="py-3 px-4 border-b text-center" style={{ borderColor: 'var(--hairline)' }}>
                        <FeatureCell value={row.dept} />
                      </td>
                      <td className="py-3 px-4 border-b text-center" style={{ borderColor: 'var(--hairline)' }}>
                        <FeatureCell value={row.inst} />
                      </td>
                      <td className="py-3 pl-4 border-b text-center" style={{ borderColor: 'var(--hairline)' }}>
                        <FeatureCell value={row.ent} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 md:py-32 text-center">
        <div className="container-genauix">
          <h2 className="font-display mb-6" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Questions about pricing?
          </h2>
          <p className="mb-8 mx-auto" style={{ fontSize: '17px', color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 480 }}>
            Every institution is different. Contact us for a custom quote based on
            your department count, user volume, and integration requirements.
          </p>
          <MagnetButton href="/contact">Talk to us</MagnetButton>
        </div>
      </section>
    </>
  );
}

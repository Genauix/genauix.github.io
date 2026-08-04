/**
 * Contact Page Client — Section 6.6
 * 
 * Two-column: form left, Spline Glass Orb (recolored orange) right
 * Form: name / email / org type / message + File Upload (kokonut)
 * spline.emitEvent() on field focus for orb reactivity
 * Genauix@proton.me in large mono under form
 */
'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { SplineScene } from '@/components/spline-scene';
import { MagnetButton } from '@/components/magnet-button';
import { BlueprintGrid } from '@/components/blueprint-grid';

const ORG_TYPES = [
  'Research University',
  'Community College',
  'Federal Lab',
  'Medical Center',
  'Private Research Institute',
  'Startup',
  'Enterprise',
  'Other',
];

export function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orgType: '',
    message: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const splineRef = useRef<unknown>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSplineLoad = useCallback((app: unknown) => {
    splineRef.current = app;
  }, []);

  const handleFocus = (field: string) => {
    setFocusedField(field);
    // Section 6.6: spline.emitEvent() on field focus
    if (splineRef.current && typeof (splineRef.current as Record<string, unknown>).emitEvent === 'function') {
      (splineRef.current as { emitEvent: (name: string, data?: string) => void }).emitEvent('mouseDown', field);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to an API
    setSubmitted(true);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const inputStyle = {
    background: 'var(--surface)',
    border: '1px solid var(--hairline)',
    borderRadius: '6px',
    padding: '12px 16px',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    color: 'var(--ink)',
    width: '100%',
    outline: 'none',
    transition: 'border-color 150ms',
  };

  const inputFocusStyle = {
    borderColor: 'var(--signal)',
  };

  return (
    <>
      <section className="relative min-h-screen pt-32 pb-24 md:pb-32">
        <BlueprintGrid sectionLabel="CNT.01" />

        <div className="container-genauix relative z-10">
          <motion.span
            className="coordinate-tick block mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            CNT.01 — Contact
          </motion.span>
          <motion.h1
            className="font-display mb-12"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Start a project
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT — Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {submitted ? (
                <motion.div
                  className="card-surface p-12 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: 'var(--signal)', color: 'var(--canvas)' }}
                  >
                    <span style={{ fontSize: '24px' }}>✓</span>
                  </div>
                  <h3 className="mb-3" style={{ fontSize: '20px', fontWeight: 600 }}>
                    Message received
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                    We will respond within 24 hours with a scope estimate and timeline.
                    Check your inbox at <strong style={{ color: 'var(--ink)' }}>{formData.email}</strong>.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        fontFamily: 'var(--font-mono-genauix)',
                        fontSize: '11px',
                        color: 'var(--ink-muted)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Dr. Jane Smith"
                      style={{
                        ...inputStyle,
                        ...(focusedField === 'name' ? inputFocusStyle : {}),
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        fontFamily: 'var(--font-mono-genauix)',
                        fontSize: '11px',
                        color: 'var(--ink-muted)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="jane@university.edu"
                      style={{
                        ...inputStyle,
                        ...(focusedField === 'email' ? inputFocusStyle : {}),
                      }}
                    />
                  </div>

                  {/* Org type */}
                  <div>
                    <label
                      htmlFor="contact-org"
                      style={{
                        fontFamily: 'var(--font-mono-genauix)',
                        fontSize: '11px',
                        color: 'var(--ink-muted)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      Organization type
                    </label>
                    <select
                      id="contact-org"
                      required
                      value={formData.orgType}
                      onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                      onFocus={() => handleFocus('org')}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...inputStyle,
                        ...(focusedField === 'org' ? inputFocusStyle : {}),
                        appearance: 'none',
                      }}
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      {ORG_TYPES.map((type) => (
                        <option key={type} value={type} style={{ background: 'var(--surface)', color: 'var(--ink)' }}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{
                        fontFamily: 'var(--font-mono-genauix)',
                        fontSize: '11px',
                        color: 'var(--ink-muted)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      Tell us about your project
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => handleFocus('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="We need a research dashboard for 5 departments with grant tracking and compliance exports..."
                      style={{
                        ...inputStyle,
                        ...(focusedField === 'message' ? inputFocusStyle : {}),
                        resize: 'vertical',
                        minHeight: 120,
                      }}
                    />
                  </div>

                  {/* File Upload — RFP/brief */}
                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-mono-genauix)',
                        fontSize: '11px',
                        color: 'var(--ink-muted)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      Attach RFP or brief (optional)
                    </label>
                    <div
                      className="card-surface p-6 text-center"
                      style={{
                        borderStyle: 'dashed',
                        borderWidth: '1px',
                        cursor: 'pointer',
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleFileDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.txt,.md"
                      />
                      <p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>
                        Drop files here or <span style={{ color: 'var(--signal)' }}>browse</span>
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--ink-muted)', opacity: 0.6, marginTop: 4 }}>
                        PDF, DOC, DOCX, TXT, MD
                      </p>
                    </div>

                    {/* File list */}
                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {files.map((file, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-2 px-3 rounded-md"
                            style={{ background: 'var(--surface)' }}
                          >
                            <span style={{ fontFamily: 'var(--font-mono-genauix)', fontSize: '12px', color: 'var(--ink)' }}>
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              style={{ fontSize: '14px', color: 'var(--ink-muted)' }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <MagnetButton>
                    Send message
                  </MagnetButton>
                </form>
              )}

              {/* Direct email */}
              <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--hairline)' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono-genauix)',
                    fontSize: '11px',
                    color: 'var(--ink-muted)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  Or email directly
                </p>
                <a
                  href="mailto:Genauix@proton.me"
                  className="no-underline block"
                  style={{
                    fontFamily: 'var(--font-mono-genauix)',
                    fontSize: '24px',
                    color: 'var(--ink)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Genauix@proton.me
                </a>
              </div>
            </motion.div>

            {/* RIGHT — Spline Glass Orb (recolored orange) */}
            <motion.div
              className="relative h-[400px] lg:h-[600px] hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SplineScene
                scene="https://prod.spline.design/QUd226WOUZbE30Ib/scene.splinecode"
                className="w-full h-full"
                onLoad={handleSplineLoad}
              />

              {/* Subtle glow that reacts to focused field */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: focusedField ? 0.15 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'radial-gradient(circle at center, var(--signal) 0%, transparent 70%)',
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

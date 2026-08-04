# Genauix — Precision Engineering Studio

Precision-built websites, SaaS platforms, and research infrastructure. Built with Next.js 16, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + custom Genauix design system
- **Animation:** Motion (Framer Motion) + Spline 3D
- **Charts:** Recharts
- **Fonts:** Instrument Serif, Geist Sans, Geist Mono
- **Components:** shadcn/ui + KokonutUI

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Genauix design system tokens
│   ├── layout.tsx           # Root layout with fonts + SEO
│   └── (marketing)/         # Marketing pages
│       ├── layout.tsx        # Shared nav, footer, cursor
│       ├── page.tsx          # Home
│       ├── product/          # Research & Institutions SaaS
│       ├── services/         # Service offerings
│       ├── pricing/          # Pricing tiers
│       ├── studio/           # Studio showcase
│       └── contact/          # Contact form
├── components/
│   ├── nav.tsx              # Navigation with logo
│   ├── footer.tsx           # Footer with live UTC clock
│   ├── spline-scene.tsx     # Spline 3D wrapper
│   ├── charts/              # Recharts components
│   └── ...                  # UI primitives
└── lib/
    ├── utils.ts             # Utility functions
    └── motion-variants.ts   # Animation presets
```

## Deployment

This project is configured for deployment on **Vercel** or **GitHub Pages**.

### Vercel (Recommended)

Connect this repository to [Vercel](https://vercel.com) — it will auto-detect Next.js and deploy.

### Build

```bash
npm run build
```

## Contact

**Email:** [Genauix@proton.me](mailto:Genauix@proton.me)

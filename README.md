# Monkhood Club — Digital Sangha Platform

A high-performance, mobile-optimized landing and membership platform for **Monkhood Club**. Built with React 19, TypeScript, Vite, and Tailwind CSS.

---

## ⚡ Features

- **Sacred Geometry Lotus Mandala**: GPU-accelerated canvas particle ambient background and spinning sacred geometry wheel.
- **Dual Tier Membership Pricing Stack**:
  - **Monthly Membership**: ₹51/month, 9 core Sangha benefits with direct checkout integration.
  - **Yearly Membership (⚡ MOST POPULAR)**: ₹499/year (Save 18% • ₹113 off), all 15 exclusive tier benefits with direct checkout integration.
- **Onboarding Guide**: 3-step path for immediate sangha access after subscription.
- **Interactive Phone Showcase**: Smooth multi-slide app preview carousel with touch gestures, keyboard arrows, and live tabs (*Feed*, *Courses Vol. 1-3*, *Messages*).
- **Tactile Click Feedback**: Integrated Web Audio micro-click and mobile haptic vibration response on touch.
- **Mobile Floating Quick-Bar**: Unobtrusive bottom action bar for smartphone users with quick 1-tap checkout buttons.
- **Fast DNS & Asset Prefetching**: Preloaded fonts, hero assets, and Cloudflare Pages caching rules.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
The compiled static assets will be output to the `dist/` folder.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deploy to Cloudflare Pages (Step-by-Step)

This repository is pre-configured for direct, zero-config deployment on **Cloudflare Pages**:

1. Push this repository to **GitHub**.
2. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages**.
3. Click **Create Application** > **Pages** > **Connect to Git**.
4. Select your GitHub repository (`monkhood-club`).
5. In the **Build configuration** settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave blank)
6. Click **Save and Deploy**.

### Cloudflare Pages Configuration Included
- **`public/_redirects`**: Configured with `/* /index.html 200` for client-side SPA routing.
- **`public/_headers`**: Configured with 1-year immutable caching for static assets, immediate revalidation for HTML, and standard security headers.

---

## 📁 Project Structure

```text
├── index.html              # HTML entry with font preconnects & SEO metadata
├── package.json            # Scripts & project dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration with Tailwind CSS plugin
├── public/                 # Static assets copied to dist/ on build
│   ├── _redirects          # Cloudflare Pages SPA redirect rule
│   ├── _headers            # Cloudflare Pages cache & security headers
│   ├── favicon.ico         # Browser favicon
│   ├── logo.png            # High-res Monkhood Club lotus logo
│   ├── logo-sm.webp        # Optimized WebP logo
│   ├── apple-touch-icon.png# iOS touch icon
│   └── assets/             # Hero banner & app showcase screenshots
└── src/
    ├── App.tsx             # Complete Monkhood Club application
    ├── index.css           # Tailwind CSS imports & animations
    └── main.tsx            # React 19 root entry
```

---

## 🛠️ Built With

- **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite 8](https://vite.dev/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[Lucide React](https://lucide.dev/)**

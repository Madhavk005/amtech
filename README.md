# Amtech Cranes — Website

Official marketing website for [Amtech Cranes](https://amtechcranes.com) — manufacturer of Electric Overhead Travelling (EOT) cranes since 1990.

## Tech Stack

- **React 19** + **Vite 8** (ESM, CSS Modules)
- **React Router 7** — SPA routing with lazy-loaded routes
- **Framer Motion** — page transitions & scroll animations
- **Lucide React** — icons
- **react-helmet-async** — per-page SEO metadata
- **@vercel/analytics** — web analytics

## Getting Started

```bash
npm install
npm run dev        # dev server on http://localhost:3000
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run lint       # ESLint (flat config)
```

## Project Structure

```
src/
  App.jsx              # Lazy route definitions
  pages/               # Route-level pages (+ .module.css per page)
  components/
    layout/            # Navbar, Footer, Layout, ScrollToTop
    ui/                # Button, Card, ContactForm, SEO, Preloader, ...
  data/                # siteData.js (products/industries/services), configuratorData.js
  services/            # api.js (fetch wrappers)
  context/             # ThemeContext (dark/light)
  utils/               # Framer Motion variants
public/
  api/                 # PHP mail endpoints (Hostinger) — contact.php, quote.php
  images/ videos/      # Static assets
server/                # Optional Node/Express + Resend email backend (local dev)
```

## Form Handling

Two submission paths are supported:

1. **Production (Hostinger):** `public/api/contact.php` and `public/api/quote.php` use PHP `mail()`.
   Both validate input, strip control characters (header-injection safe), rate-limit via session
   (5 submissions / 10 min), and include a honeypot field.
2. **Local / alternative:** the Express server in `server/` (Resend provider). Copy
   `server/.env.example` → `server/.env` and run `npm install && npm start` inside `server/`.

## Deployment (Hostinger)

1. `npm run build`
2. Upload `dist/` contents to `public_html/`
3. `public/.htaccess` ships with the build — it rewrites all routes to `index.html` so
   client-side URLs (e.g. `/about`, `/products/...`) work on refresh.

# GCG Website

Public website for Ghoussoub Consulting Group. The app is built with React, TypeScript, Vite, Tailwind CSS, React Router, and Framer Motion.

## Local Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

The site is served with the GitHub Pages base path `/gcg-website/`.

## Umami Analytics

Analytics are disabled until `VITE_UMAMI_WEBSITE_ID` is set. Copy `.env.example` to `.env.local` and fill in the website ID from Umami.

```bash
VITE_UMAMI_WEBSITE_ID=your-website-id
VITE_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
VITE_UMAMI_DOMAINS=gcginnovate.com,www.gcginnovate.com
VITE_UMAMI_PERFORMANCE=true
```

The integration injects the Umami script once at the app root. Umami records SPA page views automatically and the site also marks key CTAs, newsletter submits, contact submits, and 404 exits as named events.

## Verification

```bash
npm run lint
npm run build
```

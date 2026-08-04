// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// =============================================================================
// Dual-deploy: GitHub Pages (estático) + Vercel (static + rutas on-demand CMS)
// - GitHub Pages: SKIP_KEYSTATIC=true  → build estático, base /De-La-Parra
// - Vercel / local: sin SKIP_KEYSTATIC  → adapter de Vercel + rutas /keystatic
// =============================================================================
const isStatic = process.env.SKIP_KEYSTATIC === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://de-la-parra-couture.github.io',
  base: isStatic ? '/De-La-Parra' : '/',
  output: 'static',
  adapter: isStatic ? undefined : vercel(),

  integrations: [
    react(),
    ...(isStatic ? [] : [keystatic()]),
  ],

  redirects: isStatic
    ? undefined
    : {
        '/admin': '/keystatic',
      },

  vite: {
    plugins: [tailwindcss()],
  },
});

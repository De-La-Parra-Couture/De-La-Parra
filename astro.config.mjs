// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://de-la-parra-couture.github.io',
  base: '/De-La-Parra',
  vite: {
    plugins: [tailwindcss()],
  },
});

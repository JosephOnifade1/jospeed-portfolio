import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { blogCollection } from './scripts/blog-content.js';
import { buildPortfolio, portfolioPages } from './scripts/generate-seo.js';

export default defineConfig({
  base: '/',
  appType: 'mpa', // Never serve index.html as a successful response for an unknown URL.
  environments: {
    ssr: { build: { ssr: 'src/entry-static.jsx', outDir: 'dist-ssr', copyPublicDir: false } },
  },
  builder: { buildApp: buildPortfolio },
  plugins: [react(), blogCollection(), portfolioPages()],
});

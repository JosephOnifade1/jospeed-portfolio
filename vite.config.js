import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { portfolioPages } from './scripts/generate-seo.js';

export default defineConfig({
  base: '/',
  plugins: [react(), portfolioPages()],
});

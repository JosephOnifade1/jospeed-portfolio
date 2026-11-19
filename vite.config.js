import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { blogCollection } from './scripts/blog-content.js';
import { portfolioPages } from './scripts/generate-seo.js';

export default defineConfig({
  base: '/',
  plugins: [react(), blogCollection(), portfolioPages()],
});

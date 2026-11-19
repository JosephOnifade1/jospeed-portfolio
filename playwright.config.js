import { defineConfig } from '@playwright/test';

const baseURL = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4180';

export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL, browserName: 'chromium' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: process.env.PORTFOLIO_TEST_URL
    ? undefined
    : {
        command: 'npm run dev -- --host 0.0.0.0 --port 4180 --strictPort',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
      },
});

import { defineConfig } from '@playwright/test';

const production = process.env.PLAYWRIGHT_PREVIEW === '1';
const port = production ? 5174 : 5173;
const url = `http://127.0.0.1:${port}/ielts-words/`;

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: url,
    headless: true,
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
      args: ['--no-sandbox'],
    },
  },
  webServer: {
    command: production
      ? `npm run preview -- --port ${port} --strictPort`
      : `npm run dev -- --port ${port} --strictPort`,
    url,
    reuseExistingServer: !process.env.CI && !production,
  },
});

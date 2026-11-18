import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Lab01.
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Folder that holds the test files
  testDir: './tests',
  // Run tests in parallel — possible because every test is isolated
  fullyParallel: true,
  // Retry once on CI only, to separate flaky failures from real ones
  retries: process.env.CI ? 1 : 0,
  // HTML report (saved to playwright-report/) + console list output
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    // All page.goto('/') calls are resolved relative to this URL
    baseURL: 'https://www.saucedemo.com',
    // Record a trace for every test so it can be opened in Trace Viewer
    trace: 'on',
    // Record a video of every test run
    video: 'on',
    // Take a screenshot when a test fails
    screenshot: 'only-on-failure',
    // saucedemo uses data-test attributes instead of data-testid
    testIdAttribute: 'data-test',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});

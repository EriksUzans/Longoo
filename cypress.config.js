const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'jit9ih',
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || 'https://stage.longo.lv',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    // Ensure supportFile points to your root e2e.js file instead of false
    supportFile: './e2e.js', 
    allowCypressEnv: false,
    trashAssetsBeforeRuns: false,
    video: false,
    specPattern: '**/*.spec.js',
    excludeSpecPattern: [
      '**/LongoPage.js',
      '**/cypress.config.js',
      '**/node_modules/**',
    ],
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        const locale = config.env.locale || 'en-US';
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push(`--lang=${locale}`);
        }
        return launchOptions;
      });
    },
  },
  // Mochawesome Reporting Configuration
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha',
    overwrite: false,
    html: false,
    json: true,
  },
});
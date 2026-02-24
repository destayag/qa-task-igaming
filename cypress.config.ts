import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "https://stage.spinbet.com/",
    specPattern: "cypress/e2e/**/*.spec.ts",
    supportFile: "cypress/support/e2e.ts",
    video: true,
    videoCompression: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    slowTestThreshold: 1000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      CLOSE_OVERLAYS: true,
    },
  },
});

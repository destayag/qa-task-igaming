import { defineConfig } from "cypress";

// Read TEST_ENV (defaults to stage)
const TEST_ENV = (process.env.TEST_ENV || "stage").toLowerCase();

// Map environments here
const BASE_URLS: Record<string, string> = {
  stage: "https://stage.spinbet.com/",
  prod: "", // adjust if needed
};

export default defineConfig({
  e2e: {
    baseUrl:
      process.env.CYPRESS_BASE_URL || BASE_URLS.stage,

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
      TEST_ENV,
    },
  },
});
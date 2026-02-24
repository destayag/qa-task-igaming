# QA Task --- iGaming (Cypress + TypeScript)

## Problem

SpinBet’s Stage environment needs reliable, production-grade automated coverage for two high-value user journeys:

1. **Registration wizard** from **Sign Up** through **Claim Your Bonus**
2. **Casino lobby search + launch** (e.g., search **Sweet Bonanza**, open the game, verify it loads)

## Solution

This repository provides a **Cypress + TypeScript** E2E test suite using the **Page Object Model (POM)** with:

- Clear separation of **test intent** (specs) vs **UI mechanics/selectors** (page objects)
- **Smoke** and **Regression** tagging per test
- Assertion-driven waits (no `cy.wait()` sleeps)
- Retries in CI (`retries.runMode = 2`)
- GitHub Actions CI workflow

## Technical choices

- **Cypress**: excellent DX + debugging artifacts
- **TypeScript**: safer refactors, maintainable suite
- **POM**: centralized selectors, readable tests
- **Custom commands**: reusable test data helpers
- **Env vars**: easy stage/prod swapping without code changes

---

## Automation Tests

Automated E2E test suite for SpinBet Stage focusing on two key user
journeys:

1.  Registration Wizard --- from clicking **Sign Up** through **Claim
    Your Bonus**
2.  Casino Lobby Search --- search for a game (e.g., Sweet Bonanza),
    open it, and verify it's running

---

## Tech Stack

- Cypress
- TypeScript
- Page Object Model (POM)
- Tag-based execution (smoke / regression)

---

## Project Structure

    .
    ├─ cypress/
    │  ├─ e2e/
    │  │  ├─ registration.spec.ts
    │  │  └─ casino-search.spec.ts
    │  ├─ pages/
    │  │  ├─ HomePage.ts
    │  │  ├─ RegistrationWizard.ts
    │  │  ├─ CasinoPage.ts
    │  │  └─ SearchOverlay.ts
    │  ├─ fixtures/
    │  │  └─ testData.json
    │  └─ support/
    │     ├─ e2e.ts
    │     └─ commands.ts
    ├─ docs/
    │  ├─ test-plan.md
    │  └─ test-cases.md
    ├─ cypress.config.ts
    ├─ package.json
    └─ README.md

---

## Documentation

- Test Plan: `docs/test-plan.md`
- Test Cases: `docs/test-cases.md`

These documents include full scope, coverage, test data, priorities, and
risk considerations.

---

## Test Suites & Tags

Each test is tagged for selective execution:

- `smoke` → critical path validation
- `regression` → extended validation & negative scenarios

Example:

```ts
it("REG-001 Open registration wizard", { tags: ["smoke", "regression"] }, () => {
  ...
});
```

---

## How to Run

### Install dependencies

```bash
npm install
```

### Open Cypress

```bash
npm run cy:open
```

### Run all tests

```bash
npm run cy:run
```

### Run Smoke tests only

```bash
npm run cy:smoke
```

### Run Regression tests only

```bash
npm run cy:regression
```

---

## CI

Designed to run in GitHub Actions:

- Headless execution
- Screenshot on failure
- Parallel-ready structure

---

## Notes

- If using a fixed email for registration, ensure the account is reset
  between runs.
- Dynamic test data (email/phone) is recommended for regression
  stability.
- Prefer stable selectors (e.g., data-testid) if available.

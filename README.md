# SpinBet Stage — Cypress E2E (TypeScript + POM)

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

## Install

```bash
npm install
```

## Run

```bash
npm run cy:open
npm run cy:run
```

## Base URL override

```bash
CYPRESS_BASE_URL=https://stage.spinbet.com/en-nz npm run cy:run
```

## Tags

Tests are tagged in titles:

- `[smoke]`
- `[regression]`

Docs:

- `docs/test-plan.md`
- `docs/test-cases.md`

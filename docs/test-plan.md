# Test Plan — SpinBet Stage (Cypress + TypeScript)

## 1. Overview

**Goal:** Validate two critical customer journeys on SpinBet Stage using production-quality E2E automation in **Cypress + TypeScript**.

**In scope**

1. **Registration wizard** from **Sign Up** until **Claim Your Bonus**
   - Base URL: `https://stage.spinbet.com/en-nz`
   - Wizard overlays observed in screenshots:
     - Step 01: `overlay=account-details`
     - Step 02: `overlay=bonus-selection`
     - Step 03: `overlay=personal-information`
     - Step 04: `overlay=address-details`
     - Step 05: `overlay=payment-information`
     - Final: **Claim Your Bonus**
2. **Casino Lobby search + launch game**
   - URL: `https://stage.spinbet.com/en-nz/casino`
   - Search overlay observed: `overlay=search`
   - Example game flow: search “Sweet Bonanza”, open game, verify it’s running

**Out of scope (unless requested)**

- Payments/deposits execution (real money transactions), withdrawals, KYC deep flows
- Performance/load testing
- Native mobile app testing (responsive checks optional)

## 2. Test Strategy

### 2.1 Test Types

- **E2E Functional UI tests** (primary)
- **Negative validation tests** for required fields and constraints
- **Critical UI checks** (visibility/enabled state, correct step transitions)
- **Resiliency checks** (refresh/back, overlay close, basic error states)

### 2.2 Tagging Strategy (Smoke vs Regression)

We tag tests directly in titles to keep the suite dependency-free and easy to read:

- **Smoke**: `it('[smoke] ...', () => {})`
- **Regression**: `it('[regression] ...', () => {})`

**Smoke suite (minimal confidence check)**

- Registration happy path to “Claim Your Bonus”
- Terms & Conditions gating (wizard Step 02)
- Casino search returns results
- Launch game and verify it loads

### 2.3 Coverage Focus (Based on Screenshots)

**Registration wizard fields observed**

- Step 01 (Account Details): `Username`, `Email`, `Password (Min 6 characters)`, `Mobile Phone (+64 default)`, `Referral Code (optional)`
- Step 02 (Bonus Selection): select bonus card, `Promo Code (optional)`, checkbox “Get Exclusive Updates”, checkbox “I agree and understand the Terms of Conditions”, button “I don’t want a bonus”, **Next**
- Step 03 (Personal Information): `First Name`, `Last Name`, `Date of Birth (DD/MM/YYYY)`
- Step 04 (Address Details): `Address`, `City`, `Region (dropdown)`, `Zip Code`
- Step 05 (Payment Information): method list (e.g., Neteller, Skrill, Credit Card, CoinsPaid, Mifinity), “Show More Payments”

**Casino lobby/search observed**

- Casino lobby with categories (Lobby/Popular/Featured/…)
- Search icon opens overlay with tabs `Casino` / `Sports`
- Search input with “No results found” empty state
- Results show game cards (example: “Chip Spin”) with `Play now` and `Demo` buttons

## 3. Test Environment

- **Environment:** Stage
- **Base URL:** `https://stage.spinbet.com/en-nz`
- **Casino URL:** `https://stage.spinbet.com/en-nz/casino`
- **Browser:** Chrome/Chromium (primary in CI)
- **Viewport:** Desktop baseline (e.g., 1280×720). Optional: one responsive check for critical flow.

## 4. Test Data

### 4.1 Account Data (Unique per run)

- Email: `qa+<timestamp>@example.com` (generated at runtime)
- Password: `SpinbetQA!23456` (meets typical complexity; adjust if stricter)
- Phone (NZ): example `0211234567` with `+64` country code selected
- DOB: `01/01/1990` (adult)
- Address: realistic NZ sample (e.g., `1 Queen Street`, `Auckland`, `Auckland`, `1010`)

### 4.2 Casino Search Data

- Primary: `Sweet Bonanza`
- Negative: `zzzz-not-a-game`

## 5. Entry / Exit Criteria

### Entry Criteria

- Stage is reachable and responsive
- Registration wizard opens from top navigation **Sign Up**
- Casino lobby loads and search overlay works

### Exit Criteria

- Smoke suite passes consistently
- Regression suite passes (or failures documented with repro steps + screenshots/video)
- CI pipeline runs the suite on PRs

## 6. Risks & Mitigations

| Risk                                       | Impact                   | Mitigation                                                                                   |
| ------------------------------------------ | ------------------------ | -------------------------------------------------------------------------------------------- |
| Flaky UI due to animations/overlays        | Intermittent failures    | Use stable selectors, close overlays, assert state instead of fixed waits                    |
| Unique email requirement                   | Duplicate failures       | Generate unique email per test run                                                           |
| Captcha/anti-bot                           | Blocking automation      | Request QA bypass on Stage; mark as known limitation if present                              |
| Game loads in iframe/provider container    | Hard to assert “running” | Assert container visible + iframe src non-empty + “loading” removed (best-effort)            |
| Payment step may require external provider | Unstable                 | Do not execute real deposits; validate payment method list renders and step navigation works |

## 7. Automation Approach (Cypress + TypeScript + POM)

### 7.1 Design

- **Page Object Model (POM)** to isolate selectors and UI behaviors
- **Custom commands** for common actions (open overlays, close cookie banner, generate test user)
- **Environment variables** for base URL and sensitive config
- **Retries** enabled for stability in CI
- **Artifacts**: screenshots/videos on failure

### 7.2 Selector Strategy

Preference order:

1. `data-testid` / `data-test` attributes (best)
2. Accessibility attributes (labels/roles)
3. Stable text selectors (only for fixed labels like “Sign Up”, “Next”)
4. CSS selectors (avoid deep DOM chains)

### 7.3 Reporting & Debugging

- Use Cypress screenshots/videos
- Optional: Allure results (if included in the repo) for richer reporting

## 8. Test Execution

### Suites

- **Smoke**: fast checks for pipeline gating
- **Regression**: full coverage including negative/edge cases

### Suggested Run Commands

- `npm run cy:open` (local debugging)
- `npm run cy:run` (CI headless)
- Filter by tag (simple grep in CI step, no extra libs):
  - Smoke only: run spec files dedicated to smoke OR name-based filtering (if allowed)

## 9. Deliverables

- `docs/test-plan.md` (this file)
- `docs/test-cases.md` (detailed cases with tags)
- Cypress TypeScript specs aligned with these cases
- CI workflow executing smoke/regression

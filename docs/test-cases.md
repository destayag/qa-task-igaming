# Test Cases — SpinBet Stage (Registration + Casino Search)

## Tagging

- **[smoke]** = critical path / build gate
- **[regression]** = broader coverage including negatives and edge cases

---

## A. Registration Wizard (Sign Up → Claim Your Bonus)

**Base URL:** `https://stage.spinbet.com/en-nz`  
**Wizard overlays (as observed):**

- Step 01: Account Details (`overlay=account-details`)
- Step 02: Bonus Selection (`overlay=bonus-selection`)
- Step 03: Personal Information (`overlay=personal-information`)
- Step 04: Address Details (`overlay=address-details`)
- Step 05: Payment Information (`overlay=payment-information`)
- Final: Claim Your Bonus

### REG-001 — [smoke][regression] Open registration wizard from home

**Priority:** P0  
**Steps:**

1. Navigate to `/en-nz`
2. Click **Sign Up** (top-right button)
   **Expected:**

- Registration overlay opens
- Step indicator shows **01 Account Details**
- URL may include `overlay=account-details`

---

### REG-002 — [smoke][regression] Complete Account Details step successfully

**Priority:** P0  
**Test Data (example):**

- Username: `JohnDoeQA`
- Email: unique email (`qa+<timestamp>@example.com`)
- Password: `SpinbetQA!23456` (>= 6 chars)
- Phone: `0211234567` with country code `+64`
  **Steps:**

1. On **Account Details** step, fill Username, Email, Password, Mobile Phone
2. Leave **Referral Code (optional)** empty
3. Click **Next**
   **Expected:**

- Wizard advances to **02 Bonus Selection**
- No validation errors shown

---

### REG-003 — [regression] Account Details required field validation (empty submit)

**Priority:** P1  
**Steps:**

1. Open Account Details
2. Click **Next** without filling required fields
   **Expected:**

- Required field errors appear (e.g., username/email/password/phone)
- User remains on Step 01

---

### REG-004 — [regression] Email format validation

**Priority:** P1  
**Steps:**

1. Enter invalid email (e.g., `user@`)
2. Fill other required fields valid
3. Click **Next**
   **Expected:**

- Email field displays validation error
- Wizard does not proceed

---

### REG-005 — [regression] Password minimum length validation

**Priority:** P1  
**Steps:**

1. Enter password shorter than 6 chars (e.g., `12345`)
2. Fill other required fields valid
3. Click **Next**
   **Expected:**

- Password validation shown (min length)
- Wizard does not proceed

---

### REG-006 — [regression] Mobile phone validation (non-numeric / too short)

**Priority:** P2  
**Steps:**

1. Enter invalid phone (letters or too few digits)
2. Click **Next**
   **Expected:**

- Phone validation error displayed
- Wizard does not proceed

---

### REG-007 — [smoke][regression] Bonus selection requires Terms acceptance

**Priority:** P0  
**Notes from UI:** Checkbox reads: “I agree and understand the Terms of Conditions”  
**Steps:**

1. Reach Step 02 Bonus Selection
2. Ensure a bonus is selected (default card is selected in screenshot)
3. Leave Terms checkbox **unchecked**
4. Click **Next**
   **Expected:**

- Terms error/gating appears
- Wizard stays on Step 02

---

### REG-008 — [smoke][regression] Bonus selection proceeds when Terms accepted

**Priority:** P0  
**Steps:**

1. On Step 02, select any bonus card (or keep default)
2. Check **I agree and understand the Terms of Conditions**
3. (Optional) Toggle **Get Exclusive Updates**
4. Click **Next**
   **Expected:**

- Wizard advances to **03 Personal Information**

---

### REG-009 — [regression] Promo Code is optional

**Priority:** P3  
**Steps:**

1. On Step 02, leave Promo Code blank
2. Accept Terms
3. Click **Next**
   **Expected:**

- Wizard proceeds successfully

---

### REG-010 — [regression] “I don’t want a bonus” option works

**Priority:** P2  
**Steps:**

1. On Step 02, click **I don’t want a bonus**
2. Accept Terms if still required
3. Click **Next**
   **Expected:**

- Wizard proceeds to Step 03
- Bonus selection is set to “no bonus” state (as per UI behavior)

---

### REG-011 — [smoke][regression] Personal Information required validation

**Priority:** P0  
**Notes from UI:** Example error shown: “First name cannot be empty”  
**Steps:**

1. On Step 03, leave First Name empty
2. Click **Next**
   **Expected:**

- Error appears under First Name (or field highlighted)
- Wizard does not proceed to Step 04

---

### REG-012 — [smoke][regression] Complete Personal Information successfully

**Priority:** P0  
**Test Data:**

- First Name: `John`
- Last Name: `Doe`
- DOB: `01/01/1990` (DD/MM/YYYY)
  **Steps:**

1. Fill First Name, Last Name, DOB
2. Click **Next**
   **Expected:**

- Wizard advances to **04 Address Details**

---

### REG-013 — [regression] DOB format validation (invalid format)

**Priority:** P2  
**Steps:**

1. Enter DOB in wrong format (e.g., `1990-01-01`)
2. Click **Next**
   **Expected:**

- DOB validation error appears
- Wizard does not proceed

---

### REG-014 — [regression] Address Details required validation

**Priority:** P1  
**Fields observed:** Address, City, Region (dropdown), Zip Code  
**Steps:**

1. On Step 04, click **Next** with all fields empty
   **Expected:**

- Required field validations shown
- Wizard does not proceed

---

### REG-015 — [smoke][regression] Complete Address Details successfully

**Priority:** P0  
**Test Data (example):**

- Address: `1 Queen Street`
- City: `Auckland`
- Region: `Auckland` (select from dropdown)
- Zip Code: `1010`
  **Steps:**

1. Fill Address, City, Zip Code
2. Select Region from dropdown
3. Click **Next**
   **Expected:**

- Wizard advances to **05 Payment Information**

---

### REG-016 — [smoke][regression] Payment Information step renders payment methods

**Priority:** P0  
**Observed methods:** Neteller, Skrill, Credit Card, CoinsPaid, Mifinity; “Show More Payments”  
**Steps:**

1. Reach Step 05 Payment Information
   **Expected:**

- Payment method list is visible
- “Show More Payments” control exists (if present)

---

### REG-017 — [smoke][regression] Continue to “Claim Your Bonus” (end-to-end wizard)

**Priority:** P0  
**Steps:**

1. Complete Steps 01–05 with valid data
2. Proceed until the wizard reaches **Claim Your Bonus**
   **Expected:**

- “Claim Your Bonus” step/screen is displayed (step indicator shows final stage)

---

### REG-018 — [regression] Wizard navigation: Back button returns to previous step

**Priority:** P2  
**Steps:**

1. On Step 04 Address Details, click back arrow (top-left in wizard card)
   **Expected:**

- Wizard returns to Step 03
- Previously entered data persists (if product supports it)

---

### REG-019 — [regression] Close wizard (X) works safely

**Priority:** P2  
**Steps:**

1. Open registration wizard
2. Click **X** (top-right close icon)
   **Expected:**

- Overlay closes
- User returns to underlying page without UI break

---

### REG-020 — [regression] Refresh behavior after reaching later steps

**Priority:** P2  
**Steps:**

1. Navigate to Step 03 or Step 04
2. Refresh browser
   **Expected (best-effort, depending on product):**

- Either user remains in wizard at the same step OR is returned safely to base page
- No blank/broken UI state

---

## B. Casino Lobby Search & Game Launch

**Casino URL:** `https://stage.spinbet.com/en-nz/casino`  
**Search overlay observed:** `overlay=search` with tabs `Casino` and `Sports`

### CAS-001 — [smoke][regression] Open casino lobby successfully

**Priority:** P0  
**Steps:**

1. Navigate to `/en-nz/casino`
   **Expected:**

- Casino lobby loads
- Category tabs visible (Lobby, Popular, Featured, etc. as seen)
- Search icon visible (top-right)

---

### CAS-002 — [smoke][regression] Open search overlay

**Priority:** P0  
**Steps:**

1. Click search icon
   **Expected:**

- Search overlay opens
- `Casino` tab selected by default
- Search input visible

---

### CAS-003 — [regression] Search “zzzz-not-a-game” returns “No results found”

**Priority:** P2  
**Steps:**

1. Open search overlay
2. Type `zzzz-not-a-game`
   **Expected:**

- Empty state shows **No results found**

---

### CAS-004 — [regression] Search returns results list/grid (generic query)

**Priority:** P2  
**Steps:**

1. Search for `spin`
   **Expected:**

- Results appear (example in screenshot shows “Chip Spin”)
- Each result has actionable controls (e.g., `Play now`, `Demo`) if applicable

---

### CAS-005 — [smoke][regression] Search “Sweet Bonanza” shows the game in results

**Priority:** P0  
**Steps:**

1. Search for `Sweet Bonanza`
   **Expected:**

- “Sweet Bonanza” appears in results list/grid

---

### CAS-006 — [smoke][regression] Open “Sweet Bonanza” from search results

**Priority:** P0  
**Steps:**

1. From results, click the “Sweet Bonanza” game tile (or Play/Demo)
   **Expected:**

- Game launch page/modal opens OR route changes to a game URL (provider-dependent)
- A game container is visible

---

### CAS-007 — [smoke][regression] Verify game is running (provider container/iframe ready)

**Priority:** P0  
**Steps:**

1. Launch “Sweet Bonanza”
2. Wait for load to complete
   **Expected (robust assertions, choose what matches UI):**

- Game container is visible
- An iframe exists and is visible **OR** provider canvas/video element is present
- iframe `src` is non-empty and not `about:blank`
- Loading overlay/spinner disappears (if present)

---

### CAS-008 — [regression] Search is case-insensitive

**Priority:** P3  
**Steps:**

1. Search `sweet bonanza`
   **Expected:**

- Results still include “Sweet Bonanza”

---

### CAS-009 — [regression] Clear search resets results

**Priority:** P3  
**Steps:**

1. Search any term
2. Clear input (use clear icon if present, or backspace)
   **Expected:**

- Results reset to default search state

---

### CAS-010 — [regression] Search overlay close (X) works

**Priority:** P2  
**Steps:**

1. Open search overlay
2. Click **X**
   **Expected:**

- Overlay closes
- Underlying casino page remains usable

---

## Traceability (High-level)

| Requirement                             | Covered by                                                    |
| --------------------------------------- | ------------------------------------------------------------- |
| Registration flow to “Claim Your Bonus” | REG-001, REG-002, REG-008, REG-012, REG-015, REG-016, REG-017 |
| Registration validation/negative checks | REG-003–REG-007, REG-011, REG-013–REG-014                     |
| Casino search and open game             | CAS-001–CAS-007                                               |
| Search negative/edge cases              | CAS-003–CAS-004, CAS-008–CAS-010                              |

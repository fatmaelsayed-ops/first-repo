## Bug Report

**Bug ID:** BUG-UIUX-06
**Title:** CTA buttons have no visual hover state — no feedback on mouse hover
**Reported Date:** 2026-04-21
**Reporter:** Automated Test Execution
**Environment:** https://store.development.qawafel.dev/kan-kan-2?login=open (Development)

### Severity & Priority
- **Severity:** Trivial
- **Priority:** Low

### Related Scenario
- **Feature file:** Registration/UIUXComparison.feature
- **Scenario name:** UIUX-18 - Button hover and focus states
- **Tags:** @interaction

### Preconditions
- Store URL accessible
- Browser supports CSS hover pseudo-class

### Steps to Reproduce
1. Navigate to https://store.development.qawafel.dev/kan-kan-2?login=open
2. Enter a phone number to enable the button
3. Hover the mouse over "أنشئ الحساب" button
4. Observe the button appearance — no change occurs

### Expected Result
Button should show visual hover feedback such as:
- Slight color change (lighter/darker shade)
- Box shadow
- Opacity change
- Scale transform
- Cursor already shows pointer (correct)

### Actual Result
Button appearance is identical before and after hover:
- Background: `rgb(20, 24, 29)` → **no change**
- Box-shadow: `none` → **no change**
- Opacity: `1` → **no change**
- No transform or transition applied

### Evidence
- **Screenshots:** `evidence/uiux-comparison/20260421_190813/04-login-btn-hover.png`
- **Computed styles:** Verified via `getComputedStyle()` during hover state
- **Failure step:** No visual hover feedback on CTA button

### Additional Notes
The same issue applies to both signup ("أنشئ الحساب") and login ("تسجل الدخول") buttons. While the cursor correctly changes to `pointer`, the lack of visual color/shadow feedback reduces the perceived interactivity of the button.

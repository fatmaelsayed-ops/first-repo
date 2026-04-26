## Bug Report

**Bug ID:** BUG-UIUX-07
**Title:** Phone input field has no visible focus indicator — WCAG 2.4.7 violation
**Reported Date:** 2026-04-21
**Reporter:** Automated Test Execution
**Environment:** https://store.development.qawafel.dev/kan-kan-2?login=open (Development)

### Severity & Priority
- **Severity:** Minor
- **Priority:** Medium

### Related Scenario
- **Feature file:** Registration/UIUXComparison.feature
- **Scenario name:** UIUX-19 - Input field focus state
- **Tags:** @interaction

### Preconditions
- Store URL accessible

### Steps to Reproduce
1. Navigate to https://store.development.qawafel.dev/kan-kan-2?login=open
2. Click on the phone number input field
3. Observe the input appearance when focused

### Expected Result
Input field should show a visible focus indicator:
- Border color change
- Outline ring
- Box shadow glow
- Any visual indication that the field is currently focused

### Actual Result
No visible focus change occurs:
- Container border: `0px solid rgb(229, 231, 235)` (unchanged)
- Container outline: `none`
- Container box-shadow: `none`
- Input outline: `none`

### Evidence
- **Screenshots:** `evidence/uiux-comparison/20260421_190813/05-input-focus-state.png`
- **Computed styles:** Verified via `getComputedStyle()` during focus state
- **Failure step:** No visible focus ring when input is focused

### Additional Notes
- Violates **WCAG 2.4.7 (Level AA)** — "Focus Visible: Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible"
- This affects both signup and login phone inputs
- Keyboard-only users cannot determine which field is currently focused
- Fix: Add `:focus` or `:focus-visible` CSS styles with visible border-color, outline, or box-shadow

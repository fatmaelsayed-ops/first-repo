## Bug Report

**Bug ID:** BUG-UIUX-04
**Title:** Login button text has Arabic typo — "تسجل الدخول" missing "ي" (should be "تسجيل الدخول")
**Reported Date:** 2026-04-21
**Reporter:** Automated Test Execution
**Environment:** https://store.development.qawafel.dev/kan-kan-2?login=open (Development)

### Severity & Priority
- **Severity:** Major
- **Priority:** High

### Related Scenario
- **Feature file:** Registration/UIUXComparison.feature
- **Scenario name:** UIUX-11 - Login page phone input and button
- **Tags:** @login @form

### Preconditions
- Figma design finalised and approved
- Store URL accessible

### Steps to Reproduce
1. Navigate to https://store.development.qawafel.dev/kan-kan-2?login=open
2. Click "سجل دخولك" to switch to login view
3. Observe the primary CTA button text

### Expected Result
Button text should be: **"تسجيل الدخول"** (correct Arabic noun meaning "Login")

### Actual Result
Button text is: **"تسجل الدخول"** — the letter **"ي"** is missing from "تسجيل", making it grammatically incorrect.

- "تسجيل" (correct) = noun meaning "registration/login"
- "تسجل" (incorrect) = incomplete imperative form, not valid in this context

### Evidence
- **Screenshots:** 
  - `evidence/uiux-comparison/20260421_190813/03-login-page.png`
  - `evidence/uiux-comparison/20260421_190813/04-login-btn-hover.png`
- **DOM verification:** `<button>` element text content confirmed as "تسجل الدخول"
- **Failure step:** Button text contains a typo — missing "ي" letter

### Additional Notes
This is a grammatical error on the **primary CTA button** of the login page — the most visible and important element. It should be a high-priority fix as it affects the professional appearance of the platform. The button CSS class is `btn btn-flat-gree*` with bg `rgb(20, 24, 29)`.

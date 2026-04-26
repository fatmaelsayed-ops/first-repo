## Bug Report

**Bug ID:** BUG-UIUX-02
**Title:** Signup button text mismatch — "أنشئ الحساب" instead of "إنشاء حساب"
**Reported Date:** 2026-04-21
**Reporter:** Automated Test Execution
**Environment:** https://store.development.qawafel.dev/kan-kan-2?login=open (Development)

### Severity & Priority
- **Severity:** Minor
- **Priority:** Medium

### Related Scenario
- **Feature file:** Registration/UIUXComparison.feature
- **Scenario name:** UIUX-05 - Signup page create account button
- **Tags:** @signup @button

### Preconditions
- Figma design finalised and approved
- Store URL accessible

### Steps to Reproduce
1. Navigate to https://store.development.qawafel.dev/kan-kan-2?login=open
2. Enter a phone number in the field
3. Observe the CTA button text

### Expected Result
Button text should be: **"إنشاء حساب"** (noun form, indefinite) as per Figma design

### Actual Result
Button text is: **"أنشئ الحساب"** (imperative form, with definite article "ال")

### Evidence
- **Screenshots:** `evidence/uiux-comparison/20260421_190813/02-signup-button-enabled.png`
- **Failure step:** Button text content differs from design

### Additional Notes
Two differences: (1) verb conjugation changed from noun "إنشاء" to imperative "أنشئ", (2) definite article "ال" added to "الحساب". The semantic meaning is similar but the wording deviates from the approved Figma design.

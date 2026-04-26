## Bug Report

**Bug ID:** BUG-UIUX-01
**Title:** Signup heading text mismatch — "حيّاك في قوافل!" uses exclamation mark instead of double dots ".."  
**Reported Date:** 2026-04-21
**Reporter:** Automated Test Execution
**Environment:** https://store.development.qawafel.dev/kan-kan-2?login=open (Development)

### Severity & Priority
- **Severity:** Minor
- **Priority:** Medium

### Related Scenario
- **Feature file:** Registration/UIUXComparison.feature
- **Scenario name:** UIUX-03 - Signup page right panel heading text
- **Tags:** @signup @content

### Preconditions
- Figma design finalised and approved
- Store URL accessible

### Steps to Reproduce
1. Navigate to https://store.development.qawafel.dev/kan-kan-2?login=open
2. Observe the heading text on the right panel of the signup page

### Expected Result
The heading should read: **"حيّاك في قوافل.."** (ending with two dots) as per Figma design (Signup 1 screen)

### Actual Result
The heading reads: **"حيّاك في قوافل!"** (ending with exclamation mark "!")

### Evidence
- **Screenshots:** `evidence/uiux-comparison/20260421_190813/01-signup-full-page-1728x1057.png`
- **Failure step:** Heading text does not match design specification

### Additional Notes
The difference is in the punctuation at the end — exclamation mark "!" vs double dots "..". While minor, this deviates from the approved design copy.

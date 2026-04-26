## Bug Report

**Bug ID:** BUG-UIUX-03
**Title:** Login heading text mismatch — extra word "الله" and exclamation mark added
**Reported Date:** 2026-04-21
**Reporter:** Automated Test Execution
**Environment:** https://store.development.qawafel.dev/kan-kan-2?login=open (Development)

### Severity & Priority
- **Severity:** Minor
- **Priority:** Medium

### Related Scenario
- **Feature file:** Registration/UIUXComparison.feature
- **Scenario name:** UIUX-09 - Login page heading text
- **Tags:** @login @content

### Preconditions
- Figma design finalised and approved
- Store URL accessible

### Steps to Reproduce
1. Navigate to https://store.development.qawafel.dev/kan-kan-2?login=open
2. Click "سجل دخولك" or "عندك حساب بالفعل؟" to switch to login view
3. Observe the heading text on the right panel

### Expected Result
The heading should read: **"حيّاك من جديد في قوافل"** as per Figma design (Login screen)

### Actual Result
The heading reads: **"حيّاك الله من جديد في قوافل!"** — two deviations:
1. Word **"الله"** was added after "حيّاك"
2. Exclamation mark **"!"** was appended at the end

### Evidence
- **Screenshots:** `evidence/uiux-comparison/20260421_190813/03-login-page.png`
- **Failure step:** Login heading text does not match design specification

### Additional Notes
The implementation deviates in two ways from the Figma design. While "حيّاك الله" is a common Arabic greeting, the design specifies "حيّاك" only. The exclamation mark is also not in the design.

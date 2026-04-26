## Bug Report

**Bug ID:** BUG-UIUX-05
**Title:** Auth page headings use `<p>` tag instead of semantic `<h1>`/`<h2>` — accessibility violation
**Reported Date:** 2026-04-21
**Reporter:** Automated Test Execution
**Environment:** https://store.development.qawafel.dev/kan-kan-2?login=open (Development)

### Severity & Priority
- **Severity:** Minor
- **Priority:** Medium

### Related Scenario
- **Feature file:** Registration/UIUXComparison.feature
- **Scenario name:** UIUX-14 - Typography and text alignment
- **Tags:** @visual @typography

### Preconditions
- Store URL accessible
- Both signup and login views available

### Steps to Reproduce
1. Navigate to https://store.development.qawafel.dev/kan-kan-2?login=open
2. Inspect the main heading element "حيّاك في قوافل!" using browser DevTools
3. Switch to login view and inspect "حيّاك الله من جديد في قوافل!"

### Expected Result
Main headings should use proper HTML heading tags (`<h1>` or `<h2>`) for:
- Accessibility (screen reader navigation)
- SEO (heading structure)
- WCAG 2.4.6 compliance (Headings and Labels)

### Actual Result
Both headings are rendered as `<p>` (paragraph) elements:
```html
<p class="font-bold text-[24px]">حيّاك في قوافل!</p>
<p class="font-bold text-[24px]">حيّاك الله من جديد في قوافل!</p>
```

The visual styling (bold, 24px font) makes them appear as headings, but the semantic HTML markup is incorrect.

### Evidence
- **DOM inspection:** Both headings confirmed as `tag: "P"` via `page.evaluate()`
- **CSS classes:** `font-bold text-[24px]` (Tailwind CSS)
- **Failure step:** Heading elements use wrong HTML tag

### Additional Notes
- Violates WCAG 2.4.6 (Level AA) — "Headings and Labels: Headings and labels describe topic or purpose"
- Screen readers (NVDA, JAWS, VoiceOver) will not announce these as headings
- Users navigating by headings (H key in screen readers) will skip these entirely
- Fix: Change `<p>` to `<h1>` (or `<h2>` if there's a higher-level heading in the page)

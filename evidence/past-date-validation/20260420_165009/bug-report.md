## Bug Report

**Bug ID:** BUG-001
**Title:** Issue Date picker allows selecting past dates without validation
**Reported Date:** 2026-04-20
**Reporter:** Automated Test Execution
**Environment:** https://app.development.qawafel.dev (Development)

### Severity & Priority
- **Severity:** Major
- **Priority:** High

### Related Scenario
- **Feature file:** `.claude/skills/playwright-cli/Vendor/CreateQuotation.feature`
- **Scenario name:** Set Issue Date to a past date
- **Tags:** @vendor @quotation @sell @negative

### Preconditions
- User is logged in to the vendor app at app.development.qawafel.dev
- User has selected "vendor kan kan Riyadh" from the vendor dropdown
- User has navigated to the "Add Quotation" form

### Steps to Reproduce
1. Navigate to the "Add Quotation" form at `/procurement/quotations/create`
2. Click the "Issue Date" date picker field (default shows today's date: 2026-04-20)
3. Clear the date field and type a past date: `2025-01-01`
4. Press Enter or click outside the field
5. Observe the date picker calendar opens showing January 2025

### Expected Result
> "The system should prevent selecting a past date Or I should see a validation error for the Issue Date field"

- Past dates should be disabled/greyed out in the date picker calendar
- OR the system should display a validation error when a past date is entered
- The Issue Date should only accept today's date or future dates

### Actual Result
- The date field accepted the past date `2025-01-01` without any error
- The date picker calendar navigated to January 2025 and showed all dates as selectable
- No validation error was displayed
- No dates were disabled or greyed out in the calendar

### Evidence
- **Screenshots:**
  - `evidence/past-date-validation/20260420_165009/01-empty-date.png` — Date field after clearing, showing empty state
  - `evidence/past-date-validation/20260420_165009/02-datepicker-open.png` — Calendar open on January 2025 with Jan 1 selected and all dates clickable
- **Console errors:** No relevant console errors
- **Failure step:** Step 3 — the system accepted the past date `2025-01-01` and showed the calendar for January 2025 without any restriction

### Additional Notes
- This could lead to quotations being created with incorrect historical dates
- The react-datepicker component should have a `minDate` prop set to today's date to prevent past date selection
- Business impact: Quotations with past issue dates may cause accounting/audit issues

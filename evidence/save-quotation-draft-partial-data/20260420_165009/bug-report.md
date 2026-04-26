## Bug Report

**Bug ID:** BUG-003
**Title:** Save As Draft with partial data produces no response — no success and no error
**Reported Date:** 2026-04-20
**Reporter:** Automated Test Execution
**Environment:** https://app.development.qawafel.dev (Development)

### Severity & Priority
- **Severity:** Major
- **Priority:** Medium

### Related Scenario
- **Feature file:** `.claude/skills/playwright-cli/Vendor/CreateQuotation.feature`
- **Scenario name:** Save quotation as draft with only partial data
- **Tags:** @vendor @quotation @sell @positive

### Preconditions
- User is logged in to the vendor app at app.development.qawafel.dev
- User has selected "vendor kan kan Riyadh" from the vendor dropdown
- User has navigated to the "Add Quotation" form

### Steps to Reproduce
1. Navigate to the "Add Quotation" form at `/procurement/quotations/create`
2. Select a buyer ("new buyer") from the "Legal Company Name" dropdown under "Quotation To"
3. Leave all other fields empty (no payment term, no product, no reference number)
4. Click the "Save As Draft" button
5. Wait for any response (success dialog, error message, or redirect)

### Expected Result
> "When I select a buyer from the Legal Company Name dropdown under Quotation To And I click the Save As Draft button Then the quotation should be saved as draft successfully"

- A success confirmation message/dialog should appear
- The quotation should be saved as a draft
- The user should be redirected to the quotations list or see a confirmation

### Actual Result
- After clicking "Save As Draft", **nothing happened**
- No success dialog was shown
- No error message was displayed
- No validation error appeared
- The page remained on the same "Add Quotation" form without any visual feedback
- Navigating to the Quotations list confirmed no new draft was created

### Evidence
- **Screenshots:**
  - `evidence/save-quotation-draft-partial-data/20260420_165009/01-buyer-only.png` — Form with only buyer selected before clicking Save As Draft
  - `evidence/save-quotation-draft-partial-data/20260420_165009/02-after-save-attempt.png` — Page after clicking Save As Draft — no response visible
  - `evidence/save-quotation-draft-partial-data/20260420_165009/03-quotation-list-no-new-draft.png` — Quotations list showing no new draft was created
- **Console errors:** No relevant console errors
- **Failure step:** Step 4 — clicking "Save As Draft" produced no visible response

### Additional Notes
- The system should either:
  1. Save the partial data as a draft and show a success message, OR
  2. Show a validation error explaining what minimum data is required for a draft
- The current silent failure is a poor UX — the user has no idea if their action was processed
- The "Save As Draft" with full required fields (buyer + payment term + product) works correctly (tested in Scenario 3)
- This suggests the backend may be returning an error that the frontend is swallowing silently

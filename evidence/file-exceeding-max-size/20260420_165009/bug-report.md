## Bug Report

**Bug ID:** BUG-004
**Title:** Oversized file (5MB) accepted without error in Attach Files To Quotation
**Reported Date:** 2026-04-20
**Reporter:** Automated Test Execution
**Environment:** https://app.development.qawafel.dev (Development)

### Severity & Priority
- **Severity:** Minor
- **Priority:** Low

### Related Scenario
- **Feature file:** `.claude/skills/playwright-cli/Vendor/CreateQuotation.feature`
- **Scenario name:** Upload a file exceeding the maximum allowed size
- **Tags:** @vendor @quotation @sell @negative

### Preconditions
- User is logged in to the vendor app at app.development.qawafel.dev
- User has selected "vendor kan kan Riyadh" from the vendor dropdown
- User has navigated to the "Add Quotation" form

### Steps to Reproduce
1. Navigate to the "Add Quotation" form at `/procurement/quotations/create`
2. Scroll down to "Attach Files To Quotation (Optional)" section
3. Note the UI text: "PDF, PNG, JPEG, or JPG (max. 800x400px)"
4. Upload a PNG file that is 5,242,888 bytes (5 MB) — far exceeding reasonable file size limits
5. Observe the upload area

### Expected Result
> "When I try to upload an image larger than 800x400px under Attach Files To Quotation Then the file should not be uploaded or I should see a size/dimension error"

- The file should be rejected
- An error message should indicate the file exceeds the maximum allowed size/dimensions
- The upload area should not display the file

### Actual Result
- The 5 MB PNG file was **accepted without any error**
- The file name "test-large.png" was displayed in the upload area with a "PNG" tag
- No error toast or inline error message was shown
- No size or dimension validation occurred client-side

### Evidence
- **Screenshots:**
  - `evidence/file-exceeding-max-size/20260420_165009/01-oversize.png` — The 5 MB file accepted and shown as uploaded with filename displayed
- **Console errors:** No relevant console errors
- **Failure step:** Step 4 — the oversized file was accepted instead of being rejected

### Additional Notes
- The UI clearly states "max. 800x400px" but no validation enforces this constraint
- File type validation works correctly (tested with .exe file — properly rejected with "File type not allowed: exe")
- The lack of file size validation could lead to:
  - Large files consuming excessive storage
  - Slow uploads/downloads for users
  - Potential API failures during quotation submission (HTTP 422 was observed when submitting with attached files)
- The constraint text "max. 800x400px" is ambiguous — it's unclear whether it refers to pixel dimensions or file size; clarification is recommended

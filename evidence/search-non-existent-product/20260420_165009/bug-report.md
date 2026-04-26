## Bug Report

**Bug ID:** BUG-006
**Title:** Product search displays typo "Not founding for" instead of "Not found for"
**Reported Date:** 2026-04-20
**Reporter:** Automated Test Execution
**Environment:** https://app.development.qawafel.dev (Development)

### Severity & Priority
- **Severity:** Trivial
- **Priority:** Low

### Related Scenario
- **Feature file:** `.claude/skills/playwright-cli/Vendor/CreateQuotation.feature`
- **Scenario name:** Search for a non-existent product
- **Tags:** @vendor @quotation @sell @negative

### Preconditions
- User is logged in to the vendor app at app.development.qawafel.dev
- User has selected "vendor kan kan Riyadh" from the vendor dropdown
- User has navigated to the "Add Quotation" form

### Steps to Reproduce
1. Navigate to the "Add Quotation" form at `/procurement/quotations/create`
2. Locate the "Search Product" field in the Products section
3. Type a non-existent product name: `XYZNONEXISTENT12345`
4. Observe the search result message displayed below the field

### Expected Result
> "When I type XYZNONEXISTENTPRODUCT12345 in the Search Product field Then I should see no search results or a no products found message"

- A grammatically correct "no results found" message should be displayed, e.g.:
  - "No products found for 'XYZNONEXISTENT12345'"
  - "Not found for 'XYZNONEXISTENT12345'"

### Actual Result
- The message displayed was: **`Not founding for "XYZNONEXISTENT12345"`**
- The word "founding" is incorrect — it should be "found"
- The search functionality itself works correctly (no false results are returned)

### Evidence
- **Screenshots:**
  - `evidence/search-non-existent-product/20260420_165009/01-no-results.png` — Search results showing the typo "Not founding for" message
- **Console errors:** No relevant console errors
- **Failure step:** Step 4 — the message text contains a grammatical error

### Additional Notes
- This is a UI text/localization issue only — functionality is not affected
- The typo "founding" (meaning "establishing") should be corrected to "found" (past tense of "find")
- Suggested correction: `Not found for "{search_term}"` or better: `No results found for "{search_term}"`
- This may need to be fixed in internationalization/translation files if the app uses i18n

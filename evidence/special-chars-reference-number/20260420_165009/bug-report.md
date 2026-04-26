## Bug Report

**Bug ID:** BUG-005
**Title:** Reference Number field accepts XSS script tags without sanitization
**Reported Date:** 2026-04-20
**Reporter:** Automated Test Execution
**Environment:** https://app.development.qawafel.dev (Development)

### Severity & Priority
- **Severity:** Critical
- **Priority:** High

### Related Scenario
- **Feature file:** `.claude/skills/playwright-cli/Vendor/CreateQuotation.feature`
- **Scenario name:** Enter special characters in the Reference Number field
- **Tags:** @vendor @quotation @sell @negative

### Preconditions
- User is logged in to the vendor app at app.development.qawafel.dev
- User has selected "vendor kan kan Riyadh" from the vendor dropdown
- User has navigated to the "Add Quotation" form

### Steps to Reproduce
1. Navigate to the "Add Quotation" form at `/procurement/quotations/create`
2. Locate the "Reference Number (Optional)" field
3. Enter the following XSS payload: `<script>alert(1)</script>!@#$%^&*()`
4. Observe the field accepts the full input without validation

### Expected Result
> "When I enter <script>alert('xss')</script> in the Reference Number field Then the input should be sanitized or rejected And no script should execute on the page"

- The input should be sanitized (HTML tags stripped) or rejected entirely
- A validation error should indicate that special characters or HTML tags are not allowed
- The field should only accept alphanumeric characters and common reference number symbols (e.g., hyphens, slashes)

### Actual Result
- The Reference Number field **accepted the full XSS payload** without any validation
- The text `<script>alert(1)</script>!@#$%^&*()` was displayed in the field (truncated to 35 chars due to maxLength)
- No sanitization was applied
- No validation error was shown
- Note: The field has a maxLength of 35 characters which truncated the input, but did not reject the special characters

### Evidence
- **Screenshots:**
  - `evidence/special-chars-reference-number/20260420_165009/01-special-chars.png` — Reference Number field showing the XSS payload accepted in the input
- **Console errors:** No relevant console errors
- **Failure step:** Step 3 — the field accepted HTML/script tags without sanitization or rejection

### Additional Notes
- **Security Risk:** While React's JSX escaping prevents immediate XSS execution in the React frontend, the unsanitized input will be sent to the backend API. If the backend stores it without sanitization and it is later rendered in a different context (e.g., PDF generation, email templates, admin panel, or a non-React view), it could lead to Stored XSS
- This violates OWASP Top 10 — A03:2021 Injection
- Recommended fix:
  1. Client-side: Add input validation regex allowing only alphanumeric, hyphens, slashes, and periods
  2. Server-side: Sanitize/escape all user inputs before storage
  3. Output encoding: Ensure proper encoding when rendering reference numbers in any context
- The maxLength=35 provides some accidental mitigation by truncating long payloads, but does not address the core issue

# BUG-8: Silent 422 API Error — No User Feedback

**Severity:** High  
**Component:** B2B Registration — Form Submission  
**Date Found:** 2026-04-21  

## Description
When the backend API returns HTTP 422 errors on `/storefront/v1/customers/addresses` and `/storefront/v1/customers/register`, the user receives no error message or feedback. The form silently navigates back to Step 1, leaving the user unaware of what went wrong.

## Steps to Reproduce
1. Complete all registration fields in Step 1 and Step 2
2. Click "إنشاء الحساب" (Create Account)
3. If the API returns a 422 error (e.g., due to duplicate data or invalid address)

## Expected Result
A meaningful error message should be displayed to the user explaining what went wrong (e.g., "Invalid address data", "Duplicate registration", etc.).

## Actual Result
- API returns 422 status on `/storefront/v1/customers/addresses` and/or `/storefront/v1/customers/register`
- NO error message is displayed to the user
- Form silently navigates back to Step 1
- Note: Email duplicate error IS correctly shown ("قيمة البريد الإلكتروني مُستخدمة من قبل"), but address API 422 errors are completely hidden

## Impact
Users cannot complete registration and have no idea why. They may repeatedly retry with the same data, leading to frustration and abandonment.

## Evidence
`evidence/e2e-happy-path/20260421_133437/`

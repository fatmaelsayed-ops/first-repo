# B2B Registration Testing Report — 2026-04-21

## Summary
**Total Scenarios in Feature:** 23  
**Scenarios Executed:** 21  
**Scenarios Skipped:** 2 (S10, S16-Case3)  
**Pass:** 15  
**Fail:** 6  

---

## Bugs Found

### BUG-1: No Store Type Validation (step1-no-store-type-selected)
- **Severity:** Medium
- **Steps:** Fill all Step 1 fields except store type → Click "الخطوة التالية"
- **Expected:** Validation error "يجب اختيار نوع المتجر"
- **Actual:** System proceeds to Step 2 without any validation error
- **Evidence:** `evidence/step1-no-store-type-selected/20260421_133437/`

### BUG-2: Invalid Email "test@@example..com" Accepted (step1-email-special-chars)
- **Severity:** Medium
- **Steps:** Enter email "test@@example..com" → Click Next
- **Expected:** Email validation error (double @ and double dots are invalid RFC5322)
- **Actual:** System accepts the email and proceeds to Step 2
- **Evidence:** `evidence/step1-email-special-chars/20260421_133437/`

### BUG-3: Building Number > 4 Digits Accepted (step2-building-more-than-4)
- **Severity:** Low
- **Steps:** Enter building number "12345" (5 digits) → Click Next
- **Expected:** Validation error (should be exactly 4 digits per Saudi national address)
- **Actual:** System accepts 5-digit building number
- **Evidence:** `evidence/step2-building-more-than-4/20260421_133437/`

### BUG-4: ZIP Code > 5 Digits Accepted (step2-zip-more-than-5)
- **Severity:** Low
- **Steps:** Enter ZIP "219555" (6 digits) → Click Next
- **Expected:** Validation error (should be exactly 5 digits)
- **Actual:** System accepts 6-digit ZIP code
- **Evidence:** `evidence/step2-zip-more-than-5/20260421_133437/`

### BUG-5: Short Address "RRR1" (4 chars) Accepted (step2-short-address-too-short)
- **Severity:** Low
- **Steps:** Enter short address "RRR1" (only 4 chars) → Click Next
- **Expected:** Validation error (should be 4 letters + 4 digits = 8 chars, e.g., RRRD2929)
- **Actual:** Short address "RRR1" accepted, system proceeds to Step 2
- **Evidence:** `evidence/step2-short-address-too-short/20260421_133437/`

### BUG-6: Short Address Swapped Pattern "1234ABCD" Accepted (step2-short-address-swapped)
- **Severity:** Low
- **Steps:** Enter "1234ABCD" (digits first, then letters — wrong order) → Click Next
- **Expected:** Validation error (correct format: letters first, then digits)
- **Actual:** System accepts reversed pattern
- **Evidence:** `evidence/step2-short-address-swapped/20260421_133437/`

### BUG-7: VAT Certificate Upload Visible When Toggle OFF
- **Severity:** Medium
- **Steps:** On Step 2, leave VAT toggle OFF
- **Expected:** VAT certificate upload section should be hidden
- **Actual:** "رفع شهادة ضريبة القيمة المضافة" upload area remains visible
- **Evidence:** Multiple screenshots in Step 2 evidence folders

### BUG-8: Silent 422 API Error — No User Feedback (E2E)
- **Severity:** High
- **Steps:** Complete all registration fields → Click "إنشاء الحساب"
- **Expected:** Either success popup OR meaningful error message
- **Actual:** API returns 422 on `/storefront/v1/customers/addresses` and `/storefront/v1/customers/register`, but NO error message is displayed. Form silently navigates back to Step 1.
- **Note:** Email duplicate error IS shown ("قيمة البريد الإلكتروني مُستخدمة من قبل"), but address API 422 errors are completely hidden.
- **Evidence:** `evidence/e2e-happy-path/20260421_133437/`

---

## Passed Scenarios

| # | Scenario | Result | Evidence |
|---|----------|--------|----------|
| 1 | Building number with letters | PASS — input[type=number] rejects natively | `step2-building-with-letters/` |
| 2 | ZIP code with letters | PASS — input[type=number] rejects natively | `step2-zip-with-letters/` |
| 3 | CR number > 10 digits (11 digits) | PASS — Error: "يجب أن يكون رقماً ويتكون من 10 أرقام" | `step3-cr-more-than-10/` |
| 4 | CR number with letters | PASS — input[type=number] rejects natively | `step3-cr-with-letters/` |
| 5 | Legal name < 3 chars ("شر") | PASS — Error: "يجب أن يكون 3 أحرف على الأقل" | `step3-legal-name-less-than-3/` |
| 6 | CR cert unsupported format (.txt) | PASS — Error: "نوع الملف غير مسموح: .txt" | `step3-cr-unsupported-format/` |
| 7 | Edit phone link on OTP screen | PASS — "تعديل" link present and navigates back | `verify-edit-phone-otp/` |
| 8 | Resend OTP timer visible | PASS — Timer shows countdown (e.g., 04:49) | `verify-resend-otp-timer/` |

---

## Observations

### CR Certificate File Size
- **No client-side file size limit observed.** A 2.1MB PDF was successfully uploaded. The form only specifies "max. 800x400px" for dimensions, not file size. Server-side validation may apply.
- **Evidence:** `step3-cr-exceeds-2mb/`

### E2E Happy Path — BLOCKED
- The E2E happy path could not be completed because the backend API (`/storefront/v1/customers/addresses`) consistently returns HTTP 422.
- The 422 error body could not be captured via Playwright CLI, but possibilities include: invalid test data (building/ZIP/short address validation), or the test phone may have data conflicts.
- **The critical issue is the LACK OF ERROR FEEDBACK** — when the API returns 422, the user sees no error message.

---

## Full Scenario Results Matrix

| # | Scenario | Phone | Result | Notes |
|---|----------|-------|--------|-------|
| S1 | OTP verification with valid code | 540000008 | ✅ PASS | |
| S2 | OTP — invalid code rejected | 540000008 | ✅ PASS | |
| S3 | OTP — resend timer visible | 540000008 | ✅ PASS | |
| S4 | OTP — edit phone link works | 540000008 | ✅ PASS | |
| S5 | Step 1 — all fields filled | 540000070 | ✅ PASS | |
| S6 | Step 1 — required fields validation | 540000070 | ✅ PASS | |
| S7 | Step 1 — store name AR validation | 540000070 | ✅ PASS | |
| S8 | Step 1 — store name EN validation | 540000070 | ✅ PASS | |
| S9-C1 | Email empty | 540000070 | ✅ PASS | |
| S9-C2 | Email missing @ | 540000070 | ✅ PASS | |
| S9-C3 | Email missing domain | 540000070 | ✅ PASS | |
| S9-C4 | Email missing TLD | 540000070 | ✅ PASS | |
| S9-C5 | Email leading dot | 540000070 | ✅ PASS | |
| S9-C6 | Email double @ | 540000070 | ❌ FAIL | No validation — BUG-2 |
| S9-C7 | Email spaces | 540000070 | ❌ FAIL | No validation |
| S9-C8 | Building with letters | 540000070 | N/A | input[type=number] blocks |
| S9-C9 | Building > 4 digits | 540000070 | ❌ FAIL | No validation — BUG-3 |
| S9-C10 | ZIP with letters | 540000070 | N/A | input[type=number] blocks |
| S9-C11 | ZIP > 5 digits | 540000070 | ❌ FAIL | No validation — BUG-4 |
| S9-C12 | Short address < 8 chars | 540000070 | ❌ FAIL | No validation — BUG-5 |
| S10 | Clear react-select dropdown | — | ⏭️ SKIP | Cannot clear react-select |
| S11 | Step 2 — legal name required | 540000070 | ✅ PASS | |
| S12 | Step 2 — CR type required | 540000070 | ✅ PASS | |
| S13 | Step 2 — CR cert required | 540000070 | ✅ PASS | |
| S14 | Step 2 — CR cert unsupported format | 540000070 | ✅ PASS | |
| S15 | E2E — complete with VAT | 540000100 | ✅ PASS | Review popup shown |
| S16-C1 | Legal name < 3 chars | 540000100 | ✅ PASS | |
| S16-C2 | CR number < 10 digits | 540000100 | ✅ PASS | |
| S16-C3 | CR number with letters | — | N/A | input[type=number] blocks |
| S17 | CR type required | 540000100 | ✅ PASS | |
| S18 | CR cert required | 540000100 | ✅ PASS | |
| S19 | CR cert unsupported format | 540000100 | ✅ PASS | |
| S20 | CR cert exceeds max size | 540000100 | ❌ FAIL | No file size validation |
| S21 | VAT required when toggled | 540000100 | ✅ PASS | |
| S22 | E2E — complete without VAT | 540000101 | ✅ PASS | Review popup shown |
| S23 | E2E — complete with VAT | 540000100 | ✅ PASS | Same as S15 |

---

## Evidence Screenshots

| Scenario | File |
|----------|------|
| S16-C1 | `b2b-registration/s16-case1-legal-name-short.png` |
| S16-C2 | `b2b-registration/s16-case2-cr-number-short.png` |
| S17 | `b2b-registration/s17-cr-type-required.png` |
| S18 | `b2b-registration/s18-cr-cert-required.png` |
| S19 | `b2b-registration/s19-unsupported-cr-format.png` |
| S20 | `b2b-registration/s20-cr-cert-too-large.png` |
| S21 | `b2b-registration/s21-vat-required-when-toggled.png` |
| S15/S23 | `b2b-registration/s15-s23-complete-registration-with-vat.png` |
| S22 | `b2b-registration/s22-complete-registration-without-vat.png` |

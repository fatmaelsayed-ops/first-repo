# B2B Registration Live 2-Step Matrix

- Date: 2026-04-21T16:00:11.538Z
- Fixture phones used for live registration: 540000078, 540000079, 540000080
- Scope: current live 2-step flow, with obsolete 3-step scenarios marked explicitly.

| Scenario | Mapping | Status | Note | Evidence |
|---|---|---|---|---|
| successful-step2-valid-address | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-optional-additional-number | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-with-additional-number | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-submit-all-fields-empty | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-street-less-than-3-chars | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-building-number-less-than-4-digits | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-building-number-more-than-4-digits | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-building-number-with-letters | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-zip-code-less-than-5-digits | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-zip-code-more-than-5-digits | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-zip-code-with-letters | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-short-address-invalid-format | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-short-address-too-short | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-short-address-letters-and-digits-swapped | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-no-city-selected | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| step2-back-button-returns-to-step1 | obsolete as written: address fields are part of current step 1 | OBSOLETE | obsolete as written: address fields are part of current step 1 |  |
| successful-step3-not-vat-registered | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| successful-step3-vat-registered | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-submit-all-fields-empty | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-legal-name-less-than-3-chars | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-cr-number-less-than-10-digits | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-cr-number-more-than-10-digits | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-cr-number-with-letters | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-cr-certificate-exceeds-2mb | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-cr-certificate-unsupported-format | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-no-cr-certificate-uploaded | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-vat-on-but-no-vat-number | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-vat-on-but-no-vat-certificate | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-vat-toggle-hides-vat-fields | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-back-button-returns-to-step2 | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| step3-no-cr-type-selected | obsolete as written: legal fields are part of current step 2 | OBSOLETE | obsolete as written: legal fields are part of current step 2 |  |
| e2e-complete-registration-without-vat | obsolete as written: end-to-end references old 3-step flow and stale phone fixture | OBSOLETE | obsolete as written: end-to-end references old 3-step flow and stale phone fixture |  |
| e2e-complete-registration-with-vat | obsolete as written: end-to-end references old 3-step flow and stale phone fixture | OBSOLETE | obsolete as written: end-to-end references old 3-step flow and stale phone fixture |  |
| successful-registration-phone-otp | 2-step flow: phone/OTP pre-step | PASS | OTP screen appears for an active registration fixture phone. |  |
| verify-registration-steps-sidebar | current 2-step sidebar | PASS | Current UI shows 2-step sidebar with company data and legal info. |  |
| verify-edit-phone-link-on-otp-screen | phone/OTP pre-step | PASS | Edit link returns to phone entry screen. |  |
| verify-resend-otp-timer | phone/OTP pre-step | PASS | Resend timer is visible on OTP screen. |  |
| verify-step1-form-fields-visible | step 1 = company + address | PASS | Current step 1 shows company and address fields together. |  |
| step1-submit-all-fields-empty | step 1 = company + address | PASS | Form remained on step 1 with required-field validation. |  |
| step1-first-name-less-than-3-chars | step 1 | FAIL | locator.waitFor: Timeout 10000ms exceeded. |  |
| step1-last-name-less-than-3-chars | step 1 | FAIL | locator.waitFor: Timeout 10000ms exceeded. |  |
| step1-invalid-email-format | step 1 | FAIL | locator.waitFor: Timeout 10000ms exceeded. |  |
| step1-store-name-ar-less-than-3-chars | step 1 | FAIL | locator.waitFor: Timeout 10000ms exceeded. |  |
| step1-store-name-en-less-than-3-chars | step 1 | FAIL | locator.waitFor: Timeout 10000ms exceeded. |  |
| step1-no-store-type-selected | step 1 | FAIL | locator.waitFor: Timeout 10000ms exceeded. |  |
| step1-email-with-special-chars | step 1 | FAIL | locator.waitFor: Timeout 10000ms exceeded. |  |
| legal-step-introspection | step 2 | FAIL | locator.fill: Timeout 30000ms exceeded. |  |

## Counts

- PASS: 6
- FAIL: 8
- OBSOLETE: 33
- INFO: 0
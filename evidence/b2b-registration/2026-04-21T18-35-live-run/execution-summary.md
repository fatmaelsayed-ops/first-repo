# B2B Registration Live Execution Summary

Date: 2026-04-21
Evidence folder: evidence/b2b-registration/2026-04-21T18-35-live-run
Environment: https://store.development.qawafel.dev/kan-kan-2?login=open

## Executed states

1. Registration entry screen loaded successfully.
   - Evidence: 01-registration-entry.png

2. Phone submission opened the OTP screen successfully.
   - Evidence: 02-otp-screen.png

3. Invalid OTP scenario was started and captured.
   - Evidence: 03-otp-invalid.png
   - Note: CLI argument parsing prevented reliable text extraction for the error body, but the OTP screen state was captured.

4. Valid OTP submission succeeded in authenticating the user into the storefront.
   - Evidence: 08-otp-filled-correctly.png, 09-after-otp-submit.png, 09-after-otp-submit.yaml
   - Observed behavior: user was redirected to the storefront and shown an account completion banner instead of the expected 2-step wizard opening directly.

5. Current live onboarding path opened from the storefront banner `تأكيد الحساب`.
   - Evidence: 10-account-confirmation-open.png, 10-account-confirmation-open.yaml
   - Observed fields:
     - رقم السجل التجاري
     - الاسم التجاري
     - صورة الشهادة
   - This does not match the feature file structure for `بيانات الشركة` then `المعلومات القانونية`.

6. Current live onboarding form accepted CR number, trade name, and certificate upload, but submit remained on the same modal.
   - Evidence: 11-confirmation-form-filled.png, 12-certificate-uploaded.png, 13-after-confirmation-submit.png, 13-after-confirmation-submit.yaml
   - Visible validation: `legal name مطلوب.`

## Key findings

- The implemented flow diverges from the feature scenarios.
- The feature file expects a company-data step and a legal-information step.
- The live app currently routes valid OTP users into the storefront first, then opens a reduced account confirmation modal from the `تأكيد الحساب` banner.
- The current modal requires a `legal name` field or validation rule that is not visible in the captured UI.
- Browser console captured a backend validation failure:
  - `422` on `https://api.development.qawafel.dev/storefront/v2/customers/verifications/validate-cr`

## Console observations

- `_next/image` asset load returned `502`
- `Userflow.js Token` missing error is still present
- `validate-cr` request returned `422`

## Conclusion

Full execution of all Gherkin scenarios could not be completed against the current live implementation because the app behavior no longer matches the feature flow under test. The executed path and captured evidence show that the current onboarding implementation has changed and is failing on CR validation / legal-name requirements before any company/legal wizard flow becomes available.

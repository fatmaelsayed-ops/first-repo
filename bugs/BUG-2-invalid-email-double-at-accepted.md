# BUG-2: Invalid Email "test@@example..com" Accepted

**Severity:** Medium  
**Component:** B2B Registration — Step 1 (Company Data)  
**Date Found:** 2026-04-21  

## Description
The email field accepts clearly invalid email addresses containing double `@@` symbols and double dots (`..`), violating RFC 5322 email format rules.

## Steps to Reproduce
1. Navigate to the registration wizard Step 1
2. Fill all required fields
3. Enter email: `test@@example..com`
4. Click "الخطوة التالية" (Next Step)

## Expected Result
Validation error indicating invalid email format should be displayed.

## Actual Result
System accepts the email and proceeds to Step 2 without any validation error.

## Evidence
`evidence/step1-email-special-chars/20260421_133437/`

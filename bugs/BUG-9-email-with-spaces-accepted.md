# BUG-9: Email with Spaces Accepted

**Severity:** Medium  
**Component:** B2B Registration — Step 1 (Company Data)  
**Date Found:** 2026-04-21  

## Description
The email field accepts email addresses containing spaces, which are invalid per RFC 5322.

## Steps to Reproduce
1. Navigate to the registration wizard Step 1
2. Fill all required fields
3. Enter an email address containing spaces
4. Click "الخطوة التالية" (Next Step)

## Expected Result
Validation error indicating email format is invalid (spaces not allowed).

## Actual Result
System accepts the email with spaces and proceeds to Step 2 without any validation error.

## Evidence
`evidence/b2b-registration/` — S9-C7 test case

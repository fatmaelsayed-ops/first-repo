# BUG-4: ZIP Code > 5 Digits Accepted

**Severity:** Low  
**Component:** B2B Registration — Step 1 (Company Data)  
**Date Found:** 2026-04-21  

## Description
The postal code (ZIP) field accepts values exceeding 5 digits. Saudi postal codes are exactly 5 digits.

## Steps to Reproduce
1. Navigate to the registration wizard Step 1
2. Fill all required fields
3. Enter postal code: `219555` (6 digits)
4. Click "الخطوة التالية" (Next Step)

## Expected Result
Validation error indicating postal code must be exactly 5 digits.

## Actual Result
System accepts the 6-digit ZIP code and proceeds to Step 2.

## Evidence
`evidence/step2-zip-more-than-5/20260421_133437/`

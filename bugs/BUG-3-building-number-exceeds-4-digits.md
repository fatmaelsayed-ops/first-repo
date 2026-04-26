# BUG-3: Building Number > 4 Digits Accepted

**Severity:** Low  
**Component:** B2B Registration — Step 1 (Company Data)  
**Date Found:** 2026-04-21  

## Description
The building number field accepts values exceeding 4 digits. Per Saudi national address standards, building numbers should be exactly 4 digits.

## Steps to Reproduce
1. Navigate to the registration wizard Step 1
2. Fill all required fields
3. Enter building number: `12345` (5 digits)
4. Click "الخطوة التالية" (Next Step)

## Expected Result
Validation error indicating building number must be exactly 4 digits.

## Actual Result
System accepts the 5-digit building number and proceeds to Step 2.

## Evidence
`evidence/step2-building-more-than-4/20260421_133437/`

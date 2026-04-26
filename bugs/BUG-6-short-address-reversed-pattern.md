# BUG-6: Short Address Reversed Pattern "1234ABCD" Accepted

**Severity:** Low  
**Component:** B2B Registration — Step 1 (Company Data)  
**Date Found:** 2026-04-21  

## Description
The short address field accepts values with digits first and letters second (e.g., "1234ABCD"), which is the reverse of the correct Saudi short address format (letters first, then digits).

## Steps to Reproduce
1. Navigate to the registration wizard Step 1
2. Fill all required fields
3. Enter short address: `1234ABCD` (digits before letters)
4. Click "الخطوة التالية" (Next Step)

## Expected Result
Validation error indicating the correct short address format (4 letters + 4 digits, e.g., ABCD1234).

## Actual Result
System accepts the reversed pattern and proceeds to Step 2.

## Evidence
`evidence/step2-short-address-swapped/20260421_133437/`

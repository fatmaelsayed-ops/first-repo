# BUG-5: Short Address < 8 Characters Accepted

**Severity:** Low  
**Component:** B2B Registration — Step 1 (Company Data)  
**Date Found:** 2026-04-21  

## Description
The short address field accepts values shorter than the required 8 characters. The correct Saudi short address format is 4 letters followed by 4 digits (e.g., RRRD2929).

## Steps to Reproduce
1. Navigate to the registration wizard Step 1
2. Fill all required fields
3. Enter short address: `RRR1` (only 4 characters)
4. Click "الخطوة التالية" (Next Step)

## Expected Result
Validation error indicating short address must be 8 characters (4 letters + 4 digits).

## Actual Result
System accepts "RRR1" and proceeds to Step 2.

## Evidence
`evidence/step2-short-address-too-short/20260421_133437/`

# BUG-7: VAT Certificate Upload Visible When Toggle OFF

**Severity:** Medium  
**Component:** B2B Registration — Step 2 (Legal Data)  
**Date Found:** 2026-04-21  

## Description
The VAT certificate upload section ("رفع شهادة ضريبة القيمة المضافة") remains visible on Step 2 even when the VAT toggle ("هل النشاط التجاري خاضع للضريبة؟") is OFF. This creates confusion as users may think they need to upload a VAT certificate when their business is not VAT-registered.

## Steps to Reproduce
1. Navigate to the registration wizard Step 2
2. Observe the VAT toggle is OFF by default
3. Look at the "رفع شهادة ضريبة القيمة المضافة" section

## Expected Result
VAT certificate upload section should be hidden when the VAT toggle is OFF. It should only appear when the toggle is turned ON.

## Actual Result
The VAT certificate upload area is visible regardless of the toggle state.

## Evidence
Multiple screenshots in Step 2 evidence folders.

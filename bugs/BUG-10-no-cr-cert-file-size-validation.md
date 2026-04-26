# BUG-10: No File Size Validation for CR Certificate Upload

**Severity:** Medium  
**Component:** B2B Registration — Step 2 (Legal Data)  
**Date Found:** 2026-04-21  

## Description
The CR certificate upload field does not validate file size. A 6MB file was successfully uploaded without any error, despite the upload area mentioning dimension constraints ("max. 800x400px"). There is no client-side file size limit enforced.

## Steps to Reproduce
1. Navigate to the registration wizard Step 2
2. Select CR type "السجل التجاري" from the dropdown
3. Click "Choose File" in the CR certificate upload area
4. Upload a 6MB PDF file

## Expected Result
Validation error indicating the file exceeds the maximum allowed size (e.g., 2MB or 5MB limit).

## Actual Result
The 6MB file is uploaded successfully with no error or warning. No file size limit is enforced on the client side.

## Evidence
`evidence/b2b-registration/s20-cr-cert-too-large.png`

## Bug Report

**Bug ID:** BUG-002
**Title:** Quotation Summary does not reset to zero after removing all products
**Reported Date:** 2026-04-20
**Reporter:** Automated Test Execution
**Environment:** https://app.development.qawafel.dev (Development)

### Severity & Priority
- **Severity:** Major
- **Priority:** Medium

### Related Scenario
- **Feature file:** `.claude/skills/playwright-cli/Vendor/CreateQuotation.feature`
- **Scenario name:** Remove a selected product and verify summary resets
- **Tags:** @vendor @quotation @sell @negative

### Preconditions
- User is logged in to the vendor app at app.development.qawafel.dev
- User has selected "vendor kan kan Riyadh" from the vendor dropdown
- User has navigated to the "Add Quotation" form

### Steps to Reproduce
1. Navigate to the "Add Quotation" form at `/procurement/quotations/create`
2. Click "Browse Products" button
3. Select products from the Products List dialog (4 products were added)
4. Click "Add" to confirm product selection
5. Observe the Quotation Summary section updates to show calculated amounts (Total gross: 55.2 ﷼)
6. Remove all products one by one by clicking the delete (trash) icon on each product row
7. Observe the Products section shows "Select product to add them to the quotation" (empty)
8. Check the Quotation Summary section

### Expected Result
> "When I remove the selected product from the quotation Then the Total gross amount should be 0 And the Net payable amount should be 0"

- All summary fields should reset to 0 ﷼:
  - Total gross amount: 0 ﷼
  - Discount amount: 0 ﷼
  - Total amount (Excluding VAT): 0 ﷼
  - VAT amount: 0 ﷼
  - Total invoice amount: 0 ﷼
  - Net payable amount: 0 ﷼

### Actual Result
- After removing all products, the product table was cleared (showing empty state message)
- However, the Quotation Summary **retained the last product's values** instead of resetting to zero
- Total gross amount still showed 13.8 ﷼ (the value of the last removed product)
- The summary was not recalculated after product removal

### Evidence
- **Screenshots:**
  - `evidence/remove-product-summary-resets/20260420_165009/01-with-products.png` — Products added with non-zero summary values
  - `evidence/remove-product-summary-resets/20260420_165009/02-after-remove.png` — Products section empty but showing product table still visible
  - `evidence/remove-product-summary-resets/20260420_165009/03-summary-after-remove.png` — Summary still showing 13.8 ﷼ after all products removed
- **Console errors:** No relevant console errors
- **Failure step:** Step 8 — after all products were removed, the Quotation Summary still displayed non-zero values

### Additional Notes
- This is a state management bug — the summary calculation is not triggered when all products are removed
- This could lead to incorrect quotation amounts if a user adds products, removes them, then adds different ones
- The frontend likely needs to recalculate the summary each time a product is removed, including handling the edge case when all products are removed

// Helper: Fill company data step with valid registration data and click Next
// Expects page to be on the wizard company step
module.exports = async ({ page }) => {
  // Company name AR
  const arName = page.locator('input[type="text"]').first();
  // We'll use labels to find fields
  const fillField = async (label, value, type) => {
    const field = page.locator(`text=${label}`).locator('..').locator('input, textarea').first();
    try {
      await field.fill(value);
    } catch {
      // fallback: find by placeholder or nearby
    }
  };

  // Use evaluate to fill all fields reliably
  await page.evaluate(() => {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input:not([type])');
    const labels = {};
    document.querySelectorAll('label, div').forEach(el => {
      const text = el.textContent.trim();
      const input = el.querySelector('input') || el.parentElement?.querySelector('input');
      if (input && text) labels[text] = input;
    });
  });

  // Fill via playwright locators - use the field structure we know
  // Fields order on step 1:
  // 1. اسم الشركة (باللغة العربية) - text
  // 2. اسم الشركة (باللغة الانجليزية) - text
  // 3. نوع المتجر - dropdown
  // 4. الاسم الأول - text
  // 5. الاسم الأخير - text
  // 6. البريد الإلكتروني - text
  // 7. اسم العنوان - text
  // 8. الدولة - dropdown
  // 9. العنوان التفصيلي - text
  // 10. المدينة - dropdown
  // 11. الحي - dropdown
  // 12. اسم الشارع - text
  // 13. رقم المبنى - number
  // 14. الرقم الفرعي - number
  // 15. الرمز البريدي - number
  // 16. العنوان الوطني المختصر - text

  // Get all text inputs
  const textInputs = page.locator('input[type="text"], input:not([type]):not([inputmode])');
  const numberInputs = page.locator('input[type="number"], input[inputmode="numeric"]:not([type="text"])');
  const spinbuttons = page.locator('[role="spinbutton"]');

  // Fill text fields by finding them near their labels
  const fields = [
    { label: 'اسم الشركة (باللغة العربية)', value: 'شركة تجريبية' },
    { label: 'اسم الشركة (باللغة الانجليزية)', value: 'Test Company' },
    { label: 'الاسم الأول', value: 'محمد' },
    { label: 'الاسم الأخير', value: 'أحمد' },
    { label: 'البريد الإلكتروني', value: 'testmerchant@example.com' },
    { label: 'اسم العنوان', value: 'المكتب الرئيسي' },
    { label: 'العنوان التفصيلي', value: 'المنطقة التجارية' },
    { label: 'اسم الشارع', value: 'شارع الملك فهد' },
  ];

  for (const f of fields) {
    try {
      const container = page.locator(`text=${f.label}`).locator('..');
      const input = container.locator('input').first();
      await input.fill(f.value);
      await page.waitForTimeout(200);
    } catch (e) {
      console.log('Could not fill:', f.label, e.message);
    }
  }

  // Fill number fields (spinbuttons)
  const numberFields = [
    { label: 'رقم المبنى', value: '8118' },
    { label: 'الرقم الفرعي', value: '1118' },
    { label: 'الرمز البريدي', value: '21955' },
  ];

  for (const f of numberFields) {
    try {
      const container = page.locator(`text=${f.label}`).locator('..');
      const input = container.locator('input, [role="spinbutton"]').first();
      await input.fill(f.value);
      await page.waitForTimeout(200);
    } catch (e) {
      console.log('Could not fill number:', f.label, e.message);
    }
  }

  // Fill short address
  try {
    const shortAddr = page.locator('input[placeholder*="RRRD"]').first();
    await shortAddr.fill('RRRD2929');
  } catch (e) {
    console.log('Could not fill short address:', e.message);
  }

  // Handle dropdowns - نوع المتجر, الدولة, المدينة, الحي
  const dropdowns = [
    { label: 'نوع المتجر', index: 0 },
    { label: 'الدولة', index: 1 },
    { label: 'المدينة', index: 2 },
    { label: 'الحي', index: 3 },
  ];

  for (const dd of dropdowns) {
    try {
      const combo = page.locator('role=combobox').nth(dd.index);
      await combo.click();
      await page.waitForTimeout(500);
      // Select first option
      const option = page.locator('[role="option"]').first();
      await option.click();
      await page.waitForTimeout(300);
    } catch (e) {
      console.log('Could not select dropdown:', dd.label, e.message);
    }
  }

  console.log('Company step filled');
};

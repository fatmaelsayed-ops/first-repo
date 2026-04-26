async (page) => {
  // STEP 1: Company Data
  // Store name AR
  await page.getByPlaceholder('أدخل اسم الشركة بالعربية').fill('شركة اختبار ١٠١');
  // Store name EN
  await page.getByPlaceholder('Enter company name in English').fill('Test Company 101');
  
  // Store type dropdown
  await page.locator('[class*="select"]').filter({ hasText: 'اختر النوع' }).click();
  await page.waitForTimeout(500);
  await page.getByText('مطاعم').click();
  await page.waitForTimeout(500);

  // First name
  await page.getByPlaceholder('أدخل الاسم الأول').fill('محمد');
  // Last name
  await page.getByPlaceholder('أدخل الاسم الأخير').fill('أحمد');
  // Email
  await page.getByPlaceholder('example@email.com').fill('testmerchant101@example.com');
  // Address name
  await page.getByPlaceholder('أدخل اسم العنوان').fill('المكتب الرئيسي');
  // Detailed address
  await page.getByPlaceholder('أدخل العنوان التفصيلي').fill('المنطقة التجارية');

  // City dropdown
  await page.locator('[class*="select"]').filter({ hasText: 'اختر المدينة' }).click();
  await page.waitForTimeout(500);
  await page.getByText('الرياض').click();
  await page.waitForTimeout(500);

  // District dropdown
  await page.locator('[class*="select"]').filter({ hasText: 'اختر الحي' }).click();
  await page.waitForTimeout(500);
  await page.getByText('السلام').click();
  await page.waitForTimeout(500);

  // Street name
  await page.getByPlaceholder('أدخل اسم الشارع').fill('شارع الملك فهد');
  // Building number
  await page.getByPlaceholder('أدخل رقم المبنى').fill('8118');
  // Postal code
  await page.getByPlaceholder('أدخل الرمز البريدي').fill('21955');
  // Short address
  await page.getByPlaceholder('4 أحرف و 4 أرقام').fill('SSSD2931');

  // Click next step
  await page.getByRole('button', { name: 'الخطوة التالية' }).click();
  await page.waitForTimeout(3000);
}
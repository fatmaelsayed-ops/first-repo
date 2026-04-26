async (page) => {
  // Select city الرياض
  await page.getByRole('option', { name: 'الرياض' }).click();
  await page.waitForTimeout(1000);

  // Select district
  await page.locator('#react-select-6-input').click();
  await page.waitForTimeout(500);
  await page.getByRole('option', { name: 'السلام' }).click();
  await page.waitForTimeout(500);

  // Fill remaining fields
  await page.getByPlaceholder('أدخل اسم الشارع').fill('شارع الملك فهد');
  await page.getByPlaceholder('أدخل رقم المبنى').fill('8118');
  await page.getByPlaceholder('أدخل الرمز البريدي').fill('21955');
  await page.getByPlaceholder('4 أحرف و 4 أرقام').fill('SSSD2931');

  // Click next
  await page.getByRole('button', { name: 'الخطوة التالية' }).click();
  await page.waitForTimeout(3000);
}
async (page) => {
  // Select CR type
  await page.getByRole('option', { name: 'السجل التجاري' }).click();
  await page.waitForTimeout(1000);

  // Fill CR number
  await page.getByPlaceholder('أدخل رقم السجل التجاري').fill('1234567890');
  
  // Upload CR cert
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser', { timeout: 10000 }),
    page.getByRole('button', { name: 'Choose File' }).first().click()
  ]);
  await fileChooser.setFiles('.playwright-cli/test-cr-cert.pdf');
  await page.waitForTimeout(2000);

  // Install MutationObserver
  await page.evaluate(() => {
    window.__keepOverlay = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'aria-hidden' && m.target.getAttribute('aria-hidden') === 'true') {
          m.target.removeAttribute('aria-hidden');
        }
      }
    });
    window.__keepOverlay.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['aria-hidden'] });
  });

  // Click create account (VAT is OFF by default)
  await page.getByRole('button', { name: 'إنشاء الحساب' }).click();
  await page.waitForTimeout(5000);
}
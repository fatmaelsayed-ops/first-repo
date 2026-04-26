async (page) => {
  // Navigate to store login
  await page.goto('https://store.development.qawafel.dev/kan-kan-2?login=open');
  await page.waitForTimeout(3000);

  // Click login button to open dialog
  const loginBtn = page.getByRole('button', { name: 'تسجيل الدخول' });
  if (await loginBtn.isVisible()) await loginBtn.click();
  await page.waitForTimeout(2000);

  // Enter phone number
  const phoneInput = page.getByRole('textbox');
  await phoneInput.first().click();
  await page.keyboard.type('540000101');
  await page.waitForTimeout(500);

  // Click send OTP
  await page.getByRole('button', { name: 'إرسال رمز التحقق' }).click();
  await page.waitForTimeout(3000);

  // Enter OTP
  const otpInput = page.getByRole('textbox').first();
  await otpInput.click();
  await page.keyboard.type('201111');
  await page.waitForTimeout(1000);

  // Click verify
  await page.getByRole('button', { name: 'تحقق' }).click();
  await page.waitForTimeout(3000);

  // Install MutationObserver to prevent aria-hidden
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

  // Click create account
  await page.getByRole('button', { name: 'أنشئ الحساب' }).click();
  await page.waitForTimeout(3000);
}
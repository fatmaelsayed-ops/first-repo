async (page) => {
  // 1. Clear state
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.context().clearCookies();

  // 2. Navigate
  await page.goto('https://store.development.qawafel.dev/kan-kan-2?login=open');
  await page.waitForTimeout(5000);

  // 3. Fill phone via keyboard
  var tel = page.locator('input[type="tel"]');
  await tel.click();
  await tel.fill('');
  await page.keyboard.type('540000100');
  await page.waitForTimeout(500);

  // 4. Install MutationObserver
  await page.evaluate(() => {
    window.__keepOverlay = new MutationObserver(() => {
      document.querySelectorAll('div.fixed.z-50').forEach(el => {
        if (el.getAttribute('aria-hidden') === 'true') {
          el.setAttribute('aria-hidden', 'false');
        }
      });
    });
    window.__keepOverlay.observe(document.body, {
      attributes: true, subtree: true, attributeFilter: ['aria-hidden']
    });
  });

  // 5. Click create account
  await page.locator('button').filter({ hasText: /أنشئ/ }).click({ force: true });
  await page.waitForTimeout(4000);

  // 6. Enter OTP
  var otpBox = page.locator('input[type="text"]').first();
  await otpBox.click();
  await page.keyboard.type('201111');
  await page.waitForTimeout(500);

  // 7. Click confirm
  await page.locator('button').filter({ hasText: /تأكيد/ }).click({ force: true });
  await page.waitForTimeout(6000);
}

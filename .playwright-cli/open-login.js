async function run(page) {
  const ctx = page.context();
  await ctx.clearCookies();
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.goto('https://store.development.qawafel.dev/kan-kan-2?login=open');
  await page.waitForTimeout(5000);
  
  // Check if tel input is visible
  let telVisible = await page.locator('input[type="tel"]').isVisible().catch(() => false);
  console.log('tel visible after navigate:', telVisible);
  
  if (!telVisible) {
    // The login dialog overlay has aria-hidden="true" with CSS class aria-hidden:hidden
    // We need to show it
    const found = await page.evaluate(() => {
      const overlays = document.querySelectorAll('div.fixed');
      let found = false;
      for (const el of overlays) {
        if (el.querySelector('input[type="tel"]')) {
          el.setAttribute('aria-hidden', 'false');
          el.style.display = '';
          el.style.visibility = 'visible';
          found = true;
        }
      }
      return found;
    });
    console.log('Found and revealed overlay:', found);
    await page.waitForTimeout(1000);
    telVisible = await page.locator('input[type="tel"]').isVisible().catch(() => false);
    console.log('tel visible after reveal:', telVisible);
  }
  
  if (!telVisible) {
    // Try clicking the login button
    await page.locator('text=دخول / تسجيل').click({ force: true });
    await page.waitForTimeout(3000);
    telVisible = await page.locator('input[type="tel"]').isVisible().catch(() => false);
    console.log('tel visible after click:', telVisible);
  }
}

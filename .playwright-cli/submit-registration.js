async (page) => {
  // Install MutationObserver to prevent overlay aria-hidden issue
  await page.evaluate(() => {
    window.__keepOverlay = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'aria-hidden' && m.target.getAttribute('aria-hidden') === 'true') {
          m.target.removeAttribute('aria-hidden');
        }
      }
    });
    const overlay = document.querySelector('[data-radix-portal]') || document.querySelector('[role="dialog"]')?.parentElement;
    if (overlay) {
      window.__keepOverlay.observe(overlay.parentElement || document.body, { attributes: true, subtree: true, attributeFilter: ['aria-hidden'] });
    }
    // Also observe body for any new portals
    window.__keepOverlay.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['aria-hidden'] });
  });

  // Click create account
  await page.getByRole('button', { name: 'إنشاء الحساب' }).click();
  await page.waitForTimeout(5000);
}
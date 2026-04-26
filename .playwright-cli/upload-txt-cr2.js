async (page) => {
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser', { timeout: 10000 }),
    page.locator('[data-testid]').or(page.locator('button')).filter({ hasText: 'Choose File' }).first().click()
  ]);
  await fileChooser.setFiles('.playwright-cli/test.txt');
  await page.waitForTimeout(2000);
}
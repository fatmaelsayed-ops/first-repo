async (page) => {
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator('button:has-text("Choose File")').first().click()
  ]);
  await fileChooser.setFiles('.playwright-cli/test.txt');
  await page.waitForTimeout(2000);
}
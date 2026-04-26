module.exports = async function(page) {
  const ctx = page.context();
  await ctx.clearCookies();
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.goto('https://store.development.qawafel.dev/kan-kan-2?login=open');
  await page.waitForTimeout(5000);
  
  // Fill phone
  const phone = page.locator('input[type="tel"]');
  await phone.fill('540000095');
  await page.waitForTimeout(500);
  
  // Click create account
  const createBtn = page.locator('button:has-text("أنشئ الحساب")');
  await createBtn.click();
  await page.waitForTimeout(3000);
  
  // Fill OTP
  const otpInputs = page.locator('input[inputmode="numeric"]');
  const otp = '201111';
  for (let i = 0; i < otp.length; i++) {
    await otpInputs.nth(i).fill(otp[i]);
  }
  
  // Click confirm
  const confirmBtn = page.locator('button:has-text("تأكيد")');
  await confirmBtn.click();
  await page.waitForTimeout(5000);
  
  console.log('Done - should be on wizard now');
};

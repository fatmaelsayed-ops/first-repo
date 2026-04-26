const { execSync } = require('child_process');

// Step 1: Navigate with clean state
execSync('playwright-cli run-code "async page => { const ctx = page.context(); await ctx.clearCookies(); await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await page.goto(String.fromCharCode(104,116,116,112,115,58,47,47,115,116,111,114,101,46,100,101,118,101,108,111,112,109,101,110,116,46,113,97,119,97,102,101,108,46,100,101,118,47,107,97,110,45,107,97,110,45,50,63,108,111,103,105,110,61,111,112,101,110)); await page.waitForTimeout(5000); }"', { stdio: 'inherit' });

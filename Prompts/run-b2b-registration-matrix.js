const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const browserCandidates = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
];

(async () => {
  const rootDir = process.cwd();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const evidenceRoot = path.join(rootDir, 'evidence', 'b2b-registration', timestamp);
  fs.mkdirSync(evidenceRoot, { recursive: true });

  const data = {
    url: 'https://store.development.qawafel.dev/kan-kan-2?login=open',
    phone: '540000008',
    otp: '201111',
    storeNameAr: 'شركة تجريبية',
    storeNameEn: 'Test Company',
    firstName: 'محمد',
    lastName: 'أحمد',
    email: 'testmerchant@example.com',
    addressName: 'المكتب الرئيسي',
    country: 'المملكة العربية السعودية',
    city: 'مكة المكرمة',
    street: 'شارع الملك فهد',
    buildingNumber: '8118',
    longAddress: 'المنطقة التجارية',
    additionalNumber: '1118',
    zipCode: '21955',
    shortAddress: 'RRRD2929',
    legalName: 'شركة تجريبية للتجارة',
    crNumber: '1234567890',
    vatNumber: '300000000000003',
    files: {
      validCrPdf: path.join(rootDir, 'test-cr-valid.pdf'),
      validVatPdf: path.join(rootDir, 'test-valid.pdf'),
      unsupported: path.join(rootDir, 'test-unsupported.txt'),
      oversized: path.join(rootDir, 'test-large.pdf'),
    },
  };

  const executablePath = browserCandidates.find(candidate => fs.existsSync(candidate));
  if (!executablePath) {
    throw new Error('No supported system browser executable was found for Playwright automation.');
  }

  const browser = await chromium.launch({ headless: false, executablePath });
  const results = [];

  function slugify(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 90);
  }

  function esc(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function writeText(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  async function wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  async function firstVisible(locator) {
    const count = await locator.count();
    for (let index = 0; index < count; index += 1) {
      const candidate = locator.nth(index);
      if (await candidate.isVisible().catch(() => false)) {
        return candidate;
      }
    }
    return null;
  }

  async function locateAny(pageRef, locators) {
    for (const build of locators) {
      const locator = build(pageRef);
      const candidate = await firstVisible(locator);
      if (candidate) {
        return candidate;
      }
    }
    return null;
  }

  async function fillAny(pageRef, locators, value) {
    const locator = await locateAny(pageRef, locators);
    if (!locator) {
      throw new Error(`Could not locate field for value: ${value}`);
    }
    await locator.click({ timeout: 5000 });
    await locator.fill('');
    await locator.fill(value);
    return locator;
  }

  async function clickAny(pageRef, locators) {
    const locator = await locateAny(pageRef, locators);
    if (!locator) {
      throw new Error('Could not locate clickable target');
    }
    await locator.click({ timeout: 8000 });
    return locator;
  }

  async function expectText(pageRef, text, timeout = 10000) {
    await pageRef.getByText(text, { exact: false }).first().waitFor({ state: 'visible', timeout });
  }

  function scenarioDir(name) {
    const dir = path.join(evidenceRoot, slugify(name));
    fs.mkdirSync(dir, { recursive: true });
    return dir;
  }

  async function runScenario(name, fn) {
    const dir = scenarioDir(name);
    const context = await browser.newContext({ viewport: { width: 1536, height: 960 } });
    const scenarioPage = await context.newPage();
    const logs = [];
    const requests = [];
    let shot = 1;

    scenarioPage.on('console', msg => logs.push(`[console:${msg.type()}] ${msg.text()}`));
    scenarioPage.on('pageerror', err => logs.push(`[pageerror] ${err.message}`));
    scenarioPage.on('requestfailed', req => logs.push(`[requestfailed] ${req.method()} ${req.url()} :: ${req.failure()?.errorText || 'unknown'}`));
    scenarioPage.on('response', async response => {
      if (response.status() >= 400 && /register|otp|customer|storefront/i.test(response.url())) {
        let body = '';
        try {
          body = await response.text();
        } catch (error) {
          body = `[unreadable body] ${error.message}`;
        }
        requests.push({ status: response.status(), url: response.url(), body });
      }
    });

    async function screenshot(label) {
      const fileName = `${String(shot).padStart(2, '0')}-${slugify(label)}.png`;
      shot += 1;
      const filePath = path.join(dir, fileName);
      await scenarioPage.screenshot({ path: filePath, fullPage: true });
      return filePath;
    }

    let status = 'PASS';
    let note = '';
    try {
      await fn({ page: scenarioPage, screenshot, dir, logs, requests });
    } catch (error) {
      status = error.message.startsWith('BLOCKED:') ? 'BLOCKED' : 'FAIL';
      note = error.message;
      try {
        await screenshot('failure-state');
      } catch (captureError) {
        logs.push(`[capture-error] ${captureError.message}`);
      }
    }

    writeText(path.join(dir, 'console.txt'), logs.join('\n'));
    writeText(path.join(dir, 'network-errors.json'), JSON.stringify(requests, null, 2));
    results.push({
      name,
      status,
      note,
      evidence: path.relative(rootDir, dir).replace(/\\/g, '/'),
    });
    await context.close();
  }

  async function gotoEntry(pageRef) {
    await pageRef.goto(data.url, { waitUntil: 'domcontentloaded' });
    await wait(2000);
  }

  async function phoneInput(pageRef) {
    const locator = await locateAny(pageRef, [
      p => p.getByPlaceholder('5X XXX XXXX'),
      p => p.locator('input[type="tel"]'),
      p => p.locator('input[inputmode="tel"]'),
    ]);
    if (!locator) {
      throw new Error('Phone input was not visible on the registration entry screen');
    }
    return locator;
  }

  async function clickCreateAccount(pageRef) {
    await clickAny(pageRef, [
      p => p.getByRole('button', { name: new RegExp(esc('أنشئ الحساب'), 'u') }),
      p => p.getByRole('button', { name: /إنش/u }),
      p => p.getByText(/أنشئ الحساب|إنشاء الحساب/u),
    ]);
  }

  async function startOtp(pageRef, screenshot) {
    await gotoEntry(pageRef);
    const input = await phoneInput(pageRef);
    await input.fill(data.phone);
    await screenshot('phone-entry');
    await clickCreateAccount(pageRef);
    await expectText(pageRef, 'أدخل رمز التحقق', 15000);
    await screenshot('otp-screen');
  }

  async function otpInput(pageRef) {
    const locator = await locateAny(pageRef, [
      p => p.locator('input[autocomplete="one-time-code"]'),
      p => p.locator('input[inputmode="numeric"]'),
      p => p.locator('input[type="tel"]'),
    ]);
    if (!locator) {
      throw new Error('OTP input was not found');
    }
    return locator;
  }

  async function clickConfirm(pageRef) {
    await clickAny(pageRef, [
      p => p.getByRole('button', { name: new RegExp(esc('تأكيد'), 'u') }),
      p => p.getByText(/تأكيد/u),
    ]);
  }

  async function submitOtp(pageRef, code, screenshot) {
    const input = await otpInput(pageRef);
    await input.click({ timeout: 5000 });
    await input.fill('');
    await input.fill(code);
    await screenshot('otp-filled');
    await clickConfirm(pageRef);
  }

  async function reachWizard(pageRef, screenshot) {
    await startOtp(pageRef, screenshot);
    await submitOtp(pageRef, data.otp, screenshot);
    const heading = await locateAny(pageRef, [
      p => p.getByText(/بيانات الشركة/u),
      p => p.getByText(/الخطوة\s*1\s*من\s*2/u),
      p => p.locator('[role="dialog"] h1'),
    ]);
    if (!heading) {
      const errorBanner = await locateAny(pageRef, [
        p => p.getByText(/منتهي الصلاحية|غير صحيح|الرمز/u),
        p => p.getByText(/expired|invalid/i),
      ]);
      if (errorBanner) {
        throw new Error(`BLOCKED: valid OTP did not open the wizard. Visible error: ${await errorBanner.innerText()}`);
      }
      throw new Error('BLOCKED: valid OTP did not open the registration wizard');
    }
    await screenshot('company-step');
  }

  async function visibleReactSelectInputs(pageRef) {
    return pageRef.locator('input[id^="react-select-"]:visible');
  }

  async function selectByVisibleIndex(pageRef, visibleIndex) {
    const inputs = await visibleReactSelectInputs(pageRef);
    const locator = inputs.nth(visibleIndex);
    if (!(await locator.isVisible().catch(() => false))) {
      throw new Error(`Expected select index ${visibleIndex} to be visible`);
    }
    await locator.click({ timeout: 5000 });
    await wait(500);
    const option = await firstVisible(pageRef.getByRole('option'));
    if (!option) {
      throw new Error(`No options were visible for select index ${visibleIndex}`);
    }
    await option.click({ timeout: 5000 });
    await wait(400);
  }

  async function fillCompanyStepValid(pageRef, screenshot) {
    const dialog = pageRef.locator('[role="dialog"]').last();
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /اسم الشركة.*العربي/u }),
      p => p.getByLabel(/اسم الشركة.*العربي/u),
    ], data.storeNameAr);
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /اسم الشركة.*انجليزي|اسم الشركة.*English|اسم الشركة.*الانجليزي/u }),
      p => p.getByLabel(/اسم الشركة.*انجليزي|اسم الشركة.*English|اسم الشركة.*الانجليزي/u),
    ], data.storeNameEn);
    await selectByVisibleIndex(dialog, 0);
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /الاسم الأول/u }),
      p => p.getByLabel(/الاسم الأول/u),
    ], data.firstName);
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /الاسم الأخير/u }),
      p => p.getByLabel(/الاسم الأخير/u),
    ], data.lastName);
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /البريد الإلكتروني/u }),
      p => p.getByPlaceholder(/example@email\.com/i),
    ], data.email);
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /اسم العنوان/u }),
      p => p.getByLabel(/اسم العنوان/u),
    ], data.addressName);
    const countryText = await dialog.getByText(/المملكة العربية السعودية/u).count().catch(() => 0);
    if (!countryText) {
      await selectByVisibleIndex(dialog, 1);
    }
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /العنوان التفصيلي/u }),
      p => p.getByLabel(/العنوان التفصيلي/u),
    ], data.longAddress);
    await selectByVisibleIndex(dialog, 1);
    await selectByVisibleIndex(dialog, 2);
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /اسم الشارع/u }),
      p => p.getByLabel(/اسم الشارع/u),
    ], data.street);
    await fillAny(dialog, [
      p => p.getByPlaceholder(/8118/),
      p => p.getByRole('textbox', { name: /رقم المبنى/u }),
    ], data.buildingNumber);
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /الرقم الفرعي/u }),
      p => p.getByPlaceholder(/الرقم الفرعي/u),
    ], data.additionalNumber);
    await fillAny(dialog, [
      p => p.getByPlaceholder(/الرمز البريدي/u),
      p => p.getByRole('textbox', { name: /الرمز البريدي/u }),
    ], data.zipCode);
    await fillAny(dialog, [
      p => p.getByPlaceholder(/RRRD2929/i),
      p => p.getByRole('textbox', { name: /الوطني المختصر|الرقم الوطني المختصر/u }),
    ], data.shortAddress);
    if (screenshot) {
      await screenshot('company-step-filled');
    }
  }

  async function clickNext(pageRef) {
    await clickAny(pageRef, [
      p => p.getByRole('button', { name: /الخطوة التالية/u }),
      p => p.getByText(/الخطوة التالية/u),
    ]);
  }

  async function clickPrevious(pageRef) {
    await clickAny(pageRef, [
      p => p.getByRole('button', { name: /الخطوة السابقة/u }),
      p => p.getByText(/الخطوة السابقة/u),
    ]);
  }

  async function reachLegalStep(pageRef, screenshot) {
    await reachWizard(pageRef, screenshot);
    await fillCompanyStepValid(pageRef, screenshot);
    await clickNext(pageRef);
    await expectText(pageRef, 'المعلومات القانونية', 15000);
    await screenshot('legal-step');
  }

  async function fillLegalStepValid(pageRef, screenshot, options = { vat: false, uploadCr: true, uploadVat: false }) {
    const dialog = pageRef.locator('[role="dialog"]').last();
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /الاسم القانوني/u }),
      p => p.getByLabel(/الاسم القانوني/u),
    ], data.legalName);
    await selectByVisibleIndex(dialog, 0);
    await fillAny(dialog, [
      p => p.getByRole('textbox', { name: /السجل التجاري|الرقم الموحد/u }),
      p => p.getByLabel(/السجل التجاري|الرقم الموحد/u),
    ], data.crNumber);
    const fileInputs = dialog.locator('input[type="file"]');
    if (options.uploadCr) {
      if ((await fileInputs.count()) < 1) {
        throw new Error('CR file input was not found');
      }
      await fileInputs.nth(0).setInputFiles(data.files.validCrPdf);
    }
    if (options.vat) {
      const toggle = await locateAny(dialog, [
        p => p.locator('[role="switch"]'),
        p => p.locator('button[role="switch"]'),
        p => p.locator('input[type="checkbox"]'),
      ]);
      if (!toggle) {
        throw new Error('VAT toggle was not found');
      }
      const checked = await toggle.getAttribute('aria-checked').catch(() => null);
      if (checked !== 'true') {
        await toggle.click({ timeout: 5000 });
      }
      await fillAny(dialog, [
        p => p.getByRole('textbox', { name: /ضريبة القيمة المضافة/u }),
        p => p.getByLabel(/ضريبة القيمة المضافة/u),
      ], data.vatNumber);
      if (options.uploadVat) {
        if ((await fileInputs.count()) < 2) {
          throw new Error('VAT file input was not found');
        }
        await fileInputs.nth(1).setInputFiles(data.files.validVatPdf);
      }
    }
    if (screenshot) {
      await screenshot('legal-step-filled');
    }
  }

  async function clickSubmit(pageRef) {
    await clickAny(pageRef, [
      p => p.getByRole('button', { name: /إنشاء الحساب/u }),
      p => p.getByText(/إنشاء الحساب/u),
    ]);
  }

  async function expectValidationPresent(pageRef) {
    const dialog = pageRef.locator('[role="dialog"]').last();
    const texts = await dialog.locator('*').allInnerTexts().catch(() => []);
    const joined = texts.join(' ');
    if (!/مطلوب|required|الرجاء|الرجا|يجب|صيغة|على الأقل|خانات|أرقام/u.test(joined)) {
      throw new Error('Expected validation message was not visible');
    }
  }

  async function replaceCompanyFieldWithInvalid(pageRef, fieldName, value) {
    const dialog = pageRef.locator('[role="dialog"]').last();
    const mapping = {
      'الاسم الأول': [p => p.getByRole('textbox', { name: /الاسم الأول/u })],
      'الاسم الأخير': [p => p.getByRole('textbox', { name: /الاسم الأخير/u })],
      'البريد الإلكتروني': [p => p.getByRole('textbox', { name: /البريد الإلكتروني/u }), p => p.getByPlaceholder(/example@email\.com/i)],
      'اسم الشركة (باللغة العربية)': [p => p.getByRole('textbox', { name: /اسم الشركة.*العربي/u })],
      'اسم الشركة (باللغة الانجليزية)': [p => p.getByRole('textbox', { name: /اسم الشركة.*انجليزي|English|الانجليزي/u })],
      'اسم الشارع': [p => p.getByRole('textbox', { name: /اسم الشارع/u })],
      'رقم المبنى': [p => p.getByRole('textbox', { name: /رقم المبنى/u }), p => p.getByPlaceholder(/8118/)],
      'الرمز البريدي': [p => p.getByRole('textbox', { name: /الرمز البريدي/u }), p => p.getByPlaceholder(/الرمز البريدي/u)],
      'الرقم الوطني المختصر': [p => p.getByRole('textbox', { name: /الوطني المختصر|الرقم الوطني المختصر/u }), p => p.getByPlaceholder(/RRRD2929/i)],
    };
    await fillAny(dialog, mapping[fieldName], value);
  }

  async function replaceLegalFieldWithInvalid(pageRef, fieldName, value) {
    const dialog = pageRef.locator('[role="dialog"]').last();
    const mapping = {
      'الاسم القانوني للشركة (باللغة العربية)': [p => p.getByRole('textbox', { name: /الاسم القانوني/u })],
      'السجل التجاري/الرقم الموحد': [p => p.getByRole('textbox', { name: /السجل التجاري|الرقم الموحد/u })],
    };
    await fillAny(dialog, mapping[fieldName], value);
  }

  async function openComparisonState(pageRef, screenshot) {
    await gotoEntry(pageRef);
    await screenshot('ui-registration-entry');
    await startOtp(pageRef, screenshot);
    await submitOtp(pageRef, data.otp, screenshot);
    await screenshot('ui-post-otp');
    const stepOneVisible = await pageRef.getByText(/بيانات الشركة/u).first().isVisible().catch(() => false);
    if (!stepOneVisible) {
      throw new Error('BLOCKED: UI comparison could not open company data step because OTP did not verify');
    }
    await fillCompanyStepValid(pageRef, screenshot);
    await clickNext(pageRef);
    await expectText(pageRef, 'المعلومات القانونية', 15000);
    await screenshot('ui-legal-step');
  }

  const companyOutline = [
    ['الاسم الأول', 'مح'],
    ['الاسم الأخير', 'أح'],
    ['البريد الإلكتروني', 'invalid-email'],
    ['اسم الشركة (باللغة العربية)', 'شر'],
    ['اسم الشركة (باللغة الانجليزية)', 'Te'],
    ['اسم الشارع', 'شا'],
    ['رقم المبنى', '123'],
    ['رقم المبنى', '12A4'],
    ['الرمز البريدي', '2195'],
    ['الرمز البريدي', 'ABCDE'],
    ['الرقم الوطني المختصر', 'RRR1'],
    ['الرقم الوطني المختصر', '1234ABCD'],
  ];

  const legalOutline = [
    ['الاسم القانوني للشركة (باللغة العربية)', 'شر'],
    ['السجل التجاري/الرقم الموحد', '123456789'],
    ['السجل التجاري/الرقم الموحد', '12345ABCDE'],
  ];

  await runScenario('Submit a new mobile number and move to OTP verification', async ({ page: p, screenshot }) => {
    await startOtp(p, screenshot);
    await expectText(p, 'أدخل رمز التحقق');
  });

  await runScenario('Show validation when OTP is incorrect or expired', async ({ page: p, screenshot }) => {
    await startOtp(p, screenshot);
    await submitOtp(p, '000000', screenshot);
    await expectValidationPresent(p);
    await screenshot('otp-invalid-validation');
  });

  await runScenario('Return from OTP screen to edit the mobile number', async ({ page: p, screenshot }) => {
    await startOtp(p, screenshot);
    await clickAny(p, [
      x => x.getByText(/تعديل/u),
      x => x.getByRole('button', { name: /تعديل/u }),
      x => x.getByRole('link', { name: /تعديل/u }),
    ]);
    await screenshot('otp-edit-clicked');
    await phoneInput(p);
  });

  await runScenario('Verify OTP and open the registration wizard', async ({ page: p, screenshot }) => {
    await reachWizard(p, screenshot);
    await expectText(p, 'الخطوة 1 من 2');
  });

  await runScenario('Company data step shows the current two-step structure', async ({ page: p, screenshot }) => {
    await reachWizard(p, screenshot);
    await expectText(p, 'بيانات الشركة');
    await expectText(p, 'المعلومات القانونية');
  });

  await runScenario('Company data step contains all required fields', async ({ page: p, screenshot }) => {
    await reachWizard(p, screenshot);
    const requiredTexts = ['اسم الشركة', 'نوع المتجر', 'الاسم الأول', 'الاسم الأخير', 'البريد الإلكتروني', 'اسم العنوان', 'الدولة', 'العنوان التفصيلي', 'المدينة', 'الحي', 'اسم الشارع', 'رقم المبنى', 'الرمز البريدي'];
    for (const text of requiredTexts) {
      await expectText(p, text);
    }
    await screenshot('company-fields-visible');
  });

  await runScenario('Required validation appears when company data step is submitted empty', async ({ page: p, screenshot }) => {
    await reachWizard(p, screenshot);
    await clickNext(p);
    await expectValidationPresent(p);
    await screenshot('company-empty-validation');
  });

  for (const [field, invalidValue] of companyOutline) {
    await runScenario(`Company data step rejects invalid field formats - ${field}=${invalidValue}`, async ({ page: p, screenshot }) => {
      await reachWizard(p, screenshot);
      await fillCompanyStepValid(p, screenshot);
      await replaceCompanyFieldWithInvalid(p, field, invalidValue);
      await clickNext(p);
      await expectValidationPresent(p);
      await screenshot('company-invalid-validation');
    });
  }

  await runScenario('Company data step requires dropdown selections', async ({ page: p, screenshot }) => {
    await reachWizard(p, screenshot);
    const dialog = p.locator('[role="dialog"]').last();
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /اسم الشركة.*العربي/u })], data.storeNameAr);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /اسم الشركة.*انجليزي|English|الانجليزي/u })], data.storeNameEn);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /الاسم الأول/u })], data.firstName);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /الاسم الأخير/u })], data.lastName);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /البريد الإلكتروني/u }), q => q.getByPlaceholder(/example@email\.com/i)], data.email);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /اسم العنوان/u })], data.addressName);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /العنوان التفصيلي/u })], data.longAddress);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /اسم الشارع/u })], data.street);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /رقم المبنى/u }), q => q.getByPlaceholder(/8118/)], data.buildingNumber);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /الرمز البريدي/u }), q => q.getByPlaceholder(/الرمز البريدي/u)], data.zipCode);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /الوطني المختصر|الرقم الوطني المختصر/u }), q => q.getByPlaceholder(/RRRD2929/i)], data.shortAddress);
    await clickNext(p);
    await expectValidationPresent(p);
    await screenshot('company-dropdown-validation');
  });

  await runScenario('Move from company data step to legal information step with valid data', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    await expectText(p, 'الخطوة 2 من 2');
  });

  await runScenario('Previously entered company data is preserved after moving back from legal information', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    await clickPrevious(p);
    await screenshot('back-to-company-step');
    const dialog = p.locator('[role="dialog"]').last();
    const firstNameValue = await dialog.getByRole('textbox', { name: /الاسم الأول/u }).inputValue();
    if (firstNameValue !== data.firstName) {
      throw new Error(`Expected first name to be preserved, got: ${firstNameValue}`);
    }
  });

  await runScenario('Legal information step shows the required fields when VAT is off', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    for (const text of ['الاسم القانوني', 'السجل التجاري', 'رفع', 'خاضع للضريبة']) {
      await expectText(p, text);
    }
    const vatFieldVisible = await p.getByRole('textbox', { name: /ضريبة القيمة المضافة/u }).count().catch(() => 0);
    if (vatFieldVisible > 0) {
      throw new Error('VAT field should be hidden by default');
    }
    await screenshot('legal-fields-default');
  });

  await runScenario('Toggle VAT on to reveal VAT inputs', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    const dialog = p.locator('[role="dialog"]').last();
    const toggle = await locateAny(dialog, [
      q => q.locator('[role="switch"]'),
      q => q.locator('button[role="switch"]'),
      q => q.locator('input[type="checkbox"]'),
    ]);
    if (!toggle) {
      throw new Error('VAT toggle was not found');
    }
    await toggle.click({ timeout: 5000 });
    await screenshot('vat-toggle-on');
    await expectText(p, 'ضريبة القيمة المضافة');
  });

  await runScenario('Legal information step requires CR type selection', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    const dialog = p.locator('[role="dialog"]').last();
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /الاسم القانوني/u })], data.legalName);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /السجل التجاري|الرقم الموحد/u })], data.crNumber);
    const fileInputs = dialog.locator('input[type="file"]');
    await fileInputs.nth(0).setInputFiles(data.files.validCrPdf);
    await clickSubmit(p);
    await expectValidationPresent(p);
  });

  await runScenario('Legal information step requires a CR certificate upload', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    const dialog = p.locator('[role="dialog"]').last();
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /الاسم القانوني/u })], data.legalName);
    await selectByVisibleIndex(dialog, 0);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /السجل التجاري|الرقم الموحد/u })], data.crNumber);
    await clickSubmit(p);
    await expectValidationPresent(p);
  });

  await runScenario('Legal information step rejects unsupported CR certificate formats', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    const dialog = p.locator('[role="dialog"]').last();
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /الاسم القانوني/u })], data.legalName);
    await selectByVisibleIndex(dialog, 0);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /السجل التجاري|الرقم الموحد/u })], data.crNumber);
    await dialog.locator('input[type="file"]').nth(0).setInputFiles(data.files.unsupported);
    await screenshot('unsupported-file-upload');
    await expectValidationPresent(p);
  });

  await runScenario('Legal information step rejects CR certificate files larger than the allowed size', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    const dialog = p.locator('[role="dialog"]').last();
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /الاسم القانوني/u })], data.legalName);
    await selectByVisibleIndex(dialog, 0);
    await fillAny(dialog, [q => q.getByRole('textbox', { name: /السجل التجاري|الرقم الموحد/u })], data.crNumber);
    await dialog.locator('input[type="file"]').nth(0).setInputFiles(data.files.oversized);
    await screenshot('oversized-file-upload');
    await expectValidationPresent(p);
  });

  for (const [field, invalidValue] of legalOutline) {
    await runScenario(`Legal information step rejects invalid business identifiers - ${field}=${invalidValue}`, async ({ page: p, screenshot }) => {
      await reachLegalStep(p, screenshot);
      await fillLegalStepValid(p, screenshot, { vat: false, uploadCr: true, uploadVat: false });
      await replaceLegalFieldWithInvalid(p, field, invalidValue);
      await clickSubmit(p);
      await expectValidationPresent(p);
      await screenshot('legal-invalid-validation');
    });
  }

  await runScenario('VAT number and VAT certificate become required when VAT is enabled', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    await fillLegalStepValid(p, screenshot, { vat: false, uploadCr: true, uploadVat: false });
    const dialog = p.locator('[role="dialog"]').last();
    const toggle = await locateAny(dialog, [
      q => q.locator('[role="switch"]'),
      q => q.locator('button[role="switch"]'),
      q => q.locator('input[type="checkbox"]'),
    ]);
    await toggle.click({ timeout: 5000 });
    await clickSubmit(p);
    await expectValidationPresent(p);
    await screenshot('vat-required-validation');
  });

  await runScenario('Complete registration successfully without VAT', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    await fillLegalStepValid(p, screenshot, { vat: false, uploadCr: true, uploadVat: false });
    await clickSubmit(p);
    await wait(5000);
    await screenshot('submit-without-vat');
    await expectText(p, 'طلبك قيد المراجعة', 10000);
  });

  await runScenario('Complete registration successfully with VAT enabled', async ({ page: p, screenshot }) => {
    await reachLegalStep(p, screenshot);
    await fillLegalStepValid(p, screenshot, { vat: true, uploadCr: true, uploadVat: true });
    await clickSubmit(p);
    await wait(5000);
    await screenshot('submit-with-vat');
    await expectText(p, 'طلبك قيد المراجعة', 10000);
  });

  await runScenario('Complete the full B2B registration flow end to end without VAT', async ({ page: p, screenshot }) => {
    await gotoEntry(p);
    await screenshot('e2e-start');
    await reachLegalStep(p, screenshot);
    await fillLegalStepValid(p, screenshot, { vat: false, uploadCr: true, uploadVat: false });
    await clickSubmit(p);
    await wait(5000);
    await screenshot('e2e-without-vat-result');
    await expectText(p, 'طلبك قيد المراجعة', 10000);
  });

  await runScenario('Complete the full B2B registration flow end to end with VAT', async ({ page: p, screenshot }) => {
    await gotoEntry(p);
    await screenshot('e2e-vat-start');
    await reachLegalStep(p, screenshot);
    await fillLegalStepValid(p, screenshot, { vat: true, uploadCr: true, uploadVat: true });
    await clickSubmit(p);
    await wait(5000);
    await screenshot('e2e-with-vat-result');
    await expectText(p, 'طلبك قيد المراجعة', 10000);
  });

  await runScenario('Compare the implemented registration screens against the attached reference set', async ({ page: p, screenshot, dir }) => {
    await openComparisonState(p, screenshot);
    const discrepancies = [];
    const entryHasLogo = await p.getByText(/Qawafel/i).count().catch(() => 0);
    if (!entryHasLogo) {
      discrepancies.push('Brand logo text was not visible in the compared state.');
    }
    await fillLegalStepValid(p, screenshot, { vat: false, uploadCr: true, uploadVat: false });
    await clickSubmit(p);
    await wait(5000);
    await screenshot('ui-final-popup');
    const reviewPopupVisible = await p.getByText(/طلبك قيد المراجعة/u).count().catch(() => 0);
    if (!reviewPopupVisible) {
      discrepancies.push('Final review popup did not match the attached expected state.');
    }
    writeText(path.join(dir, 'ui-discrepancies.md'), discrepancies.length ? discrepancies.join('\n') : 'No major UI discrepancies detected during this automated comparison.');
    if (discrepancies.length) {
      throw new Error(`UI discrepancies detected: ${discrepancies.join(' | ')}`);
    }
  });

  await runScenario('Flag a UI mismatch when implementation deviates from the attached reference screens', async ({ page: p, screenshot, dir }) => {
    await openComparisonState(p, screenshot);
    const discrepancies = [];
    const expectedTexts = ['أنشئ الحساب', 'أدخل رمز التحقق', 'بيانات الشركة', 'المعلومات القانونية'];
    for (const text of expectedTexts) {
      const visible = await p.getByText(new RegExp(esc(text), 'u')).count().catch(() => 0);
      if (!visible) {
        discrepancies.push(`Missing expected text: ${text}`);
      }
    }
    writeText(path.join(dir, 'ui-discrepancies.md'), discrepancies.join('\n'));
    await screenshot('ui-comparison-negative');
  });

  const summary = {
    generatedAt: new Date().toISOString(),
    evidenceRoot: path.relative(rootDir, evidenceRoot).replace(/\\/g, '/'),
    counts: results.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {}),
    results,
  };

  writeText(path.join(evidenceRoot, 'matrix.json'), JSON.stringify(summary, null, 2));

  const markdown = [
    '# B2B Registration Matrix',
    '',
    `- Date: ${summary.generatedAt}`,
    `- Evidence root: ${summary.evidenceRoot}`,
    '',
    '| Scenario | Status | Note | Evidence |',
    '|---|---|---|---|',
    ...results.map(item => `| ${item.name} | ${item.status} | ${item.note || ''} | ${item.evidence} |`),
    '',
    '## Counts',
    '',
    ...Object.entries(summary.counts).map(([key, value]) => `- ${key}: ${value}`),
  ].join('\n');

  writeText(path.join(evidenceRoot, 'matrix.md'), markdown);
  console.log(JSON.stringify(summary, null, 2));
  await browser.close();
})().catch(error => {
  console.error(error);
  process.exit(1);
});
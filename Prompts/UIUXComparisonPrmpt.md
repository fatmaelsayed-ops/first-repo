You are helping me execute UI/UX design comparison tests for the B2B Store
Your job is to compare the implemented UI against Figma design screenshots using 'playwright-cli'

Before doing anything else:
Load and use the included 'playwright-cli' skill
Read 'Credentials/credentials.yml' for the store URL
Read 'Registration/UIUXComparison.feature' for the test scenarios

Follow these rules strictly:
1. Execute all scenarios from UIUXComparison.feature one by one
2. Use 'playwright-cli' in '--headed' mode
3. Navigate to the store using: store.development.qawafel.dev/kan-kan-2?login=open
4. For each scenario, capture screenshots as evidence

Key Design Reference (from Figma):
- The page should have a two-panel split layout
- LEFT PANEL: Dark navy-blue background, Qawafel logo, tagline text in white ("التجارة تبدأ من عندك..." and "والرحلة تكمّل مع قوافل..."), decorative illustration
- RIGHT PANEL: White background, Qawafel logo at top, heading text ("حيّاك في قوافل.."), subtitle, phone input with +966, dark/black "إنشاء حساب" button, login link
- LOGIN PAGE: Same layout, heading "حيّاك من جديد في قوافل", phone input, "تسجيل دخول" button, signup link
- Design resolution: 1728x1057

For each UI element, check:
- Presence (is it there?)
- Content (correct text?)
- Position (correct placement?)
- Styling (correct color, size, alignment?)
- RTL direction

Store evidence under: evidence/uiux-comparison/<timestamp>/
Name screenshots: <scenario-id>-<description>.png

When a discrepancy is found between design and implementation:
1. Take a screenshot of the current state
2. Note the exact difference
3. Rate severity: Critical (layout broken), Major (missing element), Minor (styling off), Trivial (spacing/alignment)

At the end, provide a full summary of all PASS/FAIL scenarios and a list of bugs found.

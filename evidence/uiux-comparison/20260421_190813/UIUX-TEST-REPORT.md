# UI/UX Design Comparison Test Report — 2026-04-21

## Test Session Details
- **Feature File:** Registration/UIUXComparison.feature
- **Design Reference:** Figma screens (Signup 1, Login)
- **Design Resolution:** 1728 × 1057
- **Store URL:** https://store.development.qawafel.dev/kan-kan-2?login=open
- **Tested Resolutions:** 1728×1057 (design), 1920×1080 (HD), 1366×768 (laptop), 375×812 (mobile)

---

## Summary
| Total Scenarios | Passed | Failed (Bug) | Observations |
|----------------|--------|---------------|-------------|
| 21             | 12     | 7             | 2           |

**Bugs Found: 7**

---

## Bugs

### BUG-UIUX-01: Signup Heading Text Mismatch — Exclamation Mark Instead of Double Dots
- **Severity:** Minor
- **Priority:** Medium
- **Scenario:** UIUX-03 - Signup page right panel heading text
- **Design (Figma):** "حيّاك في قوافل.." (ends with two dots "..")
- **Implementation:** "حيّاك في قوافل!" (ends with exclamation mark "!")
- **Impact:** Text does not match the approved design copy
- **Evidence:** [01-signup-full-page-1728x1057.png](01-signup-full-page-1728x1057.png)

---

### BUG-UIUX-02: Signup Button Text Mismatch — Different Arabic Wording
- **Severity:** Minor
- **Priority:** Medium
- **Scenario:** UIUX-05 - Signup page create account button
- **Design (Figma):** "إنشاء حساب" (noun form, indefinite)
- **Implementation:** "أنشئ الحساب" (imperative form, definite)
- **Impact:** Button copy deviates from design specification. The verb conjugation and the use of definite article "ال" differ from the approved design.
- **Evidence:** [02-signup-button-enabled.png](02-signup-button-enabled.png)

---

### BUG-UIUX-03: Login Heading Text Mismatch — Extra Word "الله" and Exclamation Mark
- **Severity:** Minor
- **Priority:** Medium
- **Scenario:** UIUX-09 - Login page heading text
- **Design (Figma):** "حيّاك من جديد في قوافل"
- **Implementation:** "حيّاك الله من جديد في قوافل!" (word "الله" added + exclamation mark "!" added)
- **Impact:** Login page heading deviates from approved design copy with two extra changes
- **Evidence:** [03-login-page.png](03-login-page.png)

---

### BUG-UIUX-04: Login Button Text Typo — Missing "ي" Letter
- **Severity:** Major
- **Priority:** High
- **Scenario:** UIUX-11 - Login page phone input and button
- **Design (Expected):** "تسجيل الدخول" (correct Arabic noun form)
- **Implementation:** "تسجل الدخول" (missing "ي" — grammatically incorrect)
- **Impact:** Arabic grammar error visible on a primary CTA button. "تسجل" is not a valid form here — it should be either "تسجيل" (noun) or "سجّل" (imperative). This is a visible typo on the most important button of the login page.
- **Evidence:** [03-login-page.png](03-login-page.png), [04-login-btn-hover.png](04-login-btn-hover.png)

---

### BUG-UIUX-05: Headings Use `<p>` Tag Instead of Proper `<h1>`/`<h2>` — Accessibility Issue
- **Severity:** Minor
- **Priority:** Medium
- **Scenario:** UIUX-14 - Typography and text alignment
- **Design (Expected):** Main page headings should use semantic heading tags (`<h1>` or `<h2>`)
- **Implementation:** Both signup heading ("حيّاك في قوافل!") and login heading ("حيّاك الله من جديد في قوافل!") are rendered as `<p>` (paragraph) tags with CSS class `font-bold text-[24px]`
- **Impact:** 
  - WCAG 2.4.6 (Headings and Labels) violation
  - Screen readers cannot identify page headings
  - SEO impact — no heading structure on auth pages
- **Technical Details:**
  - Heading tag: `<p>` instead of `<h1>` or `<h2>`
  - CSS: `font-bold text-[24px]` applied via Tailwind classes
  - The visual appearance is correct (bold, 24px), but the semantic markup is wrong
- **Evidence:** Verified via DOM inspection — `tag: "P"` confirmed for both headings

---

### BUG-UIUX-06: No Visual Hover State on CTA Buttons
- **Severity:** Trivial
- **Priority:** Low
- **Scenario:** UIUX-18 - Button hover and focus states
- **Design (Expected):** Buttons should show visible hover feedback (color change, shadow, or opacity shift)
- **Implementation:** Button hover state is identical to default state:
  - Background: `rgb(20, 24, 29)` → same on hover
  - Box-shadow: `none` → same on hover
  - Opacity: `1` → same on hover
  - No transform or transition visible
- **Impact:** Poor UX — users get no visual feedback that the button is interactive when hovering. Reduces perceived interactivity of the CTA.
- **Evidence:** [04-login-btn-hover.png](04-login-btn-hover.png)

---

### BUG-UIUX-07: No Visible Focus Indicator on Phone Input Field
- **Severity:** Minor
- **Priority:** Medium
- **Scenario:** UIUX-19 - Input field focus state
- **Design (Expected):** Input field should show a visible focus indicator (border change, outline, or shadow) per WCAG 2.4.7 (Focus Visible)
- **Implementation:** When the phone input is focused:
  - Container border: `0px solid rgb(229, 231, 235)` (no border change)
  - Container outline: `none`
  - Container box-shadow: `none`
  - Input outline: `none`
- **Impact:** 
  - WCAG 2.4.7 (Focus Visible) violation — keyboard users cannot see which element is focused
  - Accessibility compliance issue
- **Evidence:** [05-input-focus-state.png](05-input-focus-state.png)

---

## Passed Scenarios

| # | Scenario | Status | Notes |
|---|----------|--------|-------|
| 1 | UIUX-01: Two-panel layout | ✅ PASS | Left navy panel (778px), right white panel (950px) |
| 2 | UIUX-02: Left panel branding | ✅ PASS | Tagline "التجارة تبدأ من عندك... والرحلة تكمل مع قوافل..." visible |
| 3 | UIUX-04: Phone input field | ✅ PASS | Placeholder "5X XXX XXXX", +966, Saudi flag icon present |
| 4 | UIUX-06: Login link for existing users | ✅ PASS | "عندك حساب بالفعل؟ سجل دخولك" visible |
| 5 | UIUX-07: Top-right logo | ✅ PASS | "Qawafel Logo" image (138×56px) at top right |
| 6 | UIUX-08: Login two-panel layout | ✅ PASS | Same structure as signup |
| 7 | UIUX-10: Login left panel branding | ✅ PASS | Different background image (login-bg.png), same tagline |
| 8 | UIUX-12: Login signup link | ✅ PASS | "ليس لديك حساب؟ إنشاء حساب جديد" visible |
| 9 | UIUX-13: Color scheme | ✅ PASS | Dark button rgb(20,24,29), white text, gray subtitle |
| 10 | UIUX-15: Element spacing | ✅ PASS | Consistent vertical spacing, centered content |
| 11 | UIUX-16: 1728×1057 rendering | ✅ PASS | No overflow, all text visible |
| 12 | UIUX-17: 1920×1080 rendering | ✅ PASS | Layout adapts without broken elements |

## Observations

### Mobile Responsive (375×812)
- Left panel hides correctly on mobile
- Single-column layout renders all form elements
- Text wraps naturally without truncation
- Bottom navigation from main store shows through the auth overlay

### Left Panel Implementation
- Signup uses `registration-bg.png`, Login uses `login-bg.png`
- Both include tagline, logo, and decorative elements baked into the background image
- This means tagline text is not selectable or accessible to screen readers
- Not a bug per se, but an architectural observation for accessibility

### Button Disabled State
- When phone field is empty, button shows `opacity: 0.5` (grayed out)
- When phone is entered, button returns to full opacity with dark background
- This behavior is not explicitly shown in the Figma design but is good UX practice

---

## Evidence Files
| # | File | Description |
|---|------|-------------|
| 1 | 01-signup-full-page-1728x1057.png | Signup page at Figma resolution, empty state |
| 2 | 02-signup-button-enabled.png | Signup with phone entered, button enabled |
| 3 | 03-login-page.png | Login page at design resolution |
| 4 | 04-login-btn-hover.png | Login button hover state (no visible change) |
| 5 | 05-input-focus-state.png | Phone input focused (no visible focus ring) |
| 6 | 06-login-1920x1080.png | Login at standard HD |
| 7 | 07-login-1366x768.png | Login at laptop resolution |
| 8 | 08-login-mobile-375x812.png | Login on mobile |
| 9 | 09-signup-mobile-375x812.png | Signup on mobile |
| 10 | 10-signup-final-1728x1057.png | Signup final capture at design resolution |

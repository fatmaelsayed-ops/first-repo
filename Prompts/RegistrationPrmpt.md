You are helping me execute a single Gherkin scenario for the B2B Store Registration flow
Your job is to execute the supplied scenario against the Qawafel store using 'playwright-cli'
Before doing anything else:
Load and use the included 'playwright-cli' skill
Read 'Credentials/credentials.yml' for the available environment URLs, mobile numbers, country codes, OTP values, and any other credentials needed for the scenario
Use the values from the file rather than guessing URLs, accounts, or environment details
If I provide a scenario file path, read the scenario from that file. If I provide pasted scenario text instead, use that. If neither is provided, ask one short clarifying question

Follow these rules strictly:
1. Execute only the supplied scenario. Do not infer or add other scenarios
2. Use 'playwright-cli' in '--headed' mode so that the default browser is used and the browser activity is visible
3. Read the scenario carefully and follow its preconditions, actions, and expected outcomes
4. Navigate to the store registration page using the store URL from credentials.yml: store.development.qawafel.dev/kan-kan-2?login=open
5. On the login/registration page, enter a non-registered phone number into the "Mobile Number" field (the field with placeholder "5X XXX XXXX", next to the +966 country code)
6. Click the "أنشئ الحساب" (Create Account) button to submit
7. Wait for the OTP screen to appear showing "أدخل رمز التحقق" and the phone number displayed
8. Enter the OTP code from credentials.yml (store.otp or app.otp) into the 6-digit OTP input fields
9. Click the "تأكيد" (Confirm) button to verify the OTP
10. Wait for the registration form to load

Registration Form Structure (3 Steps):
STEP 1 - بيانات الشركة (Company Data / Personal & Business Info):
  - اسم الشركة (باللغة العربية) — Store Name in Arabic (min 3 chars)
  - اسم الشركة (باللغة الإنجليزية) — Store Name in English (min 3 chars)
  - نوع المتجر — Store Type (Dropdown)
  - الاسم الأول — First Name (min 3 chars)
  - الاسم الأخير — Last Name (min 3 chars)
  - البريد الإلكتروني — Email (email format validation)
  - Then "الخطوة التالية" (Next Step) or back

STEP 2 - Address Info:
  - اسم العنوان — Address Name (String)
  - الدولة — Country (Saudi Arabia dropdown, pre-selected)
  - المدينة — City (Dropdown — select "مكة المكرمة")
  - الحي — District/Neighborhood (Dropdown)
  - اسم الشارع — Street Name (min 3 chars)
  - رقم المبنى — Building Number (exactly 4 digits)
  - العنوان التفصيلي — Long/Detailed Address (String)
  - الرقم الفرعي للعنوان (اختياري) — Additional Number (Optional)
  - الرمز البريدي — ZIP Code (exactly 5 digits)
  - العنوان الوطني المختصر — Short Address (8 chars: first 4 letters + last 4 digits, e.g. RRRD2929)
  - Then "الخطوة التالية" or "الخطوة السابقة" (Previous Step)

STEP 3 - المعلومات القانونية (Legal Info):
  - الاسم القانوني للشركة (باللغة العربية) — Business Legal Name in AR (min 3 chars)
  - السجل التجاري/الرقم الموحد — CR or UNN number (exactly 10 digits) with type dropdown
  - رفع شهادة ضريبة القيمة المضافة — Upload CR certificate (PDF/PNG/JPG/JPEG, max 2MB)
  - هل النشاط التجاري خاضع للضريبة؟ — VAT toggle (Yes/No)
    - If Yes: Show VAT number field + VAT certificate upload
    - If No: Hide VAT number and certificate fields
  - Then "إنشاء الحساب" (Create Account / Submit) or "الخطوة السابقة"

Success: After submission, a popup should appear with:
"تم رفع البيانات بنجاح، يرجى الانتظار لمدة يوم عمل حتى يتم مراجعة وقبول طلب التوثيق قبل الشراء"

11. For registration scenarios, fill the form fields in order per step
12. If the scenario is ambiguous, ask one short clarifying question before proceeding
13. Store all evidence for the run under 'evidence/<scenario-id>/<timestamp>/'
14. Capture a screenshot after every meaningful step of the scenario, using a clear numbered sequence
15. Name screenshots descriptively (e.g., 01-phone-entry.png, 02-otp-screen.png, etc.)
16. Capture browser console output and errors if 'playwright-cli' exposes them
17. During execution, provide only brief milestone updates at meaningful captures
18. If the scenario passes, summarise what happened and list the evidence captured in folder B2B evidence
19. If the scenario fails, stop cleanly at the failure point, capture the final state, and summarise the observed failure
20. Do not create bug reports or GitHub issues unless explicitly asked
21. Do not perform destructive or risky actions beyond what the scenario clearly requires
22. If the application behaves unexpectedly, report exactly what you observed

Test Data for Registration:
  Phone: "540000008" (non-registered number)
  OTP: "201111"
  Store Name AR: "شركة تجريبية"
  Store Name EN: "Test Company"
  First Name: "محمد"
  Last Name: "أحمد"
  Email: "testmerchant@example.com"
  Address Name: "المكتب الرئيسي"
  Country: "المملكة العربية السعودية"
  City: "مكة المكرمة"
  Street: "شارع الملك فهد"
  Building Number: "8118"
  Long Address: "المنطقة التجارية"
  Additional Number: "1118" (optional)
  ZIP Code: "21955"
  Short Address: "RRRD2929"
  Legal Name: "شركة تجريبية للتجارة"
  CR Type: First option in dropdown
  CR Number: "1234567890"
  VAT Number: "300000000000003"

Execution style:
Be precise, reversible actions
Separate what the scenario expected from what the application actually did
Treat screenshots as evidence, not decoration
Keep the browser visible throughout the run
Use the credentials and URLs from 'Credentials/credentials.yml' as the source of truth
Prefer scenario file input when a file path is provided; otherwise use pasted scenario text
Give a full summary at the end, even if brief updates were given during execution

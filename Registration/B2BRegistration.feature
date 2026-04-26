@store @registration @b2b
Feature: B2B store registration
  As a new B2B merchant
  I want to register through the store onboarding flow
  So that I can submit my company details for approval

  Background:
    Given I open the store registration entry at "https://store.development.qawafel.dev/kan-kan-2?login=open"
    And the registration flow uses these credentials data:
      | key                            | value                    |
      | store.mobile                   | 540000008                |
      | store.country_code             | +966                     |
      | store.otp                      | 201111                   |
      | registration.store_name_ar     | شركة تجريبية            |
      | registration.store_name_en     | Test Company             |
      | registration.first_name        | محمد                     |
      | registration.last_name         | أحمد                     |
      | registration.email             | testmerchant@example.com |
      | registration.address_name      | المكتب الرئيسي           |
      | registration.country           | المملكة العربية السعودية |
      | registration.city              | مكة المكرمة              |
      | registration.street            | شارع الملك فهد           |
      | registration.building_number   | 8118                     |
      | registration.long_address      | المنطقة التجارية         |
      | registration.additional_number | 1118                     |
      | registration.zip_code          | 21955                    |
      | registration.short_address     | RRRD2929                 |
      | registration.legal_name        | شركة تجريبية للتجارة    |
      | registration.cr_number         | 1234567890               |
      | registration.vat_number        | 300000000000003          |

  @positive @smoke @otp
  Scenario: Submit a new mobile number and move to OTP verification
    When I enter the non-registered mobile number "540000008"
    And I click the "أنشئ الحساب" button
    Then I should see the OTP verification screen
    And the heading should be "أدخل رمز التحقق"
    And the submitted phone number should be displayed with country code "+966"
    And the confirmation button "إنشاء حساب" should be visible

  @positive @otp
  Scenario: Verify OTP and open the registration wizard
    Given I have submitted the mobile number "540000008" from the registration entry screen
    When I enter the OTP code "201111"
    And I click the "إنشاء حساب" button
    Then I should land on the registration wizard
    And the first step should be "بيانات الشركة"
    And the step indicator should show "الخطوة 1 من 2"

  @negative @otp
  Scenario: Show validation when OTP is incorrect or expired
    Given I have submitted the mobile number "540000008" from the registration entry screen
    When I enter an invalid or expired OTP code
    And I click the "إنشاء حساب" button
    Then I should remain on the OTP screen
    And I should see an OTP error message

  @positive @otp
  Scenario: Return from OTP screen to edit the mobile number
    Given I am on the OTP verification screen for mobile number "540000008"
    When I click the edit phone action
    Then I should return to the mobile number entry screen
    And the mobile input should be visible again

  @positive @wizard @company-step
  Scenario: Company data step shows the current two-step structure
    Given I have verified OTP and opened the registration wizard
    Then I should see a right-side progress area with these steps:
      | step | label              |
      | 1    | بيانات الشركة       |
      | 2    | المعلومات القانونية |
    And "بيانات الشركة" should be marked as the active step
    And the page heading should be "بيانات الشركة"

  @positive @wizard @company-step
  Scenario: Company data step contains all required fields
    Given I have verified OTP and opened the registration wizard
    Then I should see these fields on the company data step:
      | field label                    | type     |
      | اسم الشركة (باللغة العربية)    | text     |
      | اسم الشركة (باللغة الانجليزية) | text     |
      | نوع المتجر                     | dropdown |
      | الاسم الأول                    | text     |
      | الاسم الأخير                   | text     |
      | البريد الإلكتروني              | text     |
      | اسم العنوان                    | text     |
      | الدولة                         | dropdown |
      | العنوان التفصيلي               | text     |
      | المدينة                        | dropdown |
      | الحي                           | dropdown |
      | اسم الشارع                     | text     |
      | رقم المبنى                     | text     |
      | الرقم الفرعي                   | text     |
      | الرمز البريدي                  | text     |
      | الرقم الوطني المختصر           | text     |
    And I should see the "الخطوة التالية" button
    And I should see the "الخطوة السابقة" button disabled or hidden on the first step

  @positive @wizard @company-step
  Scenario: Move from company data step to legal information step with valid data
    Given I have verified OTP and opened the registration wizard
    When I complete the company data step with valid registration data
    And I click the "الخطوة التالية" button
    Then I should move to the legal information step
    And the step indicator should show "الخطوة 2 من 2"
    And "المعلومات القانونية" should be marked as the active step

  @negative @wizard @company-step
  Scenario: Required validation appears when company data step is submitted empty
    Given I have verified OTP and opened the registration wizard
    When I leave all required fields empty on the company data step
    And I click the "الخطوة التالية" button
    Then I should see validation messages for the required fields
    And I should remain on the "بيانات الشركة" step

  @negative @wizard @company-step
  Scenario Outline: Company data step rejects invalid field formats
    Given I have verified OTP and opened the registration wizard
    And I complete the company data step with otherwise valid registration data
    When I replace <field> with <invalid_value>
    And I click the "الخطوة التالية" button
    Then I should remain on the "بيانات الشركة" step
    And I should see the validation message for <field>

    Examples:
      | field                            | invalid_value   |
      | "الاسم الأول"                   | "مح"           |
      | "الاسم الأخير"                  | "أح"           |
      | "البريد الإلكتروني"             | "invalid-email" |
      | "اسم الشركة (باللغة العربية)"   | "شر"           |
      | "اسم الشركة (باللغة الانجليزية)" | "Te"          |
      | "اسم الشارع"                    | "شا"           |
      | "رقم المبنى"                    | "123"          |
      | "رقم المبنى"                    | "12A4"         |
      | "الرمز البريدي"                 | "2195"         |
      | "الرمز البريدي"                 | "ABCDE"        |
      | "الرقم الوطني المختصر"          | "RRR1"         |
      | "الرقم الوطني المختصر"          | "1234ABCD"     |

  @negative @wizard @company-step
  Scenario: Company data step requires dropdown selections
    Given I have verified OTP and opened the registration wizard
    When I fill all text inputs on the company data step with valid data
    And I do not select the required dropdown values
    And I click the "الخطوة التالية" button
    Then I should see validation for the missing dropdown selections
    And I should remain on the "بيانات الشركة" step

  @positive @wizard @company-step
  Scenario: Previously entered company data is preserved after moving back from legal information
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    When I click the "الخطوة السابقة" button
    Then I should return to the "بيانات الشركة" step
    And the previously entered company and address values should remain populated

  @positive @wizard @legal-step
  Scenario: Legal information step shows the required fields when VAT is off
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    Then I should see these fields on the legal information step:
      | field label                            | type     |
      | الاسم القانوني للشركة (باللغة العربية) | text     |
      | السجل التجاري/الرقم الموحد             | text     |
      | نوع السجل التجاري/الرقم الموحد         | dropdown |
      | رفع السجل التجاري                      | upload   |
      | هل النشاط التجاري خاضع للضريبة؟       | toggle   |
    And the VAT number field should be hidden by default
    And the VAT certificate upload should be hidden by default

  @positive @wizard @legal-step
  Scenario: Toggle VAT on to reveal VAT inputs
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    When I switch the VAT toggle on
    Then the VAT number field should be visible
    And the VAT certificate upload area should be visible

  @positive @wizard @legal-step
  Scenario: Complete registration successfully without VAT
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    When I fill the legal information step with valid data
    And I upload a valid CR certificate file
    And I keep the VAT toggle off
    And I click the "إنشاء الحساب" button
    Then I should see the registration review popup
    And the popup should communicate that the request is under review within 24 hours or one working day

  @positive @wizard @legal-step
  Scenario: Complete registration successfully with VAT enabled
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    When I fill the legal information step with valid data
    And I upload a valid CR certificate file
    And I switch the VAT toggle on
    And I enter the VAT number "300000000000003"
    And I upload a valid VAT certificate file
    And I click the "إنشاء الحساب" button
    Then I should see the registration review popup
    And the popup should communicate that the request is under review within 24 hours or one working day

  @negative @wizard @legal-step
  Scenario Outline: Legal information step rejects invalid business identifiers
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    And I fill the legal information step with otherwise valid data
    When I replace <field> with <invalid_value>
    And I click the "إنشاء الحساب" button
    Then I should remain on the "المعلومات القانونية" step
    And I should see the validation message for <field>

    Examples:
      | field                                      | invalid_value |
      | "الاسم القانوني للشركة (باللغة العربية)" | "شر"         |
      | "السجل التجاري/الرقم الموحد"             | "123456789"  |
      | "السجل التجاري/الرقم الموحد"             | "12345ABCDE" |

  @negative @wizard @legal-step
  Scenario: Legal information step requires CR type selection
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    When I fill all legal text inputs with valid data
    And I do not select a CR type
    And I click the "إنشاء الحساب" button
    Then I should see validation for the missing CR type

  @negative @wizard @legal-step
  Scenario: Legal information step requires a CR certificate upload
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    When I fill all legal fields with valid data
    And I do not upload a CR certificate file
    And I click the "إنشاء الحساب" button
    Then I should see validation that the CR certificate is required

  @negative @wizard @legal-step
  Scenario: Legal information step rejects unsupported CR certificate formats
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    When I upload an unsupported CR certificate file format
    Then I should see an unsupported format message
    And only PDF, PNG, JPG, or JPEG should be accepted

  @negative @wizard @legal-step
  Scenario: Legal information step rejects CR certificate files larger than the allowed size
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    When I upload a CR certificate file larger than the maximum allowed size
    Then I should see a file size validation message

  @negative @wizard @legal-step
  Scenario: VAT number and VAT certificate become required when VAT is enabled
    Given I have completed the company data step with valid registration data
    And I am on the legal information step
    When I fill the legal information step with valid non-VAT data
    And I switch the VAT toggle on
    And I click the "إنشاء الحساب" button
    Then I should see validation for the VAT number
    And I should see validation for the VAT certificate upload

  @positive @e2e
  Scenario: Complete the full B2B registration flow end to end without VAT
    When I register a new store merchant using valid registration data and VAT disabled
    Then I should see the registration review popup
    And the final state should match a submitted request awaiting review

  @positive @e2e
  Scenario: Complete the full B2B registration flow end to end with VAT
    When I register a new store merchant using valid registration data and VAT enabled
    Then I should see the registration review popup
    And the final state should match a submitted request awaiting review
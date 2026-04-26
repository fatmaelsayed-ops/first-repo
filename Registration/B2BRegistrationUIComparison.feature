@ui @registration @comparison
Feature: B2B registration UI comparison against approved reference screens
  As a tester
  I want to compare the implemented registration experience with the attached reference screens
  So that layout, content, and step structure regressions are visible

  Background:
    Given I open the store registration entry at "https://store.development.qawafel.dev/kan-kan-2?login=open"
    And the approved reference screens cover these states:
      | state                  | reference expectation |
      | registration entry     | split layout with left illustration and right registration form |
      | otp verification       | split layout with OTP title, six-digit entry area, and primary confirm button |
      | company data step      | step 1 of 2 with company and address inputs in a wide modal panel |
      | legal information step | step 2 of 2 with upload zones and VAT toggle |
      | submission review popup| centered success-review dialog over the storefront |

  @positive @ui @comparison
  Scenario: Compare the implemented registration screens against the attached reference set
    When I view the registration entry screen
    Then the page should keep the same two-panel RTL layout as the approved reference
    And the right panel should show the Qawafel logo, language selector, phone field, and the "أنشئ الحساب" button
    And the left panel should show the dark branded illustration area and Arabic tagline
    When I submit a valid mobile number and move to OTP verification
    Then the OTP screen should preserve the same split layout and brand placement as the approved reference
    And I should see the title "أدخل رمز التحقق"
    And I should see a six-digit OTP entry pattern and the "تأكيد" button
    When I verify OTP with valid data
    Then the company data step should open as step 1 of 2
    And the visible fields and button placement should match the approved company data reference screen
    When I complete the company data step with valid data
    Then the legal information step should open as step 2 of 2
    And the upload areas, VAT toggle, and action buttons should match the approved legal information reference screen
    When I submit the registration with valid legal information
    Then the final review popup should match the approved reference intent
    And the implemented UI should not show unexpected missing elements, broken alignment, or incorrect step count

  @negative @ui @comparison
  Scenario: Flag a UI mismatch when implementation deviates from the attached reference screens
    When I compare each implemented registration state with its attached reference screen
    Then I should record a UI discrepancy if any of these differences appear:
      | difference type |
      | missing logo or branding |
      | missing or renamed primary button |
      | wrong step count or wrong step titles |
      | required field missing from company data step |
      | required upload area missing from legal information step |
      | popup content missing or materially different from the reference |
      | major spacing, alignment, or overflow issue |
    And the discrepancy should be saved under the UI comparison evidence folder
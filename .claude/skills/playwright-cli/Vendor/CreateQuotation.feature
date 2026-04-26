@vendor     - targets the vendor dashboard (app.development.qawafel.dev)
@quotation  - quotation management flows
@sell       - sell module features


How tags are used:
- Humans can filter scenarios by tag when deciding what to test ("run all @smoke")
- AI agents can be instructed to "execute all @vendor @quotation scenarios"
- Tags have no runtime effect — they are metadata for people and agents


@vendor @quotation @sell
Feature: Create Quotation
  As a vendor user
  I want to create a new quotation from the vendor dashboard
  So that I can send price quotes to buyers

  Background:
    Given I am logged in to the vendor app at "app.development.qawafel.dev"
    And I select "vendor kan kan Riyadh" from the vendor dropdown on the homepage
    And I navigate to the "Sell" tab in the sidebar
    And I click on "Quotations" in the sell menu
    And I click the "Add Quotation" button
    Then I should see the "Add Quotation" form

  # ==========================================
  # POSITIVE TEST CASES
  # ==========================================

  @smoke @positive
  Scenario: Successfully create a quotation with all required fields
    Given I can see the "Quotation By" section with pre-filled vendor company info
    And I can see "Qawafel Marketing Company" as the company name
    When I select a buyer from the "Legal Company Name" dropdown under "Quotation To"
    And I verify the "Issue Date" field shows today's date
    And I select a payment term from the "Payment Term" dropdown
    And I search and select a product from the "Products" section
    Then the "Quotation Summary" should update with calculated amounts
    And I should see non-zero values for "Total gross amount"
    And I should see the "Net payable amount" updated
    When I click the "Add Quotation" button
    Then the quotation should be created successfully
    And I should see a success confirmation message

  @positive
  Scenario: Successfully create a quotation with all fields filled including optional
    Given I can see the "Quotation By" section with pre-filled vendor company info
    When I select a buyer from the "Legal Company Name" dropdown under "Quotation To"
    And I verify the "Issue Date" field shows today's date
    And I select a payment term from the "Payment Term" dropdown
    And I select a purchase order from the "Purchase Order Number" dropdown
    And I enter a reference number in the "Reference Number" field
    And I search and select a product from the "Products" section
    And I enter notes in the "Notes/Memo" textarea under "Additional Information"
    And I upload a valid file (PDF/PNG/JPEG/JPG) under "Attach Files To Quotation"
    When I click the "Add Quotation" button
    Then the quotation should be created successfully
    And I should see a success confirmation message

  @positive
  Scenario: Successfully save a quotation as draft
    Given I can see the "Quotation By" section with pre-filled vendor company info
    When I select a buyer from the "Legal Company Name" dropdown under "Quotation To"
    And I select a payment term from the "Payment Term" dropdown
    And I search and select a product from the "Products" section
    When I click the "Save As Draft" button
    Then the quotation should be saved as draft successfully
    And I should see a success confirmation message

  @positive
  Scenario: Save quotation as draft with only partial data
    Given I can see the "Add Quotation" form
    When I select a buyer from the "Legal Company Name" dropdown under "Quotation To"
    And I click the "Save As Draft" button
    Then the quotation should be saved as draft successfully

  @positive
  Scenario: Successfully create a quotation with multiple products
    Given I can see the "Add Quotation" form
    When I select a buyer from the "Legal Company Name" dropdown under "Quotation To"
    And I select a payment term from the "Payment Term" dropdown
    And I search and select the first product from the "Products" section
    And I search and select a second product from the "Products" section
    Then the "Quotation Summary" should update with the combined amounts
    And the "Net payable amount" should reflect the total of both products
    When I click the "Add Quotation" button
    Then the quotation should be created successfully

  @positive
  Scenario: Verify Quotation By section displays correct vendor information
    Then I should see the "Quotation By" section
    And I should see "Qawafel Marketing Company" as the company name
    And I should see "CR Number" as "1155665566"
    And I should see "Email Address" as "aymansamir1312@gmail.com"
    And I should see "Phone Number" as "555107447"
    And I should see "Tax number" as "7878"
    And I should see "Address" as "Saudi Arabia , Ad Diriyah"

  @positive
  Scenario: Verify Issue Date defaults to today's date
    Then the "Issue Date" field should display today's date in "YYYY-MM-DD" format

  @positive
  Scenario: Change the Issue Date to a future date
    When I click the "Issue Date" date picker
    And I select a future date
    Then the "Issue Date" field should display the selected future date

  @positive
  Scenario: Verify Quotation Summary updates when a product is added
    When I search and select a product from the "Products" section
    Then the "Total gross amount" should be greater than 0
    And the "Total amount (Excluding VAT)" should be calculated correctly
    And the "VAT amount" should be calculated correctly
    And the "Total invoice amount" should be calculated correctly
    And the "Net payable amount" should equal the "Total invoice amount"

  @positive
  Scenario: Browse products using the Browse Products button
    When I click the "Browse Products" button in the "Products" section
    Then I should see a product browsing dialog or panel
    And I should be able to select a product from the list
    Then the selected product should be added to the quotation

  @positive
  Scenario: Search for a product using the search field
    When I type a product name in the "Search Product" field
    Then I should see search results matching the query
    When I select a product from the search results
    Then the product should be added to the quotation
    And the "Quotation Summary" should update accordingly

  @positive
  Scenario: Upload a valid PDF file as an attachment
    When I upload a PDF file under "Attach Files To Quotation"
    Then the file should be uploaded successfully
    And I should see the uploaded file name displayed

  @positive
  Scenario: Upload a valid PNG image as an attachment
    When I upload a PNG image under "Attach Files To Quotation"
    Then the image should be uploaded successfully
    And I should see the uploaded file name displayed

  @positive
  Scenario: Enter notes in the Notes/Memo field
    When I enter "This is a test quotation memo" in the "Notes/Memo" textarea
    Then the text should be accepted and displayed in the field

  @positive
  Scenario: Verify Payment Term dropdown options are available
    When I click the "Payment Term" dropdown
    Then I should see a list of available payment terms
    And I should be able to select a payment term

  @positive
  Scenario: Verify Legal Company Name dropdown lists available buyers
    When I click the "Legal Company Name" dropdown under "Quotation To"
    Then I should see a list of available buyers
    And I should be able to select a buyer

  # ==========================================
  # NEGATIVE TEST CASES
  # ==========================================

  @negative
  Scenario: Submit quotation without selecting a buyer
    Given I can see the "Add Quotation" form
    When I select a payment term from the "Payment Term" dropdown
    And I search and select a product from the "Products" section
    But I do not select a buyer from "Legal Company Name"
    And I click the "Add Quotation" button
    Then I should see a validation error for the "Legal Company Name" field
    And the quotation should not be created

  @negative
  Scenario: Submit quotation without selecting a payment term
    Given I can see the "Add Quotation" form
    When I select a buyer from the "Legal Company Name" dropdown under "Quotation To"
    And I search and select a product from the "Products" section
    But I leave the "Payment Term" dropdown as "Please Select Payment Term"
    And I click the "Add Quotation" button
    Then I should see a validation error for the "Payment Term" field
    And the quotation should not be created

  @negative
  Scenario: Submit quotation without selecting any product
    Given I can see the "Add Quotation" form
    When I select a buyer from the "Legal Company Name" dropdown under "Quotation To"
    And I select a payment term from the "Payment Term" dropdown
    But I do not select any product
    And I click the "Add Quotation" button
    Then I should see a validation error message "Select at least one product"
    And the quotation should not be created

  @negative
  Scenario: Submit quotation with all required fields empty
    Given I can see the "Add Quotation" form
    When I do not fill in any fields
    And I click the "Add Quotation" button
    Then I should see validation error messages for all required fields
    And I should see an error for "Legal Company Name"
    And I should see an error for "Payment Term"
    And I should see an error for "Products" showing "Select at least one product"
    And the quotation should not be created

  @negative
  Scenario: Set Issue Date to a past date
    When I click the "Issue Date" date picker
    And I select a date in the past
    Then the system should prevent selecting a past date
    Or I should see a validation error for the "Issue Date" field

  @negative
  Scenario: Upload a file with unsupported format
    When I try to upload a file with an unsupported format (e.g., .exe, .txt, .docx) under "Attach Files To Quotation"
    Then the file should not be uploaded
    And I should see an error message indicating only PDF, PNG, JPEG, and JPG are accepted

  @negative
  Scenario: Upload a file exceeding the maximum allowed size
    When I try to upload an image larger than 800x400px under "Attach Files To Quotation"
    Then the file should not be uploaded or I should see a size/dimension error

  @negative
  Scenario: Search for a non-existent product
    When I type "XYZNONEXISTENTPRODUCT12345" in the "Search Product" field
    Then I should see no search results or a "no products found" message

  @negative
  Scenario: Verify Quotation Summary shows zero when no product is selected
    Then the "Total gross amount" should be "0"
    And the "Discount amount" should be "0"
    And the "Total amount (Excluding VAT)" should be "0"
    And the "VAT amount" should be "0"
    And the "Total invoice amount" should be "0"
    And the "Net payable amount" should be "0"

  @negative
  Scenario: Remove a selected product and verify summary resets
    When I search and select a product from the "Products" section
    Then the "Quotation Summary" should update with calculated amounts
    When I remove the selected product from the quotation
    Then the "Total gross amount" should be "0"
    And the "Net payable amount" should be "0"

  @negative
  Scenario: Enter special characters in the Reference Number field
    When I enter "<script>alert('xss')</script>" in the "Reference Number" field
    Then the input should be sanitized or rejected
    And no script should execute on the page

  @negative
  Scenario: Enter very long text in the Notes/Memo field
    When I enter a string of 5000 characters in the "Notes/Memo" textarea
    Then the field should either accept the text or show a maximum character limit error

  @negative
  Scenario: Enter very long text in Reference Number field
    When I enter a string of 500 characters in the "Reference Number" field
    Then the field should either truncate the input or show a maximum length error

  # ==========================================
  # NAVIGATION / UI VERIFICATION
  # ==========================================

  @positive @navigation
  Scenario: Verify navigation to Add Quotation form
    # This scenario verifies the full navigation path without the Background
    Given I am logged in to the vendor app at "app.development.qawafel.dev"
    And I select "vendor kan kan Riyadh" from the vendor dropdown on the homepage
    When I navigate to the "Sell" tab in the sidebar
    And I click on "Quotations" in the sell menu
    Then I should see the quotations list page
    When I click the "Add Quotation" button
    Then I should see the "Add Quotation" form
    And I should see the "Quotation By" section
    And I should see the "Quotation To" section
    And I should see the "Quotation Information" section
    And I should see the "Products" section
    And I should see the "Quotation Summary" section
    And I should see the "Additional Information" section
    And I should see the "Save As Draft" button
    And I should see the "Add Quotation" submit button

  @positive @navigation
  Scenario: Verify all form sections are visible on Add Quotation page
    Then I should see the following sections on the form:
      | Section                |
      | Quotation By           |
      | Quotation To           |
      | Quotation Information  |
      | Products               |
      | Quotation Summary      |
      | Additional Information |

 

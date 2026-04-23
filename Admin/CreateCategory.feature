@admin @category @smoke
Feature: Create New Category
  As an admin user
  I want to create a new category from the admin dashboard
  So that I can organize products under appropriate categories

  Background:
    Given I am logged in to the admin dashboard at "admin.development.qawafel.dev"

  Scenario: Successfully create a new category with valid data
    Given I am on the categories page
    When I click the "New category" button
    Then I should see the "Create new category" form
    And I should see the "Category info" section
    And I should see the "Status" toggle is enabled by default
    And I should see the "Name (arabic)" field
    And I should see the "Name (english)" field
    And I should see the "Parent category" dropdown
    And I should see the "Priority" field
    And I should see the "Entity types" radio buttons with "All Entity" selected by default
    And I should see the "Images" upload area accepting "*.jpeg and *.png"
    When I enter the category name in arabic from credentials in the "Name (arabic)" field
    And I enter the category name in english from credentials in the "Name (english)" field
    And I select a parent category from the "Parent category" dropdown if provided in credentials
    And I enter the priority value from credentials in the "Priority" field
    And I select the entity type from credentials under "Entity types"
    And I upload an image if provided in credentials
    And I click the "Create" button
    Then the category should be created successfully
    And I should see a success confirmation message

  Scenario: Verify required field validation when creating a category
    Given I am on the categories page
    When I click the "New category" button
    Then I should see the "Create new category" form
    When I leave all fields empty
    And I click the "Create" button
    Then I should see validation error messages for required fields

  Scenario: Verify Status toggle functionality
    Given I am on the categories page
    When I click the "New category" button
    Then I should see the "Create new category" form
    And the "Status" toggle should be enabled by default
    When I click the "Status" toggle to disable it
    Then the "Status" toggle should be disabled
    When I click the "Status" toggle to enable it again
    Then the "Status" toggle should be enabled

  Scenario: Verify image upload accepts only jpeg and png formats
    Given I am on the categories page
    When I click the "New category" button
    Then I should see the "Create new category" form
    And the "Images" upload area should display "Only *.jpeg and *.png images will be accepted"

  Scenario: Verify Entity types selection
    Given I am on the categories page
    When I click the "New category" button
    Then I should see the "Create new category" form
    And "All Entity" should be selected by default under "Entity types"
    When I select "Select specific entity" under "Entity types"
    Then I should see options to choose specific entity types

@admin     - targets the admin dashboard (admin.development.qawafel.dev)
@auth      - authentication / login flows
@smoke     - critical happ-path; run first to confirm the environment is alive 


How tags are used:
- Humans can filter scenarios by tag when deciding what to test ("run all @smoke")
- AI agents can be instructed to "execute all @admin @negative scenario"
- Tags have nio runtime effect - they are metadata for people and agents 


@admin @auth @smoke 
Feature  Admin Dashboard login 
As an admin use 
I want to log in to the Qawafel admin dashboard 
So that I can mange the platform 
Scenario:Succesful login with valid credentials
Given I am on the admin login page at "admin.development.qawafel.dev/login"
And I can see the Qawafel logo and the haeding "Welcome to Qawafel admin dashboard"
when I enter "user@qawafel.sa" in the "Email" field 
And I enter "valid password" in the "Password" field 
And I click the "login" button 
Then I should be redirected to the orders page at "/orders/list"
And the page title should contain "orders"
And I should see the main navigation sidebar

  @admin @auth @negative
 Scenario: Failed login with invalid credentials
 Given I am on the admin login page at "admin.development.qawafel.dev/login"
 When I enter "invalid@qawafel.sa" in the "Email" field
 And I enter "wrongpassword" in the "Password" field
 And I click the "login" button
 Then I should remain on the login page
 And I should see an error message "Invalid email or password"

 @admin @smoke
 Feature: Admin dashboard logout and relogin
 As an admin i want to logout from current user and login with another user
 Given admin current user name appears on the sidebar
 when i click on logout icon
 then i should be on the login page
 and i enter the new user credentials in the email , password fields
 when i enter "ahmed@qawafel.sa" , "Ahmed@12345"
 Then the system show a validation message "credentials are not correct"


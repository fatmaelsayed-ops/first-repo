@vendor     - targets the vendor dashboard (app.development.qawafel.dev)
@auth      - authentication / login flows
@smoke     - critical happ-path; run first to confirm the environment is alive 


How tags are used:
- Humans can filter scenarios by tag when deciding what to test ("run all @smoke")
- AI agents can be instructed to "execute all @admin @negative scenario"
- Tags have nio runtime effect - they are metadata for people and agents 


@vendor @auth @smoke 
Feature  Admin Dashboard login 
As an admin use 
I want to log in to the Qawafel vendor dashboard 
So that I can mange the platform 
Scenario:Succesful login with valid credentials
Given I am on the admin login page at "APP.development.qawafel.dev/login"
And I can see the Qawafel logo and the haeding "Welcome ,vendor name"
when I enter "a540000007" in the "Mobile Number" field 
And I click the "login" button
And I enter "valid otp" in the "otp" field 
 And I click the "continue" button
Then I should be redirected to the orders page at "/orders/list"
And the page title should contain "orders"
And I should see the main navigation sidebar
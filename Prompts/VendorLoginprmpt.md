You are helping me execute a single Gherkin scenario
Your job is to execute the supplied scenario against the appropriate Qawafel development system using 'playwright-cli'
Before doing anything else:
Load and use the included 'playwright-cli' skill
Read 'Credentials/credentials.yml' for the available environment URLs, mobile numbers, country codes, OTP values, and any other credentials needed for the scenario
Use the values from the file rather than guessing URLs, accounts, or environment details
If I provide a scenario file path, read the scenario from that file. If I provide pasted scenario text instead, use that. If neither is provided, ask one short clarifying question

Follow these rules strictly:
1. Execute only the supplied scenario. Do not infer or add other scenarios
2. Use 'playwright-cli' in '--headed' mode so that the default browser is used and the browser activity is visible, do not proceed
3. Read the scenario carefully and follow its preconditions, actions, and expected outcomes
4. Navigate to the vendor app login page using the app URL from credentials.yml
5. On the login page, enter the mobile number from credentials.yml (app.mobile) into the "Mobile Number" field (the field with placeholder "5xxxxxxxxx", next to the +966 country code)
6. Click the "Login" button to submit the phone number
7. Wait for the OTP screen to appear showing "OTP sent to your mobile number" and the phone number displayed
8. Enter the OTP code from credentials.yml (app.otp) into the 6-digit OTP input fields
9. Click the "Continue" button to verify the OTP
10. Wait for the welcome/home page to load and verify the user is logged in by checking for the welcome message (e.g. "Welcome, <vendor name>")
11. If the scenario is ambiguous, ask one short clarifying question before proceeding
12. Store all evidence for the run under 'evidence/<scenario-id>/<timestamp>/'
13. Capture a screenshot after every meaningful step of the scenario, using a clear numbered sequence so the evidence is complete even if the scenario fails part-way through
14. Name screenshots with console output and errors if 'playwright-cli' exposes them, and include that information in the execution summary
15. Capture browser console output and errors if 'playwright-cli' exposes them, and include that information in the execution summary
16. During execution, provide only brief milestone updates at meaningful captures
17. If the scenario passes, summarise what happened and list the evidence captured
18. If the scenario fails, stop cleanly at the failure point, capture the final state, and summarise the observed failure without inventing missing details
19. Do not create bug reports or GitHub issues unless I explicitly ask you to do that
20. Do not perform destructive or risky actions beyond what the scenario clearly requires
21. If the application behaves unexpectedly, report exactly what you observed

Execution style:
Be precise, reversible actions
Separate what the scenario expected from what the application actually did
Treat screenshots as evidence, not decoration
Keep the browser visible throughout the run
Use the credentials and URLs from 'Credentials/credentials.yml' as the source of truth
Prefer scenario file input when a file path is provided; otherwise use pasted scenario text
Give a full summary at the end, even if brief updates were given during execution

You are helping me execute a single Gherkin scenario
Your job is to execute the supplied scenario against the appropriate Qawafel development system using 'playwright-cli'
Before doing anything else:
Load and use the included 'playwright-cli' skill
Read 'Credentials/credentials.yml' for the available environment URLs, Usernames, Passwords, category data, and any other credentials needed for the scenario
Use the values from the file rather than guessing URLs, accounts, or environment details
If I provide a scenario file path, read the scenario from that file. If I provide pasted scenario text instead, use that. If neither is provided, ask one short clarifying question

Follow these rules strictly:
1. Execute only the supplied scenario. Do not infer or add other scenarios
2. Use 'playwright-cli' in '--headed' mode so that the default browser is used and the browser activity is visible, do not proceed
3. Read the scenario carefully and follow its preconditions, actions, and expected outcomes
4. The user must first log in to the admin dashboard using admin credentials from credentials.yml
5. Navigate to the categories page and click the "New category" button to open the create new category form
6. Fill in the category form fields using data from the "category" section in credentials.yml:
   - Name (arabic): use category.name_arabic
   - Name (english): use category.name_english
   - Parent category: use category.parent_category (skip if empty)
   - Priority: use category.priority
   - Entity types: use category.entity_type
   - Status: ensure it matches category.status
   - Images: upload category.image if provided
7. Click the "Create" button to submit the form
8. If the scenario is ambiguous, ask one short clarifying question before proceeding
9. Store all evidence for the run under 'evidence/<scenario-id>/<timestamp>/'
10. Capture a screenshot after every meaningful step of the scenario, using a clear numbered sequence so the evidence is complete even if the scenario fails part-way through
11. Name screenshots with console output and errors if 'playwright-cli' exposes them, and include that information in the execution summary
12. Capture browser console output and errors if 'playwright-cli' exposes them, and include that information in the execution summary
13. During execution, provide only brief milestone updates at meaningful captures
14. If the scenario passes, summarise what happened and list the evidence captured
15. If the scenario fails, stop cleanly at the failure point, capture the final state, and summarise the observed failure without inventing missing details
16. Do not create bug reports or GitHub issues unless I explicitly ask you to do that
17. Do not perform destructive or risky actions beyond what the scenario clearly requires
18. If the application behaves unexpectedly, report exactly what you observed

Execution style:
Be precise, reversible actions
Separate what the scenario expected from what the application actually did
Treat screenshots as evidence, not decoration
Keep the browser visible throughout the run
Use the credentials and URLs from 'Credentials/credentials.yml' as the source of truth
Prefer scenario file input when a file path is provided; otherwise use pasted scenario text
Give a full summary at the end, even if brief updates were given during execution

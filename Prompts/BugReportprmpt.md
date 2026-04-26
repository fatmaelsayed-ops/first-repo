You are helping me create a structured bug report based on a failed Gherkin scenario execution.
Your job is to analyse the execution evidence and produce a clear, actionable bug report.

Before doing anything else:
Read the evidence folder for the failed scenario run (I will provide the path or scenario name)
Read the original Gherkin scenario file to understand the expected behaviour
Read 'Credentials/credentials.yml' for environment details

Follow these rules strictly:

1. Generate the bug report using the following standard structure:

   ## Bug Report

   **Bug ID:** BUG-<sequential-number>
   **Title:** <concise one-line summary of the defect>
   **Reported Date:** <current date in YYYY-MM-DD format>
   **Reporter:** Automated Test Execution
   **Environment:** <URL and environment name from credentials.yml>

   ### Severity & Priority
   - **Severity:** <Critical | Major | Minor | Trivial>
   - **Priority:** <High | Medium | Low>

   ### Related Scenario
   - **Feature file:** <path to the .feature file>
   - **Scenario name:** <exact scenario name from the feature file>
   - **Tags:** <scenario tags e.g. @admin @smoke>

   ### Preconditions
   <List any preconditions from the scenario's Given steps and test setup>

   ### Steps to Reproduce
   <Numbered list derived directly from the scenario steps, mapped to actual actions performed>

   ### Expected Result
   <What the scenario's Then steps defined as the expected outcome>

   ### Actual Result
   <What actually happened during execution, based strictly on evidence — do not invent details>

   ### Evidence
   - **Screenshots:** <list of screenshot file paths from the evidence folder, in execution order>
   - **Console errors:** <any browser console errors captured during execution>
   - **Failure step:** <the exact step where the scenario diverged from expected behaviour>

   ### Additional Notes
   <Any relevant observations, e.g. intermittent behaviour, environment issues, partial passes>

2. Derive all information from the execution evidence and the scenario file — do not guess or fabricate details
3. If evidence is incomplete, note what is missing rather than inventing it
4. Severity guidelines:
   - Critical: application crash, data loss, security issue, complete feature blockage
   - Major: feature not working as specified but workaround may exist
   - Minor: cosmetic issue, minor deviation from expected behaviour
   - Trivial: typo, alignment, negligible UI issue
5. Keep the title short but specific — include the affected feature and the nature of the failure
6. If multiple bugs are found in a single scenario run, create separate bug reports for each distinct defect
7. Save the bug report as a Markdown file under 'evidence/<scenario-id>/<timestamp>/bug-report.md'
8. After generating the report, provide a brief summary of the bug to the user

GitHub Issue Creation:
After saving the local bug report, create a GitHub issue on the repository 'qawafel/quality-onboarding' using the GitHub CLI ('gh'):

1. Verify the GitHub CLI is authenticated by running: gh auth status
2. If not authenticated, ask the user to run 'gh auth login' first and stop
3. Map the bug severity to a GitHub label:
   - Critical → labels: "bug", "critical"
   - Major → labels: "bug", "major"
   - Minor → labels: "bug", "minor"
   - Trivial → labels: "bug", "trivial"
4. Create the issue using this command structure:
   gh issue create --repo qawafel/quality-onboarding --title "<Bug Title>" --body "<full bug report markdown content>" --label "bug,<severity>"
5. If screenshot evidence exists, note the local evidence paths in the issue body under the Evidence section — GitHub CLI does not support file attachments, so mention that screenshots are available locally
6. After the issue is created, capture the returned issue URL and display it to the user
7. If issue creation fails, report the error and confirm the local bug report was still saved successfully

Output style:
Be factual — separate observation from interpretation
Reference screenshots by their file paths as evidence
Map each step to reproduce back to the original Gherkin step
Use the exact wording from the scenario for expected results
Use the exact observations from evidence for actual results

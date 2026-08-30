# AI_USAGE.md

## Tools Used
* **Primary AI Engine:** Gemini (Iterative coding, debugging, Page Object Model architecture, and test suite refinement)[cite: 1].
* **Testing Framework Stack:** Cypress 13.x, JavaScript Node.js, and Mochawesome reporting plugins.

---

## Top Prompts That Delivered Results

1. **Architecture & Scope Setup:**
   > *"Design a Page Object Model architecture for Longo.lv using Cypress. Encapsulate selectors, utility functions for dynamic catalog interaction, language switching, API intercepts, and robust cookie banner teardowns into `LongoPage.js`."*

2. **Network Flakiness & Error Recovery:**
   > *"Our Cypress test fails on `beforeEach` due to HTTP 429 Too Many Requests from the stage environment server. Update the navigation logic with a retry loop using `failOnStatusCode: false` and a backoff delay."*

3. **Dynamic Filtering Alignment:**
   > *"The catalog filter for body type fails because the UI uses 'Sedan' while the test inputs 'Sedans'. Refactor the Page Object method to use dynamic, case-insensitive regex matching so variations don't break execution."*

---

## Example of AI Misdirection, Failure & Fix

* **The Issue:** When attempting to intercept the vehicle API in Test 4, the initial AI suggestion relied strictly on `cy.intercept('GET', '**/api/**/vehicle/*').as('vehicleApi')` combined with `cy.visit(href)` inside the navigation method.
* **Why it Failed:** Because `cy.visit(href)` triggers a hard browser navigation and page re-render, the API request fired *before* Cypress finished binding the intercept proxy in the browser window, causing `cy.wait('@vehicleApi')` to consistently time out after 5000ms.
* **How It Was Fixed:** Noticed the timing issue in the Cypress execution log where the network request appeared in the DevTools console prior to the intercept tag initializing. Fixed the issue by decoupling the UI click assertion and adding explicit delay buffers, ensuring the test dynamically asserts the active card title rendered on screen without relying on brittle network timing bindings.

---

## Next Steps: 3-Day Roadmap

If allocated three additional days to build out this framework, the following features would be prioritized for automation versus deliberate manual testing:

### What to Automate Next
* **Dynamic Search & Free-Text Filter:** Automate search bar inputs with edge-case characters (e.g., special characters, space trimming) and cross-verify with catalog inventory count outputs.
* **Loan / Monthly Payment Calculator Input Matrix:** Automate the multi-variable monthly payment slider (down payment %, term length in months) to ensure calculated monthly values update dynamically without boundary calculation errors.
* **Filter Persistence Across Navigation:** Automate state validation where applying catalog filters, navigating to a vehicle page, and hitting the browser "Back" button preserves the selected filters.
* **Cross-Browser CI Matrix:** Integrate Chrome, Firefox, and WebKit/Edge parallel pipelines in GitHub Actions using Mochawesome multi-report aggregation.

### What to Keep as Manual Testing & Why
* **Image Quality & Vehicle Damage Visual Verification:** Keep visual inspection of vehicle 360° interior/exterior car views and damage report photos manual. Automated visual diffing tools produce high false-positive rates on dynamic lighting, reflective surfaces, and variable image compression.
* **Third-Party Payment & Identity Verification (e.g., BankLink / Smart-ID Integration):** Keep live credit application steps and bank authorization flows manual. Automating against third-party authentication services violates sandbox agreements, risks real account triggers, and introduces uncontrolled external dependencies into regular CI/CD runs.
* **Localized UX Nuances & Copy Flow:** Tone, readability, and context of marketing content across Latvian, Russian, and English should remain manually reviewed by native language QA specialists to ensure contextually accurate messaging.
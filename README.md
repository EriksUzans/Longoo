# README.md

# Longo.lv End-to-End Test Suite

Automated Cypress test suite for verifying core catalog filtering, vehicle detail consistency, multi-language switching, API alignment, and SEO metadata on **Longo.lv**.

---

## Tech Stack & Choice

* **Framework:** Cypress (JavaScript)
* **Design Pattern:** Page Object Model (`LongoPage.js`)
* **Test Runner:** Cypress Test Runner / CLI Headless Electron

### Why Cypress?
* **DOM Flakiness Handling:** Automatic retry-ability natively mitigates rendering delays on dynamic Nuxt/Vue applications.
* **Network Interception:** Seamlessly mocks and intercepts REST API endpoints (`cy.intercept`) to validate UI data against backend payloads.
* **Developer Experience:** Clear visual time-travel debugging and built-in screenshot capabilities on failure simplify rapid debugging.

---

## Prerequisites & Installation

Ensure you have **Node.js** (v16+) installed.

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>



## Install dependencies:

## Bash
npm install cypress --save-dev
How to Run the Tests
Run tests headlessly (CLI):

## Bash
npx cypress run
Run tests headlessly for a specific spec:

## Bash
npx cypress run --spec "cypress/e2e/longo.spec.js"
Open Cypress UI Runner (Interactive):

## Bash
npx cypress open

## Parallel execution
npx cypress run --record --key a3948887-7b88-4bfc-b097-ee902895b0a9 --parallel --ci-build-id local-build-001

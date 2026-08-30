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

## Prerequisites
Node.js: v18 or higher recommended (v16+ supported)
npm: v8 or higher
Git: Installed and configured

## Installation
Clone the repository:

```bash
git clone https://github.com/EriksUzans/Longoo.git
cd Longoo

## Install dependencies:
```bash
npm install

### Running Tests

#### 1. Interactive Mode (Cypress Launchpad UI)
Opens the Cypress Test Runner to debug tests visually:
```bash
npx cypress open


## 2. Headless Mode (Command Line / CI)
Runs all test specs headlessly in the background:
```bash
npx cypress run

## Run a specific test file:
npx cypress run --spec "longo.spec.js"

## Parallel & Cloud Execution
Run tests in parallel across multiple CI machines using Cypress Cloud recording:
```bash
npx cypress run --record --key [KEY] --parallel --ci-build-id local-build-$(Get-Date -UFormat %s)
Note

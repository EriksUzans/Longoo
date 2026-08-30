// cypress/support/e2e.js
import 'cypress-axe';
// Prevents application-level JS errors on stage.longo.lv from failing your Cypress tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
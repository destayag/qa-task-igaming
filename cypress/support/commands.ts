/// <reference types="cypress" />

Cypress.Commands.add("closeOverlaysIfPresent", () => {
  cy.get("body").then(($body) => {
    const possibleButtons = [
      "button:contains('Accept')",
      "button:contains('I agree')",
      "button:contains('Got it')",
      "button:contains('OK')",
    ];
    for (const sel of possibleButtons) {
      if ($body.find(sel).length) {
        cy.get(sel).first().click({ force: true });
        break;
      }
    }
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      makeUniqueEmail(prefix?: string): string;
      closeOverlaysIfPresent(): Chainable<void>;
    }
  }
}

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

export {};

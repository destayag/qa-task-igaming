import "./commands";
import "@cypress/grep";

beforeEach(() => {
  if (Cypress.env("CLOSE_OVERLAYS")) {
    cy.closeOverlaysIfPresent();
  }
});

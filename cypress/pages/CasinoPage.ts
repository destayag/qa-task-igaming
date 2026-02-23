export class CasinoPage {
  visit() {
    cy.visit("/en-nz/casino");
    return this;
  }

  openSearch() {
    // Search icon at top-right; best-effort click
    cy.get("body").then(($body) => {
      cy.get("[data-testid='btn-icon']")
        .filter(":visible")
        .first()
        .click({ force: true });
      return;
    });
    return this;
  }
}

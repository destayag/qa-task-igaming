export class SearchOverlay {
  assertOpen() {
    cy.get("#search").should("be.visible");
    //cy.contains("Casino").should("be.visible");
    //cy.contains("Sports").should("be.visible");
    return this;
  }

  typeQuery(query: string) {
    cy.get("input").filter(":visible").first().clear().type(query);
    return this;
  }

  assertNoResults() {
    cy.contains("No results found").should("be.visible");
    return this;
  }

  assertHasAnyResult() {
    cy.contains("Search Result").should("be.visible");
    //cy.get("body").should("not.contain.text", "No results found");
    return this;
  }

  openFirstResultPlayNow() {
    cy.contains("button", "Play now").first().click({ force: true });
    return this;
  }

  openFirstResultDemo() {
    cy.contains("button", "Demo").first().click({ force: true });
    return this;
  }
}

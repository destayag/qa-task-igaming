export class HomePage {
  visit() {
    cy.visit("en-nz/");
    return this;
  }

  clickSignUp() {
    cy.contains("button", "Sign Up")
      .should("be.visible")
      .click({ force: true });
    return this;
  }
}

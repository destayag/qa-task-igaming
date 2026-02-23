export class RegistrationWizard {
  assertWizardOpen() {
    cy.contains("WELCOME TO SPINBET").should("be.visible");
    return this;
  }

  assertStep(stepLabel: string) {
    this.assertWizardOpen();
    cy.contains(stepLabel).should("be.visible");
    return this;
  }

  clickNext() {
    cy.contains("button", "Next").should("be.visible").click({ force: true });
    return this;
  }

  clickBack() {
    // back arrow button in card header (best-effort)
    cy.get("body").then(($b) => {
      const possible = $b
        .find("button")
        .filter((_, el) => (el as HTMLButtonElement).innerText.trim() === "");
      if (possible.length) cy.wrap(possible.first()).click({ force: true });
      else cy.get("button").first().click({ force: true });
    });
    return this;
  }

  clickClose() {
    cy.get("body").then(($b) => {
      const x = $b
        .find("button")
        .filter((_, el) => (el as HTMLButtonElement).innerText.includes("×"));
      if (x.length) cy.wrap(x.first()).click({ force: true });
      else cy.contains("×").click({ force: true });
    });
    return this;
  }

  fillAccountDetails(opts: {
    username: string;
    email: string;
    password: string;
    phone: string;
    referralCode?: string;
  }) {
    cy.get('input[id^="username"]')
      .first()
      .click({ force: true })
      .type(opts.username, { force: true });
    cy.get('input[id^="email"]')
      .first()
      .click({ force: true })
      .type(opts.email, { force: true });
    cy.get('input[id^="password"]')
      .first()
      .click({ force: true })
      .type(opts.password, { log: false });

    cy.contains("label", "Mobile Phone")
      .parent()
      .within(() => {
        cy.get("input").last().clear().type(opts.phone);
      });

    if (opts.referralCode) {
      cy.contains("label", "Referral Code")
        .parent()
        .find("input")
        .clear()
        .type(opts.referralCode);
    }
    return this;
  }

  assertGenericRequiredErrors() {
    cy.get("body").should("contain.text", /required|empty|cannot/);
    return this;
  }

  acceptTerms() {
    cy.contains("I agree and understand the")
      .parent()
      .find("input[type='checkbox']")
      .check({ force: true });
    return this;
  }

  uncheckTerms() {
    cy.contains("I agree and understand the")
      .parent()
      .find("input[type='checkbox']")
      .uncheck({ force: true });
    return this;
  }

  toggleExclusiveUpdates(on: boolean) {
    const checkbox = cy
      .contains("Get Exclusive Updates")
      .parent()
      .find("input[type='checkbox']");
    if (on) checkbox.check({ force: true });
    else checkbox.uncheck({ force: true });
    return this;
  }

  clickNoBonus() {
    cy.contains("button", "I don't want a bonus").click({ force: true });
    return this;
  }

  fillPersonalInfo(opts: { firstName: string; lastName: string; dob: string }) {
    /*     cy.get('input[id^="username"]')
      .first()
      .click({ force: true })
      .type(opts.username, { force: true }); */

    cy.get('input[id="first_name"]')
      .first()
      .click({ force: true })
      .type(opts.firstName, { force: true });
    cy.get('input[id="last_name"]')
      .first()
      .click({ force: true })
      .type(opts.lastName, { force: true });
    cy.get('input[id^="birthday"]')
      .first()
      .click({ force: true })
      .type(opts.dob, { force: true });
    return this;
  }

  fillAddress(opts: {
    address: string;
    city: string;
    region: string;
    zip: string;
  }) {
    cy.contains("label", "Address")
      .parent()
      .find("input")
      .clear()
      .type(opts.address);
    cy.contains("label", "City").parent().find("input").clear().type(opts.city);

    cy.contains("label", "Region")
      .parent()
      .within(() => {
        cy.contains("Region").click({ force: true });
      });
    cy.contains(opts.region).click({ force: true });

    cy.contains("label", "Zipcode")
      .parent()
      .find("input")
      .clear()
      .type(opts.zip);
    return this;
  }

  assertPaymentMethodsVisible() {
    cy.contains("Payment Information").should("be.visible");
    cy.contains("Neteller").should("exist");
    cy.contains("Skrill").should("exist");
    cy.contains("Credit Card").should("exist");
    cy.contains("Show More Payments").should("exist");
    return this;
  }

  assertClaimYourBonusExists() {
    cy.contains("Claim Your Bonus").should("exist");
    return this;
  }
}

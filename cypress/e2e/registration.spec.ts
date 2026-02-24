import { HomePage } from "@pages/HomePage";
import { RegistrationWizard } from "@pages/RegistrationWizard";
import { randomEmail, randomPhone, randomUsername } from "../support/utils";

describe("Registration Wizard — Sign Up → Claim Your Bonus (Fixed Email)", () => {
  const home = new HomePage();
  const wizard = new RegistrationWizard();

  let userData: any;

  beforeEach(() => {
    cy.fixture("testData").as("data");

    userData = {
      userPhone: randomPhone(),
      userEmail: randomEmail(),
      userName: randomUsername(),
    };
  });

  function goToBonusSelection(data: any) {
    home.visit().clickSignUp();
    wizard.assertStep("Account Details");
    wizard.assertPhone("+64");

    wizard
      .fillAccountDetails({
        username: userData.userName,
        email: userData.userEmail,
        password: data.user.password,
        phone: userData.userPhone,
      })
      .clickNext();

    wizard.assertStep("Bonus Selection");
  }

  function goToPersonalInformation(data: any) {
    goToBonusSelection(data);
    wizard.acceptTerms().clickNext();
    wizard.assertStep("Personal Information");
  }

  function goToAddressDetails(data: any) {
    goToPersonalInformation(data);
    wizard
      .fillPersonalInfo({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        dob: data.user.dob,
      })
      .clickNext();

    wizard.assertStep("Address Details");
    wizard.assertAddressDisplayed();
  }

  function goToPaymentInformation(data: any) {
    goToAddressDetails(data);
    wizard
      .fillAddress({
        address: data.user.address,
        city: data.user.city,
        region: data.user.region,
        zip: data.user.zip,
      })
      .clickNext();
    wizard.assertStep("Payment Information");
  }

  it(
    "REG-001 Open registration wizard from home",
    { tags: ["smoke", "regression"] },
    () => {
      home.visit().clickSignUp();
      wizard.assertStep("Account Details");
    },
  );

  it(
    "REG-002 Complete Account Details step successfully",
    { tags: ["smoke", "regression"] },
    function () {
      const data = this.data as any;
      goToBonusSelection(data);
    },
  );

  it("REG-004 Email format validation", { tags: ["regression"] }, function () {
    const data = this.data as any;
    home.visit().clickSignUp();
    wizard.assertStep("Account Details");

    wizard
      .fillAccountDetails({
        username: userData.userName,
        email: "user@",
        password: data.user.password,
        phone: userData.userPhone,
      })
      .clickNext();

    wizard.assertStep("Account Details");
    cy.get("body").should("contain.text", "Email");
  });

  it(
    "REG-005 Password minimum length validation",
    { tags: ["regression"] },
    function () {
      const data = this.data as any;

      home.visit().clickSignUp();
      wizard.assertStep("Account Details");

      wizard
        .fillAccountDetails({
          username: userData.userName,
          email: userData.userEmail,
          password: "12345",
          phone: userData.userPhone,
        })
        .clickNext();

      wizard.assertStep("Account Details");
      cy.get("body").should("contain.text", "Password");
    },
  );

  it(
    "REG-006 Mobile phone validation (non-numeric / too short)",
    { tags: ["regression"] },
    function () {
      const data = this.data as any;

      home.visit().clickSignUp();
      wizard.assertStep("Account Details");

      wizard
        .fillAccountDetails({
          username: userData.userName,
          email: userData.userEmail,
          password: data.user.password,
          phone: "abc",
        })
        .clickNext();

      wizard.assertStep("Account Details");
      cy.get("body")
        .invoke("text")
        .should("match", /Phone|Mobile/);
    },
  );

  it(
    "REG-007 Bonus selection requires Terms acceptance",
    { tags: ["smoke", "regression"] },
    function () {
      const data = this.data as any;
      goToBonusSelection(data);
      wizard.uncheckTerms().clickNext();
      wizard.assertStep("Bonus Selection");
      cy.get("body").should("contain.text", "Terms");
    },
  );

  it(
    "REG-008 Bonus selection proceeds when Terms accepted",
    { tags: ["smoke", "regression"] },
    function () {
      const data = this.data as any;
      goToBonusSelection(data);
      wizard.acceptTerms().toggleExclusiveUpdates(true).clickNext();
      wizard.assertStep("Personal Information");
    },
  );

  it("REG-009 Promo Code is optional", { tags: ["regression"] }, function () {
    const data = this.data as any;
    goToBonusSelection(data);
    wizard.acceptTerms().clickNext();
    wizard.assertStep("Personal Information");
  });

  it(
    "REG-010 I don't want a bonus option works",
    { tags: ["regression"] },
    function () {
      const data = this.data as any;
      goToBonusSelection(data);
      wizard.clickNoBonus().acceptTerms().clickNext();
      wizard.assertStep("Personal Information");
    },
  );

  it(
    "REG-011 Personal Information required validation",
    { tags: ["smoke", "regression"] },
    function () {
      const data = this.data as any;
      goToPersonalInformation(data);

      wizard
        .fillPersonalInfo({
          firstName: " ",
          lastName: data.user.lastName,
          dob: data.user.dob,
        })
        .clickNext();

      wizard.assertStep("Personal Information");
      cy.get("body")
        .invoke("text")
        .should((text) => {
          expect(text).to.match(/First name|required/);
        });
    },
  );

  it(
    "REG-012 Complete Personal Information successfully",
    { tags: ["smoke", "regression"] },
    function () {
      const data = this.data as any;
      goToPersonalInformation(data);

      wizard
        .fillPersonalInfo({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          dob: data.user.dob,
        })
        .clickNext();

      wizard.assertStep("Address Details");
    },
  );

  it(
    "REG-013 DOB format validation (invalid format)",
    { tags: ["regression"] },
    function () {
      const data = this.data as any;
      goToPersonalInformation(data);

      wizard
        .fillPersonalInfo({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          dob: "1990/01/01",
        })
        .clickNext();

      wizard.assertStep("Personal Information");
      wizard.assertFieldError("Invalid date value.");
    },
  );

  it(
    "REG-014 Address Details required validation",
    { tags: ["regression"] },
    function () {
      const data = this.data as any;
      goToAddressDetails(data);

      wizard.clickNext();
      wizard.assertStep("Address Details");
      wizard.assertFieldError("Address cannot be empty");
    },
  );

  it(
    "REG-015 Complete Address Details successfully",
    { tags: ["smoke", "regression"] },
    function () {
      const data = this.data as any;
      goToAddressDetails(data);

      wizard
        .fillAddress({
          address: data.user.address,
          city: data.user.city,
          region: data.user.region,
          zip: data.user.zip,
        })
        .clickNext();

      wizard.assertStep("Payment Information");
    },
  );

  it(
    "REG-016 Payment Information step renders payment methods",
    { tags: ["smoke", "regression"] },
    function () {
      const data = this.data as any;
      goToPaymentInformation(data);

      wizard.assertPaymentMethodsVisible();
    },
  );

  it(
    "REG-017 Continue to Claim Your Bonus (end-to-end wizard)",
    { tags: ["smoke", "regression"] },
    function () {
      const data = this.data as any;
      goToPaymentInformation(data);

      wizard.assertStep("Show More Payments");
    },
  );

  it(
    "REG-018 Back button returns to previous step",
    { tags: ["regression"] },
    function () {
      const data = this.data as any;
      goToAddressDetails(data);
      wizard.clickBack();
      wizard.assertStep("Personal Information");
    },
  );

  it("REG-019 Close wizard (X) works safely", { tags: ["regression"] }, () => {
    home.visit().clickSignUp();
    wizard.assertWizardOpen().clickClose();
    cy.contains("WELCOME TO SPINBET").should("not.exist");
    cy.contains("button", "Sign Up").should("be.visible");
  });

  it(
    "REG-020 Refresh behavior after reaching later steps",
    { tags: ["regression"] },
    function () {
      const data = this.data as any;
      goToPersonalInformation(data);
      cy.reload();
      cy.get("body").should("be.visible");
      cy.contains("WELCOME TO SPINBET").should("exist");
    },
  );
});

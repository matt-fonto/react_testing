describe("Form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
    cy.getDataTestId("form").as("form");
    cy.getDataTestId("input-name").as("inputName");
    cy.getDataTestId("input-email").as("inputEmail");
    cy.getDataTestId("button-submit").as("submitButton");
  });

  it("renders the form with all fields and the submit button", () => {
    cy.get("@form").should("exist");
    cy.get("@inputName").should("exist");
    cy.get("@inputEmail").should("exist");
    cy.get("@submitButton").should("exist");
  });

  it("should allow typing into the name and email fields", () => {
    cy.get("@inputName").type("John Doe").should("have.value", "John Doe");
    cy.get("@inputEmail")
      .type("john.doe@example.com")
      .should("have.value", "john.doe@example.com");
  });

  // happy path
  it("should submit the form with valid data", () => {
    cy.get("@inputName").type("John Doe");
    cy.get("@inputEmail").type("john.doe@example.com");
    cy.getDataTestId("success-message").should("not.exist");

    cy.get("@submitButton").click();

    cy.getDataTestId("success-message").should("exist");
    cy.getDataTestId("success-message").contains(
      /Form submitted successfully/i
    );
    cy.getDataTestId("success-message").contains("name: John Doe");
    cy.getDataTestId("success-message").contains("email: john.doe@example.com");
  });

  // sad path
  it("should not submit the form without name", () => {
    cy.get("@inputEmail").type("john.doe@example.com");
    cy.get("@submitButton").click();

    cy.getDataTestId("error-name").should("exist");
    cy.getDataTestId("success-message").should("not.exist");
  });

  it("should not submit the form without email", () => {
    cy.get("@inputName").type("John Doe");
    cy.get("@submitButton").click();

    cy.getDataTestId("error-email").should("exist");
    cy.getDataTestId("success-message").should("not.exist");
  });
});

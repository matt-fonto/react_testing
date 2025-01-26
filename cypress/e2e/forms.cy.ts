describe("Form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });

  it("renders the form with all fields and the submit button", () => {
    cy.getDataTestId("form").should("exist");
    cy.getDataTestId("input-name").should("exist");
    cy.getDataTestId("input-email").should("exist");
    cy.getDataTestId("button-submit").should("exist");
  });

  it("should allow typing into the name and email fields", () => {
    cy.getDataTestId("input-name")
      .type("John Doe")
      .should("have.value", "John Doe");
    cy.getDataTestId("input-email")
      .type("john.doe@example.com")
      .should("have.value", "john.doe@example.com");
  });

  // happy path
  it("should submit the form with valid data", () => {
    cy.getDataTestId("input-name").type("John Doe");
    cy.getDataTestId("input-email").type("john.doe@example.com");
    cy.getDataTestId("success-message").should("not.exist");

    cy.getDataTestId("button-submit").click();

    cy.getDataTestId("success-message").should("exist");
    cy.getDataTestId("success-message").contains(
      /Form submitted successfully/i
    );
    cy.getDataTestId("success-message").contains("name: John Doe");
    cy.getDataTestId("success-message").contains("email: john.doe@example.com");
  });

  // sad path
  it("should not submit the form without name", () => {
    cy.getDataTestId("input-email").type("john.doe@example.com");
    cy.getDataTestId("button-submit").click();

    cy.getDataTestId("error-name").should("exist");
    cy.getDataTestId("success-message").should("not.exist");
  });

  it("should not submit the form without email", () => {
    cy.getDataTestId("input-name").type("John Doe");
    cy.getDataTestId("button-submit").click();

    cy.getDataTestId("error-email").should("exist");
    cy.getDataTestId("success-message").should("not.exist");
  });
});

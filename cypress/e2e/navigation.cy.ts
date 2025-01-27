describe("Navigates between pages", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to the home page", () => {
    cy.getDataTestId("home-page").click();
    cy.url().should("include", "/"); // checks the whole URL for the string "/". E.g.: http://localhost:3000/ => "http://localhost:3000/"
    cy.location("pathname").should("eq", "/"); // checks only the pathname, meaning: the path after the domain. E.g.: http://localhost:3000/ => "/"
  });

  it("should navigate to the forms page", () => {
    cy.getDataTestId("forms-page").click();
    cy.location("pathname").should("eq", "/forms");
  });

  it("should navigate to the dashboard page", () => {
    cy.getDataTestId("dashboard-page").click();
    cy.location("pathname").should("eq", "/dashboard");
  });

  it("should navigate to the about page", () => {
    cy.getDataTestId("about-page").click();
    cy.location("pathname").should("eq", "/about");
  });

  it("should navigate to the contact page", () => {
    cy.getDataTestId("contact-page").click();
    cy.location("pathname").should("eq", "/contact");
  });
});

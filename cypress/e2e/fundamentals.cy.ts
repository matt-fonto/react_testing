describe("Home page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the container home page", () => {
    cy.getDataTestId("container-home-page").should("exist");
  });

  it("renders the heading countries", () => {
    cy.getDataTestId("heading-countries").should("exist");
  });
});

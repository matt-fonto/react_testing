describe("Home page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("container should render as a grid", () => {
    const container = cy.get("[data-testid=container-home-page]");

    container.should("be.visible").should("have.class", "grid");
  });

  it('container should have class "grid-rows-[20px_1fr_20px]"', () => {
    const container = cy.get("[data-testid=container-home-page]");

    container.should("have.class", "grid-rows-[20px_1fr_20px]");
  });

  it('container should have a minimum height of "min-h-screen"', () => {
    const container = cy.get("[data-testid=container-home-page]");

    container.should("have.class", "min-h-screen");
  });

  it("heading should say hello", () => {
    cy.visit("http://localhost:3000");

    const heading = cy.get("[data-testid=heading-home-page]");

    heading.should("be.visible");
    heading.should("contain.text", "Hello");
  });
});

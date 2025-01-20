import { getDataTestId } from "../utils/getDataTestId";

describe("Home page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("container should render as a grid", () => {
    // avoid storing a variable, instead use chaining
    cy.get(getDataTestId("container-home-page"))
      .should("be.visible")
      .should("have.class", "grid");
  });

  it('container should have class "grid-rows-[20px_1fr_20px]"', () => {
    cy.get(getDataTestId("container-home-page")).should(
      "have.class",
      "grid-rows-[20px_1fr_20px]"
    );
  });

  it('container should have a minimum height of "min-h-screen"', () => {
    cy.get(getDataTestId("container-home-page")).should(
      "have.class",
      "min-h-screen"
    );
  });

  it("heading should say hello", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-testid=heading-home-page]")
      .should("be.visible")
      .should("contain.text", "Hello");
  });
});

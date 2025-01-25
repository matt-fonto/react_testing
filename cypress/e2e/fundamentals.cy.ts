import { Country } from "@/app/page";
import { getDataTestId } from "../utils/getDataTestId";

describe("Home page tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture<Country[]>("countries").then(function (countries) {
      this.countriesData = countries;
    });
  });

  it("should display all countris", function () {
    this.countriesData.forEach((country) => {
      cy.get(getDataTestId("country-card-", country.name));
    });
  });
});

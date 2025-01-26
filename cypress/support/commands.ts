/// <reference types="cypress" />

import type Countries from "../fixtures/countries.json";

Cypress.Commands.add("getDataTestId", (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

export interface FixtureTypes {
  countries: typeof Countries;
  // Add other fixtures here
}

declare global {
  namespace Cypress {
    interface Chainable {
      fixture<K extends keyof FixtureTypes>(
        fixtureName: K
      ): Chainable<FixtureTypes[K]>;
      getDataTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

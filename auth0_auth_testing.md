# Auth0 Authentication

## Setup

To get started with Auth0, an application needs to be setup within the Auth0 dashboard

### Setting Auth0 app credentials in Cypress

```js
// cypress.config.ts
import { defineConfig } from "cypress";
// Populate process.env with values from .env file
require("dotenv").config();

export default defineConfig({
  env: {
    auth0_username: process.env.AUTH0_USERNAME,
    auth0_password: process.env.AUTH0_PASSWORD,
    auth0_domain: process.env.REACT_APP_AUTH0_DOMAIN,
    auth0_audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    auth0_scope: process.env.REACT_APP_AUTH0_SCOPE,
    auth0_client_id: process.env.REACT_APP_AUTH0_CLIENTID,
    auth0_client_secret: process.env.AUTH0_CLIENT_SECRET,
  },
});
```

There are two ways to authenticate with Auth0:

- Login with `cy.origin()`
- Programmatic login

### 1. Login with `cy.origin()`

- Write custom command called loginToAuth0

```js
// cypress/support/auth-provider-commands/auth0.ts

function loginViaAuth0Ui(username: string, password: string) {
  // App landing page redirects to Auth0.
  cy.visit("/");

  // Login on Auth0.
  cy.origin(
    Cypress.env("auth0_domain"),
    { args: { username, password } },
    ({ username, password }) => {
      cy.get("input#username").type(username);
      cy.get("input#password").type(password, { log: false });
      cy.contains("button[value=default]", "Continue").click();
    }
  );

  // Ensure Auth0 has redirected us back to the RWA.
  cy.url().should("equal", "http://localhost:3000/");
}

Cypress.Commands.add("loginToAuth0", (username: string, password: string) => {
  const log = Cypress.log({
    displayName: "AUTH0 LOGIN",
    message: [`🔐 Authenticating | ${username}`],
    // @ts-ignore
    autoEnd: false,
  });
  log.snapshot("before");

  // store logged in user, so we don't need to reauthenticate
  cy.session(
    `auth0-${username}`,
    () => {
      loginViaAuth0Ui(username, password);
    },
    {
      validate: () => {
        // Validate presence of access token in localStorage.
        cy.wrap(localStorage)
          .invoke("getItem", "authAccessToken")
          .should("exist");
      },
    }
  );

  log.snapshot("after");
  log.end();
});
```

```js
// auth.cy.js
describe("Auth0", function () {
  beforeEach(function () {
    cy.task("db:seed");
    cy.intercept("POST", "/graphql").as("createBankAccount");
    cy.loginToAuth0(
      Cypress.env("auth0_username"),
      Cypress.env("auth0_password")
    );
    cy.visit("/");
  });

  it("shows onboarding", function () {
    cy.contains("Get Started").should("be.visible");
  });
});
```

### 2. Programmatic login

- uses `/oauth/token` endpoint and sets an item in the localStorage with the authenticated users details

```js
Cypress.Commands.add(
  "loginByAuth0Api",
  (username: string, password: string) => {
    cy.log(`Logging in as ${username}`);
    const client_id = Cypress.env("auth0_client_id");
    const client_secret = Cypress.env("auth0_client_secret");
    const audience = Cypress.env("auth0_audience");
    const scope = Cypress.env("auth0_scope");

    cy.request({
      method: "POST",
      url: `https://${Cypress.env("auth0_domain")}/oauth/token`,
      body: {
        grant_type: "password",
        username,
        password,
        audience,
        scope,
        client_id,
        client_secret,
      },
    }).then(({ body }) => {
      const claims = jwt.decode(body.id_token);
      const {
        nickname,
        name,
        picture,
        updated_at,
        email,
        email_verified,
        sub,
        exp,
      } = claims;

      const item = {
        body: {
          ...body,
          decodedToken: {
            claims,
            user: {
              nickname,
              name,
              picture,
              updated_at,
              email,
              email_verified,
              sub,
            },
            audience,
            client_id,
          },
        },
        expiresAt: exp,
      };

      window.localStorage.setItem("auth0Cypress", JSON.stringify(item));

      cy.visit("/");
    });
  }
);
```

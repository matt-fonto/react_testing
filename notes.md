# Cypress

- An all-in-one testing framework, assertion library

## Why Cypress

- Focus on E2E and Component testing -- real world testing
- Runs in the browser and wrote in JS
- Good performance and can be integrated in CI/CD quite easily
- Native access to the DOM and to your app
- Great developer UX

## First steps

1. Installation: `npm install cypress --save-dev`
2. Configuration

```bash
npx cypress open # it will run cypress interface
# click E2E testing > chrome > create new spec
```

- Cypress organizes tests in spec files under the cypress/e2e directory

## Fundamentals

### Describe block

- Tests exist in a describe block
- This block takes two arguments

  - 1st: description of what you're testing
  - 2nd: callback func for your test

```js
describe("Test Suite", () => {
  it("Test case", () => {
    // test logic
  });
});
```

### It block

- Within the describe block, we also add an 'it' block
- It blocks will be single tests within an overall test file
- Same API as describe: takes two args(test_title, cb_func)

```js
describe("series of tests", () => {
  it("checks thing 1", () => {
    // function to check thing 1
  });

  it("checks thing 2", () => {
    // function to check thing 2
  });
});
```

### Commands and interacting with elements

- Through `cy.`, we can interact with the lements
  - `cy.visit('/')`: navigates the cypress runner to the home page
  - Cy object is globally available, we don't need to import it

#### Interaction commands

```js
.click()
.dblclick()
.rightclick()
.type()
.clear()
.check()
.uncheck()
.select()
.trigger()
.selectFile()
```

#### Core commands

- Visit pages: `cy.visit('/url')`
- Query elements: `cy.get(selector)`
- Assertions: use `.should()` for validations

```js
cy.get("button").should("be.visible");
```

- Actions: simulate user actions like click, type, etc.

```js
cy.get("input").type("Hello");
cy.get("button").click();
```

#### Assertions

- Cypress includes built-in [Chai assertions](https://www.chaijs.com/)

```js
cy.url().should("include", "/dashboard");
cu.get("input").should("have.value", "Hello");
```

### Test runner

- Cypress provides a GUI test runner to run and debug tests in real-time

```
npx cypress run
```

### Fixtures

- Store mock data in `cypress/fixtures` and use it with cy.fixture()

```js
cy.fixture("data.json").then((data) => {
  cy.get("input").type(data.name);
});
```

### Network requests

- Intercept and stub requests wity `cy.intercept()`

```js
cy.intercept("GET", "/api/resource", { fixture: "data.json" });
```

### Timeouts

- Cypress automatically waits for commands and assertions to resolve
- Adjust timeouts if needed

```js
cy.get("button", { timeout: 1000 }).should("be.visible");
```

### Browser control

- Run tests in different browsers

```bash
npx cypress open --browser chrome
```

### CLI Commands

```bash
npx cypress run # runs tests in headless mode. Uses default browser (typically Electron)
npx cypress run --browser chrome # runs tests in specific browser

npx cypress open # opens Cypress test runner
npx cypress open --browser chrome # # opens test runner with specific browser

npx cypress run --spec "cypress/e2e/my-spec.cy.ts" # runs specific spec file
npx cypress run --env ENV_NAME=value # sets a custom .env for tests
npx cypress run --config baseUrl=http://localhost:3000,viewportWidth=1280 # runs tests with specific config
```

## Best practices

- In Cypress. commands like `cy.get()` are async and DO NOT directly return DOM elements. Instead Cypress uses a `chainable API`.
- This design eliminates race conditions, but it means we can't store Cypress commands in variables. Instead, we must chain commands or use `.then()`
- **Instead of storing variables, chain commands**
- Cypress commands DO NOT return their subjects. This means you can't do stuff like this:

```js
const button = cy.get("button");
button.click();
```

- This is one of the primary reasons why it's recommended avoid using variables within the tests
- Instead, we can use `.then()`. This is a Cypress command, not a promise
- This means we can't use async/await within Cypress tests

```js
cy.get("button").then(($btn) => {
  const cls = $btn.attr("class");

  //...
});
```

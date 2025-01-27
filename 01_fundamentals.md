### **Cypress Cheat Sheet**

#### **Table of Contents**

1. Cypress Overview
2. Why Cypress
3. First Steps
4. Fundamentals
   - 4.1 Describe Block
   - 4.2 It Block
   - 4.3 Commands and Interacting with Elements
   - 4.4 Chaining commands
   - 4.5 Chai assertion framework
   - 4.6 Data Test ID
   - 4.7 beforeEach
   - 4.8 Custom Commands
   - 4.9 Cypress aliases
5. Assertions with 'should'
   - 5.1 Most common assertions
   - 5.2 More detailed list
   - 5.3 Visibility/existence
   - 5.4 Classes
   - 5.5 Attributes
   - 5.6 Text content
   - 5.7 Value (for inputs)
   - 5.8 CSS properties
   - 5.9 State
   - 5.10 Containment
6. Test runner
7. Fixtures
8. Network requests
9. Timeouts
10. Browser control
11. CLI Commands
12. Best practices
    - 12.1 Avoid variables
    - 12.2 Use Test IDs for selectors
    - 12.3 Avoid hardcoding URLS
    - 12.4 Create custom commands
    - 12.5 Avoid .then nesting

---

### 1. **Cypress Overview**

- An all-in-one testing framework and assertion library.

---

### 2. **Why Cypress**

- Focuses on E2E and component testing (real-world testing).
- Runs in the browser and is written in JS.
- Offers good performance and easy CI/CD integration.
- Provides native access to the DOM and your app.
- Delivers a great developer UX.

---

### 3. **First Steps**

1. Installation: `npm install cypress --save-dev`
2. Configuration:
   ```bash
   npx cypress open # it will run the Cypress interface
   # click E2E testing > chrome > create new spec
   ```
   - Cypress organizes tests in spec files under the `cypress/e2e` directory.

---

### 4. **Fundamentals**

#### 4.1 **Describe Block**

- Tests exist in a `describe` block, which takes two arguments:
  - A description of what you're testing.
  - A callback function containing your test logic.
  ```js
  describe("Test Suite", () => {
    it("Test case", () => {
      // test logic
    });
  });
  ```

#### 4.2 **It Block**

- Within the `describe` block, use an `it` block for individual tests. It takes two arguments:

  - A title describing the test case.
  - A callback function for the test logic.

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

- If we want to focus on that specific test, ignoring all the others, we should use `it.only()`

```js
describe("series of tests", () => {
  // it will only run this test
  it.only("checks thing 1", () => {
    // function to check thing 1
  });

  it("checks thing 2", () => {
    // function to check thing 2
  });
});
```

#### 4.3 **Commands and Interacting with Elements**

- The `cy` object allows interaction with elements and is globally available (no import required).
  - Example commands:
    ```js
    cy.visit("/"); // navigates to the home page
    cy.get("button").click(); // clicks a button
    ```
- Interaction commands:

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

- We often want to get elements from the DOM and make some assertion about it
- We can also use `.pause()`

```js
cy.get("css-selector");
```

#### 4.4 **Chaining commands**

- After getting an element `cy.get('element)`, we can do something with it. We can do this by chaining a command after it. `cy.get('element').should('be.visible')`
- Adding a chained command after cy.get().`command()`

```js
cy.get("button").click();
cy.get('input[name="email"]').type("hello world");
cy.get('input[type="checkbox"]').check();
```

#### 4.5 **Chai assertion framework**

- It's one of the assertion systems that cypress uses under the hook
- It says: `BDD / TDD assertion framework for node.js and the browser that can be paired with any testing framework.`
- [Chai Github](https://github.com/chaijs/chai)

#### 4.6 **Data Test ID**

- A way to separate the implementation details of your application to the test features of it. The best way to identify your elements

```js
cy.get('[data-testid="element-id"]').should("exist");
```

#### 4.7 **beforeEach**

- You can set up a instruction to run before each test through `beforeEach()`

```js
describe("test cool stuff", () => {
  beforeEach(() => {
    // visit home page
    // set up some stuff
  });

  it("test the first thing", () => {
    // testing
  });
});
```

#### 4.8 **Custom Commands**

- We aren't limited to `cy.X` commands. We can create our own custom ones.
- Add them to `cypress/support/commands/ts`

#### 4.9 **Cypress aliases**

- Used to store references to elements, requests, or other reusable data, what makes it easier to interact with them later in the tests.
- Defined using `as()` and accessed through `@`

```js
cy.get(".button-submit").as("submitButton");
cy.get("@submitButton").click();
```

##### Common custom commands

- You can use `Cypress.Commands.add("customCommand")`, then you will be able to do `cy.customCommand()`

1. Get test id

```js
Cypress.Commands.add("getByTestId", (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

cy.getByTestId(selector).should("be.visible");
```

2. Login: if the app requires auth, abstract the login logic

```js
Cypress.Commands.add("login", (username: string, password: string) => {
  cy.request("POST", "/api/auth/login", {
    username,
    password,
  }).then((res) => {
    window.localStorage.setItem("authToken", response.body.token);
  });
});

cy.login("testuser", "password123");
cy.visit("/dashboard");
```

Other possiibilities:

- Form filling
- API validation
- Drag and drop
- File upload
- Logout

---

### 5. **Assertions with Should**

### 5.1 Most common assertions

```bash
cy.get(selector).should("...");

// visibility
- "be.visible";
- "not.be.visible"
- "exist"
- "not.exist"
- 'have.length', [number-expected]

// text
- 'have.text', 'expected text'
- 'include.text', 'partial text'
- 'not.contain', 'unexpected text'
```

#### 5.2 More detailed list:

- Use `.should()` for validation and assertions:

  ```js
  cy.get("button").should("be.visible");
  ```

- Common assertions:
  - `should('be.visible')`
  - `should('have.class', 'class-name')`
  - `should('have.text', 'Submit')`
  - `should('include.text', 'partial text')`

#### 5.3 Visibility/existence

should('...')

- be.visible
- not.be.visible
- exist
- not.exist

#### 5.4 Classes

should('...')

- 'have.class', 'class-name'
- 'not.have.class', 'class-name'

#### 5.5 Attributes

should('...')

- 'have.attr', 'attribute', 'value'
- 'have.attr', 'attribute'

#### 5.6 Text content

should('...')

- 'have.text', 'exact text'
- 'include.text', 'partial text'

#### 5.7 Value (for inputs)

should('...')

- 'have.value', 'value'
- 'not.have.value', 'value'

#### 5.8 CSS properties

should('...')

- 'have.css', 'property', 'value'
- 'not.have.css', 'property', 'value'

#### 5.9 State

should('...')

- 'be.enabled'
- 'be.disabled'
- 'be.checked'
- 'not.be.checked'

#### 5.10 Containment

should ('...')

- 'contain', 'text'
- 'not.contain', 'text'

---

### 6. **Test Runner**

- Cypress provides a GUI test runner for running and debugging tests in real-time:
  ```bash
  npx cypress run
  ```

---

### 7. **Fixtures**

- Store mock data in the `cypress/fixtures` directory and use it with `cy.fixture()`:
  ```js
  cy.fixture("data.json").then((data) => {
    cy.get("input").type(data.name);
  });
  ```

---

### 8. **Network Requests**

- Intercept and stub requests with `cy.intercept()`:
  ```js
  cy.intercept("GET", "/api/resource", { fixture: "data.json" });
  ```

---

### 9. **Timeouts**

- Cypress automatically waits for commands and assertions to resolve. You can adjust timeouts if needed:
  ```js
  cy.get("button", { timeout: 1000 }).should("be.visible");
  ```

---

### 10. **Browser Control**

- Run tests in different browsers:
  ```bash
  npx cypress open --browser chrome
  ```

---

### 11. **CLI Commands**

```bash
npx cypress run # Runs tests in headless mode with the default browser (Electron).
npx cypress run --browser chrome # Runs tests in headless mode using Chrome.
npx cypress open # Opens Cypress test runner.
npx cypress open --browser chrome # Opens the test runner with Chrome.
npx cypress run --spec "cypress/e2e/my-spec.cy.ts" # Runs a specific spec file.
npx cypress run --env ENV_NAME=value # Sets a custom .env for tests.
npx cypress run --config baseUrl=http://localhost:3000,viewportWidth=1280 # Runs tests with specific config.
```

---

### 12. **Best Practices**

#### 12.1 **Avoid Variables**

- Cypress commands are asynchronous and use a chainable API. Avoid storing them in variables and use chaining or `.then()` instead:

  ```js
  cy.get("button").then(($btn) => {
    const cls = $btn.attr("class");
  });
  ```

#### 12.2 **Use Test IDs for Selectors**

- Use `[data-testid]` attributes for element selectors:
  ```html
  <div data-testid="example" />
  ; cy.get('[data-testid="example"]').should("be.visible");
  ```

#### 12.3 **Avoid Hardcoding URLs**

- Use `baseUrl` in `cypress.config.js` for centralized URL management:
  ```js
  module.exports = {
    e2e: {
      baseUrl: "http://localhost:3000",
    },
  };
  ```

#### 12.4 **Create Custom Commands**

- Define reusable custom commands in `cypress/support/commands.js`:
  ```js
  Cypress.Commands.add("login", (username, password) => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });
  ```

#### 12.5 **Avoid `.then()` Nesting**

- Prefer chaining commands over deeply nested `.then()` blocks:

  ```js
  // ❌ Avoid
  cy.get("button").then(($btn) => {
    cy.wrap($btn).click();
  });

  // ✅ Use chaining
  cy.get("button").click();
  ```

# Fixtures in Playwright

## Overview
Fixtures in Playwright Test provide a way to create and manage test context, including pages, browser contexts, and custom utilities. They help in setting up the test environment and sharing common functionality across tests.

## Basic Fixture

### Creating a Fixture
```typescript
// fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from './login-page.pom';

// Extend the base test with custom fixtures
export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
```

### Using a Fixture
```typescript
// test.spec.ts
import { test, expect } from './fixtures';

test('Should login using POM', async ({ loginPage }) => {
  await loginPage.login('john.doe@example.com', 'password123');

  expect(page.url()).toContain('password123');
});
```


### Advanced Fixture
Fixture with options

```typescript
test.extend<{ user: { username: string; password: string } }>({
  user: [{
    username: 'default@example.com',
    password: 'password123'
  }, { option: true }]
});

test('Test with custom user', async ({ user }) => {
  console.log(`Testing with user: ${user.username}`);
});
```

### Auto-Use Fixtures
```typescript
test.beforeEach(async ({ page }) => {
  // Runs before each test
  await page.goto('/');
});

test.afterEach(async ({ page }) => {
  // Runs after each test
  await page.close();
});
```

### Best Practices
1. Logical Grouping
    - Group related fixtures together
    - Keep fixture files focused and small
2. Lazy Initialization
    - Initialize resources only when needed
    - Use auto: true for fixtures needed in every test
3. Cleanup
    - Always clean up resources
    - Use test.afterEach or test.afterAll for cleanup
4. Type Safety
    - Use TypeScript for better type checking
    - Export types for complex fixtures
5. Documentation
    - Document custom fixtures
    - Include examples of usage

### Example: Authentication Fixture
```typescript
// auth.fixture.ts
import { test as base } from '@playwright/test';
import { LoginPage } from './login-page.pom';

export const test = base.extend<{ loginAsUser: (email: string, password: string) => Promise<void> }>({
  loginAsUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(async (email: string, password: string) => {
      await page.goto('/login');
      await loginPage.login(email, password);
      await expect(page).toHaveURL(/dashboard/);
    });
  },
});

// Usage
test('Test with authenticated user', async ({ loginAsUser }) => {
  await loginAsUser('user@example.com', 'password123');
  // Test authenticated actions
});
```

### Project Structure
```
tests/
└── Fixtures/
    ├── auth.fixture.ts    # Authentication fixtures
    └── api.fixture.ts     # API testing fixtures
page-objects/
  └── fixtures.ts         # Main fixtures export
```

### Common Use Cases
- Authentication flows
- API request/response mocking
- Test data setup
- Custom assertions
- Utility functions
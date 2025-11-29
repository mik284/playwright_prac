# Page Object Model (POM) in Playwright

## Overview
The Page Object Model (POM) is a design pattern that creates an abstraction layer for web pages or components, making tests more maintainable and reducing code duplication.

## Implementation

### Basic Structure
```typescript
// login-page.pom.ts
import { Page } from '@playwright/test';

export class LoginPage {
  // Locators
  public readonly emailLocator: Locator;
  public readonly passwordLocator: Locator;
  public readonly signInButtonLocator: Locator;

  constructor(private readonly page: Page) {
    this.emailLocator = page.getByRole('textbox', { name: 'Email' });
    this.passwordLocator = page.getByRole('textbox', { name: 'Password' });
    this.signInButtonLocator = page.getByRole('button', { name: 'Sign in' });
  }

  // Reusable login method
  async login(email: string, password: string) {
    await this.emailLocator.fill(email);
    await this.passwordLocator.fill(password);
    await this.signInButtonLocator.click();
  }
}
```

### Usage in Tests
```typescript
// test.spec.ts
import { test, expect } from '../../page-objects/fixtures';

// Test steps
test('Should login using POM', async ({ page, loginPage }) => {
  await page.goto('http://binaryville.com/account');

  await loginPage.login('john.doe@example.com', 'password123');

  expect(page.url()).toContain('password123');
});
``` 


### Best Practices
1. Single Responsibility
- Each POM should represent a single page or component
- Keep page-specific logic encapsulated
2. Reusable Methods
- Create methods for common actions
- Keep methods focused and small
- Return this for method chaining when appropriate
3. Locator Strategy
- Use role-based locators when possible
- Keep locators public for flexibility
- Avoid direct page access in tests when possible
4. No Assertions
- Keep assertions in test files
- Return values for assertions when needed
5. Component Objects
- Create separate classes for reusable components
- Compose page objects from component objects

### Project Structure

```
tests/
└── POM/
    └── test.spec.ts      # Test files
page-objects/
  ├── login-page.pom.ts   # Page Object classes
  └── components/        # Reusable components
```

### Benefits
- Reduces code duplication
- Improves maintainability
- Makes tests more readable
- Easier to update and maintain
- Improves test organization

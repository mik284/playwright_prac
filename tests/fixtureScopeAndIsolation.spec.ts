import { test as base } from "@playwright/test";

let counter = 0;

const test = base.extend<{ counterFixture: number }>({
  counterFixture: [
    async ({}, use) => {
      counter++;
      await use(counter);
    },
    { scope: "test" }, // Test scope creates a new fixture for each test while worker scope creates a single fixture for all tests
  ],
});

test("test 1", async ({ counterFixture }) => {
  console.log(`test 1 Counter: ${counterFixture}`);
});

test("test 2", async ({ counterFixture }) => {
  console.log(`test 2 Counter: ${counterFixture}`);
});

test("test 3", async ({ counterFixture }) => {
  console.log(`test 3 Counter: ${counterFixture}`);
});
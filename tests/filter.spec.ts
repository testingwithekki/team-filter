import { expect, test } from '@playwright/test';

const todoUrl = 'https://demo.playwright.dev/todomvc/';

test.beforeEach(async ({ page }) => {
  await page.goto(todoUrl);
  const input = page.getByPlaceholder('What needs to be done?');
  await expect(input).toBeVisible();

  await input.fill('Open task');
  await input.press('Enter');
  await input.fill('Finished task');
  await input.press('Enter');
  await page.locator('.todo-list li').nth(1).locator('.toggle').check();
});

test('shows only active todos', async ({ page }) => {
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.locator('.todo-list li')).toHaveText('Open task');
});

test('shows only completed todos', async ({ page }) => {
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.locator('.todo-list li')).toHaveText('Finished task');
});

test('clears completed todos', async ({ page }) => {
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await expect(page.locator('.todo-list li')).toHaveText('Open task');
  await expect(page.locator('.todo-count')).toContainText('1 item left');
});

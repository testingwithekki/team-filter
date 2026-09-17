import { expect, test } from '@playwright/test';

test('renders search results', async ({ page }) => {
  await page.setContent('<h1>Search</h1><ul><li>Alpha</li><li>Beta</li></ul>');
  await expect(page.getByRole('heading', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(2);
});

test('filters results', async ({ page }) => {
  await page.setContent(`
    <input aria-label="Search" oninput="document.querySelector('#beta').hidden =
      !'beta'.includes(this.value.toLowerCase())" />
    <span id="beta">Beta</span>
  `);

  await page.getByRole('textbox', { name: 'Search' }).fill('gamma');
  await expect(page.locator('#beta')).toBeHidden();
});

test('clears the query', async ({ page }) => {
  await page.setContent('<input aria-label="Search" value="alpha" />');
  await page.getByRole('textbox', { name: 'Search' }).fill('');
  await expect(page.getByRole('textbox', { name: 'Search' })).toBeEmpty();
});

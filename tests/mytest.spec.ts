import { test, expect, Page } from '@playwright/test';

/**
 * Lab01 — UI automation tests for https://www.saucedemo.com
 *
 * Locator rules used in this file:
 *  - getByPlaceholder / getByRole / getByText / getByTestId (modern, user-facing locators)
 *  - NO XPath: XPath depends on the DOM structure, so a small layout change breaks it,
 *    and it does not describe what the user actually sees.
 *
 * Isolation: Playwright gives every test a brand-new browser context
 * (fresh cookies + localStorage), so no test depends on another one.
 */

// Test data (saucedemo's public demo accounts)
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

/** Helper: open the site and log in with the given credentials. */
async function login(page: Page, username: string, password: string) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

/** Helper: log out through the side menu and verify we are back on the login page. */
async function logout(page: Page) {
  // Open the burger menu
  await page.getByRole('button', { name: 'Open Menu' }).click();
  // Click "Logout" in the side menu (exposed with role="button" in the accessibility tree)
  await page.getByRole('button', { name: 'Logout' }).click();
  // After logout the Login button must be visible again and URL is the root
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
}

test.describe('Saucedemo login & cart', () => {
  test('1. амжилттай нэвтрэх (successful login)', async ({ page }) => {
    await login(page, USERNAME, PASSWORD);

    // URL changes to the inventory page
    await expect(page).toHaveURL(/inventory\.html/);
    // Page title "Products" is shown
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByTestId('title')).toHaveText('Products');
    // The product list contains 6 items
    await expect(page.getByTestId('inventory-item')).toHaveCount(6);

    // Finish the test cleanly
    await logout(page);
  });

  test('2. амжилтгүй нэвтрэх — буруу нууц үг (failed login)', async ({ page }) => {
    await login(page, USERNAME, 'wrong_password');

    // An error message must appear with the exact text
    const error = page.getByTestId('error');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
    // User stays on the login page (not redirected to inventory)
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    // Nothing to log out from — the user never logged in
  });

  test('3. бараа сагслах (add item to cart after login)', async ({ page }) => {
    await login(page, USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);

    // Add "Sauce Labs Backpack" to the cart
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

    // The button turns into "Remove" and the cart badge shows 1
    await expect(page.getByTestId('remove-sauce-labs-backpack')).toHaveText('Remove');
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    // Open the cart and check the item is there
    await page.getByTestId('shopping-cart-link').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByTestId('inventory-item')).toHaveCount(1);

    // Clean up: remove the item so the cart is empty again, then log out
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveCount(0);
    await logout(page);
  });

  test('4. locked_out_user нэвтэрч чадахгүй (locked user)', async ({ page }) => {
    await login(page, 'locked_out_user', PASSWORD);

    await expect(page.getByTestId('error')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});

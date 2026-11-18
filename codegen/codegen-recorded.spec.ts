// Codegen-ийн бичсэн ТҮҮХИЙ код (npx playwright codegen https://www.saucedemo.com).
// Гараар засаагүй — tests/mytest.spec.ts-тэй харьцуулах зорилгоор хадгалсан.
// Энэ файл codegen/ хавтаст байгаа тул 'npx playwright test' ажиллуулахгүй (testDir = ./tests).

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.getByText('$15.99Add to cart').first().click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').dblclick();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').dblclick();
  await page.locator('[data-test="secondary-header"]').dblclick();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="dynamic-catalog-sidebar-link"]').click();
  await page.locator('[data-test="dynamic-catalog-spinner-link"]').click();
  await page.locator('[data-test="dynamic-catalog-spinner-container"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="dynamic-catalog-sidebar-link"]').click();
  await page.locator('[data-test="dynamic-catalog-lazy-load-link"]').click();
  await page.locator('div').filter({ hasText: 'Swag Labs' }).nth(4).click();
  await page.locator('div').filter({ hasText: 'Swag Labs' }).nth(4).click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('odjduheuh');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('thediabdabdpa');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="login-password"]').click();
  await page.locator('[data-test="login-credentials"]').click({
    clickCount: 4
  });
  await page.locator('body').press('ControlOrMeta+c');
  await page.locator('div').nth(4).click();
  await page.locator('path').first().click();
  await page.locator('path').first().click();
  await page.locator('path').first().click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('div').nth(4).click();
  await page.locator('path').nth(1).click();
  await page.locator('[data-test="login-password"]').click();
  await page.locator('[data-test="login-password"]').click();
  await page.locator('[data-test="login-password"]').click();
  await page.locator('body').press('ControlOrMeta+c');
  await page.locator('path').nth(1).click();
  await page.locator('div').nth(4).click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.getByText('carry.allTheThings() with the').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').dblclick();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
});
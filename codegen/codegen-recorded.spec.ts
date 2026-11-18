// Codegen-ийн бичсэн ТҮҮХИЙ код (npx playwright codegen https://www.saucedemo.com).
// Гараар засаагүй — tests/mytest.spec.ts-тэй харьцуулах зорилгоор хадгалсан.
// Энэ файл codegen/ хавтаст байгаа тул 'npx playwright test' ажиллуулахгүй (testDir = ./tests).

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standart_username');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="password"]').press('Enter');
  await page.locator('[data-test="username"]').click();
});
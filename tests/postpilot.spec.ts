import { test, expect } from '@playwright/test';

// ─── PUBLIC PAGES ───────────────────────────────────────────────────────────

test('landing page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
});

test('pricing page loads', async ({ page }) => {
  await page.goto('/pricing');
  await expect(page.locator('body')).toBeVisible();
});

test('features page loads', async ({ page }) => {
  await page.goto('/features');
  await expect(page.locator('body')).toBeVisible();
});

test('blog page loads', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.locator('body')).toBeVisible();
});

// ─── LEGAL PAGES ────────────────────────────────────────────────────────────

test('terms page loads', async ({ page }) => {
  await page.goto('/terms');
  await expect(page.locator('body')).toBeVisible();
});

test('privacy page loads', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page.locator('body')).toBeVisible();
});

test('cookies page loads', async ({ page }) => {
  await page.goto('/cookies');
  await expect(page.locator('body')).toBeVisible();
});

// ─── AUTH ────────────────────────────────────────────────────────────────────

test('login page loads and has form', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('input[type="email"], input[type="text"]').first()).toBeVisible();
});

test('signup page loads', async ({ page }) => {
  await page.goto('/signup');
  await expect(page.locator('body')).toBeVisible();
});

// ─── AUTH PROTECTION ────────────────────────────────────────────────────────
// NOTE: Social accounts still being set up

test.skip('dashboard redirects when logged out', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/login|sign-in|auth/i);
});

test.skip('posts page redirects when logged out', async ({ page }) => {
  await page.goto('/posts');
  await expect(page).toHaveURL(/login|sign-in|auth/i);
});

test.skip('analytics page redirects when logged out', async ({ page }) => {
  await page.goto('/analytics');
  await expect(page).toHaveURL(/login|sign-in|auth/i);
});

test.skip('calendar page redirects when logged out', async ({ page }) => {
  await page.goto('/calendar');
  await expect(page).toHaveURL(/login|sign-in|auth/i);
});

test.skip('campaigns page redirects when logged out', async ({ page }) => {
  await page.goto('/campaigns');
  await expect(page).toHaveURL(/login|sign-in|auth/i);
});

test.skip('billing page redirects when logged out', async ({ page }) => {
  await page.goto('/billing');
  await expect(page).toHaveURL(/login|sign-in|auth/i);
});

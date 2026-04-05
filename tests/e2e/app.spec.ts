import { test, expect } from '@playwright/test';

test.describe('App Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');

    // Check we're on the health page
    await expect(page).toHaveTitle(/OpenHands Agent Server/);
    await expect(page.locator('h1').first()).toContainText('Server Health');

    // Navigate to conversations
    await page.click('text=Conversations');
    await expect(page.locator('h1').first()).toContainText('Conversations');

    // Navigate to settings
    await page.click('text=Settings');
    await expect(page.locator('h1').first()).toContainText('Settings');

    // Go back to health
    await page.click('text=Health');
    await expect(page.locator('h1').first()).toContainText('Server Health');
  });

  test('should show authentication status', async ({ page }) => {
    await page.goto('/');
    
    // Should show not authenticated by default
    await expect(page.locator('text=Not Authenticated')).toBeVisible();
  });
});

test.describe('Settings Page', () => {
  test('should save API configuration', async ({ page }) => {
    await page.goto('/settings');

    // Fill in base URL
    await page.fill('input[id="baseUrl"]', 'https://api.example.com');
    
    // Select bearer auth
    await page.selectOption('select[id="authType"]', 'bearer');
    
    // Fill in token
    await page.fill('input[id="bearerToken"]', 'test-token');
    
    // Save settings
    await page.click('text=Save Settings');
    
    // Check success message
    await expect(page.locator('text=Settings saved successfully')).toBeVisible();
  });
});

test.describe('Health Page', () => {
  test('should display health check sections', async ({ page }) => {
    await page.goto('/');

    // Check all sections are present
    await expect(page.locator('text=Alive Check')).toBeVisible();
    await expect(page.locator('text=Health Check')).toBeVisible();
    await expect(page.locator('text=Ready Check')).toBeVisible();
    await expect(page.locator('text=Server Information')).toBeVisible();
  });
});
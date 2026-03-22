import { test, expect } from '@playwright/test';

test.describe('OpenHands Dashboard E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses
    await page.route('**/server_info', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          version: '1.0.0',
          status: 'healthy',
          uptime: 3600,
        }),
      });
    });

    await page.route('**/api/conversations/search*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            {
              id: 'conv-1',
              status: 'active',
              created_at: new Date().toISOString(),
            },
            {
              id: 'conv-2',
              status: 'completed',
              created_at: new Date().toISOString(),
            },
          ],
          total: 2,
          page: 1,
          page_size: 20,
          total_pages: 1,
        }),
      });
    });

    await page.goto('http://localhost:3000');
  });

  test('should navigate through the application', async ({ page }) => {
    // Check dashboard loads
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('text=Online')).toBeVisible();

    // Navigate to conversations
    await page.click('text=Conversations');
    await expect(page.locator('h1')).toContainText('Conversations');
    
    // Check conversations table
    await expect(page.locator('text=conv-1')).toBeVisible();
    await expect(page.locator('text=conv-2')).toBeVisible();

    // Navigate to events
    await page.click('text=Events');
    await expect(page.locator('h1')).toContainText('Events');

    // Navigate to settings
    await page.click('text=Settings');
    await expect(page.locator('h1')).toContainText('Settings');

    // Go back to dashboard
    await page.click('text=Dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should toggle sidebar', async ({ page }) => {
    // Check sidebar is expanded
    await expect(page.locator('text=OpenHands')).toBeVisible();

    // Collapse sidebar
    await page.click('button:has-text("←")');
    await expect(page.locator('text=OpenHands')).not.toBeVisible();

    // Expand sidebar
    await page.click('button:has-text("→")');
    await expect(page.locator('text=OpenHands')).toBeVisible();
  });

  test('should search conversations', async ({ page }) => {
    await page.click('text=Conversations');
    
    // Type in search box
    await page.fill('input[placeholder="Search conversations..."]', 'test query');
    await page.press('input[placeholder="Search conversations..."]', 'Enter');

    // Check that search was triggered (would need to verify API call in real test)
    await expect(page.locator('input[placeholder="Search conversations..."]')).toHaveValue('test query');
  });

  test('should handle errors gracefully', async ({ page }) => {
    // Mock error response
    await page.route('**/server_info', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.reload();
    
    // Should show error message
    await expect(page.locator('text=Error')).toBeVisible();
  });
});
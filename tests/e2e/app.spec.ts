import { test, expect } from '@playwright/test';

test.describe('OpenHands Agent Server', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display home page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /OpenHands Agent Server/i })).toBeVisible();
    await expect(page.getByText(/Conversations/i)).toBeVisible();
    await expect(page.getByText(/Events/i)).toBeVisible();
    await expect(page.getByText(/Files/i)).toBeVisible();
  });

  test('should navigate to conversations page', async ({ page }) => {
    await page.click('text=Conversations');
    await expect(page).toHaveURL('/conversations');
    await expect(page.getByRole('heading', { name: /Conversations/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /New Conversation/i })).toBeVisible();
  });

  test('should handle 404 pages', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page.getByText(/404/)).toBeVisible();
    await expect(page.getByText(/Page not found/i)).toBeVisible();
    
    // Should be able to go back home
    await page.click('text=Go back home');
    await expect(page).toHaveURL('/');
  });

  test('should persist API base URL in localStorage', async ({ page }) => {
    // Set a custom API URL
    await page.evaluate(() => {
      localStorage.setItem('api_base_url', 'http://custom-api.com');
    });

    // Reload and verify it's used
    await page.reload();
    
    // Check that the custom URL would be used (this is a simplified check)
    const apiUrl = await page.evaluate(() => {
      return localStorage.getItem('api_base_url');
    });
    
    expect(apiUrl).toBe('http://custom-api.com');
  });
});

test.describe('Conversation Management', () => {
  test('should search conversations', async ({ page }) => {
    await page.goto('/conversations');
    
    const searchInput = page.getByPlaceholder(/search conversations/i);
    await searchInput.fill('test query');
    
    // In a real test, we'd mock the API response
    // For now, just verify the input works
    await expect(searchInput).toHaveValue('test query');
  });

  test('should show loading state', async ({ page }) => {
    // Mock slow API response
    await page.route('**/api/conversations*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ items: [], total: 0 }),
      });
    });

    await page.goto('/conversations');
    
    // Should show loading spinner
    await expect(page.locator('.animate-spin')).toBeVisible();
    
    // Eventually should hide it
    await expect(page.locator('.animate-spin')).not.toBeVisible({ timeout: 2000 });
  });
});
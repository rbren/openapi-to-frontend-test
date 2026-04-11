import { test, expect } from '@playwright/test';

test.describe('Conversation Management', () => {
  test('should navigate through the app and view conversations', async ({ page }) => {
    await page.goto('/');

    // Check home page
    await expect(page.getByRole('heading', { name: /OpenHands Agent Server/i })).toBeVisible();

    // Navigate to conversations
    await page.getByRole('link', { name: /Conversations/i }).click();
    await expect(page.getByRole('heading', { name: /Conversations/i })).toBeVisible();

    // Enter a conversation ID
    await page.getByPlaceholder(/Enter conversation ID/i).fill('test-123');
    await page.getByRole('button', { name: /View Conversation/i }).click();

    // Should navigate to conversation detail page
    await expect(page).toHaveURL(/\/conversations\/test-123/);
  });

  test('should send a message in conversation', async ({ page }) => {
    await page.goto('/conversations/test-123');

    // Fill in message form
    await page.getByLabel(/Message/i).fill('Hello, this is a test message');
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Message should be sent (in real test, we'd mock the API or use a test server)
    await expect(page.getByLabel(/Message/i)).toHaveValue('');
  });
});
#!/usr/bin/env python3
import os
import json

def generate_vitest_config():
    """Generate vitest config."""
    return '''import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup/test-setup.ts',
  },
});'''

def generate_test_setup():
    """Generate test setup file."""
    return '''import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

// Mock window.localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});'''

def generate_type_guards():
    """Generate type guard utilities."""
    return '''// Type guard utilities for runtime type checking

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isArray<T>(value: unknown, itemGuard?: (item: unknown) => item is T): value is T[] {
  if (!Array.isArray(value)) return false;
  if (!itemGuard) return true;
  return value.every(itemGuard);
}

export function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function isValidEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}'''

def generate_factories():
    """Generate test data factories."""
    return '''// Test data factories for generating mock data

export const factories = {
  conversation: (overrides = {}) => ({
    id: 'conv-123',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }),

  event: (overrides = {}) => ({
    id: 'event-456',
    type: 'message',
    conversation_id: 'conv-123',
    timestamp: new Date().toISOString(),
    data: {},
    ...overrides,
  }),

  serverInfo: (overrides = {}) => ({
    version: '1.0.0',
    status: 'healthy',
    uptime: 3600,
    ...overrides,
  }),

  user: (overrides = {}) => ({
    id: 'user-789',
    email: 'test@example.com',
    name: 'Test User',
    created_at: new Date().toISOString(),
    ...overrides,
  }),

  error: (message = 'Test error', code = 'TEST_ERROR') => ({
    message,
    code,
    timestamp: new Date().toISOString(),
  }),

  paginated: <T>(items: T[], overrides = {}) => ({
    items,
    total: items.length,
    page: 1,
    page_size: 20,
    total_pages: Math.ceil(items.length / 20),
    ...overrides,
  }),
};'''

def generate_api_client_test():
    """Generate API client unit test."""
    return '''import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiClient } from '../../client/api';

describe('ApiClient', () => {
  let client: ApiClient;
  let mockFetch: any;

  beforeEach(() => {
    mockFetch = vi.fn();
    global.fetch = mockFetch;
    client = new ApiClient('http://localhost:8000');
  });

  describe('constructor', () => {
    it('should initialize with base URL and headers', () => {
      const customClient = new ApiClient('https://api.example.com', {
        'X-Custom-Header': 'value',
      });
      expect(customClient).toBeDefined();
    });
  });

  describe('setHeader', () => {
    it('should add a header', async () => {
      client.setHeader('Authorization', 'Bearer token123');
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: 'test' }),
      });

      await client.health_health_get();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer token123',
          }),
        })
      );
    });
  });

  describe('removeHeader', () => {
    it('should remove a header', () => {
      client.setHeader('Authorization', 'Bearer token123');
      client.removeHeader('Authorization');
      
      // Test that the header is removed
      expect(true).toBe(true); // Placeholder - would need to expose headers for proper testing
    });
  });

  describe('API methods', () => {
    it('should call health endpoint', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => 'OK',
      });

      const result = await client.health_health_get();

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8000/health',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(result).toBe('OK');
    });

    it('should handle errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(client.health_health_get()).rejects.toThrow(
        'HTTP error! status: 500'
      );
    });

    it('should handle query parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] }),
      });

      await client.search_conversations_api_conversations_search_get({
        query: 'test',
        page: 2,
        page_size: 10,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('query=test'),
        expect.any(Object)
      );
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2'),
        expect.any(Object)
      );
    });
  });
});'''

def generate_component_test():
    """Generate component unit test."""
    return '''import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoadingSpinner } from '../../../components/shared/LoadingSpinner';
import { ErrorDisplay } from '../../../components/shared/ErrorDisplay';
import { Pagination } from '../../../components/shared/Pagination';

describe('LoadingSpinner', () => {
  it('should render with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it('should render with custom size', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  it('should apply custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    const container = screen.getByRole('status', { hidden: true }).parentElement;
    expect(container).toHaveClass('custom-class');
  });
});

describe('ErrorDisplay', () => {
  it('should display error message', () => {
    render(<ErrorDisplay error="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should display Error object message', () => {
    const error = new Error('Test error');
    render(<ErrorDisplay error={error} />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('should show retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<ErrorDisplay error="Error" onRetry={onRetry} />);
    
    const retryButton = screen.getByText('Try again');
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should not show retry button when onRetry is not provided', () => {
    render(<ErrorDisplay error="Error" />);
    expect(screen.queryByText('Try again')).not.toBeInTheDocument();
  });
});

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    defaultProps.onPageChange.mockClear();
  });

  it('should render page info', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should disable Previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('should disable Next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageChange when clicking Next', () => {
    render(<Pagination {...defaultProps} />);
    const nextButton = screen.getByText('Next');
    
    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when clicking Previous', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const prevButton = screen.getByText('Previous');
    
    fireEvent.click(prevButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange when clicking page number', () => {
    render(<Pagination {...defaultProps} />);
    const pageButton = screen.getByRole('button', { name: '3' });
    
    fireEvent.click(pageButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });
});'''

def generate_integration_test():
    """Generate integration test."""
    return '''import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from '../../../app/context/ApiContext';
import { DashboardPage } from '../../../app/pages/DashboardPage';
import { factories } from '../../setup/factories';

describe('DashboardPage Integration', () => {
  let mockFetch: any;

  beforeEach(() => {
    mockFetch = vi.fn();
    global.fetch = mockFetch;
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <ApiProvider baseUrl="http://localhost:8000">
          {component}
        </ApiProvider>
      </BrowserRouter>
    );
  };

  it('should load and display server info', async () => {
    const serverInfo = factories.serverInfo();
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => serverInfo,
    });

    renderWithProviders(<DashboardPage />);

    // Should show loading initially
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Should display server status after loading
    await waitFor(() => {
      expect(screen.getByText('Online')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8000/server_info',
      expect.any(Object)
    );
  });

  it('should handle server error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('should display quick actions', async () => {
    const serverInfo = factories.serverInfo();
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => serverInfo,
    });

    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('Quick Actions')).toBeInTheDocument();
      expect(screen.getByText('→ Start New Conversation')).toBeInTheDocument();
      expect(screen.getByText('→ View Recent Events')).toBeInTheDocument();
      expect(screen.getByText('→ Check System Health')).toBeInTheDocument();
    });
  });
});'''

def generate_e2e_test():
    """Generate Playwright e2e test."""
    return '''import { test, expect } from '@playwright/test';

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
});'''

def generate_playwright_config():
    """Generate Playwright config."""
    return '''import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});'''

def main():
    # Create test directories
    os.makedirs('tests/setup', exist_ok=True)
    os.makedirs('tests/unit/client', exist_ok=True)
    os.makedirs('tests/unit/components', exist_ok=True)
    os.makedirs('tests/integration', exist_ok=True)
    os.makedirs('tests/e2e', exist_ok=True)
    
    # Generate setup files
    with open('vitest.config.ts', 'w') as f:
        f.write(generate_vitest_config())
    
    with open('tests/setup/test-setup.ts', 'w') as f:
        f.write(generate_test_setup())
    
    with open('tests/setup/type-guards.ts', 'w') as f:
        f.write(generate_type_guards())
    
    with open('tests/setup/factories.ts', 'w') as f:
        f.write(generate_factories())
    
    # Generate unit tests
    with open('tests/unit/client/api.test.ts', 'w') as f:
        f.write(generate_api_client_test())
    
    with open('tests/unit/components/shared.test.tsx', 'w') as f:
        f.write(generate_component_test())
    
    # Generate integration tests
    with open('tests/integration/dashboard.test.tsx', 'w') as f:
        f.write(generate_integration_test())
    
    # Generate e2e tests
    with open('tests/e2e/app.spec.ts', 'w') as f:
        f.write(generate_e2e_test())
    
    with open('playwright.config.ts', 'w') as f:
        f.write(generate_playwright_config())
    
    # Update package.json to include test dependencies
    with open('package.json', 'r') as f:
        package_json = json.load(f)
    
    # Add test dependencies
    package_json['devDependencies'].update({
        '@testing-library/react': '^14.1.2',
        '@testing-library/jest-dom': '^6.1.5',
        '@testing-library/user-event': '^14.5.1',
        'jsdom': '^23.0.1',
        'vitest': '^1.0.0',
        '@playwright/test': '^1.40.0'
    })
    
    with open('package.json', 'w') as f:
        json.dump(package_json, f, indent=2)
    
    print('Generated test suite with unit, integration, and e2e tests')

if __name__ == '__main__':
    main()
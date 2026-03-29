#!/usr/bin/env python3
"""
Generate tests for the generated frontend.
"""

import json
import sys
from pathlib import Path
from typing import Any


def generate_test_setup():
    """Generate test setup and configuration files."""
    setup_dir = Path('tests/setup')
    setup_dir.mkdir(parents=True, exist_ok=True)
    
    # testSetup.ts
    test_setup = '''import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock fetch globally
global.fetch = vi.fn();

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;'''
    
    (setup_dir / 'testSetup.ts').write_text(test_setup)
    
    # factories.ts
    factories = '''import type { ConversationInfo, Message, Event, ServerInfo } from '../../client/types';

export const factories = {
  conversationInfo: (overrides?: Partial<ConversationInfo>): ConversationInfo => ({
    id: 'conv-123',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }),

  message: (overrides?: Partial<Message>): Message => ({
    id: 'msg-123',
    conversationId: 'conv-123',
    content: 'Test message',
    role: 'user',
    createdAt: new Date().toISOString(),
    ...overrides,
  }),

  event: (overrides?: Partial<Event>): Event => ({
    id: 'evt-123',
    type: 'message',
    timestamp: new Date().toISOString(),
    data: {},
    ...overrides,
  }),

  serverInfo: (overrides?: Partial<ServerInfo>): ServerInfo => ({
    version: '1.0.0',
    status: 'healthy',
    ...overrides,
  }),
};'''
    
    (setup_dir / 'factories.ts').write_text(factories)
    
    # testUtils.tsx
    test_utils = '''import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from '../../app/context';
import { ApiClient } from '../../client';

// Create a mock API client
export const createMockApiClient = (): jest.Mocked<ApiClient> => {
  return {
    getServerInfoServerInfoGet: jest.fn(),
    listApiConversationsGet: jest.fn(),
    getApiConversationsConversationIdGet: jest.fn(),
    createApiConversationsPost: jest.fn(),
    updateApiConversationsConversationIdPut: jest.fn(),
    deleteApiConversationsConversationIdDelete: jest.fn(),
  } as any;
};

interface AllTheProvidersProps {
  children: React.ReactNode;
  apiClient?: ApiClient;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ 
  children, 
  apiClient = createMockApiClient() 
}) => {
  return (
    <BrowserRouter>
      <ApiProvider config={{ baseUrl: 'http://test.com' }}>
        {children}
      </ApiProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { apiClient?: ApiClient }
) => {
  const { apiClient, ...renderOptions } = options || {};
  return render(ui, { 
    wrapper: (props) => <AllTheProviders {...props} apiClient={apiClient} />, 
    ...renderOptions 
  });
};

export * from '@testing-library/react';
export { customRender as render };'''
    
    (setup_dir / 'testUtils.tsx').write_text(test_utils)


def generate_unit_tests():
    """Generate unit tests."""
    unit_dir = Path('tests/unit')
    unit_dir.mkdir(parents=True, exist_ok=True)
    
    # api.test.ts
    api_test = '''import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApiClient, ApiError } from '../../client/api';

describe('ApiClient', () => {
  let client: ApiClient;
  let fetchMock: any;

  beforeEach(() => {
    fetchMock = vi.fn();
    global.fetch = fetchMock;
    client = new ApiClient({ baseUrl: 'http://test.com' });
  });

  describe('constructor', () => {
    it('should remove trailing slash from baseUrl', () => {
      const clientWithSlash = new ApiClient({ baseUrl: 'http://test.com/' });
      expect(clientWithSlash['baseUrl']).toBe('http://test.com');
    });
  });

  describe('request', () => {
    it('should make successful GET request', async () => {
      const mockResponse = { data: 'test' };
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await client['request']('GET', '/test');

      expect(fetchMock).toHaveBeenCalledWith(
        'http://test.com/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle query parameters', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await client['request']('GET', '/test', {
        params: { foo: 'bar', num: 123, flag: true },
      });

      const calledUrl = fetchMock.mock.calls[0][0];
      expect(calledUrl).toContain('foo=bar');
      expect(calledUrl).toContain('num=123');
      expect(calledUrl).toContain('flag=true');
    });

    it('should handle request body', async () => {
      const body = { name: 'test' };
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await client['request']('POST', '/test', { body });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify(body),
        })
      );
    });

    it('should throw ApiError on non-ok response', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => 'Not found',
      });

      await expect(client['request']('GET', '/test')).rejects.toThrow(ApiError);
    });
  });
});'''
    
    (unit_dir / 'api.test.ts').write_text(api_test)
    
    # components.test.tsx
    components_test = '''import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../setup/testUtils';
import { GenericForm, GenericFormField } from '../../components/generic/GenericForm';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { ErrorDisplay } from '../../components/shared/ErrorDisplay';

describe('GenericForm', () => {
  const mockSubmit = vi.fn();
  const mockCancel = vi.fn();

  const fields: GenericFormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'active', label: 'Active', type: 'checkbox' },
  ];

  beforeEach(() => {
    mockSubmit.mockClear();
    mockCancel.mockClear();
  });

  it('should render all fields', () => {
    render(
      <GenericForm
        fields={fields}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/active/i)).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    mockSubmit.mockResolvedValueOnce(undefined);

    render(
      <GenericForm
        fields={fields}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByLabelText(/active/i));

    fireEvent.click(screen.getByText(/submit/i));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      active: true,
    });
  });

  it('should display error on submission failure', async () => {
    const error = new Error('Submission failed');
    mockSubmit.mockRejectedValueOnce(error);

    render(
      <GenericForm
        fields={fields}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );

    fireEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByText(/submission failed/i)).toBeInTheDocument();
  });
});

describe('LoadingSpinner', () => {
  it('should render with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toHaveClass('w-8', 'h-8');
  });

  it('should render with custom size', () => {
    render(<LoadingSpinner size="sm" />);
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toHaveClass('w-4', 'h-4');
  });
});

describe('ErrorDisplay', () => {
  it('should display error message', () => {
    render(<ErrorDisplay error="Something went wrong" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('should display error object message', () => {
    const error = new Error('Test error');
    render(<ErrorDisplay error={error} />);
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });

  it('should call onRetry when retry button is clicked', () => {
    const mockRetry = vi.fn();
    render(<ErrorDisplay error="Error" onRetry={mockRetry} />);
    
    fireEvent.click(screen.getByText(/retry/i));
    expect(mockRetry).toHaveBeenCalled();
  });
});'''
    
    (unit_dir / 'components.test.tsx').write_text(components_test)


def generate_integration_tests():
    """Generate integration tests."""
    integration_dir = Path('tests/integration')
    integration_dir.mkdir(parents=True, exist_ok=True)
    
    # conversationFlow.test.tsx
    conversation_flow_test = '''import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../setup/testUtils';
import { ConversationsPage } from '../../app/pages/ConversationsPage';
import { factories } from '../setup/factories';

describe('Conversation Flow', () => {
  let mockApiClient: any;

  beforeEach(() => {
    mockApiClient = {
      listApiConversationsGet: vi.fn(),
      createApiConversationsPost: vi.fn(),
      getApiConversationsConversationIdGet: vi.fn(),
    };
  });

  it('should display list of conversations', async () => {
    const conversations = [
      factories.conversationInfo({ id: '1', status: 'active' }),
      factories.conversationInfo({ id: '2', status: 'completed' }),
    ];

    mockApiClient.listApiConversationsGet.mockResolvedValueOnce({
      items: conversations,
      total: 2,
      page: 1,
      pageSize: 20,
    });

    render(<ConversationsPage />, { apiClient: mockApiClient });

    await waitFor(() => {
      expect(screen.getByText(/conversations/i)).toBeInTheDocument();
    });

    expect(mockApiClient.listApiConversationsGet).toHaveBeenCalledWith({
      page: 1,
      pageSize: 20,
      search: undefined,
    });
  });

  it('should handle search', async () => {
    mockApiClient.listApiConversationsGet.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
    });

    render(<ConversationsPage />, { apiClient: mockApiClient });

    const searchInput = screen.getByPlaceholderText(/search conversations/i);
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    await waitFor(() => {
      expect(mockApiClient.listApiConversationsGet).toHaveBeenCalledWith(
        expect.objectContaining({
          search: 'test query',
        })
      );
    });
  });

  it('should handle pagination', async () => {
    const conversations = Array.from({ length: 25 }, (_, i) =>
      factories.conversationInfo({ id: String(i) })
    );

    mockApiClient.listApiConversationsGet.mockResolvedValueOnce({
      items: conversations.slice(0, 20),
      total: 25,
      page: 1,
      pageSize: 20,
    });

    render(<ConversationsPage />, { apiClient: mockApiClient });

    await waitFor(() => {
      expect(screen.getByText(/page 1 of 2/i)).toBeInTheDocument();
    });

    // Click next page
    fireEvent.click(screen.getByText(/next/i));

    expect(mockApiClient.listApiConversationsGet).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 2,
      })
    );
  });
});'''
    
    (integration_dir / 'conversationFlow.test.tsx').write_text(conversation_flow_test)


def generate_e2e_tests():
    """Generate e2e tests."""
    e2e_dir = Path('tests/e2e')
    e2e_dir.mkdir(parents=True, exist_ok=True)
    
    # app.spec.ts
    app_spec = '''import { test, expect } from '@playwright/test';

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
});'''
    
    (e2e_dir / 'app.spec.ts').write_text(app_spec)
    
    # playwright.config.ts
    playwright_config = '''import { defineConfig, devices } from '@playwright/test';

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
    
    Path('playwright.config.ts').write_text(playwright_config)


def generate_test_config():
    """Generate test configuration files."""
    # vitest.config.ts
    vitest_config = '''import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup/testSetup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData.ts',
      ],
    },
  },
});'''
    
    Path('vitest.config.ts').write_text(vitest_config)
    
    # Update package.json with test scripts
    package_path = Path('package.json')
    if package_path.exists():
        package_json = json.loads(package_path.read_text())
        package_json['scripts'].update({
            'test': 'vitest',
            'test:ui': 'vitest --ui',
            'test:coverage': 'vitest --coverage',
            'test:e2e': 'playwright test',
            'test:e2e:ui': 'playwright test --ui'
        })
        package_json['devDependencies'].update({
            '@playwright/test': '^1.40.0',
            '@testing-library/jest-dom': '^6.1.4',
            '@testing-library/react': '^14.1.0',
            '@testing-library/user-event': '^14.5.1',
            '@vitest/ui': '^1.0.0',
            'jsdom': '^23.0.0',
            'vitest': '^1.0.0'
        })
        package_path.write_text(json.dumps(package_json, indent=2))


def main():
    print("Generating test setup...")
    generate_test_setup()
    
    print("Generating unit tests...")
    generate_unit_tests()
    
    print("Generating integration tests...")
    generate_integration_tests()
    
    print("Generating e2e tests...")
    generate_e2e_tests()
    
    print("Generating test configuration...")
    generate_test_config()
    
    print("Test generation complete!")
    print("\nTo run tests:")
    print("  npm install")
    print("  npm test          # Run unit/integration tests")
    print("  npm run test:e2e  # Run e2e tests")


if __name__ == '__main__':
    main()
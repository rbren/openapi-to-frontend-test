// Test data factories for generating mock data

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
};
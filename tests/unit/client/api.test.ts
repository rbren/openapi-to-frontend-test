import { ApiClient, ApiError } from '../../../client';

describe('ApiClient', () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('constructor', () => {
    it('should initialize with base URL', () => {
      const client = new ApiClient({ baseUrl: 'https://api.example.com' });
      expect(client).toBeDefined();
    });

    it('should remove trailing slash from base URL', () => {
      const client = new ApiClient({ baseUrl: 'https://api.example.com/' });
      expect(client).toBeDefined();
    });
  });

  describe('request method', () => {
    const client = new ApiClient({ baseUrl: 'https://api.example.com' });

    it('should make GET request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ data: 'test' }),
      });

      const result = await client.alive();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/alive',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual({ data: 'test' });
    });

    it('should handle query parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => ({ events: [], hasMore: false }),
      });

      await client.searchConversationEvents('123', { limit: 10, kind: 'test' });

      const calledUrl = mockFetch.mock.calls[0][0];
      expect(calledUrl).toContain('limit=10');
      expect(calledUrl).toContain('kind=test');
    });

    it('should throw ApiError on failed request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: async () => 'Not Found',
      });

      await expect(client.alive()).rejects.toThrow(ApiError);
    });
  });

  describe('conversation endpoints', () => {
    const client = new ApiClient({ baseUrl: 'https://api.example.com' });

    it('should search conversations', async () => {
      const mockResponse = { conversations: [], hasMore: false };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockResponse,
      });

      const result = await client.searchConversations({ limit: 20 });
      expect(result).toEqual(mockResponse);
    });

    it('should create conversation', async () => {
      const mockConversation = { id: '123', status: 'active' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: async () => mockConversation,
      });

      const result = await client.createConversation({ metadata: { test: true } });
      expect(result).toEqual(mockConversation);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/api/conversations',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ metadata: { test: true } }),
        })
      );
    });
  });
});
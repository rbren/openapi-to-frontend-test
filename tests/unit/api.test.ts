import { describe, it, expect, beforeEach, vi } from 'vitest';
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
});
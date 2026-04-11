import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApiClient, ApiError } from '../../../client/api';
import { makeEvent, makeEventPage, makeServerInfo } from '../../setup/factories';

describe('ApiClient', () => {
  let client: ApiClient;
  const mockFetch = vi.mocked(global.fetch);

  beforeEach(() => {
    vi.clearAllMocks();
    client = new ApiClient({ baseUrl: 'https://api.example.com' });
  });

  describe('getServerInfoServerInfoGet', () => {
    it('should fetch server info', async () => {
      const serverInfo = makeServerInfo();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(serverInfo),
        text: () => Promise.resolve(JSON.stringify(serverInfo)),
      } as Response);

      const result = await client.getServerInfoServerInfoGet();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/server_info',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual(serverInfo);
    });
  });

  describe('searchConversationEventsApiConversationsConversationIdEventsSearchGet', () => {
    it('should search events with filters', async () => {
      const events = [makeEvent(), makeEvent()];
      const response = makeEventPage(events, 'next-page-123');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve(response),
        text: () => Promise.resolve(JSON.stringify(response)),
      } as Response);

      const result = await client.searchConversationEventsApiConversationsConversationIdEventsSearchGet(
        'conv-123',
        {
          kind: 'MessageEvent',
          source: 'user',
          limit: 20,
        }
      );

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/conversations/conv-123/events/search'),
        expect.any(Object)
      );
      
      const calledUrl = mockFetch.mock.calls[0][0] as string;
      expect(calledUrl).toContain('kind=MessageEvent');
      expect(calledUrl).toContain('source=user');
      expect(calledUrl).toContain('limit=20');
      
      expect(result.items).toHaveLength(2);
      expect(result.nextPageId).toBe('next-page-123');
    });
  });

  describe('sendMessageApiConversationsConversationIdEventsPost', () => {
    it('should send a message', async () => {
      const messageData = { message: 'Hello, agent!' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: () => Promise.resolve({}),
        text: () => Promise.resolve('{}'),
      } as Response);

      await client.sendMessageApiConversationsConversationIdEventsPost(
        'conv-123',
        messageData
      );

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/api/conversations/conv-123/events',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(messageData),
        })
      );
    });
  });

  describe('error handling', () => {
    it('should throw ApiError on 404', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        headers: new Headers({ 'content-type': 'text/plain' }),
        json: () => Promise.reject(new Error('Not found')),
        text: () => Promise.resolve('Not found'),
      } as Response);

      await expect(client.getServerInfoServerInfoGet()).rejects.toThrow(ApiError);
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(client.getServerInfoServerInfoGet()).rejects.toThrow('Network error');
    });
  });
});
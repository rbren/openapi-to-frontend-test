import { describe, it, expect, vi, beforeEach } from 'vitest';
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
});
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventList } from '../../../components/Event';
import { renderWithProviders } from '../../setup/testUtils';
import { makeEvent, makeEventPage } from '../../setup/factories';

const mockApiClient = {
  searchConversationEventsApiConversationsConversationIdEventsSearchGet: vi.fn(),
};

vi.mock('../../../app/context/ApiContext', () => ({
  useApiClient: () => mockApiClient,
}));

describe('EventList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state initially', () => {
    mockApiClient.searchConversationEventsApiConversationsConversationIdEventsSearchGet
      .mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithProviders(
      <EventList conversationId="conv-123" />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display events after loading', async () => {
    const events = [
      makeEvent({ kind: 'MessageEvent', data: { message: 'Hello' } }),
      makeEvent({ kind: 'ActionEvent', data: { action: 'click' } }),
    ];

    mockApiClient.searchConversationEventsApiConversationsConversationIdEventsSearchGet
      .mockResolvedValueOnce(makeEventPage(events));

    renderWithProviders(
      <EventList conversationId="conv-123" />
    );

    await waitFor(() => {
      expect(screen.getByText('MessageEvent')).toBeInTheDocument();
      expect(screen.getByText('ActionEvent')).toBeInTheDocument();
    });
  });

  it('should filter events', async () => {
    const events = [makeEvent()];
    mockApiClient.searchConversationEventsApiConversationsConversationIdEventsSearchGet
      .mockResolvedValue(makeEventPage(events));

    const user = userEvent.setup();
    
    renderWithProviders(
      <EventList conversationId="conv-123" />
    );

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('MessageEvent')).toBeInTheDocument();
    });

    // Apply filters
    const kindSelect = screen.getByRole('combobox', { name: /event types/i });
    await user.selectOptions(kindSelect, 'ActionEvent');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);

    await waitFor(() => {
      expect(mockApiClient.searchConversationEventsApiConversationsConversationIdEventsSearchGet)
        .toHaveBeenCalledWith(
          'conv-123',
          expect.objectContaining({
            kind: 'ActionEvent',
          })
        );
    });
  });

  it('should handle errors', async () => {
    mockApiClient.searchConversationEventsApiConversationsConversationIdEventsSearchGet
      .mockRejectedValueOnce(new Error('API Error'));

    renderWithProviders(
      <EventList conversationId="conv-123" />
    );

    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });

    // Test retry
    const retryButton = screen.getByRole('button', { name: /retry/i });
    await userEvent.click(retryButton);

    expect(mockApiClient.searchConversationEventsApiConversationsConversationIdEventsSearchGet)
      .toHaveBeenCalledTimes(2);
  });
});
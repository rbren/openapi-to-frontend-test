import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../app/App';
import { render } from '@testing-library/react';
import { makeEvent, makeEventPage } from '../setup/factories';

const mockFetch = vi.mocked(global.fetch);

describe('Conversation Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should allow viewing conversation events and sending messages', async () => {
    const user = userEvent.setup();

    // Mock initial server info request
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve({
        version: '0.1.0',
        agentClass: 'TestAgent',
      }),
      text: () => Promise.resolve('{"version":"0.1.0"}'),
    } as Response);

    render(<App />);

    // Navigate to conversations
    const conversationsLink = screen.getByRole('link', { name: /conversations/i });
    await user.click(conversationsLink);

    // Enter conversation ID
    const input = screen.getByPlaceholderText(/enter conversation id/i);
    await user.type(input, 'test-conv-123');

    const viewButton = screen.getByRole('button', { name: /view conversation/i });
    await user.click(viewButton);

    // Mock events request
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve(makeEventPage([
        makeEvent({ data: { message: 'Hello from agent' } }),
      ])),
      text: () => Promise.resolve('{"items":[]}'),
    } as Response);

    await waitFor(() => {
      expect(window.location.href).toContain('/conversations/test-conv-123');
    });
  });
});
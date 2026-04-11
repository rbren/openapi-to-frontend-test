import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { ServerInfoDetail } from '../../../components/ServerInfo';
import { renderWithProviders } from '../../setup/testUtils';
import { makeServerInfo } from '../../setup/factories';

const mockApiClient = {
  getServerInfoServerInfoGet: vi.fn(),
};

vi.mock('../../../app/context/ApiContext', () => ({
  useApiClient: () => mockApiClient,
}));

describe('ServerInfoDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display server information', async () => {
    const serverInfo = makeServerInfo({
      version: '1.2.3',
      agentClass: 'MyAgent',
      agentScript: 'agent.py',
      agentId: 'agent-123',
    });

    mockApiClient.getServerInfoServerInfoGet.mockResolvedValueOnce(serverInfo);

    renderWithProviders(<ServerInfoDetail />);

    await waitFor(() => {
      expect(screen.getByText('1.2.3')).toBeInTheDocument();
      expect(screen.getByText('MyAgent')).toBeInTheDocument();
      expect(screen.getByText('agent.py')).toBeInTheDocument();
      expect(screen.getByText('agent-123')).toBeInTheDocument();
    });
  });

  it('should handle missing optional fields', async () => {
    const serverInfo = makeServerInfo({
      agentId: undefined,
    });

    mockApiClient.getServerInfoServerInfoGet.mockResolvedValueOnce(serverInfo);

    renderWithProviders(<ServerInfoDetail />);

    await waitFor(() => {
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });
});
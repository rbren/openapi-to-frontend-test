import { describe, it, expect, vi, beforeEach } from 'vitest';
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
});
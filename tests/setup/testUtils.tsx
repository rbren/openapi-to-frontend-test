import React from 'react';
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
export { customRender as render };
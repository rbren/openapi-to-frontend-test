import React, { createContext, useContext, useMemo } from 'react';
import { ApiClient, ApiConfig } from '../../client';

const ApiContext = createContext<ApiClient | null>(null);

export interface ApiProviderProps {
  config: ApiConfig;
  children: React.ReactNode;
}

export function ApiProvider({ config, children }: ApiProviderProps) {
  const client = useMemo(() => new ApiClient(config), [config]);

  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
}

export function useApiClient(): ApiClient {
  const client = useContext(ApiContext);
  if (!client) {
    throw new Error('useApiClient must be used within an ApiProvider');
  }
  return client;
}
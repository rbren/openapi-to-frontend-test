import React, { createContext, useContext, useMemo } from 'react';
import { ApiClient } from '../../client';

const ApiContext = createContext<ApiClient | null>(null);

export interface ApiProviderProps {
  baseUrl?: string;
  headers?: Record<string, string>;
  children: React.ReactNode;
}

export function ApiProvider({ baseUrl = '', headers = {}, children }: ApiProviderProps) {
  const client = useMemo(() => new ApiClient(baseUrl, headers), [baseUrl, headers]);

  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
}

export function useApiClient(): ApiClient {
  const client = useContext(ApiContext);
  if (!client) {
    throw new Error('useApiClient must be used within an ApiProvider');
  }
  return client;
}
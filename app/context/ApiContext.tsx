import React, { createContext, useContext, ReactNode } from 'react';
import { ApiClient, ApiConfig } from '../../client';

interface ApiContextValue {
  client: ApiClient;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

interface ApiProviderProps {
  config: ApiConfig;
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ config, children }) => {
  const client = new ApiClient(config);

  return (
    <ApiContext.Provider value={{ client }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiClient => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context.client;
};
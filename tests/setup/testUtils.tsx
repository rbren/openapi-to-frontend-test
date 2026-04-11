import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from '../../app/context/ApiContext';

export function renderWithProviders(
  ui: React.ReactElement,
  options?: {
    apiConfig?: { baseUrl: string };
  }
) {
  const apiConfig = options?.apiConfig || { baseUrl: 'https://api.test.com' };

  return render(
    <ApiProvider config={apiConfig}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </ApiProvider>
  );
}

export function mockApiResponse(data: any, options?: {
  status?: number;
  ok?: boolean;
  headers?: Record<string, string>;
}) {
  return {
    ok: options?.ok ?? true,
    status: options?.status ?? 200,
    headers: new Headers(options?.headers || { 'content-type': 'application/json' }),
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  };
}

export function mockApiError(status: number, message: string) {
  return {
    ok: false,
    status,
    headers: new Headers({ 'content-type': 'text/plain' }),
    json: () => Promise.reject(new Error(message)),
    text: () => Promise.resolve(message),
  };
}
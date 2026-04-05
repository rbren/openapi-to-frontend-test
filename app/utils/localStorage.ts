import { AuthConfig } from '../../client';

const AUTH_CONFIG_KEY = 'openhands_auth_config';
const API_BASE_URL_KEY = 'openhands_api_base_url';

export const saveAuthConfig = (auth: AuthConfig): void => {
  localStorage.setItem(AUTH_CONFIG_KEY, JSON.stringify(auth));
};

export const loadAuthConfig = (): AuthConfig | null => {
  const stored = localStorage.getItem(AUTH_CONFIG_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse stored auth config:', e);
    return null;
  }
};

export const clearAuthConfig = (): void => {
  localStorage.removeItem(AUTH_CONFIG_KEY);
};

export const saveApiBaseUrl = (url: string): void => {
  localStorage.setItem(API_BASE_URL_KEY, url);
};

export const loadApiBaseUrl = (): string => {
  return localStorage.getItem(API_BASE_URL_KEY) || window.location.origin;
};

export const clearApiBaseUrl = (): void => {
  localStorage.removeItem(API_BASE_URL_KEY);
};
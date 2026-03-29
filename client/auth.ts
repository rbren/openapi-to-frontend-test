/**
 * Authentication configuration for API client
 * DO NOT EDIT MANUALLY
 */

// Since no security schemes are defined in the OpenAPI spec,
// this file provides a minimal auth interface for future extension

export type AuthConfig = ApiKeyAuth | BearerAuth | OAuth2Auth;

export interface ApiKeyAuth {
  type: 'apiKey';
  key: string;
  location: 'header' | 'query';
  name: string;
}

export interface BearerAuth {
  type: 'bearer';
  token: string;
}

export interface OAuth2Auth {
  type: 'oauth2';
  clientId: string;
  redirectUri: string;
  scopes: string[];
  authorizationUrl: string;
  tokenUrl: string;
  token?: OAuthToken;
}

export interface OAuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export function attachAuth(
  headers: Record<string, string>,
  url: URL,
  auth: AuthConfig
): void {
  switch (auth.type) {
    case 'apiKey':
      if (auth.location === 'header') {
        headers[auth.name] = auth.key;
      } else {
        url.searchParams.set(auth.name, auth.key);
      }
      break;
    case 'bearer':
      headers['Authorization'] = `Bearer ${auth.token}`;
      break;
    case 'oauth2':
      if (auth.token?.accessToken) {
        headers['Authorization'] = `Bearer ${auth.token.accessToken}`;
      }
      break;
  }
}
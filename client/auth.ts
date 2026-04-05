// Generated authentication handlers from OpenAPI specification

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

// OAuth2 helpers
export class OAuth2Manager {
  private config: OAuth2Auth;
  private codeVerifier?: string;

  constructor(config: Omit<OAuth2Auth, 'type' | 'token'>) {
    this.config = { ...config, type: 'oauth2' };
  }

  getAuthorizationUrl(state?: string): string {
    this.codeVerifier = this.generateCodeVerifier();
    const codeChallenge = this.generateCodeChallenge(this.codeVerifier);

    const url = new URL(this.config.authorizationUrl);
    url.searchParams.set('client_id', this.config.clientId);
    url.searchParams.set('redirect_uri', this.config.redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', this.config.scopes.join(' '));
    url.searchParams.set('code_challenge', codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
    
    if (state) {
      url.searchParams.set('state', state);
    }

    return url.toString();
  }

  async exchangeCode(code: string): Promise<OAuthToken> {
    const response = await fetch(this.config.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.config.clientId,
        redirect_uri: this.config.redirectUri,
        code,
        code_verifier: this.codeVerifier || '',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to exchange code: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_in
        ? Date.now() + data.expires_in * 1000
        : undefined,
    };
  }

  async refreshToken(token: OAuthToken): Promise<OAuthToken> {
    if (!token.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(this.config.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.config.clientId,
        refresh_token: token.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || token.refreshToken,
      expiresAt: data.expires_in
        ? Date.now() + data.expires_in * 1000
        : undefined,
    };
  }

  isTokenExpired(token: OAuthToken): boolean {
    if (!token.expiresAt) {
      return false;
    }
    // Consider token expired 5 minutes before actual expiry
    return Date.now() >= token.expiresAt - 300000;
  }

  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return this.base64UrlEncode(array);
  }

  private generateCodeChallenge(verifier: string): string {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = crypto.subtle.digest('SHA-256', data);
    return hash.then((h) => this.base64UrlEncode(new Uint8Array(h))) as unknown as string;
  }

  private base64UrlEncode(array: Uint8Array): string {
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}
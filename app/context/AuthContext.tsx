import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthConfig, OAuth2Manager, OAuthToken } from '../../client';
import { loadAuthConfig, saveAuthConfig, clearAuthConfig } from '../utils/localStorage';

interface AuthContextValue {
  auth: AuthConfig | null;
  isAuthenticated: boolean;
  setAuth: (auth: AuthConfig | null) => void;
  logout: () => void;
  oauthManager?: OAuth2Manager;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuthState] = useState<AuthConfig | null>(null);
  const [oauthManager, setOAuthManager] = useState<OAuth2Manager>();

  useEffect(() => {
    // Load auth from localStorage on mount
    const savedAuth = loadAuthConfig();
    if (savedAuth) {
      setAuthState(savedAuth);
      
      if (savedAuth.type === 'oauth2') {
        const manager = new OAuth2Manager({
          clientId: savedAuth.clientId,
          redirectUri: savedAuth.redirectUri,
          scopes: savedAuth.scopes,
          authorizationUrl: savedAuth.authorizationUrl,
          tokenUrl: savedAuth.tokenUrl,
        });
        setOAuthManager(manager);
      }
    }
  }, []);

  const setAuth = (newAuth: AuthConfig | null) => {
    if (newAuth) {
      saveAuthConfig(newAuth);
      setAuthState(newAuth);
      
      if (newAuth.type === 'oauth2') {
        const manager = new OAuth2Manager({
          clientId: newAuth.clientId,
          redirectUri: newAuth.redirectUri,
          scopes: newAuth.scopes,
          authorizationUrl: newAuth.authorizationUrl,
          tokenUrl: newAuth.tokenUrl,
        });
        setOAuthManager(manager);
      }
    } else {
      clearAuthConfig();
      setAuthState(null);
      setOAuthManager(undefined);
    }
  };

  const logout = () => {
    clearAuthConfig();
    setAuthState(null);
    setOAuthManager(undefined);
  };

  const isAuthenticated = !!auth && (
    auth.type === 'apiKey' ? !!auth.key :
    auth.type === 'bearer' ? !!auth.token :
    auth.type === 'oauth2' ? !!auth.token?.accessToken :
    false
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        isAuthenticated,
        setAuth,
        logout,
        oauthManager,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
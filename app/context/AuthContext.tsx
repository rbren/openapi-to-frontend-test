import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthHandler } from '../../client';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

interface AuthContextValue extends AuthState {
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (credentials: any) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Implement actual login logic here
      setState(prev => ({ ...prev, isAuthenticated: true, isLoading: false }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isAuthenticated: false, 
        isLoading: false, 
        error: error as Error 
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setState({
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
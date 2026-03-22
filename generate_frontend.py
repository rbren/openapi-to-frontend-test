#!/usr/bin/env python3
import json
import os
from typing import Dict, Any, List

def analyze_api_purpose(spec: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze the API to determine the frontend style."""
    title = spec.get('info', {}).get('title', 'API')
    description = spec.get('info', {}).get('description', '')
    paths = spec.get('paths', {})
    
    # Count operation types
    operations = {'get': 0, 'post': 0, 'put': 0, 'patch': 0, 'delete': 0}
    resources = set()
    
    for path, methods in paths.items():
        parts = path.split('/')
        if len(parts) > 2:
            resources.add(parts[2])  # Typically /api/resource/...
        
        for method in operations:
            if method in methods:
                operations[method] += 1
    
    # Determine app type
    if 'agent' in title.lower() or 'conversation' in description.lower():
        return {
            'type': 'agent-dashboard',
            'title': 'OpenHands Agent Dashboard',
            'description': 'Manage conversations, events, and agent interactions',
            'resources': list(resources)
        }
    elif operations['post'] > 5 and operations['get'] > 5:
        return {
            'type': 'crud-dashboard',
            'title': title,
            'description': description,
            'resources': list(resources)
        }
    else:
        return {
            'type': 'read-dashboard',
            'title': title,
            'description': description,
            'resources': list(resources)
        }

def generate_api_context():
    """Generate API context provider."""
    return '''import React, { createContext, useContext, useMemo } from 'react';
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
}'''

def generate_auth_context():
    """Generate auth context provider."""
    return '''import React, { createContext, useContext, useState, useCallback } from 'react';
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
}'''

def generate_use_resource_hook():
    """Generate useResource hook."""
    return '''import { useState, useEffect, useCallback } from 'react';
import { useApiClient } from '../context/ApiContext';

export interface UseResourceOptions {
  autoFetch?: boolean;
}

export interface UseResourceResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useResource<T>(
  fetcher: (client: any) => Promise<T>,
  options: UseResourceOptions = {}
): UseResourceResult<T> {
  const { autoFetch = true } = options;
  const client = useApiClient();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher(client);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [client, fetcher]);

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [autoFetch, fetch]);

  return { data, isLoading, error, refetch: fetch };
}'''

def generate_use_pagination_hook():
    """Generate usePagination hook."""
    return '''import { useState, useCallback } from 'react';

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface UsePaginationResult extends PaginationState {
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (size: number) => void;
  setTotal: (total: number) => void;
}

export function usePagination(
  initialPage = 1,
  initialPageSize = 20
): UsePaginationResult {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / pageSize);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages || 1)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (hasNext) {
      setPage(page + 1);
    }
  }, [hasNext, page]);

  const prevPage = useCallback(() => {
    if (hasPrev) {
      setPage(page - 1);
    }
  }, [hasPrev, page]);

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size);
    setPage(1); // Reset to first page when changing page size
  }, []);

  return {
    page,
    pageSize,
    total,
    totalPages,
    hasNext,
    hasPrev,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    setTotal,
  };
}'''

def generate_local_storage_utils():
    """Generate localStorage utilities."""
    return '''// Local storage utilities for persisting UI state

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore errors (e.g., quota exceeded)
    }
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore errors
    }
  },

  clear(): void {
    try {
      window.localStorage.clear();
    } catch {
      // Ignore errors
    }
  },
};

// Specific storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  THEME: 'theme',
} as const;'''

def generate_layout_component():
    """Generate Layout component."""
    return '''import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { storage, STORAGE_KEYS } from './utils/localStorage';

export function Layout() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => storage.get(STORAGE_KEYS.SIDEBAR_COLLAPSED, false)
  );

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    storage.set(STORAGE_KEYS.SIDEBAR_COLLAPSED, newState);
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'Conversations', href: '/conversations', icon: '💬' },
    { name: 'Events', href: '/events', icon: '📊' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-semibold text-white">OpenHands</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                {!sidebarCollapsed && item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'pl-16' : 'pl-64'
        }`}
      >
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}'''

def generate_dashboard_page():
    """Generate Dashboard page."""
    return '''import React from 'react';
import { useResource } from '../hooks/useResource';
import { LoadingSpinner, ErrorDisplay } from '../../components/shared';

export function DashboardPage() {
  const { data: serverInfo, isLoading, error } = useResource(
    async (client) => client.get_server_info_server_info_get()
  );

  if (isLoading) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  if (error) {
    return <ErrorDisplay error={error} className="my-8" />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome to the OpenHands Agent Dashboard
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Server Info Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Server Status
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {serverInfo ? 'Online' : 'Offline'}
            </dd>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-3 space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                → Start New Conversation
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                → View Recent Events
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                → Check System Health
              </button>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Statistics</h3>
            <dl className="mt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Total Conversations</dt>
                <dd className="text-gray-900 font-medium">-</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Active Sessions</dt>
                <dd className="text-gray-900 font-medium">-</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Events Today</dt>
                <dd className="text-gray-900 font-medium">-</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}'''

def generate_conversations_page():
    """Generate Conversations page."""
    return '''import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResource } from '../hooks/useResource';
import { usePagination } from '../hooks/usePagination';
import { LoadingSpinner, ErrorDisplay } from '../../components/shared';

export function ConversationsPage() {
  const navigate = useNavigate();
  const pagination = usePagination();
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error, refetch } = useResource(
    async (client) => client.search_conversations_api_conversations_search_get({
      query: searchQuery || undefined,
      page: pagination.page,
      page_size: pagination.pageSize,
    })
  );

  const handleCreateNew = () => {
    // Navigate to create conversation page
    navigate('/conversations/new');
  };

  const handleRowClick = (conversationId: string) => {
    navigate(`/conversations/${conversationId}`);
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} className="my-8" />;
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>
          <p className="mt-2 text-gray-600">
            Manage and monitor agent conversations
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Conversation
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && refetch()}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      {/* Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.items?.map((conversation: any) => (
                    <tr
                      key={conversation.id}
                      onClick={() => handleRowClick(conversation.id)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {conversation.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {conversation.status || 'Active'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(conversation.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(conversation.id);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}'''

def generate_app_component():
    """Generate main App component."""
    return '''import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './Layout';
import { DashboardPage } from './pages/DashboardPage';
import { ConversationsPage } from './pages/ConversationsPage';
import { EventsPage } from './pages/EventsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  // Get API base URL from environment or use default
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  return (
    <ApiProvider baseUrl={apiBaseUrl}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route path="conversations" element={<ConversationsPage />} />
              <Route path="conversations/:id" element={<div>Conversation Detail</div>} />
              <Route path="events" element={<EventsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApiProvider>
  );
}'''

def generate_main_tsx():
    """Generate main.tsx entry point."""
    return '''import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);'''

def generate_index_css():
    """Generate index.css with Tailwind imports."""
    return '''@tailwind base;
@tailwind components;
@tailwind utilities;'''

def generate_vite_config():
    """Generate vite.config.ts."""
    return '''import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});'''

def generate_package_json():
    """Generate package.json."""
    return '''{
  "name": "openapi-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "@playwright/test": "^1.40.0"
  }
}'''

def generate_tsconfig():
    """Generate tsconfig.json."""
    return '''{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["app", "client", "components"],
  "references": [{ "path": "./tsconfig.node.json" }]
}'''

def generate_tailwind_config():
    """Generate tailwind.config.js."""
    return '''/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}'''

def main():
    # Read the OpenAPI spec
    with open('new-spec.json', 'r') as f:
        spec = json.load(f)
    
    # Analyze API purpose
    api_info = analyze_api_purpose(spec)
    print(f"Detected API type: {api_info['type']}")
    print(f"Title: {api_info['title']}")
    
    # Create app directories
    os.makedirs('app/context', exist_ok=True)
    os.makedirs('app/hooks', exist_ok=True)
    os.makedirs('app/utils', exist_ok=True)
    os.makedirs('app/pages', exist_ok=True)
    
    # Generate context providers
    with open('app/context/ApiContext.tsx', 'w') as f:
        f.write(generate_api_context())
    
    with open('app/context/AuthContext.tsx', 'w') as f:
        f.write(generate_auth_context())
    
    # Generate hooks
    with open('app/hooks/useResource.ts', 'w') as f:
        f.write(generate_use_resource_hook())
    
    with open('app/hooks/usePagination.ts', 'w') as f:
        f.write(generate_use_pagination_hook())
    
    # Generate utils
    with open('app/utils/localStorage.ts', 'w') as f:
        f.write(generate_local_storage_utils())
    
    # Generate Layout
    with open('app/Layout.tsx', 'w') as f:
        f.write(generate_layout_component())
    
    # Generate pages
    with open('app/pages/DashboardPage.tsx', 'w') as f:
        f.write(generate_dashboard_page())
    
    with open('app/pages/ConversationsPage.tsx', 'w') as f:
        f.write(generate_conversations_page())
    
    # Generate placeholder pages
    with open('app/pages/EventsPage.tsx', 'w') as f:
        f.write('''import React from 'react';

export function EventsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Events</h1>
      <p className="mt-2 text-gray-600">View and analyze agent events</p>
    </div>
  );
}''')
    
    with open('app/pages/SettingsPage.tsx', 'w') as f:
        f.write('''import React from 'react';

export function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <p className="mt-2 text-gray-600">Configure your application</p>
    </div>
  );
}''')
    
    # Generate App component
    with open('app/App.tsx', 'w') as f:
        f.write(generate_app_component())
    
    # Generate main.tsx
    with open('app/main.tsx', 'w') as f:
        f.write(generate_main_tsx())
    
    # Generate index.css
    with open('app/index.css', 'w') as f:
        f.write(generate_index_css())
    
    # Generate config files
    with open('vite.config.ts', 'w') as f:
        f.write(generate_vite_config())
    
    with open('package.json', 'w') as f:
        f.write(generate_package_json())
    
    with open('tsconfig.json', 'w') as f:
        f.write(generate_tsconfig())
    
    with open('tailwind.config.js', 'w') as f:
        f.write(generate_tailwind_config())
    
    # Generate index.html
    with open('index.html', 'w') as f:
        f.write('''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OpenHands Agent Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/app/main.tsx"></script>
  </body>
</html>''')
    
    print('Generated React frontend application')

if __name__ == '__main__':
    main()
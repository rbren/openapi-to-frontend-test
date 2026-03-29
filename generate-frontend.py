#!/usr/bin/env python3
"""
Generate React frontend application from parsed OpenAPI spec.
"""

import json
import sys
from pathlib import Path
from typing import Any, List


def analyze_api_purpose(spec_summary: dict[str, Any]) -> str:
    """Analyze the API to determine the frontend style."""
    title = spec_summary['info']['title']
    description = spec_summary['info']['description']
    
    # For OpenHands Agent Server, it's clearly an agent management system
    return "agent-management"


def generate_context_providers():
    """Generate React context providers."""
    context_dir = Path('app/context')
    context_dir.mkdir(parents=True, exist_ok=True)
    
    # ApiContext.tsx
    api_context = '''import React, { createContext, useContext, useMemo } from 'react';
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
}'''
    
    (context_dir / 'ApiContext.tsx').write_text(api_context)
    
    # index.ts
    index = '''export * from './ApiContext';'''
    
    (context_dir / 'index.ts').write_text(index)


def generate_hooks():
    """Generate custom React hooks."""
    hooks_dir = Path('app/hooks')
    hooks_dir.mkdir(parents=True, exist_ok=True)
    
    # useResource.ts
    use_resource = '''import { useState, useEffect, useCallback } from 'react';
import { useApiClient } from '../context';

export interface UseResourceOptions {
  autoFetch?: boolean;
}

export interface UseResourceResult<T> {
  data: T | null;
  loading: boolean;
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
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher(client);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [client, fetcher]);

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [fetch, autoFetch]);

  return { data, loading, error, refetch: fetch };
}'''
    
    (hooks_dir / 'useResource.ts').write_text(use_resource)
    
    # usePagination.ts
    use_pagination = '''import { useState, useCallback } from 'react';

export interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

export interface UsePaginationResult {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

export function usePagination(
  options: UsePaginationOptions = {}
): UsePaginationResult {
  const { initialPage = 1, initialPageSize = 20 } = options;
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const reset = useCallback(() => {
    setPage(initialPage);
    setPageSize(initialPageSize);
  }, [initialPage, initialPageSize]);

  return { page, pageSize, setPage, setPageSize, reset };
}'''
    
    (hooks_dir / 'usePagination.ts').write_text(use_pagination)
    
    # index.ts
    index = '''export * from './useResource';
export * from './usePagination';'''
    
    (hooks_dir / 'index.ts').write_text(index)


def generate_utils():
    """Generate utility functions."""
    utils_dir = Path('app/utils')
    utils_dir.mkdir(parents=True, exist_ok=True)
    
    # localStorage.ts
    local_storage = '''export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  },
};

// Specific storage keys
export const STORAGE_KEYS = {
  API_BASE_URL: 'api_base_url',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
} as const;'''
    
    (utils_dir / 'localStorage.ts').write_text(local_storage)
    
    # index.ts
    index = '''export * from './localStorage';'''
    
    (utils_dir / 'index.ts').write_text(index)


def generate_pages(spec_summary: dict[str, Any]):
    """Generate page components."""
    pages_dir = Path('app/pages')
    pages_dir.mkdir(parents=True, exist_ok=True)
    
    # HomePage.tsx
    home_page = '''import React from 'react';
import { Link } from 'react-router-dom';
import { useResource } from '../hooks';

export function HomePage() {
  const { data: serverInfo, loading, error } = useResource(
    (client) => client.getServerInfoServerInfoGet()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        OpenHands Agent Server
      </h1>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Failed to load server info: {error.message}</p>
        </div>
      )}

      {serverInfo && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Server Information</h2>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Version</dt>
              <dd className="mt-1 text-sm text-gray-900">{serverInfo.version || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </dd>
            </div>
          </dl>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/conversations"
          className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Conversations
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  Manage
                </dd>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/events"
          className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Events
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  View
                </dd>
              </div>
            </div>
          </div>
        </Link>

        <Link
          to="/files"
          className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Files
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  Browse
                </dd>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}'''
    
    (pages_dir / 'HomePage.tsx').write_text(home_page)
    
    # ConversationsPage.tsx
    conversations_page = '''import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResource, usePagination } from '../hooks';
import { ConversationList } from '../../components/ConversationInfo';
import { LoadingSpinner, ErrorDisplay } from '../../components/shared';

export function ConversationsPage() {
  const navigate = useNavigate();
  const { page, pageSize, setPage } = usePagination();
  const [search, setSearch] = useState('');

  const { data, loading, error, refetch } = useResource(
    (client) => client.listApiConversationsGet({ page, pageSize, search: search || undefined })
  );

  const handleConversationClick = (conversation: any) => {
    navigate(`/conversations/${conversation.id}`);
  };

  const handleCreateNew = () => {
    navigate('/conversations/new');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Conversations</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and monitor agent conversations
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleCreateNew}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            New Conversation
          </button>
        </div>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mt-8">
        {loading && <LoadingSpinner size="lg" className="py-12" />}
        {error && <ErrorDisplay error={error} onRetry={refetch} />}
        {data && (
          <ConversationList
            items={data.items || []}
            onItemClick={handleConversationClick}
            pagination={{
              page,
              pageSize,
              total: data.total || 0,
              onPageChange: setPage,
            }}
          />
        )}
      </div>
    </div>
  );
}'''
    
    (pages_dir / 'ConversationsPage.tsx').write_text(conversations_page)
    
    # NotFoundPage.tsx
    not_found_page = '''import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-lg text-gray-600">Page not found</p>
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}'''
    
    (pages_dir / 'NotFoundPage.tsx').write_text(not_found_page)
    
    # index.ts
    index = '''export * from './HomePage';
export * from './ConversationsPage';
export * from './NotFoundPage';'''
    
    (pages_dir / 'index.ts').write_text(index)


def generate_layout():
    """Generate the layout component."""
    layout = '''import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Conversations', href: '/conversations' },
  { name: 'Events', href: '/events' },
  { name: 'Files', href: '/files' },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">OpenHands</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href ||
                    (item.href !== '/' && location.pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}'''
    
    Path('app/Layout.tsx').write_text(layout)


def generate_app():
    """Generate the main App component."""
    app = '''import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApiProvider } from './context';
import { Layout } from './Layout';
import { HomePage, ConversationsPage, NotFoundPage } from './pages';
import { storage, STORAGE_KEYS } from './utils';

function App() {
  // Get API base URL from localStorage or use default
  const baseUrl = storage.get<string>(STORAGE_KEYS.API_BASE_URL) || 
    import.meta.env.VITE_API_BASE_URL || 
    'http://localhost:8000';

  return (
    <ApiProvider config={{ baseUrl }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="conversations" element={<ConversationsPage />} />
            <Route path="conversations/:id" element={<div>Conversation Detail (TODO)</div>} />
            <Route path="events" element={<div>Events Page (TODO)</div>} />
            <Route path="files" element={<div>Files Page (TODO)</div>} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;'''
    
    Path('app/App.tsx').write_text(app)


def generate_main():
    """Generate the main entry point."""
    main = '''import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);'''
    
    Path('app/main.tsx').write_text(main)
    
    # Generate index.css
    index_css = '''@tailwind base;
@tailwind components;
@tailwind utilities;'''
    
    Path('app/index.css').write_text(index_css)


def generate_config_files():
    """Generate configuration files."""
    # package.json
    package_json = '''{
  "name": "openapi-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
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
    "vite": "^5.0.0"
  }
}'''
    
    Path('package.json').write_text(package_json)
    
    # vite.config.ts
    vite_config = '''import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
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
    
    Path('vite.config.ts').write_text(vite_config)
    
    # tsconfig.json
    tsconfig = '''{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["app", "client", "components"],
  "references": [{ "path": "./tsconfig.node.json" }]
}'''
    
    Path('tsconfig.json').write_text(tsconfig)
    
    # tsconfig.node.json
    tsconfig_node = '''{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}'''
    
    Path('tsconfig.node.json').write_text(tsconfig_node)
    
    # tailwind.config.js
    tailwind_config = '''/** @type {import('tailwindcss').Config} */
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
    
    Path('tailwind.config.js').write_text(tailwind_config)
    
    # postcss.config.js
    postcss_config = '''export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}'''
    
    Path('postcss.config.js').write_text(postcss_config)
    
    # index.html
    index_html = '''<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OpenHands Agent Server</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/app/main.tsx"></script>
  </body>
</html>'''
    
    Path('index.html').write_text(index_html)


def main():
    # Load the parsed spec
    spec_path = Path('.generated/spec-summary.json')
    if not spec_path.exists():
        print("Error: spec-summary.json not found. Run parse-openapi.py first.", file=sys.stderr)
        sys.exit(1)
    
    with open(spec_path) as f:
        spec_summary = json.load(f)
    
    # Analyze API purpose
    api_purpose = analyze_api_purpose(spec_summary)
    print(f"Detected API purpose: {api_purpose}")
    
    # Generate frontend
    print("Generating context providers...")
    generate_context_providers()
    
    print("Generating hooks...")
    generate_hooks()
    
    print("Generating utils...")
    generate_utils()
    
    print("Generating pages...")
    generate_pages(spec_summary)
    
    print("Generating layout...")
    generate_layout()
    
    print("Generating app shell...")
    generate_app()
    generate_main()
    
    print("Generating config files...")
    generate_config_files()
    
    print("Frontend generation complete!")
    print("\nTo run the app:")
    print("  npm install")
    print("  npm run dev")


if __name__ == '__main__':
    main()
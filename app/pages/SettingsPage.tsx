import React, { useState } from 'react';
import { useAuth } from '../context';
import { AuthConfig } from '../../client';
import { loadApiBaseUrl, saveApiBaseUrl } from '../utils';

export const SettingsPage: React.FC = () => {
  const { auth, setAuth, logout } = useAuth();
  
  const [authType, setAuthType] = useState<'none' | 'apiKey' | 'bearer' | 'oauth2'>(
    auth?.type || 'none'
  );
  
  const [apiKeyConfig, setApiKeyConfig] = useState({
    key: auth?.type === 'apiKey' ? auth.key : '',
    location: (auth?.type === 'apiKey' ? auth.location : 'header') as 'header' | 'query',
    name: auth?.type === 'apiKey' ? auth.name : 'X-API-Key',
  });

  const [bearerConfig, setBearerConfig] = useState({
    token: auth?.type === 'bearer' ? auth.token : '',
  });

  const [oauth2Config, setOAuth2Config] = useState({
    clientId: auth?.type === 'oauth2' ? auth.clientId : '',
    redirectUri: auth?.type === 'oauth2' ? auth.redirectUri : window.location.origin + '/callback',
    scopes: auth?.type === 'oauth2' ? auth.scopes.join(' ') : 'read write',
    authorizationUrl: auth?.type === 'oauth2' ? auth.authorizationUrl : '',
    tokenUrl: auth?.type === 'oauth2' ? auth.tokenUrl : '',
  });

  const [baseUrl, setBaseUrl] = useState(loadApiBaseUrl());
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveAuth = () => {
    let newAuth: AuthConfig | null = null;

    switch (authType) {
      case 'apiKey':
        if (apiKeyConfig.key) {
          newAuth = {
            type: 'apiKey',
            key: apiKeyConfig.key,
            location: apiKeyConfig.location,
            name: apiKeyConfig.name,
          };
        }
        break;
      
      case 'bearer':
        if (bearerConfig.token) {
          newAuth = {
            type: 'bearer',
            token: bearerConfig.token,
          };
        }
        break;
      
      case 'oauth2':
        if (oauth2Config.clientId && oauth2Config.authorizationUrl && oauth2Config.tokenUrl) {
          newAuth = {
            type: 'oauth2',
            clientId: oauth2Config.clientId,
            redirectUri: oauth2Config.redirectUri,
            scopes: oauth2Config.scopes.split(' ').filter(s => s),
            authorizationUrl: oauth2Config.authorizationUrl,
            tokenUrl: oauth2Config.tokenUrl,
          };
        }
        break;
    }

    setAuth(newAuth);
    saveApiBaseUrl(baseUrl);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      {showSuccess && (
        <div className="mb-6 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">Settings saved successfully</p>
            </div>
          </div>
        </div>
      )}

      {/* API Base URL */}
      <div className="bg-white shadow sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">API Configuration</h2>
          <div>
            <label htmlFor="baseUrl" className="block text-sm font-medium text-gray-700">
              Base URL
            </label>
            <input
              type="text"
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="https://api.example.com"
            />
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Authentication</h2>
          
          <div className="mb-4">
            <label htmlFor="authType" className="block text-sm font-medium text-gray-700">
              Authentication Type
            </label>
            <select
              id="authType"
              value={authType}
              onChange={(e) => setAuthType(e.target.value as any)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="none">None</option>
              <option value="apiKey">API Key</option>
              <option value="bearer">Bearer Token</option>
              <option value="oauth2">OAuth 2.0</option>
            </select>
          </div>

          {/* API Key Configuration */}
          {authType === 'apiKey' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                  API Key
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKeyConfig.key}
                  onChange={(e) => setApiKeyConfig({ ...apiKeyConfig, key: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="your-api-key"
                />
              </div>
              <div>
                <label htmlFor="apiKeyLocation" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  id="apiKeyLocation"
                  value={apiKeyConfig.location}
                  onChange={(e) => setApiKeyConfig({ ...apiKeyConfig, location: e.target.value as 'header' | 'query' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="header">Header</option>
                  <option value="query">Query Parameter</option>
                </select>
              </div>
              <div>
                <label htmlFor="apiKeyName" className="block text-sm font-medium text-gray-700">
                  Parameter Name
                </label>
                <input
                  type="text"
                  id="apiKeyName"
                  value={apiKeyConfig.name}
                  onChange={(e) => setApiKeyConfig({ ...apiKeyConfig, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="X-API-Key"
                />
              </div>
            </div>
          )}

          {/* Bearer Token Configuration */}
          {authType === 'bearer' && (
            <div>
              <label htmlFor="bearerToken" className="block text-sm font-medium text-gray-700">
                Bearer Token
              </label>
              <input
                type="password"
                id="bearerToken"
                value={bearerConfig.token}
                onChange={(e) => setBearerConfig({ token: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="your-bearer-token"
              />
            </div>
          )}

          {/* OAuth2 Configuration */}
          {authType === 'oauth2' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
                  Client ID
                </label>
                <input
                  type="text"
                  id="clientId"
                  value={oauth2Config.clientId}
                  onChange={(e) => setOAuth2Config({ ...oauth2Config, clientId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="redirectUri" className="block text-sm font-medium text-gray-700">
                  Redirect URI
                </label>
                <input
                  type="text"
                  id="redirectUri"
                  value={oauth2Config.redirectUri}
                  onChange={(e) => setOAuth2Config({ ...oauth2Config, redirectUri: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="scopes" className="block text-sm font-medium text-gray-700">
                  Scopes (space-separated)
                </label>
                <input
                  type="text"
                  id="scopes"
                  value={oauth2Config.scopes}
                  onChange={(e) => setOAuth2Config({ ...oauth2Config, scopes: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="read write"
                />
              </div>
              <div>
                <label htmlFor="authUrl" className="block text-sm font-medium text-gray-700">
                  Authorization URL
                </label>
                <input
                  type="text"
                  id="authUrl"
                  value={oauth2Config.authorizationUrl}
                  onChange={(e) => setOAuth2Config({ ...oauth2Config, authorizationUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="tokenUrl" className="block text-sm font-medium text-gray-700">
                  Token URL
                </label>
                <input
                  type="text"
                  id="tokenUrl"
                  value={oauth2Config.tokenUrl}
                  onChange={(e) => setOAuth2Config({ ...oauth2Config, tokenUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleSaveAuth}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Settings
            </button>
            {auth && (
              <button
                onClick={logout}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear Authentication
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
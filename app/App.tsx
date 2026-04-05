import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApiProvider, AuthProvider } from './context';
import { Layout } from './Layout';
import { ConversationsPage, HealthPage, SettingsPage } from './pages';
import { loadApiBaseUrl } from './utils';

export const App: React.FC = () => {
  const baseUrl = loadApiBaseUrl();

  return (
    <Router>
      <AuthProvider>
        <ApiProvider config={{ baseUrl }}>
          <Layout>
            <Routes>
              <Route path="/" element={<HealthPage />} />
              <Route path="/conversations" element={<ConversationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </ApiProvider>
      </AuthProvider>
    </Router>
  );
};
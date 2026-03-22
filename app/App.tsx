import React from 'react';
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
}
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import { Layout } from './Layout';
import {
  HomePage,
  ConversationsPage,
  ConversationDetailPage,
  EventsPage,
} from './pages';

function App() {
  // Get API base URL from environment or default to local
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  
  const apiConfig = {
    baseUrl: apiBaseUrl,
  };

  return (
    <ApiProvider config={apiConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="conversations" element={<ConversationsPage />} />
            <Route path="conversations/:conversationId" element={<ConversationDetailPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
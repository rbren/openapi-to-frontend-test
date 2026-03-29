import React from 'react';
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

export default App;
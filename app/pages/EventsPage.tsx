import React, { useState } from 'react';
import { EventList } from '../../components/Event';

export function EventsPage() {
  const [conversationId, setConversationId] = useState<string>('');
  const [showEvents, setShowEvents] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (conversationId.trim()) {
      setShowEvents(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Events Search</h1>

      <form onSubmit={handleSearch} className="bg-white rounded-lg shadow p-6 mb-6">
        <label htmlFor="conversationId" className="block text-sm font-medium text-gray-700 mb-2">
          Conversation ID
        </label>
        <div className="flex gap-2">
          <input
            id="conversationId"
            type="text"
            value={conversationId}
            onChange={(e) => setConversationId(e.target.value)}
            placeholder="Enter conversation ID..."
            className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search Events
          </button>
        </div>
      </form>

      {showEvents && conversationId && (
        <EventList conversationId={conversationId} />
      )}
    </div>
  );
}
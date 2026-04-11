import React, { useState } from 'react';

export function ConversationsPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string>('');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Conversations</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">
          Enter a conversation ID to view its events and send messages.
        </p>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={selectedConversationId}
            onChange={(e) => setSelectedConversationId(e.target.value)}
            placeholder="Enter conversation ID..."
            className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              if (selectedConversationId) {
                window.location.href = `/conversations/${selectedConversationId}`;
              }
            }}
            disabled={!selectedConversationId}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View Conversation
          </button>
        </div>
      </div>
    </div>
  );
}
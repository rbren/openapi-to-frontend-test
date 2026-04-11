import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventList } from '../../components/Event';
import { ConversationMessageForm } from '../../components/Conversation';

export function ConversationDetailPage() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [refreshKey, setRefreshKey] = useState(0);

  if (!conversationId) {
    return <div className="p-6">Conversation ID required</div>;
  }

  const handleMessageSent = () => {
    // Trigger refresh of event list
    setRefreshKey(prev => prev + 1);
  };

  const handleEventSelect = (event: any) => {
    console.log('Selected event:', event);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Conversation Details</h1>
        <p className="text-gray-600">ID: {conversationId}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Events</h2>
          <EventList
            key={refreshKey}
            conversationId={conversationId}
            onSelect={handleEventSelect}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Send Message</h2>
          <ConversationMessageForm
            conversationId={conversationId}
            onSuccess={handleMessageSent}
            className="bg-white rounded-lg shadow p-6"
          />
        </div>
      </div>
    </div>
  );
}
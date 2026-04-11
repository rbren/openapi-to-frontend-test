import React, { useState } from 'react';
import { useApiClient } from '../../app/context/ApiContext';
import { ErrorDisplay } from '../shared/ErrorDisplay';

export interface ConversationMessageFormProps {
  conversationId: string;
  onSuccess?: () => void;
  className?: string;
}

export function ConversationMessageForm({ 
  conversationId, 
  onSuccess,
  className = '' 
}: ConversationMessageFormProps) {
  const client = useApiClient();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      await client.sendMessageApiConversationsConversationIdEventsPost(
        conversationId,
        { message: message.trim() }
      );
      setMessage('');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {error && <ErrorDisplay error={error} />}
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your message..."
          disabled={loading}
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}
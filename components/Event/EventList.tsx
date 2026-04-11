import React, { useEffect, useState, useCallback } from 'react';
import type { EventPage } from '../../client/types';
import { useApiClient } from '../../app/context/ApiContext';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorDisplay } from '../shared/ErrorDisplay';

export interface EventListProps {
  conversationId: string;
  onSelect?: (event: any) => void;
  className?: string;
}

export function EventList({ conversationId, onSelect, className = '' }: EventListProps) {
  const client = useApiClient();
  const [data, setData] = useState<EventPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState({
    kind: '',
    source: '',
    body: '',
  });

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.searchConversationEventsApiConversationsConversationIdEventsSearchGet(
        conversationId,
        {
          kind: filters.kind || undefined,
          source: filters.source || undefined,
          body: filters.body || undefined,
          limit: 20,
        }
      );
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [client, conversationId, filters]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents();
  };

  const loadMore = async () => {
    if (!data?.nextPageId) return;
    
    setLoading(true);
    try {
      const response = await client.searchConversationEventsApiConversationsConversationIdEventsSearchGet(
        conversationId,
        {
          pageId: data.nextPageId,
          kind: filters.kind || undefined,
          source: filters.source || undefined,
          body: filters.body || undefined,
          limit: 20,
        }
      );
      setData(prev => prev ? {
        ...response,
        items: [...prev.items, ...response.items]
      } : response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="px-6 py-4 border-b">
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="flex gap-2">
            <select
              name="kind"
              value={filters.kind}
              onChange={handleFilterChange}
              className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Event Types</option>
              <option value="ActionEvent">Action</option>
              <option value="MessageEvent">Message</option>
              <option value="AgentErrorEvent">Error</option>
            </select>
            <select
              name="source"
              value={filters.source}
              onChange={handleFilterChange}
              className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sources</option>
              <option value="agent">Agent</option>
              <option value="user">User</option>
              <option value="environment">Environment</option>
            </select>
          </div>
          <div className="flex gap-2">
            <input
              type="search"
              name="body"
              value={filters.body}
              onChange={handleFilterChange}
              placeholder="Search in message content..."
              className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {loading && !data ? (
        <LoadingSpinner className="py-8" />
      ) : error ? (
        <ErrorDisplay error={error} onRetry={fetchEvents} className="m-4" />
      ) : !data || data.items.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          No events found
        </div>
      ) : (
        <>
          <div className="divide-y">
            {data.items.map((event: any) => (
              <div
                key={event.id}
                onClick={() => onSelect?.(event)}
                className={`px-6 py-4 ${onSelect ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium">{event.kind}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      from {event.source}
                    </span>
                  </div>
                  <time className="text-sm text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </time>
                </div>
                {event.data && (
                  <p className="mt-1 text-sm text-gray-600 truncate">
                    {JSON.stringify(event.data).substring(0, 100)}...
                  </p>
                )}
              </div>
            ))}
          </div>
          
          {data.nextPageId && (
            <div className="px-6 py-4 border-t text-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
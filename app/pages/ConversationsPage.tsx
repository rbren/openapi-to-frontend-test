import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResource, usePagination } from '../hooks';
import { ConversationList } from '../../components/ConversationInfo';
import { LoadingSpinner, ErrorDisplay } from '../../components/shared';

export function ConversationsPage() {
  const navigate = useNavigate();
  const { page, pageSize, setPage } = usePagination();
  const [search, setSearch] = useState('');

  const { data, loading, error, refetch } = useResource(
    (client) => client.listApiConversationsGet({ page, pageSize, search: search || undefined })
  );

  const handleConversationClick = (conversation: any) => {
    navigate(`/conversations/${conversation.id}`);
  };

  const handleCreateNew = () => {
    navigate('/conversations/new');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Conversations</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and monitor agent conversations
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleCreateNew}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            New Conversation
          </button>
        </div>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mt-8">
        {loading && <LoadingSpinner size="lg" className="py-12" />}
        {error && <ErrorDisplay error={error} onRetry={refetch} />}
        {data && (
          <ConversationList
            items={data.items || []}
            onItemClick={handleConversationClick}
            pagination={{
              page,
              pageSize,
              total: data.total || 0,
              onPageChange: setPage,
            }}
          />
        )}
      </div>
    </div>
  );
}
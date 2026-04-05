import React, { useState, useCallback, useEffect } from 'react';
import { useApi, useAuth } from '../context';
import { useResource } from '../hooks';
import { ConversationList, ConversationDetail, ConversationForm, ErrorDisplay, Pagination } from '../../components';
import { Conversation, SearchConversationsParams } from '../../client';

export const ConversationsPage: React.FC = () => {
  const api = useApi();
  const { isAuthenticated } = useAuth();
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchConversationsParams>({
    limit: 20,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: conversationsPage,
    loading,
    error,
    refetch,
  } = useResource(
    useCallback(() => api.searchConversations(searchParams), [api, searchParams]),
    { autoFetch: isAuthenticated }
  );

  const conversations = conversationsPage?.conversations || [];
  const hasMore = conversationsPage?.hasMore || false;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real implementation, you'd update searchParams with page info
  };

  const handleCreate = async (data: any) => {
    try {
      await api.createConversation(data);
      setShowCreateForm(false);
      refetch();
    } catch (err) {
      console.error('Failed to create conversation:', err);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!selectedConversation) return;
    
    try {
      const updated = await api.updateConversation(selectedConversation.id, data);
      setSelectedConversation(updated);
      setShowEditForm(false);
      refetch();
    } catch (err) {
      console.error('Failed to update conversation:', err);
    }
  };

  const handleDelete = async () => {
    if (!selectedConversation) return;
    
    if (confirm('Are you sure you want to delete this conversation?')) {
      try {
        await api.deleteConversation(selectedConversation.id);
        setSelectedConversation(null);
        refetch();
      } catch (err) {
        console.error('Failed to delete conversation:', err);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please authenticate to view conversations</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          New Conversation
        </button>
      </div>

      {error && (
        <ErrorDisplay error={error} onRetry={refetch} className="mb-6" />
      )}

      {showCreateForm && (
        <div className="mb-8 bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Conversation</h2>
          <ConversationForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {showEditForm && selectedConversation && (
        <div className="mb-8 bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Edit Conversation</h2>
          <ConversationForm
            initialData={{
              status: selectedConversation.status,
              metadata: selectedConversation.metadata,
            }}
            onSubmit={handleUpdate}
            onCancel={() => setShowEditForm(false)}
            isEdit
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Conversations</h2>
              <ConversationList
                conversations={conversations}
                onSelect={setSelectedConversation}
                selectedId={selectedConversation?.id}
                loading={loading}
              />
              {conversations.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(conversations.length / 10)} // Simplified pagination
                  onPageChange={handlePageChange}
                  className="mt-4"
                />
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedConversation ? (
            <ConversationDetail
              conversation={selectedConversation}
              onEdit={() => setShowEditForm(true)}
              onDelete={handleDelete}
            />
          ) : (
            <div className="bg-white shadow sm:rounded-lg p-6">
              <p className="text-gray-500 text-center">
                Select a conversation from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
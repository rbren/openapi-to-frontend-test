import React from 'react';
import { Conversation } from '../../client';
import { LoadingSpinner } from '../shared';

interface ConversationDetailProps {
  conversation: Conversation | null;
  loading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export const ConversationDetail: React.FC<ConversationDetailProps> = ({
  conversation,
  loading = false,
  onEdit,
  onDelete,
  className = '',
}) => {
  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="text-center py-8 text-gray-500">
        No conversation selected
      </div>
    );
  }

  return (
    <div className={`bg-white shadow overflow-hidden sm:rounded-lg ${className}`}>
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Conversation Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {conversation.id}
          </p>
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">ID</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono">
              {conversation.id}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {conversation.status || 'Unknown'}
              </span>
            </dd>
          </div>
          {conversation.createdAt && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(conversation.createdAt).toLocaleString()}
              </dd>
            </div>
          )}
          {conversation.metadata && Object.keys(conversation.metadata).length > 0 && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Metadata</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                  {JSON.stringify(conversation.metadata, null, 2)}
                </pre>
              </dd>
            </div>
          )}
          {/* Display additional properties */}
          {Object.entries(conversation)
            .filter(([key]) => !['id', 'status', 'createdAt', 'metadata'].includes(key))
            .map(([key, value], index) => (
              <div
                key={key}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className="text-sm font-medium text-gray-500">{key}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {typeof value === 'object' ? (
                    <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : (
                    String(value)
                  )}
                </dd>
              </div>
            ))}
        </dl>
      </div>
    </div>
  );
};
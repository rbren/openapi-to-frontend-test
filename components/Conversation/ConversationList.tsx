import React from 'react';
import { Conversation } from '../../client';
import { LoadingSpinner } from '../shared';

interface ConversationListProps {
  conversations: Conversation[];
  onSelect?: (conversation: Conversation) => void;
  selectedId?: string;
  loading?: boolean;
  className?: string;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelect,
  selectedId,
  loading = false,
  className = '',
}) => {
  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No conversations found
      </div>
    );
  }

  return (
    <ul className={`divide-y divide-gray-200 ${className}`}>
      {conversations.map((conversation) => (
        <li
          key={conversation.id}
          className={`cursor-pointer hover:bg-gray-50 ${
            selectedId === conversation.id ? 'bg-blue-50' : ''
          }`}
          onClick={() => onSelect?.(conversation)}
        >
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {conversation.id}
                </p>
                <p className="text-sm text-gray-500">
                  Status: <span className="font-medium">{conversation.status || 'Unknown'}</span>
                </p>
                {conversation.createdAt && (
                  <p className="text-xs text-gray-400">
                    Created: {new Date(conversation.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="ml-2 flex-shrink-0">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {conversation.metadata && Object.keys(conversation.metadata).length > 0 && (
              <div className="mt-2 text-xs text-gray-600">
                <p className="font-medium">Metadata:</p>
                <pre className="mt-1 bg-gray-100 p-1 rounded overflow-x-auto">
                  {JSON.stringify(conversation.metadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
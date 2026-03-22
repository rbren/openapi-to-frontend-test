import React from 'react';
import { ActionEvent } from '../../client/types';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorDisplay } from '../shared/ErrorDisplay';

export interface ActioneventDetailProps {
  data: ActionEvent | null;
  isLoading?: boolean;
  error?: Error | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ActioneventDetail({
  data,
  isLoading = false,
  error = null,
  onEdit,
  onDelete,
}: ActioneventDetailProps) {
  if (isLoading) {
    return <LoadingSpinner size="lg" className="py-8" />;
  }

  if (error) {
    return <ErrorDisplay error={error} className="my-4" />;
  }

  if (!data) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Actionevent Details
        </h3>
        <div className="space-x-3">
          {onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        <dl className="divide-y divide-gray-200">
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

      <div>
        <dt className="text-sm font-medium text-gray-500">Id</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.id || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.timestamp || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Source</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.source || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Thought</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {data.thought && data.thought.length > 0 ? (
            <ul className="list-disc list-inside">
              {data.thought.map((item: any, index: number) => (
                <li key={index}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Reasoning Content</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.reasoning_content || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Thinking Blocks</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {data.thinking_blocks && data.thinking_blocks.length > 0 ? (
            <ul className="list-disc list-inside">
              {data.thinking_blocks.map((item: any, index: number) => (
                <li key={index}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Responses Reasoning Item</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.responses_reasoning_item || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Action</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.action || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Tool Name</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.tool_name || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Tool Call Id</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.tool_call_id || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Tool Call</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.tool_call || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Llm Response Id</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.llm_response_id || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Security Risk</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.security_risk || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Critic Result</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.critic_result || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Summary</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.summary || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Kind</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.kind || '-'}</dd>
      </div>
          </div>
        </dl>
      </div>
    </div>
  );
}
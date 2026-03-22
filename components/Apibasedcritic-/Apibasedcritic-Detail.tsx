import React from 'react';
import { APIBasedCritic-Output } from '../../client/types';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorDisplay } from '../shared/ErrorDisplay';

export interface Apibasedcritic-DetailProps {
  data: APIBasedCritic-Output | null;
  isLoading?: boolean;
  error?: Error | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function Apibasedcritic-Detail({
  data,
  isLoading = false,
  error = null,
  onEdit,
  onDelete,
}: Apibasedcritic-DetailProps) {
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
          Apibasedcritic- Details
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
        <dt className="text-sm font-medium text-gray-500">Server Url</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.server_url || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Api Key</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.api_key || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Model Name</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.model_name || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Tokenizer Name</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.tokenizer_name || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Pass Tools Definitions</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.pass_tools_definitions ? 'Yes' : 'No'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Timeout Seconds</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.timeout_seconds || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Has Success Label</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.has_success_label ? 'Yes' : 'No'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Sentiment Labels</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {data.sentiment_labels && data.sentiment_labels.length > 0 ? (
            <ul className="list-disc list-inside">
              {data.sentiment_labels.map((item: any, index: number) => (
                <li key={index}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Agent Issue Labels</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {data.agent_issue_labels && data.agent_issue_labels.length > 0 ? (
            <ul className="list-disc list-inside">
              {data.agent_issue_labels.map((item: any, index: number) => (
                <li key={index}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Infra Labels</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {data.infra_labels && data.infra_labels.length > 0 ? (
            <ul className="list-disc list-inside">
              {data.infra_labels.map((item: any, index: number) => (
                <li key={index}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">User Followup Labels</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {data.user_followup_labels && data.user_followup_labels.length > 0 ? (
            <ul className="list-disc list-inside">
              {data.user_followup_labels.map((item: any, index: number) => (
                <li key={index}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Sentiment Map</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.sentiment_map || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Mode</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.mode || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Iterative Refinement</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.iterative_refinement || '-'}</dd>
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
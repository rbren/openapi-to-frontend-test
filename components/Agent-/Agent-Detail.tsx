import React from 'react';
import { Agent-Output } from '../../client/types';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorDisplay } from '../shared/ErrorDisplay';

export interface Agent-DetailProps {
  data: Agent-Output | null;
  isLoading?: boolean;
  error?: Error | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function Agent-Detail({
  data,
  isLoading = false,
  error = null,
  onEdit,
  onDelete,
}: Agent-DetailProps) {
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
          Agent- Details
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
        <dt className="text-sm font-medium text-gray-500">Llm</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.llm || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Tools</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {data.tools && data.tools.length > 0 ? (
            <ul className="list-disc list-inside">
              {data.tools.map((item: any, index: number) => (
                <li key={index}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Mcp Config</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.mcp_config || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Filter Tools Regex</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.filter_tools_regex || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Include Default Tools</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {data.include_default_tools && data.include_default_tools.length > 0 ? (
            <ul className="list-disc list-inside">
              {data.include_default_tools.map((item: any, index: number) => (
                <li key={index}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Agent Context</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.agent_context || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">System Prompt Filename</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.system_prompt_filename || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Security Policy Filename</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.security_policy_filename || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">System Prompt Kwargs</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.system_prompt_kwargs || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Condenser</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.condenser || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Critic</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.critic || '-'}</dd>
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
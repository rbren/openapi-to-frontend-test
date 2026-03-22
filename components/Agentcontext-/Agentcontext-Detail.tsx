import React from 'react';
import { AgentContext-Output } from '../../client/types';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorDisplay } from '../shared/ErrorDisplay';

export interface Agentcontext-DetailProps {
  data: AgentContext-Output | null;
  isLoading?: boolean;
  error?: Error | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function Agentcontext-Detail({
  data,
  isLoading = false,
  error = null,
  onEdit,
  onDelete,
}: Agentcontext-DetailProps) {
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
          Agentcontext- Details
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
        <dt className="text-sm font-medium text-gray-500">Skills</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {data.skills && data.skills.length > 0 ? (
            <ul className="list-disc list-inside">
              {data.skills.map((item: any, index: number) => (
                <li key={index}>{String(item)}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">System Message Suffix</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.system_message_suffix || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">User Message Suffix</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.user_message_suffix || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Load User Skills</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.load_user_skills ? 'Yes' : 'No'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Load Public Skills</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.load_public_skills ? 'Yes' : 'No'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Secrets</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.secrets || '-'}</dd>
      </div>
      <div>
        <dt className="text-sm font-medium text-gray-500">Current Datetime</dt>
        <dd className="mt-1 text-sm text-gray-900">{data.current_datetime || '-'}</dd>
      </div>
          </div>
        </dl>
      </div>
    </div>
  );
}
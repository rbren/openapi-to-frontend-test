import React from 'react';
import { useResource } from '../hooks/useResource';
import { LoadingSpinner, ErrorDisplay } from '../../components/shared';

export function DashboardPage() {
  const { data: serverInfo, isLoading, error } = useResource(
    async (client) => client.get_server_info_server_info_get()
  );

  if (isLoading) {
    return <LoadingSpinner size="lg" className="py-12" />;
  }

  if (error) {
    return <ErrorDisplay error={error} className="my-8" />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome to the OpenHands Agent Dashboard
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Server Info Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Server Status
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {serverInfo ? 'Online' : 'Offline'}
            </dd>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-3 space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                → Start New Conversation
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                → View Recent Events
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                → Check System Health
              </button>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Statistics</h3>
            <dl className="mt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Total Conversations</dt>
                <dd className="text-gray-900 font-medium">-</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Active Sessions</dt>
                <dd className="text-gray-900 font-medium">-</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Events Today</dt>
                <dd className="text-gray-900 font-medium">-</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
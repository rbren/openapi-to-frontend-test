import React, { useCallback } from 'react';
import { useApi } from '../context';
import { useResource } from '../hooks';
import { LoadingSpinner, ErrorDisplay } from '../../components';

export const HealthPage: React.FC = () => {
  const api = useApi();

  const {
    data: aliveData,
    loading: aliveLoading,
    error: aliveError,
    refetch: refetchAlive,
  } = useResource(
    useCallback(() => api.alive(), [api])
  );

  const {
    data: healthData,
    loading: healthLoading,
    error: healthError,
    refetch: refetchHealth,
  } = useResource(
    useCallback(() => api.health(), [api])
  );

  const {
    data: readyData,
    loading: readyLoading,
    error: readyError,
    refetch: refetchReady,
  } = useResource(
    useCallback(() => api.ready(), [api])
  );

  const {
    data: serverInfo,
    loading: infoLoading,
    error: infoError,
    refetch: refetchInfo,
  } = useResource(
    useCallback(() => api.getServerInfo(), [api])
  );

  const refetchAll = () => {
    refetchAlive();
    refetchHealth();
    refetchReady();
    refetchInfo();
  };

  const anyLoading = aliveLoading || healthLoading || readyLoading || infoLoading;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Server Health</h1>
        <button
          onClick={refetchAll}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Refresh All
        </button>
      </div>

      {anyLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alive Status */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Alive Check</h2>
          {aliveError ? (
            <ErrorDisplay error={aliveError} onRetry={refetchAlive} />
          ) : aliveLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-700 font-medium">Server is alive</span>
            </div>
          )}
        </div>

        {/* Health Status */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Health Check</h2>
          {healthError ? (
            <ErrorDisplay error={healthError} onRetry={refetchHealth} />
          ) : healthLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-green-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-700 font-medium">{healthData || 'Healthy'}</span>
            </div>
          )}
        </div>

        {/* Ready Status */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Ready Check</h2>
          {readyError ? (
            <ErrorDisplay error={readyError} onRetry={refetchReady} />
          ) : readyLoading ? (
            <LoadingSpinner />
          ) : (
            <div>
              <div className="flex items-center mb-2">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-green-700 font-medium">Server is ready</span>
              </div>
              {readyData && Object.keys(readyData).length > 0 && (
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(readyData, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Server Info */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Server Information</h2>
          {infoError ? (
            <ErrorDisplay error={infoError} onRetry={refetchInfo} />
          ) : infoLoading ? (
            <LoadingSpinner />
          ) : serverInfo ? (
            <div>
              <dl className="space-y-2">
                {serverInfo.id && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">ID</dt>
                    <dd className="text-sm text-gray-900 font-mono">{serverInfo.id}</dd>
                  </div>
                )}
                {serverInfo.hostDetails && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Host Details</dt>
                    <dd className="text-sm text-gray-900">{serverInfo.hostDetails}</dd>
                  </div>
                )}
              </dl>
              {Object.keys(serverInfo).length > 2 && (
                <details className="mt-4">
                  <summary className="text-sm font-medium text-gray-700 cursor-pointer">
                    More details
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                    {JSON.stringify(serverInfo, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No server information available</p>
          )}
        </div>
      </div>
    </div>
  );
};
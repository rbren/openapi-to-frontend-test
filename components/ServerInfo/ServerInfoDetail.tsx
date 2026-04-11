import React, { useEffect, useState } from 'react';
import type { ServerInfo } from '../../client/types';
import { useApiClient } from '../../app/context/ApiContext';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorDisplay } from '../shared/ErrorDisplay';

export interface ServerInfoDetailProps {
  className?: string;
}

export function ServerInfoDetail({ className = '' }: ServerInfoDetailProps) {
  const client = useApiClient();
  const [data, setData] = useState<ServerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServerInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.getServerInfoServerInfoGet();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServerInfo();
  }, []);

  if (loading) {
    return <LoadingSpinner className="py-8" />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchServerInfo} className="m-4" />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Server Information</h2>
      </div>
      <dl className="px-6 py-4 space-y-3">
        <div className="flex">
          <dt className="w-32 text-gray-500">Version</dt>
          <dd className="font-mono text-sm">{data.version || 'N/A'}</dd>
        </div>
        <div className="flex">
          <dt className="w-32 text-gray-500">Agent Class</dt>
          <dd>{data.agentClass || 'N/A'}</dd>
        </div>
        <div className="flex">
          <dt className="w-32 text-gray-500">Agent Script</dt>
          <dd className="font-mono text-sm">{data.agentScript || 'N/A'}</dd>
        </div>
        {data.agentId && (
          <div className="flex">
            <dt className="w-32 text-gray-500">Agent ID</dt>
            <dd className="font-mono text-sm">{data.agentId}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
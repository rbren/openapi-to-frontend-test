import { useState, useEffect, useCallback } from 'react';
import { useApiClient } from '../context';

export interface UseResourceOptions {
  autoFetch?: boolean;
}

export interface UseResourceResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useResource<T>(
  fetcher: (client: any) => Promise<T>,
  options: UseResourceOptions = {}
): UseResourceResult<T> {
  const { autoFetch = true } = options;
  const client = useApiClient();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher(client);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [client, fetcher]);

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [fetch, autoFetch]);

  return { data, loading, error, refetch: fetch };
}
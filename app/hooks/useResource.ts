import { useState, useEffect, useCallback } from 'react';
import { useApiClient } from '../context/ApiContext';

export interface UseResourceOptions {
  autoFetch?: boolean;
}

export interface UseResourceResult<T> {
  data: T | null;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher(client);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [client, fetcher]);

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [autoFetch, fetch]);

  return { data, isLoading, error, refetch: fetch };
}
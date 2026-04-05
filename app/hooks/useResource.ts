import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../../client';

interface UseResourceOptions {
  autoFetch?: boolean;
}

interface UseResourceReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetch: () => Promise<void>;
  refetch: () => Promise<void>;
  setData: (data: T | null) => void;
}

export function useResource<T>(
  fetchFn: () => Promise<T>,
  options: UseResourceOptions = {}
): UseResourceReturn<T> {
  const { autoFetch = true } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [autoFetch]); // Only re-run if autoFetch changes, not on every render

  return {
    data,
    loading,
    error,
    fetch,
    refetch: fetch,
    setData,
  };
}

export function useResourceList<T>(
  fetchFn: (params?: any) => Promise<{ items: T[]; total?: number }>,
  options: UseResourceOptions = {}
) {
  const [params, setParams] = useState<any>({});
  
  const wrappedFetchFn = useCallback(
    () => fetchFn(params),
    [fetchFn, params]
  );
  
  const resource = useResource(wrappedFetchFn, options);
  
  return {
    ...resource,
    params,
    setParams,
    items: resource.data?.items || [],
    total: resource.data?.total || 0,
  };
}
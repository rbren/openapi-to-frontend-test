import { useState, useEffect, useCallback } from 'react';

interface UseResourceOptions<T> {
  fetchFn: () => Promise<T>;
  deps?: unknown[];
}

interface UseResourceResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useResource<T>({
  fetchFn,
  deps = [],
}: UseResourceOptions<T>): UseResourceResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    fetch();
  }, [...deps, fetch]);

  return { data, loading, error, refetch: fetch };
}
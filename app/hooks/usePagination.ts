import { useState, useCallback } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

interface UsePaginationResult {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationOptions = {}): UsePaginationResult {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const reset = useCallback(() => setPage(initialPage), [initialPage]);

  return { page, pageSize, setPage, setPageSize, nextPage, prevPage, reset };
}
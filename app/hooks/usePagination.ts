import { useState, useCallback } from 'react';

export interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

export interface UsePaginationResult {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

export function usePagination(
  options: UsePaginationOptions = {}
): UsePaginationResult {
  const { initialPage = 1, initialPageSize = 20 } = options;
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const reset = useCallback(() => {
    setPage(initialPage);
    setPageSize(initialPageSize);
  }, [initialPage, initialPageSize]);

  return { page, pageSize, setPage, setPageSize, reset };
}
import { useState, useMemo } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  totalItems: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
  totalItems,
}: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * pageSize,
    [currentPage, pageSize]
  );

  const endIndex = useMemo(
    () => Math.min(startIndex + pageSize, totalItems),
    [startIndex, pageSize, totalItems]
  );

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setPageSize = (size: number) => {
    const validSize = Math.max(1, size);
    setPageSizeState(validSize);
    // Reset to first page when page size changes
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    canGoNext: currentPage < totalPages,
    canGoPrevious: currentPage > 1,
  };
}

// Hook for server-side pagination
interface UseServerPaginationOptions<T> {
  fetchFn: (page: number, pageSize: number) => Promise<{
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  }>;
  initialPage?: number;
  initialPageSize?: number;
}

export function useServerPagination<T>({
  fetchFn,
  initialPage = 1,
  initialPageSize = 10,
}: UseServerPaginationOptions<T>) {
  const [data, setData] = useState<{
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  }>({
    items: [],
    total: 0,
    page: initialPage,
    pageSize: initialPageSize,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPage = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn(page, pageSize);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  const pagination = usePagination({
    initialPage: data.page,
    initialPageSize: data.pageSize,
    totalItems: data.total,
  });

  const goToPage = (page: number) => {
    pagination.goToPage(page);
    fetchPage(page, pagination.pageSize);
  };

  const setPageSize = (size: number) => {
    pagination.setPageSize(size);
    fetchPage(1, size);
  };

  return {
    items: data.items,
    loading,
    error,
    ...pagination,
    goToPage,
    setPageSize,
    refresh: () => fetchPage(pagination.currentPage, pagination.pageSize),
  };
}
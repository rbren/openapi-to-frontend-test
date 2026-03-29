import React from 'react';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  className = '',
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${className}`}
    >
      <div className="text-sm text-gray-700">
        Showing {(page - 1) * pageSize + 1} to{' '}
        {Math.min(page * pageSize, total)} of {total} results
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!canGoPrev}
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="px-3 py-1">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!canGoNext}
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
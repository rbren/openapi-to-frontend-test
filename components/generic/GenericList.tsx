import React from 'react';
import { Pagination } from '../shared/Pagination';

export interface GenericListColumn {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

export interface GenericListProps<T = any> {
  items: T[];
  columns: GenericListColumn[];
  onItemClick?: (item: T) => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  className?: string;
}

export function GenericList<T = any>({
  items,
  columns,
  onItemClick,
  pagination,
  className = '',
}: GenericListProps<T>) {
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr
                key={index}
                onClick={() => onItemClick?.(item)}
                className={onItemClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.render
                      ? column.render((item as any)[column.key], item)
                      : (item as any)[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination
          {...pagination}
          className="border-t"
        />
      )}
    </div>
  );
}
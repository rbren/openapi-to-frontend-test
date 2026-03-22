import React from 'react';
import { APIBasedCritic-Output } from '../../client/types';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorDisplay } from '../shared/ErrorDisplay';
import { Pagination } from '../shared/Pagination';

export interface Apibasedcritic-ListProps {
  data: APIBasedCritic-Output[];
  isLoading?: boolean;
  error?: Error | null;
  onItemClick?: (item: APIBasedCritic-Output) => void;
  onAdd?: () => void;
  // Pagination
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Apibasedcritic-List({
  data,
  isLoading = false,
  error = null,
  onItemClick,
  onAdd,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: Apibasedcritic-ListProps) {
  if (isLoading) {
    return <LoadingSpinner size="lg" className="py-8" />;
  }

  if (error) {
    return <ErrorDisplay error={error} className="my-4" />;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Apibasedcritic- List
        </h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New
          </button>
        )}
      </div>
      <div className="border-t border-gray-200">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No items found
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>

              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Server Url
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Api Key
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tokenizer Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pass Tools Definitions
              </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={onItemClick ? "hover:bg-gray-50 cursor-pointer" : ""}
                    onClick={() => onItemClick?.(item)}
                  >

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.server_url || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.api_key || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.model_name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.tokenizer_name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.pass_tools_definitions || '-'}
                </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          onItemClick?.(item);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && onPageChange && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                className="px-4 py-3 border-t"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
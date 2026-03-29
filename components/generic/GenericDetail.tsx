import React from 'react';

export interface GenericDetailField {
  name: string;
  label: string;
  value: any;
  type?: 'text' | 'date' | 'boolean' | 'link' | 'list';
}

export interface GenericDetailProps {
  fields: GenericDetailField[];
  title?: string;
  className?: string;
}

export function GenericDetail({
  fields,
  title,
  className = '',
}: GenericDetailProps) {
  const renderValue = (field: GenericDetailField) => {
    if (field.value === null || field.value === undefined) {
      return <span className="text-gray-400">N/A</span>;
    }

    switch (field.type) {
      case 'date':
        return new Date(field.value).toLocaleString();
      
      case 'boolean':
        return field.value ? (
          <span className="text-green-600">Yes</span>
        ) : (
          <span className="text-red-600">No</span>
        );
      
      case 'link':
        return (
          <a
            href={field.value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {field.value}
          </a>
        );
      
      case 'list':
        return (
          <ul className="list-disc list-inside">
            {Array.isArray(field.value) ? (
              field.value.map((item, index) => (
                <li key={index}>{String(item)}</li>
              ))
            ) : (
              <li>{String(field.value)}</li>
            )}
          </ul>
        );
      
      default:
        return String(field.value);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      )}
      <dl className="divide-y divide-gray-200">
        {fields.map((field) => (
          <div
            key={field.name}
            className="px-6 py-4 grid grid-cols-3 gap-4"
          >
            <dt className="text-sm font-medium text-gray-500">
              {field.label}
            </dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {renderValue(field)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
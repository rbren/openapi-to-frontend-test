#!/usr/bin/env python3
"""
Generate React components from parsed OpenAPI spec.
"""

import json
import sys
from pathlib import Path
from typing import Any, List, Set


def snake_to_camel(name: str) -> str:
    """Convert snake_case to camelCase."""
    components = name.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])


def format_type_name(name: str) -> str:
    """Format a schema name for TypeScript."""
    # Remove special characters and ensure PascalCase
    name = name.replace('-', '_').replace('.', '_')
    parts = name.split('_')
    return ''.join(part.capitalize() for part in parts if part)


def get_field_input_type(field: dict[str, Any]) -> str:
    """Determine the appropriate input type for a field."""
    field_type = field.get('type', 'string')
    field_format = field.get('format', '')
    
    if field_type == 'string':
        if field_format == 'email':
            return 'email'
        elif field_format == 'password':
            return 'password'
        elif field_format == 'date':
            return 'date'
        elif field_format == 'date-time':
            return 'datetime-local'
        elif field_format == 'uri' or field_format == 'url':
            return 'url'
        elif 'enum' in field:
            return 'select'
        else:
            return 'text'
    elif field_type in ('integer', 'number'):
        return 'number'
    elif field_type == 'boolean':
        return 'checkbox'
    elif field_type == 'array':
        return 'array'
    else:
        return 'text'


def generate_shared_components():
    """Generate shared UI components."""
    # Create shared directory
    shared_dir = Path('components/shared')
    shared_dir.mkdir(parents=True, exist_ok=True)
    
    # LoadingSpinner.tsx
    loading_spinner = '''import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      />
    </div>
  );
}'''
    
    (shared_dir / 'LoadingSpinner.tsx').write_text(loading_spinner)
    
    # ErrorDisplay.tsx
    error_display = '''import React from 'react';

export interface ErrorDisplayProps {
  error: Error | string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorDisplay({
  error,
  onRetry,
  className = '',
}: ErrorDisplayProps) {
  const message = typeof error === 'string' ? error : error.message;

  return (
    <div
      className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-red-700">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Error</span>
      </div>
      <p className="mt-2 text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}'''
    
    (shared_dir / 'ErrorDisplay.tsx').write_text(error_display)
    
    # Pagination.tsx
    pagination = '''import React from 'react';

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
}'''
    
    (shared_dir / 'Pagination.tsx').write_text(pagination)
    
    # index.ts
    index = '''export * from './LoadingSpinner';
export * from './ErrorDisplay';
export * from './Pagination';'''
    
    (shared_dir / 'index.ts').write_text(index)


def generate_generic_form_component():
    """Generate a generic form component that can be used for any schema."""
    generic_form = '''import React, { useState, FormEvent } from 'react';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorDisplay } from '../shared/ErrorDisplay';

export interface GenericFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'select' | 'textarea';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export interface GenericFormProps<T = any> {
  fields: GenericFormField[];
  initialData?: Partial<T>;
  onSubmit: (data: T) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  className?: string;
}

export function GenericForm<T = any>({
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  className = '',
}: GenericFormProps<T>) {
  const [formData, setFormData] = useState<any>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData as T);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: GenericFormField) => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    switch (field.type) {
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            className={baseClasses}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder}
            rows={4}
            className={baseClasses}
          />
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={formData[field.name] || false}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        );
      
      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {error && <ErrorDisplay error={error} />}

      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className={`block text-sm font-medium mb-1 ${
              field.type === 'checkbox' ? 'flex items-center gap-2' : ''
            }`}
          >
            {field.type === 'checkbox' && renderField(field)}
            {field.label}
            {field.required && field.type !== 'checkbox' && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
          {field.type !== 'checkbox' && renderField(field)}
        </div>
      ))}

      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <LoadingSpinner size="sm" /> : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}'''
    
    generic_dir = Path('components/generic')
    generic_dir.mkdir(parents=True, exist_ok=True)
    (generic_dir / 'GenericForm.tsx').write_text(generic_form)
    
    # Generic Detail component
    generic_detail = '''import React from 'react';

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
}'''
    
    (generic_dir / 'GenericDetail.tsx').write_text(generic_detail)
    
    # Generic List component
    generic_list = '''import React from 'react';
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
}'''
    
    (generic_dir / 'GenericList.tsx').write_text(generic_list)
    
    # index.ts
    index = '''export * from './GenericForm';
export * from './GenericDetail';
export * from './GenericList';'''
    
    (generic_dir / 'index.ts').write_text(index)


def generate_sample_components(spec_summary: dict[str, Any]):
    """Generate sample components for key schemas."""
    # Select a few important schemas to generate as examples
    important_schemas = [
        'ConversationInfo',
        'Message',
        'Event',
        'ServerInfo',
        'TaskItem'
    ]
    
    for schema_name in important_schemas:
        schema = next((s for s in spec_summary['schemas'] if s['name'] == schema_name), None)
        if not schema:
            continue
        
        # Create component directory
        component_dir = Path(f'components/{schema_name}')
        component_dir.mkdir(parents=True, exist_ok=True)
        
        # Generate a wrapper component that uses the generic components
        wrapper = f'''import React from 'react';
import {{ GenericForm, GenericFormField }} from '../generic/GenericForm';
import {{ GenericDetail, GenericDetailField }} from '../generic/GenericDetail';
import {{ GenericList, GenericListColumn }} from '../generic/GenericList';
import type {{ {schema_name} }} from '../../client/types';

// Form fields configuration
const formFields: GenericFormField[] = [
{generate_form_fields_config(schema)}
];

// Detail fields configuration
const detailFields = (item: {schema_name}): GenericDetailField[] => [
{generate_detail_fields_config(schema)}
];

// List columns configuration
const listColumns: GenericListColumn[] = [
{generate_list_columns_config(schema)}
];

export interface {schema_name}FormProps {{
  initialData?: Partial<{schema_name}>;
  onSubmit: (data: {schema_name}) => Promise<void>;
  onCancel?: () => void;
}}

export function {schema_name}Form({{ initialData, onSubmit, onCancel }}: {schema_name}FormProps) {{
  return (
    <GenericForm<{schema_name}>
      fields={{formFields}}
      initialData={{initialData}}
      onSubmit={{onSubmit}}
      onCancel={{onCancel}}
      submitLabel="Save {schema_name}"
    />
  );
}}

export interface {schema_name}DetailProps {{
  item: {schema_name};
}}

export function {schema_name}Detail({{ item }}: {schema_name}DetailProps) {{
  return (
    <GenericDetail
      title="{schema_name} Details"
      fields={{detailFields(item)}}
    />
  );
}}

export interface {schema_name}ListProps {{
  items: {schema_name}[];
  onItemClick?: (item: {schema_name}) => void;
  pagination?: {{
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  }};
}}

export function {schema_name}List({{ items, onItemClick, pagination }}: {schema_name}ListProps) {{
  return (
    <GenericList<{schema_name}>
      items={{items}}
      columns={{listColumns}}
      onItemClick={{onItemClick}}
      pagination={{pagination}}
    />
  );
}}'''
        
        (component_dir / f'{schema_name}.tsx').write_text(wrapper)
        
        # Create index.ts
        index = f'''export * from './{schema_name}';'''
        (component_dir / 'index.ts').write_text(index)


def generate_form_fields_config(schema: dict[str, Any]) -> str:
    """Generate form fields configuration for a schema."""
    fields = []
    for field in schema.get('fields', [])[:5]:  # Limit to first 5 fields for simplicity
        field_name = snake_to_camel(field['name'])
        field_type = get_field_input_type(field)
        
        if field_type == 'select' and 'enum' in field:
            options = ', '.join([f"{{ value: '{v}', label: '{v}' }}" for v in field['enum']])
            fields.append(f"""  {{
    name: '{field_name}',
    label: '{field['name'].replace('_', ' ').title()}',
    type: 'select',
    required: {str(field.get('required', False)).lower()},
    options: [{options}]
  }}""")
        else:
            fields.append(f"""  {{
    name: '{field_name}',
    label: '{field['name'].replace('_', ' ').title()}',
    type: '{field_type}',
    required: {str(field.get('required', False)).lower()}
  }}""")
    
    return ',\n'.join(fields)


def generate_detail_fields_config(schema: dict[str, Any]) -> str:
    """Generate detail fields configuration for a schema."""
    fields = []
    for field in schema.get('fields', [])[:8]:  # Show more fields in detail view
        field_name = snake_to_camel(field['name'])
        field_type = 'text'
        
        if field.get('type') == 'boolean':
            field_type = 'boolean'
        elif field.get('format') in ('date', 'date-time'):
            field_type = 'date'
        
        fields.append(f"""  {{
    name: '{field_name}',
    label: '{field['name'].replace('_', ' ').title()}',
    value: item.{field_name},
    type: '{field_type}'
  }}""")
    
    return ',\n'.join(fields)


def generate_list_columns_config(schema: dict[str, Any]) -> str:
    """Generate list columns configuration for a schema."""
    columns = []
    for field in schema.get('fields', [])[:4]:  # Show first 4 fields in list
        field_name = snake_to_camel(field['name'])
        columns.append(f"""  {{
    key: '{field_name}',
    label: '{field['name'].replace('_', ' ').title()}'
  }}""")
    
    return ',\n'.join(columns)


def generate_components_index():
    """Generate the main components index file."""
    index_content = '''// Shared components
export * from './shared';

// Generic components
export * from './generic';

// Schema-specific components
export * from './ConversationInfo';
export * from './Message';
export * from './Event';
export * from './ServerInfo';
export * from './TaskItem';'''
    
    Path('components/index.ts').write_text(index_content)


def main():
    # Load the parsed spec
    spec_path = Path('.generated/spec-summary.json')
    if not spec_path.exists():
        print("Error: spec-summary.json not found. Run parse-openapi.py first.", file=sys.stderr)
        sys.exit(1)
    
    with open(spec_path) as f:
        spec_summary = json.load(f)
    
    # Generate components
    print("Generating shared components...")
    generate_shared_components()
    
    print("Generating generic components...")
    generate_generic_form_component()
    
    print("Generating sample schema components...")
    generate_sample_components(spec_summary)
    
    print("Generating components index...")
    generate_components_index()
    
    print(f"Generated components for {len(spec_summary['schemas'])} schemas")
    print("Note: Generic components are provided for flexibility. Specific components generated for key schemas.")


if __name__ == '__main__':
    main()
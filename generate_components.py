#!/usr/bin/env python3
import json
import os
import re
from typing import Dict, Any, List, Set

def sanitize_name(name: str) -> str:
    """Sanitize names to be valid TypeScript identifiers."""
    name = re.sub(r'[^a-zA-Z0-9_]', '_', name)
    if name and name[0].isdigit():
        name = '_' + name
    return name

def schema_to_component_name(schema_name: str) -> str:
    """Convert schema name to React component name."""
    # Remove common suffixes
    name = re.sub(r'(_Input|_Output|Input|Output)$', '', schema_name)
    # Ensure PascalCase
    parts = name.split('_')
    return ''.join(part.capitalize() for part in parts if part)

def get_form_fields(schema: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Extract form fields from a schema."""
    fields = []
    properties = schema.get('properties', {})
    required = set(schema.get('required', []))
    
    for prop_name, prop_schema in properties.items():
        # Skip read-only or system fields
        if prop_name in ['id', 'created_at', 'updated_at']:
            continue
            
        field = {
            'name': prop_name,
            'type': prop_schema.get('type', 'string'),
            'required': prop_name in required,
            'description': prop_schema.get('description', ''),
        }
        
        # Handle enums
        if 'enum' in prop_schema:
            field['enum'] = prop_schema['enum']
        
        # Handle arrays
        if field['type'] == 'array':
            items = prop_schema.get('items', {})
            field['itemType'] = items.get('type', 'string')
        
        fields.append(field)
    
    return fields

def generate_form_component(schema_name: str, schema: Dict[str, Any]) -> str:
    """Generate a Form component for a schema."""
    component_name = schema_to_component_name(schema_name)
    fields = get_form_fields(schema)
    
    # Generate form fields
    form_fields = []
    for field in fields:
        field_name = field['name']
        field_type = field['type']
        required = field['required']
        description = field['description']
        
        label = field_name.replace('_', ' ').title()
        
        if 'enum' in field:
            # Select field
            options = '\n'.join([f'            <option value="{val}">{val}</option>' for val in field['enum']])
            form_fields.append(f'''
      <div>
        <label htmlFor="{field_name}" className="block text-sm font-medium text-gray-700">
          {label}{' *' if required else ''}
        </label>
        {f'<p className="text-sm text-gray-500">{description}</p>' if description else ''}
        <select
          id="{field_name}"
          name="{field_name}"
          value={{formData.{field_name} || ''}}
          onChange={{handleChange}}
          {f'required' if required else ''}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select {label}</option>
{options}
        </select>
      </div>''')
        elif field_type == 'boolean':
            # Checkbox field
            form_fields.append(f'''
      <div className="flex items-center">
        <input
          id="{field_name}"
          name="{field_name}"
          type="checkbox"
          checked={{formData.{field_name} || false}}
          onChange={{handleChange}}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="{field_name}" className="ml-2 block text-sm text-gray-900">
          {label}
        </label>
        {f'<p className="ml-6 text-sm text-gray-500">{description}</p>' if description else ''}
      </div>''')
        elif field_type == 'number' or field_type == 'integer':
            # Number field
            form_fields.append(f'''
      <div>
        <label htmlFor="{field_name}" className="block text-sm font-medium text-gray-700">
          {label}{' *' if required else ''}
        </label>
        {f'<p className="text-sm text-gray-500">{description}</p>' if description else ''}
        <input
          type="number"
          id="{field_name}"
          name="{field_name}"
          value={{formData.{field_name} || ''}}
          onChange={{handleChange}}
          {f'required' if required else ''}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>''')
        else:
            # Text field (default)
            form_fields.append(f'''
      <div>
        <label htmlFor="{field_name}" className="block text-sm font-medium text-gray-700">
          {label}{' *' if required else ''}
        </label>
        {f'<p className="text-sm text-gray-500">{description}</p>' if description else ''}
        <input
          type="text"
          id="{field_name}"
          name="{field_name}"
          value={{formData.{field_name} || ''}}
          onChange={{handleChange}}
          {f'required' if required else ''}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>''')
    
    return f'''import React, {{ useState, ChangeEvent, FormEvent }} from 'react';
import {{ {schema_name} }} from '../../client/types';

export interface {component_name}FormProps {{
  initialData?: Partial<{schema_name}>;
  onSubmit: (data: {schema_name}) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}}

export function {component_name}Form({{
  initialData = {{}},
  onSubmit,
  onCancel,
  isLoading = false,
}}: {component_name}FormProps) {{
  const [formData, setFormData] = useState<Partial<{schema_name}>>(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {{
    const {{ name, value, type }} = e.target;
    
    if (type === 'checkbox') {{
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({{ ...prev, [name]: checked }}));
    }} else if (type === 'number') {{
      setFormData(prev => ({{ ...prev, [name]: value ? Number(value) : undefined }}));
    }} else {{
      setFormData(prev => ({{ ...prev, [name]: value }}));
    }}
  }};

  const handleSubmit = async (e: FormEvent) => {{
    e.preventDefault();
    await onSubmit(formData as {schema_name});
  }};

  return (
    <form onSubmit={{handleSubmit}} className="space-y-6">
{''.join(form_fields)}

      <div className="flex justify-end space-x-3">
        {{onCancel && (
          <button
            type="button"
            onClick={{onCancel}}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        )}}
        <button
          type="submit"
          disabled={{isLoading}}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{isLoading ? 'Saving...' : 'Save'}}
        </button>
      </div>
    </form>
  );
}}'''

def generate_detail_component(schema_name: str, schema: Dict[str, Any]) -> str:
    """Generate a Detail component for a schema."""
    component_name = schema_to_component_name(schema_name)
    properties = schema.get('properties', {})
    
    # Generate detail fields
    detail_fields = []
    for prop_name, prop_schema in properties.items():
        label = prop_name.replace('_', ' ').title()
        field_type = prop_schema.get('type', 'string')
        
        if field_type == 'boolean':
            detail_fields.append(f'''
      <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{{data.{prop_name} ? 'Yes' : 'No'}}</dd>
      </div>''')
        elif field_type == 'array':
            detail_fields.append(f'''
      <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {{data.{prop_name} && data.{prop_name}.length > 0 ? (
            <ul className="list-disc list-inside">
              {{data.{prop_name}.map((item: any, index: number) => (
                <li key={{index}}>{{String(item)}}</li>
              ))}}
            </ul>
          ) : (
            <span className="text-gray-400">None</span>
          )}}
        </dd>
      </div>''')
        else:
            detail_fields.append(f'''
      <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{{data.{prop_name} || '-'}}</dd>
      </div>''')
    
    return f'''import React from 'react';
import {{ {schema_name} }} from '../../client/types';
import {{ LoadingSpinner }} from '../shared/LoadingSpinner';
import {{ ErrorDisplay }} from '../shared/ErrorDisplay';

export interface {component_name}DetailProps {{
  data: {schema_name} | null;
  isLoading?: boolean;
  error?: Error | null;
  onEdit?: () => void;
  onDelete?: () => void;
}}

export function {component_name}Detail({{
  data,
  isLoading = false,
  error = null,
  onEdit,
  onDelete,
}}: {component_name}DetailProps) {{
  if (isLoading) {{
    return <LoadingSpinner size="lg" className="py-8" />;
  }}

  if (error) {{
    return <ErrorDisplay error={{error}} className="my-4" />;
  }}

  if (!data) {{
    return (
      <div className="text-center py-8 text-gray-500">
        No data available
      </div>
    );
  }}

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {component_name} Details
        </h3>
        <div className="space-x-3">
          {{onEdit && (
            <button
              onClick={{onEdit}}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
          )}}
          {{onDelete && (
            <button
              onClick={{onDelete}}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          )}}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
{''.join(detail_fields)}
          </div>
        </dl>
      </div>
    </div>
  );
}}'''

def generate_list_component(schema_name: str, schema: Dict[str, Any]) -> str:
    """Generate a List component for a schema."""
    component_name = schema_to_component_name(schema_name)
    properties = list(schema.get('properties', {}).keys())[:5]  # Show first 5 properties
    
    # Generate table headers and cells
    headers = []
    cells = []
    for prop_name in properties:
        label = prop_name.replace('_', ' ').title()
        headers.append(f'''
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {label}
              </th>''')
        cells.append(f'''
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{item.{prop_name} || '-'}}
                </td>''')
    
    return f'''import React from 'react';
import {{ {schema_name} }} from '../../client/types';
import {{ LoadingSpinner }} from '../shared/LoadingSpinner';
import {{ ErrorDisplay }} from '../shared/ErrorDisplay';
import {{ Pagination }} from '../shared/Pagination';

export interface {component_name}ListProps {{
  data: {schema_name}[];
  isLoading?: boolean;
  error?: Error | null;
  onItemClick?: (item: {schema_name}) => void;
  onAdd?: () => void;
  // Pagination
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}}

export function {component_name}List({{
  data,
  isLoading = false,
  error = null,
  onItemClick,
  onAdd,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}}: {component_name}ListProps) {{
  if (isLoading) {{
    return <LoadingSpinner size="lg" className="py-8" />;
  }}

  if (error) {{
    return <ErrorDisplay error={{error}} className="my-4" />;
  }}

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {component_name} List
        </h3>
        {{onAdd && (
          <button
            onClick={{onAdd}}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New
          </button>
        )}}
      </div>
      <div className="border-t border-gray-200">
        {{data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No items found
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
{''.join(headers)}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {{data.map((item, index) => (
                  <tr
                    key={{index}}
                    className={{onItemClick ? "hover:bg-gray-50 cursor-pointer" : ""}}
                    onClick={{() => onItemClick?.(item)}}
                  >
{''.join(cells)}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={{(e) => {{
                          e.stopPropagation();
                          onItemClick?.(item);
                        }}}}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}}
              </tbody>
            </table>
            {{totalPages > 1 && onPageChange && (
              <Pagination
                currentPage={{currentPage}}
                totalPages={{totalPages}}
                onPageChange={{onPageChange}}
                className="px-4 py-3 border-t"
              />
            )}}
          </>
        )}}
      </div>
    </div>
  );
}}'''

def generate_shared_components():
    """Generate shared components."""
    os.makedirs('components/shared', exist_ok=True)
    
    # LoadingSpinner
    with open('components/shared/LoadingSpinner.tsx', 'w') as f:
        f.write('''import React from 'react';

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
}''')
    
    # ErrorDisplay
    with open('components/shared/ErrorDisplay.tsx', 'w') as f:
        f.write('''import React from 'react';

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
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRetry}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}''')
    
    # Pagination
    with open('components/shared/Pagination.tsx', 'w') as f:
        f.write('''import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 2 && page <= currentPage + 2)
  );

  return (
    <nav
      className={`flex items-center justify-between ${className}`}
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div className="hidden md:flex mx-4 space-x-2">
          {showPages.map((page, index) => {
            const prevPage = showPages[index - 1];
            const showEllipsis = prevPage && page - prevPage > 1;

            return (
              <React.Fragment key={page}>
                {showEllipsis && (
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
                    ...
                  </span>
                )}
                <button
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                    page === currentPage
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              </React.Fragment>
            );
          })}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </nav>
  );
}''')
    
    # Shared index
    with open('components/shared/index.ts', 'w') as f:
        f.write('''export { LoadingSpinner } from './LoadingSpinner';
export { ErrorDisplay } from './ErrorDisplay';
export { Pagination } from './Pagination';''')

def main():
    # Read the OpenAPI spec
    with open('new-spec.json', 'r') as f:
        spec = json.load(f)
    
    # Extract schemas
    schemas = spec.get('components', {}).get('schemas', {})
    
    # Generate shared components first
    generate_shared_components()
    print('Generated shared components')
    
    # Track generated components
    generated_components = []
    
    # Generate components for each schema (limit to first 10 for demo)
    count = 0
    for schema_name, schema in sorted(schemas.items()):
        # Skip certain schemas
        if '_Input' in schema_name or '_Output' in schema_name:
            continue
        
        component_name = schema_to_component_name(schema_name)
        component_dir = f'components/{component_name}'
        os.makedirs(component_dir, exist_ok=True)
        
        # Generate Form component
        with open(f'{component_dir}/{component_name}Form.tsx', 'w') as f:
            f.write(generate_form_component(schema_name, schema))
        
        # Generate Detail component
        with open(f'{component_dir}/{component_name}Detail.tsx', 'w') as f:
            f.write(generate_detail_component(schema_name, schema))
        
        # Generate List component
        with open(f'{component_dir}/{component_name}List.tsx', 'w') as f:
            f.write(generate_list_component(schema_name, schema))
        
        # Generate index
        with open(f'{component_dir}/index.ts', 'w') as f:
            f.write(f'''export {{ {component_name}Form }} from './{component_name}Form';
export {{ {component_name}Detail }} from './{component_name}Detail';
export {{ {component_name}List }} from './{component_name}List';''')
        
        generated_components.append(component_name)
        count += 1
        
        # Limit to 10 components for demo
        if count >= 10:
            break
    
    # Generate main index
    with open('components/index.ts', 'w') as f:
        exports = ['export * from "./shared";']
        for component in generated_components:
            exports.append(f'export * from "./{component}";')
        f.write('\n'.join(exports))
    
    print(f'Generated components for {count} schemas')

if __name__ == '__main__':
    main()
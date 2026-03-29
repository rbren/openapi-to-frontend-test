#!/usr/bin/env python3
"""
Generate TypeScript API client from parsed OpenAPI spec.
"""

import json
import re
import sys
from pathlib import Path
from typing import Any, Set, List


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


def path_to_method_name(path: str, method: str, operation_id: str = '') -> str:
    """Generate a method name from path and HTTP method."""
    if operation_id:
        # Use operation ID if available, converting to camelCase
        return snake_to_camel(operation_id.replace('-', '_'))
    
    # Parse path segments
    segments = path.strip('/').split('/')
    resource_parts = []
    action_parts = []
    
    for segment in segments:
        if segment.startswith('{') and segment.endswith('}'):
            # Skip path parameters
            continue
        else:
            # Clean up segment
            clean_segment = segment.replace('-', '_').replace('.', '_')
            if clean_segment:
                resource_parts.append(clean_segment)
    
    # Determine method prefix based on HTTP method
    if method == 'GET':
        if '{' in path and path.endswith('}'):
            prefix = 'get'
        else:
            prefix = 'list'
    elif method == 'POST':
        prefix = 'create'
    elif method == 'PUT':
        prefix = 'update'
    elif method == 'PATCH':
        prefix = 'patch'
    elif method == 'DELETE':
        prefix = 'delete'
    else:
        prefix = method.lower()
    
    # Build method name
    if resource_parts:
        resource = '_'.join(resource_parts)
        method_name = f"{prefix}_{resource}"
    else:
        method_name = prefix
    
    return snake_to_camel(method_name)


def get_ts_type(type_info: dict[str, Any]) -> str:
    """Convert OpenAPI type to TypeScript type."""
    type_str = type_info.get('type', 'any')
    
    if type_str == 'ref':
        return format_type_name(type_info['ref'])
    
    if type_str == 'string':
        if 'enum' in type_info:
            return ' | '.join(f"'{v}'" for v in type_info['enum'])
        return 'string'
    
    if type_str in ('integer', 'number'):
        return 'number'
    
    if type_str == 'boolean':
        return 'boolean'
    
    if type_str == 'array':
        items_type = get_ts_type(type_info.get('items', {}))
        return f'{items_type}[]'
    
    if type_str == 'object':
        if 'additionalProperties' in type_info:
            add_props = type_info['additionalProperties']
            if isinstance(add_props, dict):
                value_type = get_ts_type(add_props)
                return f'Record<string, {value_type}>'
            elif add_props:
                return 'Record<string, unknown>'
        return 'Record<string, unknown>'
    
    if 'oneOf' in type_info:
        types = [get_ts_type(t) for t in type_info['oneOf']]
        return ' | '.join(f'({t})' for t in types)
    
    return 'unknown'


def extract_path_params(path: str) -> List[str]:
    """Extract path parameter names from a path template."""
    return re.findall(r'\{([^}]+)\}', path)


def generate_method(endpoint: dict[str, Any], imported_types: Set[str]) -> str:
    """Generate a method for an API endpoint."""
    method_name = path_to_method_name(endpoint['path'], endpoint['method'], endpoint['operationId'])
    path_params = extract_path_params(endpoint['path'])
    
    # Build method parameters
    params = []
    
    # Add path parameters
    for param_name in path_params:
        param_type = 'string'  # Default to string for path params
        for param in endpoint['parameters']:
            if param['name'] == param_name and param['in'] == 'path':
                param_type = get_ts_type(param)
                break
        params.append(f'{snake_to_camel(param_name)}: {param_type}')
    
    # Add query parameters as optional params object
    query_params = [p for p in endpoint['parameters'] if p['in'] == 'query']
    if query_params:
        interface_name = f'{method_name.capitalize()}Params'
        params.append(f'params?: {interface_name}')
    
    # Add request body
    if endpoint['requestBody']:
        body_type = get_ts_type(endpoint['requestBody'])
        if body_type.startswith('{'):
            # Inline type, create interface
            interface_name = f'{method_name.capitalize()}Request'
            params.append(f'data: {interface_name}')
        else:
            params.append(f'data: {body_type}')
            if 'ref' in endpoint['requestBody']:
                imported_types.add(body_type)
    
    # Determine return type
    return_type = 'void'
    success_response = next((r for r in endpoint['responses'] if r['code'].startswith('2')), None)
    if success_response and 'schema' in success_response:
        return_type = get_ts_type(success_response['schema'])
        if 'ref' in success_response['schema']:
            imported_types.add(return_type)
    
    # Build method signature
    lines = []
    
    # Add JSDoc comment
    if endpoint.get('summary') or endpoint.get('description'):
        lines.append('  /**')
        if endpoint.get('summary'):
            lines.append(f'   * {endpoint["summary"]}')
        if endpoint.get('description'):
            for line in endpoint['description'].split('\n'):
                lines.append(f'   * {line}')
        lines.append('   */')
    
    # Add method
    method_params = ', '.join(params)
    lines.append(f'  async {method_name}({method_params}): Promise<{return_type}> {{')
    
    # Build URL
    url_template = endpoint['path']
    for param_name in path_params:
        camel_name = snake_to_camel(param_name)
        url_template = url_template.replace(f'{{{param_name}}}', f'${{{camel_name}}}')
    
    # Build request options
    options = []
    if query_params:
        options.append('params')
    if endpoint['requestBody']:
        options.append('body: data')
    
    options_str = ''
    if options:
        options_str = ', { ' + ', '.join(options) + ' }'
    
    lines.append(f'    return this.request(\'{endpoint["method"]}\', `{url_template}`{options_str});')
    lines.append('  }')
    
    return '\n'.join(lines)


def generate_query_interfaces(endpoints: List[dict[str, Any]]) -> List[str]:
    """Generate interfaces for query parameters."""
    interfaces = []
    
    for endpoint in endpoints:
        query_params = [p for p in endpoint['parameters'] if p['in'] == 'query']
        if not query_params:
            continue
        
        method_name = path_to_method_name(endpoint['path'], endpoint['method'], endpoint['operationId'])
        interface_name = f'{method_name.capitalize()}Params'
        
        lines = [f'export interface {interface_name} {{']
        for param in query_params:
            param_name = snake_to_camel(param['name'])
            param_type = get_ts_type(param)
            optional = '?' if not param.get('required') else ''
            
            if param.get('description'):
                lines.append(f'  /** {param["description"]} */')
            lines.append(f'  {param_name}{optional}: {param_type};')
        
        lines.append('}')
        interfaces.append('\n'.join(lines))
    
    return interfaces


def generate_api_file(spec_summary: dict[str, Any]) -> str:
    """Generate the complete api.ts file."""
    lines = []
    imported_types: Set[str] = set()
    
    # Header
    lines.append('/**')
    lines.append(' * API client generated from OpenAPI specification')
    lines.append(' * DO NOT EDIT MANUALLY')
    lines.append(' */')
    lines.append('')
    
    # Generate methods for all endpoints
    methods = []
    for endpoint in spec_summary['endpoints']:
        method_code = generate_method(endpoint, imported_types)
        methods.append(method_code)
    
    # Generate query parameter interfaces
    query_interfaces = generate_query_interfaces(spec_summary['endpoints'])
    
    # Build imports
    if imported_types:
        type_imports = ', '.join(sorted(imported_types))
        lines.append(f'import type {{ {type_imports} }} from \'./types\';')
    
    if spec_summary['authSchemes']:
        lines.append('import { AuthConfig, attachAuth } from \'./auth\';')
    
    lines.append('')
    
    # Add API config interface
    lines.append('export interface ApiConfig {')
    lines.append('  baseUrl: string;')
    if spec_summary['authSchemes']:
        lines.append('  auth?: AuthConfig;')
    lines.append('}')
    lines.append('')
    
    # Add query interfaces
    lines.extend(query_interfaces)
    if query_interfaces:
        lines.append('')
    
    # Add API client class
    lines.append('export class ApiClient {')
    lines.append('  private baseUrl: string;')
    if spec_summary['authSchemes']:
        lines.append('  private auth?: AuthConfig;')
    lines.append('')
    
    lines.append('  constructor(config: ApiConfig) {')
    lines.append('    this.baseUrl = config.baseUrl.replace(/\\/$/, \'\');')
    if spec_summary['authSchemes']:
        lines.append('    this.auth = config.auth;')
    lines.append('  }')
    lines.append('')
    
    # Add request method
    lines.append('  private async request<T>(')
    lines.append('    method: string,')
    lines.append('    path: string,')
    lines.append('    options: {')
    lines.append('      params?: Record<string, string | number | boolean | undefined>;')
    lines.append('      body?: unknown;')
    lines.append('    } = {}')
    lines.append('  ): Promise<T> {')
    lines.append('    const url = new URL(path, this.baseUrl);')
    lines.append('    if (options.params) {')
    lines.append('      Object.entries(options.params).forEach(([key, value]) => {')
    lines.append('        if (value !== undefined) {')
    lines.append('          url.searchParams.set(key, String(value));')
    lines.append('        }')
    lines.append('      });')
    lines.append('    }')
    lines.append('')
    lines.append('    const headers: Record<string, string> = {')
    lines.append('      \'Content-Type\': \'application/json\',')
    lines.append('    };')
    lines.append('')
    
    if spec_summary['authSchemes']:
        lines.append('    if (this.auth) {')
        lines.append('      attachAuth(headers, url, this.auth);')
        lines.append('    }')
        lines.append('')
    
    lines.append('    const response = await fetch(url.toString(), {')
    lines.append('      method,')
    lines.append('      headers,')
    lines.append('      body: options.body ? JSON.stringify(options.body) : undefined,')
    lines.append('    });')
    lines.append('')
    lines.append('    if (!response.ok) {')
    lines.append('      throw new ApiError(response.status, await response.text());')
    lines.append('    }')
    lines.append('')
    lines.append('    if (response.status === 204) {')
    lines.append('      return undefined as T;')
    lines.append('    }')
    lines.append('')
    lines.append('    return response.json();')
    lines.append('  }')
    lines.append('')
    
    # Add all methods
    lines.extend(methods)
    
    lines.append('}')
    lines.append('')
    
    # Add error class
    lines.append('export class ApiError extends Error {')
    lines.append('  constructor(')
    lines.append('    public status: number,')
    lines.append('    public body: string')
    lines.append('  ) {')
    lines.append('    super(`API Error ${status}: ${body}`);')
    lines.append('    this.name = \'ApiError\';')
    lines.append('  }')
    lines.append('}')
    
    return '\n'.join(lines)


def main():
    # Load the parsed spec
    spec_path = Path('.generated/spec-summary.json')
    if not spec_path.exists():
        print("Error: spec-summary.json not found. Run parse-openapi.py first.", file=sys.stderr)
        sys.exit(1)
    
    with open(spec_path) as f:
        spec_summary = json.load(f)
    
    # Generate API client
    api_content = generate_api_file(spec_summary)
    
    # Write to file
    output_path = Path('client/api.ts')
    output_path.parent.mkdir(exist_ok=True)
    output_path.write_text(api_content)
    
    print(f"Generated {output_path}")
    print(f"Total endpoints: {len(spec_summary['endpoints'])}")


if __name__ == '__main__':
    main()
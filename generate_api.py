#!/usr/bin/env python3
import json
import re
from typing import Dict, Any, List, Optional, Tuple

def sanitize_name(name: str) -> str:
    """Sanitize names to be valid TypeScript identifiers."""
    name = re.sub(r'[^a-zA-Z0-9_]', '_', name)
    if name and name[0].isdigit():
        name = '_' + name
    return name

def path_to_method_name(path: str, method: str, operation_id: Optional[str] = None) -> str:
    """Convert path and method to a TypeScript method name."""
    if operation_id:
        # Use operation ID if available
        return sanitize_name(operation_id)
    
    # Convert path to method name
    parts = path.split('/')
    name_parts = []
    
    for part in parts:
        if part and not part.startswith('{'):
            name_parts.append(part)
    
    method_prefix = method.lower()
    if method_prefix == 'get':
        method_prefix = 'get'
    elif method_prefix == 'post':
        method_prefix = 'create'
    elif method_prefix == 'put':
        method_prefix = 'update'
    elif method_prefix == 'patch':
        method_prefix = 'patch'
    elif method_prefix == 'delete':
        method_prefix = 'delete'
    
    # Convert to camelCase
    if name_parts:
        method_name = method_prefix + ''.join(word.capitalize() for word in name_parts)
    else:
        method_name = method_prefix
    
    return sanitize_name(method_name)

def get_path_params(path: str) -> List[str]:
    """Extract path parameters from a path string."""
    return re.findall(r'\{([^}]+)\}', path)

def get_response_type(responses: Dict[str, Any]) -> str:
    """Determine the TypeScript return type from OpenAPI responses."""
    # Look for successful response (2xx)
    for status, response in responses.items():
        if status.startswith('2'):
            content = response.get('content', {})
            if 'application/json' in content:
                schema = content['application/json'].get('schema', {})
                if '$ref' in schema:
                    return schema['$ref'].split('/')[-1]
                elif 'type' in schema:
                    if schema['type'] == 'array':
                        item_ref = schema.get('items', {}).get('$ref')
                        if item_ref:
                            return f"{item_ref.split('/')[-1]}[]"
                        return 'any[]'
                    elif schema['type'] == 'object':
                        return 'any'
                    else:
                        return schema['type']
            return 'void'
    return 'void'

def get_request_body_type(request_body: Dict[str, Any]) -> Optional[str]:
    """Extract the request body type from OpenAPI request body."""
    if not request_body:
        return None
    
    content = request_body.get('content', {})
    if 'application/json' in content:
        schema = content['application/json'].get('schema', {})
        if '$ref' in schema:
            return schema['$ref'].split('/')[-1]
        elif 'type' in schema:
            return 'any'
    elif 'multipart/form-data' in content:
        return 'FormData'
    
    return None

def generate_method(path: str, method: str, operation: Dict[str, Any]) -> str:
    """Generate a TypeScript method for an API operation."""
    operation_id = operation.get('operationId')
    method_name = path_to_method_name(path, method, operation_id)
    
    # Extract parameters
    path_params = get_path_params(path)
    query_params = []
    header_params = []
    
    for param in operation.get('parameters', []):
        if param['in'] == 'query':
            query_params.append(param)
        elif param['in'] == 'header':
            header_params.append(param)
    
    # Get request body type
    request_body = operation.get('requestBody', {})
    body_type = get_request_body_type(request_body)
    
    # Get response type
    response_type = get_response_type(operation.get('responses', {}))
    
    # Build method signature
    params = []
    
    # Add path parameters
    for param in path_params:
        params.append(f'{param}: string')
    
    # Add request body
    if body_type:
        required = request_body.get('required', True)
        optional = '' if required else '?'
        params.append(f'body{optional}: {body_type}')
    
    # Add query parameters as options object
    if query_params:
        query_interface = []
        for param in query_params:
            param_name = param['name']
            required = param.get('required', False)
            optional = '?' if not required else ''
            param_type = 'string'  # Simplified - could be enhanced
            query_interface.append(f'{param_name}{optional}: {param_type}')
        
        params.append(f'query?: {{ {"; ".join(query_interface)} }}')
    
    # Add options parameter
    params.append('options?: RequestInit')
    
    # Build method body
    method_lines = []
    
    # Add JSDoc
    description = operation.get('description') or operation.get('summary', '')
    if description:
        method_lines.append(f'  /** {description} */')
    
    # Method signature
    method_lines.append(f'  async {method_name}({", ".join(params)}): Promise<{response_type}> {{')
    
    # Build URL
    url = path
    for param in path_params:
        url = url.replace(f'{{{param}}}', f'${{{param}}}')
    
    method_lines.append(f'    const url = `${{this.baseUrl}}{url}`;')
    
    # Add query parameters
    if query_params:
        method_lines.append('    const params = new URLSearchParams();')
        method_lines.append('    if (query) {')
        for param in query_params:
            param_name = param['name']
            method_lines.append(f'      if (query.{param_name} !== undefined) params.append("{param_name}", query.{param_name});')
        method_lines.append('    }')
        method_lines.append('    const queryString = params.toString();')
        method_lines.append('    const fullUrl = queryString ? `${url}?${queryString}` : url;')
    else:
        method_lines.append('    const fullUrl = url;')
    
    # Build fetch options
    method_lines.append('    const response = await fetch(fullUrl, {')
    method_lines.append(f'      method: "{method.upper()}",')
    method_lines.append('      headers: {')
    method_lines.append('        ...this.headers,')
    if body_type and body_type != 'FormData':
        method_lines.append('        "Content-Type": "application/json",')
    method_lines.append('      },')
    if body_type:
        if body_type == 'FormData':
            method_lines.append('      body,')
        else:
            method_lines.append('      body: JSON.stringify(body),')
    method_lines.append('      ...options,')
    method_lines.append('    });')
    
    # Handle response
    method_lines.append('')
    method_lines.append('    if (!response.ok) {')
    method_lines.append('      throw new Error(`HTTP error! status: ${response.status}`);')
    method_lines.append('    }')
    
    if response_type != 'void':
        method_lines.append('')
        method_lines.append('    return response.json();')
    
    method_lines.append('  }')
    
    return '\n'.join(method_lines)

def main():
    # Read the OpenAPI spec
    with open('new-spec.json', 'r') as f:
        spec = json.load(f)
    
    # Extract paths
    paths = spec.get('paths', {})
    
    # Generate API class
    api_content = [
        '// Generated API client from OpenAPI specification',
        '// Do not edit manually - regenerate using generate_api.py',
        '',
        'import * as types from "./types";',
        '',
        'export class ApiClient {',
        '  private baseUrl: string;',
        '  private headers: Record<string, string>;',
        '',
        '  constructor(baseUrl: string = "", headers: Record<string, string> = {}) {',
        '    this.baseUrl = baseUrl;',
        '    this.headers = headers;',
        '  }',
        '',
        '  setHeader(key: string, value: string): void {',
        '    this.headers[key] = value;',
        '  }',
        '',
        '  removeHeader(key: string): void {',
        '    delete this.headers[key];',
        '  }',
        ''
    ]
    
    # Group methods by tag
    methods_by_tag: Dict[str, List[str]] = {}
    
    for path, path_item in paths.items():
        for method in ['get', 'post', 'put', 'patch', 'delete']:
            if method in path_item:
                operation = path_item[method]
                tags = operation.get('tags', ['Default'])
                method_code = generate_method(path, method, operation)
                
                for tag in tags:
                    if tag not in methods_by_tag:
                        methods_by_tag[tag] = []
                    methods_by_tag[tag].append(method_code)
    
    # Add methods to class
    for tag, methods in sorted(methods_by_tag.items()):
        api_content.append(f'  // {tag} operations')
        api_content.extend(methods)
        api_content.append('')
    
    api_content.append('}')
    
    # Write to file
    with open('client/api.ts', 'w') as f:
        f.write('\n'.join(api_content))
    
    print(f'Generated API client with {sum(len(m) for m in methods_by_tag.values())} methods in client/api.ts')

if __name__ == '__main__':
    main()
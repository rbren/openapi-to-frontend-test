#!/usr/bin/env python3
import json
import re
from typing import Dict, Any, List, Set

def openapi_type_to_typescript(schema: Dict[str, Any], required_fields: Set[str] = None) -> str:
    """Convert OpenAPI schema type to TypeScript type."""
    if required_fields is None:
        required_fields = set()
    
    if 'type' not in schema and 'oneOf' not in schema and 'anyOf' not in schema and 'allOf' not in schema:
        return 'any'
    
    # Handle references
    if '$ref' in schema:
        ref_name = schema['$ref'].split('/')[-1]
        return ref_name
    
    # Handle oneOf/anyOf
    if 'oneOf' in schema:
        types = [openapi_type_to_typescript(s, required_fields) for s in schema['oneOf']]
        return ' | '.join(types)
    
    if 'anyOf' in schema:
        types = [openapi_type_to_typescript(s, required_fields) for s in schema['anyOf']]
        return ' | '.join(types)
    
    # Handle allOf
    if 'allOf' in schema:
        # For simplicity, we'll just use the first type
        # In a real implementation, you'd merge all schemas
        return openapi_type_to_typescript(schema['allOf'][0], required_fields)
    
    schema_type = schema.get('type', 'any')
    
    if schema_type == 'string':
        if 'enum' in schema:
            return ' | '.join([f'"{val}"' for val in schema['enum']])
        return 'string'
    elif schema_type == 'number':
        return 'number'
    elif schema_type == 'integer':
        return 'number'
    elif schema_type == 'boolean':
        return 'boolean'
    elif schema_type == 'array':
        items = schema.get('items', {})
        item_type = openapi_type_to_typescript(items, required_fields)
        return f'{item_type}[]'
    elif schema_type == 'object':
        if 'properties' not in schema:
            if 'additionalProperties' in schema:
                if isinstance(schema['additionalProperties'], bool):
                    return 'Record<string, any>' if schema['additionalProperties'] else '{}'
                else:
                    value_type = openapi_type_to_typescript(schema['additionalProperties'], required_fields)
                    return f'Record<string, {value_type}>'
            return 'Record<string, any>'
        
        # Generate inline object type
        props = []
        for prop_name, prop_schema in schema['properties'].items():
            prop_type = openapi_type_to_typescript(prop_schema, required_fields)
            optional = '?' if prop_name not in required_fields else ''
            props.append(f'  {prop_name}{optional}: {prop_type};')
        
        return '{\n' + '\n'.join(props) + '\n}'
    else:
        return 'any'

def sanitize_name(name: str) -> str:
    """Sanitize schema names to be valid TypeScript identifiers."""
    # Replace invalid characters with underscores
    name = re.sub(r'[^a-zA-Z0-9_]', '_', name)
    # Ensure it doesn't start with a number
    if name and name[0].isdigit():
        name = '_' + name
    return name

def generate_interface(name: str, schema: Dict[str, Any]) -> str:
    """Generate a TypeScript interface from an OpenAPI schema."""
    sanitized_name = sanitize_name(name)
    
    # Get required fields
    required_fields = set(schema.get('required', []))
    
    if 'type' not in schema and 'properties' not in schema and 'allOf' not in schema:
        # It's likely a reference or simple type alias
        if '$ref' in schema:
            ref_type = schema['$ref'].split('/')[-1]
            return f'export type {sanitized_name} = {ref_type};\n'
        elif 'oneOf' in schema or 'anyOf' in schema:
            ts_type = openapi_type_to_typescript(schema, required_fields)
            return f'export type {sanitized_name} = {ts_type};\n'
        else:
            return f'export type {sanitized_name} = any;\n'
    
    if schema.get('type') == 'object' or 'properties' in schema:
        interface_body = []
        properties = schema.get('properties', {})
        
        for prop_name, prop_schema in properties.items():
            prop_type = openapi_type_to_typescript(prop_schema, required_fields)
            optional = '?' if prop_name not in required_fields else ''
            
            # Add description as JSDoc comment if available
            description = prop_schema.get('description', '')
            if description:
                interface_body.append(f'  /** {description} */')
            
            interface_body.append(f'  {prop_name}{optional}: {prop_type};')
        
        # Handle additionalProperties
        if 'additionalProperties' in schema:
            if isinstance(schema['additionalProperties'], bool):
                if schema['additionalProperties']:
                    interface_body.append(f'  [key: string]: any;')
            else:
                add_prop_type = openapi_type_to_typescript(schema['additionalProperties'], required_fields)
                interface_body.append(f'  [key: string]: {add_prop_type};')
        
        return f'export interface {sanitized_name} {{\n' + '\n'.join(interface_body) + '\n}\n'
    else:
        # It's a simple type alias
        ts_type = openapi_type_to_typescript(schema, required_fields)
        return f'export type {sanitized_name} = {ts_type};\n'

def main():
    # Read the OpenAPI spec
    with open('new-spec.json', 'r') as f:
        spec = json.load(f)
    
    # Extract schemas
    schemas = spec.get('components', {}).get('schemas', {})
    
    # Generate TypeScript content
    typescript_content = [
        '// Generated TypeScript types from OpenAPI specification',
        '// Do not edit manually - regenerate using generate_types.py',
        '',
    ]
    
    # Sort schemas to ensure consistent output
    sorted_schemas = sorted(schemas.items())
    
    # First pass: generate all interfaces
    for name, schema in sorted_schemas:
        interface = generate_interface(name, schema)
        typescript_content.append(interface)
    
    # Write to file
    with open('client/types.ts', 'w') as f:
        f.write('\n'.join(typescript_content))
    
    print(f'Generated {len(schemas)} TypeScript interfaces in client/types.ts')

if __name__ == '__main__':
    main()
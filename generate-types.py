#!/usr/bin/env python3
"""
Generate TypeScript types from parsed OpenAPI spec.
"""

import json
import sys
from pathlib import Path
from typing import Any, Set


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


def get_ts_type(type_info: dict[str, Any], imported_types: Set[str]) -> str:
    """Convert OpenAPI type to TypeScript type."""
    type_str = type_info.get('type', 'any')
    
    if type_str == 'ref':
        ref_name = format_type_name(type_info['ref'])
        imported_types.add(ref_name)
        return ref_name
    
    if type_str == 'string':
        if 'enum' in type_info:
            return ' | '.join(f"'{v}'" for v in type_info['enum'])
        return 'string'
    
    if type_str in ('integer', 'number'):
        return 'number'
    
    if type_str == 'boolean':
        return 'boolean'
    
    if type_str == 'array':
        items_type = get_ts_type(type_info.get('items', {}), imported_types)
        return f'{items_type}[]'
    
    if type_str == 'object':
        if 'additionalProperties' in type_info:
            add_props = type_info['additionalProperties']
            if isinstance(add_props, dict):
                value_type = get_ts_type(add_props, imported_types)
                return f'Record<string, {value_type}>'
            elif add_props:
                return 'Record<string, unknown>'
        if 'properties' in type_info:
            # Inline object type
            props = []
            for prop_name, prop_type in type_info['properties'].items():
                ts_prop_name = snake_to_camel(prop_name)
                ts_type = get_ts_type(prop_type, imported_types)
                props.append(f'{ts_prop_name}: {ts_type}')
            return '{ ' + '; '.join(props) + ' }'
        return 'Record<string, unknown>'
    
    if 'oneOf' in type_info:
        types = [get_ts_type(t, imported_types) for t in type_info['oneOf']]
        return ' | '.join(f'({t})' for t in types)
    
    if 'anyOf' in type_info:
        types = [get_ts_type(t, imported_types) for t in type_info['anyOf']]
        return ' | '.join(f'({t})' for t in types)
    
    if 'allOf' in type_info:
        types = [get_ts_type(t, imported_types) for t in type_info['allOf']]
        return ' & '.join(f'({t})' for t in types)
    
    return 'unknown'


def generate_interface(schema: dict[str, Any]) -> tuple[str, Set[str]]:
    """Generate a TypeScript interface from a schema."""
    imported_types: Set[str] = set()
    interface_name = format_type_name(schema['name'])
    
    # Handle enum types
    if 'enum' in schema and schema.get('type') == 'string':
        enum_values = ' | '.join(f"'{v}'" for v in schema['enum'])
        return f'export type {interface_name} = {enum_values};', imported_types
    
    lines = []
    
    # Add description as JSDoc comment
    if schema.get('description'):
        lines.append('/**')
        for line in schema['description'].split('\n'):
            lines.append(f' * {line}')
        lines.append(' */')
    
    lines.append(f'export interface {interface_name} {{')
    
    # Generate fields
    for field in schema.get('fields', []):
        field_name = snake_to_camel(field['name'])
        field_type = get_ts_type(field, imported_types)
        
        # Add nullable support
        if field.get('nullable'):
            field_type = f'{field_type} | null'
        
        # Add optional marker
        optional = '?' if not field.get('required') else ''
        
        # Add field description
        if field.get('description'):
            lines.append(f'  /** {field["description"]} */')
        
        lines.append(f'  {field_name}{optional}: {field_type};')
    
    lines.append('}')
    
    return '\n'.join(lines), imported_types


def generate_types_file(spec_summary: dict[str, Any]) -> str:
    """Generate the complete types.ts file."""
    lines = []
    lines.append('/**')
    lines.append(' * TypeScript types generated from OpenAPI specification')
    lines.append(' * DO NOT EDIT MANUALLY')
    lines.append(' */')
    lines.append('')
    
    # Track all imported types to avoid duplicates
    all_imported_types: Set[str] = set()
    interface_definitions = []
    
    # Generate interfaces for all schemas
    for schema in spec_summary['schemas']:
        interface_code, imported_types = generate_interface(schema)
        interface_definitions.append(interface_code)
        all_imported_types.update(imported_types)
    
    # Add all interfaces
    lines.extend(interface_definitions)
    
    return '\n\n'.join(lines)


def main():
    # Load the parsed spec
    spec_path = Path('.generated/spec-summary.json')
    if not spec_path.exists():
        print("Error: spec-summary.json not found. Run parse-openapi.py first.", file=sys.stderr)
        sys.exit(1)
    
    with open(spec_path) as f:
        spec_summary = json.load(f)
    
    # Generate types
    types_content = generate_types_file(spec_summary)
    
    # Write to file
    output_path = Path('client/types.ts')
    output_path.parent.mkdir(exist_ok=True)
    output_path.write_text(types_content)
    
    print(f"Generated {output_path}")
    print(f"Total schemas: {len(spec_summary['schemas'])}")


if __name__ == '__main__':
    main()
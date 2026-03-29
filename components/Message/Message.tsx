import React from 'react';
import { GenericForm, GenericFormField } from '../generic/GenericForm';
import { GenericDetail, GenericDetailField } from '../generic/GenericDetail';
import { GenericList, GenericListColumn } from '../generic/GenericList';
import type { Message } from '../../client/types';

// Form fields configuration
const formFields: GenericFormField[] = [
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    required: true,
    options: [{ value: 'user', label: 'user' }, { value: 'system', label: 'system' }, { value: 'assistant', label: 'assistant' }, { value: 'tool', label: 'tool' }]
  },
  {
    name: 'content',
    label: 'Content',
    type: 'array',
    required: false
  },
  {
    name: 'toolCalls',
    label: 'Tool Calls',
    type: 'text',
    required: false
  },
  {
    name: 'toolCallId',
    label: 'Tool Call Id',
    type: 'text',
    required: false
  },
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: false
  }
];

// Detail fields configuration
const detailFields = (item: Message): GenericDetailField[] => [
  {
    name: 'role',
    label: 'Role',
    value: item.role,
    type: 'text'
  },
  {
    name: 'content',
    label: 'Content',
    value: item.content,
    type: 'text'
  },
  {
    name: 'toolCalls',
    label: 'Tool Calls',
    value: item.toolCalls,
    type: 'text'
  },
  {
    name: 'toolCallId',
    label: 'Tool Call Id',
    value: item.toolCallId,
    type: 'text'
  },
  {
    name: 'name',
    label: 'Name',
    value: item.name,
    type: 'text'
  },
  {
    name: 'reasoningContent',
    label: 'Reasoning Content',
    value: item.reasoningContent,
    type: 'text'
  },
  {
    name: 'thinkingBlocks',
    label: 'Thinking Blocks',
    value: item.thinkingBlocks,
    type: 'text'
  },
  {
    name: 'responsesReasoningItem',
    label: 'Responses Reasoning Item',
    value: item.responsesReasoningItem,
    type: 'text'
  }
];

// List columns configuration
const listColumns: GenericListColumn[] = [
  {
    key: 'role',
    label: 'Role'
  },
  {
    key: 'content',
    label: 'Content'
  },
  {
    key: 'toolCalls',
    label: 'Tool Calls'
  },
  {
    key: 'toolCallId',
    label: 'Tool Call Id'
  }
];

export interface MessageFormProps {
  initialData?: Partial<Message>;
  onSubmit: (data: Message) => Promise<void>;
  onCancel?: () => void;
}

export function MessageForm({ initialData, onSubmit, onCancel }: MessageFormProps) {
  return (
    <GenericForm<Message>
      fields={formFields}
      initialData={initialData}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitLabel="Save Message"
    />
  );
}

export interface MessageDetailProps {
  item: Message;
}

export function MessageDetail({ item }: MessageDetailProps) {
  return (
    <GenericDetail
      title="Message Details"
      fields={detailFields(item)}
    />
  );
}

export interface MessageListProps {
  items: Message[];
  onItemClick?: (item: Message) => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

export function MessageList({ items, onItemClick, pagination }: MessageListProps) {
  return (
    <GenericList<Message>
      items={items}
      columns={listColumns}
      onItemClick={onItemClick}
      pagination={pagination}
    />
  );
}
import React from 'react';
import { GenericForm, GenericFormField } from '../generic/GenericForm';
import { GenericDetail, GenericDetailField } from '../generic/GenericDetail';
import { GenericList, GenericListColumn } from '../generic/GenericList';
import type { TaskItem } from '../../client/types';

// Form fields configuration
const formFields: GenericFormField[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true
  },
  {
    name: 'notes',
    label: 'Notes',
    type: 'text',
    required: false
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: false,
    options: [{ value: 'todo', label: 'todo' }, { value: 'in_progress', label: 'in_progress' }, { value: 'done', label: 'done' }]
  }
];

// Detail fields configuration
const detailFields = (item: TaskItem): GenericDetailField[] => [
  {
    name: 'title',
    label: 'Title',
    value: item.title,
    type: 'text'
  },
  {
    name: 'notes',
    label: 'Notes',
    value: item.notes,
    type: 'text'
  },
  {
    name: 'status',
    label: 'Status',
    value: item.status,
    type: 'text'
  }
];

// List columns configuration
const listColumns: GenericListColumn[] = [
  {
    key: 'title',
    label: 'Title'
  },
  {
    key: 'notes',
    label: 'Notes'
  },
  {
    key: 'status',
    label: 'Status'
  }
];

export interface TaskItemFormProps {
  initialData?: Partial<TaskItem>;
  onSubmit: (data: TaskItem) => Promise<void>;
  onCancel?: () => void;
}

export function TaskItemForm({ initialData, onSubmit, onCancel }: TaskItemFormProps) {
  return (
    <GenericForm<TaskItem>
      fields={formFields}
      initialData={initialData}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitLabel="Save TaskItem"
    />
  );
}

export interface TaskItemDetailProps {
  item: TaskItem;
}

export function TaskItemDetail({ item }: TaskItemDetailProps) {
  return (
    <GenericDetail
      title="TaskItem Details"
      fields={detailFields(item)}
    />
  );
}

export interface TaskItemListProps {
  items: TaskItem[];
  onItemClick?: (item: TaskItem) => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

export function TaskItemList({ items, onItemClick, pagination }: TaskItemListProps) {
  return (
    <GenericList<TaskItem>
      items={items}
      columns={listColumns}
      onItemClick={onItemClick}
      pagination={pagination}
    />
  );
}
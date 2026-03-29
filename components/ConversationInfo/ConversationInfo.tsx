import React from 'react';
import { GenericForm, GenericFormField } from '../generic/GenericForm';
import { GenericDetail, GenericDetailField } from '../generic/GenericDetail';
import { GenericList, GenericListColumn } from '../generic/GenericList';
import type { ConversationInfo } from '../../client/types';

// Form fields configuration
const formFields: GenericFormField[] = [
  {
    name: 'id',
    label: 'Id',
    type: 'text',
    required: true
  },
  {
    name: 'agent',
    label: 'Agent',
    type: 'text',
    required: true
  },
  {
    name: 'workspace',
    label: 'Workspace',
    type: 'text',
    required: true
  },
  {
    name: 'persistenceDir',
    label: 'Persistence Dir',
    type: 'text',
    required: false
  },
  {
    name: 'maxIterations',
    label: 'Max Iterations',
    type: 'number',
    required: false
  }
];

// Detail fields configuration
const detailFields = (item: ConversationInfo): GenericDetailField[] => [
  {
    name: 'id',
    label: 'Id',
    value: item.id,
    type: 'text'
  },
  {
    name: 'agent',
    label: 'Agent',
    value: item.agent,
    type: 'text'
  },
  {
    name: 'workspace',
    label: 'Workspace',
    value: item.workspace,
    type: 'text'
  },
  {
    name: 'persistenceDir',
    label: 'Persistence Dir',
    value: item.persistenceDir,
    type: 'text'
  },
  {
    name: 'maxIterations',
    label: 'Max Iterations',
    value: item.maxIterations,
    type: 'text'
  },
  {
    name: 'stuckDetection',
    label: 'Stuck Detection',
    value: item.stuckDetection,
    type: 'boolean'
  },
  {
    name: 'executionStatus',
    label: 'Execution Status',
    value: item.executionStatus,
    type: 'text'
  },
  {
    name: 'confirmationPolicy',
    label: 'Confirmation Policy',
    value: item.confirmationPolicy,
    type: 'text'
  }
];

// List columns configuration
const listColumns: GenericListColumn[] = [
  {
    key: 'id',
    label: 'Id'
  },
  {
    key: 'agent',
    label: 'Agent'
  },
  {
    key: 'workspace',
    label: 'Workspace'
  },
  {
    key: 'persistenceDir',
    label: 'Persistence Dir'
  }
];

export interface ConversationInfoFormProps {
  initialData?: Partial<ConversationInfo>;
  onSubmit: (data: ConversationInfo) => Promise<void>;
  onCancel?: () => void;
}

export function ConversationInfoForm({ initialData, onSubmit, onCancel }: ConversationInfoFormProps) {
  return (
    <GenericForm<ConversationInfo>
      fields={formFields}
      initialData={initialData}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitLabel="Save ConversationInfo"
    />
  );
}

export interface ConversationInfoDetailProps {
  item: ConversationInfo;
}

export function ConversationInfoDetail({ item }: ConversationInfoDetailProps) {
  return (
    <GenericDetail
      title="ConversationInfo Details"
      fields={detailFields(item)}
    />
  );
}

export interface ConversationInfoListProps {
  items: ConversationInfo[];
  onItemClick?: (item: ConversationInfo) => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

export function ConversationInfoList({ items, onItemClick, pagination }: ConversationInfoListProps) {
  return (
    <GenericList<ConversationInfo>
      items={items}
      columns={listColumns}
      onItemClick={onItemClick}
      pagination={pagination}
    />
  );
}
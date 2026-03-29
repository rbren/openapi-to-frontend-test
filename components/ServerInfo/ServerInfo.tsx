import React from 'react';
import { GenericForm, GenericFormField } from '../generic/GenericForm';
import { GenericDetail, GenericDetailField } from '../generic/GenericDetail';
import { GenericList, GenericListColumn } from '../generic/GenericList';
import type { ServerInfo } from '../../client/types';

// Form fields configuration
const formFields: GenericFormField[] = [
  {
    name: 'uptime',
    label: 'Uptime',
    type: 'number',
    required: true
  },
  {
    name: 'idleTime',
    label: 'Idle Time',
    type: 'number',
    required: true
  },
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: false
  },
  {
    name: 'version',
    label: 'Version',
    type: 'text',
    required: false
  },
  {
    name: 'docs',
    label: 'Docs',
    type: 'text',
    required: false
  }
];

// Detail fields configuration
const detailFields = (item: ServerInfo): GenericDetailField[] => [
  {
    name: 'uptime',
    label: 'Uptime',
    value: item.uptime,
    type: 'text'
  },
  {
    name: 'idleTime',
    label: 'Idle Time',
    value: item.idleTime,
    type: 'text'
  },
  {
    name: 'title',
    label: 'Title',
    value: item.title,
    type: 'text'
  },
  {
    name: 'version',
    label: 'Version',
    value: item.version,
    type: 'text'
  },
  {
    name: 'docs',
    label: 'Docs',
    value: item.docs,
    type: 'text'
  },
  {
    name: 'redoc',
    label: 'Redoc',
    value: item.redoc,
    type: 'text'
  }
];

// List columns configuration
const listColumns: GenericListColumn[] = [
  {
    key: 'uptime',
    label: 'Uptime'
  },
  {
    key: 'idleTime',
    label: 'Idle Time'
  },
  {
    key: 'title',
    label: 'Title'
  },
  {
    key: 'version',
    label: 'Version'
  }
];

export interface ServerInfoFormProps {
  initialData?: Partial<ServerInfo>;
  onSubmit: (data: ServerInfo) => Promise<void>;
  onCancel?: () => void;
}

export function ServerInfoForm({ initialData, onSubmit, onCancel }: ServerInfoFormProps) {
  return (
    <GenericForm<ServerInfo>
      fields={formFields}
      initialData={initialData}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitLabel="Save ServerInfo"
    />
  );
}

export interface ServerInfoDetailProps {
  item: ServerInfo;
}

export function ServerInfoDetail({ item }: ServerInfoDetailProps) {
  return (
    <GenericDetail
      title="ServerInfo Details"
      fields={detailFields(item)}
    />
  );
}

export interface ServerInfoListProps {
  items: ServerInfo[];
  onItemClick?: (item: ServerInfo) => void;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

export function ServerInfoList({ items, onItemClick, pagination }: ServerInfoListProps) {
  return (
    <GenericList<ServerInfo>
      items={items}
      columns={listColumns}
      onItemClick={onItemClick}
      pagination={pagination}
    />
  );
}
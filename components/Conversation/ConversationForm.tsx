import React, { useState } from 'react';
import { CreateConversationRequest, UpdateConversationRequest } from '../../client';

interface ConversationFormProps {
  initialData?: Partial<CreateConversationRequest | UpdateConversationRequest>;
  onSubmit: (data: CreateConversationRequest | UpdateConversationRequest) => void;
  onCancel?: () => void;
  isEdit?: boolean;
  className?: string;
}

export const ConversationForm: React.FC<ConversationFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  isEdit = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    status: initialData.status || '',
    metadata: JSON.stringify(initialData.metadata || {}, null, 2),
    // Agent config for create mode
    agentConfig: isEdit ? undefined : JSON.stringify(
      initialData.agentConfig || {
        tools: [],
        llmConfig: {
          model: 'gpt-4',
          temperature: 0.7,
        },
      },
      null,
      2
    ),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateJSON = (value: string, field: string): boolean => {
    if (!value.trim()) {
      return true; // Empty is valid (will use empty object)
    }
    try {
      JSON.parse(value);
      return true;
    } catch (e) {
      setErrors((prev) => ({ ...prev, [field]: 'Invalid JSON format' }));
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate JSON fields
    const isMetadataValid = validateJSON(formData.metadata, 'metadata');
    const isAgentConfigValid = !formData.agentConfig || validateJSON(formData.agentConfig, 'agentConfig');

    if (!isMetadataValid || !isAgentConfigValid) {
      return;
    }

    const data: any = {};
    
    if (formData.status) {
      data.status = formData.status;
    }
    
    try {
      data.metadata = formData.metadata.trim() ? JSON.parse(formData.metadata) : {};
      
      if (!isEdit && formData.agentConfig) {
        data.agentConfig = JSON.parse(formData.agentConfig);
      }
    } catch (e) {
      console.error('JSON parse error:', e);
      return;
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {isEdit && (
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            type="text"
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="active, completed, failed, etc."
          />
        </div>
      )}

      <div>
        <label htmlFor="metadata" className="block text-sm font-medium text-gray-700">
          Metadata (JSON)
        </label>
        <textarea
          id="metadata"
          rows={6}
          value={formData.metadata}
          onChange={(e) => {
            setFormData({ ...formData, metadata: e.target.value });
            setErrors((prev) => ({ ...prev, metadata: '' }));
          }}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm font-mono ${
            errors.metadata
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder='{"key": "value"}'
        />
        {errors.metadata && (
          <p className="mt-1 text-sm text-red-600">{errors.metadata}</p>
        )}
      </div>

      {!isEdit && (
        <div>
          <label htmlFor="agentConfig" className="block text-sm font-medium text-gray-700">
            Agent Configuration (JSON)
          </label>
          <textarea
            id="agentConfig"
            rows={10}
            value={formData.agentConfig}
            onChange={(e) => {
              setFormData({ ...formData, agentConfig: e.target.value });
              setErrors((prev) => ({ ...prev, agentConfig: '' }));
            }}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm font-mono ${
              errors.agentConfig
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {errors.agentConfig && (
            <p className="mt-1 text-sm text-red-600">{errors.agentConfig}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Configure tools, LLM settings, and other agent parameters
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isEdit ? 'Update' : 'Create'} Conversation
        </button>
      </div>
    </form>
  );
};
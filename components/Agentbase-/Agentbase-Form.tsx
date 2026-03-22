import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AgentBase-Output } from '../../client/types';

export interface Agentbase-FormProps {
  initialData?: Partial<AgentBase-Output>;
  onSubmit: (data: AgentBase-Output) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function Agentbase-Form({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
}: Agentbase-FormProps) {
  const [formData, setFormData] = useState<Partial<AgentBase-Output>>(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value ? Number(value) : undefined }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData as AgentBase-Output);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">


      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
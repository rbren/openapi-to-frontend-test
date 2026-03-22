import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AgentContext-Output } from '../../client/types';

export interface Agentcontext-FormProps {
  initialData?: Partial<AgentContext-Output>;
  onSubmit: (data: AgentContext-Output) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function Agentcontext-Form({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
}: Agentcontext-FormProps) {
  const [formData, setFormData] = useState<Partial<AgentContext-Output>>(initialData);

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
    await onSubmit(formData as AgentContext-Output);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          Skills
        </label>
        <p className="text-sm text-gray-500">List of available skills that can extend the user's input.</p>
        <input
          type="text"
          id="skills"
          name="skills"
          value={formData.skills || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="system_message_suffix" className="block text-sm font-medium text-gray-700">
          System Message Suffix
        </label>
        <p className="text-sm text-gray-500">Optional suffix to append to the system prompt.</p>
        <input
          type="text"
          id="system_message_suffix"
          name="system_message_suffix"
          value={formData.system_message_suffix || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="user_message_suffix" className="block text-sm font-medium text-gray-700">
          User Message Suffix
        </label>
        <p className="text-sm text-gray-500">Optional suffix to append to the user's message.</p>
        <input
          type="text"
          id="user_message_suffix"
          name="user_message_suffix"
          value={formData.user_message_suffix || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex items-center">
        <input
          id="load_user_skills"
          name="load_user_skills"
          type="checkbox"
          checked={formData.load_user_skills || false}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="load_user_skills" className="ml-2 block text-sm text-gray-900">
          Load User Skills
        </label>
        <p className="ml-6 text-sm text-gray-500">Whether to automatically load user skills from ~/.openhands/skills/ and ~/.openhands/microagents/ (for backward compatibility). </p>
      </div>
      <div className="flex items-center">
        <input
          id="load_public_skills"
          name="load_public_skills"
          type="checkbox"
          checked={formData.load_public_skills || false}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="load_public_skills" className="ml-2 block text-sm text-gray-900">
          Load Public Skills
        </label>
        <p className="ml-6 text-sm text-gray-500">Whether to automatically load skills from the public OpenHands skills repository at https://github.com/OpenHands/skills. This allows you to get the latest skills without SDK updates.</p>
      </div>
      <div>
        <label htmlFor="secrets" className="block text-sm font-medium text-gray-700">
          Secrets
        </label>
        <p className="text-sm text-gray-500">Dictionary mapping secret keys to values or secret sources. Secrets are used for authentication and sensitive data handling. Values can be either strings or SecretSource instances (str | SecretSource).</p>
        <input
          type="text"
          id="secrets"
          name="secrets"
          value={formData.secrets || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="current_datetime" className="block text-sm font-medium text-gray-700">
          Current Datetime
        </label>
        <p className="text-sm text-gray-500">Current date and time information to provide to the agent. Can be a datetime object (which will be formatted as ISO 8601) or a pre-formatted string. When provided, this information is included in the system prompt to give the agent awareness of the current time context. Defaults to the current datetime.</p>
        <input
          type="text"
          id="current_datetime"
          name="current_datetime"
          value={formData.current_datetime || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

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
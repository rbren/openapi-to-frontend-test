import React, { useState, ChangeEvent, FormEvent } from 'react';
import { APIBasedCritic-Output } from '../../client/types';

export interface Apibasedcritic-FormProps {
  initialData?: Partial<APIBasedCritic-Output>;
  onSubmit: (data: APIBasedCritic-Output) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function Apibasedcritic-Form({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
}: Apibasedcritic-FormProps) {
  const [formData, setFormData] = useState<Partial<APIBasedCritic-Output>>(initialData);

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
    await onSubmit(formData as APIBasedCritic-Output);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label htmlFor="server_url" className="block text-sm font-medium text-gray-700">
          Server Url
        </label>
        <p className="text-sm text-gray-500">Base URL of the vLLM classification service</p>
        <input
          type="text"
          id="server_url"
          name="server_url"
          value={formData.server_url || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="api_key" className="block text-sm font-medium text-gray-700">
          Api Key *
        </label>
        <p className="text-sm text-gray-500">API key for authenticating with the vLLM service</p>
        <input
          type="text"
          id="api_key"
          name="api_key"
          value={formData.api_key || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="model_name" className="block text-sm font-medium text-gray-700">
          Model Name
        </label>
        <p className="text-sm text-gray-500">Name of the model to use</p>
        <input
          type="text"
          id="model_name"
          name="model_name"
          value={formData.model_name || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="tokenizer_name" className="block text-sm font-medium text-gray-700">
          Tokenizer Name
        </label>
        <p className="text-sm text-gray-500">HuggingFace tokenizer name for loading chat template</p>
        <input
          type="text"
          id="tokenizer_name"
          name="tokenizer_name"
          value={formData.tokenizer_name || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex items-center">
        <input
          id="pass_tools_definitions"
          name="pass_tools_definitions"
          type="checkbox"
          checked={formData.pass_tools_definitions || false}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="pass_tools_definitions" className="ml-2 block text-sm text-gray-900">
          Pass Tools Definitions
        </label>
        <p className="ml-6 text-sm text-gray-500">Whether to pass tool definitions to the model</p>
      </div>
      <div>
        <label htmlFor="timeout_seconds" className="block text-sm font-medium text-gray-700">
          Timeout Seconds
        </label>
        <p className="text-sm text-gray-500">Timeout for requests to the model</p>
        <input
          type="number"
          id="timeout_seconds"
          name="timeout_seconds"
          value={formData.timeout_seconds || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex items-center">
        <input
          id="has_success_label"
          name="has_success_label"
          type="checkbox"
          checked={formData.has_success_label || false}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="has_success_label" className="ml-2 block text-sm text-gray-900">
          Has Success Label
        </label>
        <p className="ml-6 text-sm text-gray-500">Whether the model predicts success label at index 0</p>
      </div>
      <div>
        <label htmlFor="sentiment_labels" className="block text-sm font-medium text-gray-700">
          Sentiment Labels
        </label>
        
        <input
          type="text"
          id="sentiment_labels"
          name="sentiment_labels"
          value={formData.sentiment_labels || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="agent_issue_labels" className="block text-sm font-medium text-gray-700">
          Agent Issue Labels
        </label>
        
        <input
          type="text"
          id="agent_issue_labels"
          name="agent_issue_labels"
          value={formData.agent_issue_labels || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="infra_labels" className="block text-sm font-medium text-gray-700">
          Infra Labels
        </label>
        
        <input
          type="text"
          id="infra_labels"
          name="infra_labels"
          value={formData.infra_labels || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="user_followup_labels" className="block text-sm font-medium text-gray-700">
          User Followup Labels
        </label>
        
        <input
          type="text"
          id="user_followup_labels"
          name="user_followup_labels"
          value={formData.user_followup_labels || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="sentiment_map" className="block text-sm font-medium text-gray-700">
          Sentiment Map
        </label>
        
        <input
          type="text"
          id="sentiment_map"
          name="sentiment_map"
          value={formData.sentiment_map || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
          Mode
        </label>
        <p className="text-sm text-gray-500">When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action)</p>
        <select
          id="mode"
          name="mode"
          value={formData.mode || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Mode</option>
            <option value="finish_and_message">finish_and_message</option>
            <option value="all_actions">all_actions</option>
        </select>
      </div>
      <div>
        <label htmlFor="iterative_refinement" className="block text-sm font-medium text-gray-700">
          Iterative Refinement
        </label>
        <p className="text-sm text-gray-500">Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations.</p>
        <input
          type="text"
          id="iterative_refinement"
          name="iterative_refinement"
          value={formData.iterative_refinement || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="kind" className="block text-sm font-medium text-gray-700">
          Kind *
        </label>
        
        <input
          type="text"
          id="kind"
          name="kind"
          value={formData.kind || ''}
          onChange={handleChange}
          required
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
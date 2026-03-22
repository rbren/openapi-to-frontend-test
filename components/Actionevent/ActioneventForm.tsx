import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ActionEvent } from '../../client/types';

export interface ActioneventFormProps {
  initialData?: Partial<ActionEvent>;
  onSubmit: (data: ActionEvent) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ActioneventForm({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
}: ActioneventFormProps) {
  const [formData, setFormData] = useState<Partial<ActionEvent>>(initialData);

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
    await onSubmit(formData as ActionEvent);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700">
          Timestamp
        </label>
        <p className="text-sm text-gray-500">Event timestamp</p>
        <input
          type="text"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
          Source
        </label>
        
        <select
          id="source"
          name="source"
          value={formData.source || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Source</option>
            <option value="agent">agent</option>
            <option value="user">user</option>
            <option value="environment">environment</option>
        </select>
      </div>
      <div>
        <label htmlFor="thought" className="block text-sm font-medium text-gray-700">
          Thought *
        </label>
        <p className="text-sm text-gray-500">The thought process of the agent before taking this action</p>
        <input
          type="text"
          id="thought"
          name="thought"
          value={formData.thought || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="reasoning_content" className="block text-sm font-medium text-gray-700">
          Reasoning Content
        </label>
        <p className="text-sm text-gray-500">Intermediate reasoning/thinking content from reasoning models</p>
        <input
          type="text"
          id="reasoning_content"
          name="reasoning_content"
          value={formData.reasoning_content || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="thinking_blocks" className="block text-sm font-medium text-gray-700">
          Thinking Blocks
        </label>
        <p className="text-sm text-gray-500">Anthropic thinking blocks from the LLM response</p>
        <input
          type="text"
          id="thinking_blocks"
          name="thinking_blocks"
          value={formData.thinking_blocks || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="responses_reasoning_item" className="block text-sm font-medium text-gray-700">
          Responses Reasoning Item
        </label>
        <p className="text-sm text-gray-500">OpenAI Responses reasoning item from model output</p>
        <input
          type="text"
          id="responses_reasoning_item"
          name="responses_reasoning_item"
          value={formData.responses_reasoning_item || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="action" className="block text-sm font-medium text-gray-700">
          Action
        </label>
        <p className="text-sm text-gray-500">Single tool call returned by LLM (None when non-executable)</p>
        <input
          type="text"
          id="action"
          name="action"
          value={formData.action || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="tool_name" className="block text-sm font-medium text-gray-700">
          Tool Name *
        </label>
        <p className="text-sm text-gray-500">The name of the tool being called</p>
        <input
          type="text"
          id="tool_name"
          name="tool_name"
          value={formData.tool_name || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="tool_call_id" className="block text-sm font-medium text-gray-700">
          Tool Call Id *
        </label>
        <p className="text-sm text-gray-500">The unique id returned by LLM API for this tool call</p>
        <input
          type="text"
          id="tool_call_id"
          name="tool_call_id"
          value={formData.tool_call_id || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="tool_call" className="block text-sm font-medium text-gray-700">
          Tool Call *
        </label>
        <p className="text-sm text-gray-500">The tool call received from the LLM response. We keep a copy of it so it is easier to construct it into LLM messageThis could be different from `action`: e.g., `tool_call` may contain `security_risk` field predicted by LLM when LLM risk analyzer is enabled, while `action` does not.</p>
        <input
          type="text"
          id="tool_call"
          name="tool_call"
          value={formData.tool_call || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="llm_response_id" className="block text-sm font-medium text-gray-700">
          Llm Response Id *
        </label>
        <p className="text-sm text-gray-500">Completion or Response ID of the LLM response that generated this eventE.g., Can be used to group related actions from same LLM response. This helps in tracking and managing results of parallel function calling from the same LLM response.</p>
        <input
          type="text"
          id="llm_response_id"
          name="llm_response_id"
          value={formData.llm_response_id || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="security_risk" className="block text-sm font-medium text-gray-700">
          Security Risk
        </label>
        <p className="text-sm text-gray-500">The LLM's assessment of the safety risk of this action.</p>
        <input
          type="text"
          id="security_risk"
          name="security_risk"
          value={formData.security_risk || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="critic_result" className="block text-sm font-medium text-gray-700">
          Critic Result
        </label>
        <p className="text-sm text-gray-500">Optional critic evaluation of this action and preceding history.</p>
        <input
          type="text"
          id="critic_result"
          name="critic_result"
          value={formData.critic_result || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
          Summary
        </label>
        <p className="text-sm text-gray-500">A concise summary (approximately 10 words) of what this action does, provided by the LLM for explainability and debugging. Examples of good summaries: 'editing configuration file for deployment settings' | 'searching codebase for authentication function definitions' | 'installing required dependencies from package manifest' | 'running tests to verify bug fix' | 'viewing directory structure to locate source files'</p>
        <input
          type="text"
          id="summary"
          name="summary"
          value={formData.summary || ''}
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
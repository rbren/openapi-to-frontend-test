import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Agent-Output } from '../../client/types';

export interface Agent-FormProps {
  initialData?: Partial<Agent-Output>;
  onSubmit: (data: Agent-Output) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function Agent-Form({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
}: Agent-FormProps) {
  const [formData, setFormData] = useState<Partial<Agent-Output>>(initialData);

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
    await onSubmit(formData as Agent-Output);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label htmlFor="llm" className="block text-sm font-medium text-gray-700">
          Llm *
        </label>
        <p className="text-sm text-gray-500">LLM configuration for the agent.</p>
        <input
          type="text"
          id="llm"
          name="llm"
          value={formData.llm || ''}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="tools" className="block text-sm font-medium text-gray-700">
          Tools
        </label>
        <p className="text-sm text-gray-500">List of tools to initialize for the agent.</p>
        <input
          type="text"
          id="tools"
          name="tools"
          value={formData.tools || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="mcp_config" className="block text-sm font-medium text-gray-700">
          Mcp Config
        </label>
        <p className="text-sm text-gray-500">Optional MCP configuration dictionary to create MCP tools.</p>
        <input
          type="text"
          id="mcp_config"
          name="mcp_config"
          value={formData.mcp_config || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="filter_tools_regex" className="block text-sm font-medium text-gray-700">
          Filter Tools Regex
        </label>
        <p className="text-sm text-gray-500">Optional regex to filter the tools available to the agent by name. This is applied after any tools provided in `tools` and any MCP tools are added.</p>
        <input
          type="text"
          id="filter_tools_regex"
          name="filter_tools_regex"
          value={formData.filter_tools_regex || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="include_default_tools" className="block text-sm font-medium text-gray-700">
          Include Default Tools
        </label>
        <p className="text-sm text-gray-500">List of default tool class names to include. By default, the agent includes 'FinishTool' and 'ThinkTool'. Set to an empty list to disable all default tools, or provide a subset to include only specific ones. Example: include_default_tools=['FinishTool'] to only include FinishTool, or include_default_tools=[] to disable all default tools.</p>
        <input
          type="text"
          id="include_default_tools"
          name="include_default_tools"
          value={formData.include_default_tools || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="agent_context" className="block text-sm font-medium text-gray-700">
          Agent Context
        </label>
        <p className="text-sm text-gray-500">Optional AgentContext to initialize the agent with specific context.</p>
        <input
          type="text"
          id="agent_context"
          name="agent_context"
          value={formData.agent_context || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="system_prompt_filename" className="block text-sm font-medium text-gray-700">
          System Prompt Filename
        </label>
        <p className="text-sm text-gray-500">System prompt template filename. Can be either:
- A relative filename (e.g., 'system_prompt.j2') loaded from the agent's prompts directory
- An absolute path (e.g., '/path/to/custom_prompt.j2')</p>
        <input
          type="text"
          id="system_prompt_filename"
          name="system_prompt_filename"
          value={formData.system_prompt_filename || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="security_policy_filename" className="block text-sm font-medium text-gray-700">
          Security Policy Filename
        </label>
        <p className="text-sm text-gray-500">Security policy template filename. Can be either:
- A relative filename (e.g., 'security_policy.j2') loaded from the agent's prompts directory
- An absolute path (e.g., '/path/to/custom_security_policy.j2')</p>
        <input
          type="text"
          id="security_policy_filename"
          name="security_policy_filename"
          value={formData.security_policy_filename || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="system_prompt_kwargs" className="block text-sm font-medium text-gray-700">
          System Prompt Kwargs
        </label>
        <p className="text-sm text-gray-500">Optional kwargs to pass to the system prompt Jinja2 template.</p>
        <input
          type="text"
          id="system_prompt_kwargs"
          name="system_prompt_kwargs"
          value={formData.system_prompt_kwargs || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="condenser" className="block text-sm font-medium text-gray-700">
          Condenser
        </label>
        <p className="text-sm text-gray-500">Optional condenser to use for condensing conversation history.</p>
        <input
          type="text"
          id="condenser"
          name="condenser"
          value={formData.condenser || ''}
          onChange={handleChange}
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="critic" className="block text-sm font-medium text-gray-700">
          Critic
        </label>
        <p className="text-sm text-gray-500">EXPERIMENTAL: Optional critic to evaluate agent actions and messages in real-time. API and behavior may change without notice. May impact performance, especially in 'all_actions' mode.</p>
        <input
          type="text"
          id="critic"
          name="critic"
          value={formData.critic || ''}
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
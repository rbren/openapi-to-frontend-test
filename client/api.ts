// Generated API client from OpenAPI specification

import type {
  ServerInfo,
  EventPage,
  HTTPValidationError,
  ConversationsPage,
  Conversation,
  CreateConversationRequest,
  UpdateConversationRequest,
  CreateCommandRequest,
  McpServer,
  McpPrompt,
  McpResource,
  McpResourceTemplate,
  McpTool,
  SearchEventsParams,
  CountEventsParams,
  SearchConversationsParams,
  CountConversationsParams,
  GetResourceParams,
  CallToolParams,
  GetPromptMessagesParams,
} from './types';
import { AuthConfig, attachAuth } from './auth';

export interface ApiConfig {
  baseUrl: string;
  auth?: AuthConfig;
}

export class ApiClient {
  private baseUrl: string;
  private auth?: AuthConfig;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.auth = config.auth;
  }

  private async request<T>(
    method: string,
    path: string,
    options: {
      params?: Record<string, string | number | boolean | undefined | null>;
      body?: unknown;
    } = {}
  ): Promise<T> {
    const url = new URL(path, this.baseUrl);
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.auth) {
      attachAuth(headers, url, this.auth);
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      return response.json();
    }
    
    // For non-JSON responses, return text
    return response.text() as unknown as T;
  }

  // Server Details endpoints
  async alive(): Promise<Record<string, unknown>> {
    return this.request('GET', '/alive');
  }

  async health(): Promise<string> {
    return this.request('GET', '/health');
  }

  async ready(): Promise<Record<string, string>> {
    return this.request('GET', '/ready');
  }

  async getServerInfo(): Promise<ServerInfo> {
    return this.request('GET', '/server_info');
  }

  // Events endpoints
  async searchConversationEvents(
    conversationId: string,
    params?: SearchEventsParams
  ): Promise<EventPage> {
    return this.request('GET', `/api/conversations/${conversationId}/events/search`, { params });
  }

  async countConversationEvents(
    conversationId: string,
    params?: CountEventsParams
  ): Promise<{ count: number }> {
    return this.request('GET', `/api/conversations/${conversationId}/events/count`, { params });
  }

  // Conversations endpoints
  async searchConversations(params?: SearchConversationsParams): Promise<ConversationsPage> {
    return this.request('GET', '/api/conversations/search', { params });
  }

  async countConversations(params?: CountConversationsParams): Promise<{ count: number }> {
    return this.request('GET', '/api/conversations/count', { params });
  }

  async getConversation(conversationId: string): Promise<Conversation> {
    return this.request('GET', `/api/conversations/${conversationId}`);
  }

  async createConversation(data?: CreateConversationRequest): Promise<Conversation> {
    return this.request('POST', '/api/conversations', { body: data || {} });
  }

  async updateConversation(
    conversationId: string,
    data: UpdateConversationRequest
  ): Promise<Conversation> {
    return this.request('PUT', `/api/conversations/${conversationId}`, { body: data });
  }

  async deleteConversation(conversationId: string): Promise<{ status: string }> {
    return this.request('DELETE', `/api/conversations/${conversationId}`);
  }

  async sendConversationCommand(
    conversationId: string,
    data: CreateCommandRequest
  ): Promise<{ status: string }> {
    return this.request('POST', `/api/conversations/${conversationId}/commands`, { body: data });
  }

  // MCP endpoints
  async listMcpServers(): Promise<McpServer[]> {
    return this.request('GET', '/api/mcp/servers');
  }

  async getMcpPrompts(serverName: string): Promise<McpPrompt[]> {
    return this.request('GET', `/api/mcp/servers/${serverName}/prompts`);
  }

  async getMcpResources(serverName: string): Promise<McpResource[]> {
    return this.request('GET', `/api/mcp/servers/${serverName}/resources`);
  }

  async getMcpResourceTemplates(serverName: string): Promise<McpResourceTemplate[]> {
    return this.request('GET', `/api/mcp/servers/${serverName}/resource-templates`);
  }

  async getMcpTools(serverName: string): Promise<McpTool[]> {
    return this.request('GET', `/api/mcp/servers/${serverName}/tools`);
  }

  async getMcpResource(
    serverName: string,
    resourceUri: string,
    params: GetResourceParams
  ): Promise<unknown> {
    return this.request('POST', `/api/mcp/servers/${serverName}/resources/${encodeURIComponent(resourceUri)}`, {
      params,
    });
  }

  async callMcpTool(
    toolName: string,
    params: CallToolParams,
    args: Record<string, unknown>
  ): Promise<unknown> {
    return this.request('POST', `/api/mcp/tools/${toolName}/call`, {
      params,
      body: args,
    });
  }

  async getMcpPromptMessages(
    promptName: string,
    params: GetPromptMessagesParams,
    args: Record<string, unknown>
  ): Promise<unknown> {
    return this.request('POST', `/api/mcp/prompts/${promptName}/messages`, {
      params,
      body: args,
    });
  }

  // Tool definitions endpoint
  async getToolDefinitions(): Promise<unknown> {
    return this.request('GET', '/api/tools');
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: string
  ) {
    super(`API Error ${status}: ${body}`);
    this.name = 'ApiError';
  }
}
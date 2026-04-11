// Auto-generated API client from OpenAPI specification
// DO NOT EDIT MANUALLY

import type {
  AskAgentRequest,
  AskAgentResponse,
  BashCommand,
  BashEventBase,
  BashEventPage,
  BashEventSortOrder,
  BashOutput,
  ConfirmationResponseRequest,
  ConversationInfo,
  ConversationPage,
  ConversationSortOrder,
  DesktopUrlResponse,
  Event,
  EventPage,
  EventSortOrder,
  ExecuteBashRequest,
  GenerateTitleRequest,
  GenerateTitleResponse,
  GitChange,
  GitDiff,
  HooksRequest,
  HooksResponse,
  SendMessageRequest,
  ServerInfo,
  SetConfirmationPolicyRequest,
  SetSecurityAnalyzerRequest,
  SkillsRequest,
  SkillsResponse,
  StartConversationRequest,
  Success,
  SyncResponse,
  UpdateConversationRequest,
  UpdateSecretsRequest,
  VSCodeUrlResponse,
} from './types';

import { AuthConfig, attachAuth } from './auth';

export interface ApiConfig {
  baseUrl: string;
  auth?: AuthConfig;
}


export interface SearchconversationeventsapiconversationsconversationideventssearchgetParams {
  pageId?: Record<string, unknown>;
  limit?: number;
  kind?: Record<string, unknown>;
  source?: Record<string, unknown>;
  body?: Record<string, unknown>;
  sortOrder?: EventSortOrder;
  timestampGte?: Record<string, unknown>;
  timestampLt?: Record<string, unknown>;
}


export interface CountconversationeventsapiconversationsconversationideventscountgetParams {
  kind?: Record<string, unknown>;
  source?: Record<string, unknown>;
  body?: Record<string, unknown>;
  timestampGte?: Record<string, unknown>;
  timestampLt?: Record<string, unknown>;
}


export interface SearchconversationsapiconversationssearchgetParams {
  pageId?: Record<string, unknown>;
  limit?: number;
  status?: Record<string, unknown>;
  sortOrder?: ConversationSortOrder;
}


export interface CountconversationsapiconversationscountgetParams {
  status?: Record<string, unknown>;
}


export interface BatchgetconversationsapiconversationsgetParams {
  ids: string[];
}


export interface SearchbasheventsapibashbasheventssearchgetParams {
  kindEq?: Record<string, unknown>;
  commandIdEq?: Record<string, unknown>;
  timestampGte?: Record<string, unknown>;
  timestampLt?: Record<string, unknown>;
  /** Only returns BashOutput events with order > this value. Useful for polling to fetch only new events since the last poll. */
  orderGt?: Record<string, unknown>;
  sortOrder?: BashEventSortOrder;
  pageId?: Record<string, unknown>;
  limit?: number;
}


export interface GetvscodeurlapivscodeurlgetParams {
  baseUrl?: string;
  workspaceDir?: string;
}


export interface GetdesktopurlapidesktopurlgetParams {
  baseUrl?: string;
}

export class ApiClient {
  private baseUrl: string;
  private auth?: AuthConfig;

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/g, '');
    this.auth = config.auth;
  }

  private async request<T>(
    method: string,
    path: string,
    options: {
      params?: Record<string, string | number | boolean | undefined>;
      body?: unknown;
    } = {}
  ): Promise<T> {
    const url = new URL(path, this.baseUrl);
    
    // Add query parameters
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

    // Attach authentication
    if (this.auth) {
      attachAuth(headers, url, this.auth);
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new ApiError(response.status, errorBody);
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {} as T;
    }

    return response.json();
  }

  /**
   * Alive
   *
   * Basic liveness check - returns OK if the server process is running.
   */
  async aliveAliveGet(): Promise<void> {
    return this.request<void>('GET', `/alive`);
  }
  /**
   * Health
   *
   * Basic health check - returns OK if the server process is running.
   */
  async healthHealthGet(): Promise<string> {
    return this.request<string>('GET', `/health`);
  }
  /**
   * Ready
   *
   * Readiness check - returns OK only if the server has completed initialization.
   * 
   * This endpoint should be used by Kubernetes readiness probes to determine
   * when the pod is ready to receive traffic. Returns 503 during initialization.
   */
  async readyReadyGet(): Promise<Record<string, string>> {
    return this.request<Record<string, string>>('GET', `/ready`);
  }
  /**
   * Get Server Info
   */
  async getServerInfoServerInfoGet(): Promise<ServerInfo> {
    return this.request<ServerInfo>('GET', `/server_info`);
  }
  /**
   * Search Conversation Events
   *
   * Search / List local events
   */
  async searchConversationEventsApiConversationsConversationIdEventsSearchGet(conversationId: string, params?: SearchconversationeventsapiconversationsconversationideventssearchgetParams): Promise<EventPage> {
    return this.request<EventPage>('GET', `/api/conversations/${conversationId}/events/search`, { params });
  }
  /**
   * Count Conversation Events
   *
   * Count local events matching the given filters
   */
  async countConversationEventsApiConversationsConversationIdEventsCountGet(conversationId: string, params?: CountconversationeventsapiconversationsconversationideventscountgetParams): Promise<number> {
    return this.request<number>('GET', `/api/conversations/${conversationId}/events/count`, { params });
  }
  /**
   * Get Conversation Event
   *
   * Get a local event given an id
   */
  async getConversationEventApiConversationsConversationIdEventsEventIdGet(eventId: string, conversationId: string): Promise<Event> {
    return this.request<Event>('GET', `/api/conversations/${conversationId}/events/${eventId}`);
  }
  /**
   * Batch Get Conversation Events
   *
   * Get a batch of local events given their ids, returning null for any
   * missing item.
   */
  async batchGetConversationEventsApiConversationsConversationIdEventsGet(conversationId: string, data: string[]): Promise<Record<string, unknown>[]> {
    return this.request<Record<string, unknown>[]>('GET', `/api/conversations/${conversationId}/events`);
  }
  /**
   * Send Message
   *
   * Send a message to a conversation
   */
  async sendMessageApiConversationsConversationIdEventsPost(conversationId: string, data: SendMessageRequest): Promise<Success> {
    return this.request<Success>('POST', `/api/conversations/${conversationId}/events`, { body: data });
  }
  /**
   * Respond To Confirmation
   *
   * Accept or reject a pending action in confirmation mode.
   */
  async respondToConfirmationApiConversationsConversationIdEventsRespondToConfirmationPost(conversationId: string, data: ConfirmationResponseRequest): Promise<Success> {
    return this.request<Success>('POST', `/api/conversations/${conversationId}/events/respond_to_confirmation`, { body: data });
  }
  /**
   * Search Conversations
   *
   * Search / List conversations
   */
  async searchConversationsApiConversationsSearchGet(params?: SearchconversationsapiconversationssearchgetParams): Promise<ConversationPage> {
    return this.request<ConversationPage>('GET', `/api/conversations/search`, { params });
  }
  /**
   * Count Conversations
   *
   * Count conversations matching the given filters
   */
  async countConversationsApiConversationsCountGet(params?: CountconversationsapiconversationscountgetParams): Promise<number> {
    return this.request<number>('GET', `/api/conversations/count`, { params });
  }
  /**
   * Get Conversation
   *
   * Given an id, get a conversation
   */
  async getConversationApiConversationsConversationIdGet(conversationId: string): Promise<ConversationInfo> {
    return this.request<ConversationInfo>('GET', `/api/conversations/${conversationId}`);
  }
  /**
   * Update Conversation
   *
   * Update conversation metadata.
   * 
   * This endpoint allows updating conversation details like title.
   */
  async updateConversationApiConversationsConversationIdPatch(conversationId: string, data: UpdateConversationRequest): Promise<Success> {
    return this.request<Success>('PATCH', `/api/conversations/${conversationId}`, { body: data });
  }
  /**
   * Delete Conversation
   *
   * Permanently delete a conversation.
   */
  async deleteConversationApiConversationsConversationIdDelete(conversationId: string): Promise<Success> {
    return this.request<Success>('DELETE', `/api/conversations/${conversationId}`);
  }
  /**
   * Batch Get Conversations
   *
   * Get a batch of conversations given their ids, returning null for
   * any missing item
   */
  async batchGetConversationsApiConversationsGet(params?: BatchgetconversationsapiconversationsgetParams): Promise<Record<string, unknown>[]> {
    return this.request<Record<string, unknown>[]>('GET', `/api/conversations`, { params });
  }
  /**
   * Start Conversation
   *
   * Start a conversation in the local environment.
   */
  async startConversationApiConversationsPost(data: StartConversationRequest): Promise<ConversationInfo> {
    return this.request<ConversationInfo>('POST', `/api/conversations`, { body: data });
  }
  /**
   * Pause Conversation
   *
   * Pause a conversation, allowing it to be resumed later.
   */
  async pauseConversationApiConversationsConversationIdPausePost(conversationId: string): Promise<Success> {
    return this.request<Success>('POST', `/api/conversations/${conversationId}/pause`, { body: data });
  }
  /**
   * Run Conversation
   *
   * Start running the conversation in the background.
   */
  async runConversationApiConversationsConversationIdRunPost(conversationId: string): Promise<Success> {
    return this.request<Success>('POST', `/api/conversations/${conversationId}/run`, { body: data });
  }
  /**
   * Update Conversation Secrets
   *
   * Update secrets for a conversation.
   */
  async updateConversationSecretsApiConversationsConversationIdSecretsPost(conversationId: string, data: UpdateSecretsRequest): Promise<Success> {
    return this.request<Success>('POST', `/api/conversations/${conversationId}/secrets`, { body: data });
  }
  /**
   * Set Conversation Confirmation Policy
   *
   * Set the confirmation policy for a conversation.
   */
  async setConversationConfirmationPolicyApiConversationsConversationIdConfirmationPolicyPost(conversationId: string, data: SetConfirmationPolicyRequest): Promise<Success> {
    return this.request<Success>('POST', `/api/conversations/${conversationId}/confirmation_policy`, { body: data });
  }
  /**
   * Set Conversation Security Analyzer
   *
   * Set the security analyzer for a conversation.
   */
  async setConversationSecurityAnalyzerApiConversationsConversationIdSecurityAnalyzerPost(conversationId: string, data: SetSecurityAnalyzerRequest): Promise<Success> {
    return this.request<Success>('POST', `/api/conversations/${conversationId}/security_analyzer`, { body: data });
  }
  /**
   * Generate Conversation Title
   *
   * Generate a title for the conversation using LLM.
   */
  async generateConversationTitleApiConversationsConversationIdGenerateTitlePost(conversationId: string, data: GenerateTitleRequest): Promise<GenerateTitleResponse> {
    return this.request<GenerateTitleResponse>('POST', `/api/conversations/${conversationId}/generate_title`, { body: data });
  }
  /**
   * Ask Agent
   *
   * Ask the agent a simple question without affecting conversation state.
   */
  async askAgentApiConversationsConversationIdAskAgentPost(conversationId: string, data: AskAgentRequest): Promise<AskAgentResponse> {
    return this.request<AskAgentResponse>('POST', `/api/conversations/${conversationId}/ask_agent`, { body: data });
  }
  /**
   * Condense Conversation
   *
   * Force condensation of the conversation history.
   */
  async condenseConversationApiConversationsConversationIdCondensePost(conversationId: string): Promise<Success> {
    return this.request<Success>('POST', `/api/conversations/${conversationId}/condense`, { body: data });
  }
  /**
   * List Available Tools
   *
   * List all available tools.
   */
  async listAvailableToolsApiToolsGet(): Promise<string[]> {
    return this.request<string[]>('GET', `/api/tools/`);
  }
  /**
   * Search Bash Events
   *
   * Search / List bash event events
   */
  async searchBashEventsApiBashBashEventsSearchGet(params?: SearchbasheventsapibashbasheventssearchgetParams): Promise<BashEventPage> {
    return this.request<BashEventPage>('GET', `/api/bash/bash_events/search`, { params });
  }
  /**
   * Get Bash Event
   *
   * Get a bash event event given an id
   */
  async getBashEventApiBashBashEventsEventIdGet(eventId: string): Promise<BashEventBase> {
    return this.request<BashEventBase>('GET', `/api/bash/bash_events/${eventId}`);
  }
  /**
   * Batch Get Bash Events
   *
   * Get a batch of bash event events given their ids, returning null for any
   * missing item.
   */
  async batchGetBashEventsApiBashBashEventsGet(data: string[]): Promise<Record<string, unknown>[]> {
    return this.request<Record<string, unknown>[]>('GET', `/api/bash/bash_events/`);
  }
  /**
   * Start Bash Command
   *
   * Execute a bash command in the background
   */
  async startBashCommandApiBashStartBashCommandPost(data: ExecuteBashRequest): Promise<BashCommand> {
    return this.request<BashCommand>('POST', `/api/bash/start_bash_command`, { body: data });
  }
  /**
   * Execute Bash Command
   *
   * Execute a bash command and wait for a result
   */
  async executeBashCommandApiBashExecuteBashCommandPost(data: ExecuteBashRequest): Promise<BashOutput> {
    return this.request<BashOutput>('POST', `/api/bash/execute_bash_command`, { body: data });
  }
  /**
   * Clear All Bash Events
   *
   * Clear all bash events from storage
   */
  async clearAllBashEventsApiBashBashEventsDelete(): Promise<Record<string, number>> {
    return this.request<Record<string, number>>('DELETE', `/api/bash/bash_events`);
  }
  /**
   * Git Changes
   */
  async gitChangesApiGitChangesPathGet(path: string): Promise<GitChange[]> {
    return this.request<GitChange[]>('GET', `/api/git/changes/${path}`);
  }
  /**
   * Git Diff
   */
  async gitDiffApiGitDiffPathGet(path: string): Promise<GitDiff> {
    return this.request<GitDiff>('GET', `/api/git/diff/${path}`);
  }
  /**
   * Upload File
   *
   * Upload a file to the workspace.
   */
  async uploadFileApiFileUploadPathPost(path: string): Promise<Success> {
    return this.request<Success>('POST', `/api/file/upload/${path}`, { body: data });
  }
  /**
   * Download File
   *
   * Download a file from the workspace.
   */
  async downloadFileApiFileDownloadPathGet(path: string): Promise<void> {
    return this.request<void>('GET', `/api/file/download/${path}`);
  }
  /**
   * Download Trajectory
   *
   * Download a file from the workspace.
   */
  async downloadTrajectoryApiFileDownloadTrajectoryConversationIdGet(conversationId: string): Promise<void> {
    return this.request<void>('GET', `/api/file/download-trajectory/${conversationId}`);
  }
  /**
   * Get Vscode Url
   *
   * Get the VSCode URL with authentication token.
   * 
   * Args:
   *     base_url: Base URL for the VSCode server (default: http://localhost:8001)
   *     workspace_dir: Path to workspace directory
   * 
   * Returns:
   *     VSCode URL with token if available, None otherwise
   */
  async getVscodeUrlApiVscodeUrlGet(params?: GetvscodeurlapivscodeurlgetParams): Promise<VSCodeUrlResponse> {
    return this.request<VSCodeUrlResponse>('GET', `/api/vscode/url`, { params });
  }
  /**
   * Get Vscode Status
   *
   * Get the VSCode server status.
   * 
   * Returns:
   *     Dictionary with running status and enabled status
   */
  async getVscodeStatusApiVscodeStatusGet(): Promise<Record<string, Record<string, unknown>>> {
    return this.request<Record<string, Record<string, unknown>>>('GET', `/api/vscode/status`);
  }
  /**
   * Get Desktop Url
   *
   * Get the noVNC URL for desktop access.
   * 
   * Args:
   *     base_url: Base URL for the noVNC server (default: http://localhost:8002)
   * 
   * Returns:
   *     noVNC URL if available, None otherwise
   */
  async getDesktopUrlApiDesktopUrlGet(params?: GetdesktopurlapidesktopurlgetParams): Promise<DesktopUrlResponse> {
    return this.request<DesktopUrlResponse>('GET', `/api/desktop/url`, { params });
  }
  /**
   * Get Skills
   *
   * Load and merge skills from all configured sources.
   * 
   * Skills are loaded from multiple sources and merged with the following
   * precedence (later overrides earlier for duplicate names):
   * 1. Sandbox skills (lowest) - Exposed URLs from sandbox
   * 2. Public skills - From GitHub OpenHands/skills repository
   * 3. User skills - From ~/.openhands/skills/
   * 4. Organization skills - From {org}/.openhands or equivalent
   * 5. Project skills (highest) - From {workspace}/.openhands/skills/
   * 
   * Args:
   *     request: SkillsRequest containing configuration for which sources to load.
   * 
   * Returns:
   *     SkillsResponse containing merged skills and source counts.
   */
  async getSkillsApiSkillsPost(data: SkillsRequest): Promise<SkillsResponse> {
    return this.request<SkillsResponse>('POST', `/api/skills`, { body: data });
  }
  /**
   * Sync Skills
   *
   * Force refresh of public skills from GitHub repository.
   * 
   * This triggers a git pull on the cached skills repository to get
   * the latest skills from the OpenHands/skills repository.
   * 
   * Returns:
   *     SyncResponse indicating success or failure.
   */
  async syncSkillsApiSkillsSyncPost(): Promise<SyncResponse> {
    return this.request<SyncResponse>('POST', `/api/skills/sync`, { body: data });
  }
  /**
   * Get Hooks
   *
   * Load hooks from the workspace .openhands/hooks.json file.
   * 
   * This endpoint reads the hooks configuration from the project's
   * .openhands/hooks.json file if it exists.
   * 
   * Args:
   *     request: HooksRequest containing the project directory path.
   * 
   * Returns:
   *     HooksResponse containing the hook configuration or None.
   */
  async getHooksApiHooksPost(data: HooksRequest): Promise<HooksResponse> {
    return this.request<HooksResponse>('POST', `/api/hooks`, { body: data });
  }
  /**
   * Get Server Info
   */
  async getServerInfoGet(): Promise<ServerInfo> {
    return this.request<ServerInfo>('GET', `/`);
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
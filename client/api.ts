/**
 * API client generated from OpenAPI specification
 * DO NOT EDIT MANUALLY
 */

import type { Askagentrequest, Askagentresponse, Bashcommand, Basheventbase, Basheventpage, Bashoutput, Confirmationresponserequest, Conversationinfo, Conversationpage, Desktopurlresponse, Event, Eventpage, Executebashrequest, Generatetitlerequest, Generatetitleresponse, Gitdiff, Hooksrequest, Hooksresponse, Sendmessagerequest, Serverinfo, Setconfirmationpolicyrequest, Setsecurityanalyzerrequest, Skillsrequest, Skillsresponse, Startconversationrequest, Success, Syncresponse, Updateconversationrequest, Updatesecretsrequest, Vscodeurlresponse } from './types';

export interface ApiConfig {
  baseUrl: string;
}

export interface SearchconversationeventsapiconversationsconversationideventssearchgetParams {
  pageId?: Record<string, unknown>;
  limit?: number;
  kind?: Record<string, unknown>;
  source?: Record<string, unknown>;
  body?: Record<string, unknown>;
  sortOrder?: Eventsortorder;
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
  sortOrder?: Conversationsortorder;
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
  sortOrder?: Basheventsortorder;
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

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
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
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  /**
   * Alive
   * Basic liveness check - returns OK if the server process is running.
   */
  async aliveAliveGet(): Promise<void> {
    return this.request('GET', `/alive`);
  }
  /**
   * Health
   * Basic health check - returns OK if the server process is running.
   */
  async healthHealthGet(): Promise<string> {
    return this.request('GET', `/health`);
  }
  /**
   * Ready
   * Readiness check - returns OK only if the server has completed initialization.
   * 
   * This endpoint should be used by Kubernetes readiness probes to determine
   * when the pod is ready to receive traffic. Returns 503 during initialization.
   */
  async readyReadyGet(): Promise<Record<string, string>> {
    return this.request('GET', `/ready`);
  }
  /**
   * Get Server Info
   */
  async getServerInfoServerInfoGet(): Promise<Serverinfo> {
    return this.request('GET', `/server_info`);
  }
  /**
   * Search Conversation Events
   * Search / List local events
   */
  async searchConversationEventsApiConversationsConversationIdEventsSearchGet(conversationId: string, params?: SearchconversationeventsapiconversationsconversationideventssearchgetParams): Promise<Eventpage> {
    return this.request('GET', `/api/conversations/${conversationId}/events/search`, { params });
  }
  /**
   * Count Conversation Events
   * Count local events matching the given filters
   */
  async countConversationEventsApiConversationsConversationIdEventsCountGet(conversationId: string, params?: CountconversationeventsapiconversationsconversationideventscountgetParams): Promise<number> {
    return this.request('GET', `/api/conversations/${conversationId}/events/count`, { params });
  }
  /**
   * Get Conversation Event
   * Get a local event given an id
   */
  async getConversationEventApiConversationsConversationIdEventsEventIdGet(conversationId: string, eventId: string): Promise<Event> {
    return this.request('GET', `/api/conversations/${conversationId}/events/${eventId}`);
  }
  /**
   * Batch Get Conversation Events
   * Get a batch of local events given their ids, returning null for any
   * missing item.
   */
  async batchGetConversationEventsApiConversationsConversationIdEventsGet(conversationId: string, data: string[]): Promise<Record<string, unknown>[]> {
    return this.request('GET', `/api/conversations/${conversationId}/events`, { body: data });
  }
  /**
   * Send Message
   * Send a message to a conversation
   */
  async sendMessageApiConversationsConversationIdEventsPost(conversationId: string, data: Sendmessagerequest): Promise<Success> {
    return this.request('POST', `/api/conversations/${conversationId}/events`, { body: data });
  }
  /**
   * Respond To Confirmation
   * Accept or reject a pending action in confirmation mode.
   */
  async respondToConfirmationApiConversationsConversationIdEventsRespondToConfirmationPost(conversationId: string, data: Confirmationresponserequest): Promise<Success> {
    return this.request('POST', `/api/conversations/${conversationId}/events/respond_to_confirmation`, { body: data });
  }
  /**
   * Search Conversations
   * Search / List conversations
   */
  async searchConversationsApiConversationsSearchGet(params?: SearchconversationsapiconversationssearchgetParams): Promise<Conversationpage> {
    return this.request('GET', `/api/conversations/search`, { params });
  }
  /**
   * Count Conversations
   * Count conversations matching the given filters
   */
  async countConversationsApiConversationsCountGet(params?: CountconversationsapiconversationscountgetParams): Promise<number> {
    return this.request('GET', `/api/conversations/count`, { params });
  }
  /**
   * Get Conversation
   * Given an id, get a conversation
   */
  async getConversationApiConversationsConversationIdGet(conversationId: string): Promise<Conversationinfo> {
    return this.request('GET', `/api/conversations/${conversationId}`);
  }
  /**
   * Update Conversation
   * Update conversation metadata.
   * 
   * This endpoint allows updating conversation details like title.
   */
  async updateConversationApiConversationsConversationIdPatch(conversationId: string, data: Updateconversationrequest): Promise<Success> {
    return this.request('PATCH', `/api/conversations/${conversationId}`, { body: data });
  }
  /**
   * Delete Conversation
   * Permanently delete a conversation.
   */
  async deleteConversationApiConversationsConversationIdDelete(conversationId: string): Promise<Success> {
    return this.request('DELETE', `/api/conversations/${conversationId}`);
  }
  /**
   * Batch Get Conversations
   * Get a batch of conversations given their ids, returning null for
   * any missing item
   */
  async batchGetConversationsApiConversationsGet(params?: BatchgetconversationsapiconversationsgetParams): Promise<Record<string, unknown>[]> {
    return this.request('GET', `/api/conversations`, { params });
  }
  /**
   * Start Conversation
   * Start a conversation in the local environment.
   */
  async startConversationApiConversationsPost(data: Startconversationrequest): Promise<Conversationinfo> {
    return this.request('POST', `/api/conversations`, { body: data });
  }
  /**
   * Pause Conversation
   * Pause a conversation, allowing it to be resumed later.
   */
  async pauseConversationApiConversationsConversationIdPausePost(conversationId: string): Promise<Success> {
    return this.request('POST', `/api/conversations/${conversationId}/pause`);
  }
  /**
   * Run Conversation
   * Start running the conversation in the background.
   */
  async runConversationApiConversationsConversationIdRunPost(conversationId: string): Promise<Success> {
    return this.request('POST', `/api/conversations/${conversationId}/run`);
  }
  /**
   * Update Conversation Secrets
   * Update secrets for a conversation.
   */
  async updateConversationSecretsApiConversationsConversationIdSecretsPost(conversationId: string, data: Updatesecretsrequest): Promise<Success> {
    return this.request('POST', `/api/conversations/${conversationId}/secrets`, { body: data });
  }
  /**
   * Set Conversation Confirmation Policy
   * Set the confirmation policy for a conversation.
   */
  async setConversationConfirmationPolicyApiConversationsConversationIdConfirmationPolicyPost(conversationId: string, data: Setconfirmationpolicyrequest): Promise<Success> {
    return this.request('POST', `/api/conversations/${conversationId}/confirmation_policy`, { body: data });
  }
  /**
   * Set Conversation Security Analyzer
   * Set the security analyzer for a conversation.
   */
  async setConversationSecurityAnalyzerApiConversationsConversationIdSecurityAnalyzerPost(conversationId: string, data: Setsecurityanalyzerrequest): Promise<Success> {
    return this.request('POST', `/api/conversations/${conversationId}/security_analyzer`, { body: data });
  }
  /**
   * Generate Conversation Title
   * Generate a title for the conversation using LLM.
   */
  async generateConversationTitleApiConversationsConversationIdGenerateTitlePost(conversationId: string, data: Generatetitlerequest): Promise<Generatetitleresponse> {
    return this.request('POST', `/api/conversations/${conversationId}/generate_title`, { body: data });
  }
  /**
   * Ask Agent
   * Ask the agent a simple question without affecting conversation state.
   */
  async askAgentApiConversationsConversationIdAskAgentPost(conversationId: string, data: Askagentrequest): Promise<Askagentresponse> {
    return this.request('POST', `/api/conversations/${conversationId}/ask_agent`, { body: data });
  }
  /**
   * Condense Conversation
   * Force condensation of the conversation history.
   */
  async condenseConversationApiConversationsConversationIdCondensePost(conversationId: string): Promise<Success> {
    return this.request('POST', `/api/conversations/${conversationId}/condense`);
  }
  /**
   * List Available Tools
   * List all available tools.
   */
  async listAvailableToolsApiToolsGet(): Promise<string[]> {
    return this.request('GET', `/api/tools/`);
  }
  /**
   * Search Bash Events
   * Search / List bash event events
   */
  async searchBashEventsApiBashBashEventsSearchGet(params?: SearchbasheventsapibashbasheventssearchgetParams): Promise<Basheventpage> {
    return this.request('GET', `/api/bash/bash_events/search`, { params });
  }
  /**
   * Get Bash Event
   * Get a bash event event given an id
   */
  async getBashEventApiBashBashEventsEventIdGet(eventId: string): Promise<Basheventbase> {
    return this.request('GET', `/api/bash/bash_events/${eventId}`);
  }
  /**
   * Batch Get Bash Events
   * Get a batch of bash event events given their ids, returning null for any
   * missing item.
   */
  async batchGetBashEventsApiBashBashEventsGet(data: string[]): Promise<Record<string, unknown>[]> {
    return this.request('GET', `/api/bash/bash_events/`, { body: data });
  }
  /**
   * Start Bash Command
   * Execute a bash command in the background
   */
  async startBashCommandApiBashStartBashCommandPost(data: Executebashrequest): Promise<Bashcommand> {
    return this.request('POST', `/api/bash/start_bash_command`, { body: data });
  }
  /**
   * Execute Bash Command
   * Execute a bash command and wait for a result
   */
  async executeBashCommandApiBashExecuteBashCommandPost(data: Executebashrequest): Promise<Bashoutput> {
    return this.request('POST', `/api/bash/execute_bash_command`, { body: data });
  }
  /**
   * Clear All Bash Events
   * Clear all bash events from storage
   */
  async clearAllBashEventsApiBashBashEventsDelete(): Promise<Record<string, number>> {
    return this.request('DELETE', `/api/bash/bash_events`);
  }
  /**
   * Git Changes
   */
  async gitChangesApiGitChangesPathGet(path: string): Promise<Gitchange[]> {
    return this.request('GET', `/api/git/changes/${path}`);
  }
  /**
   * Git Diff
   */
  async gitDiffApiGitDiffPathGet(path: string): Promise<Gitdiff> {
    return this.request('GET', `/api/git/diff/${path}`);
  }
  /**
   * Upload File
   * Upload a file to the workspace.
   */
  async uploadFileApiFileUploadPathPost(path: string): Promise<Success> {
    return this.request('POST', `/api/file/upload/${path}`);
  }
  /**
   * Download File
   * Download a file from the workspace.
   */
  async downloadFileApiFileDownloadPathGet(path: string): Promise<void> {
    return this.request('GET', `/api/file/download/${path}`);
  }
  /**
   * Download Trajectory
   * Download a file from the workspace.
   */
  async downloadTrajectoryApiFileDownloadTrajectoryConversationIdGet(conversationId: string): Promise<void> {
    return this.request('GET', `/api/file/download-trajectory/${conversationId}`);
  }
  /**
   * Get Vscode Url
   * Get the VSCode URL with authentication token.
   * 
   * Args:
   *     base_url: Base URL for the VSCode server (default: http://localhost:8001)
   *     workspace_dir: Path to workspace directory
   * 
   * Returns:
   *     VSCode URL with token if available, None otherwise
   */
  async getVscodeUrlApiVscodeUrlGet(params?: GetvscodeurlapivscodeurlgetParams): Promise<Vscodeurlresponse> {
    return this.request('GET', `/api/vscode/url`, { params });
  }
  /**
   * Get Vscode Status
   * Get the VSCode server status.
   * 
   * Returns:
   *     Dictionary with running status and enabled status
   */
  async getVscodeStatusApiVscodeStatusGet(): Promise<Record<string, Record<string, unknown>>> {
    return this.request('GET', `/api/vscode/status`);
  }
  /**
   * Get Desktop Url
   * Get the noVNC URL for desktop access.
   * 
   * Args:
   *     base_url: Base URL for the noVNC server (default: http://localhost:8002)
   * 
   * Returns:
   *     noVNC URL if available, None otherwise
   */
  async getDesktopUrlApiDesktopUrlGet(params?: GetdesktopurlapidesktopurlgetParams): Promise<Desktopurlresponse> {
    return this.request('GET', `/api/desktop/url`, { params });
  }
  /**
   * Get Skills
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
  async getSkillsApiSkillsPost(data: Skillsrequest): Promise<Skillsresponse> {
    return this.request('POST', `/api/skills`, { body: data });
  }
  /**
   * Sync Skills
   * Force refresh of public skills from GitHub repository.
   * 
   * This triggers a git pull on the cached skills repository to get
   * the latest skills from the OpenHands/skills repository.
   * 
   * Returns:
   *     SyncResponse indicating success or failure.
   */
  async syncSkillsApiSkillsSyncPost(): Promise<Syncresponse> {
    return this.request('POST', `/api/skills/sync`);
  }
  /**
   * Get Hooks
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
  async getHooksApiHooksPost(data: Hooksrequest): Promise<Hooksresponse> {
    return this.request('POST', `/api/hooks`, { body: data });
  }
  /**
   * Get Server Info
   */
  async getServerInfoGet(): Promise<Serverinfo> {
    return this.request('GET', `/`);
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
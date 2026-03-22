// Generated API client from OpenAPI specification
// Do not edit manually - regenerate using generate_api.py

import * as types from "./types";

export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string = "", headers: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  removeHeader(key: string): void {
    delete this.headers[key];
  }

  // Bash operations
  /** Search / List bash event events */
  async search_bash_events_api_bash_bash_events_search_get(query?: { kind__eq?: string; command_id__eq?: string; timestamp__gte?: string; timestamp__lt?: string; order__gt?: string; sort_order?: string; page_id?: string; limit?: string }, options?: RequestInit): Promise<BashEventPage> {
    const url = `${this.baseUrl}/api/bash/bash_events/search`;
    const params = new URLSearchParams();
    if (query) {
      if (query.kind__eq !== undefined) params.append("kind__eq", query.kind__eq);
      if (query.command_id__eq !== undefined) params.append("command_id__eq", query.command_id__eq);
      if (query.timestamp__gte !== undefined) params.append("timestamp__gte", query.timestamp__gte);
      if (query.timestamp__lt !== undefined) params.append("timestamp__lt", query.timestamp__lt);
      if (query.order__gt !== undefined) params.append("order__gt", query.order__gt);
      if (query.sort_order !== undefined) params.append("sort_order", query.sort_order);
      if (query.page_id !== undefined) params.append("page_id", query.page_id);
      if (query.limit !== undefined) params.append("limit", query.limit);
    }
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Get a bash event event given an id */
  async get_bash_event_api_bash_bash_events__event_id__get(event_id: string, options?: RequestInit): Promise<BashEventBase> {
    const url = `${this.baseUrl}/api/bash/bash_events/${event_id}`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Get a batch of bash event events given their ids, returning null for any
missing item. */
  async batch_get_bash_events_api_bash_bash_events__get(body: any, options?: RequestInit): Promise<any[]> {
    const url = `${this.baseUrl}/api/bash/bash_events/`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Execute a bash command in the background */
  async start_bash_command_api_bash_start_bash_command_post(body: ExecuteBashRequest, options?: RequestInit): Promise<BashCommand> {
    const url = `${this.baseUrl}/api/bash/start_bash_command`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Execute a bash command and wait for a result */
  async execute_bash_command_api_bash_execute_bash_command_post(body: ExecuteBashRequest, options?: RequestInit): Promise<BashOutput> {
    const url = `${this.baseUrl}/api/bash/execute_bash_command`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Clear all bash events from storage */
  async clear_all_bash_events_api_bash_bash_events_delete(options?: RequestInit): Promise<any> {
    const url = `${this.baseUrl}/api/bash/bash_events`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "DELETE",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Conversations operations
  /** Search / List conversations */
  async search_conversations_api_conversations_search_get(query?: { page_id?: string; limit?: string; status?: string; sort_order?: string }, options?: RequestInit): Promise<ConversationPage> {
    const url = `${this.baseUrl}/api/conversations/search`;
    const params = new URLSearchParams();
    if (query) {
      if (query.page_id !== undefined) params.append("page_id", query.page_id);
      if (query.limit !== undefined) params.append("limit", query.limit);
      if (query.status !== undefined) params.append("status", query.status);
      if (query.sort_order !== undefined) params.append("sort_order", query.sort_order);
    }
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Count conversations matching the given filters */
  async count_conversations_api_conversations_count_get(query?: { status?: string }, options?: RequestInit): Promise<integer> {
    const url = `${this.baseUrl}/api/conversations/count`;
    const params = new URLSearchParams();
    if (query) {
      if (query.status !== undefined) params.append("status", query.status);
    }
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Given an id, get a conversation */
  async get_conversation_api_conversations__conversation_id__get(conversation_id: string, options?: RequestInit): Promise<ConversationInfo> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Update conversation metadata.

This endpoint allows updating conversation details like title. */
  async update_conversation_api_conversations__conversation_id__patch(conversation_id: string, body: UpdateConversationRequest, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "PATCH",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Permanently delete a conversation. */
  async delete_conversation_api_conversations__conversation_id__delete(conversation_id: string, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "DELETE",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Get a batch of conversations given their ids, returning null for
any missing item */
  async batch_get_conversations_api_conversations_get(query?: { ids: string }, options?: RequestInit): Promise<any[]> {
    const url = `${this.baseUrl}/api/conversations`;
    const params = new URLSearchParams();
    if (query) {
      if (query.ids !== undefined) params.append("ids", query.ids);
    }
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Start a conversation in the local environment. */
  async start_conversation_api_conversations_post(body: StartConversationRequest, options?: RequestInit): Promise<ConversationInfo> {
    const url = `${this.baseUrl}/api/conversations`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Pause a conversation, allowing it to be resumed later. */
  async pause_conversation_api_conversations__conversation_id__pause_post(conversation_id: string, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/pause`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Start running the conversation in the background. */
  async run_conversation_api_conversations__conversation_id__run_post(conversation_id: string, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/run`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Update secrets for a conversation. */
  async update_conversation_secrets_api_conversations__conversation_id__secrets_post(conversation_id: string, body: UpdateSecretsRequest, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/secrets`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Set the confirmation policy for a conversation. */
  async set_conversation_confirmation_policy_api_conversations__conversation_id__confirmation_policy_post(conversation_id: string, body: SetConfirmationPolicyRequest, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/confirmation_policy`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Set the security analyzer for a conversation. */
  async set_conversation_security_analyzer_api_conversations__conversation_id__security_analyzer_post(conversation_id: string, body: SetSecurityAnalyzerRequest, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/security_analyzer`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Generate a title for the conversation using LLM. */
  async generate_conversation_title_api_conversations__conversation_id__generate_title_post(conversation_id: string, body: GenerateTitleRequest, options?: RequestInit): Promise<GenerateTitleResponse> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/generate_title`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Ask the agent a simple question without affecting conversation state. */
  async ask_agent_api_conversations__conversation_id__ask_agent_post(conversation_id: string, body: AskAgentRequest, options?: RequestInit): Promise<AskAgentResponse> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/ask_agent`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Force condensation of the conversation history. */
  async condense_conversation_api_conversations__conversation_id__condense_post(conversation_id: string, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/condense`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Default operations
  /** Get Server Info */
  async get_server_info__get(options?: RequestInit): Promise<ServerInfo> {
    const url = `${this.baseUrl}/`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Desktop operations
  /** Get the noVNC URL for desktop access.

Args:
    base_url: Base URL for the noVNC server (default: http://localhost:8002)

Returns:
    noVNC URL if available, None otherwise */
  async get_desktop_url_api_desktop_url_get(query?: { base_url?: string }, options?: RequestInit): Promise<DesktopUrlResponse> {
    const url = `${this.baseUrl}/api/desktop/url`;
    const params = new URLSearchParams();
    if (query) {
      if (query.base_url !== undefined) params.append("base_url", query.base_url);
    }
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Events operations
  /** Search / List local events */
  async search_conversation_events_api_conversations__conversation_id__events_search_get(conversation_id: string, query?: { page_id?: string; limit?: string; kind?: string; source?: string; body?: string; sort_order?: string; timestamp__gte?: string; timestamp__lt?: string }, options?: RequestInit): Promise<EventPage> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/events/search`;
    const params = new URLSearchParams();
    if (query) {
      if (query.page_id !== undefined) params.append("page_id", query.page_id);
      if (query.limit !== undefined) params.append("limit", query.limit);
      if (query.kind !== undefined) params.append("kind", query.kind);
      if (query.source !== undefined) params.append("source", query.source);
      if (query.body !== undefined) params.append("body", query.body);
      if (query.sort_order !== undefined) params.append("sort_order", query.sort_order);
      if (query.timestamp__gte !== undefined) params.append("timestamp__gte", query.timestamp__gte);
      if (query.timestamp__lt !== undefined) params.append("timestamp__lt", query.timestamp__lt);
    }
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Count local events matching the given filters */
  async count_conversation_events_api_conversations__conversation_id__events_count_get(conversation_id: string, query?: { kind?: string; source?: string; body?: string; timestamp__gte?: string; timestamp__lt?: string }, options?: RequestInit): Promise<integer> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/events/count`;
    const params = new URLSearchParams();
    if (query) {
      if (query.kind !== undefined) params.append("kind", query.kind);
      if (query.source !== undefined) params.append("source", query.source);
      if (query.body !== undefined) params.append("body", query.body);
      if (query.timestamp__gte !== undefined) params.append("timestamp__gte", query.timestamp__gte);
      if (query.timestamp__lt !== undefined) params.append("timestamp__lt", query.timestamp__lt);
    }
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Get a local event given an id */
  async get_conversation_event_api_conversations__conversation_id__events__event_id__get(conversation_id: string, event_id: string, options?: RequestInit): Promise<Event> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/events/${event_id}`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Get a batch of local events given their ids, returning null for any
missing item. */
  async batch_get_conversation_events_api_conversations__conversation_id__events_get(conversation_id: string, body: any, options?: RequestInit): Promise<any[]> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/events`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Send a message to a conversation */
  async send_message_api_conversations__conversation_id__events_post(conversation_id: string, body: SendMessageRequest, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/events`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Accept or reject a pending action in confirmation mode. */
  async respond_to_confirmation_api_conversations__conversation_id__events_respond_to_confirmation_post(conversation_id: string, body: ConfirmationResponseRequest, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/conversations/${conversation_id}/events/respond_to_confirmation`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Files operations
  /** Upload a file to the workspace. */
  async upload_file_api_file_upload__path__post(path: string, body: FormData, options?: RequestInit): Promise<Success> {
    const url = `${this.baseUrl}/api/file/upload/${path}`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      body,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Download a file from the workspace. */
  async download_file_api_file_download__path__get(path: string, options?: RequestInit): Promise<void> {
    const url = `${this.baseUrl}/api/file/download/${path}`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  /** Download a file from the workspace. */
  async download_trajectory_api_file_download_trajectory__conversation_id__get(conversation_id: string, options?: RequestInit): Promise<void> {
    const url = `${this.baseUrl}/api/file/download-trajectory/${conversation_id}`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  // Git operations
  /** Git Changes */
  async git_changes_api_git_changes__path__get(path: string, options?: RequestInit): Promise<GitChange[]> {
    const url = `${this.baseUrl}/api/git/changes/${path}`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Git Diff */
  async git_diff_api_git_diff__path__get(path: string, options?: RequestInit): Promise<GitDiff> {
    const url = `${this.baseUrl}/api/git/diff/${path}`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Hooks operations
  /** Load hooks from the workspace .openhands/hooks.json file.

This endpoint reads the hooks configuration from the project's
.openhands/hooks.json file if it exists.

Args:
    request: HooksRequest containing the project directory path.

Returns:
    HooksResponse containing the hook configuration or None. */
  async get_hooks_api_hooks_post(body: HooksRequest, options?: RequestInit): Promise<HooksResponse> {
    const url = `${this.baseUrl}/api/hooks`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Server Details operations
  /** Basic liveness check - returns OK if the server process is running. */
  async alive_alive_get(options?: RequestInit): Promise<void> {
    const url = `${this.baseUrl}/alive`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  /** Basic health check - returns OK if the server process is running. */
  async health_health_get(options?: RequestInit): Promise<string> {
    const url = `${this.baseUrl}/health`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Readiness check - returns OK only if the server has completed initialization.

This endpoint should be used by Kubernetes readiness probes to determine
when the pod is ready to receive traffic. Returns 503 during initialization. */
  async ready_ready_get(options?: RequestInit): Promise<any> {
    const url = `${this.baseUrl}/ready`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Get Server Info */
  async get_server_info_server_info_get(options?: RequestInit): Promise<ServerInfo> {
    const url = `${this.baseUrl}/server_info`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Skills operations
  /** Load and merge skills from all configured sources.

Skills are loaded from multiple sources and merged with the following
precedence (later overrides earlier for duplicate names):
1. Sandbox skills (lowest) - Exposed URLs from sandbox
2. Public skills - From GitHub OpenHands/skills repository
3. User skills - From ~/.openhands/skills/
4. Organization skills - From {org}/.openhands or equivalent
5. Project skills (highest) - From {workspace}/.openhands/skills/

Args:
    request: SkillsRequest containing configuration for which sources to load.

Returns:
    SkillsResponse containing merged skills and source counts. */
  async get_skills_api_skills_post(body: SkillsRequest, options?: RequestInit): Promise<SkillsResponse> {
    const url = `${this.baseUrl}/api/skills`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Force refresh of public skills from GitHub repository.

This triggers a git pull on the cached skills repository to get
the latest skills from the OpenHands/skills repository.

Returns:
    SyncResponse indicating success or failure. */
  async sync_skills_api_skills_sync_post(options?: RequestInit): Promise<SyncResponse> {
    const url = `${this.baseUrl}/api/skills/sync`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Tools operations
  /** List all available tools. */
  async list_available_tools_api_tools__get(options?: RequestInit): Promise<any[]> {
    const url = `${this.baseUrl}/api/tools/`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // VSCode operations
  /** Get the VSCode URL with authentication token.

Args:
    base_url: Base URL for the VSCode server (default: http://localhost:8001)
    workspace_dir: Path to workspace directory

Returns:
    VSCode URL with token if available, None otherwise */
  async get_vscode_url_api_vscode_url_get(query?: { base_url?: string; workspace_dir?: string }, options?: RequestInit): Promise<VSCodeUrlResponse> {
    const url = `${this.baseUrl}/api/vscode/url`;
    const params = new URLSearchParams();
    if (query) {
      if (query.base_url !== undefined) params.append("base_url", query.base_url);
      if (query.workspace_dir !== undefined) params.append("workspace_dir", query.workspace_dir);
    }
    const queryString = params.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
  /** Get the VSCode server status.

Returns:
    Dictionary with running status and enabled status */
  async get_vscode_status_api_vscode_status_get(options?: RequestInit): Promise<any> {
    const url = `${this.baseUrl}/api/vscode/status`;
    const fullUrl = url;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        ...this.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

}
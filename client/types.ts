// Generated TypeScript types from OpenAPI specification

export interface ServerInfo {
  id?: string;
  hostDetails?: string;
  [key: string]: unknown;
}

export interface EventPage {
  events: Event[];
  nextPageId?: string | null;
  hasMore: boolean;
}

export interface Event {
  id?: string;
  kind?: string;
  source?: string;
  timestamp?: string;
  body?: unknown;
  [key: string]: unknown;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ConversationsPage {
  conversations: Conversation[];
  nextPageId?: string | null;
  hasMore: boolean;
}

export interface Conversation {
  id: string;
  createdAt?: string;
  status?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface CreateConversationRequest {
  agentConfig?: AgentConfig;
  metadata?: Record<string, unknown>;
}

export interface AgentConfig {
  tools?: Tool[];
  llmConfig?: LLMConfig;
  [key: string]: unknown;
}

export interface Tool {
  name: string;
  params?: Record<string, unknown>;
}

export interface LLMConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  [key: string]: unknown;
}

export interface UpdateConversationRequest {
  status?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateCommandRequest {
  message: string;
  metadata?: Record<string, unknown>;
}

export interface McpServer {
  name: string;
  transportType: 'stdio' | 'sse';
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  url?: string;
  [key: string]: unknown;
}

export interface McpPrompt {
  id: string;
  name: string;
  description?: string;
  arguments?: McpPromptArgument[];
  [key: string]: unknown;
}

export interface McpPromptArgument {
  name: string;
  description?: string;
  required?: boolean;
}

export interface McpResource {
  id: string;
  uri: string;
  name?: string;
  description?: string;
  mimeType?: string;
  [key: string]: unknown;
}

export interface McpResourceTemplate {
  id: string;
  uriTemplate: string;
  name?: string;
  description?: string;
  mimeType?: string;
  [key: string]: unknown;
}

export interface McpTool {
  name: string;
  title?: string | null;
  description?: string | null;
  inputSchema: Record<string, unknown>;
  outputSchema?: Record<string, unknown> | null;
  icons?: Icon[] | null;
  annotations?: McpToolAnnotations | null;
  meta?: Record<string, unknown> | null;
  [key: string]: unknown;
}

export interface Icon {
  type?: string;
  url?: string;
  [key: string]: unknown;
}

export interface McpToolAnnotations {
  title?: string | null;
  readOnlyHint?: boolean | null;
  destructiveHint?: boolean | null;
  idempotentHint?: boolean | null;
  openWorldHint?: boolean | null;
  [key: string]: unknown;
}

// Event Sort Order
export type EventSortOrder = 'TIMESTAMP' | 'ID';

// Conversation Sort Order
export type ConversationSortOrder = 'CREATED_AT' | 'ID' | 'STATUS';

// Tool Types from the spec
export interface TerminalTool {
  description: string;
  actionType: string;
  paramSchema: {
    command: string;
    timeout?: number;
  };
  meta?: Record<string, unknown> | null;
  kind: 'TerminalTool';
  title: string;
}

export interface FileEditorTool {
  description: string;
  actionType: string;
  meta?: Record<string, unknown> | null;
  kind: 'FileEditorTool';
  title: string;
}

export interface McpClientTool {
  description: string;
  actionType: string;
  servers?: McpServer[];
  mcpTools?: McpTool[];
  meta?: Record<string, unknown> | null;
  kind: 'McpClientTool';
  title: string;
}

export interface ReadFileTool {
  description: string;
  actionType: string;
  meta?: Record<string, unknown> | null;
  kind: 'ReadFileTool';
  title: string;
}

export interface TaskTrackerTool {
  description: string;
  actionType: string;
  meta?: Record<string, unknown> | null;
  kind: 'TaskTrackerTool';
  title: string;
}

export interface WriteFileTool {
  description: string;
  actionType: string;
  meta?: Record<string, unknown> | null;
  kind: 'WriteFileTool';
  title: string;
}

// Query Parameters interfaces
export interface SearchEventsParams {
  pageId?: string | null;
  limit?: number;
  kind?: string | null;
  source?: string | null;
  body?: string | null;
  sortOrder?: EventSortOrder;
  timestampGte?: string | null;
  timestampLt?: string | null;
}

export interface CountEventsParams {
  kind?: string | null;
  source?: string | null;
  body?: string | null;
  timestampGte?: string | null;
  timestampLt?: string | null;
}

export interface SearchConversationsParams {
  pageId?: string | null;
  limit?: number;
  status?: string | null;
  sortOrder?: ConversationSortOrder;
  metadataFilter?: string | null;
  createdAtGte?: string | null;
  createdAtLt?: string | null;
}

export interface CountConversationsParams {
  status?: string | null;
  metadataFilter?: string | null;
  createdAtGte?: string | null;
  createdAtLt?: string | null;
}

export interface GetResourceParams {
  method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
}

export interface CallToolParams {
  serverName: string;
}

export interface GetPromptMessagesParams {
  serverName: string;
}
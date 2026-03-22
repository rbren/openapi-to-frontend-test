// Generated TypeScript types from OpenAPI specification
// Do not edit manually - regenerate using generate_types.py

export interface APIBasedCritic_Input {
  /** Base URL of the vLLM classification service */
  server_url?: string;
  /** API key for authenticating with the vLLM service */
  api_key: string | string;
  /** Name of the model to use */
  model_name?: string;
  /** HuggingFace tokenizer name for loading chat template */
  tokenizer_name?: string;
  /** Whether to pass tool definitions to the model */
  pass_tools_definitions?: boolean;
  /** Timeout for requests to the model */
  timeout_seconds?: number;
  /** Whether the model predicts success label at index 0 */
  has_success_label?: boolean;
  sentiment_labels?: string[];
  agent_issue_labels?: string[];
  infra_labels?: string[];
  user_followup_labels?: string[];
  sentiment_map?: Record<string, string>;
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: "finish_and_message" | "all_actions";
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterative_refinement?: any | any;
  kind?: string;
}

export interface APIBasedCritic_Output {
  /** Base URL of the vLLM classification service */
  server_url?: string;
  /** API key for authenticating with the vLLM service */
  api_key: string | string;
  /** Name of the model to use */
  model_name?: string;
  /** HuggingFace tokenizer name for loading chat template */
  tokenizer_name?: string;
  /** Whether to pass tool definitions to the model */
  pass_tools_definitions?: boolean;
  /** Timeout for requests to the model */
  timeout_seconds?: number;
  /** Whether the model predicts success label at index 0 */
  has_success_label?: boolean;
  sentiment_labels?: string[];
  agent_issue_labels?: string[];
  infra_labels?: string[];
  user_followup_labels?: string[];
  sentiment_map?: Record<string, string>;
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: "finish_and_message" | "all_actions";
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterative_refinement?: any | any;
  kind: string;
}

export type Action = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;

export interface ActionEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  /** The thought process of the agent before taking this action */
  thought: any[];
  /** Intermediate reasoning/thinking content from reasoning models */
  reasoning_content?: string | any;
  /** Anthropic thinking blocks from the LLM response */
  thinking_blocks?: any | any[];
  /** OpenAI Responses reasoning item from model output */
  responses_reasoning_item?: any | any;
  /** Single tool call returned by LLM (None when non-executable) */
  action?: any | any;
  /** The name of the tool being called */
  tool_name: string;
  /** The unique id returned by LLM API for this tool call */
  tool_call_id: string;
  /** The tool call received from the LLM response. We keep a copy of it so it is easier to construct it into LLM messageThis could be different from `action`: e.g., `tool_call` may contain `security_risk` field predicted by LLM when LLM risk analyzer is enabled, while `action` does not. */
  tool_call: any;
  /** Completion or Response ID of the LLM response that generated this eventE.g., Can be used to group related actions from same LLM response. This helps in tracking and managing results of parallel function calling from the same LLM response. */
  llm_response_id: string;
  /** The LLM's assessment of the safety risk of this action. */
  security_risk?: any;
  /** Optional critic evaluation of this action and preceding history. */
  critic_result?: any | any;
  /** A concise summary (approximately 10 words) of what this action does, provided by the LLM for explainability and debugging. Examples of good summaries: 'editing configuration file for deployment settings' | 'searching codebase for authentication function definitions' | 'installing required dependencies from package manifest' | 'running tests to verify bug fix' | 'viewing directory structure to locate source files' */
  summary?: string | any;
  kind: string;
}

export interface Agent_Input {
  /** LLM configuration for the agent. */
  llm: any;
  /** List of tools to initialize for the agent. */
  tools?: any[];
  /** Optional MCP configuration dictionary to create MCP tools. */
  mcp_config?: Record<string, any>;
  /** Optional regex to filter the tools available to the agent by name. This is applied after any tools provided in `tools` and any MCP tools are added. */
  filter_tools_regex?: string | any;
  /** List of default tool class names to include. By default, the agent includes 'FinishTool' and 'ThinkTool'. Set to an empty list to disable all default tools, or provide a subset to include only specific ones. Example: include_default_tools=['FinishTool'] to only include FinishTool, or include_default_tools=[] to disable all default tools. */
  include_default_tools?: string[];
  /** Optional AgentContext to initialize the agent with specific context. */
  agent_context?: any | any;
  /** System prompt template filename. Can be either:
- A relative filename (e.g., 'system_prompt.j2') loaded from the agent's prompts directory
- An absolute path (e.g., '/path/to/custom_prompt.j2') */
  system_prompt_filename?: string;
  /** Security policy template filename. Can be either:
- A relative filename (e.g., 'security_policy.j2') loaded from the agent's prompts directory
- An absolute path (e.g., '/path/to/custom_security_policy.j2') */
  security_policy_filename?: string;
  /** Optional kwargs to pass to the system prompt Jinja2 template. */
  system_prompt_kwargs?: Record<string, any>;
  /** Optional condenser to use for condensing conversation history. */
  condenser?: any | any;
  /** EXPERIMENTAL: Optional critic to evaluate agent actions and messages in real-time. API and behavior may change without notice. May impact performance, especially in 'all_actions' mode. */
  critic?: any | any;
  kind?: string;
}

export interface Agent_Output {
  /** LLM configuration for the agent. */
  llm: any;
  /** List of tools to initialize for the agent. */
  tools?: any[];
  /** Optional MCP configuration dictionary to create MCP tools. */
  mcp_config?: Record<string, any>;
  /** Optional regex to filter the tools available to the agent by name. This is applied after any tools provided in `tools` and any MCP tools are added. */
  filter_tools_regex?: string | any;
  /** List of default tool class names to include. By default, the agent includes 'FinishTool' and 'ThinkTool'. Set to an empty list to disable all default tools, or provide a subset to include only specific ones. Example: include_default_tools=['FinishTool'] to only include FinishTool, or include_default_tools=[] to disable all default tools. */
  include_default_tools?: string[];
  /** Optional AgentContext to initialize the agent with specific context. */
  agent_context?: any | any;
  /** System prompt template filename. Can be either:
- A relative filename (e.g., 'system_prompt.j2') loaded from the agent's prompts directory
- An absolute path (e.g., '/path/to/custom_prompt.j2') */
  system_prompt_filename?: string;
  /** Security policy template filename. Can be either:
- A relative filename (e.g., 'security_policy.j2') loaded from the agent's prompts directory
- An absolute path (e.g., '/path/to/custom_security_policy.j2') */
  security_policy_filename?: string;
  /** Optional kwargs to pass to the system prompt Jinja2 template. */
  system_prompt_kwargs?: Record<string, any>;
  /** Optional condenser to use for condensing conversation history. */
  condenser?: any | any;
  /** EXPERIMENTAL: Optional critic to evaluate agent actions and messages in real-time. API and behavior may change without notice. May impact performance, especially in 'all_actions' mode. */
  critic?: any | any;
  kind: string;
}

export type AgentBase_Input = Agent-Input;

export type AgentBase_Output = Agent-Output;

export interface AgentContext_Input {
  /** List of available skills that can extend the user's input. */
  skills?: any[];
  /** Optional suffix to append to the system prompt. */
  system_message_suffix?: string | any;
  /** Optional suffix to append to the user's message. */
  user_message_suffix?: string | any;
  /** Whether to automatically load user skills from ~/.openhands/skills/ and ~/.openhands/microagents/ (for backward compatibility).  */
  load_user_skills?: boolean;
  /** Whether to automatically load skills from the public OpenHands skills repository at https://github.com/OpenHands/skills. This allows you to get the latest skills without SDK updates. */
  load_public_skills?: boolean;
  /** Dictionary mapping secret keys to values or secret sources. Secrets are used for authentication and sensitive data handling. Values can be either strings or SecretSource instances (str | SecretSource). */
  secrets?: Record<string, string | any> | any;
  /** Current date and time information to provide to the agent. Can be a datetime object (which will be formatted as ISO 8601) or a pre-formatted string. When provided, this information is included in the system prompt to give the agent awareness of the current time context. Defaults to the current datetime. */
  current_datetime?: string | string | any;
}

export interface AgentContext_Output {
  /** List of available skills that can extend the user's input. */
  skills?: any[];
  /** Optional suffix to append to the system prompt. */
  system_message_suffix?: string | any;
  /** Optional suffix to append to the user's message. */
  user_message_suffix?: string | any;
  /** Whether to automatically load user skills from ~/.openhands/skills/ and ~/.openhands/microagents/ (for backward compatibility).  */
  load_user_skills?: boolean;
  /** Whether to automatically load skills from the public OpenHands skills repository at https://github.com/OpenHands/skills. This allows you to get the latest skills without SDK updates. */
  load_public_skills?: boolean;
  /** Dictionary mapping secret keys to values or secret sources. Secrets are used for authentication and sensitive data handling. Values can be either strings or SecretSource instances (str | SecretSource). */
  secrets?: Record<string, string | any> | any;
  /** Current date and time information to provide to the agent. Can be a datetime object (which will be formatted as ISO 8601) or a pre-formatted string. When provided, this information is included in the system prompt to give the agent awareness of the current time context. Defaults to the current datetime. */
  current_datetime?: string | string | any;
}

export interface AgentErrorEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  /** The tool name that this observation is responding to */
  tool_name: string;
  /** The tool call id that this observation is responding to */
  tool_call_id: string;
  /** The error message from the scaffold */
  error: string;
  kind: string;
}

export interface AgentFinishedCritic_Input {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: "finish_and_message" | "all_actions";
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterative_refinement?: any | any;
  kind?: string;
}

export interface AgentFinishedCritic_Output {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: "finish_and_message" | "all_actions";
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterative_refinement?: any | any;
  kind: string;
}

export interface AlwaysConfirm_Input {
  kind?: string;
}

export interface AlwaysConfirm_Output {
  kind: string;
}

export interface AskAgentRequest {
  /** The question to ask the agent */
  question: string;
}

export interface AskAgentResponse {
  /** The agent's response to the question */
  response: string;
}

export type BaseWorkspace_Input = any | any;

export type BaseWorkspace_Output = any | any;

export interface BashCommand {
  /** The bash command to execute */
  command: string;
  /** The current working directory */
  cwd?: string | any;
  /** The max number of seconds a command may be permitted to run. */
  timeout?: number;
  id?: string;
  timestamp?: string;
  kind: string;
}

export type BashEventBase = any | any;

export interface BashEventPage {
  items: any[];
  next_page_id?: string | any;
}

export type BashEventSortOrder = "TIMESTAMP" | "TIMESTAMP_DESC";

export interface BashOutput {
  id?: string;
  timestamp?: string;
  command_id: string;
  /** The order for this output, sequentially starting with 0 */
  order?: number;
  /** Exit code None implies the command is still running. */
  exit_code?: number | any;
  /** The standard output from the command */
  stdout?: string | any;
  /** The error output from the command */
  stderr?: string | any;
  kind: string;
}

export interface Body_upload_file_api_file_upload__path__post {
  file: string;
}

export interface BrowserAction {
  kind: string;
}

export interface BrowserClickAction {
  /** The index of the element to click (from browser_get_state) */
  index: number;
  /** Whether to open any resulting navigation in a new tab. Default: False */
  new_tab?: boolean;
  kind: string;
}

export interface BrowserClickTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserCloseTabAction {
  /** 4 Character Tab ID of the tab to close (from browser_list_tabs) */
  tab_id: string;
  kind: string;
}

export interface BrowserCloseTabTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserGetContentAction {
  /** Whether to include links in the content (default: False) */
  extract_links?: boolean;
  /** Character index to start from in the page content (default: 0) */
  start_from_char?: number;
  kind: string;
}

export interface BrowserGetContentTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserGetStateAction {
  /** Whether to include a screenshot of the current page. Default: False */
  include_screenshot?: boolean;
  kind: string;
}

export interface BrowserGetStateTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserGetStorageAction {
  kind: string;
}

export interface BrowserGetStorageTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserGoBackAction {
  kind: string;
}

export interface BrowserGoBackTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserListTabsAction {
  kind: string;
}

export interface BrowserListTabsTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserNavigateAction {
  /** The URL to navigate to */
  url: string;
  /** Whether to open in a new tab. Default: False */
  new_tab?: boolean;
  kind: string;
}

export interface BrowserNavigateTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** Base64 screenshot data if available */
  screenshot_data?: string | any;
  /** Directory where full output files are saved */
  full_output_save_dir?: string | any;
  kind: string;
}

export interface BrowserScrollAction {
  /** Direction to scroll. Options: 'up', 'down'. Default: 'down' */
  direction?: "up" | "down";
  kind: string;
}

export interface BrowserScrollTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserSetStorageAction {
  /** Storage state dictionary containing 'cookies' and 'origins' (from browser_get_storage) */
  storage_state: Record<string, any>;
  kind: string;
}

export interface BrowserSetStorageTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserStartRecordingAction {
  kind: string;
}

export interface BrowserStartRecordingTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserStopRecordingAction {
  kind: string;
}

export interface BrowserStopRecordingTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserSwitchTabAction {
  /** 4 Character Tab ID of the tab to switch to (from browser_list_tabs) */
  tab_id: string;
  kind: string;
}

export interface BrowserSwitchTabTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserToolSet {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface BrowserTypeAction {
  /** The index of the input element (from browser_get_state) */
  index: number;
  /** The text to type */
  text: string;
  kind: string;
}

export interface BrowserTypeTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface CmdOutputMetadata {
  /** The exit code of the last executed command. */
  exit_code?: number;
  /** The process ID of the last executed command. */
  pid?: number;
  /** The username of the current user. */
  username?: string | any;
  /** The hostname of the machine. */
  hostname?: string | any;
  /** The current working directory. */
  working_dir?: string | any;
  /** The path to the current Python interpreter, if any. */
  py_interpreter_path?: string | any;
  /** Prefix to add to command output */
  prefix?: string;
  /** Suffix to add to command output */
  suffix?: string;
}

export interface Condensation {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  /** The IDs of the events that are being forgotten (removed from the `View` given to the LLM). */
  forgotten_event_ids?: string[];
  /** An optional summary of the events being forgotten. */
  summary?: string | any;
  /** An optional offset to the start of the resulting view (after forgotten events have been removed) indicating where the summary should be inserted. If not provided, the summary will not be inserted into the view. */
  summary_offset?: number | any;
  /** Completion or Response ID of the LLM response that generated this event */
  llm_response_id: string;
  kind: string;
}

export interface CondensationRequest {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  kind: string;
}

export interface CondensationSummaryEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  summary: string;
  kind: string;
}

export type CondenserBase_Input = any | any | any;

export type CondenserBase_Output = any | any | any;

export interface ConfirmRisky_Input {
  threshold?: any;
  confirm_unknown?: boolean;
  kind?: string;
}

export interface ConfirmRisky_Output {
  threshold?: any;
  confirm_unknown?: boolean;
  kind: string;
}

export type ConfirmationPolicyBase_Input = any | any | any;

export type ConfirmationPolicyBase_Output = any | any | any;

export interface ConfirmationResponseRequest {
  accept: boolean;
  reason?: string;
}

export interface ConversationErrorEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  /** The source of this event */
  source: "agent" | "user" | "environment";
  /** Code for the error - typically a type */
  code: string;
  /** Details about the error */
  detail: string;
  kind: string;
}

export type ConversationExecutionStatus = "idle" | "running" | "paused" | "waiting_for_confirmation" | "finished" | "error" | "stuck" | "deleting";

export interface ConversationInfo {
  /** Unique conversation ID */
  id: string;
  /** The agent running in the conversation. This is persisted to allow resuming conversations and check agent configuration to handle e.g., tool changes, LLM changes, etc. */
  agent: any;
  /** Workspace used by the agent to execute commands and read/write files. Not the process working directory. */
  workspace: any;
  /** Directory for persisting conversation state and events. If None, conversation will not be persisted. */
  persistence_dir?: string | any;
  /** Maximum number of iterations the agent can perform in a single run. */
  max_iterations?: number;
  /** Whether to enable stuck detection for the agent. */
  stuck_detection?: boolean;
  execution_status?: any;
  confirmation_policy?: any;
  /** Optional security analyzer to evaluate action risks. */
  security_analyzer?: any | any;
  /** List of activated knowledge skills name */
  activated_knowledge_skills?: string[];
  /** Actions blocked by PreToolUse hooks, keyed by action ID */
  blocked_actions?: Record<string, string>;
  /** Messages blocked by UserPromptSubmit hooks, keyed by message ID */
  blocked_messages?: Record<string, string>;
  /** Conversation statistics for tracking LLM metrics */
  stats?: any;
  /** Registry for handling secrets and sensitive data */
  secret_registry?: any;
  /** Dictionary for agent-specific runtime state that persists across iterations. Agents can store feature-specific state using string keys. To trigger autosave, always reassign: state.agent_state = {**state.agent_state, key: value}. See https://docs.openhands.dev/sdk/guides/convo-persistence#how-state-persistence-works */
  agent_state?: Record<string, any>;
  /** User-defined title for the conversation */
  title?: string | any;
  metrics?: any | any;
  created_at?: string;
  updated_at?: string;
}

export interface ConversationPage {
  items: any[];
  next_page_id?: string | any;
}

export type ConversationSortOrder = "CREATED_AT" | "UPDATED_AT" | "CREATED_AT_DESC" | "UPDATED_AT_DESC";

export interface ConversationStateUpdateEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  /** Unique key for this state update event */
  key?: string;
  /** Serialized conversation state updates */
  value?: any;
  kind: string;
}

export interface ConversationStats_Input {
  /** Active usage metrics tracked by the registry. */
  usage_to_metrics?: Record<string, any>;
}

export interface ConversationStats_Output {
  [key: string]: any;
}

export interface Cost {
  model: string;
  /** Cost must be non-negative */
  cost: number;
  timestamp?: number;
}

export type CriticBase_Input = any | any | any | any;

export type CriticBase_Output = any | any | any | any;

export interface CriticResult {
  /** A predicted probability of success between 0 and 1. */
  score: number;
  /** An optional message explaining the score. */
  message: string | any;
  /** Optional metadata about the critic evaluation. Can include event_ids and categorized_features for visualization. */
  metadata?: Record<string, any> | any;
}

export interface DesktopUrlResponse {
  url: string | any;
}

export interface EditAction {
  /** The path to the file to modify. */
  file_path: string;
  /** The text to replace. To create a new file, use an empty string. Must match the exact text in the file including whitespace. */
  old_string: string;
  /** The text to replace it with. */
  new_string: string;
  /** Number of replacements expected. Defaults to 1. Use when you want to replace multiple occurrences. The edit will fail if the actual count doesn't match. */
  expected_replacements?: number;
  kind: string;
}

export interface EditObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** The file path that was edited. */
  file_path?: string | any;
  /** Whether a new file was created. */
  is_new_file?: boolean;
  /** Number of replacements actually made. */
  replacements_made?: number;
  /** The content before the edit. */
  old_content?: string | any;
  /** The content after the edit. */
  new_content?: string | any;
  kind: string;
}

export interface EditTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface EmptyPatchCritic_Input {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: "finish_and_message" | "all_actions";
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterative_refinement?: any | any;
  kind?: string;
}

export interface EmptyPatchCritic_Output {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: "finish_and_message" | "all_actions";
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterative_refinement?: any | any;
  kind: string;
}

export type Event = any | any | any | any | any | any | any | any | any | any | any | any | any | any;

export interface EventPage {
  items: any[];
  next_page_id?: string | any;
}

export type EventSortOrder = "TIMESTAMP" | "TIMESTAMP_DESC";

export interface ExecuteBashRequest {
  /** The bash command to execute */
  command: string;
  /** The current working directory */
  cwd?: string | any;
  /** The max number of seconds a command may be permitted to run. */
  timeout?: number;
}

export interface ExposedUrl {
  name: string;
  url: string;
  port: number;
}

export interface FileEditorAction {
  /** The commands to run. Allowed options are: `view`, `create`, `str_replace`, `insert`, `undo_edit`. */
  command: "view" | "create" | "str_replace" | "insert" | "undo_edit";
  /** Absolute path to file or directory. */
  path: string;
  /** Required parameter of `create` command, with the content of the file to be created. */
  file_text?: string | any;
  /** Required parameter of `str_replace` command containing the string in `path` to replace. */
  old_str?: string | any;
  /** Optional parameter of `str_replace` command containing the new string (if not given, no string will be added). Required parameter of `insert` command containing the string to insert. */
  new_str?: string | any;
  /** Required parameter of `insert` command. The `new_str` will be inserted AFTER the line `insert_line` of `path`. */
  insert_line?: number | any;
  /** Optional parameter of `view` command when `path` points to a file. If none is given, the full file is shown. If provided, the file will be shown in the indicated line number range, e.g. [11, 12] will show lines 11 and 12. Indexing at 1 to start. Setting `[start_line, -1]` shows all lines from `start_line` to the end of the file. */
  view_range?: number[] | any;
  kind: string;
}

export interface FileEditorObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** The command that was run: `view`, `create`, `str_replace`, `insert`, or `undo_edit`. */
  command: "view" | "create" | "str_replace" | "insert" | "undo_edit";
  /** The file path that was edited. */
  path?: string | any;
  /** Indicates if the file previously existed. If not, it was created. */
  prev_exist?: boolean;
  /** The content of the file before the edit. */
  old_content?: string | any;
  /** The content of the file after the edit. */
  new_content?: string | any;
  kind: string;
}

export interface FileEditorTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface FileEntry {
  /** Name of the file or directory */
  name: string;
  /** Absolute path to the file or directory */
  path: string;
  /** Whether this entry is a directory */
  is_directory: boolean;
  /** Size of the file in bytes (0 for directories) */
  size: number;
  /** Last modified timestamp */
  modified_time: string;
}

export interface FinishAction {
  /** Final message to send to the user. */
  message: string;
  kind: string;
}

export interface FinishObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  kind: string;
}

export interface FinishTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface GenerateTitleRequest {
  /** Maximum length of the generated title */
  max_length?: number;
  /** Optional LLM to use for title generation */
  llm?: any | any;
}

export interface GenerateTitleResponse {
  /** The generated title for the conversation */
  title: string;
}

export interface GitChange {
  status: any;
  path: string;
}

export type GitChangeStatus = "MOVED" | "ADDED" | "DELETED" | "UPDATED";

export interface GitDiff {
  modified: string | any;
  original: string | any;
}

export interface GlobAction {
  /** The glob pattern to match files (e.g., "**/*.js", "src/**/*.ts") */
  pattern: string;
  /** The directory (absolute path) to search in. Defaults to the current working directory. */
  path?: string | any;
  kind: string;
}

export interface GlobObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** List of matching file paths sorted by modification time */
  files: string[];
  /** The glob pattern that was used */
  pattern: string;
  /** The directory that was searched */
  search_path: string;
  /** Whether results were truncated to 100 files */
  truncated?: boolean;
  kind: string;
}

export interface GlobTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface GraySwanAnalyzer_Input {
  /** Number of recent events to include as context */
  history_limit?: number;
  /** Max characters for conversation processing */
  max_message_chars?: number;
  /** Request timeout in seconds */
  timeout?: number;
  /** Risk threshold for LOW classification (score <= threshold) */
  low_threshold?: number;
  /** Risk threshold for MEDIUM classification (score <= threshold) */
  medium_threshold?: number;
  /** GraySwan Cygnal API endpoint */
  api_url?: string;
  /** GraySwan API key (via GRAYSWAN_API_KEY env var) */
  api_key?: string | any;
  /** GraySwan policy ID (via GRAYSWAN_POLICY_ID env var) */
  policy_id?: string | any;
  kind?: string;
}

export interface GraySwanAnalyzer_Output {
  /** Number of recent events to include as context */
  history_limit?: number;
  /** Max characters for conversation processing */
  max_message_chars?: number;
  /** Request timeout in seconds */
  timeout?: number;
  /** Risk threshold for LOW classification (score <= threshold) */
  low_threshold?: number;
  /** Risk threshold for MEDIUM classification (score <= threshold) */
  medium_threshold?: number;
  /** GraySwan Cygnal API endpoint */
  api_url?: string;
  /** GraySwan API key (via GRAYSWAN_API_KEY env var) */
  api_key?: string | any;
  /** GraySwan policy ID (via GRAYSWAN_POLICY_ID env var) */
  policy_id?: string | any;
  kind: string;
}

export interface GrepAction {
  /** The regex pattern to search for in file contents */
  pattern: string;
  /** The directory (absolute path) to search in. Defaults to the current working directory. */
  path?: string | any;
  /** Optional file pattern to filter which files to search (e.g., "*.js", "*.{ts,tsx}") */
  include?: string | any;
  kind: string;
}

export interface GrepObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** List of file paths containing the pattern */
  matches: string[];
  /** The regex pattern that was used */
  pattern: string;
  /** The directory that was searched */
  search_path: string;
  /** The file pattern filter that was used */
  include_pattern?: string | any;
  /** Whether results were truncated to 100 files */
  truncated?: boolean;
  kind: string;
}

export interface GrepTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface HTTPValidationError {
  detail?: any[];
}

export interface HookConfig_Input {
  /** Hooks that run before tool execution */
  pre_tool_use?: any[];
  /** Hooks that run after tool execution */
  post_tool_use?: any[];
  /** Hooks that run when user submits a prompt */
  user_prompt_submit?: any[];
  /** Hooks that run when a session starts */
  session_start?: any[];
  /** Hooks that run when a session ends */
  session_end?: any[];
  /** Hooks that run when the agent attempts to stop */
  stop?: any[];
}

export interface HookConfig_Output {
  /** Hooks that run before tool execution */
  pre_tool_use?: any[];
  /** Hooks that run after tool execution */
  post_tool_use?: any[];
  /** Hooks that run when user submits a prompt */
  user_prompt_submit?: any[];
  /** Hooks that run when a session starts */
  session_start?: any[];
  /** Hooks that run when a session ends */
  session_end?: any[];
  /** Hooks that run when the agent attempts to stop */
  stop?: any[];
}

export interface HookDefinition {
  type?: any;
  command: string;
  timeout?: number;
}

export interface HookMatcher_Input {
  matcher?: string;
  hooks?: any[];
}

export interface HookMatcher_Output {
  matcher?: string;
  hooks?: any[];
}

export type HookType = "command" | "prompt";

export interface HooksRequest {
  /** Workspace directory path for project hooks */
  project_dir?: string | any;
}

export interface HooksResponse {
  /** Hook configuration loaded from the workspace, or None if not found */
  hook_config?: any | any;
}

export interface Icon {
  src: string;
  mimeType?: string | any;
  sizes?: string[] | any;
  [key: string]: any;
}

export interface ImageContent {
  cache_prompt?: boolean;
  type?: string;
  image_urls: string[];
}

export interface InputMetadata {
  /** Name of the input parameter */
  name: string;
  /** Description of the input parameter */
  description: string;
}

export interface IterativeRefinementConfig {
  /** Score threshold (0-1) to consider task successful. */
  success_threshold?: number;
  /** Maximum number of iterations before giving up. */
  max_iterations?: number;
}

export interface KeywordTrigger {
  type?: string;
  keywords: string[];
}

export interface LLM {
  /** Model name. */
  model?: string;
  /** API key. */
  api_key?: string | string | any;
  /** Custom base URL. */
  base_url?: string | any;
  /** API version (e.g., Azure). */
  api_version?: string | any;
  aws_access_key_id?: string | string | any;
  aws_secret_access_key?: string | string | any;
  aws_region_name?: string | any;
  openrouter_site_url?: string;
  openrouter_app_name?: string;
  num_retries?: number;
  retry_multiplier?: number;
  retry_min_wait?: number;
  retry_max_wait?: number;
  /** HTTP timeout in seconds. Default is 300s (5 minutes). Set to None to disable timeout (not recommended for production). */
  timeout?: number | any;
  /** Approx max chars in each event/content sent to the LLM. */
  max_message_chars?: number;
  /** Sampling temperature for response generation. Defaults to 0 for most models and provider default for reasoning models. */
  temperature?: number | any;
  top_p?: number | any;
  top_k?: number | any;
  /** The maximum number of input tokens. Note that this is currently unused, and the value at runtime is actually the total tokens in OpenAI (e.g. 128,000 tokens for GPT-4). */
  max_input_tokens?: number | any;
  /** The maximum number of output tokens. This is sent to the LLM. */
  max_output_tokens?: number | any;
  /** Optional canonical model name for feature registry lookups. The OpenHands SDK maintains a model feature registry that maps model names to capabilities (e.g., vision support, prompt caching, responses API support). When using proxied or aliased model identifiers, set this field to the canonical model name (e.g., 'openai/gpt-4o') to ensure correct capability detection. If not provided, the 'model' field will be used for capability lookups. */
  model_canonical_name?: string | any;
  /** Optional HTTP headers to forward to LiteLLM requests. */
  extra_headers?: Record<string, string> | any;
  /** The cost per input token. This will available in logs for user. */
  input_cost_per_token?: number | any;
  /** The cost per output token. This will available in logs for user. */
  output_cost_per_token?: number | any;
  ollama_base_url?: string | any;
  /** Enable streaming responses from the LLM. When enabled, the provided `on_token` callback in .completions and .responses will be invoked for each chunk of tokens. */
  stream?: boolean;
  drop_params?: boolean;
  /** Modify params allows litellm to do transformations like adding a default message, when a message is empty. */
  modify_params?: boolean;
  /** If model is vision capable, this option allows to disable image processing (useful for cost reduction). */
  disable_vision?: boolean | any;
  /** Disable using of stop word. */
  disable_stop_word?: boolean | any;
  /** Enable caching of prompts. */
  caching_prompt?: boolean;
  /** Enable logging of completions. */
  log_completions?: boolean;
  /** The folder to log LLM completions to. Required if log_completions is True. */
  log_completions_folder?: string;
  /** A custom tokenizer to use for token counting. */
  custom_tokenizer?: string | any;
  /** Whether to use native tool calling. */
  native_tool_calling?: boolean;
  /** Force using string content serializer when sending to LLM API. If None (default), auto-detect based on model. Useful for providers that do not support list content, like HuggingFace and Groq. */
  force_string_serializer?: boolean | any;
  /** The effort to put into reasoning. This is a string that can be one of 'low', 'medium', 'high', 'xhigh', or 'none'. Can apply to all reasoning models. */
  reasoning_effort?: "low" | "medium" | "high" | "xhigh" | "none" | any;
  /** The level of detail for reasoning summaries. This is a string that can be one of 'auto', 'concise', or 'detailed'. Requires verified OpenAI organization. Only sent when explicitly set. */
  reasoning_summary?: "auto" | "concise" | "detailed" | any;
  /** If True, ask for ['reasoning.encrypted_content'] in Responses API include. */
  enable_encrypted_reasoning?: boolean;
  /** Retention policy for prompt cache. Only sent for GPT-5+ models; explicitly stripped for all other models. */
  prompt_cache_retention?: string | any;
  /** The budget tokens for extended thinking, supported by Anthropic models. */
  extended_thinking_budget?: number | any;
  /** The seed to use for random number generation. */
  seed?: number | any;
  /** Deprecated: Safety settings for models that support them (like Mistral AI and Gemini). This field is deprecated in 1.10.0 and will be removed in 1.15.0. Safety settings are designed for consumer-facing content moderation, which is not relevant for coding agents. */
  safety_settings?: Record<string, string>[] | any;
  /** Unique usage identifier for the LLM. Used for registry lookups, telemetry, and spend tracking. */
  usage_id?: string;
  /** Additional key-value pairs to pass to litellm's extra_body parameter. This is useful for custom inference endpoints that need additional parameters for configuration, routing, or advanced features. NOTE: Not all LLM providers support extra_body parameters. Some providers (e.g., OpenAI) may reject requests with unrecognized options. This is commonly supported by: - LiteLLM proxy servers (routing metadata, tracing) - vLLM endpoints (return_token_ids, etc.) - Custom inference clusters Examples: - Proxy routing: {'trace_version': '1.0.0', 'tags': ['agent:my-agent']} - vLLM features: {'return_token_ids': True} */
  litellm_extra_body?: Record<string, any>;
}

export interface LLMCompletionLogEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  /** The intended filename for this log (relative to log directory) */
  filename: string;
  /** The JSON-encoded log data to be written to the file */
  log_data: string;
  /** The model name for context */
  model_name?: string;
  /** The LLM usage_id that produced this log */
  usage_id?: string;
  kind: string;
}

export interface LLMSecurityAnalyzer_Input {
  kind?: string;
}

export interface LLMSecurityAnalyzer_Output {
  kind: string;
}

export interface LLMSummarizingCondenser_Input {
  llm: any;
  max_size?: number;
  max_tokens?: number | any;
  keep_first?: number;
  hard_context_reset_max_retries?: number;
  hard_context_reset_context_scaling?: number;
  kind?: string;
}

export interface LLMSummarizingCondenser_Output {
  llm: any;
  max_size?: number;
  max_tokens?: number | any;
  keep_first?: number;
  hard_context_reset_max_retries?: number;
  hard_context_reset_context_scaling?: number;
  kind: string;
}

export interface ListDirectoryAction {
  /** The path to the directory to list. Defaults to current directory. */
  dir_path?: string;
  /** Whether to list subdirectories recursively (up to 2 levels). */
  recursive?: boolean;
  kind: string;
}

export interface ListDirectoryObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** The directory path that was listed. */
  dir_path?: string | any;
  /** List of files and directories found. */
  entries?: any[];
  /** Total number of entries found. */
  total_count?: number;
  /** Whether the listing was truncated due to too many entries. */
  is_truncated?: boolean;
  kind: string;
}

export interface ListDirectoryTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface LocalWorkspace_Input {
  /** The working directory for agent operations and tool execution. Accepts both string paths and Path objects. Path objects are automatically converted to strings. */
  working_dir: string;
  kind?: string;
}

export interface LocalWorkspace_Output {
  /** The working directory for agent operations and tool execution. Accepts both string paths and Path objects. Path objects are automatically converted to strings. */
  working_dir: string;
  kind: string;
}

export interface LookupSecret_Input {
  /** Optional description for this secret */
  description?: string | any;
  url: string;
  headers?: Record<string, string>;
  kind?: string;
}

export interface LookupSecret_Output {
  /** Optional description for this secret */
  description?: string | any;
  url: string;
  headers?: Record<string, string>;
  kind: string;
}

export interface MCPToolAction {
  /** Dynamic data fields from the tool call */
  data?: Record<string, any>;
  kind: string;
}

export interface MCPToolDefinition {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  /** The MCP tool definition. */
  mcp_tool: any;
  kind: string;
  title: string;
}

export interface MCPToolObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** Name of the tool that was called */
  tool_name: string;
  kind: string;
}

export interface Message {
  role: "user" | "system" | "assistant" | "tool";
  content?: any | any[];
  tool_calls?: any[] | any;
  tool_call_id?: string | any;
  name?: string | any;
  /** Intermediate reasoning/thinking content from reasoning models */
  reasoning_content?: string | any;
  /** Raw Anthropic thinking blocks for extended thinking feature */
  thinking_blocks?: any | any[];
  /** OpenAI Responses reasoning item from model output */
  responses_reasoning_item?: any | any;
}

export interface MessageEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source: "agent" | "user" | "environment";
  /** The exact LLM message for this message event */
  llm_message: any;
  /** Completion or Response ID of the LLM response that generated this eventIf the source != 'agent', this field is None */
  llm_response_id?: string | any;
  /** List of activated skill name */
  activated_skills?: string[];
  /** List of content added by agent context */
  extended_content?: any[];
  /** Optional identifier of the sender. Can be used to track message origin in multi-agent scenarios. */
  sender?: string | any;
  /** Optional critic evaluation of this message and preceding history. */
  critic_result?: any | any;
  kind: string;
}

export interface MessageToolCall {
  /** Canonical tool call id */
  id: string;
  /** Tool/function name */
  name: string;
  /** JSON string of arguments */
  arguments: string;
  /** Originating API family */
  origin: "completion" | "responses";
}

export interface Metrics {
  /** Name of the model */
  model_name?: string;
  /** Total accumulated cost, must be non-negative */
  accumulated_cost?: number;
  /** Maximum budget per task */
  max_budget_per_task?: number | any;
  /** Accumulated token usage across all calls */
  accumulated_token_usage?: any | any;
  /** List of individual costs */
  costs?: any[];
  /** List of response latencies */
  response_latencies?: any[];
  /** List of token usage records */
  token_usages?: any[];
}

export interface MetricsSnapshot {
  /** Name of the model */
  model_name?: string;
  /** Total accumulated cost, must be non-negative */
  accumulated_cost?: number;
  /** Maximum budget per task */
  max_budget_per_task?: number | any;
  /** Accumulated token usage across all calls */
  accumulated_token_usage?: any | any;
}

export interface NeverConfirm_Input {
  kind?: string;
}

export interface NeverConfirm_Output {
  kind: string;
}

export interface NoOpCondenser_Input {
  kind?: string;
}

export interface NoOpCondenser_Output {
  kind: string;
}

export type Observation = any | any | any | any | any | any | any | any | any | any | any | any | any | any;

export interface ObservationEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  /** The tool name that this observation is responding to */
  tool_name: string;
  /** The tool call id that this observation is responding to */
  tool_call_id: string;
  /** The observation (tool call) sent to LLM */
  observation: any;
  /** The action id that this observation is responding to */
  action_id: string;
  kind: string;
}

export interface OrgConfig {
  /** Selected repository (e.g., 'owner/repo') */
  repository: string;
  /** Git provider type: github, gitlab, azure, bitbucket */
  provider: string;
  /** Pre-authenticated Git URL for the organization repository. Contains sensitive credentials - handle with care and avoid logging. */
  org_repo_url: string;
  /** Organization name */
  org_name: string;
}

export interface PassCritic_Input {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: "finish_and_message" | "all_actions";
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterative_refinement?: any | any;
  kind?: string;
}

export interface PassCritic_Output {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: "finish_and_message" | "all_actions";
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterative_refinement?: any | any;
  kind: string;
}

export interface PauseEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  kind: string;
}

export interface PipelineCondenser_Input {
  condensers: any[];
  kind?: string;
}

export interface PipelineCondenser_Output {
  condensers: any[];
  kind: string;
}

export interface PlanningFileEditorAction {
  /** The commands to run. Allowed options are: `view`, `create`, `str_replace`, `insert`, `undo_edit`. */
  command: "view" | "create" | "str_replace" | "insert" | "undo_edit";
  /** Absolute path to file or directory. */
  path: string;
  /** Required parameter of `create` command, with the content of the file to be created. */
  file_text?: string | any;
  /** Required parameter of `str_replace` command containing the string in `path` to replace. */
  old_str?: string | any;
  /** Optional parameter of `str_replace` command containing the new string (if not given, no string will be added). Required parameter of `insert` command containing the string to insert. */
  new_str?: string | any;
  /** Required parameter of `insert` command. The `new_str` will be inserted AFTER the line `insert_line` of `path`. */
  insert_line?: number | any;
  /** Optional parameter of `view` command when `path` points to a file. If none is given, the full file is shown. If provided, the file will be shown in the indicated line number range, e.g. [11, 12] will show lines 11 and 12. Indexing at 1 to start. Setting `[start_line, -1]` shows all lines from `start_line` to the end of the file. */
  view_range?: number[] | any;
  kind: string;
}

export interface PlanningFileEditorObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** The command that was run: `view`, `create`, `str_replace`, `insert`, or `undo_edit`. */
  command: "view" | "create" | "str_replace" | "insert" | "undo_edit";
  /** The file path that was edited. */
  path?: string | any;
  /** Indicates if the file previously existed. If not, it was created. */
  prev_exist?: boolean;
  /** The content of the file before the edit. */
  old_content?: string | any;
  /** The content of the file after the edit. */
  new_content?: string | any;
  kind: string;
}

export interface PlanningFileEditorTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface PluginSource {
  /** Plugin source: 'github:owner/repo', any git URL, or local path */
  source: string;
  /** Optional branch, tag, or commit (only for git sources) */
  ref?: string | any;
  /** Subdirectory path within the git repository (e.g., 'plugins/my-plugin' for monorepos). Only relevant for git sources, not local paths. */
  repo_path?: string | any;
}

export interface ReadFileAction {
  /** The path to the file to read. */
  file_path: string;
  /** Optional: The 0-based line number to start reading from. Use for paginating through large files. */
  offset?: number | any;
  /** Optional: Maximum number of lines to read. Use with 'offset' to paginate through large files. */
  limit?: number | any;
  kind: string;
}

export interface ReadFileObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** The file path that was read. */
  file_path: string;
  /** The content read from the file. */
  file_content?: string;
  /** Whether the content was truncated due to size limits. */
  is_truncated?: boolean;
  /** If truncated, the range of lines shown (start, end) - 1-indexed. */
  lines_shown?: any[] | any;
  /** Total number of lines in the file. */
  total_lines?: number | any;
  kind: string;
}

export interface ReadFileTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface ReasoningItemModel {
  id?: string | any;
  summary?: string[];
  content?: string[] | any;
  encrypted_content?: string | any;
  status?: string | any;
}

export interface RedactedThinkingBlock {
  type?: string;
  /** The redacted thinking content */
  data: string;
}

export interface RemoteWorkspace_Input {
  /** The working directory for agent operations and tool execution. */
  working_dir: string;
  /** The remote host URL for the workspace. */
  host: string;
  /** API key for authenticating with the remote host. */
  api_key?: string | any;
  /** Timeout in seconds for reading operations of httpx.Client. */
  read_timeout?: number;
  /** Maximum number of connections for httpx.Client. None means no limit, useful for running many conversations in parallel. */
  max_connections?: number | any;
  kind?: string;
}

export interface RemoteWorkspace_Output {
  /** The working directory for agent operations and tool execution. */
  working_dir: string;
  /** The remote host URL for the workspace. */
  host: string;
  /** API key for authenticating with the remote host. */
  api_key?: string | any;
  /** Timeout in seconds for reading operations of httpx.Client. */
  read_timeout?: number;
  /** Maximum number of connections for httpx.Client. None means no limit, useful for running many conversations in parallel. */
  max_connections?: number | any;
  kind: string;
}

export interface ResponseLatency {
  model: string;
  /** Latency must be non-negative */
  latency: number;
  response_id: string;
}

export interface SandboxConfig {
  /** List of exposed URLs from the sandbox */
  exposed_urls?: any[];
}

export interface SecretRegistry_Input {
  secret_sources?: Record<string, any>;
}

export interface SecretRegistry_Output {
  secret_sources?: Record<string, any>;
}

export type SecretSource_Input = any | any;

export type SecretSource_Output = any | any;

export type SecurityAnalyzerBase_Input = any | any;

export type SecurityAnalyzerBase_Output = any | any;

export type SecurityRisk = "UNKNOWN" | "LOW" | "MEDIUM" | "HIGH";

export interface SendMessageRequest {
  role?: "user" | "system" | "assistant" | "tool";
  content?: any | any[];
  /** Whether the agent loop should automatically run if not running */
  run?: boolean;
}

export interface ServerInfo {
  uptime: number;
  idle_time: number;
  title?: string;
  version?: string;
  docs?: string;
  redoc?: string;
}

export interface SetConfirmationPolicyRequest {
  /** The confirmation policy to set */
  policy: any;
}

export interface SetSecurityAnalyzerRequest {
  /** The security analyzer to set */
  security_analyzer: any | any;
}

export interface Skill {
  name: string;
  content: string;
  /** Trigger determines when skill content is auto-injected. None = no auto-injection (for AgentSkills: agent reads on demand; for legacy: full content always in system prompt). KeywordTrigger = auto-inject when keywords appear in user messages. TaskTrigger = auto-inject for specific tasks, may require user input. */
  trigger?: any | any | any;
  /** The source path or identifier of the skill. When it is None, it is treated as a programmatically defined skill. */
  source?: string | any;
  /** MCP tools configuration for the skill (repo skills only). It should conform to the MCPConfig schema: https://gofastmcp.com/clients/client#configuration-format */
  mcp_tools?: Record<string, any> | any;
  /** Input metadata for the skill (task skills only) */
  inputs?: any[];
  /** Whether this skill was loaded from a SKILL.md file following the AgentSkills standard. AgentSkills-format skills use progressive disclosure: always listed in <available_skills> with name, description, and location. If the skill also has triggers, content is auto-injected when triggered AND agent can read file anytime. */
  is_agentskills_format?: boolean;
  /** A brief description of what the skill does and when to use it. AgentSkills standard field (max 1024 characters). */
  description?: string | any;
  /** The license under which the skill is distributed. AgentSkills standard field (e.g., 'Apache-2.0', 'MIT'). */
  license?: string | any;
  /** Environment requirements or compatibility notes for the skill. AgentSkills standard field (e.g., 'Requires git and docker'). */
  compatibility?: string | any;
  /** Arbitrary key-value metadata for the skill. AgentSkills standard field for extensibility. */
  metadata?: Record<string, string> | any;
  /** List of pre-approved tools for this skill. AgentSkills standard field (parsed from space-delimited string). */
  allowed_tools?: string[] | any;
  /** Resource directories for the skill (scripts/, references/, assets/). AgentSkills standard field. Only populated for SKILL.md directory format. */
  resources?: any | any;
}

export interface SkillInfo {
  name: string;
  type: "repo" | "knowledge" | "agentskills";
  content: string;
  triggers?: string[];
  source?: string | any;
  description?: string | any;
  is_agentskills_format?: boolean;
}

export interface SkillResources {
  /** Root directory of the skill (absolute path) */
  skill_root: string;
  /** List of script files in scripts/ directory (relative paths) */
  scripts?: string[];
  /** List of reference files in references/ directory (relative paths) */
  references?: string[];
  /** List of asset files in assets/ directory (relative paths) */
  assets?: string[];
}

export interface SkillsRequest {
  /** Load public skills from OpenHands/skills repo */
  load_public?: boolean;
  /** Load user skills from ~/.openhands/skills/ */
  load_user?: boolean;
  /** Load project skills from workspace */
  load_project?: boolean;
  /** Load organization-level skills */
  load_org?: boolean;
  /** Workspace directory path for project skills */
  project_dir?: string | any;
  /** Organization skills configuration */
  org_config?: any | any;
  /** Sandbox skills configuration */
  sandbox_config?: any | any;
}

export interface SkillsResponse {
  skills: any[];
  /** Count of skills loaded from each source */
  sources?: Record<string, number>;
}

export interface StartConversationRequest {
  agent: any;
  /** Working directory for agent operations and tool execution */
  workspace: any;
  /** Optional conversation ID. If not provided, a random UUID will be generated. */
  conversation_id?: string | any;
  /** Controls when the conversation will prompt the user before continuing. Defaults to never. */
  confirmation_policy?: any;
  /** Initial message to pass to the LLM */
  initial_message?: any | any;
  /** If set, the max number of iterations the agent will run before stopping. This is useful to prevent infinite loops. */
  max_iterations?: number;
  /** If true, the conversation will use stuck detection to prevent infinite loops. */
  stuck_detection?: boolean;
  /** Secrets available in the conversation */
  secrets?: Record<string, any>;
  /** Mapping of tool names to their module qualnames from the client's registry. These modules will be dynamically imported on the server to register the tools for this conversation. */
  tool_module_qualnames?: Record<string, string>;
  /** List of plugins to load for this conversation. Plugins are loaded and their skills/MCP config are merged into the agent. Hooks are extracted and stored for runtime execution. */
  plugins?: any[] | any;
  /** Optional hook configuration for this conversation. Hooks are shell scripts that run at key lifecycle events (PreToolUse, PostToolUse, UserPromptSubmit, Stop, etc.). If both hook_config and plugins are provided, they are merged with explicit hooks running before plugin hooks. */
  hook_config?: any | any;
}

export interface StaticSecret_Input {
  /** Optional description for this secret */
  description?: string | any;
  value?: string | any;
  kind?: string;
}

export interface StaticSecret_Output {
  /** Optional description for this secret */
  description?: string | any;
  value?: string | any;
  kind: string;
}

export interface Success {
  success?: boolean;
}

export interface SyncResponse {
  status: "success" | "error";
  message: string;
}

export interface SystemPromptEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  /** The system prompt text */
  system_prompt: any;
  /** List of tools as ToolDefinition objects */
  tools: any[];
  /** Optional dynamic per-conversation context (runtime info, repo context, secrets). When provided, this is included as a second content block in the system message (not cached). */
  dynamic_context?: any | any;
  kind: string;
}

export interface TaskItem {
  /** A brief title for the task. */
  title: string;
  /** Additional details or notes about the task. */
  notes?: string;
  /** The current status of the task. One of 'todo', 'in_progress', or 'done'. */
  status?: "todo" | "in_progress" | "done";
}

export interface TaskTrackerAction {
  /** The command to execute. `view` shows the current task list. `plan` creates or updates the task list based on provided requirements and progress. Always `view` the current list before making changes. */
  command?: "view" | "plan";
  /** The full task list. Required parameter of `plan` command. */
  task_list?: any[];
  kind: string;
}

export interface TaskTrackerObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** The command that was executed: "view" or "plan". */
  command: "view" | "plan";
  /** The current task list */
  task_list?: any[];
  kind: string;
}

export interface TaskTrackerTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface TaskTrigger {
  type?: string;
  triggers: string[];
}

export interface TerminalAction {
  /** The bash command to execute. Can be empty string to view additional logs when previous exit code is `-1`. Can be `C-c` (Ctrl+C) to interrupt the currently running process. Note: You can only execute one bash command at a time. If you need to run multiple commands sequentially, you can use `&&` or `;` to chain them together. */
  command: string;
  /** If True, the command is an input to the running process. If False, the command is a bash command to be executed in the terminal. Default is False. */
  is_input?: boolean;
  /** Optional. Sets a maximum time limit (in seconds) for running the command. If the command takes longer than this limit, you’ll be asked whether to continue or stop it. If you don’t set a value, the command will instead pause and ask for confirmation when it produces no new output for 30 seconds. Use a higher value if the command is expected to take a long time (like installation or testing), or if it has a known fixed duration (like sleep). */
  timeout?: number | any;
  /** If True, reset the terminal by creating a new session. Use this only when the terminal becomes unresponsive. Note that all previously set environment variables and session state will be lost after reset. Cannot be used with is_input=True. */
  reset?: boolean;
  kind: string;
}

export interface TerminalObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** The bash command that was executed. Can be empty string if the observation is from a previous command that hit soft timeout and is not yet finished. */
  command: string | any;
  /** The exit code of the command. -1 indicates the process hit the soft timeout and is not yet finished. */
  exit_code?: number | any;
  /** Whether the command execution timed out. */
  timeout?: boolean;
  /** Additional metadata captured from PS1 after command execution. */
  metadata?: any;
  /** Directory where full output files are saved */
  full_output_save_dir?: string | any;
  kind: string;
}

export interface TerminalTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface TextContent {
  cache_prompt?: boolean;
  type?: string;
  text: string;
}

export interface ThinkAction {
  /** The thought to log. */
  thought: string;
  kind: string;
}

export interface ThinkObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  kind: string;
}

export interface ThinkTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface ThinkingBlock {
  type?: string;
  /** The thinking content */
  thinking: string;
  /** Cryptographic signature for the thinking block */
  signature?: string | any;
}

export interface TokenEvent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source: "agent" | "user" | "environment";
  /** The exact prompt token IDs for this message event */
  prompt_token_ids: number[];
  /** The exact response token IDs for this message event */
  response_token_ids: number[];
  kind: string;
}

export interface TokenUsage {
  model?: string;
  /** Prompt tokens must be non-negative */
  prompt_tokens?: number;
  /** Completion tokens must be non-negative */
  completion_tokens?: number;
  /** Cache read tokens must be non-negative */
  cache_read_tokens?: number;
  /** Cache write tokens must be non-negative */
  cache_write_tokens?: number;
  /** Reasoning tokens must be non-negative */
  reasoning_tokens?: number;
  /** Context window must be non-negative */
  context_window?: number;
  /** Per turn tokens must be non-negative */
  per_turn_token?: number;
  response_id?: string;
}

export interface Tool_Input {
  /** Name of the tool class, e.g., 'TerminalTool'. Import it from an `openhands.tools.<module>` subpackage. */
  name: string;
  /** Parameters for the tool's .create() method, e.g., {'working_dir': '/app'} */
  params?: Record<string, any>;
}

export type ToolDefinition = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;

export interface UpdateConversationRequest {
  /** New conversation title */
  title: string;
}

export interface UpdateSecretsRequest {
  /** Dictionary mapping secret keys to values */
  secrets: Record<string, any>;
}

export interface UserRejectObservation {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: "agent" | "user" | "environment";
  /** The tool name that this observation is responding to */
  tool_name: string;
  /** The tool call id that this observation is responding to */
  tool_call_id: string;
  /** Reason for rejecting the action */
  rejection_reason?: string;
  /** Source of the rejection: 'user' for confirmation mode rejections, 'hook' for PreToolUse hook blocks */
  rejection_source?: "user" | "hook";
  /** The action id that this observation is responding to */
  action_id: string;
  kind: string;
}

export interface VSCodeUrlResponse {
  url: string | any;
}

export interface ValidationError {
  loc: string | number[];
  msg: string;
  type: string;
}

export interface WriteFileAction {
  /** The path to the file to write to. */
  file_path: string;
  /** The content to write to the file. */
  content: string;
  kind: string;
}

export interface WriteFileObservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: any | any[];
  /** Whether the observation indicates an error */
  is_error?: boolean;
  /** The file path that was written. */
  file_path?: string | any;
  /** Whether a new file was created. */
  is_new_file?: boolean;
  /** The previous content of the file (if it existed). */
  old_content?: string | any;
  /** The new content written to the file. */
  new_content?: string | any;
  kind: string;
}

export interface WriteFileTool {
  description: string;
  action_type: string;
  observation_type?: string | any;
  annotations?: any | any;
  meta?: Record<string, any> | any;
  kind: string;
  title: string;
}

export interface mcp__types__Tool {
  name: string;
  title?: string | any;
  description?: string | any;
  inputSchema: Record<string, any>;
  outputSchema?: Record<string, any> | any;
  icons?: any[] | any;
  annotations?: any | any;
  _meta?: Record<string, any> | any;
  [key: string]: any;
}

export interface mcp__types__ToolAnnotations {
  title?: string | any;
  readOnlyHint?: boolean | any;
  destructiveHint?: boolean | any;
  idempotentHint?: boolean | any;
  openWorldHint?: boolean | any;
  [key: string]: any;
}

export interface openhands__sdk__tool__spec__Tool {
  /** Name of the tool class, e.g., 'TerminalTool'. Import it from an `openhands.tools.<module>` subpackage. */
  name: string;
  /** Parameters for the tool's .create() method, e.g., {'working_dir': '/app'} */
  params?: Record<string, any>;
}

export interface openhands__sdk__tool__tool__ToolAnnotations {
  /** A human-readable title for the tool. */
  title?: string | any;
  /** If true, the tool does not modify its environment. Default: false */
  readOnlyHint?: boolean;
  /** If true, the tool may perform destructive updates to its environment. If false, the tool performs only additive updates. (This property is meaningful only when `readOnlyHint == false`) Default: true */
  destructiveHint?: boolean;
  /** If true, calling the tool repeatedly with the same arguments will have no additional effect on the its environment. (This property is meaningful only when `readOnlyHint == false`) Default: false */
  idempotentHint?: boolean;
  /** If true, this tool may interact with an 'open world' of external entities. If false, the tool's domain of interaction is closed. For example, the world of a web search tool is open, whereas that of a memory tool is not. Default: true */
  openWorldHint?: boolean;
}

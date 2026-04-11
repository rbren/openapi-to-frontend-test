// Auto-generated TypeScript types from OpenAPI specification

// DO NOT EDIT MANUALLY



export interface APIBasedCritic-Input {
  /**
   * Base URL of the vLLM classification service
   */
  serverUrl?: string;
  /**
   * API key for authenticating with the vLLM service
   */
  apiKey: Record<string, unknown>;
  /**
   * Name of the model to use
   */
  modelName?: string;
  /**
   * HuggingFace tokenizer name for loading chat template
   */
  tokenizerName?: string;
  /**
   * Whether to pass tool definitions to the model
   */
  passToolsDefinitions?: boolean;
  /**
   * Timeout for requests to the model
   */
  timeoutSeconds?: number;
  /**
   * Whether the model predicts success label at index 0
   */
  hasSuccessLabel?: boolean;
  sentimentLabels?: string[];
  agentIssueLabels?: string[];
  infraLabels?: string[];
  userFollowupLabels?: string[];
  sentimentMap?: Record<string, string>;
  /**
   * When to run critic evaluation:
   * - 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
   * - 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action)
   */
  mode?: 'finish_and_message' | 'all_actions';
  /**
   * Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations.
   */
  iterativeRefinement?: Record<string, unknown>;
  kind?: 'APIBasedCritic';
}

export interface APIBasedCritic-Output {
  /**
   * Base URL of the vLLM classification service
   */
  serverUrl?: string;
  /**
   * API key for authenticating with the vLLM service
   */
  apiKey: Record<string, unknown>;
  /**
   * Name of the model to use
   */
  modelName?: string;
  /**
   * HuggingFace tokenizer name for loading chat template
   */
  tokenizerName?: string;
  /**
   * Whether to pass tool definitions to the model
   */
  passToolsDefinitions?: boolean;
  /**
   * Timeout for requests to the model
   */
  timeoutSeconds?: number;
  /**
   * Whether the model predicts success label at index 0
   */
  hasSuccessLabel?: boolean;
  sentimentLabels?: string[];
  agentIssueLabels?: string[];
  infraLabels?: string[];
  userFollowupLabels?: string[];
  sentimentMap?: Record<string, string>;
  /**
   * When to run critic evaluation:
   * - 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
   * - 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action)
   */
  mode?: 'finish_and_message' | 'all_actions';
  /**
   * Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations.
   */
  iterativeRefinement?: Record<string, unknown>;
  kind: 'APIBasedCritic';
}

export type Action = MCPToolAction | FinishAction | ThinkAction | BrowserAction | BrowserClickAction | BrowserCloseTabAction | BrowserGetContentAction | BrowserGetStateAction | BrowserGetStorageAction | BrowserGoBackAction | BrowserListTabsAction | BrowserNavigateAction | BrowserScrollAction | BrowserSetStorageAction | BrowserStartRecordingAction | BrowserStopRecordingAction | BrowserSwitchTabAction | BrowserTypeAction | FileEditorAction | EditAction | ListDirectoryAction | ReadFileAction | WriteFileAction | GlobAction | GrepAction | PlanningFileEditorAction | TaskTrackerAction | TerminalAction;

export interface ActionEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /**
   * The thought process of the agent before taking this action
   */
  thought: TextContent[];
  /**
   * Intermediate reasoning/thinking content from reasoning models
   */
  reasoningContent?: Record<string, unknown>;
  /**
   * Anthropic thinking blocks from the LLM response
   */
  thinkingBlocks?: Record<string, unknown>[];
  /**
   * OpenAI Responses reasoning item from model output
   */
  responsesReasoningItem?: Record<string, unknown>;
  /**
   * Single tool call returned by LLM (None when non-executable)
   */
  action?: Record<string, unknown>;
  /**
   * The name of the tool being called
   */
  toolName: string;
  /**
   * The unique id returned by LLM API for this tool call
   */
  toolCallId: string;
  /**
   * The tool call received from the LLM response. We keep a copy of it so it is easier to construct it into LLM messageThis could be different from `action`: e.g., `tool_call` may contain `security_risk` field predicted by LLM when LLM risk analyzer is enabled, while `action` does not.
   */
  toolCall: MessageToolCall;
  /**
   * Completion or Response ID of the LLM response that generated this eventE.g., Can be used to group related actions from same LLM response. This helps in tracking and managing results of parallel function calling from the same LLM response.
   */
  llmResponseId: string;
  /**
   * The LLM's assessment of the safety risk of this action.
   */
  securityRisk?: SecurityRisk;
  /**
   * Optional critic evaluation of this action and preceding history.
   */
  criticResult?: Record<string, unknown>;
  /**
   * A concise summary (approximately 10 words) of what this action does, provided by the LLM for explainability and debugging. Examples of good summaries: 'editing configuration file for deployment settings' | 'searching codebase for authentication function definitions' | 'installing required dependencies from package manifest' | 'running tests to verify bug fix' | 'viewing directory structure to locate source files'
   */
  summary?: Record<string, unknown>;
  kind: 'ActionEvent';
}

export interface Agent-Input {
  /**
   * LLM configuration for the agent.
   */
  llm: LLM;
  /**
   * List of tools to initialize for the agent.
   */
  tools?: Tool-Input[];
  /**
   * Optional MCP configuration dictionary to create MCP tools.
   */
  mcpConfig?: Record<string, any>;
  /**
   * Optional regex to filter the tools available to the agent by name. This is applied after any tools provided in `tools` and any MCP tools are added.
   */
  filterToolsRegex?: Record<string, unknown>;
  /**
   * List of default tool class names to include. By default, the agent includes 'FinishTool' and 'ThinkTool'. Set to an empty list to disable all default tools, or provide a subset to include only specific ones. Example: include_default_tools=['FinishTool'] to only include FinishTool, or include_default_tools=[] to disable all default tools.
   */
  includeDefaultTools?: string[];
  /**
   * Optional AgentContext to initialize the agent with specific context.
   */
  agentContext?: Record<string, unknown>;
  /**
   * System prompt template filename. Can be either:
   * - A relative filename (e.g., 'system_prompt.j2') loaded from the agent's prompts directory
   * - An absolute path (e.g., '/path/to/custom_prompt.j2')
   */
  systemPromptFilename?: string;
  /**
   * Security policy template filename. Can be either:
   * - A relative filename (e.g., 'security_policy.j2') loaded from the agent's prompts directory
   * - An absolute path (e.g., '/path/to/custom_security_policy.j2')
   */
  securityPolicyFilename?: string;
  /**
   * Optional kwargs to pass to the system prompt Jinja2 template.
   */
  systemPromptKwargs?: Record<string, any>;
  /**
   * Optional condenser to use for condensing conversation history.
   */
  condenser?: Record<string, unknown>;
  /**
   * EXPERIMENTAL: Optional critic to evaluate agent actions and messages in real-time. API and behavior may change without notice. May impact performance, especially in 'all_actions' mode.
   */
  critic?: Record<string, unknown>;
  kind?: 'Agent';
}

export interface Agent-Output {
  /**
   * LLM configuration for the agent.
   */
  llm: LLM;
  /**
   * List of tools to initialize for the agent.
   */
  tools?: openhands__sdk__tool__spec__Tool[];
  /**
   * Optional MCP configuration dictionary to create MCP tools.
   */
  mcpConfig?: Record<string, any>;
  /**
   * Optional regex to filter the tools available to the agent by name. This is applied after any tools provided in `tools` and any MCP tools are added.
   */
  filterToolsRegex?: Record<string, unknown>;
  /**
   * List of default tool class names to include. By default, the agent includes 'FinishTool' and 'ThinkTool'. Set to an empty list to disable all default tools, or provide a subset to include only specific ones. Example: include_default_tools=['FinishTool'] to only include FinishTool, or include_default_tools=[] to disable all default tools.
   */
  includeDefaultTools?: string[];
  /**
   * Optional AgentContext to initialize the agent with specific context.
   */
  agentContext?: Record<string, unknown>;
  /**
   * System prompt template filename. Can be either:
   * - A relative filename (e.g., 'system_prompt.j2') loaded from the agent's prompts directory
   * - An absolute path (e.g., '/path/to/custom_prompt.j2')
   */
  systemPromptFilename?: string;
  /**
   * Security policy template filename. Can be either:
   * - A relative filename (e.g., 'security_policy.j2') loaded from the agent's prompts directory
   * - An absolute path (e.g., '/path/to/custom_security_policy.j2')
   */
  securityPolicyFilename?: string;
  /**
   * Optional kwargs to pass to the system prompt Jinja2 template.
   */
  systemPromptKwargs?: Record<string, any>;
  /**
   * Optional condenser to use for condensing conversation history.
   */
  condenser?: Record<string, unknown>;
  /**
   * EXPERIMENTAL: Optional critic to evaluate agent actions and messages in real-time. API and behavior may change without notice. May impact performance, especially in 'all_actions' mode.
   */
  critic?: Record<string, unknown>;
  kind: 'Agent';
}

export interface AgentBase-Input {
}

export interface AgentBase-Output {
}

export interface AgentContext-Input {
  /**
   * List of available skills that can extend the user's input.
   */
  skills?: Skill[];
  /**
   * Optional suffix to append to the system prompt.
   */
  systemMessageSuffix?: Record<string, unknown>;
  /**
   * Optional suffix to append to the user's message.
   */
  userMessageSuffix?: Record<string, unknown>;
  /**
   * Whether to automatically load user skills from ~/.openhands/skills/ and ~/.openhands/microagents/ (for backward compatibility). 
   */
  loadUserSkills?: boolean;
  /**
   * Whether to automatically load skills from the public OpenHands skills repository at https://github.com/OpenHands/skills. This allows you to get the latest skills without SDK updates.
   */
  loadPublicSkills?: boolean;
  /**
   * Dictionary mapping secret keys to values or secret sources. Secrets are used for authentication and sensitive data handling. Values can be either strings or SecretSource instances (str | SecretSource).
   */
  secrets?: Record<string, unknown>;
  /**
   * Current date and time information to provide to the agent. Can be a datetime object (which will be formatted as ISO 8601) or a pre-formatted string. When provided, this information is included in the system prompt to give the agent awareness of the current time context. Defaults to the current datetime.
   */
  currentDatetime?: Record<string, unknown>;
}

export interface AgentContext-Output {
  /**
   * List of available skills that can extend the user's input.
   */
  skills?: Skill[];
  /**
   * Optional suffix to append to the system prompt.
   */
  systemMessageSuffix?: Record<string, unknown>;
  /**
   * Optional suffix to append to the user's message.
   */
  userMessageSuffix?: Record<string, unknown>;
  /**
   * Whether to automatically load user skills from ~/.openhands/skills/ and ~/.openhands/microagents/ (for backward compatibility). 
   */
  loadUserSkills?: boolean;
  /**
   * Whether to automatically load skills from the public OpenHands skills repository at https://github.com/OpenHands/skills. This allows you to get the latest skills without SDK updates.
   */
  loadPublicSkills?: boolean;
  /**
   * Dictionary mapping secret keys to values or secret sources. Secrets are used for authentication and sensitive data handling. Values can be either strings or SecretSource instances (str | SecretSource).
   */
  secrets?: Record<string, unknown>;
  /**
   * Current date and time information to provide to the agent. Can be a datetime object (which will be formatted as ISO 8601) or a pre-formatted string. When provided, this information is included in the system prompt to give the agent awareness of the current time context. Defaults to the current datetime.
   */
  currentDatetime?: Record<string, unknown>;
}

export interface AgentErrorEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /**
   * The tool name that this observation is responding to
   */
  toolName: string;
  /**
   * The tool call id that this observation is responding to
   */
  toolCallId: string;
  /**
   * The error message from the scaffold
   */
  error: string;
  kind: 'AgentErrorEvent';
}

export interface AgentFinishedCritic-Input {
  /**
   * When to run critic evaluation:
   * - 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
   * - 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action)
   */
  mode?: 'finish_and_message' | 'all_actions';
  /**
   * Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations.
   */
  iterativeRefinement?: Record<string, unknown>;
  kind?: 'AgentFinishedCritic';
}

export interface AgentFinishedCritic-Output {
  /**
   * When to run critic evaluation:
   * - 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
   * - 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action)
   */
  mode?: 'finish_and_message' | 'all_actions';
  /**
   * Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations.
   */
  iterativeRefinement?: Record<string, unknown>;
  kind: 'AgentFinishedCritic';
}

export interface AlwaysConfirm-Input {
  kind?: 'AlwaysConfirm';
}

export interface AlwaysConfirm-Output {
  kind: 'AlwaysConfirm';
}

export interface AskAgentRequest {
  /**
   * The question to ask the agent
   */
  question: string;
}

export interface AskAgentResponse {
  /**
   * The agent's response to the question
   */
  response: string;
}

export type BaseWorkspace-Input = LocalWorkspace-Input | RemoteWorkspace-Input;

export type BaseWorkspace-Output = LocalWorkspace-Output | RemoteWorkspace-Output;

export interface BashCommand {
  /**
   * The bash command to execute
   */
  command: string;
  /**
   * The current working directory
   */
  cwd?: Record<string, unknown>;
  /**
   * The max number of seconds a command may be permitted to run.
   */
  timeout?: number;
  id?: string;
  timestamp?: string;
  kind: 'BashCommand';
}

export type BashEventBase = BashCommand | BashOutput;

export interface BashEventPage {
  items: BashEventBase[];
  nextPageId?: Record<string, unknown>;
}

export type BashEventSortOrder = 'TIMESTAMP' | 'TIMESTAMP_DESC';

export interface BashOutput {
  id?: string;
  timestamp?: string;
  commandId: string;
  /**
   * The order for this output, sequentially starting with 0
   */
  order?: number;
  /**
   * Exit code None implies the command is still running.
   */
  exitCode?: Record<string, unknown>;
  /**
   * The standard output from the command
   */
  stdout?: Record<string, unknown>;
  /**
   * The error output from the command
   */
  stderr?: Record<string, unknown>;
  kind: 'BashOutput';
}

export interface Body_upload_file_api_file_upload__path__post {
  file: string;
}

export interface BrowserAction {
  kind: 'BrowserAction';
}

export interface BrowserClickAction {
  /**
   * The index of the element to click (from browser_get_state)
   */
  index: number;
  /**
   * Whether to open any resulting navigation in a new tab. Default: False
   */
  newTab?: boolean;
  kind: 'BrowserClickAction';
}

export interface BrowserClickTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserClickTool';
  title: string;
}

export interface BrowserCloseTabAction {
  /**
   * 4 Character Tab ID of the tab to close (from browser_list_tabs)
   */
  tabId: string;
  kind: 'BrowserCloseTabAction';
}

export interface BrowserCloseTabTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserCloseTabTool';
  title: string;
}

export interface BrowserGetContentAction {
  /**
   * Whether to include links in the content (default: False)
   */
  extractLinks?: boolean;
  /**
   * Character index to start from in the page content (default: 0)
   */
  startFromChar?: number;
  kind: 'BrowserGetContentAction';
}

export interface BrowserGetContentTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserGetContentTool';
  title: string;
}

export interface BrowserGetStateAction {
  /**
   * Whether to include a screenshot of the current page. Default: False
   */
  includeScreenshot?: boolean;
  kind: 'BrowserGetStateAction';
}

export interface BrowserGetStateTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserGetStateTool';
  title: string;
}

export interface BrowserGetStorageAction {
  kind: 'BrowserGetStorageAction';
}

export interface BrowserGetStorageTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserGetStorageTool';
  title: string;
}

export interface BrowserGoBackAction {
  kind: 'BrowserGoBackAction';
}

export interface BrowserGoBackTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserGoBackTool';
  title: string;
}

export interface BrowserListTabsAction {
  kind: 'BrowserListTabsAction';
}

export interface BrowserListTabsTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserListTabsTool';
  title: string;
}

export interface BrowserNavigateAction {
  /**
   * The URL to navigate to
   */
  url: string;
  /**
   * Whether to open in a new tab. Default: False
   */
  newTab?: boolean;
  kind: 'BrowserNavigateAction';
}

export interface BrowserNavigateTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserNavigateTool';
  title: string;
}

export interface BrowserObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * Base64 screenshot data if available
   */
  screenshotData?: Record<string, unknown>;
  /**
   * Directory where full output files are saved
   */
  fullOutputSaveDir?: Record<string, unknown>;
  kind: 'BrowserObservation';
}

export interface BrowserScrollAction {
  /**
   * Direction to scroll. Options: 'up', 'down'. Default: 'down'
   */
  direction?: 'up' | 'down';
  kind: 'BrowserScrollAction';
}

export interface BrowserScrollTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserScrollTool';
  title: string;
}

export interface BrowserSetStorageAction {
  /**
   * Storage state dictionary containing 'cookies' and 'origins' (from browser_get_storage)
   */
  storageState: Record<string, any>;
  kind: 'BrowserSetStorageAction';
}

export interface BrowserSetStorageTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserSetStorageTool';
  title: string;
}

export interface BrowserStartRecordingAction {
  kind: 'BrowserStartRecordingAction';
}

export interface BrowserStartRecordingTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserStartRecordingTool';
  title: string;
}

export interface BrowserStopRecordingAction {
  kind: 'BrowserStopRecordingAction';
}

export interface BrowserStopRecordingTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserStopRecordingTool';
  title: string;
}

export interface BrowserSwitchTabAction {
  /**
   * 4 Character Tab ID of the tab to switch to (from browser_list_tabs)
   */
  tabId: string;
  kind: 'BrowserSwitchTabAction';
}

export interface BrowserSwitchTabTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserSwitchTabTool';
  title: string;
}

export interface BrowserToolSet {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserToolSet';
  title: string;
}

export interface BrowserTypeAction {
  /**
   * The index of the input element (from browser_get_state)
   */
  index: number;
  /**
   * The text to type
   */
  text: string;
  kind: 'BrowserTypeAction';
}

export interface BrowserTypeTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'BrowserTypeTool';
  title: string;
}

export interface CmdOutputMetadata {
  /**
   * The exit code of the last executed command.
   */
  exitCode?: number;
  /**
   * The process ID of the last executed command.
   */
  pid?: number;
  /**
   * The username of the current user.
   */
  username?: Record<string, unknown>;
  /**
   * The hostname of the machine.
   */
  hostname?: Record<string, unknown>;
  /**
   * The current working directory.
   */
  workingDir?: Record<string, unknown>;
  /**
   * The path to the current Python interpreter, if any.
   */
  pyInterpreterPath?: Record<string, unknown>;
  /**
   * Prefix to add to command output
   */
  prefix?: string;
  /**
   * Suffix to add to command output
   */
  suffix?: string;
}

export interface Condensation {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /**
   * The IDs of the events that are being forgotten (removed from the `View` given to the LLM).
   */
  forgottenEventIds?: string[];
  /**
   * An optional summary of the events being forgotten.
   */
  summary?: Record<string, unknown>;
  /**
   * An optional offset to the start of the resulting view (after forgotten events have been removed) indicating where the summary should be inserted. If not provided, the summary will not be inserted into the view.
   */
  summaryOffset?: Record<string, unknown>;
  /**
   * Completion or Response ID of the LLM response that generated this event
   */
  llmResponseId: string;
  kind: 'Condensation';
}

export interface CondensationRequest {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  kind: 'CondensationRequest';
}

export interface CondensationSummaryEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  summary: string;
  kind: 'CondensationSummaryEvent';
}

export type CondenserBase-Input = LLMSummarizingCondenser-Input | NoOpCondenser-Input | PipelineCondenser-Input;

export type CondenserBase-Output = LLMSummarizingCondenser-Output | NoOpCondenser-Output | PipelineCondenser-Output;

export interface ConfirmRisky-Input {
  threshold?: SecurityRisk;
  confirmUnknown?: boolean;
  kind?: 'ConfirmRisky';
}

export interface ConfirmRisky-Output {
  threshold?: SecurityRisk;
  confirmUnknown?: boolean;
  kind: 'ConfirmRisky';
}

export type ConfirmationPolicyBase-Input = AlwaysConfirm-Input | ConfirmRisky-Input | NeverConfirm-Input;

export type ConfirmationPolicyBase-Output = AlwaysConfirm-Output | ConfirmRisky-Output | NeverConfirm-Output;

export interface ConfirmationResponseRequest {
  accept: boolean;
  reason?: string;
}

export interface ConversationErrorEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  /**
   * The source of this event
   */
  source: 'agent' | 'user' | 'environment';
  /**
   * Code for the error - typically a type
   */
  code: string;
  /**
   * Details about the error
   */
  detail: string;
  kind: 'ConversationErrorEvent';
}

export type ConversationExecutionStatus = 'idle' | 'running' | 'paused' | 'waiting_for_confirmation' | 'finished' | 'error' | 'stuck' | 'deleting';

export interface ConversationInfo {
  /**
   * Unique conversation ID
   */
  id: string;
  /**
   * The agent running in the conversation. This is persisted to allow resuming conversations and check agent configuration to handle e.g., tool changes, LLM changes, etc.
   */
  agent: AgentBase-Output;
  /**
   * Workspace used by the agent to execute commands and read/write files. Not the process working directory.
   */
  workspace: BaseWorkspace-Output;
  /**
   * Directory for persisting conversation state and events. If None, conversation will not be persisted.
   */
  persistenceDir?: Record<string, unknown>;
  /**
   * Maximum number of iterations the agent can perform in a single run.
   */
  maxIterations?: number;
  /**
   * Whether to enable stuck detection for the agent.
   */
  stuckDetection?: boolean;
  executionStatus?: ConversationExecutionStatus;
  confirmationPolicy?: ConfirmationPolicyBase-Output;
  /**
   * Optional security analyzer to evaluate action risks.
   */
  securityAnalyzer?: Record<string, unknown>;
  /**
   * List of activated knowledge skills name
   */
  activatedKnowledgeSkills?: string[];
  /**
   * Actions blocked by PreToolUse hooks, keyed by action ID
   */
  blockedActions?: Record<string, string>;
  /**
   * Messages blocked by UserPromptSubmit hooks, keyed by message ID
   */
  blockedMessages?: Record<string, string>;
  /**
   * Conversation statistics for tracking LLM metrics
   */
  stats?: ConversationStats-Output;
  /**
   * Registry for handling secrets and sensitive data
   */
  secretRegistry?: SecretRegistry-Output;
  /**
   * Dictionary for agent-specific runtime state that persists across iterations. Agents can store feature-specific state using string keys. To trigger autosave, always reassign: state.agent_state = {**state.agent_state, key: value}. See https://docs.openhands.dev/sdk/guides/convo-persistence#how-state-persistence-works
   */
  agentState?: Record<string, any>;
  /**
   * User-defined title for the conversation
   */
  title?: Record<string, unknown>;
  metrics?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConversationPage {
  items: ConversationInfo[];
  nextPageId?: Record<string, unknown>;
}

export type ConversationSortOrder = 'CREATED_AT' | 'UPDATED_AT' | 'CREATED_AT_DESC' | 'UPDATED_AT_DESC';

export interface ConversationStateUpdateEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /**
   * Unique key for this state update event
   */
  key?: string;
  /**
   * Serialized conversation state updates
   */
  value?: Record<string, unknown>;
  kind: 'ConversationStateUpdateEvent';
}

export interface ConversationStats-Input {
  /**
   * Active usage metrics tracked by the registry.
   */
  usageToMetrics?: Record<string, Metrics>;
}

export interface ConversationStats-Output {
}

export interface Cost {
  model: string;
  /**
   * Cost must be non-negative
   */
  cost: number;
  timestamp?: number;
}

export type CriticBase-Input = AgentFinishedCritic-Input | APIBasedCritic-Input | EmptyPatchCritic-Input | PassCritic-Input;

export type CriticBase-Output = AgentFinishedCritic-Output | APIBasedCritic-Output | EmptyPatchCritic-Output | PassCritic-Output;

export interface CriticResult {
  /**
   * A predicted probability of success between 0 and 1.
   */
  score: number;
  /**
   * An optional message explaining the score.
   */
  message: Record<string, unknown>;
  /**
   * Optional metadata about the critic evaluation. Can include event_ids and categorized_features for visualization.
   */
  metadata?: Record<string, unknown>;
}

export interface DesktopUrlResponse {
  url: Record<string, unknown>;
}

export interface EditAction {
  /**
   * The path to the file to modify.
   */
  filePath: string;
  /**
   * The text to replace. To create a new file, use an empty string. Must match the exact text in the file including whitespace.
   */
  oldString: string;
  /**
   * The text to replace it with.
   */
  newString: string;
  /**
   * Number of replacements expected. Defaults to 1. Use when you want to replace multiple occurrences. The edit will fail if the actual count doesn't match.
   */
  expectedReplacements?: number;
  kind: 'EditAction';
}

export interface EditObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * The file path that was edited.
   */
  filePath?: Record<string, unknown>;
  /**
   * Whether a new file was created.
   */
  isNewFile?: boolean;
  /**
   * Number of replacements actually made.
   */
  replacementsMade?: number;
  /**
   * The content before the edit.
   */
  oldContent?: Record<string, unknown>;
  /**
   * The content after the edit.
   */
  newContent?: Record<string, unknown>;
  kind: 'EditObservation';
}

export interface EditTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'EditTool';
  title: string;
}

export interface EmptyPatchCritic-Input {
  /**
   * When to run critic evaluation:
   * - 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
   * - 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action)
   */
  mode?: 'finish_and_message' | 'all_actions';
  /**
   * Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations.
   */
  iterativeRefinement?: Record<string, unknown>;
  kind?: 'EmptyPatchCritic';
}

export interface EmptyPatchCritic-Output {
  /**
   * When to run critic evaluation:
   * - 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
   * - 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action)
   */
  mode?: 'finish_and_message' | 'all_actions';
  /**
   * Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations.
   */
  iterativeRefinement?: Record<string, unknown>;
  kind: 'EmptyPatchCritic';
}

export type Event = Condensation | CondensationRequest | CondensationSummaryEvent | ConversationErrorEvent | ConversationStateUpdateEvent | LLMCompletionLogEvent | ActionEvent | MessageEvent | AgentErrorEvent | ObservationEvent | UserRejectObservation | SystemPromptEvent | TokenEvent | PauseEvent;

export interface EventPage {
  items: Event[];
  nextPageId?: Record<string, unknown>;
}

export type EventSortOrder = 'TIMESTAMP' | 'TIMESTAMP_DESC';

export interface ExecuteBashRequest {
  /**
   * The bash command to execute
   */
  command: string;
  /**
   * The current working directory
   */
  cwd?: Record<string, unknown>;
  /**
   * The max number of seconds a command may be permitted to run.
   */
  timeout?: number;
}

export interface ExposedUrl {
  name: string;
  url: string;
  port: number;
}

export interface FileEditorAction {
  /**
   * The commands to run. Allowed options are: `view`, `create`, `str_replace`, `insert`, `undo_edit`.
   */
  command: 'view' | 'create' | 'str_replace' | 'insert' | 'undo_edit';
  /**
   * Absolute path to file or directory.
   */
  path: string;
  /**
   * Required parameter of `create` command, with the content of the file to be created.
   */
  fileText?: Record<string, unknown>;
  /**
   * Required parameter of `str_replace` command containing the string in `path` to replace.
   */
  oldStr?: Record<string, unknown>;
  /**
   * Optional parameter of `str_replace` command containing the new string (if not given, no string will be added). Required parameter of `insert` command containing the string to insert.
   */
  newStr?: Record<string, unknown>;
  /**
   * Required parameter of `insert` command. The `new_str` will be inserted AFTER the line `insert_line` of `path`.
   */
  insertLine?: Record<string, unknown>;
  /**
   * Optional parameter of `view` command when `path` points to a file. If none is given, the full file is shown. If provided, the file will be shown in the indicated line number range, e.g. [11, 12] will show lines 11 and 12. Indexing at 1 to start. Setting `[start_line, -1]` shows all lines from `start_line` to the end of the file.
   */
  viewRange?: Record<string, unknown>;
  kind: 'FileEditorAction';
}

export interface FileEditorObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * The command that was run: `view`, `create`, `str_replace`, `insert`, or `undo_edit`.
   */
  command: 'view' | 'create' | 'str_replace' | 'insert' | 'undo_edit';
  /**
   * The file path that was edited.
   */
  path?: Record<string, unknown>;
  /**
   * Indicates if the file previously existed. If not, it was created.
   */
  prevExist?: boolean;
  /**
   * The content of the file before the edit.
   */
  oldContent?: Record<string, unknown>;
  /**
   * The content of the file after the edit.
   */
  newContent?: Record<string, unknown>;
  kind: 'FileEditorObservation';
}

export interface FileEditorTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'FileEditorTool';
  title: string;
}

export interface FileEntry {
  /**
   * Name of the file or directory
   */
  name: string;
  /**
   * Absolute path to the file or directory
   */
  path: string;
  /**
   * Whether this entry is a directory
   */
  isDirectory: boolean;
  /**
   * Size of the file in bytes (0 for directories)
   */
  size: number;
  /**
   * Last modified timestamp
   */
  modifiedTime: string;
}

export interface FinishAction {
  /**
   * Final message to send to the user.
   */
  message: string;
  kind: 'FinishAction';
}

export interface FinishObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  kind: 'FinishObservation';
}

export interface FinishTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'FinishTool';
  title: string;
}

export interface GenerateTitleRequest {
  /**
   * Maximum length of the generated title
   */
  maxLength?: number;
  /**
   * Optional LLM to use for title generation
   */
  llm?: Record<string, unknown>;
}

export interface GenerateTitleResponse {
  /**
   * The generated title for the conversation
   */
  title: string;
}

export interface GitChange {
  status: GitChangeStatus;
  path: string;
}

export type GitChangeStatus = 'MOVED' | 'ADDED' | 'DELETED' | 'UPDATED';

export interface GitDiff {
  modified: Record<string, unknown>;
  original: Record<string, unknown>;
}

export interface GlobAction {
  /**
   * The glob pattern to match files (e.g., "**/*.js", "src/**/*.ts")
   */
  pattern: string;
  /**
   * The directory (absolute path) to search in. Defaults to the current working directory.
   */
  path?: Record<string, unknown>;
  kind: 'GlobAction';
}

export interface GlobObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * List of matching file paths sorted by modification time
   */
  files: string[];
  /**
   * The glob pattern that was used
   */
  pattern: string;
  /**
   * The directory that was searched
   */
  searchPath: string;
  /**
   * Whether results were truncated to 100 files
   */
  truncated?: boolean;
  kind: 'GlobObservation';
}

export interface GlobTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'GlobTool';
  title: string;
}

export interface GraySwanAnalyzer-Input {
  /**
   * Number of recent events to include as context
   */
  historyLimit?: number;
  /**
   * Max characters for conversation processing
   */
  maxMessageChars?: number;
  /**
   * Request timeout in seconds
   */
  timeout?: number;
  /**
   * Risk threshold for LOW classification (score <= threshold)
   */
  lowThreshold?: number;
  /**
   * Risk threshold for MEDIUM classification (score <= threshold)
   */
  mediumThreshold?: number;
  /**
   * GraySwan Cygnal API endpoint
   */
  apiUrl?: string;
  /**
   * GraySwan API key (via GRAYSWAN_API_KEY env var)
   */
  apiKey?: Record<string, unknown>;
  /**
   * GraySwan policy ID (via GRAYSWAN_POLICY_ID env var)
   */
  policyId?: Record<string, unknown>;
  kind?: 'GraySwanAnalyzer';
}

export interface GraySwanAnalyzer-Output {
  /**
   * Number of recent events to include as context
   */
  historyLimit?: number;
  /**
   * Max characters for conversation processing
   */
  maxMessageChars?: number;
  /**
   * Request timeout in seconds
   */
  timeout?: number;
  /**
   * Risk threshold for LOW classification (score <= threshold)
   */
  lowThreshold?: number;
  /**
   * Risk threshold for MEDIUM classification (score <= threshold)
   */
  mediumThreshold?: number;
  /**
   * GraySwan Cygnal API endpoint
   */
  apiUrl?: string;
  /**
   * GraySwan API key (via GRAYSWAN_API_KEY env var)
   */
  apiKey?: Record<string, unknown>;
  /**
   * GraySwan policy ID (via GRAYSWAN_POLICY_ID env var)
   */
  policyId?: Record<string, unknown>;
  kind: 'GraySwanAnalyzer';
}

export interface GrepAction {
  /**
   * The regex pattern to search for in file contents
   */
  pattern: string;
  /**
   * The directory (absolute path) to search in. Defaults to the current working directory.
   */
  path?: Record<string, unknown>;
  /**
   * Optional file pattern to filter which files to search (e.g., "*.js", "*.{ts,tsx}")
   */
  include?: Record<string, unknown>;
  kind: 'GrepAction';
}

export interface GrepObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * List of file paths containing the pattern
   */
  matches: string[];
  /**
   * The regex pattern that was used
   */
  pattern: string;
  /**
   * The directory that was searched
   */
  searchPath: string;
  /**
   * The file pattern filter that was used
   */
  includePattern?: Record<string, unknown>;
  /**
   * Whether results were truncated to 100 files
   */
  truncated?: boolean;
  kind: 'GrepObservation';
}

export interface GrepTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'GrepTool';
  title: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface HookConfig-Input {
  /**
   * Hooks that run before tool execution
   */
  preToolUse?: HookMatcher-Input[];
  /**
   * Hooks that run after tool execution
   */
  postToolUse?: HookMatcher-Input[];
  /**
   * Hooks that run when user submits a prompt
   */
  userPromptSubmit?: HookMatcher-Input[];
  /**
   * Hooks that run when a session starts
   */
  sessionStart?: HookMatcher-Input[];
  /**
   * Hooks that run when a session ends
   */
  sessionEnd?: HookMatcher-Input[];
  /**
   * Hooks that run when the agent attempts to stop
   */
  stop?: HookMatcher-Input[];
}

export interface HookConfig-Output {
  /**
   * Hooks that run before tool execution
   */
  preToolUse?: HookMatcher-Output[];
  /**
   * Hooks that run after tool execution
   */
  postToolUse?: HookMatcher-Output[];
  /**
   * Hooks that run when user submits a prompt
   */
  userPromptSubmit?: HookMatcher-Output[];
  /**
   * Hooks that run when a session starts
   */
  sessionStart?: HookMatcher-Output[];
  /**
   * Hooks that run when a session ends
   */
  sessionEnd?: HookMatcher-Output[];
  /**
   * Hooks that run when the agent attempts to stop
   */
  stop?: HookMatcher-Output[];
}

export interface HookDefinition {
  type?: HookType;
  command: string;
  timeout?: number;
}

export interface HookMatcher-Input {
  matcher?: string;
  hooks?: HookDefinition[];
}

export interface HookMatcher-Output {
  matcher?: string;
  hooks?: HookDefinition[];
}

export type HookType = 'command' | 'prompt';

export interface HooksRequest {
  /**
   * Workspace directory path for project hooks
   */
  projectDir?: Record<string, unknown>;
}

export interface HooksResponse {
  /**
   * Hook configuration loaded from the workspace, or None if not found
   */
  hookConfig?: Record<string, unknown>;
}

export interface Icon {
  src: string;
  mimeType?: Record<string, unknown>;
  sizes?: Record<string, unknown>;
}

export interface ImageContent {
  cachePrompt?: boolean;
  type?: 'image';
  imageUrls: string[];
}

export interface InputMetadata {
  /**
   * Name of the input parameter
   */
  name: string;
  /**
   * Description of the input parameter
   */
  description: string;
}

export interface IterativeRefinementConfig {
  /**
   * Score threshold (0-1) to consider task successful.
   */
  successThreshold?: number;
  /**
   * Maximum number of iterations before giving up.
   */
  maxIterations?: number;
}

export interface KeywordTrigger {
  type?: 'keyword';
  keywords: string[];
}

export interface LLM {
  /**
   * Model name.
   */
  model?: string;
  /**
   * API key.
   */
  apiKey?: Record<string, unknown>;
  /**
   * Custom base URL.
   */
  baseUrl?: Record<string, unknown>;
  /**
   * API version (e.g., Azure).
   */
  apiVersion?: Record<string, unknown>;
  awsAccessKeyId?: Record<string, unknown>;
  awsSecretAccessKey?: Record<string, unknown>;
  awsRegionName?: Record<string, unknown>;
  openrouterSiteUrl?: string;
  openrouterAppName?: string;
  numRetries?: number;
  retryMultiplier?: number;
  retryMinWait?: number;
  retryMaxWait?: number;
  /**
   * HTTP timeout in seconds. Default is 300s (5 minutes). Set to None to disable timeout (not recommended for production).
   */
  timeout?: Record<string, unknown>;
  /**
   * Approx max chars in each event/content sent to the LLM.
   */
  maxMessageChars?: number;
  /**
   * Sampling temperature for response generation. Defaults to 0 for most models and provider default for reasoning models.
   */
  temperature?: Record<string, unknown>;
  topP?: Record<string, unknown>;
  topK?: Record<string, unknown>;
  /**
   * The maximum number of input tokens. Note that this is currently unused, and the value at runtime is actually the total tokens in OpenAI (e.g. 128,000 tokens for GPT-4).
   */
  maxInputTokens?: Record<string, unknown>;
  /**
   * The maximum number of output tokens. This is sent to the LLM.
   */
  maxOutputTokens?: Record<string, unknown>;
  /**
   * Optional canonical model name for feature registry lookups. The OpenHands SDK maintains a model feature registry that maps model names to capabilities (e.g., vision support, prompt caching, responses API support). When using proxied or aliased model identifiers, set this field to the canonical model name (e.g., 'openai/gpt-4o') to ensure correct capability detection. If not provided, the 'model' field will be used for capability lookups.
   */
  modelCanonicalName?: Record<string, unknown>;
  /**
   * Optional HTTP headers to forward to LiteLLM requests.
   */
  extraHeaders?: Record<string, unknown>;
  /**
   * The cost per input token. This will available in logs for user.
   */
  inputCostPerToken?: Record<string, unknown>;
  /**
   * The cost per output token. This will available in logs for user.
   */
  outputCostPerToken?: Record<string, unknown>;
  ollamaBaseUrl?: Record<string, unknown>;
  /**
   * Enable streaming responses from the LLM. When enabled, the provided `on_token` callback in .completions and .responses will be invoked for each chunk of tokens.
   */
  stream?: boolean;
  dropParams?: boolean;
  /**
   * Modify params allows litellm to do transformations like adding a default message, when a message is empty.
   */
  modifyParams?: boolean;
  /**
   * If model is vision capable, this option allows to disable image processing (useful for cost reduction).
   */
  disableVision?: Record<string, unknown>;
  /**
   * Disable using of stop word.
   */
  disableStopWord?: Record<string, unknown>;
  /**
   * Enable caching of prompts.
   */
  cachingPrompt?: boolean;
  /**
   * Enable logging of completions.
   */
  logCompletions?: boolean;
  /**
   * The folder to log LLM completions to. Required if log_completions is True.
   */
  logCompletionsFolder?: string;
  /**
   * A custom tokenizer to use for token counting.
   */
  customTokenizer?: Record<string, unknown>;
  /**
   * Whether to use native tool calling.
   */
  nativeToolCalling?: boolean;
  /**
   * Force using string content serializer when sending to LLM API. If None (default), auto-detect based on model. Useful for providers that do not support list content, like HuggingFace and Groq.
   */
  forceStringSerializer?: Record<string, unknown>;
  /**
   * The effort to put into reasoning. This is a string that can be one of 'low', 'medium', 'high', 'xhigh', or 'none'. Can apply to all reasoning models.
   */
  reasoningEffort?: Record<string, unknown>;
  /**
   * The level of detail for reasoning summaries. This is a string that can be one of 'auto', 'concise', or 'detailed'. Requires verified OpenAI organization. Only sent when explicitly set.
   */
  reasoningSummary?: Record<string, unknown>;
  /**
   * If True, ask for ['reasoning.encrypted_content'] in Responses API include.
   */
  enableEncryptedReasoning?: boolean;
  /**
   * Retention policy for prompt cache. Only sent for GPT-5+ models; explicitly stripped for all other models.
   */
  promptCacheRetention?: Record<string, unknown>;
  /**
   * The budget tokens for extended thinking, supported by Anthropic models.
   */
  extendedThinkingBudget?: Record<string, unknown>;
  /**
   * The seed to use for random number generation.
   */
  seed?: Record<string, unknown>;
  /**
   * Deprecated: Safety settings for models that support them (like Mistral AI and Gemini). This field is deprecated in 1.10.0 and will be removed in 1.15.0. Safety settings are designed for consumer-facing content moderation, which is not relevant for coding agents.
   */
  safetySettings?: Record<string, unknown>;
  /**
   * Unique usage identifier for the LLM. Used for registry lookups, telemetry, and spend tracking.
   */
  usageId?: string;
  /**
   * Additional key-value pairs to pass to litellm's extra_body parameter. This is useful for custom inference endpoints that need additional parameters for configuration, routing, or advanced features. NOTE: Not all LLM providers support extra_body parameters. Some providers (e.g., OpenAI) may reject requests with unrecognized options. This is commonly supported by: - LiteLLM proxy servers (routing metadata, tracing) - vLLM endpoints (return_token_ids, etc.) - Custom inference clusters Examples: - Proxy routing: {'trace_version': '1.0.0', 'tags': ['agent:my-agent']} - vLLM features: {'return_token_ids': True}
   */
  litellmExtraBody?: Record<string, any>;
}

export interface LLMCompletionLogEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /**
   * The intended filename for this log (relative to log directory)
   */
  filename: string;
  /**
   * The JSON-encoded log data to be written to the file
   */
  logData: string;
  /**
   * The model name for context
   */
  modelName?: string;
  /**
   * The LLM usage_id that produced this log
   */
  usageId?: string;
  kind: 'LLMCompletionLogEvent';
}

export interface LLMSecurityAnalyzer-Input {
  kind?: 'LLMSecurityAnalyzer';
}

export interface LLMSecurityAnalyzer-Output {
  kind: 'LLMSecurityAnalyzer';
}

export interface LLMSummarizingCondenser-Input {
  llm: LLM;
  maxSize?: number;
  maxTokens?: Record<string, unknown>;
  keepFirst?: number;
  hardContextResetMaxRetries?: number;
  hardContextResetContextScaling?: number;
  kind?: 'LLMSummarizingCondenser';
}

export interface LLMSummarizingCondenser-Output {
  llm: LLM;
  maxSize?: number;
  maxTokens?: Record<string, unknown>;
  keepFirst?: number;
  hardContextResetMaxRetries?: number;
  hardContextResetContextScaling?: number;
  kind: 'LLMSummarizingCondenser';
}

export interface ListDirectoryAction {
  /**
   * The path to the directory to list. Defaults to current directory.
   */
  dirPath?: string;
  /**
   * Whether to list subdirectories recursively (up to 2 levels).
   */
  recursive?: boolean;
  kind: 'ListDirectoryAction';
}

export interface ListDirectoryObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * The directory path that was listed.
   */
  dirPath?: Record<string, unknown>;
  /**
   * List of files and directories found.
   */
  entries?: FileEntry[];
  /**
   * Total number of entries found.
   */
  totalCount?: number;
  /**
   * Whether the listing was truncated due to too many entries.
   */
  isTruncated?: boolean;
  kind: 'ListDirectoryObservation';
}

export interface ListDirectoryTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'ListDirectoryTool';
  title: string;
}

export interface LocalWorkspace-Input {
  /**
   * The working directory for agent operations and tool execution. Accepts both string paths and Path objects. Path objects are automatically converted to strings.
   */
  workingDir: string;
  kind?: 'LocalWorkspace';
}

export interface LocalWorkspace-Output {
  /**
   * The working directory for agent operations and tool execution. Accepts both string paths and Path objects. Path objects are automatically converted to strings.
   */
  workingDir: string;
  kind: 'LocalWorkspace';
}

export interface LookupSecret-Input {
  /**
   * Optional description for this secret
   */
  description?: Record<string, unknown>;
  url: string;
  headers?: Record<string, string>;
  kind?: 'LookupSecret';
}

export interface LookupSecret-Output {
  /**
   * Optional description for this secret
   */
  description?: Record<string, unknown>;
  url: string;
  headers?: Record<string, string>;
  kind: 'LookupSecret';
}

export interface MCPToolAction {
  /**
   * Dynamic data fields from the tool call
   */
  data?: Record<string, any>;
  kind: 'MCPToolAction';
}

export interface MCPToolDefinition {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  /**
   * The MCP tool definition.
   */
  mcpTool: mcp__types__Tool;
  kind: 'MCPToolDefinition';
  title: string;
}

export interface MCPToolObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * Name of the tool that was called
   */
  toolName: string;
  kind: 'MCPToolObservation';
}

export interface Message {
  role: 'user' | 'system' | 'assistant' | 'tool';
  content?: Record<string, unknown>[];
  toolCalls?: Record<string, unknown>;
  toolCallId?: Record<string, unknown>;
  name?: Record<string, unknown>;
  /**
   * Intermediate reasoning/thinking content from reasoning models
   */
  reasoningContent?: Record<string, unknown>;
  /**
   * Raw Anthropic thinking blocks for extended thinking feature
   */
  thinkingBlocks?: Record<string, unknown>[];
  /**
   * OpenAI Responses reasoning item from model output
   */
  responsesReasoningItem?: Record<string, unknown>;
}

export interface MessageEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source: 'agent' | 'user' | 'environment';
  /**
   * The exact LLM message for this message event
   */
  llmMessage: Message;
  /**
   * Completion or Response ID of the LLM response that generated this eventIf the source != 'agent', this field is None
   */
  llmResponseId?: Record<string, unknown>;
  /**
   * List of activated skill name
   */
  activatedSkills?: string[];
  /**
   * List of content added by agent context
   */
  extendedContent?: TextContent[];
  /**
   * Optional identifier of the sender. Can be used to track message origin in multi-agent scenarios.
   */
  sender?: Record<string, unknown>;
  /**
   * Optional critic evaluation of this message and preceding history.
   */
  criticResult?: Record<string, unknown>;
  kind: 'MessageEvent';
}

export interface MessageToolCall {
  /**
   * Canonical tool call id
   */
  id: string;
  /**
   * Tool/function name
   */
  name: string;
  /**
   * JSON string of arguments
   */
  arguments: string;
  /**
   * Originating API family
   */
  origin: 'completion' | 'responses';
}

export interface Metrics {
  /**
   * Name of the model
   */
  modelName?: string;
  /**
   * Total accumulated cost, must be non-negative
   */
  accumulatedCost?: number;
  /**
   * Maximum budget per task
   */
  maxBudgetPerTask?: Record<string, unknown>;
  /**
   * Accumulated token usage across all calls
   */
  accumulatedTokenUsage?: Record<string, unknown>;
  /**
   * List of individual costs
   */
  costs?: Cost[];
  /**
   * List of response latencies
   */
  responseLatencies?: ResponseLatency[];
  /**
   * List of token usage records
   */
  tokenUsages?: TokenUsage[];
}

export interface MetricsSnapshot {
  /**
   * Name of the model
   */
  modelName?: string;
  /**
   * Total accumulated cost, must be non-negative
   */
  accumulatedCost?: number;
  /**
   * Maximum budget per task
   */
  maxBudgetPerTask?: Record<string, unknown>;
  /**
   * Accumulated token usage across all calls
   */
  accumulatedTokenUsage?: Record<string, unknown>;
}

export interface NeverConfirm-Input {
  kind?: 'NeverConfirm';
}

export interface NeverConfirm-Output {
  kind: 'NeverConfirm';
}

export interface NoOpCondenser-Input {
  kind?: 'NoOpCondenser';
}

export interface NoOpCondenser-Output {
  kind: 'NoOpCondenser';
}

export type Observation = MCPToolObservation | FinishObservation | ThinkObservation | BrowserObservation | FileEditorObservation | EditObservation | ListDirectoryObservation | ReadFileObservation | WriteFileObservation | GlobObservation | GrepObservation | PlanningFileEditorObservation | TaskTrackerObservation | TerminalObservation;

export interface ObservationEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /**
   * The tool name that this observation is responding to
   */
  toolName: string;
  /**
   * The tool call id that this observation is responding to
   */
  toolCallId: string;
  /**
   * The observation (tool call) sent to LLM
   */
  observation: Observation;
  /**
   * The action id that this observation is responding to
   */
  actionId: string;
  kind: 'ObservationEvent';
}

export interface OrgConfig {
  /**
   * Selected repository (e.g., 'owner/repo')
   */
  repository: string;
  /**
   * Git provider type: github, gitlab, azure, bitbucket
   */
  provider: string;
  /**
   * Pre-authenticated Git URL for the organization repository. Contains sensitive credentials - handle with care and avoid logging.
   */
  orgRepoUrl: string;
  /**
   * Organization name
   */
  orgName: string;
}

export interface PassCritic-Input {
  /**
   * When to run critic evaluation:
   * - 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
   * - 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action)
   */
  mode?: 'finish_and_message' | 'all_actions';
  /**
   * Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations.
   */
  iterativeRefinement?: Record<string, unknown>;
  kind?: 'PassCritic';
}

export interface PassCritic-Output {
  /**
   * When to run critic evaluation:
   * - 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
   * - 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action)
   */
  mode?: 'finish_and_message' | 'all_actions';
  /**
   * Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations.
   */
  iterativeRefinement?: Record<string, unknown>;
  kind: 'PassCritic';
}

export interface PauseEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  kind: 'PauseEvent';
}

export interface PipelineCondenser-Input {
  condensers: CondenserBase-Input[];
  kind?: 'PipelineCondenser';
}

export interface PipelineCondenser-Output {
  condensers: CondenserBase-Output[];
  kind: 'PipelineCondenser';
}

export interface PlanningFileEditorAction {
  /**
   * The commands to run. Allowed options are: `view`, `create`, `str_replace`, `insert`, `undo_edit`.
   */
  command: 'view' | 'create' | 'str_replace' | 'insert' | 'undo_edit';
  /**
   * Absolute path to file or directory.
   */
  path: string;
  /**
   * Required parameter of `create` command, with the content of the file to be created.
   */
  fileText?: Record<string, unknown>;
  /**
   * Required parameter of `str_replace` command containing the string in `path` to replace.
   */
  oldStr?: Record<string, unknown>;
  /**
   * Optional parameter of `str_replace` command containing the new string (if not given, no string will be added). Required parameter of `insert` command containing the string to insert.
   */
  newStr?: Record<string, unknown>;
  /**
   * Required parameter of `insert` command. The `new_str` will be inserted AFTER the line `insert_line` of `path`.
   */
  insertLine?: Record<string, unknown>;
  /**
   * Optional parameter of `view` command when `path` points to a file. If none is given, the full file is shown. If provided, the file will be shown in the indicated line number range, e.g. [11, 12] will show lines 11 and 12. Indexing at 1 to start. Setting `[start_line, -1]` shows all lines from `start_line` to the end of the file.
   */
  viewRange?: Record<string, unknown>;
  kind: 'PlanningFileEditorAction';
}

export interface PlanningFileEditorObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * The command that was run: `view`, `create`, `str_replace`, `insert`, or `undo_edit`.
   */
  command: 'view' | 'create' | 'str_replace' | 'insert' | 'undo_edit';
  /**
   * The file path that was edited.
   */
  path?: Record<string, unknown>;
  /**
   * Indicates if the file previously existed. If not, it was created.
   */
  prevExist?: boolean;
  /**
   * The content of the file before the edit.
   */
  oldContent?: Record<string, unknown>;
  /**
   * The content of the file after the edit.
   */
  newContent?: Record<string, unknown>;
  kind: 'PlanningFileEditorObservation';
}

export interface PlanningFileEditorTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'PlanningFileEditorTool';
  title: string;
}

export interface PluginSource {
  /**
   * Plugin source: 'github:owner/repo', any git URL, or local path
   */
  source: string;
  /**
   * Optional branch, tag, or commit (only for git sources)
   */
  ref?: Record<string, unknown>;
  /**
   * Subdirectory path within the git repository (e.g., 'plugins/my-plugin' for monorepos). Only relevant for git sources, not local paths.
   */
  repoPath?: Record<string, unknown>;
}

export interface ReadFileAction {
  /**
   * The path to the file to read.
   */
  filePath: string;
  /**
   * Optional: The 0-based line number to start reading from. Use for paginating through large files.
   */
  offset?: Record<string, unknown>;
  /**
   * Optional: Maximum number of lines to read. Use with 'offset' to paginate through large files.
   */
  limit?: Record<string, unknown>;
  kind: 'ReadFileAction';
}

export interface ReadFileObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * The file path that was read.
   */
  filePath: string;
  /**
   * The content read from the file.
   */
  fileContent?: string;
  /**
   * Whether the content was truncated due to size limits.
   */
  isTruncated?: boolean;
  /**
   * If truncated, the range of lines shown (start, end) - 1-indexed.
   */
  linesShown?: Record<string, unknown>;
  /**
   * Total number of lines in the file.
   */
  totalLines?: Record<string, unknown>;
  kind: 'ReadFileObservation';
}

export interface ReadFileTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'ReadFileTool';
  title: string;
}

export interface ReasoningItemModel {
  id?: Record<string, unknown>;
  summary?: string[];
  content?: Record<string, unknown>;
  encryptedContent?: Record<string, unknown>;
  status?: Record<string, unknown>;
}

export interface RedactedThinkingBlock {
  type?: 'redacted_thinking';
  /**
   * The redacted thinking content
   */
  data: string;
}

export interface RemoteWorkspace-Input {
  /**
   * The working directory for agent operations and tool execution.
   */
  workingDir: string;
  /**
   * The remote host URL for the workspace.
   */
  host: string;
  /**
   * API key for authenticating with the remote host.
   */
  apiKey?: Record<string, unknown>;
  /**
   * Timeout in seconds for reading operations of httpx.Client.
   */
  readTimeout?: number;
  /**
   * Maximum number of connections for httpx.Client. None means no limit, useful for running many conversations in parallel.
   */
  maxConnections?: Record<string, unknown>;
  kind?: 'RemoteWorkspace';
}

export interface RemoteWorkspace-Output {
  /**
   * The working directory for agent operations and tool execution.
   */
  workingDir: string;
  /**
   * The remote host URL for the workspace.
   */
  host: string;
  /**
   * API key for authenticating with the remote host.
   */
  apiKey?: Record<string, unknown>;
  /**
   * Timeout in seconds for reading operations of httpx.Client.
   */
  readTimeout?: number;
  /**
   * Maximum number of connections for httpx.Client. None means no limit, useful for running many conversations in parallel.
   */
  maxConnections?: Record<string, unknown>;
  kind: 'RemoteWorkspace';
}

export interface ResponseLatency {
  model: string;
  /**
   * Latency must be non-negative
   */
  latency: number;
  responseId: string;
}

export interface SandboxConfig {
  /**
   * List of exposed URLs from the sandbox
   */
  exposedUrls?: ExposedUrl[];
}

export interface SecretRegistry-Input {
  secretSources?: Record<string, SecretSource-Input>;
}

export interface SecretRegistry-Output {
  secretSources?: Record<string, SecretSource-Output>;
}

export type SecretSource-Input = LookupSecret-Input | StaticSecret-Input;

export type SecretSource-Output = LookupSecret-Output | StaticSecret-Output;

export type SecurityAnalyzerBase-Input = GraySwanAnalyzer-Input | LLMSecurityAnalyzer-Input;

export type SecurityAnalyzerBase-Output = GraySwanAnalyzer-Output | LLMSecurityAnalyzer-Output;

export type SecurityRisk = 'UNKNOWN' | 'LOW' | 'MEDIUM' | 'HIGH';

export interface SendMessageRequest {
  role?: 'user' | 'system' | 'assistant' | 'tool';
  content?: Record<string, unknown>[];
  /**
   * Whether the agent loop should automatically run if not running
   */
  run?: boolean;
}

export interface ServerInfo {
  uptime: number;
  idleTime: number;
  title?: string;
  version?: string;
  docs?: string;
  redoc?: string;
}

export interface SetConfirmationPolicyRequest {
  /**
   * The confirmation policy to set
   */
  policy: ConfirmationPolicyBase-Input;
}

export interface SetSecurityAnalyzerRequest {
  /**
   * The security analyzer to set
   */
  securityAnalyzer: Record<string, unknown>;
}

export interface Skill {
  name: string;
  content: string;
  /**
   * Trigger determines when skill content is auto-injected. None = no auto-injection (for AgentSkills: agent reads on demand; for legacy: full content always in system prompt). KeywordTrigger = auto-inject when keywords appear in user messages. TaskTrigger = auto-inject for specific tasks, may require user input.
   */
  trigger?: Record<string, unknown>;
  /**
   * The source path or identifier of the skill. When it is None, it is treated as a programmatically defined skill.
   */
  source?: Record<string, unknown>;
  /**
   * MCP tools configuration for the skill (repo skills only). It should conform to the MCPConfig schema: https://gofastmcp.com/clients/client#configuration-format
   */
  mcpTools?: Record<string, unknown>;
  /**
   * Input metadata for the skill (task skills only)
   */
  inputs?: InputMetadata[];
  /**
   * Whether this skill was loaded from a SKILL.md file following the AgentSkills standard. AgentSkills-format skills use progressive disclosure: always listed in <available_skills> with name, description, and location. If the skill also has triggers, content is auto-injected when triggered AND agent can read file anytime.
   */
  isAgentskillsFormat?: boolean;
  /**
   * A brief description of what the skill does and when to use it. AgentSkills standard field (max 1024 characters).
   */
  description?: Record<string, unknown>;
  /**
   * The license under which the skill is distributed. AgentSkills standard field (e.g., 'Apache-2.0', 'MIT').
   */
  license?: Record<string, unknown>;
  /**
   * Environment requirements or compatibility notes for the skill. AgentSkills standard field (e.g., 'Requires git and docker').
   */
  compatibility?: Record<string, unknown>;
  /**
   * Arbitrary key-value metadata for the skill. AgentSkills standard field for extensibility.
   */
  metadata?: Record<string, unknown>;
  /**
   * List of pre-approved tools for this skill. AgentSkills standard field (parsed from space-delimited string).
   */
  allowedTools?: Record<string, unknown>;
  /**
   * Resource directories for the skill (scripts/, references/, assets/). AgentSkills standard field. Only populated for SKILL.md directory format.
   */
  resources?: Record<string, unknown>;
}

export interface SkillInfo {
  name: string;
  type: 'repo' | 'knowledge' | 'agentskills';
  content: string;
  triggers?: string[];
  source?: Record<string, unknown>;
  description?: Record<string, unknown>;
  isAgentskillsFormat?: boolean;
}

export interface SkillResources {
  /**
   * Root directory of the skill (absolute path)
   */
  skillRoot: string;
  /**
   * List of script files in scripts/ directory (relative paths)
   */
  scripts?: string[];
  /**
   * List of reference files in references/ directory (relative paths)
   */
  references?: string[];
  /**
   * List of asset files in assets/ directory (relative paths)
   */
  assets?: string[];
}

export interface SkillsRequest {
  /**
   * Load public skills from OpenHands/skills repo
   */
  loadPublic?: boolean;
  /**
   * Load user skills from ~/.openhands/skills/
   */
  loadUser?: boolean;
  /**
   * Load project skills from workspace
   */
  loadProject?: boolean;
  /**
   * Load organization-level skills
   */
  loadOrg?: boolean;
  /**
   * Workspace directory path for project skills
   */
  projectDir?: Record<string, unknown>;
  /**
   * Organization skills configuration
   */
  orgConfig?: Record<string, unknown>;
  /**
   * Sandbox skills configuration
   */
  sandboxConfig?: Record<string, unknown>;
}

export interface SkillsResponse {
  skills: SkillInfo[];
  /**
   * Count of skills loaded from each source
   */
  sources?: Record<string, number>;
}

export interface StartConversationRequest {
  agent: AgentBase-Input;
  /**
   * Working directory for agent operations and tool execution
   */
  workspace: LocalWorkspace-Input;
  /**
   * Optional conversation ID. If not provided, a random UUID will be generated.
   */
  conversationId?: Record<string, unknown>;
  /**
   * Controls when the conversation will prompt the user before continuing. Defaults to never.
   */
  confirmationPolicy?: ConfirmationPolicyBase-Input;
  /**
   * Initial message to pass to the LLM
   */
  initialMessage?: Record<string, unknown>;
  /**
   * If set, the max number of iterations the agent will run before stopping. This is useful to prevent infinite loops.
   */
  maxIterations?: number;
  /**
   * If true, the conversation will use stuck detection to prevent infinite loops.
   */
  stuckDetection?: boolean;
  /**
   * Secrets available in the conversation
   */
  secrets?: Record<string, SecretSource-Input>;
  /**
   * Mapping of tool names to their module qualnames from the client's registry. These modules will be dynamically imported on the server to register the tools for this conversation.
   */
  toolModuleQualnames?: Record<string, string>;
  /**
   * List of plugins to load for this conversation. Plugins are loaded and their skills/MCP config are merged into the agent. Hooks are extracted and stored for runtime execution.
   */
  plugins?: Record<string, unknown>;
  /**
   * Optional hook configuration for this conversation. Hooks are shell scripts that run at key lifecycle events (PreToolUse, PostToolUse, UserPromptSubmit, Stop, etc.). If both hook_config and plugins are provided, they are merged with explicit hooks running before plugin hooks.
   */
  hookConfig?: Record<string, unknown>;
}

export interface StaticSecret-Input {
  /**
   * Optional description for this secret
   */
  description?: Record<string, unknown>;
  value?: Record<string, unknown>;
  kind?: 'StaticSecret';
}

export interface StaticSecret-Output {
  /**
   * Optional description for this secret
   */
  description?: Record<string, unknown>;
  value?: Record<string, unknown>;
  kind: 'StaticSecret';
}

export interface Success {
  success?: boolean;
}

export interface SyncResponse {
  status: 'success' | 'error';
  message: string;
}

export interface SystemPromptEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /**
   * The system prompt text
   */
  systemPrompt: TextContent;
  /**
   * List of tools as ToolDefinition objects
   */
  tools: ToolDefinition[];
  /**
   * Optional dynamic per-conversation context (runtime info, repo context, secrets). When provided, this is included as a second content block in the system message (not cached).
   */
  dynamicContext?: Record<string, unknown>;
  kind: 'SystemPromptEvent';
}

export interface TaskItem {
  /**
   * A brief title for the task.
   */
  title: string;
  /**
   * Additional details or notes about the task.
   */
  notes?: string;
  /**
   * The current status of the task. One of 'todo', 'in_progress', or 'done'.
   */
  status?: 'todo' | 'in_progress' | 'done';
}

export interface TaskTrackerAction {
  /**
   * The command to execute. `view` shows the current task list. `plan` creates or updates the task list based on provided requirements and progress. Always `view` the current list before making changes.
   */
  command?: 'view' | 'plan';
  /**
   * The full task list. Required parameter of `plan` command.
   */
  taskList?: TaskItem[];
  kind: 'TaskTrackerAction';
}

export interface TaskTrackerObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * The command that was executed: "view" or "plan".
   */
  command: 'view' | 'plan';
  /**
   * The current task list
   */
  taskList?: TaskItem[];
  kind: 'TaskTrackerObservation';
}

export interface TaskTrackerTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'TaskTrackerTool';
  title: string;
}

export interface TaskTrigger {
  type?: 'task';
  triggers: string[];
}

export interface TerminalAction {
  /**
   * The bash command to execute. Can be empty string to view additional logs when previous exit code is `-1`. Can be `C-c` (Ctrl+C) to interrupt the currently running process. Note: You can only execute one bash command at a time. If you need to run multiple commands sequentially, you can use `&&` or `;` to chain them together.
   */
  command: string;
  /**
   * If True, the command is an input to the running process. If False, the command is a bash command to be executed in the terminal. Default is False.
   */
  isInput?: boolean;
  /**
   * Optional. Sets a maximum time limit (in seconds) for running the command. If the command takes longer than this limit, you’ll be asked whether to continue or stop it. If you don’t set a value, the command will instead pause and ask for confirmation when it produces no new output for 30 seconds. Use a higher value if the command is expected to take a long time (like installation or testing), or if it has a known fixed duration (like sleep).
   */
  timeout?: Record<string, unknown>;
  /**
   * If True, reset the terminal by creating a new session. Use this only when the terminal becomes unresponsive. Note that all previously set environment variables and session state will be lost after reset. Cannot be used with is_input=True.
   */
  reset?: boolean;
  kind: 'TerminalAction';
}

export interface TerminalObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * The bash command that was executed. Can be empty string if the observation is from a previous command that hit soft timeout and is not yet finished.
   */
  command: Record<string, unknown>;
  /**
   * The exit code of the command. -1 indicates the process hit the soft timeout and is not yet finished.
   */
  exitCode?: Record<string, unknown>;
  /**
   * Whether the command execution timed out.
   */
  timeout?: boolean;
  /**
   * Additional metadata captured from PS1 after command execution.
   */
  metadata?: CmdOutputMetadata;
  /**
   * Directory where full output files are saved
   */
  fullOutputSaveDir?: Record<string, unknown>;
  kind: 'TerminalObservation';
}

export interface TerminalTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'TerminalTool';
  title: string;
}

export interface TextContent {
  cachePrompt?: boolean;
  type?: 'text';
  text: string;
}

export interface ThinkAction {
  /**
   * The thought to log.
   */
  thought: string;
  kind: 'ThinkAction';
}

export interface ThinkObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  kind: 'ThinkObservation';
}

export interface ThinkTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'ThinkTool';
  title: string;
}

export interface ThinkingBlock {
  type?: 'thinking';
  /**
   * The thinking content
   */
  thinking: string;
  /**
   * Cryptographic signature for the thinking block
   */
  signature?: Record<string, unknown>;
}

export interface TokenEvent {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source: 'agent' | 'user' | 'environment';
  /**
   * The exact prompt token IDs for this message event
   */
  promptTokenIds: number[];
  /**
   * The exact response token IDs for this message event
   */
  responseTokenIds: number[];
  kind: 'TokenEvent';
}

export interface TokenUsage {
  model?: string;
  /**
   * Prompt tokens must be non-negative
   */
  promptTokens?: number;
  /**
   * Completion tokens must be non-negative
   */
  completionTokens?: number;
  /**
   * Cache read tokens must be non-negative
   */
  cacheReadTokens?: number;
  /**
   * Cache write tokens must be non-negative
   */
  cacheWriteTokens?: number;
  /**
   * Reasoning tokens must be non-negative
   */
  reasoningTokens?: number;
  /**
   * Context window must be non-negative
   */
  contextWindow?: number;
  /**
   * Per turn tokens must be non-negative
   */
  perTurnToken?: number;
  responseId?: string;
}

export interface Tool-Input {
  /**
   * Name of the tool class, e.g., 'TerminalTool'. Import it from an `openhands.tools.<module>` subpackage.
   */
  name: string;
  /**
   * Parameters for the tool's .create() method, e.g., {'working_dir': '/app'}
   */
  params?: Record<string, any>;
}

export type ToolDefinition = MCPToolDefinition | FinishTool | ThinkTool | BrowserClickTool | BrowserCloseTabTool | BrowserGetContentTool | BrowserGetStateTool | BrowserGetStorageTool | BrowserGoBackTool | BrowserListTabsTool | BrowserNavigateTool | BrowserScrollTool | BrowserSetStorageTool | BrowserStartRecordingTool | BrowserStopRecordingTool | BrowserSwitchTabTool | BrowserToolSet | BrowserTypeTool | FileEditorTool | EditTool | ListDirectoryTool | ReadFileTool | WriteFileTool | GlobTool | GrepTool | PlanningFileEditorTool | TaskTrackerTool | TerminalTool;

export interface UpdateConversationRequest {
  /**
   * New conversation title
   */
  title: string;
}

export interface UpdateSecretsRequest {
  /**
   * Dictionary mapping secret keys to values
   */
  secrets: Record<string, SecretSource-Input>;
}

export interface UserRejectObservation {
  /**
   * Unique event id (ULID/UUID)
   */
  id?: string;
  /**
   * Event timestamp
   */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /**
   * The tool name that this observation is responding to
   */
  toolName: string;
  /**
   * The tool call id that this observation is responding to
   */
  toolCallId: string;
  /**
   * Reason for rejecting the action
   */
  rejectionReason?: string;
  /**
   * Source of the rejection: 'user' for confirmation mode rejections, 'hook' for PreToolUse hook blocks
   */
  rejectionSource?: 'user' | 'hook';
  /**
   * The action id that this observation is responding to
   */
  actionId: string;
  kind: 'UserRejectObservation';
}

export interface VSCodeUrlResponse {
  url: Record<string, unknown>;
}

export interface ValidationError {
  loc: Record<string, unknown>[];
  msg: string;
  type: string;
}

export interface WriteFileAction {
  /**
   * The path to the file to write to.
   */
  filePath: string;
  /**
   * The content to write to the file.
   */
  content: string;
  kind: 'WriteFileAction';
}

export interface WriteFileObservation {
  /**
   * Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field.
   */
  content?: Record<string, unknown>[];
  /**
   * Whether the observation indicates an error
   */
  isError?: boolean;
  /**
   * The file path that was written.
   */
  filePath?: Record<string, unknown>;
  /**
   * Whether a new file was created.
   */
  isNewFile?: boolean;
  /**
   * The previous content of the file (if it existed).
   */
  oldContent?: Record<string, unknown>;
  /**
   * The new content written to the file.
   */
  newContent?: Record<string, unknown>;
  kind: 'WriteFileObservation';
}

export interface WriteFileTool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: 'WriteFileTool';
  title: string;
}

export interface mcp__types__Tool {
  name: string;
  title?: Record<string, unknown>;
  description?: Record<string, unknown>;
  inputSchema: Record<string, any>;
  outputSchema?: Record<string, unknown>;
  icons?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  Meta?: Record<string, unknown>;
}

export interface mcp__types__ToolAnnotations {
  title?: Record<string, unknown>;
  readOnlyHint?: Record<string, unknown>;
  destructiveHint?: Record<string, unknown>;
  idempotentHint?: Record<string, unknown>;
  openWorldHint?: Record<string, unknown>;
}

export interface openhands__sdk__tool__spec__Tool {
  /**
   * Name of the tool class, e.g., 'TerminalTool'. Import it from an `openhands.tools.<module>` subpackage.
   */
  name: string;
  /**
   * Parameters for the tool's .create() method, e.g., {'working_dir': '/app'}
   */
  params?: Record<string, any>;
}

export interface openhands__sdk__tool__tool__ToolAnnotations {
  /**
   * A human-readable title for the tool.
   */
  title?: Record<string, unknown>;
  /**
   * If true, the tool does not modify its environment. Default: false
   */
  readOnlyHint?: boolean;
  /**
   * If true, the tool may perform destructive updates to its environment. If false, the tool performs only additive updates. (This property is meaningful only when `readOnlyHint == false`) Default: true
   */
  destructiveHint?: boolean;
  /**
   * If true, calling the tool repeatedly with the same arguments will have no additional effect on the its environment. (This property is meaningful only when `readOnlyHint == false`) Default: false
   */
  idempotentHint?: boolean;
  /**
   * If true, this tool may interact with an 'open world' of external entities. If false, the tool's domain of interaction is closed. For example, the world of a web search tool is open, whereas that of a memory tool is not. Default: true
   */
  openWorldHint?: boolean;
}
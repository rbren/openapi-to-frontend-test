/**

 * TypeScript types generated from OpenAPI specification

 * DO NOT EDIT MANUALLY

 */



export interface ApibasedcriticInput {
  /** Base URL of the vLLM classification service */
  serverUrl?: string;
  /** API key for authenticating with the vLLM service */
  apiKey: Record<string, unknown>;
  /** Name of the model to use */
  modelName?: string;
  /** HuggingFace tokenizer name for loading chat template */
  tokenizerName?: string;
  /** Whether to pass tool definitions to the model */
  passToolsDefinitions?: boolean;
  /** Timeout for requests to the model */
  timeoutSeconds?: number;
  /** Whether the model predicts success label at index 0 */
  hasSuccessLabel?: boolean;
  sentimentLabels?: string[];
  agentIssueLabels?: string[];
  infraLabels?: string[];
  userFollowupLabels?: string[];
  sentimentMap?: Record<string, string>;
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: 'finish_and_message' | 'all_actions';
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterativeRefinement?: Record<string, unknown>;
  kind?: string;
}

export interface ApibasedcriticOutput {
  /** Base URL of the vLLM classification service */
  serverUrl?: string;
  /** API key for authenticating with the vLLM service */
  apiKey: Record<string, unknown>;
  /** Name of the model to use */
  modelName?: string;
  /** HuggingFace tokenizer name for loading chat template */
  tokenizerName?: string;
  /** Whether to pass tool definitions to the model */
  passToolsDefinitions?: boolean;
  /** Timeout for requests to the model */
  timeoutSeconds?: number;
  /** Whether the model predicts success label at index 0 */
  hasSuccessLabel?: boolean;
  sentimentLabels?: string[];
  agentIssueLabels?: string[];
  infraLabels?: string[];
  userFollowupLabels?: string[];
  sentimentMap?: Record<string, string>;
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: 'finish_and_message' | 'all_actions';
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterativeRefinement?: Record<string, unknown>;
  kind: string;
}

export interface Action {
}

export interface Actionevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /** The thought process of the agent before taking this action */
  thought: Textcontent[];
  /** Intermediate reasoning/thinking content from reasoning models */
  reasoningContent?: Record<string, unknown>;
  /** Anthropic thinking blocks from the LLM response */
  thinkingBlocks?: Record<string, unknown>[];
  /** OpenAI Responses reasoning item from model output */
  responsesReasoningItem?: Record<string, unknown>;
  /** Single tool call returned by LLM (None when non-executable) */
  action?: Record<string, unknown>;
  /** The name of the tool being called */
  toolName: string;
  /** The unique id returned by LLM API for this tool call */
  toolCallId: string;
  /** The tool call received from the LLM response. We keep a copy of it so it is easier to construct it into LLM messageThis could be different from `action`: e.g., `tool_call` may contain `security_risk` field predicted by LLM when LLM risk analyzer is enabled, while `action` does not. */
  toolCall: Messagetoolcall;
  /** Completion or Response ID of the LLM response that generated this eventE.g., Can be used to group related actions from same LLM response. This helps in tracking and managing results of parallel function calling from the same LLM response. */
  llmResponseId: string;
  /** The LLM's assessment of the safety risk of this action. */
  securityRisk?: Securityrisk;
  /** Optional critic evaluation of this action and preceding history. */
  criticResult?: Record<string, unknown>;
  /** A concise summary (approximately 10 words) of what this action does, provided by the LLM for explainability and debugging. Examples of good summaries: 'editing configuration file for deployment settings' | 'searching codebase for authentication function definitions' | 'installing required dependencies from package manifest' | 'running tests to verify bug fix' | 'viewing directory structure to locate source files' */
  summary?: Record<string, unknown>;
  kind: string;
}

/**
 * Main agent implementation for OpenHands.
 * 
 * The Agent class provides the core functionality for running AI agents that can
 * interact with tools, process messages, and execute actions. It inherits from
 * AgentBase and implements the agent execution logic. Critic-related functionality
 * is provided by CriticMixin.
 * 
 * Example:
 *     >>> from openhands.sdk import LLM, Agent, Tool
 *     >>> llm = LLM(model="claude-sonnet-4-20250514", api_key=SecretStr("key"))
 *     >>> tools = [Tool(name="TerminalTool"), Tool(name="FileEditorTool")]
 *     >>> agent = Agent(llm=llm, tools=tools)
 */
export interface AgentInput {
  /** LLM configuration for the agent. */
  llm: Llm;
  /** List of tools to initialize for the agent. */
  tools?: ToolInput[];
  /** Optional MCP configuration dictionary to create MCP tools. */
  mcpConfig?: Record<string, unknown>;
  /** Optional regex to filter the tools available to the agent by name. This is applied after any tools provided in `tools` and any MCP tools are added. */
  filterToolsRegex?: Record<string, unknown>;
  /** List of default tool class names to include. By default, the agent includes 'FinishTool' and 'ThinkTool'. Set to an empty list to disable all default tools, or provide a subset to include only specific ones. Example: include_default_tools=['FinishTool'] to only include FinishTool, or include_default_tools=[] to disable all default tools. */
  includeDefaultTools?: string[];
  /** Optional AgentContext to initialize the agent with specific context. */
  agentContext?: Record<string, unknown>;
  /** System prompt template filename. Can be either:
- A relative filename (e.g., 'system_prompt.j2') loaded from the agent's prompts directory
- An absolute path (e.g., '/path/to/custom_prompt.j2') */
  systemPromptFilename?: string;
  /** Security policy template filename. Can be either:
- A relative filename (e.g., 'security_policy.j2') loaded from the agent's prompts directory
- An absolute path (e.g., '/path/to/custom_security_policy.j2') */
  securityPolicyFilename?: string;
  /** Optional kwargs to pass to the system prompt Jinja2 template. */
  systemPromptKwargs?: Record<string, unknown>;
  /** Optional condenser to use for condensing conversation history. */
  condenser?: Record<string, unknown>;
  /** EXPERIMENTAL: Optional critic to evaluate agent actions and messages in real-time. API and behavior may change without notice. May impact performance, especially in 'all_actions' mode. */
  critic?: Record<string, unknown>;
  kind?: string;
}

/**
 * Main agent implementation for OpenHands.
 * 
 * The Agent class provides the core functionality for running AI agents that can
 * interact with tools, process messages, and execute actions. It inherits from
 * AgentBase and implements the agent execution logic. Critic-related functionality
 * is provided by CriticMixin.
 * 
 * Example:
 *     >>> from openhands.sdk import LLM, Agent, Tool
 *     >>> llm = LLM(model="claude-sonnet-4-20250514", api_key=SecretStr("key"))
 *     >>> tools = [Tool(name="TerminalTool"), Tool(name="FileEditorTool")]
 *     >>> agent = Agent(llm=llm, tools=tools)
 */
export interface AgentOutput {
  /** LLM configuration for the agent. */
  llm: Llm;
  /** List of tools to initialize for the agent. */
  tools?: OpenhandsSdkToolSpecTool[];
  /** Optional MCP configuration dictionary to create MCP tools. */
  mcpConfig?: Record<string, unknown>;
  /** Optional regex to filter the tools available to the agent by name. This is applied after any tools provided in `tools` and any MCP tools are added. */
  filterToolsRegex?: Record<string, unknown>;
  /** List of default tool class names to include. By default, the agent includes 'FinishTool' and 'ThinkTool'. Set to an empty list to disable all default tools, or provide a subset to include only specific ones. Example: include_default_tools=['FinishTool'] to only include FinishTool, or include_default_tools=[] to disable all default tools. */
  includeDefaultTools?: string[];
  /** Optional AgentContext to initialize the agent with specific context. */
  agentContext?: Record<string, unknown>;
  /** System prompt template filename. Can be either:
- A relative filename (e.g., 'system_prompt.j2') loaded from the agent's prompts directory
- An absolute path (e.g., '/path/to/custom_prompt.j2') */
  systemPromptFilename?: string;
  /** Security policy template filename. Can be either:
- A relative filename (e.g., 'security_policy.j2') loaded from the agent's prompts directory
- An absolute path (e.g., '/path/to/custom_security_policy.j2') */
  securityPolicyFilename?: string;
  /** Optional kwargs to pass to the system prompt Jinja2 template. */
  systemPromptKwargs?: Record<string, unknown>;
  /** Optional condenser to use for condensing conversation history. */
  condenser?: Record<string, unknown>;
  /** EXPERIMENTAL: Optional critic to evaluate agent actions and messages in real-time. API and behavior may change without notice. May impact performance, especially in 'all_actions' mode. */
  critic?: Record<string, unknown>;
  kind: string;
}

export interface AgentbaseInput {
}

export interface AgentbaseOutput {
}

/**
 * Central structure for managing prompt extension.
 * 
 * AgentContext unifies all the contextual inputs that shape how the system
 * extends and interprets user prompts. It combines both static environment
 * details and dynamic, user-activated extensions from skills.
 * 
 * Specifically, it provides:
 * - **Repository context / Repo Skills**: Information about the active codebase,
 *   branches, and repo-specific instructions contributed by repo skills.
 * - **Runtime context**: Current execution environment (hosts, working
 *   directory, secrets, date, etc.).
 * - **Conversation instructions**: Optional task- or channel-specific rules
 *   that constrain or guide the agent’s behavior across the session.
 * - **Knowledge Skills**: Extensible components that can be triggered by user input
 *   to inject knowledge or domain-specific guidance.
 * 
 * Together, these elements make AgentContext the primary container responsible
 * for assembling, formatting, and injecting all prompt-relevant context into
 * LLM interactions.
 */
export interface AgentcontextInput {
  /** List of available skills that can extend the user's input. */
  skills?: Skill[];
  /** Optional suffix to append to the system prompt. */
  systemMessageSuffix?: Record<string, unknown>;
  /** Optional suffix to append to the user's message. */
  userMessageSuffix?: Record<string, unknown>;
  /** Whether to automatically load user skills from ~/.openhands/skills/ and ~/.openhands/microagents/ (for backward compatibility).  */
  loadUserSkills?: boolean;
  /** Whether to automatically load skills from the public OpenHands skills repository at https://github.com/OpenHands/skills. This allows you to get the latest skills without SDK updates. */
  loadPublicSkills?: boolean;
  /** Dictionary mapping secret keys to values or secret sources. Secrets are used for authentication and sensitive data handling. Values can be either strings or SecretSource instances (str | SecretSource). */
  secrets?: Record<string, unknown>;
  /** Current date and time information to provide to the agent. Can be a datetime object (which will be formatted as ISO 8601) or a pre-formatted string. When provided, this information is included in the system prompt to give the agent awareness of the current time context. Defaults to the current datetime. */
  currentDatetime?: Record<string, unknown>;
}

/**
 * Central structure for managing prompt extension.
 * 
 * AgentContext unifies all the contextual inputs that shape how the system
 * extends and interprets user prompts. It combines both static environment
 * details and dynamic, user-activated extensions from skills.
 * 
 * Specifically, it provides:
 * - **Repository context / Repo Skills**: Information about the active codebase,
 *   branches, and repo-specific instructions contributed by repo skills.
 * - **Runtime context**: Current execution environment (hosts, working
 *   directory, secrets, date, etc.).
 * - **Conversation instructions**: Optional task- or channel-specific rules
 *   that constrain or guide the agent’s behavior across the session.
 * - **Knowledge Skills**: Extensible components that can be triggered by user input
 *   to inject knowledge or domain-specific guidance.
 * 
 * Together, these elements make AgentContext the primary container responsible
 * for assembling, formatting, and injecting all prompt-relevant context into
 * LLM interactions.
 */
export interface AgentcontextOutput {
  /** List of available skills that can extend the user's input. */
  skills?: Skill[];
  /** Optional suffix to append to the system prompt. */
  systemMessageSuffix?: Record<string, unknown>;
  /** Optional suffix to append to the user's message. */
  userMessageSuffix?: Record<string, unknown>;
  /** Whether to automatically load user skills from ~/.openhands/skills/ and ~/.openhands/microagents/ (for backward compatibility).  */
  loadUserSkills?: boolean;
  /** Whether to automatically load skills from the public OpenHands skills repository at https://github.com/OpenHands/skills. This allows you to get the latest skills without SDK updates. */
  loadPublicSkills?: boolean;
  /** Dictionary mapping secret keys to values or secret sources. Secrets are used for authentication and sensitive data handling. Values can be either strings or SecretSource instances (str | SecretSource). */
  secrets?: Record<string, unknown>;
  /** Current date and time information to provide to the agent. Can be a datetime object (which will be formatted as ISO 8601) or a pre-formatted string. When provided, this information is included in the system prompt to give the agent awareness of the current time context. Defaults to the current datetime. */
  currentDatetime?: Record<string, unknown>;
}

/**
 * Error triggered by the agent.
 * 
 * Note: This event should not contain model "thought" or "reasoning_content". It
 * represents an error produced by the agent/scaffold, not model output.
 */
export interface Agenterrorevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /** The tool name that this observation is responding to */
  toolName: string;
  /** The tool call id that this observation is responding to */
  toolCallId: string;
  /** The error message from the scaffold */
  error: string;
  kind: string;
}

/**
 * Critic that evaluates whether an agent properly finished a task.
 * 
 * This critic checks two main criteria:
 * 1. The agent's last action was a FinishAction (proper completion)
 * 2. The generated git patch is non-empty (actual changes were made)
 */
export interface AgentfinishedcriticInput {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: 'finish_and_message' | 'all_actions';
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterativeRefinement?: Record<string, unknown>;
  kind?: string;
}

/**
 * Critic that evaluates whether an agent properly finished a task.
 * 
 * This critic checks two main criteria:
 * 1. The agent's last action was a FinishAction (proper completion)
 * 2. The generated git patch is non-empty (actual changes were made)
 */
export interface AgentfinishedcriticOutput {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: 'finish_and_message' | 'all_actions';
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterativeRefinement?: Record<string, unknown>;
  kind: string;
}

export interface AlwaysconfirmInput {
  kind?: string;
}

export interface AlwaysconfirmOutput {
  kind: string;
}

/**
 * Payload to ask the agent a simple question.
 */
export interface Askagentrequest {
  /** The question to ask the agent */
  question: string;
}

/**
 * Response containing the agent's answer.
 */
export interface Askagentresponse {
  /** The agent's response to the question */
  response: string;
}

export interface BaseworkspaceInput {
}

export interface BaseworkspaceOutput {
}

export interface Bashcommand {
  /** The bash command to execute */
  command: string;
  /** The current working directory */
  cwd?: Record<string, unknown>;
  /** The max number of seconds a command may be permitted to run. */
  timeout?: number;
  id?: string;
  timestamp?: string;
  kind: string;
}

export interface Basheventbase {
}

export interface Basheventpage {
  items: Basheventbase[];
  nextPageId?: Record<string, unknown>;
}

export type Basheventsortorder = 'TIMESTAMP' | 'TIMESTAMP_DESC';

/**
 * Output of a bash command. A single command may have multiple pieces of output
 * depending on how large the output is.
 */
export interface Bashoutput {
  id?: string;
  timestamp?: string;
  commandId: string;
  /** The order for this output, sequentially starting with 0 */
  order?: number;
  /** Exit code None implies the command is still running. */
  exitCode?: Record<string, unknown>;
  /** The standard output from the command */
  stdout?: Record<string, unknown>;
  /** The error output from the command */
  stderr?: Record<string, unknown>;
  kind: string;
}

export interface BodyUploadFileApiFileUploadPathPost {
  file: string;
}

/**
 * Base class for all browser actions.
 * 
 * This base class serves as the parent for all browser-related actions,
 * enabling proper type hierarchy and eliminating the need for union types.
 */
export interface Browseraction {
  kind: string;
}

/**
 * Schema for clicking elements.
 */
export interface Browserclickaction {
  /** The index of the element to click (from browser_get_state) */
  index: number;
  /** Whether to open any resulting navigation in a new tab. Default: False */
  newTab?: boolean;
  kind: string;
}

/**
 * Tool for clicking browser elements.
 */
export interface Browserclicktool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for closing browser tabs.
 */
export interface Browserclosetabaction {
  /** 4 Character Tab ID of the tab to close (from browser_list_tabs) */
  tabId: string;
  kind: string;
}

/**
 * Tool for closing browser tabs.
 */
export interface Browserclosetabtool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for getting page content in markdown.
 */
export interface Browsergetcontentaction {
  /** Whether to include links in the content (default: False) */
  extractLinks?: boolean;
  /** Character index to start from in the page content (default: 0) */
  startFromChar?: number;
  kind: string;
}

/**
 * Tool for getting page content in markdown.
 */
export interface Browsergetcontenttool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for getting browser state.
 */
export interface Browsergetstateaction {
  /** Whether to include a screenshot of the current page. Default: False */
  includeScreenshot?: boolean;
  kind: string;
}

/**
 * Tool for getting browser state.
 */
export interface Browsergetstatetool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for getting browser storage (cookies, local storage, session storage).
 */
export interface Browsergetstorageaction {
  kind: string;
}

/**
 * Tool for getting browser storage.
 */
export interface Browsergetstoragetool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for going back in browser history.
 */
export interface Browsergobackaction {
  kind: string;
}

/**
 * Tool for going back in browser history.
 */
export interface Browsergobacktool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for listing browser tabs.
 */
export interface Browserlisttabsaction {
  kind: string;
}

/**
 * Tool for listing browser tabs.
 */
export interface Browserlisttabstool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for browser navigation.
 */
export interface Browsernavigateaction {
  /** The URL to navigate to */
  url: string;
  /** Whether to open in a new tab. Default: False */
  newTab?: boolean;
  kind: string;
}

/**
 * Tool for browser navigation.
 */
export interface Browsernavigatetool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Base observation for browser operations.
 */
export interface Browserobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** Base64 screenshot data if available */
  screenshotData?: Record<string, unknown>;
  /** Directory where full output files are saved */
  fullOutputSaveDir?: Record<string, unknown>;
  kind: string;
}

/**
 * Schema for scrolling the page.
 */
export interface Browserscrollaction {
  /** Direction to scroll. Options: 'up', 'down'. Default: 'down' */
  direction?: 'up' | 'down';
  kind: string;
}

/**
 * Tool for scrolling the browser page.
 */
export interface Browserscrolltool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for setting browser storage (cookies, local storage, session storage).
 */
export interface Browsersetstorageaction {
  /** Storage state dictionary containing 'cookies' and 'origins' (from browser_get_storage) */
  storageState: Record<string, unknown>;
  kind: string;
}

/**
 * Tool for setting browser storage.
 */
export interface Browsersetstoragetool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for starting browser session recording.
 */
export interface Browserstartrecordingaction {
  kind: string;
}

/**
 * Tool for starting browser session recording.
 */
export interface Browserstartrecordingtool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for stopping browser session recording.
 */
export interface Browserstoprecordingaction {
  kind: string;
}

/**
 * Tool for stopping browser session recording.
 */
export interface Browserstoprecordingtool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for switching browser tabs.
 */
export interface Browserswitchtabaction {
  /** 4 Character Tab ID of the tab to switch to (from browser_list_tabs) */
  tabId: string;
  kind: string;
}

/**
 * Tool for switching browser tabs.
 */
export interface Browserswitchtabtool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * A set of all browser tools.
 * 
 * This tool set includes all available browser-related tools
 *   for interacting with web pages.
 * 
 * The toolset automatically checks for Chromium availability
 * when created and automatically installs it if missing.
 */
export interface Browsertoolset {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Schema for typing text into elements.
 */
export interface Browsertypeaction {
  /** The index of the input element (from browser_get_state) */
  index: number;
  /** The text to type */
  text: string;
  kind: string;
}

/**
 * Tool for typing text into browser elements.
 */
export interface Browsertypetool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Additional metadata captured from PS1
 */
export interface Cmdoutputmetadata {
  /** The exit code of the last executed command. */
  exitCode?: number;
  /** The process ID of the last executed command. */
  pid?: number;
  /** The username of the current user. */
  username?: Record<string, unknown>;
  /** The hostname of the machine. */
  hostname?: Record<string, unknown>;
  /** The current working directory. */
  workingDir?: Record<string, unknown>;
  /** The path to the current Python interpreter, if any. */
  pyInterpreterPath?: Record<string, unknown>;
  /** Prefix to add to command output */
  prefix?: string;
  /** Suffix to add to command output */
  suffix?: string;
}

/**
 * This action indicates a condensation of the conversation history is happening.
 */
export interface Condensation {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /** The IDs of the events that are being forgotten (removed from the `View` given to the LLM). */
  forgottenEventIds?: string[];
  /** An optional summary of the events being forgotten. */
  summary?: Record<string, unknown>;
  /** An optional offset to the start of the resulting view (after forgotten events have been removed) indicating where the summary should be inserted. If not provided, the summary will not be inserted into the view. */
  summaryOffset?: Record<string, unknown>;
  /** Completion or Response ID of the LLM response that generated this event */
  llmResponseId: string;
  kind: string;
}

/**
 * This action is used to request a condensation of the conversation history.
 * 
 * Attributes:
 *     action (str): The action type, namely ActionType.CONDENSATION_REQUEST.
 */
export interface Condensationrequest {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  kind: string;
}

/**
 * This event represents a summary generated by a condenser.
 */
export interface Condensationsummaryevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  summary: string;
  kind: string;
}

export interface CondenserbaseInput {
}

export interface CondenserbaseOutput {
}

export interface ConfirmriskyInput {
  threshold?: Securityrisk;
  confirmUnknown?: boolean;
  kind?: string;
}

export interface ConfirmriskyOutput {
  threshold?: Securityrisk;
  confirmUnknown?: boolean;
  kind: string;
}

export interface ConfirmationpolicybaseInput {
}

export interface ConfirmationpolicybaseOutput {
}

/**
 * Payload to accept or reject a pending action.
 */
export interface Confirmationresponserequest {
  accept: boolean;
  reason?: string;
}

/**
 * Conversation-level failure that is NOT sent back to the LLM.
 * 
 * This event is emitted by the conversation runtime when an unexpected
 * exception bubbles up and prevents the run loop from continuing. It is
 * intended for client applications (e.g., UIs) to present a top-level error
 * state, and for orchestration to react. It is not an observation and it is
 * not LLM-convertible.
 * 
 * Differences from AgentErrorEvent:
 * - Not tied to any tool_name/tool_call_id (AgentErrorEvent is a tool
 *   observation).
 * - Typically source='environment' and the run loop moves to an ERROR state,
 *   while AgentErrorEvent has source='agent' and the conversation can
 *   continue.
 */
export interface Conversationerrorevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  /** The source of this event */
  source: 'agent' | 'user' | 'environment';
  /** Code for the error - typically a type */
  code: string;
  /** Details about the error */
  detail: string;
  kind: string;
}

export type Conversationexecutionstatus = 'idle' | 'running' | 'paused' | 'waiting_for_confirmation' | 'finished' | 'error' | 'stuck' | 'deleting';

/**
 * Information about a conversation running locally without a Runtime sandbox.
 */
export interface Conversationinfo {
  /** Unique conversation ID */
  id: string;
  /** The agent running in the conversation. This is persisted to allow resuming conversations and check agent configuration to handle e.g., tool changes, LLM changes, etc. */
  agent: AgentbaseOutput;
  /** Workspace used by the agent to execute commands and read/write files. Not the process working directory. */
  workspace: BaseworkspaceOutput;
  /** Directory for persisting conversation state and events. If None, conversation will not be persisted. */
  persistenceDir?: Record<string, unknown>;
  /** Maximum number of iterations the agent can perform in a single run. */
  maxIterations?: number;
  /** Whether to enable stuck detection for the agent. */
  stuckDetection?: boolean;
  executionStatus?: Conversationexecutionstatus;
  confirmationPolicy?: ConfirmationpolicybaseOutput;
  /** Optional security analyzer to evaluate action risks. */
  securityAnalyzer?: Record<string, unknown>;
  /** List of activated knowledge skills name */
  activatedKnowledgeSkills?: string[];
  /** Actions blocked by PreToolUse hooks, keyed by action ID */
  blockedActions?: Record<string, string>;
  /** Messages blocked by UserPromptSubmit hooks, keyed by message ID */
  blockedMessages?: Record<string, string>;
  /** Conversation statistics for tracking LLM metrics */
  stats?: ConversationstatsOutput;
  /** Registry for handling secrets and sensitive data */
  secretRegistry?: SecretregistryOutput;
  /** Dictionary for agent-specific runtime state that persists across iterations. Agents can store feature-specific state using string keys. To trigger autosave, always reassign: state.agent_state = {**state.agent_state, key: value}. See https://docs.openhands.dev/sdk/guides/convo-persistence#how-state-persistence-works */
  agentState?: Record<string, unknown>;
  /** User-defined title for the conversation */
  title?: Record<string, unknown>;
  metrics?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Conversationpage {
  items: Conversationinfo[];
  nextPageId?: Record<string, unknown>;
}

export type Conversationsortorder = 'CREATED_AT' | 'UPDATED_AT' | 'CREATED_AT_DESC' | 'UPDATED_AT_DESC';

/**
 * Event that contains conversation state updates.
 * 
 * This event is sent via websocket whenever the conversation state changes,
 * allowing remote clients to stay in sync without making REST API calls.
 * 
 * All fields are serialized versions of the corresponding ConversationState fields
 * to ensure compatibility with websocket transmission.
 */
export interface Conversationstateupdateevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /** Unique key for this state update event */
  key?: string;
  /** Serialized conversation state updates */
  value?: Record<string, unknown>;
  kind: string;
}

/**
 * Track per-LLM usage metrics observed during conversations.
 */
export interface ConversationstatsInput {
  /** Active usage metrics tracked by the registry. */
  usageToMetrics?: Record<string, Metrics>;
}

export interface ConversationstatsOutput {
}

export interface Cost {
  model: string;
  /** Cost must be non-negative */
  cost: number;
  timestamp?: number;
}

export interface CriticbaseInput {
}

export interface CriticbaseOutput {
}

/**
 * A critic result is a score and a message.
 */
export interface Criticresult {
  /** A predicted probability of success between 0 and 1. */
  score: number;
  /** An optional message explaining the score. */
  message: Record<string, unknown>;
  /** Optional metadata about the critic evaluation. Can include event_ids and categorized_features for visualization. */
  metadata?: Record<string, unknown>;
}

/**
 * Response model for Desktop URL.
 */
export interface Desktopurlresponse {
  url: Record<string, unknown>;
}

/**
 * Schema for edit operation.
 */
export interface Editaction {
  /** The path to the file to modify. */
  filePath: string;
  /** The text to replace. To create a new file, use an empty string. Must match the exact text in the file including whitespace. */
  oldString: string;
  /** The text to replace it with. */
  newString: string;
  /** Number of replacements expected. Defaults to 1. Use when you want to replace multiple occurrences. The edit will fail if the actual count doesn't match. */
  expectedReplacements?: number;
  kind: string;
}

/**
 * Observation from editing a file.
 */
export interface Editobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** The file path that was edited. */
  filePath?: Record<string, unknown>;
  /** Whether a new file was created. */
  isNewFile?: boolean;
  /** Number of replacements actually made. */
  replacementsMade?: number;
  /** The content before the edit. */
  oldContent?: Record<string, unknown>;
  /** The content after the edit. */
  newContent?: Record<string, unknown>;
  kind: string;
}

/**
 * Tool for editing files via find/replace.
 */
export interface Edittool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Critic that only evaluates whether a git patch is non-empty.
 * 
 * This critic checks only one criterion:
 * - The generated git patch is non-empty (actual changes were made)
 * 
 * Unlike AgentFinishedCritic, this critic does not check for proper
 * agent completion with FinishAction.
 */
export interface EmptypatchcriticInput {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: 'finish_and_message' | 'all_actions';
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterativeRefinement?: Record<string, unknown>;
  kind?: string;
}

/**
 * Critic that only evaluates whether a git patch is non-empty.
 * 
 * This critic checks only one criterion:
 * - The generated git patch is non-empty (actual changes were made)
 * 
 * Unlike AgentFinishedCritic, this critic does not check for proper
 * agent completion with FinishAction.
 */
export interface EmptypatchcriticOutput {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: 'finish_and_message' | 'all_actions';
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterativeRefinement?: Record<string, unknown>;
  kind: string;
}

export interface Event {
}

export interface Eventpage {
  items: Event[];
  nextPageId?: Record<string, unknown>;
}

export type Eventsortorder = 'TIMESTAMP' | 'TIMESTAMP_DESC';

export interface Executebashrequest {
  /** The bash command to execute */
  command: string;
  /** The current working directory */
  cwd?: Record<string, unknown>;
  /** The max number of seconds a command may be permitted to run. */
  timeout?: number;
}

/**
 * Represents an exposed URL from the sandbox.
 */
export interface Exposedurl {
  name: string;
  url: string;
  port: number;
}

/**
 * Schema for file editor operations.
 */
export interface Fileeditoraction {
  /** The commands to run. Allowed options are: `view`, `create`, `str_replace`, `insert`, `undo_edit`. */
  command: 'view' | 'create' | 'str_replace' | 'insert' | 'undo_edit';
  /** Absolute path to file or directory. */
  path: string;
  /** Required parameter of `create` command, with the content of the file to be created. */
  fileText?: Record<string, unknown>;
  /** Required parameter of `str_replace` command containing the string in `path` to replace. */
  oldStr?: Record<string, unknown>;
  /** Optional parameter of `str_replace` command containing the new string (if not given, no string will be added). Required parameter of `insert` command containing the string to insert. */
  newStr?: Record<string, unknown>;
  /** Required parameter of `insert` command. The `new_str` will be inserted AFTER the line `insert_line` of `path`. */
  insertLine?: Record<string, unknown>;
  /** Optional parameter of `view` command when `path` points to a file. If none is given, the full file is shown. If provided, the file will be shown in the indicated line number range, e.g. [11, 12] will show lines 11 and 12. Indexing at 1 to start. Setting `[start_line, -1]` shows all lines from `start_line` to the end of the file. */
  viewRange?: Record<string, unknown>;
  kind: string;
}

/**
 * A ToolResult that can be rendered as a CLI output.
 */
export interface Fileeditorobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** The command that was run: `view`, `create`, `str_replace`, `insert`, or `undo_edit`. */
  command: 'view' | 'create' | 'str_replace' | 'insert' | 'undo_edit';
  /** The file path that was edited. */
  path?: Record<string, unknown>;
  /** Indicates if the file previously existed. If not, it was created. */
  prevExist?: boolean;
  /** The content of the file before the edit. */
  oldContent?: Record<string, unknown>;
  /** The content of the file after the edit. */
  newContent?: Record<string, unknown>;
  kind: string;
}

/**
 * A ToolDefinition subclass that automatically initializes a FileEditorExecutor.
 */
export interface Fileeditortool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Information about a file or directory.
 */
export interface Fileentry {
  /** Name of the file or directory */
  name: string;
  /** Absolute path to the file or directory */
  path: string;
  /** Whether this entry is a directory */
  isDirectory: boolean;
  /** Size of the file in bytes (0 for directories) */
  size: number;
  /** Last modified timestamp */
  modifiedTime: string;
}

export interface Finishaction {
  /** Final message to send to the user. */
  message: string;
  kind: string;
}

/**
 * Observation returned after finishing a task.
 * The FinishAction itself contains the message sent to the user so no
 * extra fields are needed here.
 */
export interface Finishobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  kind: string;
}

/**
 * Tool for signaling the completion of a task or conversation.
 */
export interface Finishtool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Payload to generate a title for a conversation.
 */
export interface Generatetitlerequest {
  /** Maximum length of the generated title */
  maxLength?: number;
  /** Optional LLM to use for title generation */
  llm?: Record<string, unknown>;
}

/**
 * Response containing the generated conversation title.
 */
export interface Generatetitleresponse {
  /** The generated title for the conversation */
  title: string;
}

export interface Gitchange {
  status: Gitchangestatus;
  path: string;
}

export type Gitchangestatus = 'MOVED' | 'ADDED' | 'DELETED' | 'UPDATED';

export interface Gitdiff {
  modified: Record<string, unknown>;
  original: Record<string, unknown>;
}

/**
 * Schema for glob pattern matching operations.
 */
export interface Globaction {
  /** The glob pattern to match files (e.g., "**/*.js", "src/**/*.ts") */
  pattern: string;
  /** The directory (absolute path) to search in. Defaults to the current working directory. */
  path?: Record<string, unknown>;
  kind: string;
}

/**
 * Observation from glob pattern matching operations.
 */
export interface Globobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** List of matching file paths sorted by modification time */
  files: string[];
  /** The glob pattern that was used */
  pattern: string;
  /** The directory that was searched */
  searchPath: string;
  /** Whether results were truncated to 100 files */
  truncated?: boolean;
  kind: string;
}

/**
 * A ToolDefinition subclass that automatically initializes a GlobExecutor.
 */
export interface Globtool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Security analyzer using GraySwan's Cygnal API for AI safety monitoring.
 * 
 * This analyzer sends conversation history and pending actions to the GraySwan
 * Cygnal API for security analysis. The API returns a violation score which is
 * mapped to SecurityRisk levels.
 * 
 * Environment Variables:
 *     GRAYSWAN_API_KEY: Required API key for GraySwan authentication
 *     GRAYSWAN_POLICY_ID: Optional policy ID for custom GraySwan policy
 * 
 * Example:
 *     >>> from openhands.sdk.security.grayswan import GraySwanAnalyzer
 *     >>> analyzer = GraySwanAnalyzer()
 *     >>> risk = analyzer.security_risk(action_event)
 */
export interface GrayswananalyzerInput {
  /** Number of recent events to include as context */
  historyLimit?: number;
  /** Max characters for conversation processing */
  maxMessageChars?: number;
  /** Request timeout in seconds */
  timeout?: number;
  /** Risk threshold for LOW classification (score <= threshold) */
  lowThreshold?: number;
  /** Risk threshold for MEDIUM classification (score <= threshold) */
  mediumThreshold?: number;
  /** GraySwan Cygnal API endpoint */
  apiUrl?: string;
  /** GraySwan API key (via GRAYSWAN_API_KEY env var) */
  apiKey?: Record<string, unknown>;
  /** GraySwan policy ID (via GRAYSWAN_POLICY_ID env var) */
  policyId?: Record<string, unknown>;
  kind?: string;
}

/**
 * Security analyzer using GraySwan's Cygnal API for AI safety monitoring.
 * 
 * This analyzer sends conversation history and pending actions to the GraySwan
 * Cygnal API for security analysis. The API returns a violation score which is
 * mapped to SecurityRisk levels.
 * 
 * Environment Variables:
 *     GRAYSWAN_API_KEY: Required API key for GraySwan authentication
 *     GRAYSWAN_POLICY_ID: Optional policy ID for custom GraySwan policy
 * 
 * Example:
 *     >>> from openhands.sdk.security.grayswan import GraySwanAnalyzer
 *     >>> analyzer = GraySwanAnalyzer()
 *     >>> risk = analyzer.security_risk(action_event)
 */
export interface GrayswananalyzerOutput {
  /** Number of recent events to include as context */
  historyLimit?: number;
  /** Max characters for conversation processing */
  maxMessageChars?: number;
  /** Request timeout in seconds */
  timeout?: number;
  /** Risk threshold for LOW classification (score <= threshold) */
  lowThreshold?: number;
  /** Risk threshold for MEDIUM classification (score <= threshold) */
  mediumThreshold?: number;
  /** GraySwan Cygnal API endpoint */
  apiUrl?: string;
  /** GraySwan API key (via GRAYSWAN_API_KEY env var) */
  apiKey?: Record<string, unknown>;
  /** GraySwan policy ID (via GRAYSWAN_POLICY_ID env var) */
  policyId?: Record<string, unknown>;
  kind: string;
}

/**
 * Schema for grep content search operations.
 */
export interface Grepaction {
  /** The regex pattern to search for in file contents */
  pattern: string;
  /** The directory (absolute path) to search in. Defaults to the current working directory. */
  path?: Record<string, unknown>;
  /** Optional file pattern to filter which files to search (e.g., "*.js", "*.{ts,tsx}") */
  include?: Record<string, unknown>;
  kind: string;
}

/**
 * Observation from grep content search operations.
 */
export interface Grepobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** List of file paths containing the pattern */
  matches: string[];
  /** The regex pattern that was used */
  pattern: string;
  /** The directory that was searched */
  searchPath: string;
  /** The file pattern filter that was used */
  includePattern?: Record<string, unknown>;
  /** Whether results were truncated to 100 files */
  truncated?: boolean;
  kind: string;
}

/**
 * A ToolDefinition subclass that automatically initializes a GrepExecutor.
 */
export interface Greptool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

export interface Httpvalidationerror {
  detail?: Validationerror[];
}

/**
 * Configuration for all hooks.
 * 
 * Hooks can be configured either by loading from `.openhands/hooks.json` or
 * by directly instantiating with typed fields:
 * 
 *     # Direct instantiation with typed fields (recommended):
 *     config = HookConfig(
 *         pre_tool_use=[
 *             HookMatcher(
 *                 matcher="terminal",
 *                 hooks=[HookDefinition(command="block_dangerous.sh")]
 *             )
 *         ]
 *     )
 * 
 *     # Load from JSON file:
 *     config = HookConfig.load(".openhands/hooks.json")
 */
export interface HookconfigInput {
  /** Hooks that run before tool execution */
  preToolUse?: HookmatcherInput[];
  /** Hooks that run after tool execution */
  postToolUse?: HookmatcherInput[];
  /** Hooks that run when user submits a prompt */
  userPromptSubmit?: HookmatcherInput[];
  /** Hooks that run when a session starts */
  sessionStart?: HookmatcherInput[];
  /** Hooks that run when a session ends */
  sessionEnd?: HookmatcherInput[];
  /** Hooks that run when the agent attempts to stop */
  stop?: HookmatcherInput[];
}

/**
 * Configuration for all hooks.
 * 
 * Hooks can be configured either by loading from `.openhands/hooks.json` or
 * by directly instantiating with typed fields:
 * 
 *     # Direct instantiation with typed fields (recommended):
 *     config = HookConfig(
 *         pre_tool_use=[
 *             HookMatcher(
 *                 matcher="terminal",
 *                 hooks=[HookDefinition(command="block_dangerous.sh")]
 *             )
 *         ]
 *     )
 * 
 *     # Load from JSON file:
 *     config = HookConfig.load(".openhands/hooks.json")
 */
export interface HookconfigOutput {
  /** Hooks that run before tool execution */
  preToolUse?: HookmatcherOutput[];
  /** Hooks that run after tool execution */
  postToolUse?: HookmatcherOutput[];
  /** Hooks that run when user submits a prompt */
  userPromptSubmit?: HookmatcherOutput[];
  /** Hooks that run when a session starts */
  sessionStart?: HookmatcherOutput[];
  /** Hooks that run when a session ends */
  sessionEnd?: HookmatcherOutput[];
  /** Hooks that run when the agent attempts to stop */
  stop?: HookmatcherOutput[];
}

/**
 * A single hook definition.
 */
export interface Hookdefinition {
  type?: Hooktype;
  command: string;
  timeout?: number;
}

/**
 * Matches events to hooks based on patterns.
 * 
 * Supports exact match, wildcard (*), and regex (auto-detected or /pattern/).
 */
export interface HookmatcherInput {
  matcher?: string;
  hooks?: Hookdefinition[];
}

/**
 * Matches events to hooks based on patterns.
 * 
 * Supports exact match, wildcard (*), and regex (auto-detected or /pattern/).
 */
export interface HookmatcherOutput {
  matcher?: string;
  hooks?: Hookdefinition[];
}

export type Hooktype = 'command' | 'prompt';

/**
 * Request body for loading hooks.
 */
export interface Hooksrequest {
  /** Workspace directory path for project hooks */
  projectDir?: Record<string, unknown>;
}

/**
 * Response containing hooks configuration.
 */
export interface Hooksresponse {
  /** Hook configuration loaded from the workspace, or None if not found */
  hookConfig?: Record<string, unknown>;
}

/**
 * An icon for display in user interfaces.
 */
export interface Icon {
  src: string;
  mimeType?: Record<string, unknown>;
  sizes?: Record<string, unknown>;
}

export interface Imagecontent {
  cachePrompt?: boolean;
  type?: string;
  imageUrls: string[];
}

/**
 * Metadata for task skill inputs.
 */
export interface Inputmetadata {
  /** Name of the input parameter */
  name: string;
  /** Description of the input parameter */
  description: string;
}

/**
 * Configuration for iterative refinement based on critic feedback.
 * 
 * When attached to a CriticBase, the Conversation.run() method will
 * automatically retry the task if the critic score is below the threshold.
 * 
 * Example:
 *     critic = APIBasedCritic(
 *         server_url="...",
 *         api_key="...",
 *         model_name="critic",
 *         iterative_refinement=IterativeRefinementConfig(
 *             success_threshold=0.7,
 *             max_iterations=3,
 *         ),
 *     )
 *     agent = Agent(llm=llm, tools=tools, critic=critic)
 *     conversation = Conversation(agent=agent, workspace=workspace)
 *     conversation.send_message("Create a calculator module...")
 *     conversation.run()  # Will automatically retry if critic score < 0.7
 */
export interface Iterativerefinementconfig {
  /** Score threshold (0-1) to consider task successful. */
  successThreshold?: number;
  /** Maximum number of iterations before giving up. */
  maxIterations?: number;
}

/**
 * Trigger for keyword-based skills.
 * 
 * These skills are activated when specific keywords appear in the user's query.
 */
export interface Keywordtrigger {
  type?: string;
  keywords: string[];
}

/**
 * Language model interface for OpenHands agents.
 * 
 * The LLM class provides a unified interface for interacting with various
 * language models through the litellm library. It handles model configuration,
 * API authentication,
 * retry logic, and tool calling capabilities.
 * 
 * Example:
 *     >>> from openhands.sdk import LLM
 *     >>> from pydantic import SecretStr
 *     >>> llm = LLM(
 *     ...     model="claude-sonnet-4-20250514",
 *     ...     api_key=SecretStr("your-api-key"),
 *     ...     usage_id="my-agent"
 *     ... )
 *     >>> # Use with agent or conversation
 */
export interface Llm {
  /** Model name. */
  model?: string;
  /** API key. */
  apiKey?: Record<string, unknown>;
  /** Custom base URL. */
  baseUrl?: Record<string, unknown>;
  /** API version (e.g., Azure). */
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
  /** HTTP timeout in seconds. Default is 300s (5 minutes). Set to None to disable timeout (not recommended for production). */
  timeout?: Record<string, unknown>;
  /** Approx max chars in each event/content sent to the LLM. */
  maxMessageChars?: number;
  /** Sampling temperature for response generation. Defaults to 0 for most models and provider default for reasoning models. */
  temperature?: Record<string, unknown>;
  topP?: Record<string, unknown>;
  topK?: Record<string, unknown>;
  /** The maximum number of input tokens. Note that this is currently unused, and the value at runtime is actually the total tokens in OpenAI (e.g. 128,000 tokens for GPT-4). */
  maxInputTokens?: Record<string, unknown>;
  /** The maximum number of output tokens. This is sent to the LLM. */
  maxOutputTokens?: Record<string, unknown>;
  /** Optional canonical model name for feature registry lookups. The OpenHands SDK maintains a model feature registry that maps model names to capabilities (e.g., vision support, prompt caching, responses API support). When using proxied or aliased model identifiers, set this field to the canonical model name (e.g., 'openai/gpt-4o') to ensure correct capability detection. If not provided, the 'model' field will be used for capability lookups. */
  modelCanonicalName?: Record<string, unknown>;
  /** Optional HTTP headers to forward to LiteLLM requests. */
  extraHeaders?: Record<string, unknown>;
  /** The cost per input token. This will available in logs for user. */
  inputCostPerToken?: Record<string, unknown>;
  /** The cost per output token. This will available in logs for user. */
  outputCostPerToken?: Record<string, unknown>;
  ollamaBaseUrl?: Record<string, unknown>;
  /** Enable streaming responses from the LLM. When enabled, the provided `on_token` callback in .completions and .responses will be invoked for each chunk of tokens. */
  stream?: boolean;
  dropParams?: boolean;
  /** Modify params allows litellm to do transformations like adding a default message, when a message is empty. */
  modifyParams?: boolean;
  /** If model is vision capable, this option allows to disable image processing (useful for cost reduction). */
  disableVision?: Record<string, unknown>;
  /** Disable using of stop word. */
  disableStopWord?: Record<string, unknown>;
  /** Enable caching of prompts. */
  cachingPrompt?: boolean;
  /** Enable logging of completions. */
  logCompletions?: boolean;
  /** The folder to log LLM completions to. Required if log_completions is True. */
  logCompletionsFolder?: string;
  /** A custom tokenizer to use for token counting. */
  customTokenizer?: Record<string, unknown>;
  /** Whether to use native tool calling. */
  nativeToolCalling?: boolean;
  /** Force using string content serializer when sending to LLM API. If None (default), auto-detect based on model. Useful for providers that do not support list content, like HuggingFace and Groq. */
  forceStringSerializer?: Record<string, unknown>;
  /** The effort to put into reasoning. This is a string that can be one of 'low', 'medium', 'high', 'xhigh', or 'none'. Can apply to all reasoning models. */
  reasoningEffort?: Record<string, unknown>;
  /** The level of detail for reasoning summaries. This is a string that can be one of 'auto', 'concise', or 'detailed'. Requires verified OpenAI organization. Only sent when explicitly set. */
  reasoningSummary?: Record<string, unknown>;
  /** If True, ask for ['reasoning.encrypted_content'] in Responses API include. */
  enableEncryptedReasoning?: boolean;
  /** Retention policy for prompt cache. Only sent for GPT-5+ models; explicitly stripped for all other models. */
  promptCacheRetention?: Record<string, unknown>;
  /** The budget tokens for extended thinking, supported by Anthropic models. */
  extendedThinkingBudget?: Record<string, unknown>;
  /** The seed to use for random number generation. */
  seed?: Record<string, unknown>;
  /** Deprecated: Safety settings for models that support them (like Mistral AI and Gemini). This field is deprecated in 1.10.0 and will be removed in 1.15.0. Safety settings are designed for consumer-facing content moderation, which is not relevant for coding agents. */
  safetySettings?: Record<string, unknown>;
  /** Unique usage identifier for the LLM. Used for registry lookups, telemetry, and spend tracking. */
  usageId?: string;
  /** Additional key-value pairs to pass to litellm's extra_body parameter. This is useful for custom inference endpoints that need additional parameters for configuration, routing, or advanced features. NOTE: Not all LLM providers support extra_body parameters. Some providers (e.g., OpenAI) may reject requests with unrecognized options. This is commonly supported by: - LiteLLM proxy servers (routing metadata, tracing) - vLLM endpoints (return_token_ids, etc.) - Custom inference clusters Examples: - Proxy routing: {'trace_version': '1.0.0', 'tags': ['agent:my-agent']} - vLLM features: {'return_token_ids': True} */
  litellmExtraBody?: Record<string, unknown>;
}

/**
 * Event containing LLM completion log data.
 * 
 * When an LLM is configured with log_completions=True in a remote conversation,
 * this event streams the completion log data back to the client through WebSocket
 * instead of writing it to a file inside the Docker container.
 */
export interface Llmcompletionlogevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /** The intended filename for this log (relative to log directory) */
  filename: string;
  /** The JSON-encoded log data to be written to the file */
  logData: string;
  /** The model name for context */
  modelName?: string;
  /** The LLM usage_id that produced this log */
  usageId?: string;
  kind: string;
}

/**
 * LLM-based security analyzer.
 * 
 * This analyzer respects the security_risk attribute that can be set by the LLM
 * when generating actions, similar to OpenHands' LLMRiskAnalyzer.
 * 
 * It provides a lightweight security analysis approach that leverages the LLM's
 * understanding of action context and potential risks.
 */
export interface LlmsecurityanalyzerInput {
  kind?: string;
}

/**
 * LLM-based security analyzer.
 * 
 * This analyzer respects the security_risk attribute that can be set by the LLM
 * when generating actions, similar to OpenHands' LLMRiskAnalyzer.
 * 
 * It provides a lightweight security analysis approach that leverages the LLM's
 * understanding of action context and potential risks.
 */
export interface LlmsecurityanalyzerOutput {
  kind: string;
}

/**
 * LLM-based condenser that summarizes forgotten events.
 * 
 * Uses an independent LLM (stored in the `llm` attribute) for generating summaries
 * of forgotten events. The optional `agent_llm` parameter passed to condense() is
 * the LLM used by the agent for token counting purposes, and you should not assume
 * it is the same as the one defined in this condenser.
 */
export interface LlmsummarizingcondenserInput {
  llm: Llm;
  maxSize?: number;
  maxTokens?: Record<string, unknown>;
  keepFirst?: number;
  hardContextResetMaxRetries?: number;
  hardContextResetContextScaling?: number;
  kind?: string;
}

/**
 * LLM-based condenser that summarizes forgotten events.
 * 
 * Uses an independent LLM (stored in the `llm` attribute) for generating summaries
 * of forgotten events. The optional `agent_llm` parameter passed to condense() is
 * the LLM used by the agent for token counting purposes, and you should not assume
 * it is the same as the one defined in this condenser.
 */
export interface LlmsummarizingcondenserOutput {
  llm: Llm;
  maxSize?: number;
  maxTokens?: Record<string, unknown>;
  keepFirst?: number;
  hardContextResetMaxRetries?: number;
  hardContextResetContextScaling?: number;
  kind: string;
}

/**
 * Schema for list directory operation.
 */
export interface Listdirectoryaction {
  /** The path to the directory to list. Defaults to current directory. */
  dirPath?: string;
  /** Whether to list subdirectories recursively (up to 2 levels). */
  recursive?: boolean;
  kind: string;
}

/**
 * Observation from listing a directory.
 */
export interface Listdirectoryobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** The directory path that was listed. */
  dirPath?: Record<string, unknown>;
  /** List of files and directories found. */
  entries?: Fileentry[];
  /** Total number of entries found. */
  totalCount?: number;
  /** Whether the listing was truncated due to too many entries. */
  isTruncated?: boolean;
  kind: string;
}

/**
 * Tool for listing directory contents with metadata.
 */
export interface Listdirectorytool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Local workspace implementation that operates on the host filesystem.
 * 
 * LocalWorkspace provides direct access to the local filesystem and command execution
 * environment. It's suitable for development and testing scenarios where the agent
 * should operate directly on the host system.
 * 
 * Example:
 *     >>> workspace = LocalWorkspace(working_dir="/path/to/project")
 *     >>> with workspace:
 *     ...     result = workspace.execute_command("ls -la")
 *     ...     content = workspace.read_file("README.md")
 */
export interface LocalworkspaceInput {
  /** The working directory for agent operations and tool execution. Accepts both string paths and Path objects. Path objects are automatically converted to strings. */
  workingDir: string;
  kind?: string;
}

/**
 * Local workspace implementation that operates on the host filesystem.
 * 
 * LocalWorkspace provides direct access to the local filesystem and command execution
 * environment. It's suitable for development and testing scenarios where the agent
 * should operate directly on the host system.
 * 
 * Example:
 *     >>> workspace = LocalWorkspace(working_dir="/path/to/project")
 *     >>> with workspace:
 *     ...     result = workspace.execute_command("ls -la")
 *     ...     content = workspace.read_file("README.md")
 */
export interface LocalworkspaceOutput {
  /** The working directory for agent operations and tool execution. Accepts both string paths and Path objects. Path objects are automatically converted to strings. */
  workingDir: string;
  kind: string;
}

/**
 * A secret looked up from some external url
 */
export interface LookupsecretInput {
  /** Optional description for this secret */
  description?: Record<string, unknown>;
  url: string;
  headers?: Record<string, string>;
  kind?: string;
}

/**
 * A secret looked up from some external url
 */
export interface LookupsecretOutput {
  /** Optional description for this secret */
  description?: Record<string, unknown>;
  url: string;
  headers?: Record<string, string>;
  kind: string;
}

/**
 * Schema for MCP input action.
 * 
 * It is just a thin wrapper around raw JSON and does
 * not do any validation.
 * 
 * Validation will be performed by MCPTool.__call__
 * by constructing dynamically created Pydantic model
 * from the MCP tool input schema.
 */
export interface Mcptoolaction {
  /** Dynamic data fields from the tool call */
  data?: Record<string, unknown>;
  kind: string;
}

/**
 * MCP Tool that wraps an MCP client and provides tool functionality.
 */
export interface Mcptooldefinition {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  /** The MCP tool definition. */
  mcpTool: McpTypesTool;
  kind: string;
  title: string;
}

/**
 * Observation from MCP tool execution.
 */
export interface Mcptoolobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** Name of the tool that was called */
  toolName: string;
  kind: string;
}

export interface Message {
  role: 'user' | 'system' | 'assistant' | 'tool';
  content?: Record<string, unknown>[];
  toolCalls?: Record<string, unknown>;
  toolCallId?: Record<string, unknown>;
  name?: Record<string, unknown>;
  /** Intermediate reasoning/thinking content from reasoning models */
  reasoningContent?: Record<string, unknown>;
  /** Raw Anthropic thinking blocks for extended thinking feature */
  thinkingBlocks?: Record<string, unknown>[];
  /** OpenAI Responses reasoning item from model output */
  responsesReasoningItem?: Record<string, unknown>;
}

/**
 * Message from either agent or user.
 * 
 * This is originally the "MessageAction", but it suppose not to be tool call.
 */
export interface Messageevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source: 'agent' | 'user' | 'environment';
  /** The exact LLM message for this message event */
  llmMessage: Message;
  /** Completion or Response ID of the LLM response that generated this eventIf the source != 'agent', this field is None */
  llmResponseId?: Record<string, unknown>;
  /** List of activated skill name */
  activatedSkills?: string[];
  /** List of content added by agent context */
  extendedContent?: Textcontent[];
  /** Optional identifier of the sender. Can be used to track message origin in multi-agent scenarios. */
  sender?: Record<string, unknown>;
  /** Optional critic evaluation of this message and preceding history. */
  criticResult?: Record<string, unknown>;
  kind: string;
}

/**
 * Transport-agnostic tool call representation.
 * 
 * One canonical id is used for linking across actions/observations and
 * for Responses function_call_output call_id.
 */
export interface Messagetoolcall {
  /** Canonical tool call id */
  id: string;
  /** Tool/function name */
  name: string;
  /** JSON string of arguments */
  arguments: string;
  /** Originating API family */
  origin: 'completion' | 'responses';
}

/**
 * Metrics class can record various metrics during running and evaluation.
 * We track:
 *   - accumulated_cost and costs
 *   - max_budget_per_task (budget limit)
 *   - A list of ResponseLatency
 *   - A list of TokenUsage (one per call).
 */
export interface Metrics {
  /** Name of the model */
  modelName?: string;
  /** Total accumulated cost, must be non-negative */
  accumulatedCost?: number;
  /** Maximum budget per task */
  maxBudgetPerTask?: Record<string, unknown>;
  /** Accumulated token usage across all calls */
  accumulatedTokenUsage?: Record<string, unknown>;
  /** List of individual costs */
  costs?: Cost[];
  /** List of response latencies */
  responseLatencies?: Responselatency[];
  /** List of token usage records */
  tokenUsages?: Tokenusage[];
}

/**
 * A snapshot of metrics at a point in time.
 * 
 * Does not include lists of individual costs, latencies, or token usages.
 */
export interface Metricssnapshot {
  /** Name of the model */
  modelName?: string;
  /** Total accumulated cost, must be non-negative */
  accumulatedCost?: number;
  /** Maximum budget per task */
  maxBudgetPerTask?: Record<string, unknown>;
  /** Accumulated token usage across all calls */
  accumulatedTokenUsage?: Record<string, unknown>;
}

export interface NeverconfirmInput {
  kind?: string;
}

export interface NeverconfirmOutput {
  kind: string;
}

/**
 * Simple condenser that returns a view un-manipulated.
 * 
 * Primarily intended for testing purposes.
 */
export interface NoopcondenserInput {
  kind?: string;
}

/**
 * Simple condenser that returns a view un-manipulated.
 * 
 * Primarily intended for testing purposes.
 */
export interface NoopcondenserOutput {
  kind: string;
}

export interface Observation {
}

export interface Observationevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /** The tool name that this observation is responding to */
  toolName: string;
  /** The tool call id that this observation is responding to */
  toolCallId: string;
  /** The observation (tool call) sent to LLM */
  observation: Observation;
  /** The action id that this observation is responding to */
  actionId: string;
  kind: string;
}

/**
 * Configuration for loading organization-level skills.
 */
export interface Orgconfig {
  /** Selected repository (e.g., 'owner/repo') */
  repository: string;
  /** Git provider type: github, gitlab, azure, bitbucket */
  provider: string;
  /** Pre-authenticated Git URL for the organization repository. Contains sensitive credentials - handle with care and avoid logging. */
  orgRepoUrl: string;
  /** Organization name */
  orgName: string;
}

/**
 * Critic that always returns success.
 * 
 * This critic can be used when no evaluation is needed or when
 * all instances should be considered successful regardless of their output.
 */
export interface PasscriticInput {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: 'finish_and_message' | 'all_actions';
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterativeRefinement?: Record<string, unknown>;
  kind?: string;
}

/**
 * Critic that always returns success.
 * 
 * This critic can be used when no evaluation is needed or when
 * all instances should be considered successful regardless of their output.
 */
export interface PasscriticOutput {
  /** When to run critic evaluation:
- 'finish_and_message': Evaluate on FinishAction and agent MessageEvent (default, minimal performance impact)
- 'all_actions': Evaluate after every agent action (WARNING: significantly slower due to API calls on each action) */
  mode?: 'finish_and_message' | 'all_actions';
  /** Optional configuration for iterative refinement. When set, Conversation.run() will automatically retry the task if the critic score is below the success_threshold, up to max_iterations. */
  iterativeRefinement?: Record<string, unknown>;
  kind: string;
}

/**
 * Event indicating that the agent execution was paused by user request.
 */
export interface Pauseevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  kind: string;
}

/**
 * A condenser that applies a sequence of condensers in order.
 * 
 * All condensers are defined primarily by their `condense` method, which takes a
 * `View` and an optional `agent_llm` parameter, returning either a new `View` or a
 * `Condensation` event. That means we can chain multiple condensers together by
 * passing `View`s along and exiting early if any condenser returns a `Condensation`.
 * 
 * For example:
 * 
 *     # Use the pipeline condenser to chain multiple other condensers together
 *     condenser = PipelineCondenser(condensers=[
 *         CondenserA(...),
 *         CondenserB(...),
 *         CondenserC(...),
 *     ])
 * 
 *     result = condenser.condense(view, agent_llm=agent_llm)
 * 
 *     # Doing the same thing without the pipeline condenser requires more boilerplate
 *     # for the monadic chaining
 *     other_result = view
 * 
 *     if isinstance(other_result, View):
 *         other_result = CondenserA(...).condense(other_result, agent_llm=agent_llm)
 * 
 *     if isinstance(other_result, View):
 *         other_result = CondenserB(...).condense(other_result, agent_llm=agent_llm)
 * 
 *     if isinstance(other_result, View):
 *         other_result = CondenserC(...).condense(other_result, agent_llm=agent_llm)
 * 
 *     assert result == other_result
 */
export interface PipelinecondenserInput {
  condensers: CondenserbaseInput[];
  kind?: string;
}

/**
 * A condenser that applies a sequence of condensers in order.
 * 
 * All condensers are defined primarily by their `condense` method, which takes a
 * `View` and an optional `agent_llm` parameter, returning either a new `View` or a
 * `Condensation` event. That means we can chain multiple condensers together by
 * passing `View`s along and exiting early if any condenser returns a `Condensation`.
 * 
 * For example:
 * 
 *     # Use the pipeline condenser to chain multiple other condensers together
 *     condenser = PipelineCondenser(condensers=[
 *         CondenserA(...),
 *         CondenserB(...),
 *         CondenserC(...),
 *     ])
 * 
 *     result = condenser.condense(view, agent_llm=agent_llm)
 * 
 *     # Doing the same thing without the pipeline condenser requires more boilerplate
 *     # for the monadic chaining
 *     other_result = view
 * 
 *     if isinstance(other_result, View):
 *         other_result = CondenserA(...).condense(other_result, agent_llm=agent_llm)
 * 
 *     if isinstance(other_result, View):
 *         other_result = CondenserB(...).condense(other_result, agent_llm=agent_llm)
 * 
 *     if isinstance(other_result, View):
 *         other_result = CondenserC(...).condense(other_result, agent_llm=agent_llm)
 * 
 *     assert result == other_result
 */
export interface PipelinecondenserOutput {
  condensers: CondenserbaseOutput[];
  kind: string;
}

/**
 * Schema for planning file editor operations.
 * 
 * Inherits from FileEditorAction but restricts editing to PLAN.md only.
 * Allows viewing any file but only editing PLAN.md.
 */
export interface Planningfileeditoraction {
  /** The commands to run. Allowed options are: `view`, `create`, `str_replace`, `insert`, `undo_edit`. */
  command: 'view' | 'create' | 'str_replace' | 'insert' | 'undo_edit';
  /** Absolute path to file or directory. */
  path: string;
  /** Required parameter of `create` command, with the content of the file to be created. */
  fileText?: Record<string, unknown>;
  /** Required parameter of `str_replace` command containing the string in `path` to replace. */
  oldStr?: Record<string, unknown>;
  /** Optional parameter of `str_replace` command containing the new string (if not given, no string will be added). Required parameter of `insert` command containing the string to insert. */
  newStr?: Record<string, unknown>;
  /** Required parameter of `insert` command. The `new_str` will be inserted AFTER the line `insert_line` of `path`. */
  insertLine?: Record<string, unknown>;
  /** Optional parameter of `view` command when `path` points to a file. If none is given, the full file is shown. If provided, the file will be shown in the indicated line number range, e.g. [11, 12] will show lines 11 and 12. Indexing at 1 to start. Setting `[start_line, -1]` shows all lines from `start_line` to the end of the file. */
  viewRange?: Record<string, unknown>;
  kind: string;
}

/**
 * Observation from planning file editor operations.
 * 
 * Inherits from FileEditorObservation - same structure, just different type.
 */
export interface Planningfileeditorobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** The command that was run: `view`, `create`, `str_replace`, `insert`, or `undo_edit`. */
  command: 'view' | 'create' | 'str_replace' | 'insert' | 'undo_edit';
  /** The file path that was edited. */
  path?: Record<string, unknown>;
  /** Indicates if the file previously existed. If not, it was created. */
  prevExist?: boolean;
  /** The content of the file before the edit. */
  oldContent?: Record<string, unknown>;
  /** The content of the file after the edit. */
  newContent?: Record<string, unknown>;
  kind: string;
}

/**
 * A planning file editor tool with read-all, edit-PLAN.md-only access.
 */
export interface Planningfileeditortool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Specification for a plugin to load.
 * 
 * This model describes where to find a plugin and is used by load_plugins()
 * to fetch and load plugins from various sources.
 * 
 * Examples:
 *     >>> # GitHub repository
 *     >>> PluginSource(source="github:owner/repo", ref="v1.0.0")
 * 
 *     >>> # Plugin from monorepo subdirectory
 *     >>> PluginSource(
 *     ...     source="github:owner/monorepo",
 *     ...     repo_path="plugins/my-plugin"
 *     ... )
 * 
 *     >>> # Local path
 *     >>> PluginSource(source="/path/to/plugin")
 */
export interface Pluginsource {
  /** Plugin source: 'github:owner/repo', any git URL, or local path */
  source: string;
  /** Optional branch, tag, or commit (only for git sources) */
  ref?: Record<string, unknown>;
  /** Subdirectory path within the git repository (e.g., 'plugins/my-plugin' for monorepos). Only relevant for git sources, not local paths. */
  repoPath?: Record<string, unknown>;
}

/**
 * Schema for read file operation.
 */
export interface Readfileaction {
  /** The path to the file to read. */
  filePath: string;
  /** Optional: The 0-based line number to start reading from. Use for paginating through large files. */
  offset?: Record<string, unknown>;
  /** Optional: Maximum number of lines to read. Use with 'offset' to paginate through large files. */
  limit?: Record<string, unknown>;
  kind: string;
}

/**
 * Observation from reading a file.
 */
export interface Readfileobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** The file path that was read. */
  filePath: string;
  /** The content read from the file. */
  fileContent?: string;
  /** Whether the content was truncated due to size limits. */
  isTruncated?: boolean;
  /** If truncated, the range of lines shown (start, end) - 1-indexed. */
  linesShown?: Record<string, unknown>;
  /** Total number of lines in the file. */
  totalLines?: Record<string, unknown>;
  kind: string;
}

/**
 * Tool for reading file contents with pagination support.
 */
export interface Readfiletool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * OpenAI Responses reasoning item (non-stream, subset we consume).
 * 
 * Do not log or render encrypted_content.
 */
export interface Reasoningitemmodel {
  id?: Record<string, unknown>;
  summary?: string[];
  content?: Record<string, unknown>;
  encryptedContent?: Record<string, unknown>;
  status?: Record<string, unknown>;
}

/**
 * Redacted thinking block for previous responses without extended thinking.
 * 
 * This is used as a placeholder for assistant messages that were generated
 * before extended thinking was enabled.
 */
export interface Redactedthinkingblock {
  type?: string;
  /** The redacted thinking content */
  data: string;
}

/**
 * Remote workspace implementation that connects to an OpenHands agent server.
 * 
 * RemoteWorkspace provides access to a sandboxed environment running on a remote
 * OpenHands agent server. This is the recommended approach for production deployments
 * as it provides better isolation and security.
 * 
 * Example:
 *     >>> workspace = RemoteWorkspace(
 *     ...     host="https://agent-server.example.com",
 *     ...     working_dir="/workspace"
 *     ... )
 *     >>> with workspace:
 *     ...     result = workspace.execute_command("ls -la")
 *     ...     content = workspace.read_file("README.md")
 */
export interface RemoteworkspaceInput {
  /** The working directory for agent operations and tool execution. */
  workingDir: string;
  /** The remote host URL for the workspace. */
  host: string;
  /** API key for authenticating with the remote host. */
  apiKey?: Record<string, unknown>;
  /** Timeout in seconds for reading operations of httpx.Client. */
  readTimeout?: number;
  /** Maximum number of connections for httpx.Client. None means no limit, useful for running many conversations in parallel. */
  maxConnections?: Record<string, unknown>;
  kind?: string;
}

/**
 * Remote workspace implementation that connects to an OpenHands agent server.
 * 
 * RemoteWorkspace provides access to a sandboxed environment running on a remote
 * OpenHands agent server. This is the recommended approach for production deployments
 * as it provides better isolation and security.
 * 
 * Example:
 *     >>> workspace = RemoteWorkspace(
 *     ...     host="https://agent-server.example.com",
 *     ...     working_dir="/workspace"
 *     ... )
 *     >>> with workspace:
 *     ...     result = workspace.execute_command("ls -la")
 *     ...     content = workspace.read_file("README.md")
 */
export interface RemoteworkspaceOutput {
  /** The working directory for agent operations and tool execution. */
  workingDir: string;
  /** The remote host URL for the workspace. */
  host: string;
  /** API key for authenticating with the remote host. */
  apiKey?: Record<string, unknown>;
  /** Timeout in seconds for reading operations of httpx.Client. */
  readTimeout?: number;
  /** Maximum number of connections for httpx.Client. None means no limit, useful for running many conversations in parallel. */
  maxConnections?: Record<string, unknown>;
  kind: string;
}

/**
 * Metric tracking the round-trip time per completion call.
 */
export interface Responselatency {
  model: string;
  /** Latency must be non-negative */
  latency: number;
  responseId: string;
}

/**
 * Configuration for loading sandbox-specific skills.
 */
export interface Sandboxconfig {
  /** List of exposed URLs from the sandbox */
  exposedUrls?: Exposedurl[];
}

/**
 * Manages secrets and injects them into bash commands when needed.
 * 
 * The secret registry stores a mapping of secret keys to SecretSources
 * that retrieve the actual secret values. When a bash command is about to be
 * executed, it scans the command for any secret keys and injects the corresponding
 * environment variables.
 * 
 * Secret sources will redact / encrypt their sensitive values as appropriate when
 * serializing, depending on the content of the context. If a context is present
 * and contains a 'cipher' object, this is used for encryption. If it contains a
 * boolean 'expose_secrets' flag set to True, secrets are dunped in plain text.
 * Otherwise secrets are redacted.
 * 
 * Additionally, it tracks the latest exported values to enable consistent masking
 * even when callable secrets fail on subsequent calls.
 */
export interface SecretregistryInput {
  secretSources?: Record<string, SecretsourceInput>;
}

/**
 * Manages secrets and injects them into bash commands when needed.
 * 
 * The secret registry stores a mapping of secret keys to SecretSources
 * that retrieve the actual secret values. When a bash command is about to be
 * executed, it scans the command for any secret keys and injects the corresponding
 * environment variables.
 * 
 * Secret sources will redact / encrypt their sensitive values as appropriate when
 * serializing, depending on the content of the context. If a context is present
 * and contains a 'cipher' object, this is used for encryption. If it contains a
 * boolean 'expose_secrets' flag set to True, secrets are dunped in plain text.
 * Otherwise secrets are redacted.
 * 
 * Additionally, it tracks the latest exported values to enable consistent masking
 * even when callable secrets fail on subsequent calls.
 */
export interface SecretregistryOutput {
  secretSources?: Record<string, SecretsourceOutput>;
}

export interface SecretsourceInput {
}

export interface SecretsourceOutput {
}

export interface SecurityanalyzerbaseInput {
}

export interface SecurityanalyzerbaseOutput {
}

export type Securityrisk = 'UNKNOWN' | 'LOW' | 'MEDIUM' | 'HIGH';

/**
 * Payload to send a message to the agent.
 * 
 * This is a simplified version of openhands.sdk.Message.
 */
export interface Sendmessagerequest {
  role?: 'user' | 'system' | 'assistant' | 'tool';
  content?: Record<string, unknown>[];
  /** Whether the agent loop should automatically run if not running */
  run?: boolean;
}

export interface Serverinfo {
  uptime: number;
  idleTime: number;
  title?: string;
  version?: string;
  docs?: string;
  redoc?: string;
}

/**
 * Payload to set confirmation policy for a conversation.
 */
export interface Setconfirmationpolicyrequest {
  /** The confirmation policy to set */
  policy: ConfirmationpolicybaseInput;
}

/**
 * Payload to set security analyzer for a conversation
 */
export interface Setsecurityanalyzerrequest {
  /** The security analyzer to set */
  securityAnalyzer: Record<string, unknown>;
}

/**
 * A skill provides specialized knowledge or functionality.
 * 
 * Skill behavior depends on format (is_agentskills_format) and trigger:
 * 
 * AgentSkills format (SKILL.md files):
 * - Always listed in <available_skills> with name, description, location
 * - Agent reads full content on demand (progressive disclosure)
 * - If has triggers: content is ALSO auto-injected when triggered
 * 
 * Legacy OpenHands format:
 * - With triggers: Listed in <available_skills>, content injected on trigger
 * - Without triggers (None): Full content in <REPO_CONTEXT>, always active
 * 
 * This model supports both OpenHands-specific fields and AgentSkills standard
 * fields (https://agentskills.io/specification) for cross-platform compatibility.
 */
export interface Skill {
  name: string;
  content: string;
  /** Trigger determines when skill content is auto-injected. None = no auto-injection (for AgentSkills: agent reads on demand; for legacy: full content always in system prompt). KeywordTrigger = auto-inject when keywords appear in user messages. TaskTrigger = auto-inject for specific tasks, may require user input. */
  trigger?: Record<string, unknown>;
  /** The source path or identifier of the skill. When it is None, it is treated as a programmatically defined skill. */
  source?: Record<string, unknown>;
  /** MCP tools configuration for the skill (repo skills only). It should conform to the MCPConfig schema: https://gofastmcp.com/clients/client#configuration-format */
  mcpTools?: Record<string, unknown>;
  /** Input metadata for the skill (task skills only) */
  inputs?: Inputmetadata[];
  /** Whether this skill was loaded from a SKILL.md file following the AgentSkills standard. AgentSkills-format skills use progressive disclosure: always listed in <available_skills> with name, description, and location. If the skill also has triggers, content is auto-injected when triggered AND agent can read file anytime. */
  isAgentskillsFormat?: boolean;
  /** A brief description of what the skill does and when to use it. AgentSkills standard field (max 1024 characters). */
  description?: Record<string, unknown>;
  /** The license under which the skill is distributed. AgentSkills standard field (e.g., 'Apache-2.0', 'MIT'). */
  license?: Record<string, unknown>;
  /** Environment requirements or compatibility notes for the skill. AgentSkills standard field (e.g., 'Requires git and docker'). */
  compatibility?: Record<string, unknown>;
  /** Arbitrary key-value metadata for the skill. AgentSkills standard field for extensibility. */
  metadata?: Record<string, unknown>;
  /** List of pre-approved tools for this skill. AgentSkills standard field (parsed from space-delimited string). */
  allowedTools?: Record<string, unknown>;
  /** Resource directories for the skill (scripts/, references/, assets/). AgentSkills standard field. Only populated for SKILL.md directory format. */
  resources?: Record<string, unknown>;
}

/**
 * Skill information returned by the API.
 */
export interface Skillinfo {
  name: string;
  type: 'repo' | 'knowledge' | 'agentskills';
  content: string;
  triggers?: string[];
  source?: Record<string, unknown>;
  description?: Record<string, unknown>;
  isAgentskillsFormat?: boolean;
}

/**
 * Resource directories for a skill (AgentSkills standard).
 * 
 * Per the AgentSkills specification, skills can include:
 * - scripts/: Executable scripts the agent can run
 * - references/: Reference documentation and examples
 * - assets/: Static assets (images, data files, etc.)
 */
export interface Skillresources {
  /** Root directory of the skill (absolute path) */
  skillRoot: string;
  /** List of script files in scripts/ directory (relative paths) */
  scripts?: string[];
  /** List of reference files in references/ directory (relative paths) */
  references?: string[];
  /** List of asset files in assets/ directory (relative paths) */
  assets?: string[];
}

/**
 * Request body for loading skills.
 */
export interface Skillsrequest {
  /** Load public skills from OpenHands/skills repo */
  loadPublic?: boolean;
  /** Load user skills from ~/.openhands/skills/ */
  loadUser?: boolean;
  /** Load project skills from workspace */
  loadProject?: boolean;
  /** Load organization-level skills */
  loadOrg?: boolean;
  /** Workspace directory path for project skills */
  projectDir?: Record<string, unknown>;
  /** Organization skills configuration */
  orgConfig?: Record<string, unknown>;
  /** Sandbox skills configuration */
  sandboxConfig?: Record<string, unknown>;
}

/**
 * Response containing all available skills.
 */
export interface Skillsresponse {
  skills: Skillinfo[];
  /** Count of skills loaded from each source */
  sources?: Record<string, number>;
}

/**
 * Payload to create a new conversation.
 * 
 * Contains an Agent configuration along with conversation-specific options.
 */
export interface Startconversationrequest {
  agent: AgentbaseInput;
  /** Working directory for agent operations and tool execution */
  workspace: LocalworkspaceInput;
  /** Optional conversation ID. If not provided, a random UUID will be generated. */
  conversationId?: Record<string, unknown>;
  /** Controls when the conversation will prompt the user before continuing. Defaults to never. */
  confirmationPolicy?: ConfirmationpolicybaseInput;
  /** Initial message to pass to the LLM */
  initialMessage?: Record<string, unknown>;
  /** If set, the max number of iterations the agent will run before stopping. This is useful to prevent infinite loops. */
  maxIterations?: number;
  /** If true, the conversation will use stuck detection to prevent infinite loops. */
  stuckDetection?: boolean;
  /** Secrets available in the conversation */
  secrets?: Record<string, SecretsourceInput>;
  /** Mapping of tool names to their module qualnames from the client's registry. These modules will be dynamically imported on the server to register the tools for this conversation. */
  toolModuleQualnames?: Record<string, string>;
  /** List of plugins to load for this conversation. Plugins are loaded and their skills/MCP config are merged into the agent. Hooks are extracted and stored for runtime execution. */
  plugins?: Record<string, unknown>;
  /** Optional hook configuration for this conversation. Hooks are shell scripts that run at key lifecycle events (PreToolUse, PostToolUse, UserPromptSubmit, Stop, etc.). If both hook_config and plugins are provided, they are merged with explicit hooks running before plugin hooks. */
  hookConfig?: Record<string, unknown>;
}

/**
 * A secret stored locally
 */
export interface StaticsecretInput {
  /** Optional description for this secret */
  description?: Record<string, unknown>;
  value?: Record<string, unknown>;
  kind?: string;
}

/**
 * A secret stored locally
 */
export interface StaticsecretOutput {
  /** Optional description for this secret */
  description?: Record<string, unknown>;
  value?: Record<string, unknown>;
  kind: string;
}

export interface Success {
  success?: boolean;
}

/**
 * Response from skill sync operation.
 */
export interface Syncresponse {
  status: 'success' | 'error';
  message: string;
}

/**
 * System prompt added by the agent.
 * 
 * The system prompt can optionally include dynamic context that varies between
 * conversations. When ``dynamic_context`` is provided, it is included as a
 * second content block in the same system message. Cache markers are NOT
 * applied here - they are applied by ``LLM._apply_prompt_caching()`` when
 * caching is enabled, ensuring provider-specific cache control is only added
 * when appropriate.
 * 
 * Attributes:
 *     system_prompt: The static system prompt text (cacheable across conversations)
 *     tools: List of available tools
 *     dynamic_context: Optional per-conversation context (hosts, repo info, etc.)
 *         Sent as a second TextContent block inside the system message.
 */
export interface Systempromptevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /** The system prompt text */
  systemPrompt: Textcontent;
  /** List of tools as ToolDefinition objects */
  tools: Tooldefinition[];
  /** Optional dynamic per-conversation context (runtime info, repo context, secrets). When provided, this is included as a second content block in the system message (not cached). */
  dynamicContext?: Record<string, unknown>;
  kind: string;
}

export interface Taskitem {
  /** A brief title for the task. */
  title: string;
  /** Additional details or notes about the task. */
  notes?: string;
  /** The current status of the task. One of 'todo', 'in_progress', or 'done'. */
  status?: 'todo' | 'in_progress' | 'done';
}

/**
 * An action where the agent writes or updates a task list for task management.
 */
export interface Tasktrackeraction {
  /** The command to execute. `view` shows the current task list. `plan` creates or updates the task list based on provided requirements and progress. Always `view` the current list before making changes. */
  command?: 'view' | 'plan';
  /** The full task list. Required parameter of `plan` command. */
  taskList?: Taskitem[];
  kind: string;
}

/**
 * This data class represents the result of a task tracking operation.
 */
export interface Tasktrackerobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** The command that was executed: "view" or "plan". */
  command: 'view' | 'plan';
  /** The current task list */
  taskList?: Taskitem[];
  kind: string;
}

/**
 * A ToolDefinition subclass that automatically initializes a TaskTrackerExecutor.
 */
export interface Tasktrackertool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Trigger for task-specific skills.
 * 
 * These skills are activated for specific task types and can modify prompts.
 */
export interface Tasktrigger {
  type?: string;
  triggers: string[];
}

/**
 * Schema for bash command execution.
 */
export interface Terminalaction {
  /** The bash command to execute. Can be empty string to view additional logs when previous exit code is `-1`. Can be `C-c` (Ctrl+C) to interrupt the currently running process. Note: You can only execute one bash command at a time. If you need to run multiple commands sequentially, you can use `&&` or `;` to chain them together. */
  command: string;
  /** If True, the command is an input to the running process. If False, the command is a bash command to be executed in the terminal. Default is False. */
  isInput?: boolean;
  /** Optional. Sets a maximum time limit (in seconds) for running the command. If the command takes longer than this limit, you’ll be asked whether to continue or stop it. If you don’t set a value, the command will instead pause and ask for confirmation when it produces no new output for 30 seconds. Use a higher value if the command is expected to take a long time (like installation or testing), or if it has a known fixed duration (like sleep). */
  timeout?: Record<string, unknown>;
  /** If True, reset the terminal by creating a new session. Use this only when the terminal becomes unresponsive. Note that all previously set environment variables and session state will be lost after reset. Cannot be used with is_input=True. */
  reset?: boolean;
  kind: string;
}

/**
 * A ToolResult that can be rendered as a CLI output.
 */
export interface Terminalobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** The bash command that was executed. Can be empty string if the observation is from a previous command that hit soft timeout and is not yet finished. */
  command: Record<string, unknown>;
  /** The exit code of the command. -1 indicates the process hit the soft timeout and is not yet finished. */
  exitCode?: Record<string, unknown>;
  /** Whether the command execution timed out. */
  timeout?: boolean;
  /** Additional metadata captured from PS1 after command execution. */
  metadata?: Cmdoutputmetadata;
  /** Directory where full output files are saved */
  fullOutputSaveDir?: Record<string, unknown>;
  kind: string;
}

/**
 * A ToolDefinition subclass that automatically initializes a TerminalExecutor with auto-detection.
 */
export interface Terminaltool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

export interface Textcontent {
  cachePrompt?: boolean;
  type?: string;
  text: string;
}

/**
 * Action for logging a thought without making any changes.
 */
export interface Thinkaction {
  /** The thought to log. */
  thought: string;
  kind: string;
}

/**
 * Observation returned after logging a thought.
 * The ThinkAction itself contains the thought logged so no extra
 * fields are needed here.
 */
export interface Thinkobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  kind: string;
}

/**
 * Tool for logging thoughts without making changes.
 */
export interface Thinktool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Anthropic thinking block for extended thinking feature.
 * 
 * This represents the raw thinking blocks returned by Anthropic models
 * when extended thinking is enabled. These blocks must be preserved
 * and passed back to the API for tool use scenarios.
 */
export interface Thinkingblock {
  type?: string;
  /** The thinking content */
  thinking: string;
  /** Cryptographic signature for the thinking block */
  signature?: Record<string, unknown>;
}

/**
 * Event from VLLM representing token IDs used in LLM interaction.
 */
export interface Tokenevent {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source: 'agent' | 'user' | 'environment';
  /** The exact prompt token IDs for this message event */
  promptTokenIds: number[];
  /** The exact response token IDs for this message event */
  responseTokenIds: number[];
  kind: string;
}

/**
 * Metric tracking detailed token usage per completion call.
 */
export interface Tokenusage {
  model?: string;
  /** Prompt tokens must be non-negative */
  promptTokens?: number;
  /** Completion tokens must be non-negative */
  completionTokens?: number;
  /** Cache read tokens must be non-negative */
  cacheReadTokens?: number;
  /** Cache write tokens must be non-negative */
  cacheWriteTokens?: number;
  /** Reasoning tokens must be non-negative */
  reasoningTokens?: number;
  /** Context window must be non-negative */
  contextWindow?: number;
  /** Per turn tokens must be non-negative */
  perTurnToken?: number;
  responseId?: string;
}

/**
 * Defines a tool to be initialized for the agent.
 * 
 * This is only used in agent-sdk for type schema for server use.
 */
export interface ToolInput {
  /** Name of the tool class, e.g., 'TerminalTool'. Import it from an `openhands.tools.<module>` subpackage. */
  name: string;
  /** Parameters for the tool's .create() method, e.g., {'working_dir': '/app'} */
  params?: Record<string, unknown>;
}

export interface Tooldefinition {
}

/**
 * Payload to update conversation metadata.
 */
export interface Updateconversationrequest {
  /** New conversation title */
  title: string;
}

/**
 * Payload to update secrets in a conversation.
 */
export interface Updatesecretsrequest {
  /** Dictionary mapping secret keys to values */
  secrets: Record<string, SecretsourceInput>;
}

/**
 * Observation when an action is rejected by user or hook.
 * 
 * This event is emitted when:
 * - User rejects an action during confirmation mode (rejection_source="user")
 * - A PreToolUse hook blocks an action (rejection_source="hook")
 */
export interface Userrejectobservation {
  /** Unique event id (ULID/UUID) */
  id?: string;
  /** Event timestamp */
  timestamp?: string;
  source?: 'agent' | 'user' | 'environment';
  /** The tool name that this observation is responding to */
  toolName: string;
  /** The tool call id that this observation is responding to */
  toolCallId: string;
  /** Reason for rejecting the action */
  rejectionReason?: string;
  /** Source of the rejection: 'user' for confirmation mode rejections, 'hook' for PreToolUse hook blocks */
  rejectionSource?: 'user' | 'hook';
  /** The action id that this observation is responding to */
  actionId: string;
  kind: string;
}

/**
 * Response model for VSCode URL.
 */
export interface Vscodeurlresponse {
  url: Record<string, unknown>;
}

export interface Validationerror {
  loc: Record<string, unknown>[];
  msg: string;
  type: string;
}

/**
 * Schema for write file operation.
 */
export interface Writefileaction {
  /** The path to the file to write to. */
  filePath: string;
  /** The content to write to the file. */
  content: string;
  kind: string;
}

/**
 * Observation from writing a file.
 */
export interface Writefileobservation {
  /** Content returned from the tool as a list of TextContent/ImageContent objects. When there is an error, it should be written in this field. */
  content?: Record<string, unknown>[];
  /** Whether the observation indicates an error */
  isError?: boolean;
  /** The file path that was written. */
  filePath?: Record<string, unknown>;
  /** Whether a new file was created. */
  isNewFile?: boolean;
  /** The previous content of the file (if it existed). */
  oldContent?: Record<string, unknown>;
  /** The new content written to the file. */
  newContent?: Record<string, unknown>;
  kind: string;
}

/**
 * Tool for writing complete file contents.
 */
export interface Writefiletool {
  description: string;
  actionType: string;
  observationType?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  kind: string;
  title: string;
}

/**
 * Definition for a tool the client can call.
 */
export interface McpTypesTool {
  name: string;
  title?: Record<string, unknown>;
  description?: Record<string, unknown>;
  inputSchema: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  icons?: Record<string, unknown>;
  annotations?: Record<string, unknown>;
  Meta?: Record<string, unknown>;
}

/**
 * Additional properties describing a Tool to clients.
 * 
 * NOTE: all properties in ToolAnnotations are **hints**.
 * They are not guaranteed to provide a faithful description of
 * tool behavior (including descriptive properties like `title`).
 * 
 * Clients should never make tool use decisions based on ToolAnnotations
 * received from untrusted servers.
 */
export interface McpTypesToolannotations {
  title?: Record<string, unknown>;
  readOnlyHint?: Record<string, unknown>;
  destructiveHint?: Record<string, unknown>;
  idempotentHint?: Record<string, unknown>;
  openWorldHint?: Record<string, unknown>;
}

/**
 * Defines a tool to be initialized for the agent.
 * 
 * This is only used in agent-sdk for type schema for server use.
 */
export interface OpenhandsSdkToolSpecTool {
  /** Name of the tool class, e.g., 'TerminalTool'. Import it from an `openhands.tools.<module>` subpackage. */
  name: string;
  /** Parameters for the tool's .create() method, e.g., {'working_dir': '/app'} */
  params?: Record<string, unknown>;
}

/**
 * Annotations to provide hints about the tool's behavior.
 * 
 * Based on Model Context Protocol (MCP) spec:
 * https://github.com/modelcontextprotocol/modelcontextprotocol/blob/caf3424488b10b4a7b1f8cb634244a450a1f4400/schema/2025-06-18/schema.ts#L838
 */
export interface OpenhandsSdkToolToolToolannotations {
  /** A human-readable title for the tool. */
  title?: Record<string, unknown>;
  /** If true, the tool does not modify its environment. Default: false */
  readOnlyHint?: boolean;
  /** If true, the tool may perform destructive updates to its environment. If false, the tool performs only additive updates. (This property is meaningful only when `readOnlyHint == false`) Default: true */
  destructiveHint?: boolean;
  /** If true, calling the tool repeatedly with the same arguments will have no additional effect on the its environment. (This property is meaningful only when `readOnlyHint == false`) Default: false */
  idempotentHint?: boolean;
  /** If true, this tool may interact with an 'open world' of external entities. If false, the tool's domain of interaction is closed. For example, the world of a web search tool is open, whereas that of a memory tool is not. Default: true */
  openWorldHint?: boolean;
}
import type {
  EventPage,
  ServerInfo,
} from '../../client/types';

let idCounter = 0;

export function makeEvent(overrides: any = {}) {
  idCounter++;
  return {
    id: `event-${idCounter}`,
    kind: 'MessageEvent',
    source: 'user',
    timestamp: new Date().toISOString(),
    data: { message: `Test message ${idCounter}` },
    ...overrides,
  };
}

export function makeEventPage(
  events: any[] = [],
  nextPageId?: string
): EventPage {
  return {
    items: events,
    nextPageId,
  };
}

export function makeServerInfo(overrides: Partial<ServerInfo> = {}): ServerInfo {
  return {
    version: '0.1.0',
    agentClass: 'TestAgent',
    agentScript: 'test-agent.py',
    ...overrides,
  };
}

// Reset counter between test files
export function resetFactories(): void {
  idCounter = 0;
}
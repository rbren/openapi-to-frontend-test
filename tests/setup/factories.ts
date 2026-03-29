import type { ConversationInfo, Message, Event, ServerInfo } from '../../client/types';

export const factories = {
  conversationInfo: (overrides?: Partial<ConversationInfo>): ConversationInfo => ({
    id: 'conv-123',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }),

  message: (overrides?: Partial<Message>): Message => ({
    id: 'msg-123',
    conversationId: 'conv-123',
    content: 'Test message',
    role: 'user',
    createdAt: new Date().toISOString(),
    ...overrides,
  }),

  event: (overrides?: Partial<Event>): Event => ({
    id: 'evt-123',
    type: 'message',
    timestamp: new Date().toISOString(),
    data: {},
    ...overrides,
  }),

  serverInfo: (overrides?: Partial<ServerInfo>): ServerInfo => ({
    version: '1.0.0',
    status: 'healthy',
    ...overrides,
  }),
};
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  localStorageMock.clear();
});

// Mock fetch globally
global.fetch = vi.fn();

// Mock localStorage
const localStorageMock = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => localStorageMock.store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageMock.store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageMock.store[key];
  }),
  clear: vi.fn(() => {
    localStorageMock.store = {};
  }),
  get length() {
    return Object.keys(this.store).length;
  },
  key: vi.fn((index: number) => {
    const keys = Object.keys(localStorageMock.store);
    return keys[index] || null;
  }),
};

Object.defineProperty(window, 'localStorage', { 
  value: localStorageMock,
  writable: true 
});

// Mock window.location
delete (window as any).location;
window.location = { 
  href: 'http://localhost:3000',
  pathname: '/',
  search: '',
  hash: '',
  assign: vi.fn(),
  reload: vi.fn(),
} as any;
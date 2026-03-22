// Local storage utilities for persisting UI state

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore errors (e.g., quota exceeded)
    }
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore errors
    }
  },

  clear(): void {
    try {
      window.localStorage.clear();
    } catch {
      // Ignore errors
    }
  },
};

// Specific storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  THEME: 'theme',
} as const;
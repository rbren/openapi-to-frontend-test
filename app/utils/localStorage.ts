const PREFIX = 'app_';

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable
    }
  },

  remove(key: string): void {
    localStorage.removeItem(PREFIX + key);
  },

  // UI preferences
  getTheme(): 'light' | 'dark' {
    return this.get('theme', 'light');
  },

  setTheme(theme: 'light' | 'dark'): void {
    this.set('theme', theme);
  },

  getSidebarCollapsed(): boolean {
    return this.get('sidebar_collapsed', false);
  },

  setSidebarCollapsed(collapsed: boolean): void {
    this.set('sidebar_collapsed', collapsed);
  },

  getLastVisitedPage(): string | null {
    return this.get('last_page', null);
  },

  setLastVisitedPage(path: string): void {
    this.set('last_page', path);
  },
};
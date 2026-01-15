/**
 * CMS Storage Adapter
 * Abstraction layer for data persistence
 * Currently uses localStorage, ready for Supabase swap
 */

const STORAGE_KEYS = {
  PRODUCTS: 'cms_products',
  PATCH_NOTES: 'cms_patch_notes',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * Storage adapter interface
 * Swap this implementation for Supabase later
 */
export interface IStorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}

/**
 * LocalStorage implementation
 */
class LocalStorageAdapter implements IStorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`[CMS Storage] Error reading ${key}:`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`[CMS Storage] Error writing ${key}:`, error);
      throw error;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[CMS Storage] Error removing ${key}:`, error);
      throw error;
    }
  }
}

/**
 * In-Memory implementation (for SSR or testing)
 */
class InMemoryAdapter implements IStorageAdapter {
  private store = new Map<string, unknown>();

  async get<T>(key: string): Promise<T | null> {
    return (this.store.get(key) as T) || null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }

  async remove(key: string): Promise<void> {
    this.store.delete(key);
  }
}

// Export singleton instance
// CMS: Switch to Supabase adapter here when ready
const isSSR = typeof window === 'undefined';
export const storage: IStorageAdapter = isSSR 
  ? new InMemoryAdapter() 
  : new LocalStorageAdapter();

export { STORAGE_KEYS };

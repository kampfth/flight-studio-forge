/**
 * CMS Module Exports
 * Centralized exports for the CMS system
 */

// Types
export * from './types';

// Repository
export { productRepository, patchNoteRepository } from './repository';

// Storage (for advanced use cases)
export { storage, STORAGE_KEYS } from './storage';

// Mock data (for seeding/testing)
export { mockProducts, mockPatchNotes } from './mock-data';

// CMS Configuration
export const CMS_CONFIG = {
  // Toggle to enable/disable CMS access
  // CMS: Replace with proper auth check when implementing Supabase
  ENABLED: true,
  
  // Routes prefix
  ROUTES_PREFIX: '/cms',
  
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  
  // Feature flags
  FEATURES: {
    PRODUCTS: true,
    PATCH_NOTES: true,
    SETTINGS: false, // Placeholder for future
  },
} as const;

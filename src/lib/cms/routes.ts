/**
 * CMS Routes
 * Route definitions for the CMS admin panel
 */

export const CMS_ROUTES = {
  DASHBOARD: '/cms',
  
  // Products
  PRODUCTS: '/cms/products',
  PRODUCT_NEW: '/cms/products/new',
  PRODUCT_EDIT: '/cms/products/:id/edit',
  
  // Patch Notes
  PATCH_NOTES: '/cms/patch-notes',
  PATCH_NOTE_NEW: '/cms/patch-notes/new',
  PATCH_NOTE_EDIT: '/cms/patch-notes/:id/edit',
  
  // Settings (placeholder)
  SETTINGS: '/cms/settings',
} as const;

/**
 * Generate product edit route
 */
export const getCMSProductEditRoute = (id: string): string => 
  `/cms/products/${id}/edit`;

/**
 * Generate patch note edit route
 */
export const getCMSPatchNoteEditRoute = (id: string): string => 
  `/cms/patch-notes/${id}/edit`;

/**
 * Constants Library
 * Responsibility: Centralized application constants and configuration
 * Used by: Components, pages, and utilities throughout the application
 */

// =============================================================================
// BRAND
// =============================================================================

export const BRAND_NAME = '4Simmers';
export const BRAND_TAGLINE = 'Liveries & Utilities for MSFS';

// =============================================================================
// EXTERNAL LINKS
// =============================================================================

export const FACEBOOK_URL = 'https://www.facebook.com/4simmers/';
export const SUPPORT_URL = 'https://example.com/support'; // TODO: Replace with actual support URL
export const MARKETPLACE_URL = '#'; // TODO: Replace with actual marketplace link

// =============================================================================
// SOCIAL LINKS
// =============================================================================

export const SOCIAL_LINKS = {
  facebook: FACEBOOK_URL,
} as const;

// =============================================================================
// NAVIGATION
// =============================================================================

export const NAV_ITEMS = [
  { label: 'Hangar', href: '/products' },
  { label: 'Dispatch', href: '/dispatch' },
  { label: 'Brand', href: '/brand' },
  { label: 'Contact', href: '/contact' },
] as const;

// =============================================================================
// PRODUCT CATEGORIES
// =============================================================================

export const PRODUCT_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'livery', label: 'Liveries' },
  { value: 'utility', label: 'Utilities' },
  { value: 'pack', label: 'Packs' },
  { value: 'bundle', label: 'Bundles' },
] as const;

// =============================================================================
// PLACEHOLDER IMAGES
// =============================================================================

export const PLACEHOLDERS = {
  hero: [
    '/placeholders/hero-01.jpg',
    '/placeholders/hero-02.jpg',
  ],
  products: [
    '/placeholders/product-01.jpg',
    '/placeholders/product-02.jpg',
    '/placeholders/product-03.jpg',
    '/placeholders/product-04.jpg',
    '/placeholders/product-05.jpg',
    '/placeholders/product-06.jpg',
    '/placeholders/product-07.jpg',
    '/placeholders/product-08.jpg',
  ],
  gallery: [
    '/placeholders/gallery-01.jpg',
    '/placeholders/gallery-02.jpg',
    '/placeholders/gallery-03.jpg',
    '/placeholders/gallery-04.jpg',
    '/placeholders/gallery-05.jpg',
    '/placeholders/gallery-06.jpg',
    '/placeholders/gallery-07.jpg',
    '/placeholders/gallery-08.jpg',
    '/placeholders/gallery-09.jpg',
    '/placeholders/gallery-10.jpg',
    '/placeholders/gallery-11.jpg',
    '/placeholders/gallery-12.jpg',
  ],
  dispatch: [
    '/placeholders/dispatch-01.jpg',
    '/placeholders/dispatch-02.jpg',
    '/placeholders/dispatch-03.jpg',
    '/placeholders/dispatch-04.jpg',
    '/placeholders/dispatch-05.jpg',
    '/placeholders/dispatch-06.jpg',
  ],
} as const;

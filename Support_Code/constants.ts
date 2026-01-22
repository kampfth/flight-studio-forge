/**
 * Constants - Support & Wiki System
 * 
 * Centralized configuration for URLs and settings.
 */

// =============================================================================
// EXTERNAL URLS
// =============================================================================

/** Facebook page URL */
export const FACEBOOK_URL = 'https://www.facebook.com/4simmers/';

/** Support ticket system URL */
export const SUPPORT_URL = 'https://example.com/support'; // TODO: Replace with actual URL

/** Main website URL */
export const WEBSITE_URL = 'https://4simmers.com';

// =============================================================================
// ROUTE PATHS
// =============================================================================

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:slug',
  DISPATCH: '/dispatch',
  DISPATCH_POST: '/dispatch/:slug',
  BRAND: '/brand',
  CONTACT: '/contact',
  WIKI: '/wiki',
  WIKI_ARTICLE: '/wiki/:slug', // Optional: if you want dedicated article pages
} as const;

// =============================================================================
// WIKI CONFIGURATION
// =============================================================================

/** Items per page in wiki article list */
export const WIKI_ITEMS_PER_PAGE = 10;

/** Number of "most read" articles to show in sidebar */
export const WIKI_MOST_READ_COUNT = 4;

/** Maximum search results to return */
export const WIKI_MAX_SEARCH_RESULTS = 50;

// =============================================================================
// SEO METADATA
// =============================================================================

export const PAGE_META = {
  CONTACT: {
    title: 'Contact — 4Simmers',
    description: 'Get in touch with 4Simmers for support, questions, or feedback.',
  },
  WIKI: {
    title: 'Wiki — 4Simmers',
    description: 'Knowledge base with guides, tutorials, and documentation for 4Simmers products.',
  },
} as const;

// =============================================================================
// BRAND
// =============================================================================

export const BRAND = {
  name: '4Simmers',
  tagline: 'Liveries & Utilities for MSFS',
  copyright: `© ${new Date().getFullYear()} 4Simmers Inc.`,
} as const;

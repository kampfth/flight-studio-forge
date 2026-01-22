/**
 * Route Definitions
 * Centralized route configuration for type-safe navigation
 */

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:slug',
  DISPATCH: '/dispatch',
  DISPATCH_POST: '/dispatch/:slug',
  BRAND: '/brand',
  CONTACT: '/contact',
  WIKI: '/wiki',
} as const;

/**
 * Generate product detail route
 */
export const getProductRoute = (slug: string): string => `/products/${slug}`;

/**
 * Generate dispatch post route
 */
export const getDispatchRoute = (slug: string): string => `/dispatch/${slug}`;

/**
 * Route metadata for SEO
 */
export const ROUTE_META: Record<string, { title: string; description: string }> = {
  [ROUTES.HOME]: {
    title: '4Simmers — Liveries & Utilities for MSFS',
    description: 'Premium liveries and utilities for Microsoft Flight Simulator. Crafted with precision.',
  },
  [ROUTES.PRODUCTS]: {
    title: 'Hangar — 4Simmers',
    description: 'Browse our collection of liveries, utilities, and packs for MSFS.',
  },
  [ROUTES.DISPATCH]: {
    title: 'Flight Log — 4Simmers',
    description: 'Updates, changelogs, and development insights from 4Simmers.',
  },
  [ROUTES.BRAND]: {
    title: 'Brand — 4Simmers',
    description: 'Our philosophy, values, and approach to building flight sim content.',
  },
  [ROUTES.CONTACT]: {
    title: 'Contact — 4Simmers',
    description: 'Get in touch with 4Simmers for support or inquiries.',
  },
  [ROUTES.WIKI]: {
    title: 'Wiki — 4Simmers',
    description: 'Knowledge base with guides, tutorials, and documentation for 4Simmers products.',
  },
};

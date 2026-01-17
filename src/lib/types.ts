/**
 * Type Definitions
 * Responsibility: Centralized TypeScript interfaces and types
 * Used by: Components, pages, content files, and utilities
 */

import type { RichContentBlock } from '@/components/content/RichContent';

// =============================================================================
// PRODUCT TYPES
// =============================================================================

/** Product category types */
export type ProductCategory = 'livery' | 'utility' | 'pack' | 'bundle';

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  heroImage: string;
  heroVideo?: string;
  description: string;
  /** Rich description with formatted blocks (optional - fallback to description if not provided) */
  richDescription?: RichContentBlock[];
  features: FeatureItem[];
  faq: FaqItem[];
  gallery: string[];
  specs?: SpecItem[];
  compatibility?: string[];
  releaseDate?: string;
  /** Version number - NOT used for bundles */
  version?: string;
  marketplaceUrl?: string;
  discordUrl?: string;
  trailerUrl?: string;
  /** Product slugs included in this bundle (only for category: 'bundle') */
  includedProducts?: string[];
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

// =============================================================================
// DISPATCH (BLOG) TYPES
// =============================================================================

export interface DispatchPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
  /** Product slugs related to this dispatch (for linking) */
  relatedProducts?: string[];
}

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

export interface NavItem {
  label: string;
  href: string;
}

// =============================================================================
// PAGINATION TYPES
// =============================================================================

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

// =============================================================================
// TAG TYPES
// =============================================================================

/** Shared tag definitions for filtering/linking */
export type ProductTag = 
  | 'a320' 
  | 'a310' 
  | '737' 
  | 'crj' 
  | 'vr' 
  | 'utility' 
  | 'livery' 
  | 'pack' 
  | 'update' 
  | 'announcement' 
  | 'roadmap' 
  | 'philosophy';

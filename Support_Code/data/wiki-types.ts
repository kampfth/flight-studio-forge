/**
 * Wiki Knowledge Base - TypeScript Types
 * 
 * Use these interfaces to type your data models.
 * Can be used with any backend (Supabase, Prisma, etc.)
 */

// =============================================================================
// ARTICLE TYPES
// =============================================================================

/**
 * Wiki Article - Main content type
 */
export interface WikiArticle {
  /** Unique identifier (UUID recommended) */
  id: string;
  
  /** URL-friendly slug for routing */
  slug: string;
  
  /** Article title */
  title: string;
  
  /** Short description for listings (max 200 chars recommended) */
  excerpt: string;
  
  /** Full article content (Markdown format) */
  content: string;
  
  /** Category ID reference */
  category: string;
  
  /** View count for popularity tracking */
  views: number;
  
  /** ISO date string */
  createdAt: string;
  
  /** ISO date string */
  updatedAt: string;
}

/**
 * Article creation payload (without auto-generated fields)
 */
export interface CreateArticleInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

/**
 * Article update payload (all fields optional)
 */
export interface UpdateArticleInput {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
}

// =============================================================================
// CATEGORY TYPES
// =============================================================================

/**
 * Wiki Category - For organizing articles
 */
export interface WikiCategory {
  /** Unique identifier (slug format recommended) */
  id: string;
  
  /** Display name */
  name: string;
  
  /** Icon identifier (maps to Lucide icons) */
  icon: WikiCategoryIcon;
  
  /** Number of articles in this category (computed) */
  count: number;
}

/**
 * Available category icons (Lucide React icons)
 */
export type WikiCategoryIcon = 
  | 'rocket'      // Getting Started
  | 'download'    // Installation
  | 'wrench'      // Troubleshooting
  | 'palette'     // Liveries
  | 'settings'    // Utilities
  | 'book'        // Documentation
  | 'help-circle' // FAQ
  | 'zap'         // Tips & Tricks
  | 'shield'      // Security
  | 'code';       // Development

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

/**
 * Search results response
 */
export interface SearchResponse {
  articles: WikiArticle[];
  query: string;
  totalResults: number;
}

/**
 * Most read articles response
 */
export interface MostReadResponse {
  articles: WikiArticle[];
  limit: number;
}

// =============================================================================
// FILTER & QUERY TYPES
// =============================================================================

/**
 * Article list query parameters
 */
export interface ArticleQueryParams {
  /** Page number (1-indexed) */
  page?: number;
  
  /** Items per page */
  limit?: number;
  
  /** Filter by category ID */
  category?: string;
  
  /** Search query */
  search?: string;
  
  /** Sort field */
  sortBy?: 'createdAt' | 'updatedAt' | 'views' | 'title';
  
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
}

// =============================================================================
// UI STATE TYPES
// =============================================================================

/**
 * Wiki page UI state
 */
export interface WikiPageState {
  searchQuery: string;
  selectedCategory: string | null;
  selectedArticle: WikiArticle | null;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

/**
 * Article modal state
 */
export interface ArticleModalState {
  isOpen: boolean;
  article: WikiArticle | null;
}

// =============================================================================
// ICON MAPPING
// =============================================================================

/**
 * Maps icon identifiers to their display properties
 * Use this with Lucide React icons
 */
export const CATEGORY_ICON_MAP: Record<WikiCategoryIcon, { component: string; label: string }> = {
  'rocket': { component: 'Rocket', label: 'Getting Started' },
  'download': { component: 'Download', label: 'Installation' },
  'wrench': { component: 'Wrench', label: 'Troubleshooting' },
  'palette': { component: 'Palette', label: 'Liveries' },
  'settings': { component: 'Settings', label: 'Utilities' },
  'book': { component: 'Book', label: 'Documentation' },
  'help-circle': { component: 'HelpCircle', label: 'FAQ' },
  'zap': { component: 'Zap', label: 'Tips & Tricks' },
  'shield': { component: 'Shield', label: 'Security' },
  'code': { component: 'Code', label: 'Development' },
};

// =============================================================================
// CONSTANTS
// =============================================================================

/** Default items per page for wiki articles */
export const WIKI_ITEMS_PER_PAGE = 10;

/** Maximum excerpt length */
export const MAX_EXCERPT_LENGTH = 200;

/** Maximum title length */
export const MAX_TITLE_LENGTH = 255;

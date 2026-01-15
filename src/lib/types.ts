export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: 'livery' | 'utility' | 'pack';
  heroImage: string;
  heroVideo?: string;
  description: string;
  features: FeatureItem[];
  faq: FaqItem[];
  gallery: string[];
  specs?: SpecItem[];
  compatibility?: string[];
  releaseDate?: string;
  version?: string;
  marketplaceUrl?: string;
  discordUrl?: string;
  trailerUrl?: string;
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

/** Shared tag definitions for filtering/linking */
export type ProductTag = 'a320' | 'a310' | '737' | 'crj' | 'vr' | 'utility' | 'livery' | 'pack' | 'update' | 'announcement' | 'roadmap' | 'philosophy';

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface NavItem {
  label: string;
  href: string;
}
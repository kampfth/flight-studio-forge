/**
 * CMS Types
 * Data models for the frontend-only CMS
 * Ready for Supabase integration later
 */

// ============= Product =============

export type ProductStatus = 'draft' | 'published' | 'archived';
export type ProductCategory = 'livery' | 'utility' | 'pack' | 'bundle';

export interface CMSFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface CMSFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CMSMediaItem {
  id: string;
  url: string; // dataURL or external URL
  name: string;
  size?: number;
  type?: string;
}

export interface CMSProduct {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  actualVersion: string;
  releaseDate: string; // ISO string
  bannerImage: CMSMediaItem | null;
  features: CMSFeature[];
  gallery: CMSMediaItem[];
  faq: CMSFaqItem[];
  compatibility: string[];
  tags: string[];
  status: ProductStatus;
  marketplaceUrl?: string;
  discordUrl?: string;
  trailerUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type CMSProductInput = Omit<CMSProduct, 'id' | 'createdAt' | 'updatedAt'>;
export type CMSProductUpdate = Partial<CMSProductInput>;

// ============= Patch Note (Changelog) =============

export type PatchNoteStatus = 'draft' | 'published';
export type PatchNoteSectionType = 
  | 'Added' 
  | 'Improved' 
  | 'Fixed' 
  | 'Breaking' 
  | 'Known Issues' 
  | 'Other';

export interface PatchNoteSection {
  id: string;
  type: PatchNoteSectionType;
  items: string[];
}

export interface CMSPatchNote {
  id: string;
  productId: string; // Relation to CMSProduct
  slug: string;
  title: string;
  version: string;
  releaseDate: string; // ISO string
  summary: string;
  bannerImage: CMSMediaItem | null;
  sections: PatchNoteSection[];
  images: CMSMediaItem[];
  tags: string[];
  status: PatchNoteStatus;
  createdAt: string;
  updatedAt: string;
}

export type CMSPatchNoteInput = Omit<CMSPatchNote, 'id' | 'createdAt' | 'updatedAt'>;
export type CMSPatchNoteUpdate = Partial<CMSPatchNoteInput>;

// ============= CMS Config =============

export interface CMSConfig {
  enabled: boolean;
  // Future: auth settings, API endpoints, etc.
}

// ============= Repository Interface =============
// This interface allows swapping localStorage for Supabase

export interface ICMSRepository<T, TInput, TUpdate> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: TInput): Promise<T>;
  update(id: string, data: TUpdate): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

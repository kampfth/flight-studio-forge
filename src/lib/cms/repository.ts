/**
 * CMS Repository
 * CRUD operations for Products and Patch Notes
 * Uses localStorage adapter, ready for Supabase swap
 */

import { storage, STORAGE_KEYS } from './storage';
import { mockProducts, mockPatchNotes } from './mock-data';
import {
  CMSProduct,
  CMSProductInput,
  CMSProductUpdate,
  CMSPatchNote,
  CMSPatchNoteInput,
  CMSPatchNoteUpdate,
  ICMSRepository,
} from './types';

// Utility to generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// ============= Product Repository =============

class ProductRepository implements ICMSRepository<CMSProduct, CMSProductInput, CMSProductUpdate> {
  private storageKey = STORAGE_KEYS.PRODUCTS;

  private async ensureInitialized(): Promise<CMSProduct[]> {
    const data = await storage.get<CMSProduct[]>(this.storageKey);
    if (!data) {
      // Seed with mock data on first load
      await storage.set(this.storageKey, mockProducts);
      return mockProducts;
    }
    return data;
  }

  async getAll(): Promise<CMSProduct[]> {
    return this.ensureInitialized();
  }

  async getById(id: string): Promise<CMSProduct | null> {
    const products = await this.getAll();
    return products.find((p) => p.id === id) || null;
  }

  async getBySlug(slug: string): Promise<CMSProduct | null> {
    const products = await this.getAll();
    return products.find((p) => p.slug === slug) || null;
  }

  async create(data: CMSProductInput): Promise<CMSProduct> {
    const products = await this.getAll();
    const now = new Date().toISOString();
    
    const newProduct: CMSProduct = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    await storage.set(this.storageKey, [...products, newProduct]);
    return newProduct;
  }

  async update(id: string, data: CMSProductUpdate): Promise<CMSProduct | null> {
    const products = await this.getAll();
    const index = products.findIndex((p) => p.id === id);
    
    if (index === -1) return null;

    const updated: CMSProduct = {
      ...products[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    products[index] = updated;
    await storage.set(this.storageKey, products);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const products = await this.getAll();
    const filtered = products.filter((p) => p.id !== id);
    
    if (filtered.length === products.length) return false;

    await storage.set(this.storageKey, filtered);
    return true;
  }

  async search(query: string): Promise<CMSProduct[]> {
    const products = await this.getAll();
    const lowerQuery = query.toLowerCase();
    
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.slug.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
  }
}

// ============= Patch Note Repository =============

class PatchNoteRepository implements ICMSRepository<CMSPatchNote, CMSPatchNoteInput, CMSPatchNoteUpdate> {
  private storageKey = STORAGE_KEYS.PATCH_NOTES;

  private async ensureInitialized(): Promise<CMSPatchNote[]> {
    const data = await storage.get<CMSPatchNote[]>(this.storageKey);
    if (!data) {
      // Seed with mock data on first load
      await storage.set(this.storageKey, mockPatchNotes);
      return mockPatchNotes;
    }
    return data;
  }

  async getAll(): Promise<CMSPatchNote[]> {
    return this.ensureInitialized();
  }

  async getById(id: string): Promise<CMSPatchNote | null> {
    const notes = await this.getAll();
    return notes.find((n) => n.id === id) || null;
  }

  async getBySlug(slug: string): Promise<CMSPatchNote | null> {
    const notes = await this.getAll();
    return notes.find((n) => n.slug === slug) || null;
  }

  async getByProductId(productId: string): Promise<CMSPatchNote[]> {
    const notes = await this.getAll();
    return notes.filter((n) => n.productId === productId);
  }

  async create(data: CMSPatchNoteInput): Promise<CMSPatchNote> {
    const notes = await this.getAll();
    const now = new Date().toISOString();
    
    const newNote: CMSPatchNote = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };

    await storage.set(this.storageKey, [...notes, newNote]);
    return newNote;
  }

  async update(id: string, data: CMSPatchNoteUpdate): Promise<CMSPatchNote | null> {
    const notes = await this.getAll();
    const index = notes.findIndex((n) => n.id === id);
    
    if (index === -1) return null;

    const updated: CMSPatchNote = {
      ...notes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    notes[index] = updated;
    await storage.set(this.storageKey, notes);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const notes = await this.getAll();
    const filtered = notes.filter((n) => n.id !== id);
    
    if (filtered.length === notes.length) return false;

    await storage.set(this.storageKey, filtered);
    return true;
  }

  async search(query: string): Promise<CMSPatchNote[]> {
    const notes = await this.getAll();
    const lowerQuery = query.toLowerCase();
    
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(lowerQuery) ||
        n.version.toLowerCase().includes(lowerQuery) ||
        n.summary.toLowerCase().includes(lowerQuery)
    );
  }
}

// Export singleton instances
// CMS: Replace these with Supabase repositories when ready
export const productRepository = new ProductRepository();
export const patchNoteRepository = new PatchNoteRepository();

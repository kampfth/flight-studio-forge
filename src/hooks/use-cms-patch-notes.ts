/**
 * Hook: useCMSPatchNotes
 * CRUD operations for CMS Patch Notes
 * Abstracts repository layer for React components
 */

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  patchNoteRepository,
  CMSPatchNote, 
  CMSPatchNoteInput, 
  CMSPatchNoteUpdate 
} from '@/lib/cms';

interface UseCMSPatchNotesReturn {
  patchNotes: CMSPatchNote[];
  loading: boolean;
  error: string | null;
  // CRUD operations
  createPatchNote: (data: CMSPatchNoteInput) => Promise<CMSPatchNote | null>;
  updatePatchNote: (id: string, data: CMSPatchNoteUpdate) => Promise<CMSPatchNote | null>;
  deletePatchNote: (id: string) => Promise<boolean>;
  getPatchNote: (id: string) => Promise<CMSPatchNote | null>;
  getPatchNoteBySlug: (slug: string) => Promise<CMSPatchNote | null>;
  getPatchNotesByProduct: (productId: string) => Promise<CMSPatchNote[]>;
  // Utilities
  searchPatchNotes: (query: string) => Promise<CMSPatchNote[]>;
  refreshPatchNotes: () => Promise<void>;
}

export function useCMSPatchNotes(): UseCMSPatchNotesReturn {
  const [patchNotes, setPatchNotes] = useState<CMSPatchNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPatchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await patchNoteRepository.getAll();
      setPatchNotes(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch patch notes';
      setError(message);
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPatchNotes();
  }, [fetchPatchNotes]);

  const createPatchNote = useCallback(async (data: CMSPatchNoteInput): Promise<CMSPatchNote | null> => {
    try {
      const note = await patchNoteRepository.create(data);
      setPatchNotes((prev) => [...prev, note]);
      toast({ title: 'Success', description: 'Patch note created successfully' });
      return note;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create patch note';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return null;
    }
  }, [toast]);

  const updatePatchNote = useCallback(async (id: string, data: CMSPatchNoteUpdate): Promise<CMSPatchNote | null> => {
    try {
      const note = await patchNoteRepository.update(id, data);
      if (note) {
        setPatchNotes((prev) => prev.map((n) => (n.id === id ? note : n)));
        toast({ title: 'Success', description: 'Patch note updated successfully' });
      }
      return note;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update patch note';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return null;
    }
  }, [toast]);

  const deletePatchNote = useCallback(async (id: string): Promise<boolean> => {
    try {
      const success = await patchNoteRepository.delete(id);
      if (success) {
        setPatchNotes((prev) => prev.filter((n) => n.id !== id));
        toast({ title: 'Success', description: 'Patch note deleted successfully' });
      }
      return success;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete patch note';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return false;
    }
  }, [toast]);

  const getPatchNote = useCallback(async (id: string): Promise<CMSPatchNote | null> => {
    return patchNoteRepository.getById(id);
  }, []);

  const getPatchNoteBySlug = useCallback(async (slug: string): Promise<CMSPatchNote | null> => {
    return patchNoteRepository.getBySlug(slug);
  }, []);

  const getPatchNotesByProduct = useCallback(async (productId: string): Promise<CMSPatchNote[]> => {
    return patchNoteRepository.getByProductId(productId);
  }, []);

  const searchPatchNotes = useCallback(async (query: string): Promise<CMSPatchNote[]> => {
    return patchNoteRepository.search(query);
  }, []);

  return {
    patchNotes,
    loading,
    error,
    createPatchNote,
    updatePatchNote,
    deletePatchNote,
    getPatchNote,
    getPatchNoteBySlug,
    getPatchNotesByProduct,
    searchPatchNotes,
    refreshPatchNotes: fetchPatchNotes,
  };
}

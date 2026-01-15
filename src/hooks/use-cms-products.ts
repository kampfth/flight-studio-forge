/**
 * Hook: useCMSProducts
 * CRUD operations for CMS Products
 * Abstracts repository layer for React components
 */

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  productRepository,
  CMSProduct, 
  CMSProductInput, 
  CMSProductUpdate 
} from '@/lib/cms';

interface UseCMSProductsReturn {
  products: CMSProduct[];
  loading: boolean;
  error: string | null;
  // CRUD operations
  createProduct: (data: CMSProductInput) => Promise<CMSProduct | null>;
  updateProduct: (id: string, data: CMSProductUpdate) => Promise<CMSProduct | null>;
  deleteProduct: (id: string) => Promise<boolean>;
  getProduct: (id: string) => Promise<CMSProduct | null>;
  getProductBySlug: (slug: string) => Promise<CMSProduct | null>;
  // Utilities
  searchProducts: (query: string) => Promise<CMSProduct[]>;
  refreshProducts: () => Promise<void>;
}

export function useCMSProducts(): UseCMSProductsReturn {
  const [products, setProducts] = useState<CMSProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productRepository.getAll();
      setProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(message);
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = useCallback(async (data: CMSProductInput): Promise<CMSProduct | null> => {
    try {
      const product = await productRepository.create(data);
      setProducts((prev) => [...prev, product]);
      toast({ title: 'Success', description: 'Product created successfully' });
      return product;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create product';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return null;
    }
  }, [toast]);

  const updateProduct = useCallback(async (id: string, data: CMSProductUpdate): Promise<CMSProduct | null> => {
    try {
      const product = await productRepository.update(id, data);
      if (product) {
        setProducts((prev) => prev.map((p) => (p.id === id ? product : p)));
        toast({ title: 'Success', description: 'Product updated successfully' });
      }
      return product;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update product';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return null;
    }
  }, [toast]);

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    try {
      const success = await productRepository.delete(id);
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast({ title: 'Success', description: 'Product deleted successfully' });
      }
      return success;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete product';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return false;
    }
  }, [toast]);

  const getProduct = useCallback(async (id: string): Promise<CMSProduct | null> => {
    return productRepository.getById(id);
  }, []);

  const getProductBySlug = useCallback(async (slug: string): Promise<CMSProduct | null> => {
    return productRepository.getBySlug(slug);
  }, []);

  const searchProducts = useCallback(async (query: string): Promise<CMSProduct[]> => {
    return productRepository.search(query);
  }, []);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductBySlug,
    searchProducts,
    refreshProducts: fetchProducts,
  };
}

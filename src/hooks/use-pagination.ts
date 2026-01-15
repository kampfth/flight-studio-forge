import { useState, useMemo, useCallback } from 'react';

interface UsePaginationOptions<T> {
  items: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
}

export function usePagination<T>({ items, itemsPerPage }: UsePaginationOptions<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => 
    Math.ceil(items.length / itemsPerPage), 
    [items.length, itemsPerPage]
  );

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, currentPage, itemsPerPage]);

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (hasNextPage) setCurrentPage(p => p + 1);
  }, [hasNextPage]);

  const prevPage = useCallback(() => {
    if (hasPrevPage) setCurrentPage(p => p - 1);
  }, [hasPrevPage]);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  };
}

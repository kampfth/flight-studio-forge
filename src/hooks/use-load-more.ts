import { useState, useMemo, useCallback } from 'react';

interface UseLoadMoreOptions<T> {
  items: T[];
  initialCount: number;
  increment: number;
}

interface UseLoadMoreReturn<T> {
  visibleItems: T[];
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
  loadedCount: number;
  totalCount: number;
}

export function useLoadMore<T>({ items, initialCount, increment }: UseLoadMoreOptions<T>): UseLoadMoreReturn<T> {
  const [loadedCount, setLoadedCount] = useState(initialCount);

  const visibleItems = useMemo(() => 
    items.slice(0, loadedCount), 
    [items, loadedCount]
  );

  const hasMore = loadedCount < items.length;
  const totalCount = items.length;

  const loadMore = useCallback(() => {
    setLoadedCount(prev => Math.min(prev + increment, items.length));
  }, [increment, items.length]);

  const reset = useCallback(() => {
    setLoadedCount(initialCount);
  }, [initialCount]);

  return {
    visibleItems,
    hasMore,
    loadMore,
    reset,
    loadedCount,
    totalCount,
  };
}

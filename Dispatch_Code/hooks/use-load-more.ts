/**
 * Hook: useLoadMore
 * 
 * Responsibility: Gerencia paginação "Load More" para listas
 * 
 * Features:
 * - Contagem inicial configurável
 * - Incremento configurável
 * - Função reset para reiniciar
 * - Memoização para performance
 * 
 * Usage:
 * ```tsx
 * const { visibleItems, hasMore, loadMore, reset, loadedCount, totalCount } = useLoadMore({
 *   items: myItems,
 *   initialCount: 5,
 *   increment: 5,
 * });
 * ```
 */

import { useState, useMemo, useCallback } from 'react';

// =============================================================================
// INTERFACES
// =============================================================================

interface UseLoadMoreOptions<T> {
  /** Array completo de items */
  items: T[];
  /** Quantidade inicial de items visíveis */
  initialCount: number;
  /** Quantidade de items a carregar por clique */
  increment: number;
}

interface UseLoadMoreReturn<T> {
  /** Items atualmente visíveis */
  visibleItems: T[];
  /** Se há mais items para carregar */
  hasMore: boolean;
  /** Função para carregar mais items */
  loadMore: () => void;
  /** Função para resetar para o estado inicial */
  reset: () => void;
  /** Quantidade de items carregados */
  loadedCount: number;
  /** Quantidade total de items */
  totalCount: number;
}

// =============================================================================
// HOOK
// =============================================================================

export function useLoadMore<T>({ 
  items, 
  initialCount, 
  increment 
}: UseLoadMoreOptions<T>): UseLoadMoreReturn<T> {
  // Estado: quantidade de items carregados
  const [loadedCount, setLoadedCount] = useState(initialCount);

  // Memoiza os items visíveis
  const visibleItems = useMemo(() => 
    items.slice(0, loadedCount), 
    [items, loadedCount]
  );

  // Verifica se há mais items
  const hasMore = loadedCount < items.length;
  
  // Total de items
  const totalCount = items.length;

  // Carrega mais items
  const loadMore = useCallback(() => {
    setLoadedCount(prev => Math.min(prev + increment, items.length));
  }, [increment, items.length]);

  // Reseta para o estado inicial
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

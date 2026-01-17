/**
 * Constants Library
 * 
 * Responsibility: Constantes e configurações para a página Dispatch
 * 
 * Usage:
 * ```tsx
 * import { PLACEHOLDERS, DISPATCH_CONFIG } from '@/lib/constants';
 * ```
 */

// =============================================================================
// CONFIGURAÇÕES DE DISPATCH
// =============================================================================

export const DISPATCH_CONFIG = {
  /** Quantidade inicial de posts exibidos */
  INITIAL_POSTS: 5,
  /** Quantidade de posts carregados por Load More */
  LOAD_INCREMENT: 5,
  /** Máximo de tags exibidas por card */
  MAX_TAGS_PER_CARD: 3,
} as const;

// =============================================================================
// PLACEHOLDER IMAGES
// Substitua pelos seus caminhos de imagem reais
// =============================================================================

export const PLACEHOLDERS = {
  /** Imagens para posts de dispatch */
  dispatch: [
    '/placeholders/dispatch-01.jpg',
    '/placeholders/dispatch-02.jpg',
    '/placeholders/dispatch-03.jpg',
    '/placeholders/dispatch-04.jpg',
    '/placeholders/dispatch-05.jpg',
    '/placeholders/dispatch-06.jpg',
  ],
  /** Imagens para produtos (usado em related products) */
  products: [
    '/placeholders/product-01.jpg',
    '/placeholders/product-02.jpg',
    '/placeholders/product-03.jpg',
    '/placeholders/product-04.jpg',
  ],
} as const;

// =============================================================================
// NAVEGAÇÃO (OPCIONAL)
// =============================================================================

export const NAV_ITEMS = [
  { label: 'Hangar', href: '/products' },
  { label: 'Dispatch', href: '/dispatch' },
  { label: 'Brand', href: '/brand' },
  { label: 'Contact', href: '/contact' },
] as const;

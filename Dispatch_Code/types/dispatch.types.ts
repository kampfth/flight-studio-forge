/**
 * Type Definitions: Dispatch
 * 
 * Responsibility: Interfaces TypeScript para o sistema de Dispatch/Blog
 * 
 * Usage:
 * ```tsx
 * import { DispatchPost } from '@/types/dispatch.types';
 * ```
 */

// =============================================================================
// DISPATCH POST
// =============================================================================

/**
 * Interface principal para um post de Dispatch
 */
export interface DispatchPost {
  /** Identificador único usado na URL (ex: "neo-minimal-update-120") */
  slug: string;
  
  /** Título do post */
  title: string;
  
  /** Data de publicação no formato ISO (ex: "2024-12-10") */
  date: string;
  
  /** Resumo curto exibido na listagem (máx ~150 caracteres) */
  excerpt: string;
  
  /** 
   * Conteúdo completo do post em markdown simples
   * Suporta:
   * - **texto** para headers
   * - - item para listas
   * - Parágrafos normais
   */
  content: string;
  
  /** Caminho da imagem destacada (opcional) */
  image?: string;
  
  /** Array de tags para categorização e filtros */
  tags: string[];
  
  /** 
   * Array de slugs de produtos relacionados (opcional)
   * Usado para vincular posts a produtos específicos
   */
  relatedProducts?: string[];
}

// =============================================================================
// TIPOS AUXILIARES
// =============================================================================

/**
 * Tags disponíveis para posts de Dispatch
 * Ajuste conforme necessário para seu projeto
 */
export type DispatchTag = 
  | 'update'
  | 'announcement'
  | 'roadmap'
  | 'philosophy'
  | 'livery'
  | 'utility'
  | 'pack'
  | 'vr'
  | 'a320'
  | 'a310'
  | '737'
  | 'crj';

/**
 * Estado do filtro de tags
 */
export type TagFilterState = string | null;

/**
 * Props para o componente de card de dispatch
 */
export interface DispatchCardProps {
  post: DispatchPost;
  index: number;
  placeholderImage?: string;
}

/**
 * Props para o componente de filtros de tag
 */
export interface TagFiltersProps {
  tags: string[];
  activeTag: TagFilterState;
  onTagChange: (tag: TagFilterState) => void;
}

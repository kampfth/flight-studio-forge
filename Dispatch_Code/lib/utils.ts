/**
 * Utilities Library
 * 
 * Responsibility: Funções utilitárias gerais
 * 
 * Usage:
 * ```tsx
 * import { cn } from '@/lib/utils';
 * ```
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes Tailwind com suporte a condicionais
 * Usa clsx para lógica condicional e tailwind-merge para resolver conflitos
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata uma data ISO para exibição
 * 
 * @example
 * formatDate('2024-12-10') // "Dec 10, 2024"
 */
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options || defaultOptions);
}

/**
 * Formata data completa para posts individuais
 * 
 * @example
 * formatDateLong('2024-12-10') // "December 10, 2024"
 */
export function formatDateLong(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Trunca texto com ellipsis
 * 
 * @example
 * truncate('Long text here', 10) // "Long text..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

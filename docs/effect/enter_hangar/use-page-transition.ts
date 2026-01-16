/**
 * usePageTransition - Hook para gerenciar a transição de página
 * 
 * Controla o estado da animação e garante que a navegação
 * aconteça mesmo se a animação falhar (fallback de 700ms).
 * 
 * @requires react-router-dom
 */

import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePageTransition() {
  // Estado que ativa/desativa o componente PageTransition
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Ref para guardar o destino (evita problemas de closure)
  const targetPathRef = useRef<string | null>(null);
  
  // Hook de navegação do React Router
  const navigate = useNavigate();

  /**
   * Inicia a transição para uma rota
   * @param path - Caminho de destino (ex: '/products')
   */
  const startTransition = useCallback((path: string) => {
    targetPathRef.current = path;
    setIsTransitioning(true);
    
    // FALLBACK DE SEGURANÇA
    // Se onAnimationComplete não disparar, navega após 700ms
    setTimeout(() => {
      if (targetPathRef.current) {
        navigate(targetPathRef.current);
        setIsTransitioning(false);
        targetPathRef.current = null;
      }
    }, 700);
  }, [navigate]);

  /**
   * Callback para quando a animação termina
   * Chamado pelo onAnimationComplete do PageTransition
   */
  const completeTransition = useCallback(() => {
    if (targetPathRef.current) {
      navigate(targetPathRef.current);
      targetPathRef.current = null;
    }
    setIsTransitioning(false);
  }, [navigate]);

  return {
    /** true enquanto animação está rodando */
    isTransitioning,
    /** Função para iniciar transição */
    startTransition,
    /** Callback para finalizar transição */
    completeTransition,
  };
}

/**
 * Hook: usePageTransition
 * Responsibility: Manage page transition state and navigation
 */
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const targetPathRef = useRef<string | null>(null);
  const navigate = useNavigate();

  const startTransition = useCallback((path: string) => {
    targetPathRef.current = path;
    setIsTransitioning(true);
    
    // Fallback: navigate after 800ms even if animation callback fails
    setTimeout(() => {
      if (targetPathRef.current) {
        navigate(targetPathRef.current);
        setIsTransitioning(false);
        targetPathRef.current = null;
      }
    }, 700);
  }, [navigate]);

  const completeTransition = useCallback(() => {
    if (targetPathRef.current) {
      navigate(targetPathRef.current);
      targetPathRef.current = null;
    }
    setIsTransitioning(false);
  }, [navigate]);

  return {
    isTransitioning,
    startTransition,
    completeTransition,
  };
}

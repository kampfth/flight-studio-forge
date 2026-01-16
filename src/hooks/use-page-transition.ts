/**
 * Hook: usePageTransition
 * Responsibility: Manage page transition state and navigation
 */
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const navigate = useNavigate();

  const startTransition = useCallback((path: string) => {
    setTargetPath(path);
    setIsTransitioning(true);
  }, []);

  const completeTransition = useCallback(() => {
    if (targetPath) {
      navigate(targetPath);
    }
    setIsTransitioning(false);
    setTargetPath(null);
  }, [navigate, targetPath]);

  return {
    isTransitioning,
    startTransition,
    completeTransition,
  };
}

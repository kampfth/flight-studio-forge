/**
 * PageTransition - Efeito visual de transição "Warp Drive"
 * 
 * Cria uma animação de viagem espacial com:
 * - Zoom radial acelerado
 * - Linhas de velocidade (speed streaks)
 * - Fade to black final
 * 
 * @requires framer-motion
 */

import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  /** Ativa/desativa a animação */
  isActive: boolean;
  /** Callback quando animação termina */
  onComplete?: () => void;
}

export function PageTransition({ isActive, onComplete }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* ========================================
              CAMADA 1: Radial Motion Blur
              Gradiente que escurece das bordas pro centro
              Scale 1 → 2.5 = efeito de zoom
          ======================================== */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                circle at center, 
                transparent 0%, 
                transparent 20%, 
                hsl(var(--background) / 0.3) 60%, 
                hsl(var(--background)) 100%
              )`,
            }}
            initial={{ 
              scale: 1,
              opacity: 0,
            }}
            animate={{ 
              scale: 2.5,
              opacity: [0, 0.8, 1],
            }}
            transition={{ 
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1], // Aceleração forte, desaceleração suave
            }}
          />

          {/* ========================================
              CAMADA 2: Speed Streaks (Linhas de Velocidade)
              Gradiente cônico repetido = linhas radiais
              Rotate 0 → 15° = sensação de movimento
          ======================================== */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `repeating-conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg,
                hsl(var(--primary) / 0.1) 0.5deg,
                transparent 1deg
              )`,
            }}
            initial={{ 
              scale: 1, 
              opacity: 0,
              rotate: 0,
            }}
            animate={{ 
              scale: 3,
              opacity: [0, 0.4, 0],
              rotate: 15,
            }}
            transition={{ 
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* ========================================
              CAMADA 3: Blackout Final
              Fade to black antes de mostrar nova página
              onAnimationComplete dispara navegação
          ======================================== */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.25,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={onComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

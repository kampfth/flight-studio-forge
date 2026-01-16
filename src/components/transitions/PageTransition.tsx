/**
 * Component: PageTransition
 * Responsibility: Warp drive transition - fast zoom with radial motion blur
 */
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  isActive: boolean;
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
          {/* Radial motion blur overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, transparent 20%, hsl(var(--background) / 0.3) 60%, hsl(var(--background)) 100%)',
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
              ease: [0.16, 1, 0.3, 1], // Strong acceleration, smooth deceleration
            }}
          />

          {/* Speed streaks - radial blur effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                repeating-conic-gradient(
                  from 0deg at 50% 50%,
                  transparent 0deg,
                  hsl(var(--primary) / 0.1) 0.5deg,
                  transparent 1deg
                )
              `,
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

          {/* Final fade to black */}
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

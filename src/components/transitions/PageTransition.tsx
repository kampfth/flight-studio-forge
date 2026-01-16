/**
 * Component: PageTransition
 * Responsibility: Cinematic page transition overlay with warp effect
 */
import { motion, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';

interface PageTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function PageTransition({ isActive, onComplete }: PageTransitionProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationComplete={onComplete}
        >
          {/* Radial warp effect from center */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ scale: 0, borderRadius: '100%' }}
            animate={{ 
              scale: 3,
              borderRadius: '0%',
              transition: { 
                duration: 0.8, 
                ease: [0.76, 0, 0.24, 1] 
              }
            }}
            style={{ transformOrigin: 'center center' }}
          />

          {/* Speed lines radiating from center */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent origin-left"
              style={{
                width: '150vw',
                rotate: `${i * 30}deg`,
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 1],
                opacity: [0, 1, 0],
                transition: {
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }
              }}
            />
          ))}

          {/* Center expanding ring */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary"
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{
              width: ['0px', '200vw'],
              height: ['0px', '200vw'],
              opacity: [1, 0],
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
            }}
          />

          {/* Secondary ring */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50"
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{
              width: ['0px', '180vw'],
              height: ['0px', '180vw'],
              opacity: [1, 0],
              transition: { duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }
            }}
          />

          {/* Flying plane icon */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              scale: [1, 1.5, 30],
              opacity: [1, 1, 0],
              rotate: [0, 0, 15],
              transition: { 
                duration: 0.7, 
                ease: [0.76, 0, 0.24, 1],
                times: [0, 0.3, 1]
              }
            }}
          >
            <div className="relative">
              <Plane size={48} className="text-primary" />
              {/* Glow behind plane */}
              <motion.div
                className="absolute inset-0 blur-xl"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <Plane size={48} className="text-primary" />
              </motion.div>
            </div>
          </motion.div>

          {/* Vignette effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1],
              transition: { duration: 0.5, delay: 0.2 }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

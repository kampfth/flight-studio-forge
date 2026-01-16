/**
 * Component: PageTransition
 * Responsibility: Warp zoom transition - zooms into the page like traveling through it
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
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          {/* Zoom blur overlay - creates the warp effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 80%)',
            }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ 
              opacity: [0, 0.3, 1],
              scale: [1, 1.5, 3],
            }}
            transition={{ 
              duration: 0.7, 
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={onComplete}
          />

          {/* Radial speed lines - subtle warp streaks */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-[1px] origin-left"
                style={{
                  width: '60vw',
                  left: '50%',
                  background: `linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.4) 50%, transparent 100%)`,
                  rotate: `${i * 15}deg`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: [0, 1.5],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.01,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            ))}
          </div>

          {/* Center focal point - where you're "traveling to" */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20"
            initial={{ width: 4, height: 4, opacity: 1 }}
            animate={{
              width: [4, 20, 8],
              height: [4, 20, 8],
              opacity: [1, 1, 0],
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ filter: 'blur(2px)' }}
          />

          {/* Expanding rings - depth effect */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{
                width: '300vw',
                height: '300vw',
                opacity: 0,
              }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.08,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          ))}

          {/* Final blackout */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.4,
              ease: 'easeOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Motion Library
 * Responsibility: Centralized Framer Motion variants, transitions, and helpers
 * Used by: All animated components throughout the application
 */
import { Variants, Transition } from 'framer-motion';
import { useState, useEffect } from 'react';

// =============================================================================
// REDUCED MOTION HOOK
// =============================================================================

/**
 * Hook to detect user preference for reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

// =============================================================================
// TRANSITIONS
// =============================================================================

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const smoothTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.4,
};

export const quickTransition: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.2,
};

export const slowTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.8,
};

// Fade + Translate Up animation
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(8px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: smoothTransition,
  },
};

// Fade + Translate with blur
export const blurIn: Variants = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(20px)',
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Stagger children animation - enhanced
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

// Stagger item animation - enhanced
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(8px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Scale in animation - enhanced
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.85,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Slide in from left - enhanced
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60,
    filter: 'blur(8px)',
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Slide in from right - enhanced
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60,
    filter: 'blur(8px)',
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Hover tilt effect for cards (use with whileHover)
export const hoverTilt = {
  rotateX: 2,
  rotateY: -2,
  scale: 1.02,
  transition: springTransition,
};

// Hover scale effect
export const hoverScale = {
  scale: 1.05,
  transition: springTransition,
};

// Button press effect
export const tapScale = {
  scale: 0.97,
};

// Page transition variants - enhanced
export const pageTransition: Variants = {
  initial: { 
    opacity: 0,
    filter: 'blur(12px)',
    y: 20,
  },
  animate: { 
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: { 
    opacity: 0,
    filter: 'blur(8px)',
    y: -10,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
};

// Lightbox animation
export const lightboxOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export const lightboxContent: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.85,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    transition: springTransition,
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    filter: 'blur(5px)',
    transition: quickTransition,
  },
};

// BIDIRECTIONAL section reveal (scroll up/down responsive)
export const sectionReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    filter: 'blur(12px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Card reveal with 3D perspective
export const cardReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    rotateX: 15,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Float animation for decorative elements
export const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Pulse glow animation
export const pulseGlow = {
  scale: [1, 1.05, 1],
  opacity: [0.5, 0.8, 0.5],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Rotating gradient animation
export const rotateGradient = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear',
  },
};

// Magnetic hover effect values
export const magneticHover = {
  scale: 1.02,
  rotateX: 5,
  rotateY: -5,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  },
};

// Staggered grid animation
export const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const gridItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Text reveal with split animation
export const textReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 100,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Glitch effect for futuristic elements
export const glitchEffect = {
  x: [0, -2, 2, -1, 1, 0],
  transition: {
    duration: 0.3,
    ease: 'easeInOut',
  },
};
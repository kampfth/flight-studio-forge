/**
 * Motion Library
 * 
 * Responsibility: Variantes e transições Framer Motion para a página Dispatch
 * 
 * Usage:
 * ```tsx
 * import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion';
 * ```
 */

import { Variants, Transition } from 'framer-motion';

// =============================================================================
// TRANSITIONS
// =============================================================================

/** Transição spring para efeitos responsivos */
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

/** Transição suave padrão */
export const smoothTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.4,
};

/** Transição rápida para interações */
export const quickTransition: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.2,
};

// =============================================================================
// VARIANTS - USADO NA DISPATCH PAGE
// =============================================================================

/**
 * Fade + Translate Up animation
 * Usado para headers e elementos que entram de baixo
 */
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

/**
 * Container para animações stagger
 * Usado para listas de cards
 */
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

/**
 * Item individual do stagger
 * Usado para cada card na lista
 */
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

// =============================================================================
// VARIANTS ADICIONAIS (OPCIONAL)
// =============================================================================

/** Scale in animation */
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

/** Slide in from left */
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

/** Hover tilt effect para cards */
export const hoverTilt = {
  rotateX: 2,
  rotateY: -2,
  scale: 1.02,
  transition: springTransition,
};

/** Hover scale effect */
export const hoverScale = {
  scale: 1.05,
  transition: springTransition,
};

/**
 * Motion Library
 * 
 * @description Biblioteca centralizada de animações Framer Motion
 * @usage Importar variants e helpers nos componentes animados
 * 
 * Principais conceitos:
 * 1. Variants - Estados pré-definidos de animação (hidden/visible)
 * 2. Transitions - Configurações de timing e easing
 * 3. Transforms - Valores dinâmicos baseados em scroll
 */

import { Variants, Transition } from 'framer-motion';
import { useState, useEffect } from 'react';

// =============================================================================
// REDUCED MOTION HOOK
// Respeita preferência do usuário por menos movimento
// =============================================================================

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
// TRANSITIONS - Configurações de timing reutilizáveis
// =============================================================================

/**
 * Spring Transition
 * @description Movimento com física de mola, bom para interações
 */
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

/**
 * Smooth Transition
 * @description Transição suave padrão com cubic-bezier personalizado
 * @easing [0.25, 0.1, 0.25, 1] - Início rápido, fim suave
 */
export const smoothTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.4,
};

/**
 * Quick Transition
 * @description Transição rápida para feedback de interação
 */
export const quickTransition: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.2,
};

/**
 * Slow Transition
 * @description Transição lenta para elementos grandes
 */
export const slowTransition: Transition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.8,
};

// =============================================================================
// VARIANTS - Estados de animação pré-definidos
// =============================================================================

/**
 * Fade Up
 * @description Entrada com fade + translate up + blur
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
 * Blur In
 * @description Entrada com desfoque + scale
 */
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

/**
 * Stagger Container
 * @description Container que orquestra animação escalonada dos filhos
 * @property staggerChildren - Delay entre cada filho (0.1s)
 * @property delayChildren - Delay antes de começar (0.15s)
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
 * Stagger Item
 * @description Item filho para uso com staggerContainer
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

/**
 * Scale In
 * @description Entrada com scale up
 */
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

/**
 * Slide In Left
 * @description Entrada deslizando da esquerda
 */
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

/**
 * Slide In Right
 * @description Entrada deslizando da direita
 */
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

// =============================================================================
// HOVER EFFECTS - Para uso com whileHover
// =============================================================================

/**
 * Hover Tilt
 * @description Efeito de inclinação 3D no hover
 */
export const hoverTilt = {
  rotateX: 2,
  rotateY: -2,
  scale: 1.02,
  transition: springTransition,
};

/**
 * Hover Scale
 * @description Zoom simples no hover
 */
export const hoverScale = {
  scale: 1.05,
  transition: springTransition,
};

/**
 * Tap Scale
 * @description Efeito de pressionar (para whileTap)
 */
export const tapScale = {
  scale: 0.97,
};

// =============================================================================
// PAGE TRANSITION
// =============================================================================

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

// =============================================================================
// SECTION REVEAL - Bidirectional (once: false)
// =============================================================================

/**
 * Section Reveal
 * @description Animação de entrada para seções inteiras
 * @note Use com viewport={{ once: false }} para bidirecional
 */
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

/**
 * Card Reveal
 * @description Animação com perspectiva 3D para cards
 */
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

// =============================================================================
// CONTINUOUS ANIMATIONS - Para uso com animate
// =============================================================================

/**
 * Float Animation
 * @description Flutuação suave contínua
 */
export const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/**
 * Pulse Glow
 * @description Pulsação de brilho
 */
export const pulseGlow = {
  scale: [1, 1.05, 1],
  opacity: [0.5, 0.8, 0.5],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/**
 * Rotate Gradient
 * @description Rotação contínua (para backgrounds)
 */
export const rotateGradient = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear',
  },
};

/**
 * Magnetic Hover
 * @description Efeito magnético com perspectiva
 */
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

// =============================================================================
// STAGGER GRID - Para grids de cards
// =============================================================================

/**
 * Stagger Grid
 * @description Container para grid com stagger mais rápido
 */
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

/**
 * Grid Item
 * @description Item de grid com scale + translate
 */
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

/**
 * Text Reveal
 * @description Animação dramática para texto grande
 */
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

/**
 * Glitch Effect
 * @description Efeito de glitch para elementos futuristas
 */
export const glitchEffect = {
  x: [0, -2, 2, -1, 1, 0],
  transition: {
    duration: 0.3,
    ease: 'easeInOut',
  },
};

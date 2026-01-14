import { Variants, Transition } from 'framer-motion';

// Transition presets
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

// Fade + Translate Up animation
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(4px)',
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
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Stagger item animation
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 16,
    filter: 'blur(4px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: smoothTransition,
  },
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: smoothTransition,
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: smoothTransition,
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 20,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: smoothTransition,
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
  scale: 1.03,
  transition: springTransition,
};

// Button press effect
export const tapScale = {
  scale: 0.98,
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { 
    opacity: 0,
    filter: 'blur(8px)',
  },
  animate: { 
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: { 
    opacity: 0,
    filter: 'blur(4px)',
    transition: {
      duration: 0.2,
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
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: springTransition,
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: quickTransition,
  },
};

// Section reveal (for scroll-triggered animations)
export const sectionReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(6px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

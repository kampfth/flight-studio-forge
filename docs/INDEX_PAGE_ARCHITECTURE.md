# Index Page Architecture & Code Documentation

> **Purpose**: Complete technical documentation of the Index (Home) page for AI-assisted development with Cursor or similar tools.
> **Last Updated**: 2026-01-16

---

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Component Hierarchy](#component-hierarchy)
4. [Background System](#background-system)
5. [Animation System](#animation-system)
6. [Typography & Text Effects](#typography--text-effects)
7. [Interactive Elements](#interactive-elements)
8. [Glassmorphism Implementation](#glassmorphism-implementation)
9. [Design Tokens & CSS Variables](#design-tokens--css-variables)
10. [Framer Motion Patterns](#framer-motion-patterns)
11. [Customization Guide](#customization-guide)

---

## Overview

The Index page is a **full-screen immersive hero** (100vh) with no footer, no navigation, and no additional sections. It serves as a dramatic landing experience that directs users to explore the product catalog.

### Key Characteristics

- **Full viewport height**: `h-screen` (100vh)
- **No scroll**: `overflow-hidden` on container
- **Ultra-futuristic aesthetic**: Multi-layer parallax, floating orbs, particles
- **Glassmorphism**: Translucent elements with backdrop blur
- **Mouse-reactive**: Background moves based on cursor position

---

## File Structure

```
src/
├── pages/
│   └── Index.tsx              # Page component (minimal wrapper)
├── components/
│   └── sections/
│       └── hero-section.tsx   # Main hero implementation
├── lib/
│   ├── motion.ts              # Framer Motion variants & presets
│   └── constants.ts           # Brand constants & placeholder paths
└── index.css                  # Global styles & CSS variables
```

---

## Component Hierarchy

```
Index.tsx
└── div.h-screen.overflow-hidden
    └── HeroSection
        ├── section (container)
        │   ├── Background Layers (motion.div)
        │   │   ├── Hero Image (with mouse parallax)
        │   │   ├── Gradient Overlays (3 layers)
        │   │   └── Noise Texture
        │   ├── Grid Overlay
        │   ├── Scanlines (animated opacity)
        │   ├── Floating Orbs (3 orbs)
        │   ├── Floating Particles (12 particles)
        │   ├── Light Streaks (2 horizontal lines)
        │   └── Main Content (motion.div)
        │       ├── Glassmorphic Badge
        │       ├── Headline (h1)
        │       │   ├── "Liveries that" (static)
        │       │   ├── "feel native." (animated gradient)
        │       │   └── "Utilities that fly." (pulsing opacity)
        │       ├── Subheadline (p)
        │       └── CTA Section
        │           ├── Primary Button ("Enter the Hangar")
        │           └── Stats Badge (150+ Products)
        └── /section
```

---

## Background System

The background consists of **5 layered elements** that create depth and motion:

### Layer 1: Hero Image with Mouse Parallax

```tsx
<motion.div 
  className="absolute inset-0"
  style={{ x: moveX, y: moveY }}  // React to mouse position
>
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-125"
    style={{ backgroundImage: `url(${PLACEHOLDERS.hero[0]})` }}
  />
</motion.div>
```

**How it works:**
- `useMotionValue` tracks mouse X/Y as normalized values (0-1)
- `useTransform` maps these to pixel offsets (-30 to +30)
- `useSpring` adds smooth interpolation with damping
- Image is scaled to 125% to allow movement without revealing edges

### Layer 2: Gradient Overlays (3 layers)

```tsx
{/* Top-to-bottom vignette */}
<div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />

{/* Left-right edge fade */}
<div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />

{/* Bottom emphasis */}
<div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/50" />
```

**Purpose:** Creates a cinematic vignette effect that:
- Darkens edges to focus attention on center
- Ensures text remains readable against any image
- Adds depth perception

### Layer 3: Noise Texture

```tsx
<div 
  className="absolute inset-0 opacity-[0.03]" 
  style={{ 
    backgroundImage: 'url("data:image/svg+xml,...")' 
  }} 
/>
```

**SVG Filter:**
```xml
<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
```

**Purpose:** Adds subtle grain texture for a premium, analog feel.

### Layer 4: Grid Overlay

```tsx
<div className="absolute inset-0 grid-overlay opacity-30" />
```

**CSS Definition (index.css):**
```css
.grid-overlay {
  background-image: 
    linear-gradient(hsl(var(--foreground) / 0.02) 1px, transparent 1px),
    linear-gradient(90deg, hsl(var(--foreground) / 0.02) 1px, transparent 1px);
  background-size: 80px 80px;
}
```

**Purpose:** Tech/blueprint aesthetic grid pattern.

### Layer 5: Scanlines

```tsx
<motion.div 
  className="absolute inset-0 scanlines opacity-20"
  animate={{ opacity: [0.15, 0.25, 0.15] }}
  transition={{ duration: 4, repeat: Infinity }}
/>
```

**CSS Definition (index.css):**
```css
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    hsl(0 0% 0% / 0.03) 2px,
    hsl(0 0% 0% / 0.03) 4px
  );
  pointer-events: none;
}
```

**Purpose:** CRT monitor effect with animated opacity pulsing.

---

## Animation System

### Floating Orbs

Three large gradient orbs float with complex keyframe animations:

```tsx
<motion.div
  className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
  style={{
    background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 60%)',
    filter: 'blur(80px)',
    top: '-20%',
    left: '-10%',
  }}
  animate={{
    x: [0, 150, 50, 0],      // 4-keyframe X path
    y: [0, -80, 30, 0],      // 4-keyframe Y path
    scale: [1, 1.3, 0.9, 1], // Breathing scale
  }}
  transition={{
    duration: 25,            // Full cycle duration
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```

**Orb Configurations:**

| Orb | Size | Position | Color | Duration | Delay |
|-----|------|----------|-------|----------|-------|
| 1 | 800px | top:-20%, left:-10% | primary/0.2 | 25s | 0s |
| 2 | 600px | bottom:-10%, right:-5% | accent/0.15 | 20s | 3s |
| 3 | 400px | top:40%, right:20% | primary/0.1 | 15s | 5s |

### Floating Particles

12 particles with varying sizes and animation timings:

```tsx
{[...Array(12)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute rounded-full bg-primary/50 pointer-events-none"
    style={{
      width: `${2 + (i % 3) * 2}px`,   // 2px, 4px, or 6px
      height: `${2 + (i % 3) * 2}px`,
      left: `${10 + i * 7}%`,          // Spread across 10-87%
      top: `${20 + (i % 4) * 18}%`,    // 4 rows: 20%, 38%, 56%, 74%
      boxShadow: '0 0 10px hsl(var(--primary) / 0.5)',  // Glow
    }}
    animate={{
      y: [0, -50 - i * 5, 0],          // Varying float heights
      x: [0, (i % 2 === 0 ? 20 : -20), 0],  // Alternating X drift
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 4 + i * 0.5,           // 4s to 9.5s
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.4,                  // Staggered start
    }}
  />
))}
```

### Light Streaks

Horizontal light lines that pulse:

```tsx
<motion.div
  className="absolute left-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
  style={{ top: '30%', width: '100%' }}
  animate={{ 
    opacity: [0, 0.5, 0],
    scaleX: [0.5, 1, 0.5],
  }}
  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
/>
```

---

## Typography & Text Effects

### Headline Structure

```tsx
<motion.h1
  variants={staggerItem}
  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold tracking-tight mb-8 leading-[1]"
>
```

**Responsive Sizes:**
- Mobile (default): `text-5xl` (3rem / 48px)
- Small: `text-6xl` (3.75rem / 60px)
- Medium: `text-7xl` (4.5rem / 72px)
- Large: `text-8xl` (6rem / 96px)

### Animated Gradient Text

```tsx
<motion.span 
  className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
  animate={{ backgroundPosition: ['0%', '200%'] }}
  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
>
  feel native.
</motion.span>
```

**How it works:**
1. `bg-[length:200%_auto]` - Gradient is 200% width of element
2. `bg-clip-text text-transparent` - Text becomes gradient mask
3. `backgroundPosition` animates from 0% to 200%
4. Creates seamless looping gradient shift

### Underline Glow Effect

```tsx
<motion.div
  className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
  initial={{ width: 0, opacity: 0 }}
  animate={{ width: '80%', opacity: 1 }}
  transition={{ delay: 0.8, duration: 0.8 }}
/>
```

---

## Interactive Elements

### Primary CTA Button

```tsx
<motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
>
  <Button 
    asChild 
    size="lg" 
    className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 px-10 py-6 text-base rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
  >
    <Link to="/products">
      <span className="relative z-10 flex items-center gap-2 font-mono font-semibold">
        <Plane size={18} />
        Enter the Hangar
        <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
      </span>
      
      {/* Gradient sweep on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </Link>
  </Button>
</motion.div>
```

**Interactive Effects:**
1. `whileHover={{ scale: 1.03 }}` - Slight grow on hover
2. `whileTap={{ scale: 0.98 }}` - Press feedback
3. Arrow icon slides right via `group-hover:translate-x-1`
4. Gradient sweep animation on hover

### Stats Badge

```tsx
<motion.div 
  className="flex items-center gap-4 px-6 py-3 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
  whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
>
  {/* Rotating icon */}
  <motion.div
    animate={{ rotate: [0, 360] }}
    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
  >
    <Zap size={16} className="text-primary" />
  </motion.div>
  
  {/* Pulsing number */}
  <motion.span 
    className="text-foreground font-bold text-lg"
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    150+
  </motion.span>
</motion.div>
```

---

## Glassmorphism Implementation

### Pattern 1: Ultra Glass (Badge)

```tsx
className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full 
  bg-white/[0.08]           // 8% white background
  backdrop-blur-xl          // Heavy blur (24px)
  border border-white/[0.15] // 15% white border
  shadow-[0_8px_32px_rgba(0,0,0,0.3)]"  // Deep shadow
```

### Pattern 2: Subtle Glass (Stats)

```tsx
className="px-6 py-3 rounded-xl 
  bg-white/[0.05]           // 5% white background
  backdrop-blur-xl          // Heavy blur
  border border-white/[0.1] // 10% white border
  shadow-[0_8px_32px_rgba(0,0,0,0.2)]"  // Medium shadow
```

### Glassmorphism Recipe

| Property | Light Glass | Medium Glass | Heavy Glass |
|----------|-------------|--------------|-------------|
| `bg-white/` | 0.03-0.05 | 0.05-0.08 | 0.08-0.12 |
| `backdrop-blur-` | md (12px) | xl (24px) | 2xl/3xl (40-64px) |
| `border-white/` | 0.05 | 0.1-0.15 | 0.15-0.2 |
| `shadow` | sm | lg | 2xl |

---

## Design Tokens & CSS Variables

### Color System (index.css)

```css
:root {
  /* Base colors */
  --background: 0 0% 2%;           /* Near black */
  --foreground: 0 0% 96%;          /* Near white */
  
  /* Primary accent (Electric Blue) */
  --primary: 220 100% 73%;
  --accent: 220 100% 73%;          /* Same as primary */
  
  /* Surface levels */
  --card: 0 0% 5%;
  --muted: 0 0% 14%;
  --surface-elevated: 0 0% 7%;
  
  /* Text hierarchy */
  --muted-foreground: 0 0% 55%;
  
  /* Effects */
  --glow: 220 100% 73%;
  --shadow-glow: 0 0 30px hsl(220 100% 73% / 0.08);
}
```

### Usage in Components

```tsx
// Using CSS variables in Tailwind
className="text-primary"           // Uses --primary
className="bg-background"          // Uses --background
className="text-muted-foreground"  // Uses --muted-foreground

// Using in inline styles
style={{ 
  background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 60%)' 
}}
```

---

## Framer Motion Patterns

### Stagger Animation (src/lib/motion.ts)

```ts
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,    // 100ms between each child
      delayChildren: 0.15,     // 150ms before first child
    },
  },
};

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
      ease: [0.25, 0.1, 0.25, 1],  // Custom cubic bezier
    },
  },
};
```

### Usage:

```tsx
<motion.div 
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.div variants={staggerItem}>Child 1</motion.div>
  <motion.div variants={staggerItem}>Child 2</motion.div>
  <motion.div variants={staggerItem}>Child 3</motion.div>
</motion.div>
```

### Mouse-Reactive Parallax Pattern

```tsx
// 1. Create motion values
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

// 2. Transform to movement range
const moveX = useSpring(
  useTransform(mouseX, [0, 1], [-30, 30]), 
  { damping: 20, stiffness: 100 }
);

// 3. Track mouse position
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  };
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);

// 4. Apply to element
<motion.div style={{ x: moveX, y: moveY }}>
  {/* Content moves with mouse */}
</motion.div>
```

---

## Customization Guide

### Changing the Hero Image

```tsx
// In hero-section.tsx, line ~73
style={{ backgroundImage: `url(${PLACEHOLDERS.hero[0]})` }}

// Change to custom image:
style={{ backgroundImage: `url('/your-custom-image.jpg')` }}

// Or import and use:
import heroImage from '@/assets/your-image.jpg';
style={{ backgroundImage: `url(${heroImage})` }}
```

### Adjusting Orb Colors

```tsx
// Primary orb
background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 60%)'

// Change color by modifying opacity or using different token:
background: 'radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 60%)'

// Or use custom HSL:
background: 'radial-gradient(circle, hsl(280 100% 60% / 0.2) 0%, transparent 60%)'
```

### Adjusting Animation Speed

```tsx
// Orb animation - change duration
transition={{
  duration: 25,  // Increase for slower, decrease for faster
  repeat: Infinity,
  ease: 'easeInOut',
}}

// Particle animation - modify timing formula
transition={{
  duration: 4 + i * 0.5,  // Base 4s + 0.5s per particle index
  delay: i * 0.4,         // 0.4s stagger between particles
}}
```

### Adding New Decorative Elements

```tsx
// Template for new floating element
<motion.div
  className="absolute pointer-events-none"
  style={{
    // Positioning
    top: '50%',
    left: '50%',
    // Sizing
    width: '100px',
    height: '100px',
    // Visual
    background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
    filter: 'blur(20px)',
    borderRadius: '50%',
  }}
  animate={{
    // Animation keyframes
    y: [0, -20, 0],
    scale: [1, 1.1, 1],
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```

---

## Performance Considerations

1. **`pointer-events-none`** on all decorative elements prevents interference with user interactions
2. **`will-change`** is automatically handled by Framer Motion for animated properties
3. **Large blur values** (80-100px) can be GPU-intensive; reduce on lower-end devices
4. **Particle count** (12) is a balance between visual richness and performance

---

## Integration with Cursor AI

When working with Cursor, reference this documentation for:

1. **Modifying styles**: Check [Glassmorphism Implementation](#glassmorphism-implementation) and [Design Tokens](#design-tokens--css-variables)
2. **Adding animations**: Use patterns from [Framer Motion Patterns](#framer-motion-patterns)
3. **Understanding structure**: Refer to [Component Hierarchy](#component-hierarchy)
4. **Customizing visuals**: Follow [Customization Guide](#customization-guide)

### Example Cursor Prompts

```
"Add a new floating orb to the hero section following the existing pattern"
→ Reference: Layer system + Floating Orbs section

"Change the gradient text animation to be faster"
→ Reference: Typography & Text Effects section

"Make the glassmorphism stronger on the badge"
→ Reference: Glassmorphism Implementation table

"Add mouse parallax to the floating particles"
→ Reference: Mouse-Reactive Parallax Pattern
```

# Guia de Animações Framer Motion - Brand Page

---

## Conceitos Fundamentais

### 1. Variants
Estados pré-definidos de animação que podem ser referenciados por nome.

```tsx
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

<motion.div variants={fadeUp} initial="hidden" animate="visible" />
```

### 2. useScroll + useTransform
Trackear scroll e transformar em valores animados.

```tsx
const { scrollYProgress } = useScroll({ target: ref });
const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
```

### 3. whileInView
Animar quando elemento entra no viewport.

```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false }}
/>
```

---

## Transições Padrão

### Smooth (Padrão)
```tsx
transition: {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.4,
}
```

### Spring (Para hovers)
```tsx
transition: {
  type: 'spring',
  stiffness: 300,
  damping: 25,
}
```

### Linear (Para loops infinitos)
```tsx
transition: {
  duration: 10,
  repeat: Infinity,
  ease: 'linear',
}
```

---

## Padrões de Animação Usados

### 1. Stagger Container + Items

Container que escadeia animação dos filhos.

```tsx
// Container
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,    // Delay entre filhos
      delayChildren: 0.15,     // Delay inicial
    },
  },
};

// Item
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Uso
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={staggerItem}>Item 1</motion.div>
  <motion.div variants={staggerItem}>Item 2</motion.div>
  <motion.div variants={staggerItem}>Item 3</motion.div>
</motion.div>
```

### 2. Bidirectional Scroll Animation

Animação que re-executa ao scrollar para cima.

```tsx
<motion.div
  initial={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
  viewport={{ once: false, amount: 0.3 }}  // once: false é a chave!
  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
>
```

### 3. Parallax com useTransform

```tsx
const ref = useRef<HTMLElement>(null);

const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
});

const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

<motion.div style={{ y }}>
  {/* Elemento com parallax */}
</motion.div>
```

### 4. Infinite Loop Animation

```tsx
<motion.div
  animate={{
    x: [0, 200, 100, 0],
    y: [0, -100, 50, 0],
    scale: [1, 1.4, 1.1, 1],
  }}
  transition={{
    duration: 30,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```

### 5. Hover Effects

```tsx
<motion.div
  whileHover={{ 
    y: -15, 
    borderColor: 'rgba(255,255,255,0.15)' 
  }}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
>
```

### 6. Gradient Animation

```tsx
<motion.span
  className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
  animate={{ backgroundPosition: ['0%', '200%'] }}
  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
>
```

---

## Animações Específicas da Brand Page

### Mega Orbs
```tsx
animate={{
  x: [0, 200, 100, 0],
  y: [0, -100, 50, 0],
  scale: [1, 1.4, 1.1, 1],
}}
transition={{
  duration: 30,
  repeat: Infinity,
  ease: 'easeInOut',
}}
```

### Pulsing Dot
```tsx
animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
transition={{ duration: 2, repeat: Infinity }}
```

### Rotating Icon
```tsx
animate={{ rotate: 360 }}
transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
```

### Grid Overlay Pulse
```tsx
animate={{ opacity: [0.2, 0.35, 0.2] }}
transition={{ duration: 8, repeat: Infinity }}
```

### Light Beam
```tsx
animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [0.5, 1, 0.5] }}
transition={{ duration: 10, repeat: Infinity }}
```

### Floating Particles
```tsx
animate={{
  y: [0, -60 - i * 3, 0],
  x: [0, (i % 2 === 0 ? 25 : -25), 0],
  opacity: [0.2, 0.8, 0.2],
  scale: [1, 1.5, 1],
}}
transition={{
  duration: 5 + i * 0.4,
  repeat: Infinity,
  ease: 'easeInOut',
  delay: i * 0.3,
}}
```

---

## Viewport Options

| Opção | Valor | Efeito |
|-------|-------|--------|
| `once` | `true` | Anima apenas uma vez |
| `once` | `false` | Anima toda vez que entra/sai |
| `amount` | `0.3` | Trigger quando 30% visível |
| `amount` | `'all'` | Trigger quando 100% visível |
| `margin` | `'-100px'` | Offset do trigger |

---

## Dicas de Performance

1. **Use `will-change`** para elementos com muita animação:
   ```tsx
   style={{ willChange: 'transform, opacity' }}
   ```

2. **Prefira `transform` e `opacity`** - São animadas pela GPU

3. **Evite animar `width/height`** - Use `scale` em vez disso

4. **Use `pointer-events-none`** em decorações:
   ```tsx
   className="absolute pointer-events-none"
   ```

5. **Layout animations com `layout` prop** (quando necessário):
   ```tsx
   <motion.div layout>
   ```

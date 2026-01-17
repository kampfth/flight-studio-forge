# Guia de Efeitos Visuais - Brand Page

Este documento detalha todos os efeitos visuais implementados na página Brand.

---

## 1. Mega Animated Orbs (Esferas Gigantes)

### Descrição
Esferas enormes com gradiente radial e blur pesado que flutuam no background.

### Implementação
```tsx
<motion.div
  className="absolute w-[1000px] h-[1000px] rounded-full pointer-events-none"
  style={{
    // Gradiente radial com cor primária e transparência
    background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
    // Blur pesado para efeito de glow
    filter: 'blur(100px)',
    // Posição fora da viewport para criar efeito de ambiente
    top: '-30%',
    left: '-20%',
  }}
  animate={{
    x: [0, 200, 100, 0],      // Movimento horizontal
    y: [0, -100, 50, 0],      // Movimento vertical
    scale: [1, 1.4, 1.1, 1],  // Pulsação de tamanho
  }}
  transition={{
    duration: 30,              // Ciclo de 30 segundos
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```

### Parâmetros Importantes
| Propriedade | Valor | Efeito |
|-------------|-------|--------|
| width/height | 700-1000px | Tamanho do orb |
| blur | 80-100px | Intensidade do glow |
| opacity | 0.08-0.15 | Sutileza da cor |
| duration | 25-30s | Velocidade da animação |

---

## 2. Grid Overlay

### Descrição
Grade sutil que adiciona textura tecnológica ao fundo.

### CSS (index.css)
```css
.grid-overlay {
  background-image: 
    linear-gradient(hsl(var(--foreground) / 0.02) 1px, transparent 1px),
    linear-gradient(90deg, hsl(var(--foreground) / 0.02) 1px, transparent 1px);
  background-size: 80px 80px;
}
```

### Uso com Animação
```tsx
<motion.div 
  className="absolute inset-0 grid-overlay opacity-30 pointer-events-none"
  animate={{ opacity: [0.2, 0.35, 0.2] }}
  transition={{ duration: 8, repeat: Infinity }}
/>
```

---

## 3. Scanlines

### Descrição
Linhas horizontais estilo monitor CRT para atmosfera retro-futurista.

### CSS (index.css)
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

---

## 4. Floating Particles (Partículas Flutuantes)

### Descrição
15 partículas pequenas com movimento e brilho individual.

### Implementação
```tsx
{[...Array(15)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute rounded-full bg-primary/40 pointer-events-none"
    style={{
      width: `${2 + (i % 4)}px`,    // 2-5px variado
      height: `${2 + (i % 4)}px`,
      left: `${5 + i * 6}%`,        // Distribuição horizontal
      top: `${15 + (i % 5) * 18}%`, // Distribuição vertical
      boxShadow: '0 0 12px hsl(var(--primary) / 0.5)', // Glow
    }}
    animate={{
      y: [0, -60 - i * 3, 0],                    // Movimento vertical
      x: [0, (i % 2 === 0 ? 25 : -25), 0],       // Oscilação lateral
      opacity: [0.2, 0.8, 0.2],                  // Fade in/out
      scale: [1, 1.5, 1],                        // Pulsação
    }}
    transition={{
      duration: 5 + i * 0.4,  // Duração variada por partícula
      repeat: Infinity,
      ease: 'easeInOut',
      delay: i * 0.3,         // Delay escalonado
    }}
  />
))}
```

---

## 5. Light Beams (Feixes de Luz)

### Descrição
Linha horizontal que pulsa e escala.

### Implementação
```tsx
<motion.div
  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent pointer-events-none"
  style={{ top: '35%' }}
  animate={{ 
    opacity: [0.2, 0.6, 0.2], 
    scaleX: [0.5, 1, 0.5] 
  }}
  transition={{ duration: 10, repeat: Infinity }}
/>
```

---

## 6. Parallax Multi-Camada

### Descrição
Efeito de profundidade onde elementos movem em velocidades diferentes baseado no scroll.

### Implementação
```tsx
// 1. Criar ref da seção
const heroRef = useRef<HTMLElement>(null);

// 2. Trackear progresso do scroll
const { scrollYProgress: heroProgress } = useScroll({
  target: heroRef,
  offset: ['start start', 'end start'],
});

// 3. Transformar progresso em valores
const heroY = useTransform(heroProgress, [0, 1], [0, 300]);
const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
const heroScale = useTransform(heroProgress, [0, 0.6], [1, 1.15]);
const heroBlur = useTransform(heroProgress, [0, 0.5], [0, 10]);

// 4. Aplicar nos elementos
<motion.div style={{ y: heroY, scale: heroScale }}>
  {/* Background image */}
</motion.div>
```

---

## 7. Glassmorphism

### Descrição
Efeito de vidro fosco com transparência e blur.

### Classes Comuns
```tsx
// Card glassmorphic básico
className="bg-white/[0.04] backdrop-blur-3xl border border-white/[0.1]"

// Com sombra
className="bg-white/[0.04] backdrop-blur-3xl border border-white/[0.1] shadow-[0_20px_60px_rgba(0,0,0,0.3)]"

// Badge/pill
className="px-5 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.1]"
```

### Variações de Blur
| Classe | Uso |
|--------|-----|
| `backdrop-blur-sm` | Leve, para elementos pequenos |
| `backdrop-blur-xl` | Médio, para badges |
| `backdrop-blur-2xl` | Forte, para cards |
| `backdrop-blur-3xl` | Máximo, para cards principais |

---

## 8. Animated Gradient Text

### Descrição
Texto com gradiente que anima horizontalmente.

### Implementação
```tsx
<motion.span 
  className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
  animate={{ backgroundPosition: ['0%', '200%'] }}
  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
>
  For Simmers
</motion.span>
```

### Explicação
1. `bg-[length:200%_auto]` - Gradiente 2x mais largo que o elemento
2. `bg-clip-text text-transparent` - Aplica gradiente ao texto
3. `backgroundPosition: ['0%', '200%']` - Anima da esquerda para direita

---

## 9. Hover Lift Effect

### Descrição
Cards que "levantam" no hover.

### Implementação
```tsx
<motion.div
  className="group relative h-full p-10 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08]"
  whileHover={{ 
    y: -15,                                    // Sobe 15px
    borderColor: 'rgba(255,255,255,0.15)'      // Borda mais visível
  }}
  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
>
```

---

## 10. Pulsing Badge Dot

### Descrição
Ponto que pulsa infinitamente nos badges.

### Implementação
```tsx
<motion.div
  className="w-2 h-2 rounded-full bg-primary"
  animate={{ 
    scale: [1, 1.5, 1], 
    opacity: [0.5, 1, 0.5] 
  }}
  transition={{ duration: 2, repeat: Infinity }}
/>
```

---

## 11. Rotating Icon

### Descrição
Ícone que rotaciona continuamente.

### Implementação
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
>
  <Sparkles size={16} className="text-primary" />
</motion.div>
```

---

## 12. Bidirectional Scroll Animations

### Descrição
Animações que re-ativam quando o usuário scrolla para cima.

### Chave
```tsx
viewport={{ once: false, amount: 0.3 }}
```

- `once: false` - Permite re-animar
- `amount: 0.3` - Trigger quando 30% do elemento está visível

### Exemplo Completo
```tsx
<motion.div
  initial={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
>
  {/* Content */}
</motion.div>
```

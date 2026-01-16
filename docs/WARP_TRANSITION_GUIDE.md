# Guia: Transição de Dobra Espacial (Warp Drive)

Este documento detalha a implementação da transição de navegação "warp drive" - um efeito visual que simula viagem em dobra espacial com zoom rápido e motion blur radial.

---

## Visão Geral

A transição consiste em:
1. **Zoom acelerado** - A tela expande rapidamente para frente
2. **Motion blur radial** - Linhas de velocidade emanam do centro
3. **Fade to black** - Escurecimento final antes da nova página

---

## Arquitetura

```
src/
├── components/
│   └── transitions/
│       └── PageTransition.tsx    # Componente visual da transição
├── hooks/
│   └── use-page-transition.ts    # Hook de gerenciamento de estado
```

---

## 1. Hook de Gerenciamento (`use-page-transition.ts`)

### Código Completo

```tsx
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const targetPathRef = useRef<string | null>(null);
  const navigate = useNavigate();

  const startTransition = useCallback((path: string) => {
    targetPathRef.current = path;
    setIsTransitioning(true);
    
    // Fallback: navega após 700ms mesmo se animação falhar
    setTimeout(() => {
      if (targetPathRef.current) {
        navigate(targetPathRef.current);
        setIsTransitioning(false);
        targetPathRef.current = null;
      }
    }, 700);
  }, [navigate]);

  const completeTransition = useCallback(() => {
    if (targetPathRef.current) {
      navigate(targetPathRef.current);
      targetPathRef.current = null;
    }
    setIsTransitioning(false);
  }, [navigate]);

  return {
    isTransitioning,
    startTransition,
    completeTransition,
  };
}
```

### Explicação

| Elemento | Propósito |
|----------|-----------|
| `isTransitioning` | Estado booleano que ativa/desativa a animação |
| `targetPathRef` | Ref para armazenar o caminho destino (evita closure stale) |
| `startTransition(path)` | Inicia a animação e agenda navegação |
| `completeTransition()` | Callback chamado quando animação termina |
| `setTimeout` fallback | Garante navegação mesmo se `onAnimationComplete` falhar |

---

## 2. Componente de Transição (`PageTransition.tsx`)

### Código Completo

```tsx
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
          {/* Camada 1: Radial motion blur overlay */}
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
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Camada 2: Speed streaks (linhas de velocidade) */}
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

          {/* Camada 3: Final fade to black */}
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
```

---

## 3. Detalhamento das Camadas

### Camada 1: Radial Motion Blur

```tsx
<motion.div
  style={{
    background: 'radial-gradient(circle at center, transparent 0%, transparent 20%, hsl(var(--background) / 0.3) 60%, hsl(var(--background)) 100%)',
  }}
  initial={{ scale: 1, opacity: 0 }}
  animate={{ scale: 2.5, opacity: [0, 0.8, 1] }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
/>
```

**CSS Background:**
```css
radial-gradient(
  circle at center,      /* Círculo centrado */
  transparent 0%,        /* Centro completamente transparente */
  transparent 20%,       /* Mantém transparente até 20% */
  hsl(var(--background) / 0.3) 60%,  /* Semi-transparente a 60% */
  hsl(var(--background)) 100%        /* Sólido nas bordas */
)
```

**Animação:**
- `scale: 1 → 2.5` — Expande 2.5x criando efeito de zoom
- `opacity: [0, 0.8, 1]` — Keyframes: invisível → quase opaco → totalmente opaco

### Camada 2: Speed Streaks

```tsx
<motion.div
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
  initial={{ scale: 1, opacity: 0, rotate: 0 }}
  animate={{ scale: 3, opacity: [0, 0.4, 0], rotate: 15 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
/>
```

**CSS Background:**
```css
repeating-conic-gradient(
  from 0deg at 50% 50%,           /* Origem no centro */
  transparent 0deg,                /* Início transparente */
  hsl(var(--primary) / 0.1) 0.5deg, /* Linha sutil da cor primária */
  transparent 1deg                 /* Volta a transparente */
)
/* Repete a cada 1deg criando 360 linhas radiais */
```

**Animação:**
- `scale: 1 → 3` — Expande mais que a primeira camada
- `opacity: [0, 0.4, 0]` — Aparece e desaparece rapidamente
- `rotate: 0 → 15deg` — Leve rotação para dinamismo

### Camada 3: Blackout Final

```tsx
<motion.div
  className="absolute inset-0 bg-background"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.25, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
  onAnimationComplete={onComplete}
/>
```

**Propósito:** Escurece completamente a tela antes da navegação.

**Timing:**
- `delay: 0.35s` — Espera as outras animações progredirem
- `duration: 0.25s` — Fade rápido para preto
- `onAnimationComplete` — Dispara a navegação real

---

## 4. Curva de Easing Personalizada

```tsx
ease: [0.16, 1, 0.3, 1]
```

Esta é uma curva de Bézier cúbica que cria:
- **Aceleração forte no início** — Sai rápido do ponto inicial
- **Desaceleração suave no final** — Chega suavemente ao destino

```
Velocidade
    │
    │    ╭───────────────
    │   ╱
    │  ╱
    │ ╱
    │╱
    └──────────────────── Tempo
      Rápido → Suave
```

### Comparação com outras curvas:

| Curva | Comportamento |
|-------|---------------|
| `[0.16, 1, 0.3, 1]` | Aceleração forte, desaceleração suave (nossa) |
| `[0.76, 0, 0.24, 1]` | Suave nos dois extremos |
| `[0.4, 0, 0.2, 1]` | Material Design padrão |
| `linear` | Velocidade constante |

---

## 5. Uso em Componentes

### Integração no Hero Section

```tsx
import { PageTransition } from '@/components/transitions/PageTransition';
import { usePageTransition } from '@/hooks/use-page-transition';

export function HeroSection() {
  const { isTransitioning, startTransition, completeTransition } = usePageTransition();

  const handleNavigate = () => {
    startTransition('/products');
  };

  return (
    <section>
      <button onClick={handleNavigate}>
        Explorar Produtos
      </button>

      <PageTransition 
        isActive={isTransitioning} 
        onComplete={completeTransition} 
      />
    </section>
  );
}
```

---

## 6. Classes CSS Utilizadas

| Classe | Propósito |
|--------|-----------|
| `fixed inset-0` | Posiciona em tela cheia |
| `z-[100]` | Garante que fica acima de tudo |
| `pointer-events-none` | Não bloqueia interações durante animação |
| `absolute inset-0` | Cada camada ocupa todo o espaço |
| `bg-background` | Usa a cor de fundo do tema |

---

## 7. Tokens CSS (Design System)

As cores usam tokens semânticos definidos em `index.css`:

```css
:root {
  --background: 0 0% 3%;      /* Preto profundo */
  --primary: 0 0% 98%;        /* Branco */
}
```

Uso no componente:
```css
hsl(var(--background))        /* Cor de fundo sólida */
hsl(var(--background) / 0.3)  /* Fundo com 30% opacidade */
hsl(var(--primary) / 0.1)     /* Primária com 10% opacidade */
```

---

## 8. Timeline da Animação

```
0ms      100ms     200ms     350ms     600ms
│         │         │         │         │
├─────────┴─────────┴─────────┴─────────┤
│  Radial blur expanding (scale 1→2.5)  │
│                                       │
├─────────┴─────────┴─────────┤         │
│  Speed streaks (scale 1→3)  │         │
│                             │         │
│                   ├─────────┴─────────┤
│                   │ Blackout fade     │
│                   │                   │
│                   │         ├─────────┤
│                   │         │ Navigate│
```

---

## 9. Troubleshooting

### Animação não dispara
- Verifique se `isActive` está sendo setado para `true`
- Confira se o componente está sendo renderizado (use React DevTools)

### Navegação não acontece
- O `onAnimationComplete` pode falhar em casos raros
- O `setTimeout` de 700ms serve como fallback de segurança

### Performance lenta
- Reduza o número de elementos animados
- Use `will-change: transform, opacity` se necessário
- Considere `transform: translateZ(0)` para GPU acceleration

---

## 10. Variações Possíveis

### Warp mais lento (dramático)
```tsx
transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
```

### Warp mais agressivo
```tsx
ease: [0.7, 0, 0.3, 1]  // Início ainda mais rápido
```

### Sem linhas de velocidade
Remova a Camada 2 (speed streaks) para efeito mais limpo.

### Cor personalizada nas linhas
```tsx
hsl(200 100% 50% / 0.1)  // Linhas azuis
```

---

## Resumo

A transição de dobra espacial combina três camadas animadas com timing preciso:

1. **Blur radial** — Cria profundidade e sensação de movimento
2. **Linhas de velocidade** — Reforça a direção do movimento (para frente)
3. **Blackout** — Transição limpa para a próxima página

A curva de easing `[0.16, 1, 0.3, 1]` é fundamental para o feeling de "warp" — aceleração brusca seguida de desaceleração orgânica.

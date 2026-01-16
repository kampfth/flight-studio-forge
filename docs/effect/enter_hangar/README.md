# Efeito "Enter Hangar" - Warp Drive Transition

Transição de página com efeito de viagem em dobra espacial.

## Dependência Obrigatória

```bash
npm install framer-motion
```

## Arquivos Necessários

1. `PageTransition.tsx` - Componente visual
2. `use-page-transition.ts` - Hook de controle
3. `styles.css` - Variáveis CSS necessárias

## Uso Rápido

```tsx
import { PageTransition } from './PageTransition';
import { usePageTransition } from './use-page-transition';

function MyComponent() {
  const { isTransitioning, startTransition, completeTransition } = usePageTransition();

  return (
    <>
      <button onClick={() => startTransition('/destino')}>
        Enter the Hangar
      </button>
      
      <PageTransition 
        isActive={isTransitioning} 
        onComplete={completeTransition} 
      />
    </>
  );
}
```

## O Efeito em 3 Camadas

| Camada | O que faz | Duração |
|--------|-----------|---------|
| 1. Radial Blur | Zoom 1→2.5x com gradiente radial | 600ms |
| 2. Speed Lines | Linhas cônicas rotacionando 0→15° | 500ms |
| 3. Blackout | Fade to black final | 250ms (delay 350ms) |

## Easing Customizado

```
[0.16, 1, 0.3, 1]
```
Aceleração forte no início, desaceleração suave no fim.

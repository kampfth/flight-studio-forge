/**
 * Exemplo Completo de Uso
 * 
 * Mostra como integrar o efeito em uma página.
 */

import { PageTransition } from './PageTransition';
import { usePageTransition } from './use-page-transition';

export function HeroSection() {
  const { isTransitioning, startTransition, completeTransition } = usePageTransition();

  return (
    <section className="relative h-screen">
      {/* Seu conteúdo aqui */}
      <div className="flex flex-col items-center justify-center h-full">
        <h1>Bem-vindo</h1>
        
        {/* Botão que dispara a transição */}
        <button 
          onClick={() => startTransition('/products')}
          className="px-8 py-4 bg-white text-black font-bold"
        >
          Enter the Hangar
        </button>
      </div>

      {/* Componente de transição - renderiza sobre tudo */}
      <PageTransition 
        isActive={isTransitioning} 
        onComplete={completeTransition} 
      />
    </section>
  );
}

/* ================================================
   TIMELINE DA ANIMAÇÃO
================================================

0ms      100ms     200ms     350ms     600ms
|---------|---------|---------|---------|
[===== Radial Blur (scale + opacity) =====]
[==== Speed Lines (scale + rotate) ====]
                    [=== Blackout ===]
                                      ↓
                                   Navigate

================================================ */

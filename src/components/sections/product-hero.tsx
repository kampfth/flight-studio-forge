/**
 * Component: ProductHero
 * Responsibility: Hero section for product detail pages with glassmorphism styling
 * Used by: ProductDetail page
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Product } from '@/lib/types';
import { useRef } from 'react';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background with animated orbs */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '-20%',
          right: '-10%',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          bottom: '10%',
          left: '-5%',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <motion.div 
        className="section-container relative z-10 py-24 md:py-32"
        style={{ opacity, y }}
      >
        <div className="max-w-3xl">
          {/* Back to Hangar link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Hangar</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-4"
          >
            {product.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            {product.tagline}
          </motion.p>

          {/* Category Badge with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="px-4 py-2 rounded-lg bg-primary/10 backdrop-blur-md border border-primary/20 text-primary font-mono text-sm uppercase tracking-wider">
              {product.category}
            </span>
            {product.compatibility && product.compatibility.length > 0 && (
              <span className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-muted-foreground font-mono text-sm">
                {product.compatibility[0]}
              </span>
            )}
          </motion.div>

          {/* Meta info with glassmorphism */}
          {(product.version || product.releaseDate) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <div className="inline-flex items-center gap-4 px-4 py-2 rounded-lg bg-white/[0.03] backdrop-blur-md border border-white/10 text-sm text-muted-foreground font-mono">
                {product.version && (
                  <span>v{product.version}</span>
                )}
                {product.version && product.releaseDate && (
                  <span className="text-white/20">•</span>
                )}
                {product.releaseDate && (
                  <span>Released {new Date(product.releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

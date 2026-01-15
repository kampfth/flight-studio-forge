/**
 * Component: ProductHero
 * Responsibility: Hero section for product detail pages with title, tagline, and metadata
 * Used by: ProductDetail page
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Placeholder for product hero image */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
          >
            <Link to="/products" className="hover:text-foreground transition-colors">
              Hangar
            </Link>
            <span>/</span>
            <span className="text-primary capitalize">{product.category}</span>
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

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="px-4 py-2 rounded-md bg-primary/10 text-primary font-mono text-sm uppercase tracking-wider">
              {product.category}
            </span>
            {product.compatibility && product.compatibility.length > 0 && (
              <span className="text-sm text-muted-foreground font-mono">
                {product.compatibility[0]}
              </span>
            )}
          </motion.div>

          {/* Meta info */}
          {(product.version || product.releaseDate) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex items-center gap-6 text-sm text-muted-foreground font-mono"
            >
              {product.version && (
                <span>v{product.version}</span>
              )}
              {product.releaseDate && (
                <span>Released {new Date(product.releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

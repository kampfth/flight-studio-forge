/**
 * Component: ProductCard
 * Responsibility: Product card with tilt effect for grids
 * Used by: Products page, FeaturedProducts, ProductDetail related products
 */
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Package } from 'lucide-react';
import { Product } from '@/lib/types';
import { PLACEHOLDERS } from '@/lib/constants';
import { getProductRoute } from '@/lib/routes';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
}

const categoryLabels = {
  livery: 'Livery',
  utility: 'Utility',
  pack: 'Pack',
  bundle: 'Bundle',
};

// Check if product is new (released within last 30 days)
const isNewProduct = (releaseDate: string): boolean => {
  const release = new Date(releaseDate);
  const now = new Date();
  const diffTime = now.getTime() - release.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 30;
};

export function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isBundle = product.category === 'bundle';
  const isNew = product.releaseDate ? isNewProduct(product.releaseDate) : false;
  
  // Mouse position for tilt effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Get placeholder image based on index
  const placeholderImage = PLACEHOLDERS.products[index % PLACEHOLDERS.products.length];

  return (
    <motion.article
      ref={cardRef}
      data-qa={`site-product-card-${product.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(isBundle && 'relative')}
    >
      {/* Bundle glow effect */}
      {isBundle && (
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/20 via-purple-400/30 to-purple-600/20 blur-lg opacity-75 animate-pulse" />
      )}
      
      <Link
        to={getProductRoute(product.slug)}
        className={cn(
          'group relative block overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-card',
          isBundle 
            ? 'border-purple-500/50 hover:border-purple-400/70 bundle-glow' 
            : 'border-border/50 hover:border-primary/30'
        )}
        aria-label={`View ${product.name}`}
      >
        {/* Image container - compact aspect ratio */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted/20">
          {/* Product image */}
          <img 
            src={product.heroImage || placeholderImage}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Bundle overlay gradient */}
          {isBundle && (
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-purple-500/10" />
          )}

          {/* Hover overlay */}
          <div className={cn(
            'absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            isBundle 
              ? 'bg-gradient-to-t from-purple-900/50 via-transparent to-transparent'
              : 'bg-gradient-to-t from-card via-transparent to-transparent'
          )} />
          
          {/* NEW ribbon */}
          {isNew && (
            <div className="absolute top-0 right-4 z-10">
              <div className="relative bg-gradient-to-b from-primary to-primary/80 px-2 py-3 shadow-lg">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary-foreground [writing-mode:vertical-rl] rotate-180">
                  New
                </span>
                {/* Ribbon tail */}
                <div className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-gradient-to-b from-primary/80 to-transparent" 
                  style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }} 
                />
              </div>
            </div>
          )}

          {/* Arrow indicator */}
          <div className={cn(
            'absolute top-3 flex h-8 w-8 scale-90 items-center justify-center rounded-full opacity-0 backdrop-blur transition-all duration-200 group-hover:scale-100 group-hover:opacity-100',
            isNew ? 'right-14' : 'right-3',
            isBundle ? 'bg-purple-500/80' : 'bg-background/80'
          )}>
            <ArrowUpRight size={14} className="text-foreground" />
          </div>

          {/* Category badge */}
          <div className="absolute bottom-3 left-3">
            <span className={cn(
              'inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur',
              isBundle 
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30' 
                : 'bg-background/80 text-muted-foreground'
            )}>
              {isBundle && <Package size={10} />}
              {categoryLabels[product.category]}
            </span>
          </div>

          {/* Bundle product count */}
          {isBundle && product.includedProducts && product.includedProducts.length > 0 && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-block rounded bg-white/10 backdrop-blur px-2 py-1 font-mono text-[10px] text-white">
                {product.includedProducts.length} products
              </span>
            </div>
          )}
        </div>

        {/* Content - compact padding */}
        <div className="p-4">
          {/* Title */}
          <h3 className={cn(
            'mb-1 font-mono text-sm font-medium line-clamp-1 transition-colors group-hover:text-foreground',
            isBundle && 'group-hover:text-purple-300'
          )}>
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-muted-foreground line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Bottom accent line on hover */}
        <div className={cn(
          'absolute bottom-0 left-0 right-0 h-px scale-x-0 transition-transform duration-300 group-hover:scale-x-100',
          isBundle 
            ? 'bg-gradient-to-r from-transparent via-purple-400/60 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-primary/40 to-transparent'
        )} />
      </Link>
    </motion.article>
  );
}

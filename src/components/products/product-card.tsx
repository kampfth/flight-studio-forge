import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
}

const categoryColors = {
  aircraft: 'from-primary/20 to-primary/5',
  scenery: 'from-blue-500/20 to-blue-500/5',
  utility: 'from-amber-500/20 to-amber-500/5',
};

const categoryLabels = {
  aircraft: 'Aircraft',
  scenery: 'Scenery',
  utility: 'Utility',
};

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/products/${product.slug}`}
        className="group block relative overflow-hidden rounded-lg bg-card border border-border/50 transition-all duration-500 hover:border-primary/30 hover:shadow-card"
      >
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* Placeholder gradient - replace with actual images */}
          <div 
            className={cn(
              'absolute inset-0 bg-gradient-to-br',
              categoryColors[product.category]
            )}
          />
          
          {/* Placeholder content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-2xl text-muted-foreground/30">
              {product.name}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Arrow indicator */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
            <ArrowUpRight size={18} className="text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category badge */}
          <span className="inline-block font-mono text-xs tracking-wider text-primary uppercase mb-3">
            {categoryLabels[product.category]}
          </span>

          {/* Title */}
          <h3 className="font-mono font-semibold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.tagline}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </Link>
    </motion.article>
  );
}

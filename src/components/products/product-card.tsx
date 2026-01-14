import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { PLACEHOLDERS } from '@/lib/constants';
import { useRef } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
}

const categoryLabels = {
  livery: 'Livery',
  utility: 'Utility',
  pack: 'Pack',
};

export function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/products/${product.slug}`}
        className="group block relative overflow-hidden rounded-lg bg-card border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-card"
      >
        {/* Image container - compact aspect ratio */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted/20">
          {/* Product image */}
          <img 
            src={product.heroImage || placeholderImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Arrow indicator */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
            <ArrowUpRight size={14} className="text-foreground" />
          </div>

          {/* Category badge */}
          <div className="absolute bottom-3 left-3">
            <span className="inline-block px-2.5 py-1 bg-background/80 backdrop-blur rounded font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              {categoryLabels[product.category]}
            </span>
          </div>
        </div>

        {/* Content - compact padding */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-mono font-medium text-sm mb-1 group-hover:text-foreground transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-muted-foreground text-xs line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Bottom accent line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </Link>
    </motion.article>
  );
}

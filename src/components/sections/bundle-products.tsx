/**
 * Component: BundleProducts
 * Responsibility: Display products included in a bundle as vertical list cards
 * Used by: ProductDetail page for bundle-type products
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { Product } from '@/lib/types';
import { PLACEHOLDERS } from '@/lib/constants';
import { getProductRoute } from '@/lib/routes';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion';

interface BundleProductsProps {
  products: Product[];
}

const categoryLabels: Record<string, string> = {
  livery: 'Livery',
  utility: 'Utility',
  pack: 'Pack',
  bundle: 'Bundle',
};

export function BundleProducts({ products }: BundleProductsProps) {
  if (!products.length) return null;

  return (
    <section 
      className="relative py-16 md:py-24 overflow-hidden" 
      data-qa="bundle-products-section"
    >
      {/* Background glow - purple theme for bundles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 backdrop-blur-md border border-purple-500/20 mb-4">
            <Package size={14} className="text-purple-400" />
            <span className="font-mono text-purple-300 text-xs tracking-[0.15em] uppercase">
              Bundle Contents
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-mono font-bold mb-2">
            Products Included
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            This bundle includes {products.length} product{products.length !== 1 ? 's' : ''} from our catalog.
          </p>
        </motion.div>

        {/* Vertical List */}
        <motion.div 
          className="flex flex-col gap-3 md:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.slug} 
              variants={staggerItem}
            >
              <Link
                to={getProductRoute(product.slug)}
                className="group relative flex items-center overflow-hidden rounded-xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 h-24 sm:h-28 md:h-32"
                aria-label={`View ${product.name}`}
              >
                {/* Background thumbnail with horizontal fade */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={product.heroImage || PLACEHOLDERS.products[index % PLACEHOLDERS.products.length]}
                    alt=""
                    className="absolute right-0 top-0 h-full w-3/4 sm:w-2/3 md:w-1/2 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Horizontal gradient fade from left */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to right, hsl(var(--background)) 30%, hsl(var(--background) / 0.85) 50%, hsl(var(--background) / 0.7) 70%, transparent 100%)'
                    }}
                  />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-background/70" />

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between w-full px-4 sm:px-6 md:px-8">
                  <div className="flex-1 min-w-0 pr-4">
                    {/* Category badge */}
                    <span className="inline-block rounded-full bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-purple-300 mb-2">
                      {categoryLabels[product.category]}
                    </span>
                    
                    {/* Title */}
                    <h3 className="font-mono text-sm sm:text-base md:text-lg font-medium line-clamp-1 group-hover:text-purple-300 transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Tagline - hidden on mobile */}
                    <p className="hidden sm:block text-xs md:text-sm text-muted-foreground line-clamp-1 mt-1">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Visit link */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0">
                    <span className="hidden sm:inline">Visit Product</span>
                    <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 bg-gradient-to-r from-purple-500/50 via-purple-400/30 to-transparent transition-transform duration-300 origin-left group-hover:scale-x-100" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bundle value note for larger bundles */}
        {products.length >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 md:mt-8 text-center"
          >
            <p className="text-xs text-muted-foreground font-mono">
              <span className="text-purple-400">{products.length} products</span> • Save by purchasing the complete bundle
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
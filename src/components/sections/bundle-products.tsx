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

        {/* Two Column Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product, index) => {
            const isLastOdd = products.length % 2 !== 0 && index === products.length - 1;
            
            return (
              <motion.div 
                key={product.slug} 
                variants={staggerItem}
                className={isLastOdd ? 'sm:col-span-2 sm:max-w-[calc(50%-0.5rem)] sm:mx-auto' : ''}
              >
                <Link
                  to={getProductRoute(product.slug)}
                  className="group relative flex items-center overflow-hidden rounded-xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 h-16 sm:h-18 md:h-20"
                  aria-label={`View ${product.name}`}
                >
                  {/* Background thumbnail with horizontal fade */}
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={PLACEHOLDERS.products[index % PLACEHOLDERS.products.length]}
                      alt=""
                      className="absolute left-0 top-0 h-full w-3/4 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Horizontal gradient fade from right */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to left, hsl(var(--background)) 25%, hsl(var(--background) / 0.8) 45%, hsl(var(--background) / 0.5) 65%, transparent 100%)'
                      }}
                    />
                  </div>

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-background/70" />

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between w-full px-4 md:px-5">
                    {/* Name + Category side by side */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pr-3">
                      <h3 className="font-mono text-xs sm:text-sm md:text-base font-medium line-clamp-1 group-hover:text-purple-300 transition-colors">
                        {product.name}
                      </h3>
                      <span className="flex-shrink-0 rounded-full bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-purple-300">
                        {categoryLabels[product.category]}
                      </span>
                    </div>

                    {/* Visit link */}
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0">
                      <span className="hidden md:inline">Visit</span>
                      <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all">
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 bg-gradient-to-r from-purple-500/50 via-purple-400/30 to-transparent transition-transform duration-300 origin-left group-hover:scale-x-100" />
                </Link>
              </motion.div>
            );
          })}
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
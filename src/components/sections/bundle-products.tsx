/**
 * Component: BundleProducts
 * Responsibility: Display products included in a bundle
 * Used by: ProductDetail page for bundle-type products
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Package } from 'lucide-react';
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
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
            Each product is also available individually.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div 
              key={product.slug} 
              variants={staggerItem}
              className="group"
            >
              <Link
                to={getProductRoute(product.slug)}
                className="relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300"
                aria-label={`View ${product.name}`}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-muted/20">
                  <img 
                    src={product.heroImage || PLACEHOLDERS.products[index % PLACEHOLDERS.products.length]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <span className="inline-block rounded-full bg-background/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground backdrop-blur">
                      {categoryLabels[product.category]}
                    </span>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="font-mono text-sm font-medium line-clamp-1 mb-1 group-hover:text-purple-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                    {product.tagline}
                  </p>
                  
                  {/* Visit link */}
                  <div className="flex items-center gap-1 text-xs font-mono text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span>Visit Product</span>
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
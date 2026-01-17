/**
 * Component: BundleProducts
 * Responsibility: Display products included in a bundle with modern styling
 * Used by: ProductDetail page for bundle-type products
 */
import { motion } from 'framer-motion';
import { Package, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { PLACEHOLDERS } from '@/lib/constants';
import { getProductRoute } from '@/lib/routes';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion';

interface BundleProductsProps {
  products: Product[];
  bundleName: string;
}

const categoryLabels = {
  livery: 'Livery',
  utility: 'Utility',
  pack: 'Pack',
  bundle: 'Bundle',
};

export function BundleProducts({ products, bundleName }: BundleProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background glow - purple for bundles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[800px] h-[400px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(ellipse, hsl(270 80% 65% / 0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 backdrop-blur-md border border-purple-500/20 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <Package size={14} className="text-purple-400" />
            <span className="font-mono text-purple-300 text-xs tracking-[0.15em] uppercase">
              Included Products
            </span>
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-mono font-bold mb-3">
            Products in this{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
              Bundle
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {products.length} premium products included with {bundleName}. 
            Each product receives lifetime updates.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
                className="relative flex gap-4 p-4 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent" />
                </div>

                {/* Product Image */}
                <div className="relative w-24 h-24 md:w-32 md:h-24 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                  <img 
                    src={product.heroImage || PLACEHOLDERS.products[index % PLACEHOLDERS.products.length]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Included check */}
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-300 rounded text-[10px] uppercase font-mono">
                      {categoryLabels[product.category]}
                    </span>
                    {product.version && (
                      <span className="text-[10px] text-muted-foreground font-mono">
                        v{product.version}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-mono text-sm md:text-base font-medium group-hover:text-purple-300 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {product.tagline}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center flex-shrink-0">
                  <ArrowRight 
                    size={18} 
                    className="text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-1 transition-all" 
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bundle benefits callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-md"
        >
          <div className="flex flex-wrap gap-6 md:gap-12 justify-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Check size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-mono font-medium">Lifetime Updates</p>
                <p className="text-xs text-muted-foreground">All products stay current</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Package size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-mono font-medium">Single Download</p>
                <p className="text-xs text-muted-foreground">One installer for all</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 font-mono font-bold text-sm">%</span>
              </div>
              <div>
                <p className="text-sm font-mono font-medium">Bundle Savings</p>
                <p className="text-xs text-muted-foreground">Save vs. individual</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
/**
 * Component: FeaturedProducts
 * Responsibility: Display featured products with glassmorphism and animations
 * Used by: Index page
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Box } from 'lucide-react';
import { products } from '@/content/products';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { forwardRef, useRef } from 'react';

export const FeaturedProducts = forwardRef<HTMLElement>((_, ref) => {
  const featuredProducts = products.slice(0, 6);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section 
      ref={(el) => {
        (containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      }}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden snap-start"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y }}
      >
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-overlay opacity-10" />

      <div className="section-container relative">
        {/* Section header with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <Box size={14} className="text-primary" />
              <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                The Hangar
              </span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-3">
              Latest{' '}
              <span className="text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Releases
              </span>
            </h2>
            <p className="text-muted-foreground text-base max-w-md">
              Explore our newest additions to the fleet. Quality-tested, community-approved.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              asChild 
              variant="outline" 
              className="group relative overflow-hidden bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 hover:bg-white/10"
            >
              <Link to="/products">
                <span className="relative z-10 flex items-center">
                  View All Products
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10">
            <span className="text-muted-foreground text-sm">
              Looking for something specific?
            </span>
            <Link 
              to="/products" 
              className="font-mono text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              Browse all <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

FeaturedProducts.displayName = 'FeaturedProducts';

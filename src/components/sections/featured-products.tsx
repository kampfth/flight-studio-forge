/**
 * Component: FeaturedProducts
 * Responsibility: Ultra-futuristic featured products with advanced glassmorphism and motion
 * Used by: Index page
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Sparkles, Zap } from 'lucide-react';
import { products } from '@/content/products';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { forwardRef, useRef } from 'react';
import { staggerGrid, gridItem } from '@/lib/motion';

export const FeaturedProducts = forwardRef<HTMLElement>((_, ref) => {
  const featuredProducts = products.slice(0, 6);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Bidirectional scroll transforms
  const orbY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.8, 0.8, 0.3]);
  const gridRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

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
      className="relative min-h-screen py-32 md:py-40 overflow-hidden snap-start"
    >
      {/* Multi-layered animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary orb */}
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{ 
            y: orbY, 
            scale: orbScale,
            opacity: orbOpacity,
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 60%)',
            filter: 'blur(100px)',
            top: '20%',
            left: '-20%',
          }}
        />
        
        {/* Secondary orb */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [-80, 80]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 0.2]),
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
            bottom: '10%',
            right: '-10%',
          }}
        />
        
        {/* Tertiary accent orb */}
        <motion.div 
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [50, -50]),
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
            top: '60%',
            left: '40%',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Animated grid pattern with rotation */}
      <motion.div 
        className="absolute inset-0 grid-overlay opacity-20 pointer-events-none"
        style={{ rotate: gridRotate }}
      />
      
      {/* Horizontal light beams */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none"
        style={{ top: '25%' }}
        animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent pointer-events-none"
        style={{ bottom: '30%' }}
        animate={{ opacity: [0.1, 0.4, 0.1], scaleX: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40 pointer-events-none"
          style={{
            left: `${15 + i * 10}%`,
            top: `${25 + (i % 3) * 25}%`,
            boxShadow: '0 0 8px hsl(var(--primary) / 0.4)',
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="section-container relative z-10">
        {/* Section header with ultra glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
        >
          <div>
            {/* Enhanced badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Box size={14} className="text-primary" />
              </motion.div>
              <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                The Hangar
              </span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Title with animated gradient */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-4">
              Latest{' '}
              <motion.span 
                className="bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_auto] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '200%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                Releases
              </motion.span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              Explore our newest additions to the fleet. Quality-tested, community-approved.
            </p>
          </div>
          
          {/* Enhanced CTA button */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button 
                asChild 
                variant="outline" 
                className="group relative overflow-hidden bg-white/[0.05] backdrop-blur-xl border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.1] px-6 py-5 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
              >
                <Link to="/products">
                  <span className="relative z-10 flex items-center gap-2 font-mono">
                    View All Products
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Product grid with staggered reveal - BIDIRECTIONAL */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              variants={gridItem}
              custom={index}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced bottom CTA with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-6 px-8 py-5 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
            whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.15)' }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <span className="text-muted-foreground text-sm">
                Looking for something specific?
              </span>
            </div>
            <Link 
              to="/products" 
              className="group font-mono text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
            >
              <span>Browse all</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

FeaturedProducts.displayName = 'FeaturedProducts';
/**
 * Component: HeroSection
 * Responsibility: Ultra-futuristic homepage hero with 100vh, scroll snap, advanced motion
 * Used by: Index page
 */
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Plane, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PLACEHOLDERS } from '@/lib/constants';
import { staggerContainer, staggerItem, useReducedMotion } from '@/lib/motion';
import { useEffect, useRef, useState } from 'react';
import { PageTransition } from '@/components/transitions/PageTransition';
import { usePageTransition } from '@/hooks/use-page-transition';

interface HeroSectionProps {
  onScrollToContent?: () => void;
}

export function HeroSection({ onScrollToContent }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const { isTransitioning, startTransition, completeTransition } = usePageTransition();
  const prefersReducedMotion = useReducedMotion();
  
  const springConfig = { damping: 20, stiffness: 100 };
  const moveX = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [0, 1], [-30, 30]), springConfig);
  
  // Scroll-based parallax
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const rotateX = useTransform(scrollY, [0, 500], [0, 10]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const handleScrollToContent = () => {
    if (onScrollToContent) {
      onScrollToContent();
    }
  };

  return (
    <section 
      ref={containerRef} 
      data-qa="site-hero"
      className="relative flex h-screen snap-start snap-always items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Ultra-deep background layers */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: prefersReducedMotion ? 0 : bgY, scale: prefersReducedMotion ? 1 : scale }}
        animate={isTransitioning ? { 
          scale: 1.8,
          filter: 'blur(10px)',
        } : {}}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Base image with mouse parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ x: prefersReducedMotion ? 0 : moveX, y: prefersReducedMotion ? 0 : moveY }}
        >
          <div 
            className="absolute inset-0 scale-125 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${PLACEHOLDERS.hero[0]})` }}
          />
        </motion.div>
        
        {/* Multiple gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/50" />
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      </motion.div>

      {/* Animated grid lines with glow */}
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-30" />
      
      {/* Scanlines with animation */}
      {!prefersReducedMotion && (
        <motion.div 
          className="scanlines pointer-events-none absolute inset-0 opacity-20"
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}

      {/* Mega floating orbs with complex animations */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute h-[800px] w-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 60%)',
              filter: 'blur(80px)',
              top: '-20%',
              left: '-10%',
            }}
            animate={{
              x: [0, 150, 50, 0],
              y: [0, -80, 30, 0],
              scale: [1, 1.3, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="pointer-events-none absolute h-[600px] w-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 60%)',
              filter: 'blur(100px)',
              bottom: '-10%',
              right: '-5%',
            }}
            animate={{
              x: [0, -100, -20, 0],
              y: [0, 60, -40, 0],
              scale: [1, 1.2, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
          />
          
          {/* Secondary glow orb */}
          <motion.div
            className="pointer-events-none absolute h-[400px] w-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
              filter: 'blur(60px)',
              top: '40%',
              right: '20%',
            }}
            animate={{
              x: [0, -50, 30, 0],
              y: [0, 40, -30, 0],
              scale: [1, 1.15, 0.95, 1],
              opacity: [0.5, 0.8, 0.6, 0.5],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
          />
        </>
      )}

      {/* Floating particles with varying sizes */}
      {!prefersReducedMotion && [...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-primary/50"
          style={{
            width: `${2 + (i % 3) * 2}px`,
            height: `${2 + (i % 3) * 2}px`,
            left: `${10 + i * 7}%`,
            top: `${20 + (i % 4) * 18}%`,
            boxShadow: '0 0 10px hsl(var(--primary) / 0.5)',
          }}
          animate={{
            y: [0, -50 - i * 5, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Horizontal light streaks */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute left-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{ top: '30%', width: '100%' }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute left-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
            style={{ top: '70%', width: '100%' }}
            animate={{ 
              opacity: [0, 0.4, 0],
              scaleX: [0.3, 1, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </>
      )}

      {/* Main content with 3D transforms */}
      <motion.div 
        className="section-container relative z-10"
        style={{ 
          opacity: prefersReducedMotion ? 1 : opacity, 
          y: prefersReducedMotion ? 0 : textY, 
          rotateX: prefersReducedMotion ? 0 : rotateX, 
          perspective: 1000 
        }}
        animate={isTransitioning ? { 
          scale: 2.5, 
          opacity: 0,
          filter: 'blur(20px)',
        } : { 
          scale: 1, 
          opacity: 1,
          filter: 'blur(0px)',
        }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div 
          className="mx-auto max-w-5xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Ultra glassmorphic badge */}
          <motion.div variants={staggerItem} className="mb-8 inline-block">
            <motion.div 
              className="inline-flex items-center gap-3 rounded-full border border-white/[0.15] bg-white/[0.08] px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {!prefersReducedMotion && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles size={16} className="text-primary" />
                </motion.div>
              )}
              {prefersReducedMotion && <Sparkles size={16} className="text-primary" />}
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/80">
                Liveries & Utilities for MSFS
              </span>
              {!prefersReducedMotion && (
                <motion.div
                  className="h-1.5 w-1.5 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          </motion.div>

          {/* Main headline with gradient animation */}
          <motion.h1
            variants={staggerItem}
            className="mb-8 font-mono text-5xl font-bold leading-[1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="mb-2 block">
              Liveries that
            </span>
            <span className="relative block">
              {prefersReducedMotion ? (
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  feel native.
                </span>
              ) : (
                <motion.span 
                  className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ['0%', '200%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                >
                  feel native.
                </motion.span>
              )}
              {/* Underline glow */}
              <motion.div
                className="absolute -bottom-2 left-1/2 h-1 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '80%', opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
            {prefersReducedMotion ? (
              <span className="mt-2 block text-muted-foreground/60">
                Utilities that fly.
              </span>
            ) : (
              <motion.span 
                className="mt-2 block text-muted-foreground/60"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Utilities that fly.
              </motion.span>
            )}
          </motion.h1>

          {/* Enhanced subheadline */}
          <motion.p
            variants={staggerItem}
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Precision-crafted addons for Microsoft Flight Simulator. 
            <br className="hidden md:block" />
            Focused on quality, performance, and getting out of your way.
          </motion.p>

          {/* CTA section with advanced glassmorphism */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            {/* Primary CTA with magnetic effect */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Button 
                size="lg" 
                onClick={() => startTransition('/products')}
                data-qa="site-hero-cta-primary"
                className="group relative overflow-hidden rounded-xl bg-foreground px-10 py-6 text-base text-background shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:bg-foreground/90"
              >
                <span className="relative z-10 flex items-center gap-2 font-mono font-semibold">
                  <Plane size={18} />
                  Enter the Hangar
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                </span>
                {/* Animated gradient sweep */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </motion.div>
            
            {/* Enhanced stats badge */}
            <motion.div 
              className="flex items-center gap-4 rounded-xl border border-white/[0.1] bg-white/[0.05] px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <div className="flex items-center gap-2">
                {!prefersReducedMotion ? (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Zap size={16} className="text-primary" />
                  </motion.div>
                ) : (
                  <Zap size={16} className="text-primary" />
                )}
                <span className="font-mono text-sm text-muted-foreground">
                  {!prefersReducedMotion ? (
                    <motion.span 
                      className="text-lg font-bold text-foreground"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      150+
                    </motion.span>
                  ) : (
                    <span className="text-lg font-bold text-foreground">150+</span>
                  )}
                  {' '}Products
                </span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <span className="font-mono text-sm text-muted-foreground">
                PC & Xbox
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Page transition overlay */}
      <PageTransition 
        isActive={isTransitioning} 
        onComplete={completeTransition} 
      />
    </section>
  );
}

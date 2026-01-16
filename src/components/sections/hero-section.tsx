/**
 * Component: HeroSection
 * Responsibility: Homepage hero with animated background, glassmorphism, scroll effects
 * Used by: Index page
 */
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Plane, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PLACEHOLDERS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { useEffect, useRef } from 'react';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), springConfig);
  
  // Scroll-based parallax
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: bgY, scale }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{ x: moveX, y: moveY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ backgroundImage: `url(${PLACEHOLDERS.hero[0]})` }}
          />
        </motion.div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </motion.div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 grid-overlay opacity-40" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-30" />

      {/* Floating glassmorphism orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '10%',
          left: '20%',
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          bottom: '20%',
          right: '15%',
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Main content with glassmorphism */}
      <motion.div 
        className="section-container relative z-10 pt-20"
        style={{ opacity }}
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Glassmorphic badge */}
          <motion.div variants={staggerItem} className="mb-6 inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <Sparkles size={14} className="text-primary" />
              <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                Liveries & Utilities for MSFS
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold tracking-tight mb-6 leading-[1.05]"
          >
            <span className="block">Liveries that</span>
            <span className="block text-gradient bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              feel native.
            </span>
            <span className="block text-muted-foreground/80">Utilities that fly.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Precision-crafted addons for Microsoft Flight Simulator. 
            Focused on quality, performance, and getting out of your way.
          </motion.p>

          {/* CTA with glassmorphism */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 px-8"
            >
              <Link to="/products">
                <span className="relative z-10 flex items-center">
                  Enter the Hangar
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                </span>
                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            </Button>
            
            {/* Stats badge */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
              <Plane size={16} className="text-primary" />
              <span className="font-mono text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">150+</span> Products
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 group"
        aria-label="Scroll to content"
      >
        <div className="flex flex-col items-center gap-2 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-all group-hover:bg-white/10 group-hover:border-white/20">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </motion.div>
        </div>
      </motion.button>
    </section>
  );
}

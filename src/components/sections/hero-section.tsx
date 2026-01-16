/**
 * Component: HeroSection
 * Responsibility: Ultra-futuristic homepage hero with 100vh, scroll snap, advanced motion
 * Used by: Index page
 */
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Plane, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PLACEHOLDERS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { useEffect, useRef, useState } from 'react';

interface HeroSectionProps {
  onScrollToContent?: () => void;
}

export function HeroSection({ onScrollToContent }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  
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
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleScrollToContent = () => {
    if (onScrollToContent) {
      onScrollToContent();
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden snap-start snap-always"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Ultra-deep background layers */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: bgY, scale }}
      >
        {/* Base image with mouse parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ x: moveX, y: moveY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-125"
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
      <div className="absolute inset-0 grid-overlay opacity-30" />
      
      {/* Scanlines with animation */}
      <motion.div 
        className="absolute inset-0 scanlines opacity-20"
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Mega floating orbs with complex animations */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
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
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
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
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
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

      {/* Floating particles with varying sizes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/50 pointer-events-none"
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
      <motion.div
        className="absolute left-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
        style={{ top: '30%', width: '100%' }}
        animate={{ 
          opacity: [0, 0.5, 0],
          scaleX: [0.5, 1, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none"
        style={{ top: '70%', width: '100%' }}
        animate={{ 
          opacity: [0, 0.4, 0],
          scaleX: [0.3, 1, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Main content with 3D transforms */}
      <motion.div 
        className="section-container relative z-10"
        style={{ opacity, y: textY, rotateX, perspective: 1000 }}
      >
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Ultra glassmorphic badge */}
          <motion.div variants={staggerItem} className="mb-8 inline-block">
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles size={16} className="text-primary" />
              </motion.div>
              <span className="font-mono text-foreground/80 text-xs tracking-[0.25em] uppercase">
                Liveries & Utilities for MSFS
              </span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Main headline with gradient animation */}
          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold tracking-tight mb-8 leading-[1]"
          >
            <motion.span 
              className="block mb-2"
              animate={isHovering ? { x: [-2, 2, -2] } : {}}
              transition={{ duration: 0.1, repeat: isHovering ? Infinity : 0 }}
            >
              Liveries that
            </motion.span>
            <span className="block relative">
              <motion.span 
                className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '200%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              >
                feel native.
              </motion.span>
              {/* Underline glow */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '80%', opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>
            <motion.span 
              className="block text-muted-foreground/60 mt-2"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Utilities that fly.
            </motion.span>
          </motion.h1>

          {/* Enhanced subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Precision-crafted addons for Microsoft Flight Simulator. 
            <br className="hidden md:block" />
            Focused on quality, performance, and getting out of your way.
          </motion.p>

          {/* CTA section with advanced glassmorphism */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            {/* Primary CTA with magnetic effect */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 px-10 py-6 text-base rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
              >
                <Link to="/products">
                  <span className="relative z-10 flex items-center gap-2 font-mono font-semibold">
                    <Plane size={18} />
                    Enter the Hangar
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                  </span>
                  {/* Animated gradient sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/10 to-accent/10" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Enhanced stats badge */}
            <motion.div 
              className="flex items-center gap-4 px-6 py-3 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Zap size={16} className="text-primary" />
                </motion.div>
                <span className="font-mono text-sm text-muted-foreground">
                  <motion.span 
                    className="text-foreground font-bold text-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    150+
                  </motion.span>
                  {' '}Products
                </span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <span className="font-mono text-sm text-muted-foreground">
                PC & Xbox
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />

      {/* Ultra-enhanced scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        onClick={handleScrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 group"
        aria-label="Scroll to content"
      >
        <motion.div 
          className="relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] transition-all duration-300 group-hover:bg-white/[0.1] group-hover:border-white/[0.2] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          whileHover={{ y: -5 }}
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </motion.div>
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-primary/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
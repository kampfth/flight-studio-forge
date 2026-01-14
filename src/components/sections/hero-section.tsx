import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FACEBOOK_URL, PLACEHOLDERS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [0, 1], [-10, 10]), springConfig);

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
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: moveX, y: moveY }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${PLACEHOLDERS.hero[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </motion.div>

      {/* Grid overlay - very subtle */}
      <div className="absolute inset-0 grid-overlay" />

      {/* Scanlines - barely visible */}
      <div className="absolute inset-0 scanlines" />

      {/* Animated glow blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ top: '20%', left: '30%' }}
      />

      <div className="section-container relative z-10 pt-16">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline */}
          <motion.div variants={staggerItem} className="mb-5">
            <span className="font-mono text-muted-foreground text-xs tracking-[0.25em] uppercase">
              Liveries & Utilities for MSFS
            </span>
          </motion.div>

          {/* Main headline with stagger effect */}
          <motion.h1
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight mb-5 leading-[1.1]"
          >
            Liveries that feel native.
            <br />
            <span className="text-muted-foreground">Utilities that fly.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-8"
          >
            Precision-crafted addons for Microsoft Flight Simulator. 
            Focused on quality, performance, and getting out of your way.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="default" className="btn-sheen bg-foreground text-background hover:bg-foreground/90">
              <Link to="/products">
                Enter the Hangar
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="default" className="text-muted-foreground hover:text-foreground">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                <Facebook size={16} className="mr-2" />
                Follow Us
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
}

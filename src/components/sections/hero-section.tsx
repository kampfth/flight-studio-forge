import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Grid overlay - very subtle */}
      <div className="absolute inset-0 grid-overlay" />

      {/* Scanlines - barely visible */}
      <div className="absolute inset-0 scanlines" />

      <div className="section-container relative z-10 pt-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className="font-mono text-muted-foreground text-xs tracking-[0.25em] uppercase">
              Liveries & Utilities for MSFS
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight mb-5 leading-[1.1]"
          >
            Liveries that feel native.
            <br />
            <span className="text-muted-foreground">Utilities that fly.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-8"
          >
            Precision-crafted addons for Microsoft Flight Simulator. 
            Focused on quality, performance, and getting out of your way.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="default" className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/products">
                Enter the Hangar
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="default" className="text-muted-foreground hover:text-foreground">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Join Discord
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
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
/**
 * Component: ValuesSection
 * Responsibility: Display brand values with glassmorphism and scroll animations
 * Used by: Index page
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Crosshair, MessageCircle, Lightbulb, Puzzle, Palette } from 'lucide-react';

const values = [
  {
    icon: Crosshair,
    title: 'Precision Craft',
    description: 'Every texture, every feature justified. Obsessive attention to finishing.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: MessageCircle,
    title: 'Feedback-Driven',
    description: 'Community shapes our roadmap. Real requests from real pilots.',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Lightbulb,
    title: 'Pioneering Tools',
    description: 'Utilities that solve problems others ignore.',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Puzzle,
    title: 'Clean Integration',
    description: 'Drop-in installation. Works with your existing setup.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Palette,
    title: 'Consistent Style',
    description: 'Unified visual identity across every product we ship.',
    gradient: 'from-rose-500/20 to-red-500/20',
  },
];

export function ValuesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
      </motion.div>

      {/* Background pattern */}
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <div className="section-container relative">
        {/* Section header with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
              The 4Simmers Way
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-4">
            Built{' '}
            <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Different
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Four developers simming since FS2004. We build what we want to use.
          </p>
        </motion.div>

        {/* Values grid with glassmorphism cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <motion.div
                className="group relative h-full p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06]"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Glow effect */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur flex items-center justify-center mb-4 border border-white/10 group-hover:border-white/20 transition-colors"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <value.icon size={22} className="text-foreground/80 group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                  
                  <h3 className="font-mono font-semibold text-base mb-2 group-hover:text-foreground transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-muted-foreground/80 transition-colors">
                    {value.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

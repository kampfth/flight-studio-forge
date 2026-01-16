/**
 * Component: CommunitySection
 * Responsibility: Statistics and community showcase with glassmorphism
 * Used by: Index page
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Users, Package, Award, Clock } from 'lucide-react';

const stats = [
  {
    icon: Package,
    value: '150+',
    label: 'Products',
    description: 'Liveries & utilities',
  },
  {
    icon: Users,
    value: '50K+',
    label: 'Downloads',
    description: 'Monthly active users',
  },
  {
    icon: Award,
    value: '4.9',
    label: 'Rating',
    description: 'Community average',
  },
  {
    icon: Clock,
    value: '2021',
    label: 'Founded',
    description: 'Years of experience',
  },
];

export function CommunitySection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-15" />

      <div className="section-container relative">
        {/* Main glassmorphic card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ rotate }}
          className="relative"
        >
          <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 overflow-hidden">
            {/* Inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto mb-12">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                    By The Numbers
                  </span>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-4">
                  Trusted by{' '}
                  <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Pilots
                  </span>{' '}
                  Worldwide
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  From hobbyists to professional streamers, our products power flights across the globe.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <motion.div
                      className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 text-center transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06]"
                      whileHover={{ y: -5 }}
                    >
                      {/* Icon */}
                      <motion.div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/5 border border-white/10 mb-4 group-hover:border-primary/30 transition-colors"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                      >
                        <stat.icon size={24} className="text-primary" />
                      </motion.div>
                      
                      {/* Value */}
                      <motion.div
                        className="text-3xl md:text-4xl font-mono font-bold mb-1 text-gradient bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.3 + index * 0.1,
                          type: 'spring',
                          stiffness: 200,
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      
                      {/* Label */}
                      <div className="font-mono text-sm font-medium text-foreground/90 mb-1">
                        {stat.label}
                      </div>
                      
                      {/* Description */}
                      <div className="text-xs text-muted-foreground">
                        {stat.description}
                      </div>

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>
    </section>
  );
}

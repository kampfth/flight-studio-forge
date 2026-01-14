import { motion } from 'framer-motion';
import { Crosshair, MessageCircle, Lightbulb, Puzzle, Palette } from 'lucide-react';

const values = [
  {
    icon: Crosshair,
    title: 'Precision Craft',
    description: 'Every texture, every feature justified. Obsessive attention to finishing.',
  },
  {
    icon: MessageCircle,
    title: 'Feedback-Driven',
    description: 'Discord shapes our roadmap. Real requests from real pilots.',
  },
  {
    icon: Lightbulb,
    title: 'Pioneering Tools',
    description: 'Utilities that solve problems others ignore.',
  },
  {
    icon: Puzzle,
    title: 'Clean Integration',
    description: 'Drop-in installation. Works with your existing setup.',
  },
  {
    icon: Palette,
    title: 'Consistent Style',
    description: 'Unified visual identity across every product we ship.',
  },
];

export function ValuesSection() {
  return (
    <section className="py-section md:py-section-md bg-card/30">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <span className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-3 block">
            The 4Simmers Way
          </span>
          <h2 className="text-2xl md:text-3xl font-mono font-bold mb-3">
            Built Different
          </h2>
          <p className="text-muted-foreground text-sm">
            Four developers simming since FS2004. We build what we want to use.
          </p>
        </motion.div>

        {/* Values grid - compact */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group p-4 md:p-5 rounded-lg border border-border/50 bg-card/50 hover:border-border hover:bg-card/80 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-md bg-muted/50 flex items-center justify-center mb-3 group-hover:bg-muted transition-colors">
                <value.icon size={18} className="text-foreground/70" />
              </div>
              <h3 className="font-mono font-medium text-sm mb-1.5">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
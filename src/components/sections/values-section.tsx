import { motion } from 'framer-motion';
import { Shield, Zap, Users, Code } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Privacy by Design',
    description: 'No telemetry. No accounts required. No tracking. Your data stays yours.',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Optimized for frame rates. Every polygon, every texture justified.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Features shaped by real pilots. Discord feedback directly into roadmaps.',
  },
  {
    icon: Code,
    title: 'Long-term Support',
    description: 'Free updates within MSFS generations. We don\'t abandon products.',
  },
];

export function ValuesSection() {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
            The 4Simmers Way
          </span>
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6">
            Built Different
          </h2>
          <p className="text-muted-foreground">
            We're four developers who've been simming since FS2004. 
            We know what good software feels like.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-lg border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-glow-sm transition-all duration-300">
                <feature.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-mono font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
